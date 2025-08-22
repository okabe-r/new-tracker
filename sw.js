// A name for our cache
const CACHE_NAME = 'progress-tracker-cache-v1';

// The list of files to cache.
const urlsToCache = [
  './',
  './index.html',
  'https://i.postimg.cc/47szXgWh/image.png'
];

// 1. On install, open the cache and add the core application files.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. On fetch, try to serve from the cache first.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If we found a match in the cache, return it.
        if (response) {
          return response;
        }
        // Otherwise, fetch it from the network.
        return fetch(event.request);
      })
  );
});
