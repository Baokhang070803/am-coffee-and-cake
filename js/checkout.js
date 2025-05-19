import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyA5NhPnsfXEUbXYzkdB5kvfaE0swtViJaI",
    authDomain: "coffee-and-cake-e2f5d.firebaseapp.com",
    databaseURL: "https://coffee-and-cake-e2f5d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "coffee-and-cake-e2f5d",
    storageBucket: "coffee-and-cake-e2f5d.firebasestorage.app",
    messagingSenderId: "453243002159",
    appId: "1:453243002159:web:074baa5652ed789ecbd5da",
    measurementId: "G-1H7DM8MQCV"
};

// Initialize Firebase
let app, db;
try {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase:', error);
    Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Không thể khởi tạo Firebase. Vui lòng kiểm tra cấu hình.',
        showConfirmButton: true
    });
}

// Ẩn loading overlay
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.loading-overlay').classList.add('hidden');
    }, 1000);
});

// Tải dữ liệu sản phẩm từ Firebase
async function loadProductsFromFirebase() {
    if (!db) {
        console.error('Firebase database not initialized');
        return;
    }
    const categories = ['drinks', 'cakes', 'toppings'];
    let products = [];
    try {
        for (const category of categories) {
            const snapshot = await get(ref(db, `products/${category}`));
            if (snapshot.exists()) {
                const items = snapshot.val();
                Object.keys(items).forEach(itemId => {
                    products.push({
                        id: `${category}-${itemId}`,
                        name: items[itemId].name,
                        price: items[itemId].price,
                        category: category === 'drinks' ? 'Thức Uống' : category === 'cakes' ? 'Bánh' : 'Gọi Thêm',
                        image: items[itemId].image || 'https://via.placeholder.com/120',
                        attributes: items[itemId].attributes || ''
                    });
                });
            }
        }
        localStorage.setItem('products', JSON.stringify(products));
        console.log('Products loaded from Firebase:', products);
    } catch (error) {
        console.error('Error loading products from Firebase:', error);
        Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: `Không thể tải danh sách sản phẩm: ${error.message}.`,
            showConfirmButton: true
        });
    }
}

// Nhập giao dịch từ checkout.json vào Firebase
async function importTransactionsFromCheckoutJson() {
    if (!db) {
        console.error('Firebase database not initialized');
        return;
    }

    const transactions = [
        {
            "customerName": "Đỗ Minh Tiến",
            "amount": 70000,
            "date": "2025-04-16",
            "status": "pending",
            "productId": "drinks-item1",
            "productName": "Cà Phê Đen Đá",
            "quantity": 2,
            "billingAddress": "123 Đường Láng, Hà Nội",
            "shippingAddress": "123 Đường Láng, Hà Nội",
            "paymentMethod": "Thanh toán khi nhận hàng"
        },
        {
            "customerName": "Nguyễn Anh Kiệt",
            "amount": 30000,
            "date": "2025-04-16",
            "status": "pending",
            "productId": "cakes-item1",
            "productName": "Bánh Bông Lan",
            "quantity": 1,
            "billingAddress": "456 Lê Lợi, TP.HCM",
            "shippingAddress": "456 Lê Lợi, TP.HCM",
            "paymentMethod": "Chuyển khoản"
        },
        {
            "customerName": "Nguyễn Đăng Hải Đăng",
            "amount": 150000,
            "date": "2025-04-16",
            "status": "pending",
            "productId": "drinks-item3",
            "productName": "Latte",
            "quantity": 3,
            "billingAddress": "789 Nguyễn Huệ, Đà Nẵng",
            "shippingAddress": "789 Nguyễn Huệ, Đà Nẵng",
            "paymentMethod": "Thanh toán khi nhận hàng"
        },
        {
            "customerName": "Phạm Hồng Quấn",
            "amount": 40000,
            "date": "2025-04-16",
            "status": "pending",
            "productId": "drinks-item4",
            "productName": "Espresso",
            "quantity": 1,
            "billingAddress": "321 Trần Phú, Nha Trang",
            "shippingAddress": "321 Trần Phú, Nha Trang",
            "paymentMethod": "Chuyển khoản"
        },
        {
            "customerName": "Võ Trần Hoàng Bảo Khang",
            "amount": 110000,
            "date": "2025-04-16",
            "status": "pending",
            "productId": "cakes-item2",
            "productName": "Cheesecake",
            "quantity": 2,
            "billingAddress": "645 Cái Vồn, Bình Minh, Vĩnh Long",
            "shippingAddress": "645 Cái Vồn, Bình Minh, Vĩnh Long",
            "paymentMethod": "Thanh toán khi nhận hàng"
        },
        {
            "customerName": "Vương Hữu Phúc",
            "amount": 120000,
            "date": "2025-04-16",
            "status": "pending",
            "productId": "cakes-item4",
            "productName": "Tiramisu",
            "quantity": 2,
            "billingAddress": "147 Lý Thường Kiệt, Cần Thơ",
            "shippingAddress": "147 Lý Thường Kiệt, Cần Thơ",
            "paymentMethod": "Chuyển khoản"
        }
    ];

    try {
        for (const transaction of transactions) {
            const newTransactionRef = ref(db, 'transactions/' + push(ref(db, 'transactions')).key);
            await set(newTransactionRef, transaction);
            console.log('Transaction imported to Firebase:', transaction);
        }
        Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: 'Đã nhập giao dịch từ checkout.json vào Firebase.',
            timer: 1500,
            showConfirmButton: false
        });
    } catch (error) {
        console.error('Error importing transactions:', error);
        Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: `Không thể nhập giao dịch: ${error.message}. Vui lòng kiểm tra quy tắc bảo mật Firebase.`,
            showConfirmButton: true
        });
    }
}

// Cập nhật dropdown menu động
function loadDropdownMenu() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const dropdownDrinks = document.getElementById('dropdown-drinks');
    const dropdownCakes = document.getElementById('dropdown-cakes');
    const dropdownToppings = document.getElementById('dropdown-toppings');

    if (!dropdownDrinks || !dropdownCakes || !dropdownToppings) {
        console.error("Dropdown menu elements not found");
        return;
    }

    dropdownDrinks.innerHTML = '';
    dropdownCakes.innerHTML = '';
    dropdownToppings.innerHTML = '';

    products.forEach(product => {
        const item = `<li><a href="menu.html">${product.name}</a></li>`;
        if (product.category === 'Thức Uống') dropdownDrinks.innerHTML += item;
        else if (product.category === 'Bánh') dropdownCakes.innerHTML += item;
        else if (product.category === 'Gọi Thêm') dropdownToppings.innerHTML += item;
    });
}

// Cập nhật số lượng giỏ hàng
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartNo = document.querySelector('.cart_no');
    if (cartNo) {
        cartNo.textContent = count;
    }
}

// Cập nhật dropdown giỏ hàng
function updateCartDropdown() {
    const dropdown = document.querySelector('.option-cart-item');
    if (!dropdown) {
        console.error("Cart dropdown element not found");
        return;
    }

    dropdown.innerHTML = '';

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (cart.length === 0) {
        dropdown.innerHTML = '<li>Giỏ hàng trống!</li>';
        return;
    }

    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            let cartItem = document.createElement('li');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item">
                    <div class="image"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
                    <div class="item-description">
                        <p class="name">${product.name}</p>
                        <p>Số lượng: <span class="light-red">${item.quantity}</span></p>
                    </div>
                    <div class="right">
                        <p class="price">${(product.price * item.quantity).toLocaleString('vi-VN')} VND</p>
                        <a href="#" class="remove" data-product-id="${item.productId}">Xóa</a>
                    </div>
                </div>
            `;
            dropdown.appendChild(cartItem);
        }
    });

    document.querySelectorAll('.option-cart-item .remove').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-product-id');
            removeItem(productId);
        });
    });

    let totalPrice = cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
    let totalLi = document.createElement('li');
    totalLi.innerHTML = `<span class="total">Tổng <strong>${totalPrice.toLocaleString('vi-VN')} VND</strong></span><button class="checkout" onclick="location.href='checkout.html'">Thanh Toán</button>`;
    dropdown.appendChild(totalLi);
}

// Xóa sản phẩm khỏi giỏ
function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = JSON.parse(localStorage.getItem('products')).find(p => p.id === productId);
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDropdown();
    updateOrderDetails();

    Swal.fire({
        icon: 'success',
        title: 'Đã xóa!',
        text: `${product ? product.name : 'Sản phẩm'} đã được xóa khỏi giỏ hàng.`,
        showConfirmButton: false,
        timer: 1500
    });
}

// Kiểm tra điều kiện để chuyển bước
function canProceedToStep(step) {
    if (step === 1) return true; // Bước 1 luôn khả dụng
    if (step === 2) {
        return document.getElementById('step-1').classList.contains('active') || document.getElementById('step-1').classList.contains('completed');
    }
    if (step === 3) {
        const billingAddress = document.getElementById('billing_address').value;
        const privacyChecked = document.querySelector('input[name="privacy"]').checked;
        return billingAddress && privacyChecked;
    }
    if (step === 4) {
        const shippingAddress = document.getElementById('shipping_address').value;
        const payment = document.querySelector('input[name="payment_method"]:checked');
        return shippingAddress && payment;
    }
    return false;
}

// Chuyển đổi bước thanh toán
function toggleStep(step) {
    if (!canProceedToStep(step)) {
        Swal.fire({
            icon: 'warning',
            title: 'Không thể chuyển!',
            text: `Vui lòng hoàn thành bước ${step - 1} trước.`,
            showConfirmButton: true
        });
        return;
    }

    document.querySelectorAll('.steps').forEach(s => {
        s.classList.remove('active');
        if (parseInt(s.id.split('-')[1]) < step) {
            s.classList.add('completed');
        }
    });
    const targetStep = document.getElementById('step-' + step);
    targetStep.classList.add('active');
    targetStep.classList.remove('disabled');

    for (let i = 1; i <= step; i++) {
        document.getElementById('step-' + i).classList.remove('disabled');
    }

    if (step >= 2) {
        document.getElementById('full_name').value = "Võ Trần Hoàng Bảo Khang";
        document.getElementById('phone').value = "0795858581";
        document.getElementById('email').value = "baokhangml99@gmail.com";
        document.getElementById('receiver_name').value = "Võ Trần Hoàng Bảo Khang";
        document.getElementById('receiver_phone').value = "0795858581";
    }

    if (step === 4) updateOrderDetails();
}

// Chuyển sang bước tiếp theo
function nextStep() {
    const current = document.querySelector('.steps.active');
    const currentStepId = parseInt(current.id.split('-')[1]);
    if (currentStepId < 4 && canProceedToStep(currentStepId + 1)) {
        toggleStep(currentStepId + 1);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Thiếu thông tin!',
            text: 'Vui lòng hoàn thành các thông tin cần thiết trước khi tiếp tục.',
        });
    }
}

// Xử lý form thanh toán
document.getElementById('billing-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const billingAddress = document.getElementById('billing_address').value;
    const privacyChecked = document.querySelector('input[name="privacy"]').checked;
    if (!billingAddress) {
        Swal.fire({
            icon: 'warning',
            title: 'Thiếu thông tin!',
            text: 'Vui lòng nhập địa chỉ thanh toán.',
        });
        return;
    }
    if (!privacyChecked) {
        Swal.fire({
            icon: 'warning',
            title: 'Chưa đồng ý!',
            text: 'Vui lòng đồng ý với Chính Sách Bảo Mật.',
        });
        return;
    }
    nextStep();
});

// Xử lý form giao hàng
document.getElementById('shipping-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const shippingAddress = document.getElementById('shipping_address').value;
    const payment = document.querySelector('input[name="payment_method"]:checked');
    if (!shippingAddress) {
        Swal.fire({
            icon: 'warning',
            title: 'Thiếu thông tin!',
            text: 'Vui lòng nhập địa chỉ giao hàng.',
        });
        return;
    }
    if (!payment) {
        Swal.fire({
            icon: 'warning',
            title: 'Thiếu thông tin!',
            text: 'Vui lòng chọn phương thức thanh toán.',
        });
        return;
    }
    nextStep();
});

// Cập nhật chi tiết đơn hàng
function updateOrderDetails() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tbody = document.getElementById('order-items-body');

    if (!tbody) {
        console.error("Order items table body not found");
        return;
    }

    tbody.innerHTML = '';

    document.getElementById('order-fullname').textContent = "Võ Trần Hoàng Bảo Khang";
    document.getElementById('order-dob').textContent = "07/08/2003";
    document.getElementById('order-gender').textContent = "Nam";
    document.getElementById('order-address').textContent = "645, Cái Vồn, thị xã Bình Minh, tỉnh Vĩnh Long";
    document.getElementById('order-phone').textContent = "0795858581";
    document.getElementById('order-email').textContent = "baokhangml99@gmail.com";
    document.getElementById('order-membership').textContent = "Thành viên hạng đồng";
    document.getElementById('order-billing').textContent = document.getElementById('billing_address').value || "Chưa nhập";
    document.getElementById('order-payment').textContent = document.querySelector('input[name="payment_method"]:checked')?.nextElementSibling?.textContent || "Chưa chọn";

    if (cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">Giỏ hàng trống</td></tr>';
        document.getElementById('order-total').textContent = '0 VND';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${item.quantity}</td>
                <td>${product.price.toLocaleString('vi-VN')} VND</td>
                <td>${(product.price * item.quantity).toLocaleString('vi-VN')} VND</td>
            `;
            tbody.appendChild(row);
            total += product.price * item.quantity;
        }
    });

    document.getElementById('order-total').textContent = total.toLocaleString('vi-VN') + ' VND';
}

// Xác nhận đặt hàng
async function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Giỏ hàng trống!',
            text: 'Vui lòng thêm sản phẩm trước khi đặt hàng.',
        });
        return;
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const customerName = document.getElementById('order-fullname').textContent || "Khách vãng lai";
    const billingAddress = document.getElementById('order-billing').textContent || "";
    const shippingAddress = document.getElementById('shipping_address').value || "";
    const paymentMethod = document.getElementById('order-payment').textContent || "";

    try {
        for (const item of cart) {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const transaction = {
                    customerName: customerName,
                    amount: product.price * item.quantity,
                    date: new Date().toISOString().split('T')[0],
                    status: 'pending',
                    productId: product.id,
                    productName: product.name,
                    quantity: item.quantity,
                    billingAddress: billingAddress,
                    shippingAddress: shippingAddress,
                    paymentMethod: paymentMethod
                };
                const newTransactionRef = ref(db, 'transactions/' + push(ref(db, 'transactions')).key);
                await set(newTransactionRef, transaction);
                console.log('Transaction saved to Firebase:', transaction);
            }
        }

        localStorage.removeItem('cart');
        Swal.fire({
            icon: 'success',
            title: 'Đặt hàng thành công!',
            text: 'Cảm ơn bạn đã mua sắm tại Ấm - Coffee and Cake.',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'index.html';
            }
        });
    } catch (error) {
        console.error('Error saving transaction:', error);
        Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: `Không thể lưu giao dịch: ${error.message}. Vui lòng kiểm tra quy tắc bảo mật Firebase.`,
            showConfirmButton: true
        });
    }
}

// Khởi tạo trang checkout
async function initCheckout() {
    await loadProductsFromFirebase(); // Tải sản phẩm từ Firebase
    await importTransactionsFromCheckoutJson(); // Nhập giao dịch từ checkout.json
    loadDropdownMenu();
    updateCartCount();
    updateCartDropdown();
    if (document.getElementById('step-4').classList.contains('active')) {
        updateOrderDetails();
    }
}

// Cập nhật khi giỏ hàng thay đổi
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateOrderDetails();
        updateCartCount();
        updateCartDropdown();
    }
});

// Vô hiệu hóa carouFredSel cho các phần tử không tồn tại
$(document).ready(() => {
    if (!document.querySelector('#featured')) console.log('No #featured element, skipping carouFredSel');
    if (!document.querySelector('#hot')) console.log('No #hot element, skipping carouFredSel');
    if (!document.querySelector('#gallery_01')) console.log('No #gallery_01 element, skipping carouFredSel');
});

// Kiểm tra để giảm thiểu lỗi script.min.js
document.addEventListener('DOMContentLoaded', () => {
    const elements = ['#featured', '#hot', '#gallery_01'];
    elements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.log(`Element ${selector} not found, skipping initialization`);
        }
    });
    initCheckout();
});