// Les fotos i els textos es llegeixen de la carpeta "dades".
// Es poden editar des del panell de Pages CMS (app.pagescms.org).

const graella = document.querySelector(".graella");
const filtres = document.querySelector(".filtres");
const visor = document.querySelector(".visor");
const visorImg = visor.querySelector("img");
const visorText = visor.querySelector("figcaption");

let fotos = [];
let visibles = [];
let actual = 0;

document.getElementById("any").textContent = new Date().getFullYear();

async function llegeix(fitxer) {
  const resposta = await fetch(fitxer, { cache: "no-cache" });
  return resposta.json();
}

// La llista de temes la genera GitHub Actions en publicar; si no hi és, es fan servir els de les fotos
async function llegeixTemes() {
  try {
    const temes = await llegeix("dades/llista-temes.json");
    return Array.isArray(temes) ? temes.map(normalitza).filter(Boolean) : null;
  } catch {
    return null;
  }
}

// Text alternatiu per a qui no pot veure la foto (lectors de pantalla, cercadors)
function textAlternatiu(foto) {
  return foto.titol || "Foto d'en Joan Callao";
}

function normalitza(tema) {
  return String(tema || "").trim().toLowerCase();
}

async function inicia() {
  const [llista, textos, temes] = await Promise.all([
    llegeix("dades/fotos.json"),
    llegeix("dades/textos.json"),
    llegeixTemes(),
  ]);

  document.getElementById("titol-portada").textContent = textos.titol_portada || "";
  document.getElementById("text-sobre-mi").textContent = textos.sobre_mi || "";
  mostraInstagram(textos.instagram);

  fotos = llista
    .filter(f => f && f.foto)
    .map(f => ({ ...f, tema: normalitza(f.tema) }));
  visibles = fotos;

  pintaFiltres(temes);
  pinta();
}

// Accepta "nom", "@nom" o l'adreça sencera del perfil
function mostraInstagram(valor) {
  const usuari = (valor || "")
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//, "")
    .replace(/^@/, "")
    .replace(/\/.*$/, "");
  if (!usuari) return;

  const url = `https://www.instagram.com/${usuari}/`;
  document.querySelectorAll(".enllac-instagram").forEach(a => {
    a.href = url;
    a.hidden = false;
    if (!a.textContent) a.textContent = `@${usuari}`;
  });
  document.querySelector(".segueix-me").hidden = false;
}

// Botons de filtre: els temes de la llista que tenen alguna foto
function pintaFiltres(llistaTemes) {
  const temesAmbFotos = new Set(fotos.map(f => f.tema).filter(Boolean));
  const ordre = llistaTemes || [...temesAmbFotos];
  const temes = ["totes", ...new Set(ordre.filter(t => temesAmbFotos.has(t)))];
  filtres.hidden = temes.length === 1;
  temes.forEach(tema => {
    const b = document.createElement("button");
    b.textContent = tema;
    b.onclick = () => {
      filtres.querySelectorAll("button").forEach(x => x.classList.toggle("actiu", x === b));
      visibles = tema === "totes" ? fotos : fotos.filter(f => f.tema === tema);
      pinta();
    };
    if (tema === "totes") b.classList.add("actiu");
    filtres.appendChild(b);
  });
}

function pinta() {
  graella.innerHTML = "";
  visibles.forEach((foto, i) => {
    const b = document.createElement("button");
    b.className = "foto";
    const img = document.createElement("img");
    img.src = foto.foto;
    img.alt = textAlternatiu(foto);
    img.loading = "lazy";
    b.appendChild(img);
    b.onclick = () => obre(i);
    graella.appendChild(b);
  });
}

function obre(i) {
  actual = (i + visibles.length) % visibles.length;
  const foto = visibles[actual];
  visorImg.src = foto.foto;
  visorImg.alt = textAlternatiu(foto);
  visorText.textContent = foto.titol || "";
  visorText.hidden = !foto.titol;
  visor.hidden = false;
  document.body.style.overflow = "hidden";
}

function tanca() {
  visor.hidden = true;
  document.body.style.overflow = "";
}

visor.querySelector(".tancar").onclick = tanca;
visor.querySelector(".anterior").onclick = () => obre(actual - 1);
visor.querySelector(".seguent").onclick = () => obre(actual + 1);
visor.onclick = e => { if (e.target === visor) tanca(); };

document.addEventListener("keydown", e => {
  if (visor.hidden) return;
  if (e.key === "Escape") tanca();
  if (e.key === "ArrowLeft") obre(actual - 1);
  if (e.key === "ArrowRight") obre(actual + 1);
});

// Lliscar amb el dit al mòbil
let xInici = null;
visor.addEventListener("touchstart", e => { xInici = e.touches[0].clientX; });
visor.addEventListener("touchend", e => {
  if (xInici === null) return;
  const dx = e.changedTouches[0].clientX - xInici;
  if (Math.abs(dx) > 50) obre(actual + (dx < 0 ? 1 : -1));
  xInici = null;
});

inicia();
