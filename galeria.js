const graella = document.querySelector(".graella");
const filtres = document.querySelector(".filtres");
const visor = document.querySelector(".visor");
const visorImg = visor.querySelector("img");
const visorText = visor.querySelector("figcaption");

let visibles = FOTOS;
let actual = 0;

document.getElementById("any").textContent = new Date().getFullYear();

// Botons de filtre, a partir dels temes de la llista
const temes = ["totes", ...new Set(FOTOS.map(f => f.tema).filter(Boolean))];
temes.forEach(tema => {
  const b = document.createElement("button");
  b.textContent = tema;
  b.onclick = () => {
    filtres.querySelectorAll("button").forEach(x => x.classList.toggle("actiu", x === b));
    visibles = tema === "totes" ? FOTOS : FOTOS.filter(f => f.tema === tema);
    pinta();
  };
  if (tema === "totes") b.classList.add("actiu");
  filtres.appendChild(b);
});

function pinta() {
  graella.innerHTML = "";
  visibles.forEach((foto, i) => {
    const b = document.createElement("button");
    b.className = "foto";
    b.innerHTML = `<img src="fotos/${foto.fitxer}" alt="${foto.titol || ""}" loading="lazy">`;
    b.onclick = () => obre(i);
    graella.appendChild(b);
  });
}

function obre(i) {
  actual = (i + visibles.length) % visibles.length;
  const foto = visibles[actual];
  visorImg.src = `fotos/${foto.fitxer}`;
  visorImg.alt = foto.titol || "";
  visorText.textContent = foto.titol || "";
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

pinta();
