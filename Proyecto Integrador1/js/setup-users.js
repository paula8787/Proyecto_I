// Crea usuarios predeterminados en localStorage SOLO UNA VEZ
(function () {
  const users = [
    {
      id: "u1",
      name: "Juan Arrendador",
      email: "arrendador@example.com",
      pass: "123456",
      rol: "arrendador"
    },
    {
      id: "u2",
      name: "Maria Arrendataria",
      email: "arrendatario@example.com",
      pass: "123456",
      rol: "arrendatario"
    }
  ];

  localStorage.setItem("users", JSON.stringify(users));
  console.log("Usuarios creados en localStorage:");
  console.log(users);
})();
