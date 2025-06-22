const CACHE_NAME = 'sailing-navigation-v5';
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

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Eliminar todos los caches que no sean el actual
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Forzar la actualización inmediata
      console.log('Service Worker activado y caches limpiados');
      return self.clients.claim();
    })
  );
}); 