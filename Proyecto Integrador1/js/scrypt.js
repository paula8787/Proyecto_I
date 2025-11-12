// ===== Navbar cambia al hacer scroll =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Animar tarjetas al hacer scroll =====
const cards = document.querySelectorAll(".about-card");

function showCards() {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", showCards);
showCards();

// ===== Fondo dinámico opcional =====
const hero = document.querySelector(".about-hero");
const fondos = [
  "../img/fondo-sobre.jpg",
  "../img/fondo-sobre2.jpg",
  "../img/fondo-sobre3.jpg"
];
let i = 0;
setInterval(() => {
  i = (i + 1) % fondos.length;
  hero.style.backgroundImage = `url('${fondos[i]}')`;
}, 10000);
