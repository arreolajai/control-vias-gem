const CACHE_NAME = 'ferro-cache-v1';

// Aquí le decimos qué archivos debe guardar en la memoria del celular
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// Instalación: Descarga y guarda los archivos la primera vez
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos guardados en caché para modo offline');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepción: Cuando la app pide un archivo, lo saca del caché si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo está en caché, lo devuelve. Si no, va a buscarlo a la red.
        return response || fetch(event.request);
      })
  );
});