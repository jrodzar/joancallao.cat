# Com publicar joancallao.cat (GitHub Pages + DonDominio)

## Per què GitHub Pages
- Gratuït, sense límit de temps, i inclou HTTPS (el cadenat) sense pagar res.
- El web d'en Joan és estàtic (només fitxers), que és just el que GitHub Pages serveix.
- Per canviar el web n'hi ha prou de pujar fitxers nous al repositori; es publica sol en un minut.
- Limitació: el repositori ha de ser públic amb el compte gratuït, i el total ha de quedar per sota d'1 GB (unes 500 fotos de 2000 px, de sobres).

## 1. Repositori a GitHub
- Repositori públic `jrodzar/joancallao.cat`.
- Settings → Pages → Source: **GitHub Actions** (el web el publica el flux `publicar.yml`, que abans prepara les fotos).
- Custom domain: `joancallao.cat`.

## 2. DNS a DonDominio (ho has de fer tu, al panell)
Panell de DonDominio → Dominis → joancallao.cat → Zona DNS (o "Gestió DNS").

Esborra els registres A / AAAA / CNAME que hi hagi per a `@` i `www` (els de la pàgina d'aparcament) i crea aquests:

| Tipus | Nom  | Valor               |
|-------|------|---------------------|
| A     | @    | 185.199.108.153     |
| A     | @    | 185.199.109.153     |
| A     | @    | 185.199.110.153     |
| A     | @    | 185.199.111.153     |
| CNAME | www  | jrodzar.github.io   |

No toquis els registres MX si feu servir correu amb el domini.

## 3. Activar HTTPS
Quan els DNS s'hagin propagat (de minuts a unes hores), a GitHub → Settings → Pages marca "Enforce HTTPS".
