// --- 1. CONFIGURACIÓN DE BASE DE DATOS LOCAL (IndexedDB) ---
const dbName = "FerroInspeccionDB";
let db;

const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains("reportes")) {
        db.createObjectStore("reportes", { keyPath: "id_local" });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
};

// --- 2. GESTIÓN DE CÁMARA (Previsualización) ---
const inputFoto = document.getElementById('input-foto');
const previewFoto = document.getElementById('preview-foto');
let fotoBase64 = "";

inputFoto.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewFoto.src = e.target.result;
            previewFoto.style.display = 'block';
            fotoBase64 = e.target.result; // Guardamos la foto para la base de datos
        }
        reader.readAsDataURL(file);
    }
});

// --- 3. GEOLOCALIZACIÓN ---
const btnGps = document.getElementById('btn-gps');
btnGps.addEventListener('click', () => {
    if (navigator.geolocation) {
        btnGps.textContent = "Buscando satélites...";
        navigator.geolocation.getCurrentPosition(
            (position) => {
                document.getElementById('input-lat').value = position.coords.latitude;
                document.getElementById('input-lng').value = position.coords.longitude;
                document.getElementById('txt-gps').innerText = `Lat: ${position.coords.latitude.toFixed(5)} | Lng: ${position.coords.longitude.toFixed(5)}`;
                btnGps.textContent = "📍 Coordenadas Obtenidas";
                btnGps.style.backgroundColor = "#4caf50";
            },
            (error) => {
                alert("Error obteniendo GPS. Verifica los permisos del celular.");
                btnGps.textContent = "📍 Intentar GPS de nuevo";
            },
            { enableHighAccuracy: true } // Fuerza el uso del chip GPS
        );
    } else {
        alert("Tu dispositivo no soporta GPS.");
    }
});

// --- 4. GUARDAR REPORTE OFFLINE ---
document.getElementById('form-reporte').addEventListener('submit', function(e) {
    e.preventDefault();

    const reporte = {
        id_local: 'rep_' + Date.now(),
        fecha: new Date().toISOString(),
        km: document.getElementById('input-km').value,
        lat: document.getElementById('input-lat').value,
        lng: document.getElementById('input-lng').value,
        componente: document.getElementById('select-componente').value,
        severidad: document.querySelector('input[name="severidad"]:checked').value,
        notas: document.getElementById('input-notas').value,
        foto: fotoBase64,
        estado: 'pendiente'
    };

    const transaction = db.transaction(["reportes"], "readwrite");
    const store = transaction.objectStore("reportes");
    store.add(reporte).onsuccess = () => {
        alert("✅ Reporte guardado correctamente en el dispositivo.");
        this.reset();
        previewFoto.style.display = 'none';
        document.getElementById('txt-gps').innerText = "Lat: --- | Lng: ---";
        btnGps.textContent = "📍 Obtener Coordenadas GPS";
        btnGps.style.backgroundColor = "#2196f3";
    };
});

// --- 5. DETECCIÓN DE RED ---
function actualizarEstadoRed() {
    const statusDiv = document.getElementById('status-red');
    if (navigator.onLine) {
        statusDiv.textContent = "Conectado";
        statusDiv.className = "status online";
        // Aquí llamaremos a la función de sincronización en la siguiente fase
    } else {
        statusDiv.textContent = "Desconectado (Modo Offline)";
        statusDiv.className = "status offline";
    }
}

window.addEventListener('online', actualizarEstadoRed);
window.addEventListener('offline', actualizarEstadoRed);
actualizarEstadoRed();