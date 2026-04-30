const CACHE = 'vnbroker-v4';
const BASE = '/Vnbroker/';

const ASSETS = [
  BASE + 'slip-analyzer.html',
  BASE + 'manifest.json',
  BASE + 'vnbroker-favicon.ico',
  BASE + 'vnbroker-favicon-16.png',
  BASE + 'vnbroker-favicon-32.png',
  BASE + 'vnbroker-favicon-48.png',
  BASE + 'vnbroker-apple-icon-180.png',
  BASE + 'vnbroker-icon-72.png',
  BASE + 'vnbroker-icon-96.png',
  BASE + 'vnbroker-icon-128.png',
  BASE + 'vnbroker-icon-144.png',
  BASE + 'vnbroker-icon-152.png',
  BASE + 'vnbroker-icon-180.png',
  BASE + 'vnbroker-icon-192.png',
  BASE + 'vnbroker-icon-384.png',
  BASE + 'vnbroker-icon-512.png',
  BASE + 'vnbroker-logo.png'
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
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
