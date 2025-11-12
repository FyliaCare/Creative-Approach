/**
 * Service Worker for Creative Approach PWA
 * Provides offline functionality and optimized caching strategies
 */

const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `creative-approach-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
];

// Cache expiration times (in milliseconds)
const CACHE_MAX_AGE = {
  images: 30 * 24 * 60 * 60 * 1000, // 30 days
  assets: 7 * 24 * 60 * 60 * 1000,  // 7 days
  api: 5 * 60 * 1000,                 // 5 minutes
};

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 SW: Caching app shell');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !name.includes(CACHE_VERSION))
          .map((name) => {
            console.log('🗑️  SW: Removing old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip non-http(s) requests
  if (!request.url.startsWith('http')) return;

  // API requests - Network first, cache fallback
  if (url.pathname.startsWith('/api')) {
    event.respondWith(networkFirstStrategy(request, RUNTIME_CACHE));
    return;
  }

  // Images - Cache first, network fallback
  if (request.destination === 'image' || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
    return;
  }

  // Static assets - Stale while revalidate
  if (/\.(js|css|woff|woff2|ttf|otf)$/i.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
    return;
  }

  // HTML pages - Network first
  event.respondWith(networkFirstStrategy(request, CACHE_NAME));
});

// Network first, cache fallback strategy
async function networkFirstStrategy(request, cacheName) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    throw error;
  }
}

// Cache first, network fallback strategy
async function cacheFirstStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return a placeholder image for failed image requests
    if (request.destination === 'image') {
      return new Response(
        '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#f3f4f6"/></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }
    throw error;
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  });

  return cachedResponse || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-quotations') {
    event.waitUntil(syncOfflineData());
  }
});

async function syncOfflineData() {
  console.log('🔄 SW: Syncing offline data');
  // Implement offline data synchronization logic here
}

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'New notification from Creative Approach',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/',
      timestamp: Date.now(),
    },
    actions: data.actions || [],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Creative Approach', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

// Periodic background sync (for future use)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-content') {
    event.waitUntil(updateContent());
  }
});

async function updateContent() {
  console.log('🔄 SW: Periodic content update');
  // Implement periodic content update logic
}

console.log(`✅ Service Worker ${CACHE_VERSION} registered successfully`);
