# 📋 Entity Relationship Diagram (ERD) - Bảng Đơn Hàng
## Hệ thống Quản lý Đơn Hàng - Ấm Coffee & Cake (Tiếng Việt)

---

## 🎯 **MÔ TẢ TỔNG QUAN**
ERD này sử dụng tên bảng và trường dữ liệu hoàn toàn bằng tiếng Việt để phù hợp với môi trường phát triển Việt Nam.

---

## 📊 **ERD SCHEMA - TIẾNG VIỆT**

### **Code cho dbdiagram.io (Tên tiếng Việt):**

```dbml
// =============================================================================
// ERD - Module Đơn Hàng cho Hệ thống E-Commerce Ấm Coffee & Cake
// =============================================================================

Project quan_ly_don_hang {
  database_type: 'Firebase'
  Note: '''
    # Hệ thống Quản lý Đơn Hàng - Ấm Coffee & Cake
    Hệ thống quản lý đơn hàng cho cửa hàng cà phê và bánh ngọt
    
    **Tính năng:**
    - Quản lý vòng đời đơn hàng
    - Nhiều phương thức thanh toán (VNPay, COD)
    - Đánh giá và nhận xét khách hàng
    - Theo dõi đơn hàng theo thời gian thực
    - Hệ thống khuyến mãi và giảm giá
  '''
}

// =============================================================================
// BẢNG CHÍNH
// =============================================================================

Table don_hang {
  ma_don_hang varchar(50) [pk, note: 'ID được tạo bởi Firebase']
  ma_nguoi_dung varchar(50) [not null, note: 'Tham chiếu đến bảng người dùng']
  
  // Thông tin thời gian
  ngay_dat_hang varchar(20) [not null, note: 'Định dạng DD/MM/YYYY']
  gio_dat_hang varchar(10) [not null, note: 'Định dạng HH:mm:ss']
  thoi_gian_tao timestamp [not null, default: `now()`]
  thoi_gian_cap_nhat timestamp [note: 'Thời gian sửa đổi cuối cùng']
  thoi_gian_xac_nhan timestamp [note: 'Thời gian xác nhận đơn hàng']
  thoi_gian_huy timestamp [note: 'Thời gian hủy đơn']
  
  // Thông tin khách hàng
  ho_ten_day_du varchar(100) [not null]
  
  // Thông tin tài chính
  tong_tien_truoc_giam decimal(12,2) [not null, note: 'Tổng tiền trước khi giảm giá']
  so_tien_giam_gia decimal(12,2) [default: 0, note: 'Tổng số tiền được giảm']
  phi_van_chuyen decimal(12,2) [default: 0]
  tong_tien_cuoi_cung decimal(12,2) [not null, note: 'Số tiền cuối cùng phải thanh toán']
  
  // Thông tin khuyến mãi
  ma_giam_gia varchar(20) [note: 'Mã giảm giá đã áp dụng']
  phan_tram_giam_gia decimal(5,2) [default: 0, note: 'Phần trăm giảm giá']
  loai_giam_gia varchar(20) [note: 'Loại mã giảm giá đã áp dụng']
  
  // Thông tin thanh toán
  phuong_thuc_thanh_toan varchar(20) [not null, note: 'vnpay | cod']
  trang_thai_thanh_toan varchar(20) [not null, note: 'da_thanh_toan | dang_cho | khong_can_thiet | that_bai']
  
  // Thông tin giao hàng
  phuong_thuc_giao_hang varchar(20) [not null, note: 'tieu_chuan | nhanh']
  trang_thai_don_hang varchar(20) [not null, note: 'cho_xu_ly | cho_thanh_toan | da_xac_nhan | dang_chuan_bi | dang_giao | da_giao | da_huy']
  
  // Thông tin bổ sung
  ghi_chu_don_hang text [note: 'Ghi chú của khách hàng']
  ly_do_huy varchar(100) [note: 'Lý do hủy đơn hàng']
  
  indexes {
    ma_nguoi_dung [name: 'idx_don_hang_ma_nguoi_dung']
    trang_thai_don_hang [name: 'idx_don_hang_trang_thai']
    trang_thai_thanh_toan [name: 'idx_don_hang_trang_thai_thanh_toan']
    thoi_gian_tao [name: 'idx_don_hang_thoi_gian_tao']
    (ma_nguoi_dung, trang_thai_don_hang) [name: 'idx_don_hang_nguoi_dung_trang_thai']
    phuong_thuc_thanh_toan [name: 'idx_don_hang_phuong_thuc_thanh_toan']
    ngay_dat_hang [name: 'idx_don_hang_ngay_dat']
  }
}

Table thong_tin_khach_hang {
  ma_don_hang varchar(50) [pk]
  ten_khach_hang varchar(100) [not null]
  ho_ten_day_du varchar(100) [not null]
  email varchar(100) [not null]
  so_dien_thoai varchar(20) [not null]
  dia_chi text [not null]
}

Table thong_tin_thanh_toan {
  ma_don_hang varchar(50) [pk]
  ho_ten_day_du varchar(100) [not null]
  email varchar(100) [not null]
  so_dien_thoai varchar(20) [not null]
  dia_chi text [not null]
}

Table thong_tin_giao_hang {
  ma_don_hang varchar(50) [pk]
  ten_nguoi_nhan varchar(100) [not null]
  sdt_nguoi_nhan varchar(20) [not null]
  dia_chi text [not null]
}

Table chi_tiet_thanh_toan {
  ma_don_hang varchar(50) [pk]
  so_tien decimal(12,2) [not null]
  ngay_thanh_toan varchar(30) [note: 'DD/MM/YYYY HH:mm:ss']
  ma_phan_hoi varchar(10) [note: 'Mã phản hồi từ cổng thanh toán']
  ma_giao_dich varchar(50) [note: 'Số giao dịch']
  ma_tham_chieu_vnpay varchar(50) [note: 'Mã tham chiếu VNPay']
  
  indexes {
    ma_giao_dich [name: 'idx_thanh_toan_ma_giao_dich']
    ma_tham_chieu_vnpay [name: 'idx_thanh_toan_ma_vnpay']
  }
}

Table san_pham_trong_don_hang {
  ma_chi_tiet_don_hang varchar(50) [pk, note: 'ID duy nhất cho mặt hàng']
  ma_don_hang varchar(50) [not null]
  ma_san_pham varchar(50) [not null]
  ten_san_pham varchar(100) [not null, note: 'Tên sản phẩm tại thời điểm đặt hàng']
  gia_san_pham decimal(10,2) [not null, note: 'Giá sản phẩm tại thời điểm đặt hàng']
  so_luong int [not null, note: 'Số lượng đã đặt']
  hinh_anh_san_pham varchar(500) [note: 'URL hình ảnh sản phẩm']
  
  indexes {
    ma_don_hang [name: 'idx_san_pham_ma_don_hang']
    ma_san_pham [name: 'idx_san_pham_ma_san_pham']
    (ma_don_hang, ma_san_pham) [name: 'idx_san_pham_don_hang_san_pham']
  }
}

Table danh_gia_don_hang {
  ma_danh_gia varchar(50) [pk]
  ma_don_hang varchar(50) [not null]
  ma_nguoi_dung varchar(50) [not null]
  ten_nguoi_dung varchar(100) [not null]
  diem_danh_gia int [not null, note: 'Điểm đánh giá từ 1 đến 5']
  binh_luan text [note: 'Bình luận đánh giá']
  thoi_gian_tao timestamp [not null, default: `now()`]
  
  indexes {
    ma_don_hang [name: 'idx_danh_gia_ma_don_hang']
    ma_nguoi_dung [name: 'idx_danh_gia_ma_nguoi_dung']
    diem_danh_gia [name: 'idx_danh_gia_diem']
    thoi_gian_tao [name: 'idx_danh_gia_thoi_gian_tao']
  }
}

// =============================================================================
// BẢNG THAM CHIẾU
// =============================================================================

Table nguoi_dung {
  ma_nguoi_dung varchar(50) [pk]
  ho_ten_day_du varchar(100) [not null]
  email varchar(100) [not null, unique]
  so_dien_thoai varchar(20)
  dia_chi text
  cap_thanh_vien varchar(20) [note: 'dong | bac | vang | kim_cuong']
  thoi_gian_tao timestamp [not null, default: `now()`]
  
  indexes {
    email [unique, name: 'idx_nguoi_dung_email']
    cap_thanh_vien [name: 'idx_nguoi_dung_cap_thanh_vien']
  }
}

Table san_pham {
  ma_san_pham varchar(50) [pk]
  ten_san_pham varchar(100) [not null]
  gia decimal(10,2) [not null]
  danh_muc varchar(20) [not null, note: 'do_uong | banh_ngot | topping']
  url_hinh_anh varchar(500)
  co_san boolean [default: true]
  thoi_gian_tao timestamp [not null, default: `now()`]
  
  indexes {
    danh_muc [name: 'idx_san_pham_danh_muc']
    co_san [name: 'idx_san_pham_co_san']
    gia [name: 'idx_san_pham_gia']
  }
}

Table chuong_trinh_khuyen_mai {
  ma_khuyen_mai varchar(20) [pk]
  loai_giam_gia varchar(20) [not null, note: 'phan_tram | co_dinh']
  gia_tri_giam_gia decimal(10,2) [not null]
  so_tien_toi_thieu decimal(10,2) [default: 0]
  giam_toi_da decimal(10,2)
  ngay_bat_dau date [not null]
  ngay_ket_thuc date [not null]
  gioi_han_su_dung int
  trang_thai_khuyen_mai varchar(20) [not null, note: 'hoat_dong | khong_hoat_dong | het_han']
  
  indexes {
    trang_thai_khuyen_mai [name: 'idx_khuyen_mai_trang_thai']
    (ngay_bat_dau, ngay_ket_thuc) [name: 'idx_khuyen_mai_khoang_thoi_gian']
  }
}

// =============================================================================
// MỐI QUAN HỆ
// =============================================================================

Ref: don_hang.ma_nguoi_dung > nguoi_dung.ma_nguoi_dung [delete: restrict]
Ref: don_hang.ma_giam_gia > chuong_trinh_khuyen_mai.ma_khuyen_mai [delete: set null]
Ref: san_pham_trong_don_hang.ma_don_hang > don_hang.ma_don_hang [delete: cascade]
Ref: san_pham_trong_don_hang.ma_san_pham > san_pham.ma_san_pham [delete: restrict]
Ref: danh_gia_don_hang.ma_don_hang > don_hang.ma_don_hang [delete: cascade]
Ref: danh_gia_don_hang.ma_nguoi_dung > nguoi_dung.ma_nguoi_dung [delete: cascade]
Ref: thong_tin_khach_hang.ma_don_hang - don_hang.ma_don_hang [delete: cascade]
Ref: thong_tin_thanh_toan.ma_don_hang - don_hang.ma_don_hang [delete: cascade]
Ref: thong_tin_giao_hang.ma_don_hang - don_hang.ma_don_hang [delete: cascade]
Ref: chi_tiet_thanh_toan.ma_don_hang - don_hang.ma_don_hang [delete: cascade]

// =============================================================================
// NHÓM BẢNG ĐỂ HIỂN THỊ TỐT HƠN
// =============================================================================

TableGroup "Lõi Đơn Hàng" {
  don_hang
  san_pham_trong_don_hang
}

TableGroup "Chi Tiết Đơn Hàng" {
  thong_tin_khach_hang
  thong_tin_thanh_toan
  thong_tin_giao_hang
  chi_tiet_thanh_toan
}

TableGroup "Phản Hồi Đơn Hàng" {
  danh_gia_don_hang
}

TableGroup "Dữ Liệu Tham Chiếu" {
  nguoi_dung
  san_pham
  chuong_trinh_khuyen_mai
}
```

---

## 🔗 **MỐI QUAN HỆ (RELATIONSHIPS)**

### **1. don_hang ↔ nguoi_dung (N:1)**
- Một người dùng có thể có nhiều đơn hàng
- Một đơn hàng chỉ thuộc về một người dùng
- **Khóa ngoại**: `don_hang.ma_nguoi_dung → nguoi_dung.ma_nguoi_dung`

### **2. don_hang ↔ san_pham_trong_don_hang (1:N)**
- Một đơn hàng có thể có nhiều sản phẩm
- Một sản phẩm trong đơn hàng chỉ thuộc về một đơn hàng
- **Khóa ngoại**: `san_pham_trong_don_hang.ma_don_hang → don_hang.ma_don_hang`

### **3. san_pham_trong_don_hang ↔ san_pham (N:1)**
- Một sản phẩm có thể xuất hiện trong nhiều đơn hàng
- Một mục trong đơn hàng tham chiếu đến một sản phẩm
- **Khóa ngoại**: `san_pham_trong_don_hang.ma_san_pham → san_pham.ma_san_pham`

### **4. don_hang ↔ danh_gia_don_hang (1:1)**
- Một đơn hàng có thể có một đánh giá
- Một đánh giá thuộc về một đơn hàng
- **Khóa ngoại**: `danh_gia_don_hang.ma_don_hang → don_hang.ma_don_hang`

### **5. don_hang ↔ chuong_trinh_khuyen_mai (N:1)**
- Một chương trình khuyến mãi có thể được sử dụng cho nhiều đơn hàng
- Một đơn hàng có thể sử dụng một chương trình khuyến mãi
- **Khóa ngoại**: `don_hang.ma_giam_gia → chuong_trinh_khuyen_mai.ma_khuyen_mai`

### **6. Các bảng thông tin chi tiết (1:1)**
- `thong_tin_khach_hang`, `thong_tin_thanh_toan`, `thong_tin_giao_hang`, `chi_tiet_thanh_toan`
- Mỗi bảng có quan hệ 1:1 với bảng `don_hang`

---

## 📋 **QUY TẮC KINH DOANH**

### **1. Trạng thái đơn hàng:**
```
cho_xu_ly → cho_thanh_toan (VNPay) → da_xac_nhan → dang_chuan_bi → dang_giao → da_giao
   ↓                                      ↓
da_huy                                  da_huy
```

### **2. Thanh toán:**
- **COD**: `trang_thai_thanh_toan = "khong_can_thiet"`
- **VNPay**: `trang_thai_thanh_toan = "dang_cho"` → `"da_thanh_toan"` hoặc `"that_bai"`

### **3. Ràng buộc:**
- `tong_tien_cuoi_cung = tong_tien_truoc_giam - so_tien_giam_gia + phi_van_chuyen`
- `diem_danh_gia` phải từ 1 đến 5
- `phuong_thuc_giao_hang` chỉ có thể là `"tieu_chuan"` hoặc `"nhanh"`
- Chỉ có thể đánh giá khi `trang_thai_don_hang = "da_giao"`

---

## 🎯 **CÁC TRƯỜNG HỢP SỬ DỤNG CHÍNH**

1. **Tạo đơn hàng mới**
2. **Cập nhật trạng thái đơn hàng**
3. **Xử lý thanh toán VNPay**
4. **Tìm kiếm đơn hàng theo bộ lọc**
5. **Thống kê doanh thu**
6. **Quản lý đánh giá khách hàng**
7. **Xử lý hủy đơn và hoàn tiền**

---

### **Hướng dẫn sử dụng:**

1. **Truy cập**: [dbdiagram.io](https://dbdiagram.io)
2. **Tạo diagram mới**: Click "Create your database diagram"
3. **Copy code DBML tiếng Việt** ở trên và paste vào editor
4. **Render**: Click "Export" để xuất ra hình ảnh hoặc SQL

---

*ERD này sử dụng hoàn toàn tên tiếng Việt để phù hợp với môi trường phát triển tại Việt Nam, đảm bảo tính dễ hiểu và bảo trì cho đội ngũ phát triển địa phương.*
