const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/image.webp'  // Adding the image to the cache list
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return the cached version if found, otherwise fetch from network.
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('push', (event) => {
    const data = event.data ? event.data.text() : 'No push data';
    console.log('Push received:', data);
    event.waitUntil(
        self.registration.showNotification('Notification', {
            body: data,
            icon: '/icon.png'
        })
    );
});

// Background Sync example
self.addEventListener('sync', (event) => {
    if (event.tag === 'some-tag') {
        event.waitUntil(
            // Perform some task
        );
    }
});
