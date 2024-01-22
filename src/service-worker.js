// service-worker.js

this.addEventListener('install', event => {
    event.waitUntil(
      caches.open('my-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          // Add other paths to your assets
        ]);
      })
    );
  });
  
  this.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });


  // service-worker.js

this.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== 'my-cache') {
              return caches.delete(cacheName);
            }
          })
        );
      }).then(() => {
        return this.clients.claim();
      })
    );
  });
  
  