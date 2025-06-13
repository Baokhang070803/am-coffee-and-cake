const CACHE_NAME = 'am-coffee-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/bootstrap.css',
  '/js/script.min.js',
  '/images/logo.png'
  // Thêm các file tĩnh khác nếu cần
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