# 🚀 Deployment Guide - Ấm Coffee & Cake

## 📋 Deployment Checklist

### **Pre-deployment**
- [ ] Code review completed
- [ ] All tests passing
- [ ] Firebase configuration updated
- [ ] Environment variables set
- [ ] Security rules reviewed
- [ ] Performance optimized
- [ ] SEO metadata updated
- [ ] Error handling tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked

---

## 🔥 Firebase Deployment

### **1. Firebase Setup**

#### **Install Firebase CLI**
```bash
npm install -g firebase-tools
firebase login
```

#### **Initialize Firebase Project**
```bash
cd am-coffee-and-cake
firebase init
```

**Select features:**
- [x] Hosting
- [x] Database (Realtime Database)
- [x] Storage
- [x] Functions (if needed)

### **2. Configure firebase.json**
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "**/*.md",
      "**/tests/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  },
  "database": {
    "rules": "database.rules.json"
  },
  "storage": {
    "rules": "storage.rules"
  }
}
```

### **3. Database Rules (database.rules.json)**
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
      ".write": "auth != null"
    },
    "employees": {
      ".read": "root.child('employees').child(auth.uid).exists()",
      ".write": "root.child('employees').child(auth.uid).child('role').val() === 'admin'"
    }
  }
}
```

### **4. Storage Rules (storage.rules)**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User uploads
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Product images (admin only for write)
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        firestore.get(/databases/(default)/documents/employees/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Public assets
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### **5. Deploy to Firebase**
```bash
# Build and deploy
firebase deploy

# Deploy specific services
firebase deploy --only hosting
firebase deploy --only database
firebase deploy --only storage
```

---

## 🌐 Alternative Hosting Options

### **1. Netlify Deployment**

#### **netlify.toml**
```toml
[build]
  publish = "."
  command = "echo 'No build required for static site'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

#### **Deploy Steps**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.
```

### **2. Vercel Deployment**

#### **vercel.json**
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*).js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).css",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### **3. GitHub Pages**

#### **.github/workflows/deploy.yml**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

---

## 🔧 Environment Configuration

### **1. Environment Variables**

#### **Production Config (firebase-config.prod.js)**
```javascript
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
```

#### **Development Config (firebase-config.dev.js)**
```javascript
const firebaseConfig = {
  apiKey: "dev-api-key",
  authDomain: "dev-project.firebaseapp.com",
  databaseURL: "https://dev-project-default-rtdb.firebaseio.com",
  projectId: "dev-project",
  storageBucket: "dev-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### **2. Build Scripts**

#### **package.json**
```json
{
  "name": "am-coffee-and-cake",
  "version": "1.0.0",
  "scripts": {
    "dev": "http-server . -p 3000 -o",
    "build": "npm run minify && npm run optimize",
    "minify": "npm run minify:css && npm run minify:js",
    "minify:css": "cleancss -o dist/style.min.css css/style.css",
    "minify:js": "uglifyjs js/*.js -o dist/app.min.js",
    "optimize": "npm run optimize:images",
    "optimize:images": "imagemin images/* --out-dir=dist/images",
    "deploy:firebase": "firebase deploy",
    "deploy:netlify": "netlify deploy --prod",
    "test": "jest",
    "lint": "eslint js/**/*.js",
    "serve": "http-server . -p 8080"
  },
  "devDependencies": {
    "clean-css-cli": "^5.6.0",
    "uglify-js": "^3.15.0",
    "imagemin-cli": "^7.0.0",
    "http-server": "^14.1.0",
    "jest": "^27.0.0",
    "eslint": "^8.0.0"
  }
}
```

---

## 🔒 Security Configuration

### **1. Content Security Policy**

#### **CSP Header**
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 
    https://www.gstatic.com 
    https://www.googleapis.com 
    https://apis.google.com
    https://cdnjs.cloudflare.com
    https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' 
    https://fonts.googleapis.com
    https://cdnjs.cloudflare.com;
  font-src 'self' 
    https://fonts.gstatic.com
    https://cdnjs.cloudflare.com;
  img-src 'self' data: 
    https://firebasestorage.googleapis.com
    https://res.cloudinary.com
    https://via.placeholder.com;
  connect-src 'self' 
    https://*.googleapis.com
    https://*.firebaseio.com
    wss://*.firebaseio.com;
">
```

### **2. Security Headers**

#### **Firebase Hosting Headers**
```json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          },
          {
            "key": "Strict-Transport-Security",
            "value": "max-age=31536000; includeSubDomains"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          }
        ]
      }
    ]
  }
}
```

---

## 📊 Performance Optimization

### **1. Image Optimization**

#### **WebP Conversion**
```bash
# Convert images to WebP
cwebp -q 80 images/*.jpg -o images/
cwebp -q 80 images/*.png -o images/
```

#### **Responsive Images**
```html
<picture>
  <source srcset="images/hero-small.webp" media="(max-width: 768px)" type="image/webp">
  <source srcset="images/hero-large.webp" media="(min-width: 769px)" type="image/webp">
  <img src="images/hero.jpg" alt="Hero Image" loading="lazy">
</picture>
```

### **2. Code Splitting**

#### **Dynamic Imports**
```javascript
// Lazy load modules
async function loadModule(moduleName) {
  const module = await import(`./modules/${moduleName}.js`);
  return module.default;
}

// Load admin features only when needed
if (userRole === 'admin') {
  const AdminDashboard = await loadModule('admin-dashboard');
  AdminDashboard.init();
}
```

### **3. Service Worker Caching**

#### **Advanced Caching Strategy**
```javascript
// service-worker.js
const CACHE_NAME = 'am-coffee-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';

// Cache strategies
const cacheFirst = [
  '/css/',
  '/js/',
  '/images/',
  '/fonts/'
];

const networkFirst = [
  '/api/',
  '/products/',
  '/orders/'
];

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Cache first strategy for static assets
  if (cacheFirst.some(path => url.pathname.includes(path))) {
    event.respondWith(cacheFirstStrategy(event.request));
  }
  // Network first strategy for dynamic content
  else if (networkFirst.some(path => url.pathname.includes(path))) {
    event.respondWith(networkFirstStrategy(event.request));
  }
  // Default strategy
  else {
    event.respondWith(defaultStrategy(event.request));
  }
});
```

---

## 📱 PWA Configuration

### **1. App Install Prompt**

#### **install-prompt.js**
```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  deferredPrompt = e;
  
  // Show install button
  const installButton = document.getElementById('install-button');
  installButton.style.display = 'block';
  
  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      
      deferredPrompt = null;
      installButton.style.display = 'none';
    }
  });
});

// Handle successful installation
window.addEventListener('appinstalled', (evt) => {
  console.log('App was installed');
  // Track installation event
  gtag('event', 'app_install', {
    method: 'browser_prompt'
  });
});
```

### **2. Offline Support**

#### **offline.js**
```javascript
class OfflineManager {
  static init() {
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));
    
    // Check initial status
    if (!navigator.onLine) {
      this.handleOffline();
    }
  }

  static handleOnline() {
    console.log('Back online');
    this.hideOfflineMessage();
    this.syncOfflineData();
  }

  static handleOffline() {
    console.log('Gone offline');
    this.showOfflineMessage();
  }

  static showOfflineMessage() {
    const message = document.createElement('div');
    message.id = 'offline-message';
    message.innerHTML = `
      <div class="offline-banner">
        <i class="fa fa-wifi"></i>
        Bạn đang offline. Một số tính năng có thể không khả dụng.
      </div>
    `;
    document.body.appendChild(message);
  }

  static hideOfflineMessage() {
    const message = document.getElementById('offline-message');
    if (message) {
      message.remove();
    }
  }

  static async syncOfflineData() {
    // Sync pending orders, messages, etc.
    const pendingData = this.getPendingData();
    for (const item of pendingData) {
      try {
        await this.syncItem(item);
        this.removePendingItem(item.id);
      } catch (error) {
        console.error('Sync failed for item:', item.id, error);
      }
    }
  }
}
```

---

## 🔍 Monitoring & Analytics

### **1. Error Tracking**

#### **error-tracking.js**
```javascript
class ErrorTracker {
  static init() {
    window.addEventListener('error', this.handleError.bind(this));
    window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
  }

  static handleError(event) {
    this.logError({
      type: 'javascript_error',
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    });
  }

  static handlePromiseRejection(event) {
    this.logError({
      type: 'promise_rejection',
      message: event.reason?.message || 'Unhandled Promise Rejection',
      stack: event.reason?.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    });
  }

  static async logError(errorData) {
    try {
      // Log to Firebase
      if (firebase.database) {
        await firebase.database().ref('error_logs').push(errorData);
      }
      
      // Log to external service (e.g., Sentry)
      if (window.Sentry) {
        Sentry.captureException(new Error(errorData.message));
      }
    } catch (error) {
      console.error('Failed to log error:', error);
    }
  }
}
```

### **2. Performance Monitoring**

#### **performance.js**
```javascript
class PerformanceMonitor {
  static init() {
    // Monitor Core Web Vitals
    this.monitorWebVitals();
    
    // Monitor Firebase performance
    this.monitorFirebasePerformance();
    
    // Monitor custom metrics
    this.monitorCustomMetrics();
  }

  static monitorWebVitals() {
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(this.sendToAnalytics.bind(this));
        getFID(this.sendToAnalytics.bind(this));
        getFCP(this.sendToAnalytics.bind(this));
        getLCP(this.sendToAnalytics.bind(this));
        getTTFB(this.sendToAnalytics.bind(this));
      });
    }
  }

  static sendToAnalytics(metric) {
    gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_parameter_1: metric.id,
      custom_parameter_2: metric.delta
    });
  }

  static monitorCustomMetrics() {
    // Cart conversion rate
    this.trackCartConversion();
    
    // User engagement
    this.trackUserEngagement();
    
    // API response times
    this.trackAPIPerformance();
  }
}
```

---

## 🧪 Testing Strategy

### **1. End-to-End Testing**

#### **cypress.config.js**
```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

#### **E2E Test Example**
```javascript
// cypress/e2e/user-journey.cy.js
describe('Complete User Journey', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should complete a full purchase flow', () => {
    // Browse products
    cy.get('[data-cy=menu-link]').click();
    cy.url().should('include', '/menu.html');
    
    // Add to cart
    cy.get('[data-cy=product-card]').first().within(() => {
      cy.get('[data-cy=add-to-cart]').click();
    });
    
    // Verify cart
    cy.get('[data-cy=cart-count]').should('contain', '1');
    
    // Proceed to checkout
    cy.get('[data-cy=cart-icon]').click();
    cy.get('[data-cy=checkout-btn]').click();
    
    // Login
    cy.get('[data-cy=login-email]').type('test@example.com');
    cy.get('[data-cy=login-password]').type('password123');
    cy.get('[data-cy=login-submit]').click();
    
    // Complete checkout
    cy.get('[data-cy=billing-address]').type('123 Test Street');
    cy.get('[data-cy=payment-method-cod]').check();
    cy.get('[data-cy=place-order]').click();
    
    // Verify success
    cy.contains('Đặt hàng thành công').should('be.visible');
  });
});
```

### **2. Performance Testing**

#### **lighthouse-ci.json**
```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

---

## 📈 Continuous Deployment

### **1. GitHub Actions Workflow**

#### **.github/workflows/deploy.yml**
```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run Lighthouse CI
      run: npm run lighthouse-ci
    
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build project
      run: npm run build
      
    - name: Deploy to Firebase
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
        projectId: coffee-and-cake-e2f5d
        channelId: live
```

### **2. Pre-deployment Checks**

#### **pre-deploy.sh**
```bash
#!/bin/bash

echo "🚀 Pre-deployment checks starting..."

# Check for console.log statements
if grep -r "console\.log" js/ --exclude-dir=node_modules; then
  echo "❌ Found console.log statements. Please remove them."
  exit 1
fi

# Check for TODO comments
if grep -r "TODO\|FIXME" . --exclude-dir=node_modules --exclude-dir=.git; then
  echo "⚠️  Found TODO/FIXME comments. Please review."
fi

# Run security audit
npm audit --audit-level=high
if [ $? -ne 0 ]; then
  echo "❌ Security vulnerabilities found. Please fix them."
  exit 1
fi

# Check bundle size
BUNDLE_SIZE=$(wc -c < "dist/app.min.js")
MAX_SIZE=1048576  # 1MB

if [ $BUNDLE_SIZE -gt $MAX_SIZE ]; then
  echo "❌ Bundle size too large: $(($BUNDLE_SIZE / 1024))KB > 1MB"
  exit 1
fi

echo "✅ All pre-deployment checks passed!"
```

---

*Hướng dẫn này cung cấp quy trình triển khai hoàn chỉnh cho dự án Ấm - Coffee and Cake, từ cấu hình đến monitoring và bảo trì.*
