// js/login.js
// Mantiene cambio de pestañas (arrendador/arrendatario) y añade login real con localStorage.
// Guarda sesión en localStorage key "currentUser".

let rol = "arrendador";

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

// Helper: obtener usuarios desde localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

// Helper: guardar sesión
function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// Helper: obtener sesión
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}

// Si ya hay sesión, redirigir según rol
const existing = getCurrentUser();
if (existing) {
  // Si quieres auto redirigir, descomenta:
  // window.location.href = existing.rol === "arrendador" ? "/html/Alojamiento.html" : "/html/BusquedaAlojamientos.html";
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // en tu HTML inputs son <label> then <input>, por eso:
    const emailInput = loginForm.querySelector('input[type="email"]');
    const passInput = loginForm.querySelector('input[type="password"]');

    const email = emailInput ? emailInput.value.trim() : "";
    const pass = passInput ? passInput.value : "";

    if (!email || !pass) {
      toast("Por favor completa email y contraseña.");
      return;
    }

    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.pass === pass && u.rol === rol
    );

    if (!user) {
      // intenta buscar sin comparar rol: su UX puede registrar con otro rol
      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.pass === pass
      );
      if (found) {
        toast(`El usuario existe pero con rol "${found.rol}". Selecciona ese rol o regístrate.`);
        return;
      }

      toast("Credenciales incorrectas. Revisa tu email, contraseña o regístrate.");
      return;
    }

    // login OK
    setCurrentUser(user);
    // crear notificación de bienvenida
    pushNotification({ title: "Bienvenido", body: `Hola ${user.name}`, userId: user.id });

    // redirigir según rol (mantengo tus rutas relativas)
    if (rol === "arrendador") {
      window.location.href = "../html/Alojamiento.html";
    } else {
      // tu proyecto no tiene BusquedaAlojamientos.html; uso Alojamiento.html como vista arrendatario
      window.location.href = "../html/Alojamiento.html";
    }
  });
}

// Utilities: notificaciones simples guardadas en localStorage
function getNotifications() {
  return JSON.parse(localStorage.getItem("notifications") || "[]");
}
function pushNotification(n) {
  const nots = getNotifications();
  nots.unshift({
    id: "n_" + Date.now(),
    title: n.title || "Notificación",
    body: n.body || "",
    userId: n.userId || null,
    date: new Date().toISOString(),
    read: false,
  });
  localStorage.setItem("notifications", JSON.stringify(nots));
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
