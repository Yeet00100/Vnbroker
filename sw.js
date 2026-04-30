const CACHE = 'vnbroker-v3';
const BASE = '/Vnbroker/';

const ASSETS = [
  BASE + 'slip-analyzer.html',
  BASE + 'manifest.json',
  BASE + 'favicon.ico',
  BASE + 'favicon-16x16.png',
  BASE + 'favicon-32x32.png',
  BASE + 'apple-touch-icon.png',
  BASE + 'icon-72.png',
  BASE + 'icon-96.png',
  BASE + 'icon-128.png',
  BASE + 'icon-144.png',
  BASE + 'icon-152.png',
  BASE + 'icon-180.png',
  BASE + 'icon-192.png',
  BASE + 'icon-384.png',
  BASE + 'icon-512.png',
  BASE + 'logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        return response;
      });
    })
  );
});
