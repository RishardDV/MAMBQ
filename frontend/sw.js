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
  // Notify controlled clients that the service worker is active (useful to show in-app toast)
  event.waitUntil(
    (async () => {
      try {
        const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
        const message = {
          type: 'SW_ACTIVE',
          title: 'App lista',
          body: 'La aplicación MAMB está lista para usarse sin conexión. ¡Gracias por instalarla!',
          timestamp: Date.now()
        };
        for (const client of allClients) {
          client.postMessage(message);
        }

        // Try to show a native notification (will show only if user granted permission)
        const notifOptions = {
          body: message.body,
          icon: '/frontend/icons/icon.svg',
          badge: '/frontend/icons/icon.svg',
          vibrate: [100, 50, 100],
          tag: 'mamb-installed',
          renotify: true,
          data: { url: '/' },
          actions: [
            { action: 'open', title: 'Abrir MAMB' },
            { action: 'dismiss', title: 'Cerrar' }
          ]
        };
        await self.registration.showNotification('MAMB instalada', notifOptions);
      } catch (err) {
        // silence failures (e.g., no clients or permissions)
      }
    })()
  );
});

// Handle notification interactions
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const action = event.action;
  event.waitUntil(
    (async () => {
      if (action === 'open') {
        const allClients = await self.clients.matchAll({ type: 'window' });
        if (allClients.length > 0) {
          allClients[0].focus();
        } else {
          self.clients.openWindow('/');
        }
      }
    })()
  );
});

self.addEventListener('notificationclose', function(event) {
  // could send analytics here
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
