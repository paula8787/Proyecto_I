// js/Registrarce.js
// Maneja tabs y registra usuarios en localStorage.
// Guarda: id, name, email, pass, rol, document/code, phone, createdAt

const tabA = document.getElementById("tab-arrendador");
const tabB = document.getElementById("tab-arrendatario");

const formA = document.getElementById("form-arrendador");
const formB = document.getElementById("form-arrendatario");

// TAB SWITCH (mantener lo que ya tenías)
if (tabA && tabB && formA && formB) {
  tabA.addEventListener("click", () => {
    tabA.classList.add("active");
    tabB.classList.remove("active");

    formA.classList.add("active");
    formB.classList.remove("active");
  });

  tabB.addEventListener("click", () => {
    tabB.classList.add("active");
    tabA.classList.remove("active");

    formB.classList.add("active");
    formA.classList.remove("active");
  });
}

// Storage helpers
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Generate simple unique id
function uid(prefix = "") {
  return prefix + Date.now() + Math.floor(Math.random() * 1000);
}

// Validate basic email (and optional institutional check: contains ".edu" or contains domain)
function validEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Registrar Arrendador
if (formA) {
  formA.addEventListener("submit", function (e) {
    e.preventDefault();
    // Tus inputs están en orden: Nombre, Correo, Contraseña, Cédula, Teléfono (input then label)
    const inputs = Array.from(formA.querySelectorAll("input"));
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const pass = inputs[2].value;
    const cedula = inputs[3].value.trim();
    const phone = inputs[4].value.trim();

    if (!name || !email || !pass) {
      toast("Completa los campos obligatorios.");
      return;
    }
    if (!validEmail(email)) {
      toast("Ingresa un email válido.");
      return;
    }
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      toast("Ya existe una cuenta con ese email.");
      return;
    }

    const user = {
      id: uid("u_"),
      name,
      email,
      pass,
      rol: "arrendador",
      cedula,
      phone,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    saveUsers(users);
    toast("Registro exitoso. Ya puedes iniciar sesión.");
    // opcional: iniciar sesión automáticamente
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "../html/Alojamiento.html";
  });
}

// Registrar Arrendatario
if (formB) {
  formB.addEventListener("submit", function (e) {
    e.preventDefault();
    // inputs orden: Nombre, Correo, Contraseña, Código Estudiantil, Teléfono
    const inputs = Array.from(formB.querySelectorAll("input"));
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const pass = inputs[2].value;
    const studentCode = inputs[3].value.trim();
    const phone = inputs[4].value.trim();

    if (!name || !email || !pass || !studentCode) {
      toast("Completa los campos obligatorios.");
      return;
    }
    if (!validEmail(email)) {
      toast("Ingresa un email válido.");
      return;
    }

    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      toast("Ya existe una cuenta con ese email.");
      return;
    }

    const user = {
      id: uid("u_"),
      name,
      email,
      pass,
      rol: "arrendatario",
      studentCode,
      phone,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    saveUsers(users);
    toast("Registro exitoso. Ya puedes iniciar sesión.");
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "../html/Alojamiento.html";
  });
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
