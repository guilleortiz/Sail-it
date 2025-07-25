// Define el nombre de la caché. Es una buena práctica cambiar este nombre
// cada vez que subes una nueva versión de la web para forzar la actualización.
const CACHE_NAME = 'sailing-navigation-v6';

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
];

self.addEventListener('install', event => {
  // Se llama cuando el Service Worker se instala por primera vez.
  // Abre una caché y almacena los archivos estáticos.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Esta línea le dice al navegador que el nuevo Service Worker debe
  // tomar el control de la página de inmediato, sin esperar a que el
  // usuario cierre todas las pestañas viejas.
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  // Intercepta todas las peticiones de la red.
  // Primero busca el recurso en la caché. Si lo encuentra, lo devuelve.
  // Si no, lo busca en la red.
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  // Se llama cuando el Service Worker se activa.
  // Es el momento de limpiar las cachés antiguas para liberar espacio.
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Eliminar todas las cachés que no coincidan con el nombre actual
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Esta línea le permite al Service Worker tomar el control de las
      // páginas existentes en el navegador.
      console.log('Service Worker activado y caches limpiados');
      return self.clients.claim();
    })
  );
});