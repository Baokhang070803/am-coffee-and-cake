# 📋 Entity Relationship Diagram (ERD) - Orders Table
## Bảng Đơn Hàng - Ấm Coffee & Cake

---

## 🎯 **MÔ TẢ TỔNG QUAN**
Bảng `orders` là bảng trung tâm của hệ thống e-commerce, lưu trữ tất cả thông tin về đơn hàng từ lúc tạo đến khi hoàn thành.

---

## 📊 **ERD SCHEMA**

### **Code cho dbdiagram.io:**

```dbml
// =============================================================================
// ERD - Orders Module for Ấm Coffee & Cake E-Commerce System
// =============================================================================

Project coffee_orders {
  database_type: 'Firebase'
  Note: '''
    # Orders Management System - Ấm Coffee & Cake
    Hệ thống quản lý đơn hàng cho cửa hàng cà phê và bánh ngọt
    
    **Features:**
    - Order lifecycle management
    - Multiple payment methods (VNPay, COD)
    - Customer reviews and ratings
    - Real-time order tracking
    - Promotion and discount system
  '''
}

// =============================================================================
// MAIN TABLES
// =============================================================================

Table orders {
  order_id varchar(50) [pk, note: 'Firebase generated ID']
  user_id varchar(50) [not null, note: 'Reference to users table']
  
  // Timing Information
  order_date varchar(20) [not null, note: 'DD/MM/YYYY format']
  order_time varchar(10) [not null, note: 'HH:mm:ss format']
  created_at timestamp [not null, default: `now()`]
  updated_at timestamp [note: 'Last modification time']
  confirmed_at timestamp [note: 'Order confirmation time']
  cancelled_at timestamp [note: 'Cancellation time']
  
  // Customer Information
  full_name varchar(100) [not null]
  
  // Financial Information
  subtotal decimal(12,2) [not null, note: 'Total before discounts']
  discount_amount decimal(12,2) [default: 0, note: 'Total discount applied']
  shipping_fee decimal(12,2) [default: 0]
  grand_total decimal(12,2) [not null, note: 'Final amount to pay']
  
  // Promotion Information
  coupon_code varchar(20) [note: 'Applied coupon code']
  coupon_discount decimal(5,2) [default: 0, note: 'Discount percentage']
  coupon_type varchar(20) [note: 'Type of coupon applied']
  
  // Payment Information
  payment_method varchar(20) [not null, note: 'vnpay | cod']
  payment_status varchar(20) [not null, note: 'paid | pending | not_required | failed']
  
  // Delivery Information
  delivery_method varchar(20) [not null, note: 'standard | express']
  order_status varchar(20) [not null, note: 'pending | awaiting_payment | confirmed | preparing | shipping | delivered | cancelled']
  
  // Additional Information
  order_note text [note: 'Customer notes']
  cancel_reason varchar(100) [note: 'Reason for cancellation']
  
  indexes {
    user_id [name: 'idx_orders_user_id']
    order_status [name: 'idx_orders_status']
    payment_status [name: 'idx_orders_payment_status']
    created_at [name: 'idx_orders_created_at']
    (user_id, order_status) [name: 'idx_orders_user_status']
    payment_method [name: 'idx_orders_payment_method']
    order_date [name: 'idx_orders_date']
  }
}

Table order_customer_info {
  order_id varchar(50) [pk]
  customer_name varchar(100) [not null]
  full_name varchar(100) [not null]
  email varchar(100) [not null]
  phone varchar(20) [not null]
  address text [not null]
}

Table order_billing_info {
  order_id varchar(50) [pk]
  full_name varchar(100) [not null]
  email varchar(100) [not null]
  phone varchar(20) [not null]
  address text [not null]
}

Table order_shipping_info {
  order_id varchar(50) [pk]
  receiver_name varchar(100) [not null]
  receiver_phone varchar(20) [not null]
  address text [not null]
}

Table order_payment_details {
  order_id varchar(50) [pk]
  amount decimal(12,2) [not null]
  pay_date varchar(30) [note: 'DD/MM/YYYY HH:mm:ss']
  response_code varchar(10) [note: 'Gateway response code']
  transaction_no varchar(50) [note: 'Transaction number']
  vnp_txn_ref varchar(50) [note: 'VNPay transaction reference']
  
  indexes {
    transaction_no [name: 'idx_payment_transaction_no']
    vnp_txn_ref [name: 'idx_payment_vnp_ref']
  }
}

Table order_items {
  order_item_id varchar(50) [pk, note: 'Unique item identifier']
  order_id varchar(50) [not null]
  product_id varchar(50) [not null]
  product_name varchar(100) [not null, note: 'Product name at time of order']
  product_price decimal(10,2) [not null, note: 'Product price at time of order']
  quantity int [not null, note: 'Quantity ordered']
  product_image varchar(500) [note: 'Product image URL']
  
  indexes {
    order_id [name: 'idx_order_items_order_id']
    product_id [name: 'idx_order_items_product_id']
    (order_id, product_id) [name: 'idx_order_items_order_product']
  }
}

Table order_reviews {
  review_id varchar(50) [pk]
  order_id varchar(50) [not null]
  user_id varchar(50) [not null]
  user_name varchar(100) [not null]
  rating int [not null, note: 'Rating from 1 to 5']
  comment text [note: 'Review comment']
  created_at timestamp [not null, default: `now()`]
  
  indexes {
    order_id [name: 'idx_reviews_order_id']
    user_id [name: 'idx_reviews_user_id']
    rating [name: 'idx_reviews_rating']
    created_at [name: 'idx_reviews_created_at']
  }
}

// =============================================================================
// REFERENCE TABLES
// =============================================================================

Table users {
  user_id varchar(50) [pk]
  full_name varchar(100) [not null]
  email varchar(100) [not null, unique]
  phone varchar(20)
  address text
  membership_level varchar(20) [note: 'bronze | silver | gold | diamond']
  created_at timestamp [not null, default: `now()`]
  
  indexes {
    email [unique, name: 'idx_users_email']
    membership_level [name: 'idx_users_membership']
  }
}

Table products {
  product_id varchar(50) [pk]
  product_name varchar(100) [not null]
  price decimal(10,2) [not null]
  category varchar(20) [not null, note: 'drinks | cakes | toppings']
  image_url varchar(500)
  is_available boolean [default: true]
  created_at timestamp [not null, default: `now()`]
  
  indexes {
    category [name: 'idx_products_category']
    is_available [name: 'idx_products_available']
    price [name: 'idx_products_price']
  }
}

Table promotions {
  promo_code varchar(20) [pk]
  discount_type varchar(20) [not null, note: 'percentage | fixed']
  discount_value decimal(10,2) [not null]
  min_order_amount decimal(10,2) [default: 0]
  max_discount decimal(10,2)
  start_date date [not null]
  end_date date [not null]
  usage_limit int
  promo_status varchar(20) [not null, note: 'active | inactive | expired']
  
  indexes {
    promo_status [name: 'idx_promotions_status']
    (start_date, end_date) [name: 'idx_promotions_date_range']
  }
}

// =============================================================================
// RELATIONSHIPS
// =============================================================================

Ref: orders.user_id > users.user_id [delete: restrict]
Ref: orders.coupon_code > promotions.promo_code [delete: set null]
Ref: order_items.order_id > orders.order_id [delete: cascade]
Ref: order_items.product_id > products.product_id [delete: restrict]
Ref: order_reviews.order_id > orders.order_id [delete: cascade]
Ref: order_reviews.user_id > users.user_id [delete: cascade]
Ref: order_customer_info.order_id - orders.order_id [delete: cascade]
Ref: order_billing_info.order_id - orders.order_id [delete: cascade]
Ref: order_shipping_info.order_id - orders.order_id [delete: cascade]
Ref: order_payment_details.order_id - orders.order_id [delete: cascade]

// =============================================================================
// TABLE GROUPS FOR BETTER VISUALIZATION
// =============================================================================

TableGroup "Order Core" {
  orders
  order_items
}

TableGroup "Order Details" {
  order_customer_info
  order_billing_info
  order_shipping_info
  order_payment_details
}

TableGroup "Order Feedback" {
  order_reviews
}

TableGroup "Reference Data" {
  users
  products
  promotions
}
```

### **Hướng dẫn sử dụng:**

1. **Truy cập**: [dbdiagram.io](https://dbdiagram.io)
2. **Tạo diagram mới**: Click "Create your database diagram"
3. **Copy code trên** và paste vào editor
4. **Render**: Click "Export" để xuất ra hình ảnh hoặc SQL

---

## 🔗 **RELATIONSHIPS (MỐI QUAN HỆ)**

### **1. Orders ↔ Users (N:1)**
- Một người dùng có thể có nhiều đơn hàng
- Một đơn hàng chỉ thuộc về một người dùng
- **Foreign Key**: `Orders.userId → Users.userId`

### **2. Orders ↔ OrderItems (1:N)**
- Một đơn hàng có thể có nhiều sản phẩm
- Một item chỉ thuộc về một đơn hàng
- **Foreign Key**: `OrderItems.orderId → Orders.orderId`

### **3. OrderItems ↔ Products (N:1)**
- Một sản phẩm có thể xuất hiện trong nhiều đơn hàng
- Một item tham chiếu đến một sản phẩm
- **Foreign Key**: `OrderItems.productId → Products.productId`

### **4. Orders ↔ OrderReviews (1:1)**
- Một đơn hàng có thể có một đánh giá
- Một đánh giá thuộc về một đơn hàng
- **Foreign Key**: `OrderReviews.orderId → Orders.orderId`

### **5. Orders ↔ Promotions (N:1)**
- Một mã giảm giá có thể được sử dụng cho nhiều đơn hàng
- Một đơn hàng có thể sử dụng một mã giảm giá
- **Foreign Key**: `Orders.couponCode → Promotions.promoCode`

### **6. Các bảng thông tin chi tiết (1:1)**
- `OrderCustomerInfo`, `OrderBillingInfo`, `OrderShippingInfo`, `OrderPaymentDetails`
- Mỗi bảng có quan hệ 1:1 với bảng `Orders`

---

## 📋 **BUSINESS RULES (QUY TẮC KINH DOANH)**

### **1. Trạng thái đơn hàng:**
```
pending → awaiting_payment (VNPay) → confirmed → preparing → shipping → delivered
   ↓                                      ↓
cancelled                             cancelled
```

### **2. Thanh toán:**
- **COD**: `paymentStatus = "not_required"`
- **VNPay**: `paymentStatus = "pending"` → `"paid"` hoặc `"failed"`

### **3. Ràng buộc:**
- `grandTotal = subtotal - discountAmount + shippingFee`
- `rating` phải từ 1 đến 5
- `deliveryMethod` chỉ có thể là `"standard"` hoặc `"express"`
- Chỉ có thể review khi `status = "delivered"`

### **4. Indexes cho hiệu suất:**
- Tìm kiếm theo `userId` và `status`
- Lọc theo `paymentStatus`
- Sắp xếp theo `createdAt`
- Tra cứu `transactionNo` cho VNPay

---

## 🎯 **USE CASES CHỦ YẾU**

1. **Tạo đơn hàng mới**
2. **Cập nhật trạng thái đơn hàng**
3. **Xử lý thanh toán VNPay**
4. **Tìm kiếm đơn hàng theo filter**
5. **Thống kê doanh thu**
6. **Quản lý đánh giá khách hàng**
7. **Xử lý hủy đơn và hoàn tiền**

---

*ERD này mô tả đầy đủ cấu trúc dữ liệu cho module đơn hàng của hệ thống Ấm Coffee & Cake, đảm bảo tính nhất quán và hiệu suất cao.*
