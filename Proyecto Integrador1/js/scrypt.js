// js/scrypt.js
// Efectos: navbar cambia con scroll; animar tarjetas; fondo hero rotativo (si existen)
// Código defensivo: comprueba si existen los selectores antes de operar.

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar") || document.querySelector(".navbar-study") || document.querySelector(".nav");
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Animar tarjetas (sobreN / acerca)
const cards = document.querySelectorAll(".about-card, .card");
function showCards() {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", showCards);
window.addEventListener("resize", showCards);
showCards();

// Fondo dinámico opcional (solo si .about-hero existe)
const hero = document.querySelector(".about-hero");
const fondos = [
  "./img/fondo-sobre.jpg",
  "./img/fondo-sobre2.jpg",
  "./img/fondo-sobre3.jpg"
];
let i = 0;
if (hero) {
  setInterval(() => {
    i = (i + 1) % fondos.length;
    hero.style.backgroundImage = `url('${fondos[i]}')`;
  }, 10000);
}
// ==== TOAST FUNCTION ==== //
function toast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const t = document.createElement("div");
    t.className = "toast " + type;
    t.textContent = message;

    container.appendChild(t);

    setTimeout(() => t.remove(), 4500);
}
