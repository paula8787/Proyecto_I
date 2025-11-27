// JS/login.js

let rol = null;

// TABs de selección de rol
const btnArrendador = document.getElementById("tab-arrendador");
const btnArrendatario = document.getElementById("tab-arrendatario");

if (btnArrendador && btnArrendatario) {
  btnArrendador.addEventListener("click", () => {
    rol = "arrendador";
    btnArrendador.classList.add("active");
    btnArrendatario.classList.remove("active");
  });

  btnArrendatario.addEventListener("click", () => {
    rol = "arrendatario";
    btnArrendatario.classList.add("active");
    btnArrendador.classList.remove("active");
  });
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const pass = loginForm.querySelector('input[type="password"]').value.trim();

    if (!email || !pass) return alert("Completa todos los campos.");

    const users = getUsers();

    // Buscar por correo + contraseña
    const user = users.find(u =>
      u.email.toLowerCase() === email.toLowerCase() && u.pass === pass
    );

    if (!user) return alert("Correo o contraseña incorrectos.");

    // Guardar sesión
    setCurrentUser(user);

    // Redirigir según rol
    if (user.rol === "arrendador") {
      window.location.href = "../html/panel-arrendador.html";
    } else {
      window.location.href = "../html/Alojamiento.html";
    }
  });
}
