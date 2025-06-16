const CACHE_NAME = 'am-coffee-v5';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/bootstrap.css',
  '/css/mobile.css',
  '/js/script.min.js',
  '/images/LOGOapk.png',
  '/images/screenshot1.png',
  '/images/screenshot2.png',
  '/manifest.json',
  OFFLINE_URL
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Skip waiting để activate ngay lập tức
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  // Chỉ xử lý GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Fetch from network
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Network failed, return offline page for navigate requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
          });
      }
    )
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Claim clients để control ngay lập tức
  return self.clients.claim();
});

// Background Sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Có tin tức mới từ Ấm Coffee!',
    icon: '/images/LOGOapk.png',
    badge: '/images/LOGOapk.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Xem ngay',
        icon: '/images/LOGOapk.png'
      },
      {
        action: 'close',
        title: 'Đóng',
        icon: '/images/LOGOapk.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Ấm Coffee & Cake', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic background sync
self.addEventListener('periodicsync', event => {
  if (event.tag === 'content-sync') {
    event.waitUntil(updateContent());
  }
});

// Helper functions
async function doBackgroundSync() {
  try {
    // Sync offline data when connection restored
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
      await syncDataToServer(offlineData);
      await clearOfflineData();
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function updateContent() {
  try {
    // Update cache with fresh content
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(urlsToCache);
    console.log('Content updated in background');
  } catch (error) {
    console.error('Periodic sync failed:', error);
  }
}

async function getOfflineData() {
  // Get data stored offline
  return [];
}

async function syncDataToServer(data) {
  // Sync data to server
  return fetch('/api/sync', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
}

async function clearOfflineData() {
  // Clear synced offline data
  console.log('Offline data cleared');
}