/* Offline cache for the PTU Sheet app (only active when hosted over http/https).
   Strategy:
   - HTML navigations → NETWORK-FIRST, so a new deploy shows up immediately
     (the fresh index.html references the correct ?v= for app.js/styles.css).
   - Other GET assets → cache-first (they're version-busted via ?v=, and data.js
     rarely changes), with a background refresh. Falls back to cache when offline. */
const CACHE = "ptu-sheet-v3";
const ASSETS = ["./", "./index.html", "./styles.css", "./app.js", "./config.js", "./data/data.js", "./manifest.webmanifest"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const isHTML = req.mode === "navigate" || req.destination === "document";
  if (isHTML) {
    // network-first: always try to get the newest page, fall back to cache offline
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then(h => h || caches.match("./index.html")))
    );
    return;
  }

  // cache-first for versioned assets, with background update
  e.respondWith(
    caches.match(req).then(hit =>
      hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit)
    )
  );
});
