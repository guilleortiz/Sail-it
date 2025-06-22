const CACHE_NAME = 'sailnav-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/exercise.html',
  '/elementos-del-barco.html',
  '/assets/knot.gif',
  '/assets/sailboat-256x256.png',
  '/assets/buoy.png',
  '/assets/sailboat.png',
  '/assets/velero.png',
  '/manifest.json',
  // Agrega aquí otros archivos importantes (CSS, JS, imágenes, etc.)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
}); 