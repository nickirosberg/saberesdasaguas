const CACHE_NAME = 'par-jaguaribe-offline-v1';
const arquivosParaCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './img/banner.png'
];

self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(arquivosParaCache))
  );
});

self.addEventListener('fetch', evento => {
  evento.respondWith(
    caches.match(evento.request).then(respostaCache => {
      return respostaCache || fetch(evento.request);
    })
  );
});