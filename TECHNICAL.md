# 📋 Technical Documentation - Ấm Coffee & Cake

## 🏗️ Architecture Overview

### **System Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Firebase      │    │   Third Party   │
│                 │    │                 │    │                 │
│ • HTML5/CSS3    │◄──►│ • Realtime DB   │◄──►│ • VNPAY        │
│ • JavaScript    │    │ • Auth          │    │ • Cloudinary   │
│ • Bootstrap     │    │ • Storage       │    │ • WebRTC       │
│ • jQuery        │    │ • Hosting       │    │                │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Data Flow**
```
User Action → Frontend → Firebase → Real-time Updates → All Connected Clients
```

## 🔥 Firebase Configuration

### **Realtime Database Rules**
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('employees').child(auth.uid).exists()",
        ".write": "$uid === auth.uid || root.child('employees').child(auth.uid).exists()"
      }
    },
    "orders": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$orderId": {
        ".validate": "newData.hasChildren(['userId', 'items', 'grandTotal', 'status'])"
      }
    },
    "products": {
      ".read": true,
      ".write": "root.child('employees').child(auth.uid).exists()"
    },
    "posts": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$postId": {
        ".validate": "newData.hasChildren(['authorId', 'content', 'timestamp'])"
      }
    }
  }
}
```

### **Storage Rules**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📊 Database Schema Detail

### **Users Collection**
```javascript
users: {
  [uid]: {
    fullName: string,
    email: string,
    phone: string,
    address: string,
    avatar: string,
    createdAt: timestamp,
    lastLogin: timestamp,
    membershipLevel: "bronze" | "silver" | "gold" | "diamond",
    points: number,
    preferences: {
      notifications: boolean,
      newsletter: boolean,
      language: "vi" | "en"
    }
  }
}
```

### **Products Collection**
```javascript
products: {
  drinks: {
    [itemId]: {
      name: string,
      price: number,
      image: string,
      attributes: string,
      category: "hot" | "cold" | "specialty",
      available: boolean,
      ingredients: string[],
      allergens: string[],
      nutrition: {
        calories: number,
        caffeine: number
      }
    }
  },
  cakes: {
    [itemId]: {
      name: string,
      price: number,
      image: string,
      attributes: string,
      type: "cake" | "pastry" | "dessert",
      available: boolean,
      ingredients: string[],
      allergens: string[]
    }
  },
  toppings: {
    [itemId]: {
      name: string,
      price: number,
      image: string,
      type: "syrup" | "cream" | "fruit" | "nuts"
    }
  }
}
```

### **Orders Collection**
```javascript
orders: {
  [orderId]: {
    userId: string,
    customerInfo: {
      name: string,
      email: string,
      phone: string,
      address: string
    },
    items: [{
      productId: string,
      name: string,
      price: number,
      quantity: number,
      note: string,
      image: string
    }],
    subtotal: number,
    discountAmount: number,
    shippingFee: number,
    grandTotal: number,
    paymentMethod: "cod" | "vnpay",
    paymentStatus: "pending" | "paid" | "failed",
    status: "pending" | "confirmed" | "preparing" | "shipping" | "delivered" | "cancelled",
    deliveryInfo: {
      method: "standard" | "express",
      address: string,
      date: string,
      time: string
    },
    couponCode: string,
    orderNote: string,
    createdAt: timestamp,
    updatedAt: timestamp,
    confirmedAt: timestamp
  }
}
```

## 🛠️ Core JavaScript Modules

### **Firebase Initialization**
```javascript
// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyA5NhPnsfXEUbXYzkdB5kvfaE0swtViJaI",
  authDomain: "coffee-and-cake-e2f5d.firebaseapp.com",
  databaseURL: "https://coffee-and-cake-e2f5d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coffee-and-cake-e2f5d",
  storageBucket: "coffee-and-cake-e2f5d.firebasestorage.app",
  messagingSenderId: "453243002159",
  appId: "1:453243002159:web:074baa5652ed789ecbd5da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
```

### **Authentication Module**
```javascript
// auth.js
class AuthManager {
  static async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async register(email, password, userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await set(ref(database, `users/${userCredential.user.uid}`), {
        ...userData,
        createdAt: new Date().toISOString()
      });
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async logout() {
    await signOut(auth);
  }
}
```

### **Cart Management**
```javascript
// cart.js
class CartManager {
  static getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  static addItem(productId, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartUI();
  }

  static removeItem(productId) {
    const cart = this.getCart().filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartUI();
  }

  static updateCartUI() {
    const count = this.getCart().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart_no').forEach(el => el.textContent = count);
  }

  static clear() {
    localStorage.removeItem('cart');
    this.updateCartUI();
  }
}
```

### **Real-time Data Manager**
```javascript
// realtime.js
class RealtimeManager {
  static listenToOrders(userId, callback) {
    const ordersRef = ref(database, 'orders');
    const userOrdersQuery = query(ordersRef, orderByChild('userId'), equalTo(userId));
    
    return onValue(userOrdersQuery, (snapshot) => {
      const orders = [];
      snapshot.forEach((childSnapshot) => {
        orders.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      callback(orders);
    });
  }

  static listenToPosts(callback) {
    const postsRef = ref(database, 'posts');
    const postsQuery = query(postsRef, orderByChild('timestamp'), limitToLast(50));
    
    return onValue(postsQuery, (snapshot) => {
      const posts = [];
      snapshot.forEach((childSnapshot) => {
        posts.unshift({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      callback(posts);
    });
  }
}
```

## 💳 Payment Integration

### **VNPAY Implementation**
```javascript
// vnpay.js
class VNPayManager {
  static async createPayment(orderData) {
    const vnp_TxnRef = Date.now().toString();
    const vnp_Amount = Math.round(orderData.grandTotal * 100);
    const vnp_ReturnUrl = `${window.location.origin}/vnpay_return.html`;
    
    const vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: 'YOUR_TMN_CODE',
      vnp_Amount,
      vnp_CurrCode: 'VND',
      vnp_TxnRef,
      vnp_OrderInfo: `Thanh toan don hang ${orderData.id}`,
      vnp_OrderType: 'other',
      vnp_Locale: 'vn',
      vnp_ReturnUrl,
      vnp_IpAddr: await this.getClientIp(),
      vnp_CreateDate: moment().format('YYYYMMDDHHmmss')
    };

    // Save mapping for later verification
    await set(ref(database, `vnpay_transactions/${vnp_TxnRef}`), {
      orderKey: orderData.id,
      amount: orderData.grandTotal,
      createdAt: new Date().toISOString(),
      status: 'pending'
    });

    const paymentUrl = this.buildPaymentUrl(vnp_Params);
    window.location.href = paymentUrl;
  }

  static buildPaymentUrl(params) {
    const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {});

    const queryString = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    return `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${queryString}`;
  }
}
```

## 🎨 UI Components

### **Modal System**
```javascript
// modal.js
class ModalManager {
  static show(modalId, data = {}) {
    const modal = document.getElementById(modalId);
    if (modal) {
      // Populate modal with data
      Object.entries(data).forEach(([key, value]) => {
        const element = modal.querySelector(`[data-field="${key}"]`);
        if (element) element.textContent = value;
      });
      
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  static hide(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }

  static init() {
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.hide(modal.id);
        }
      });
    });

    // Close modal when clicking close button
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        if (modal) this.hide(modal.id);
      });
    });
  }
}
```

### **Loading System**
```javascript
// loading.js
class LoadingManager {
  static show(message = 'Đang tải...') {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
      overlay.querySelector('.loading-message').textContent = message;
      overlay.style.display = 'flex';
    }
  }

  static hide() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  static showButtonLoading(button, loadingText = 'Đang xử lý...') {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.innerHTML = `<span class="spinner"></span> ${loadingText}`;
  }

  static hideButtonLoading(button) {
    button.disabled = false;
    button.textContent = button.dataset.originalText;
  }
}
```

## 📱 PWA Implementation

### **Service Worker**
```javascript
// service-worker.js
const CACHE_NAME = 'am-coffee-v1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/css/bootstrap.css',
  '/js/jquery-1.10.2.min.js',
  '/images/logo.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
```

### **Manifest Configuration**
```json
{
  "name": "Ấm - Coffee and Cake",
  "short_name": "Ấm Coffee",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#A67C52",
  "icons": [
    {
      "src": "images/LOGOapk.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "images/LOGOapk.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🔧 Utility Functions

### **Date & Time Utilities**
```javascript
// utils.js
class DateUtils {
  static formatDate(date) {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  static formatDateTime(date) {
    return new Date(date).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  static timeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    if (minutes > 0) return `${minutes} phút trước`;
    return 'Vừa xong';
  }
}
```

### **Validation Utilities**
```javascript
class ValidationUtils {
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  static isValidPassword(password) {
    return password.length >= 6;
  }

  static sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
  }
}
```

## 🚀 Performance Optimization

### **Image Lazy Loading**
```javascript
// lazy-loading.js
class LazyLoader {
  static init() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}
```

### **Debounce for Search**
```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage
const debouncedSearch = debounce(searchProducts, 300);
```

## 🔒 Security Best Practices

### **Input Sanitization**
```javascript
class SecurityUtils {
  static sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  static validateCSRF(token) {
    // Implement CSRF token validation
    return token === sessionStorage.getItem('csrfToken');
  }

  static encryptSensitiveData(data) {
    // Use crypto API for sensitive data
    return btoa(JSON.stringify(data));
  }
}
```

### **Rate Limiting**
```javascript
class RateLimiter {
  constructor(maxRequests = 5, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  isAllowed(identifier) {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, []);
    }

    const userRequests = this.requests.get(identifier);
    const validRequests = userRequests.filter(time => time > windowStart);
    
    this.requests.set(identifier, validRequests);

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    return true;
  }
}
```

## 📊 Analytics Integration

### **Custom Event Tracking**
```javascript
// analytics.js
class AnalyticsManager {
  static trackEvent(eventName, properties = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, properties);
    }

    // Firebase Analytics
    if (typeof firebase !== 'undefined' && firebase.analytics) {
      firebase.analytics().logEvent(eventName, properties);
    }

    // Custom tracking
    this.logToDatabase(eventName, properties);
  }

  static trackPageView(pageName) {
    this.trackEvent('page_view', {
      page_title: pageName,
      page_location: window.location.href
    });
  }

  static trackPurchase(orderData) {
    this.trackEvent('purchase', {
      transaction_id: orderData.id,
      value: orderData.grandTotal,
      currency: 'VND',
      items: orderData.items
    });
  }

  static async logToDatabase(eventName, properties) {
    if (auth.currentUser) {
      await push(ref(database, 'analytics_events'), {
        userId: auth.currentUser.uid,
        eventName,
        properties,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    }
  }
}
```

## 🧪 Testing Guidelines

### **Unit Testing Example**
```javascript
// tests/cart.test.js
describe('CartManager', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should add item to cart', () => {
    CartManager.addItem('product1', 2);
    const cart = CartManager.getCart();
    
    expect(cart).toHaveLength(1);
    expect(cart[0]).toEqual({
      productId: 'product1',
      quantity: 2
    });
  });

  test('should increase quantity for existing item', () => {
    CartManager.addItem('product1', 1);
    CartManager.addItem('product1', 2);
    const cart = CartManager.getCart();
    
    expect(cart[0].quantity).toBe(3);
  });
});
```

### **E2E Testing with Cypress**
```javascript
// cypress/integration/checkout.spec.js
describe('Checkout Process', () => {
  it('should complete order successfully', () => {
    cy.visit('/menu.html');
    cy.get('[data-product-id="drinks-item1"]').click();
    cy.get('.add-to-cart').click();
    cy.get('.cart-icon').click();
    cy.get('.checkout-btn').click();
    
    cy.url().should('include', '/checkout.html');
    cy.get('#billing_address').type('Test Address');
    cy.get('input[value="cod"]').check();
    cy.get('.place-order-btn').click();
    
    cy.contains('Đặt hàng thành công').should('be.visible');
  });
});
```

---

*Tài liệu này cung cấp hướng dẫn kỹ thuật chi tiết cho việc phát triển và bảo trì hệ thống Ấm - Coffee and Cake.*
