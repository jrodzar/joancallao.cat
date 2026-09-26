"""Prepara les fotos de la carpeta fotos/ per al web.

- Redueix les fotos grans perquè el costat llarg sigui de 2000 px com a màxim.
- Esborra les metadades (EXIF), que poden incloure la ubicació GPS on es va fer la foto.
- Converteix les fotos HEIC de l'iPhone a JPG i actualitza dades/fotos.json.

Només toca les fotos que ho necessiten, així que es pot executar tantes vegades com calgui.
L'executa automàticament GitHub Actions cada vegada que es puja alguna cosa.
"""

import json
from pathlib import Path

from PIL import Image, ImageOps

try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    pass

ARREL = Path(__file__).resolve().parent.parent
CARPETA = ARREL / "fotos"
LLISTA = ARREL / "dades" / "fotos.json"
MIDA_MAXIMA = 2000
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"}


def te_metadades(img):
    return bool(img.info.get("exif")) or bool(img.getexif())


def prepara(cami):
    """Retorna el camí nou si la foto ha canviat de nom, o None."""
    ext = cami.suffix.lower()
    with Image.open(cami) as img:
        es_heic = ext in {".heic", ".heif"}
        massa_gran = max(img.size) > MIDA_MAXIMA
        if not (es_heic or massa_gran or te_metadades(img)):
            return None

        icc = img.info.get("icc_profile")
        nova = ImageOps.exif_transpose(img)
        nova.thumbnail((MIDA_MAXIMA, MIDA_MAXIMA), Image.LANCZOS)

    desti = cami.with_suffix(".jpg") if es_heic else cami
    opcions = {"icc_profile": icc} if icc else {}
    if desti.suffix.lower() in {".jpg", ".jpeg"}:
        nova.convert("RGB").save(desti, "JPEG", quality=85, optimize=True, progressive=True, **opcions)
    elif desti.suffix.lower() == ".png":
        nova.save(desti, "PNG", optimize=True, **opcions)
    else:
        nova.save(desti, "WEBP", quality=85, **opcions)

    print(f"Preparada: {cami.name} ({max(nova.size)} px)")
    if desti != cami:
        cami.unlink()
        return desti
    return None


def main():
    canvis_de_nom = {}
    for cami in sorted(CARPETA.iterdir()):
        if cami.suffix.lower() in EXTENSIONS:
            nou = prepara(cami)
            if nou:
                canvis_de_nom[f"fotos/{cami.name}"] = f"fotos/{nou.name}"

    if canvis_de_nom and LLISTA.exists():
        fotos = json.loads(LLISTA.read_text(encoding="utf-8"))
        for foto in fotos:
            if foto.get("foto") in canvis_de_nom:
                foto["foto"] = canvis_de_nom[foto["foto"]]
        LLISTA.write_text(json.dumps(fotos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
