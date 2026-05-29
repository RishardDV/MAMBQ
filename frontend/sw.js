const CACHE_VERSION = "mamb-v1";
const CORE_ASSETS = [
  "/",
  "/frontend/index.html",
  "/frontend/style.css",
  "/frontend/api.js",
  "/frontend/manifest.json",
  "/frontend/icons/icon.svg",
  "/Backend/app.js",
];

// Install — cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_VERSION)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// Fetch — network first for API, cache first for static
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // API requests — always network, no cache
  if (url.pathname.startsWith("/api/")) return;

  // Uploaded images — network first, cache fallback
  if (url.pathname.startsWith("/uploads/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(event.request, clone).catch(() => {});
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Static assets — cache first, network fallback
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(event.request, clone).catch(() => {});
          });
          return response;
        })
        .catch(() =>
          caches.match("/").then((fallback) => {
            return fallback || new Response("Offline", { status: 503 });
          })
        );
    })
  );
});
