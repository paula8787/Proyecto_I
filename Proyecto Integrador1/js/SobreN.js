// Efecto de cambio de color al hacer scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.custom-navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

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
