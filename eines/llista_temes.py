"""Genera dades/llista-temes.json a partir dels fitxers de dades/temes/.

El web no pot llegir el contingut d'una carpeta, així que GitHub Actions
fa aquesta llista abans de publicar. No cal desar-la al repositori.
"""

import json
from pathlib import Path

ARREL = Path(__file__).resolve().parent.parent
CARPETA = ARREL / "dades" / "temes"
SORTIDA = ARREL / "dades" / "llista-temes.json"

temes = []
for fitxer in sorted(CARPETA.glob("*.json")):
    nom = str(json.loads(fitxer.read_text(encoding="utf-8")).get("nom", "")).strip()
    if nom and nom.lower() not in (t.lower() for t in temes):
        temes.append(nom)

SORTIDA.write_text(json.dumps(temes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Temes: {', '.join(temes)}")
