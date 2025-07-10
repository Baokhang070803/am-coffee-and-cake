const CACHE_NAME = 'am-coffee-v6';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/index.html',
  '/MessengerList.html',
  '/MessengerChat.html',
  '/login.html',
  '/register.html',
  '/menu.html',
  '/news.html',
  '/about.html',
  '/cart.html',
  '/policy.html',
  '/timeline.html',
  '/css/style.css',
  '/css/bootstrap.css',
  '/css/mobile.css',
  '/css/font-awesome.min.css',
  '/js/script.min.js',
  '/js/jquery-1.10.2.min.js',
  '/js/bootstrap.min.js',
  '/images/LOGOapk.png',
  '/images/logo.png',
  '/images/favicon.png',
  '/images/screenshot1.png',
  '/images/screenshot2.png',
  '/manifest.json',
  OFFLINE_URL
];

// Cache strategies
const cacheStrategies = {
  // Cache first for static assets
  cacheFirst: async (request) => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      console.log('Cache first failed:', error);
      return new Response('Network error', { status: 503 });
    }
  },

  // Network first for dynamic content
  networkFirst: async (request) => {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      console.log('Network first failed, trying cache:', error);
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      return new Response('Offline', { status: 503 });
    }
  },

  // Stale while revalidate for API calls
  staleWhileRevalidate: async (request) => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }).catch(() => cachedResponse);

    return cachedResponse || fetchPromise;
  }
};

self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Cache installation failed:', error);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  // Chỉ xử lý GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  
  // Skip Firebase and external requests
  if (url.hostname.includes('firebase') || 
      url.hostname.includes('googleapis') || 
      url.hostname.includes('gstatic') ||
      url.hostname.includes('tudongchat')) {
    return;
  }

  // Choose strategy based on request type
  let strategy;
  if (url.pathname.includes('/css/') || 
      url.pathname.includes('/js/') || 
      url.pathname.includes('/images/') ||
      url.pathname.includes('/manifest.json')) {
    strategy = cacheStrategies.cacheFirst;
  } else if (url.pathname.includes('/api/') || 
             url.pathname.includes('firebase')) {
    strategy = cacheStrategies.staleWhileRevalidate;
  } else {
    strategy = cacheStrategies.networkFirst;
  }

  event.respondWith(strategy(event.request));
});

// Clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
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
  return self.clients.claim();
});

// Background Sync for offline actions
self.addEventListener('sync', event => {
  console.log('Background sync triggered:', event.tag);
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  } else if (event.tag === 'messenger-sync') {
    event.waitUntil(syncMessengerData());
  }
});

// Push notifications
self.addEventListener('push', event => {
  console.log('Push notification received');
  
  let notificationData = {
    title: 'Ấm Coffee & Cake',
    body: 'Có tin tức mới từ Ấm Coffee!',
    icon: '/images/LOGOapk.png',
    badge: '/images/LOGOapk.png'
  };

  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = { ...notificationData, ...data };
    } catch (error) {
      notificationData.body = event.data.text();
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
      url: notificationData.url || '/'
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
    ],
    requireInteraction: true,
    tag: 'am-coffee-notification'
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('Notification clicked:', event.action);
  event.notification.close();

  if (event.action === 'explore' || event.action === '') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url.includes(event.notification.data.url) && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window if app is not open
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      })
    );
  }
});

// Periodic background sync
self.addEventListener('periodicsync', event => {
  console.log('Periodic sync triggered:', event.tag);
  if (event.tag === 'content-sync') {
    event.waitUntil(updateContent());
  }
});

// Helper functions
async function doBackgroundSync() {
  try {
    console.log('Starting background sync...');
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
      await syncDataToServer(offlineData);
      await clearOfflineData();
      console.log('Background sync completed');
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function syncMessengerData() {
  try {
    console.log('Syncing messenger data...');
    // Sync chat messages, friend requests, etc.
    const messengerData = await getMessengerOfflineData();
    if (messengerData.length > 0) {
      await syncMessengerToServer(messengerData);
      await clearMessengerOfflineData();
      console.log('Messenger sync completed');
    }
  } catch (error) {
    console.error('Messenger sync failed:', error);
  }
}

async function updateContent() {
  try {
    console.log('Updating content cache...');
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

async function getMessengerOfflineData() {
  // Get messenger data stored offline
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

async function syncMessengerToServer(data) {
  // Sync messenger data to server
  return fetch('/api/messenger/sync', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
}

async function clearOfflineData() {
  // Clear synced offline data
  console.log('Offline data cleared');
}

async function clearMessengerOfflineData() {
  // Clear synced messenger offline data
  console.log('Messenger offline data cleared');
}