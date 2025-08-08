# 📊 Data Flow Diagram (DFD) - E-Commerce System
## Hệ thống Bán hàng Trực tuyến - Ấm Coffee & Cake

---

## 🎯 Overview

Sơ đồ luồng dữ liệu (DFD) mô tả cách dữ liệu di chuyển qua hệ thống bán hàng trực tuyến của Ấm - Coffee and Cake, từ việc khách hàng duyệt sản phẩm đến hoàn tất đơn hàng.

---

## 📋 DFD Level 0 (Context Diagram)

```mermaid
graph TB
    subgraph "External Entities"
        C[👤 Khách hàng]
        A[👨‍💼 Admin] 
        E[👨‍💻 Nhân viên]
        P[💳 VNPAY Gateway]
        S[📧 SMS/Email Service]
    end
    
    subgraph "Hệ thống E-Commerce"
        ES[🛒 E-Commerce System]
    end
    
    C -->|Đăng ký/Đăng nhập| ES
    C -->|Duyệt sản phẩm| ES
    C -->|Thêm vào giỏ hàng| ES
    C -->|Đặt hàng| ES
    C -->|Thanh toán| ES
    
    ES -->|Thông tin sản phẩm| C
    ES -->|Trạng thái đơn hàng| C
    ES -->|Hóa đơn| C
    
    A -->|Quản lý sản phẩm| ES
    A -->|Quản lý đơn hàng| ES
    ES -->|Báo cáo bán hàng| A
    
    E -->|Xử lý đơn hàng| ES
    ES -->|Danh sách đơn hàng| E
    
    ES -->|Yêu cầu thanh toán| P
    P -->|Kết quả thanh toán| ES
    
    ES -->|Gửi thông báo| S
    S -->|Trạng thái gửi| ES
```

---

## 📊 DFD Level 1 (System Overview)

```mermaid
graph TB
    subgraph "External Entities"
        C[👤 Khách hàng]
        A[👨‍💼 Admin]
        P[💳 VNPAY]
        N[📧 Notification Service]
    end
    
    subgraph "E-Commerce Processes"
        P1[1.0<br/>🔐 Quản lý<br/>Người dùng]
        P2[2.0<br/>📦 Quản lý<br/>Sản phẩm]
        P3[3.0<br/>🛒 Quản lý<br/>Giỏ hàng]
        P4[4.0<br/>📋 Xử lý<br/>Đơn hàng]
        P5[5.0<br/>💳 Xử lý<br/>Thanh toán]
        P6[6.0<br/>📊 Báo cáo &<br/>Thống kê]
    end
    
    subgraph "Data Stores"
        D1[(D1: Users<br/>👥 Người dùng)]
        D2[(D2: Products<br/>📦 Sản phẩm)]
        D3[(D3: Shopping Cart<br/>🛒 Giỏ hàng)]
        D4[(D4: Orders<br/>📋 Đơn hàng)]
        D5[(D5: Payments<br/>💳 Thanh toán)]
        D6[(D6: Inventory<br/>📊 Kho hàng)]
    end
    
    %% Customer flows
    C -->|Đăng ký/Đăng nhập| P1
    C -->|Duyệt sản phẩm| P2
    C -->|Thêm vào giỏ| P3
    C -->|Đặt hàng| P4
    C -->|Thanh toán| P5
    
    P1 -->|Thông tin tài khoản| C
    P2 -->|Danh sách sản phẩm| C
    P3 -->|Giỏ hàng| C
    P4 -->|Xác nhận đơn hàng| C
    P5 -->|Kết quả thanh toán| C
    
    %% Admin flows
    A -->|Quản lý sản phẩm| P2
    A -->|Quản lý đơn hàng| P4
    A -->|Xem báo cáo| P6
    
    P2 -->|Danh sách sản phẩm| A
    P4 -->|Trạng thái đơn hàng| A
    P6 -->|Báo cáo| A
    
    %% Payment flows
    P5 -->|Yêu cầu thanh toán| P
    P -->|Kết quả thanh toán| P5
    
    %% Notification flows
    P4 -->|Thông báo đơn hàng| N
    P5 -->|Thông báo thanh toán| N
    
    %% Data store connections
    P1 -.->|Read/Write| D1
    P2 -.->|Read/Write| D2
    P2 -.->|Update| D6
    P3 -.->|Read/Write| D3
    P4 -.->|Read/Write| D4
    P4 -.->|Read| D3
    P4 -.->|Read| D2
    P4 -.->|Update| D6
    P5 -.->|Read/Write| D5
    P5 -.->|Read| D4
    P6 -.->|Read| D4
    P6 -.->|Read| D5
    P6 -.->|Read| D6
```

---

## 🔍 DFD Level 2 - Chi tiết Process 4.0 (Xử lý Đơn hàng)

```mermaid
graph TB
    subgraph "External Entities"
        C[👤 Khách hàng]
        E[👨‍💻 Nhân viên]
        N[📧 Notification]
    end
    
    subgraph "Order Processing Detailed"
        P41[4.1<br/>🔍 Validate<br/>Đơn hàng]
        P42[4.2<br/>💰 Tính toán<br/>Giá tiền]
        P43[4.3<br/>🎟️ Áp dụng<br/>Khuyến mãi]
        P44[4.4<br/>📝 Tạo<br/>Đơn hàng]
        P45[4.5<br/>📦 Kiểm tra<br/>Tồn kho]
        P46[4.6<br/>✅ Xác nhận<br/>Đơn hàng]
        P47[4.7<br/>📊 Cập nhật<br/>Thống kê]
    end
    
    subgraph "Data Stores"
        D2[(D2: Products)]
        D3[(D3: Cart)]
        D4[(D4: Orders)]
        D5[(D5: Promotions)]
        D6[(D6: Inventory)]
        D7[(D7: Statistics)]
    end
    
    %% Input flows
    C -->|Yêu cầu đặt hàng| P41
    C -->|Mã khuyến mãi| P43
    E -->|Xác nhận đơn hàng| P46
    
    %% Process flows
    P41 -->|Đơn hàng hợp lệ| P42
    P42 -->|Tổng tiền| P43
    P43 -->|Giá sau giảm| P44
    P44 -->|Đơn hàng mới| P45
    P45 -->|Kiểm tra OK| P46
    P46 -->|Đơn hàng đã xác nhận| P47
    
    %% Output flows
    P41 -->|Lỗi validation| C
    P45 -->|Hết hàng| C
    P46 -->|Xác nhận thành công| C
    P46 -->|Thông báo đơn hàng| N
    P47 -->|Cập nhật hoàn tất| E
    
    %% Data store interactions
    P41 -.->|Read| D3
    P41 -.->|Read| D2
    P42 -.->|Read| D2
    P43 -.->|Read| D5
    P44 -.->|Write| D4
    P45 -.->|Read| D6
    P46 -.->|Update| D4
    P46 -.->|Update| D6
    P47 -.->|Update| D7
```

---

## 💳 DFD Level 2 - Chi tiết Process 5.0 (Xử lý Thanh toán)

```mermaid
graph TB
    subgraph "External Entities"
        C[👤 Khách hàng]
        V[💳 VNPAY Gateway]
        B[🏦 Bank]
        N[📧 Notification]
    end
    
    subgraph "Payment Processing Detailed"
        P51[5.1<br/>💰 Chọn phương thức<br/>Thanh toán]
        P52[5.2<br/>🔐 Tạo yêu cầu<br/>Thanh toán]
        P53[5.3<br/>🔄 Xử lý<br/>VNPAY]
        P54[5.4<br/>💵 Xử lý<br/>COD]
        P55[5.5<br/>✅ Xác minh<br/>Thanh toán]
        P56[5.6<br/>📝 Cập nhật<br/>Trạng thái]
        P57[5.7<br/>🧾 Tạo hóa đơn<br/>& Gửi email]
    end
    
    subgraph "Data Stores"
        D4[(D4: Orders)]
        D5[(D5: Payments)]
        D8[(D8: Payment Log)]
        D9[(D9: Invoices)]
    end
    
    %% Input flows
    C -->|Chọn thanh toán| P51
    C -->|Thông tin thanh toán| P52
    V -->|Kết quả VNPAY| P55
    B -->|Xác nhận giao dịch| P55
    
    %% Process flows
    P51 -->|VNPAY| P53
    P51 -->|COD| P54
    P52 -->|Yêu cầu| P53
    P53 -->|Chuyển hướng| C
    P53 -->|Log transaction| P55
    P54 -->|COD confirmed| P56
    P55 -->|Verified| P56
    P56 -->|Status updated| P57
    
    %% Output flows
    P52 -->|Lỗi thanh toán| C
    P53 -->|Payment URL| C
    P55 -->|Kết quả| C
    P57 -->|Hóa đơn| C
    P57 -->|Thông báo| N
    
    %% External integrations
    P53 -->|Payment request| V
    P55 -->|Verify with bank| B
    
    %% Data store interactions
    P51 -.->|Read| D4
    P52 -.->|Read| D4
    P55 -.->|Write| D8
    P56 -.->|Update| D4
    P56 -.->|Write| D5
    P57 -.->|Write| D9
```

---

## 🛒 DFD Level 2 - Chi tiết Process 3.0 (Quản lý Giỏ hàng)

```mermaid
graph TB
    subgraph "External Entities"
        C[👤 Khách hàng]
    end
    
    subgraph "Shopping Cart Management"
        P31[3.1<br/>➕ Thêm sản phẩm<br/>vào giỏ]
        P32[3.2<br/>🔢 Cập nhật<br/>số lượng]
        P33[3.3<br/>❌ Xóa sản phẩm<br/>khỏi giỏ]
        P34[3.4<br/>💰 Tính tổng<br/>giá trị]
        P35[3.5<br/>🎟️ Áp dụng<br/>mã giảm giá]
        P36[3.6<br/>💾 Lưu trạng thái<br/>giỏ hàng]
        P37[3.7<br/>🔄 Đồng bộ<br/>cross-device]
    end
    
    subgraph "Data Stores"
        D2[(D2: Products)]
        D3[(D3: Shopping Cart)]
        D5[(D5: Promotions)]
        D10[(D10: User Session)]
    end
    
    %% Input flows
    C -->|Thêm sản phẩm| P31
    C -->|Thay đổi số lượng| P32
    C -->|Xóa sản phẩm| P33
    C -->|Nhập mã giảm giá| P35
    C -->|Đăng nhập thiết bị khác| P37
    
    %% Process flows
    P31 -->|Sản phẩm đã thêm| P34
    P32 -->|Số lượng cập nhật| P34
    P33 -->|Sản phẩm đã xóa| P34
    P34 -->|Tổng tiền| P36
    P35 -->|Giảm giá áp dụng| P34
    P36 -->|Lưu thành công| P37
    
    %% Output flows
    P31 -->|Xác nhận thêm| C
    P32 -->|Số lượng mới| C
    P33 -->|Xác nhận xóa| C
    P34 -->|Tổng giá trị| C
    P35 -->|Giảm giá áp dụng| C
    P36 -->|Giỏ hàng đã lưu| C
    P37 -->|Giỏ hàng đồng bộ| C
    
    %% Data store interactions
    P31 -.->|Read| D2
    P31 -.->|Write| D3
    P32 -.->|Update| D3
    P33 -.->|Delete| D3
    P34 -.->|Read| D3
    P34 -.->|Read| D2
    P35 -.->|Read| D5
    P35 -.->|Update| D3
    P36 -.->|Write| D3
    P36 -.->|Write| D10
    P37 -.->|Read/Write| D3
    P37 -.->|Read| D10
```

---

## 📊 Data Dictionary (Từ điển Dữ liệu)

### **Data Flows**

| Tên Data Flow | Mô tả | Thành phần dữ liệu |
|---------------|-------|-------------------|
| **Đăng ký/Đăng nhập** | Thông tin xác thực người dùng | email + password + fullName + phone |
| **Duyệt sản phẩm** | Yêu cầu xem danh sách sản phẩm | category + filter + search_term |
| **Thêm vào giỏ** | Thêm sản phẩm vào giỏ hàng | product_id + quantity + options |
| **Đặt hàng** | Thông tin đơn hàng | customer_info + items + delivery_info + payment_method |
| **Thanh toán** | Thông tin thanh toán | order_id + amount + payment_method + customer_info |
| **Kết quả thanh toán** | Phản hồi từ gateway | transaction_id + status + amount + timestamp |

### **Data Stores**

| Data Store | Mô tả | Cấu trúc chính |
|------------|-------|----------------|
| **D1: Users** | Thông tin người dùng | user_id + email + fullName + phone + address + membership |
| **D2: Products** | Catalog sản phẩm | product_id + name + price + category + image + stock |
| **D3: Shopping Cart** | Giỏ hàng | user_id + product_id + quantity + added_date |
| **D4: Orders** | Đơn hàng | order_id + user_id + items + total + status + created_date |
| **D5: Payments** | Thanh toán | payment_id + order_id + amount + method + status + date |
| **D6: Inventory** | Quản lý kho | product_id + current_stock + reserved + last_updated |

### **Processes**

| Process | Mô tả | Input | Output |
|---------|-------|-------|--------|
| **1.0 Quản lý Người dùng** | Xử lý đăng ký, đăng nhập, profile | User credentials, profile data | User session, profile info |
| **2.0 Quản lý Sản phẩm** | CRUD sản phẩm, tìm kiếm | Product data, search queries | Product lists, details |
| **3.0 Quản lý Giỏ hàng** | Thêm/xóa/sửa giỏ hàng | Cart operations | Updated cart |
| **4.0 Xử lý Đơn hàng** | Tạo và xử lý đơn hàng | Order request | Order confirmation |
| **5.0 Xử lý Thanh toán** | COD và VNPAY | Payment request | Payment result |
| **6.0 Báo cáo & Thống kê** | Tạo báo cáo doanh số | Date range, filters | Reports, charts |

---

## 🔄 Business Rules & Constraints

### **Quy tắc Kinh doanh**

1. **Quản lý Giỏ hàng**
   - Mỗi user chỉ có 1 giỏ hàng active
   - Giỏ hàng guest lưu trong 7 ngày
   - Giỏ hàng user đăng nhập lưu vô thời hạn

2. **Xử lý Đơn hàng**
   - Đơn hàng tối thiểu 50,000 VND
   - Kiểm tra tồn kho trước khi xác nhận
   - Đơn hàng có thể hủy trong 30 phút

3. **Thanh toán**
   - COD: Xác nhận ngay, thanh toán khi nhận hàng
   - VNPAY: Phải xác minh trước khi xử lý đơn hàng
   - Timeout thanh toán: 15 phút

4. **Khuyến mãi**
   - Mỗi đơn hàng chỉ áp dụng 1 mã giảm giá
   - Kiểm tra điều kiện và thời hạn mã
   - Tự động áp dụng ưu đãi membership

### **Ràng buộc Kỹ thuật**

1. **Performance**
   - Response time < 2 seconds
   - 99.9% uptime guarantee
   - Support 1000+ concurrent users

2. **Security**
   - HTTPS mandatory
   - Input validation & sanitization
   - Session timeout: 30 minutes

3. **Data Integrity**
   - Transaction rollback on failure
   - Audit trail for all changes
   - Regular backup every 6 hours

---

## 📈 Flow Scenarios

### **Scenario 1: Khách hàng mua hàng thành công**

```
1. Customer → Browse Products → View Product Details
2. Customer → Add to Cart → Update Cart Total
3. Customer → Proceed to Checkout → Login/Register
4. Customer → Enter Shipping Info → Select Payment Method
5. System → Validate Order → Check Inventory
6. System → Process Payment (VNPAY) → Receive Confirmation
7. System → Create Order → Update Inventory
8. System → Send Confirmation Email → Update Order Status
```

### **Scenario 2: Thanh toán thất bại**

```
1. Customer → Confirm Order → Redirect to VNPAY
2. VNPAY → Payment Failed → Return Error Code
3. System → Log Failed Payment → Restore Cart
4. System → Show Error Message → Suggest Retry
5. Customer → Choose Different Payment → Try Again
```

### **Scenario 3: Admin quản lý đơn hàng**

```
1. Admin → Login → View Dashboard
2. Admin → View Orders List → Filter by Status
3. Admin → Select Order → View Details
4. Admin → Update Status → Send Notification
5. System → Log Changes → Update Database
6. System → Notify Customer → Email/SMS
```

---

*Sơ đồ DFD này mô tả luồng dữ liệu hoàn chỉnh cho hệ thống E-Commerce của Ấm - Coffee and Cake, từ cấp độ tổng quan đến chi tiết từng process.*
