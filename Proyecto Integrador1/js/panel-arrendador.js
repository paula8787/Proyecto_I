// ================================
// PANEL ARRENDADOR
// ================================

function getRooms() {
    return JSON.parse(localStorage.getItem("rooms") || "[]");
}

function saveRooms(list) {
    localStorage.setItem("rooms", JSON.stringify(list));
}

let map;
let markers = [];

document.addEventListener("DOMContentLoaded", () => {
    initMap();
    renderRooms();

    document.getElementById("addRoom").addEventListener("click", addRoom);
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("currentUser");
    });
});

// ================================
// MAPA
// ================================
function initMap() {
    map = L.map('map').setView([8.2377, -73.3560], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 19 })
        .addTo(map);
}

function addMarkers() {
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    const rooms = getRooms();

    rooms.forEach(r => {
        if (r.lat && r.lon) {
            const m = L.marker([r.lat, r.lon]).addTo(map)
                .bindPopup(`<b>${r.nombre}</b><br>${r.descripcion}`);
            markers.push(m);
        }
    });
}

// ================================
// AGREGAR HABITACIÓN
// ================================
function addRoom() {
    const room = {
        id: "room_" + Date.now(),
        nombre: document.getElementById("nombre").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        precio: Number(document.getElementById("precio").value),
        foto: document.getElementById("foto").value.trim(),
        lat: Number(document.getElementById("lat").value),
        lon: Number(document.getElementById("lon").value)
    };

    if (!room.nombre || !room.descripcion || !room.precio || !room.foto) {
        alert("Completa todos los campos.");
        return;
    }

    const list = getRooms();
    list.push(room);
    saveRooms(list);

    renderRooms();
    addMarkers();

    alert("Habitación agregada correctamente.");
}

// ================================
// PINTAR LISTA
// ================================
function renderRooms() {
    const el = document.getElementById("roomList");
    const rooms = getRooms();

    el.innerHTML = rooms
        .map(r => `
            <div class="room-item">
                <strong>${r.nombre}</strong> - $${r.precio}
                <div>${r.descripcion}</div>
            </div>
        `)
        .join("");

    addMarkers();
}
