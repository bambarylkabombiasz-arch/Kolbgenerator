const CACHE_NAME = "ui-pwa-v12";
const ASSETS = [
  "./",
  "./index.html",
  "./app.html",
  "./manifest.json",
  "./logo.png",
  "./niebiesko-1.jpg"
  "./mdowod_bg_big.webp"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
