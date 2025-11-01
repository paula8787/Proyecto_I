// Simulación de alojamientos con coordenadas
const alojamientos = [
  {
    nombre: "Habitación cerca de la UFPSO",
    direccion: "Calle 10 #5-20, Ocaña",
    precio: "$380.000/mes",
    lat: 8.2373,
    lng: -73.3555,
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    nombre: "Apartamento compartido moderno",
    direccion: "Carrera 12 #7-40, Ocaña",
    precio: "$420.000/mes",
    lat: 8.236,
    lng: -73.358,
    img: "https://images.unsplash.com/photo-1600573472591-ee6c8a2e2ba0?auto=format&fit=crop&w=800&q=80",
  },
  {
    nombre: "Habitación amoblada con balcón",
    direccion: "Av. Francisco Fernández, Ocaña",
    precio: "$400.000/mes",
    lat: 8.2385,
    lng: -73.353,
    img: "https://images.unsplash.com/photo-1598300053650-4b9a4d7e8b76?auto=format&fit=crop&w=800&q=80",
  },
];

// Insertar tarjetas en el panel izquierdo
const contenedor = document.getElementById("listado-habitaciones");

alojamientos.forEach((a, i) => {
  const card = document.createElement("div");
  card.classList.add("card", "card-room");
  card.innerHTML = `
    <img src="${a.img}" class="card-img-top" alt="${a.nombre}">
    <div class="card-body">
      <h6 class="card-title fw-bold">${a.nombre}</h6>
      <p class="text-muted mb-1">${a.direccion}</p>
      <p class="fw-semibold text-primary">${a.precio}</p>
    </div>
  `;
  card.addEventListener("click", () => {
    map.setView([a.lat, a.lng], 17);
    markers[i].openPopup();
  });
  contenedor.appendChild(card);
});

// Crear mapa con Leaflet
const map = L.map("map").setView([8.2365, -73.3565], 15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Agregar marcadores dinámicos
const markers = alojamientos.map((a) => {
  const marker = L.marker([a.lat, a.lng])
    .addTo(map)
    .bindPopup(`<b>${a.nombre}</b><br>${a.precio}`);
  return marker;
});

// Logo vuelve al inicio
document.getElementById("homeBtn").addEventListener("click", () => {
  map.setView([8.2365, -73.3565], 15);
  window.scrollTo({ top: 0, behavior: "smooth" });
});
