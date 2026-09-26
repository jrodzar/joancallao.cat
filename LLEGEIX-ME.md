# Web de fotografia d'en Joan (joancallao.cat)

Web estàtic: només HTML, CSS i JavaScript. No cal cap servidor ni base de dades.

## Com afegir fotos

1. Exporta la foto en JPG amb el costat llarg d'uns 2000 px (així carrega ràpid; les fotos de càmera senceres pesen massa).
2. Copia-la a la carpeta `fotos/` (millor sense espais ni accents al nom, p. ex. `posta-de-sol.jpg`).
3. Obre `fotos.js` i afegeix una línia:
   `{ fitxer: "posta-de-sol.jpg", titol: "Posta de sol a la platja", tema: "natura" },`
4. Esborra les línies i fitxers `exemple-...` quan ja no els vulguis.

Per provar-ho a l'ordinador, només cal obrir `index.html` amb el navegador.

## Fitxers

- `index.html`: l'estructura de la pàgina i el text de "Sobre mi".
- `estil.css`: colors i disseny (els colors principals són a dalt de tot).
- `galeria.js`: la graella, els filtres i el visor de fotos.
- `fotos.js`: la llista de fotos.
- `CNAME`: diu a GitHub Pages que el domini és joancallao.cat.
