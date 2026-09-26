# Web de fotografia d'en Joan (joancallao.cat)

Web estàtic: només HTML, CSS i JavaScript. No cal cap servidor ni base de dades.

## Com afegir fotos i canviar textos (des del mòbil o l'ordinador)

1. Entra a https://app.pagescms.org amb el teu compte de GitHub i obre el repositori `joancallao.cat`.
2. A **Fotos**: afegeix un element nou, tria la foto, posa-hi un títol i un tema, i desa.
3. A **Textos**: canvia el títol de la portada, el text de "Sobre mi" o l'usuari d'Instagram, i desa.
4. En un parell de minuts el web ja està actualitzat.

### Temes (els botons de filtre)

Els temes es gestionen a l'apartat **Temes** del panell, i a cada foto es trien d'un desplegable.
- Per crear un tema nou: a **Temes**, afegeix-ne un i desa. Després ja surt al desplegable de les fotos.
- Per esborrar un tema: esborra'l a **Temes**. El botó desapareix del web i les fotos que el tenien només surten a "Totes".
- Al web només surten els temes que tenen alguna foto. Si no n'hi ha cap, no surt la barra de filtres.

No cal preocupar-se de la mida de les fotos: en publicar, es redueixen soles a 2000 px
i se'ls esborra la ubicació GPS i la resta de metadades. Les fotos HEIC de l'iPhone es passen a JPG.

Important: el repositori és públic i l'historial guarda la foto tal com es va pujar.
Per no publicar mai la ubicació, desactiva-la a la configuració de la càmera del mòbil.

## Fitxers

- `index.html`: l'estructura de la pàgina.
- `estil.css`: colors i disseny (els colors principals són a dalt de tot).
- `galeria.js`: la graella, els filtres i el visor de fotos.
- `dades/fotos.json`: la llista de fotos (títol i tema de cadascuna).
- `dades/textos.json`: els textos de la portada, "Sobre mi" i l'Instagram.
- `dades/temes/`: un fitxer per a cada tema.
- `fotos/`: les fotos.
- `.pages.yml`: la configuració del panell Pages CMS.
- `eines/prepara_fotos.py`: redueix les fotos i n'esborra les metadades.
- `eines/llista_temes.py`: fa la llista de temes que llegeix el web.
- `.github/workflows/publicar.yml`: prepara les fotos i publica el web cada vegada que hi ha un canvi.
