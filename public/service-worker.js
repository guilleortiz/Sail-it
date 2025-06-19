const CACHE_NAME = 'sailnav-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/exercise.html',
  '/assets/knot.gif',
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