// Efecto dinámico del fondo gris
const aboutSection = document.querySelector('.about');
let colorValue = 120; // tono inicial del gris
let direction = 1;

function animateBackground() {
  colorValue += direction * 0.3;
  if (colorValue >= 140 || colorValue <= 100) direction *= -1;

  aboutSection.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
  requestAnimationFrame(animateBackground);
}

animateBackground();
