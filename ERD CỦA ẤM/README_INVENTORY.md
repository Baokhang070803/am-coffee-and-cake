# 📦 HỆ THỐNG QUẢN LÝ KHO HÀNG - ẤM COFFEE AND CAKE

## 🎯 Tổng quan

Hệ thống quản lý kho hàng được thiết kế để quản lý nguyên liệu, nhà cung cấp, công thức sản xuất và theo dõi việc sử dụng nguyên liệu trong quá trình kinh doanh.

## 🗂️ Cấu trúc Database

### 1. **NhaCungCap** - Quản lý nhà cung cấp
```sql
- maNhaCungCap: Mã nhà cung cấp (PK)
- maNhaCungCap: Mã nhà cung cấp (Unique)
- tenNhaCungCap: Tên nhà cung cấp
- nguoiLienHe: Người liên hệ
- email: Email liên hệ
- soDienThoai: Số điện thoại
- diaChi: Địa chỉ
- sanPhamCungCap: Sản phẩm cung cấp
- trangThai: Trạng thái hoạt động
- ngayTao: Ngày tạo
- ngayCapNhat: Ngày cập nhật
```

### 2. **NguyenLieu** - Quản lý nguyên liệu
```sql
- maNguyenLieu: Mã nguyên liệu (PK)
- tenNguyenLieu: Tên nguyên liệu
- danhMuc: Danh mục (sugar, milk, coffee, flour, other, fruit)
- moTa: Mô tả
- hinhAnh: Hình ảnh
- giaNhap: Giá nhập
- soLuong: Số lượng tồn kho
- donVi: Đơn vị tính (kg, l, pcs, g, ml)
- soLuongToiThieu: Số lượng tối thiểu
- nhaCungCap: Mã nhà cung cấp (FK)
- ngayTao: Ngày tạo
- ngayCapNhat: Ngày cập nhật
```

### 3. **KhoHang** - Quản lý công thức sản xuất
```sql
- maKhoHang: Mã kho hàng (PK)
- maSanPham: Mã sản phẩm (FK)
- tenSanPham: Tên sản phẩm
- danhMuc: Danh mục
- hinhAnh: Hình ảnh
- giaNguyenLieu: Tổng giá nguyên liệu
- nguyenLieu: JSON chứa danh sách nguyên liệu
- chiPhiNhanCong: Chi phí nhân công
- chiPhiVanHanh: Chi phí vận hành
- giaBan: Giá bán
- ngayTao: Ngày tạo
- ngayCapNhat: Ngày cập nhật
```

### 4. **KhauTruNguyenLieu** - Theo dõi khấu trừ nguyên liệu
```sql
- maKhauTru: Mã khấu trừ (PK)
- maNguyenLieu: Mã nguyên liệu (FK)
- tenNguyenLieu: Tên nguyên liệu
- soLuongCu: Số lượng cũ
- soLuongMoi: Số lượng mới
- soLuongKhauTru: Số lượng khấu trừ
- donVi: Đơn vị tính
- maDonHang: Mã đơn hàng (FK)
- lyDo: Lý do khấu trừ
- ngayKhauTru: Ngày khấu trừ
```

## 🔄 Quy trình hoạt động

### 1. **Thiết lập ban đầu**
```sql
-- Thêm nhà cung cấp
INSERT INTO NhaCungCap VALUES (...);

-- Thêm nguyên liệu
INSERT INTO NguyenLieu VALUES (...);

-- Tạo công thức sản phẩm
INSERT INTO KhoHang VALUES (...);
```

### 2. **Quy trình xử lý đơn hàng**
```sql
-- Khi có đơn hàng mới
-- 1. Lấy công thức sản phẩm từ bảng KhoHang
-- 2. Kiểm tra số lượng nguyên liệu có đủ không
-- 3. Khấu trừ nguyên liệu
-- 4. Ghi nhận vào bảng KhauTruNguyenLieu
```

### 3. **Cảnh báo tồn kho**
```sql
-- Kiểm tra nguyên liệu cần nhập
SELECT * FROM vw_BaoCaoTonKho 
WHERE trangThai = 'CẦN NHẬP';
```

## 📊 Báo cáo và thống kê

### 1. **Báo cáo tồn kho**
```sql
SELECT * FROM vw_BaoCaoTonKho;
```

### 2. **Báo cáo sử dụng nguyên liệu**
```sql
SELECT * FROM vw_BaoCaoSuDungNguyenLieu;
```

### 3. **Thống kê chi phí nguyên liệu theo tháng**
```sql
SELECT 
    MONTH(ktr.ngayKhauTru) as thang,
    nl.tenNguyenLieu,
    SUM(ktr.soLuongKhauTru * nl.giaNhap) as tongChiPhi
FROM KhauTruNguyenLieu ktr
JOIN NguyenLieu nl ON ktr.maNguyenLieu = nl.maNguyenLieu
WHERE YEAR(ktr.ngayKhauTru) = 2025
GROUP BY MONTH(ktr.ngayKhauTru), nl.tenNguyenLieu
ORDER BY thang;
```

## 🛠️ Các chức năng chính

### 1. **Quản lý nhà cung cấp**
- Thêm/sửa/xóa nhà cung cấp
- Theo dõi thông tin liên hệ
- Quản lý sản phẩm cung cấp

### 2. **Quản lý nguyên liệu**
- Thêm/sửa/xóa nguyên liệu
- Theo dõi số lượng tồn kho
- Cảnh báo khi hết hàng
- Quản lý giá nhập

### 3. **Quản lý công thức**
- Tạo công thức sản xuất
- Tính toán chi phí nguyên liệu
- Xác định giá bán

### 4. **Theo dõi sử dụng**
- Ghi nhận khấu trừ nguyên liệu
- Lịch sử sử dụng
- Báo cáo chi tiết

## 🔧 Cài đặt và sử dụng

### 1. **Chạy script SQL**
```bash
# Chạy file add_inventory_tables.sql
sqlcmd -S server -d database -i add_inventory_tables.sql
```

### 2. **Kiểm tra cài đặt**
```sql
-- Kiểm tra các bảng đã được tạo
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_NAME IN ('NhaCungCap', 'NguyenLieu', 'KhoHang', 'KhauTruNguyenLieu');

-- Kiểm tra dữ liệu mẫu
SELECT * FROM NhaCungCap;
SELECT * FROM NguyenLieu;
```

### 3. **Tích hợp với ứng dụng**
- Cập nhật API để sử dụng các bảng mới
- Thêm giao diện quản lý kho hàng
- Tích hợp với quy trình xử lý đơn hàng

## 📈 Lợi ích

1. **Kiểm soát chi phí**: Theo dõi chính xác chi phí nguyên liệu
2. **Tối ưu tồn kho**: Tránh thừa hoặc thiếu nguyên liệu
3. **Báo cáo chính xác**: Dữ liệu chi tiết về sử dụng nguyên liệu
4. **Quản lý nhà cung cấp**: Theo dõi và đánh giá nhà cung cấp
5. **Tính toán lợi nhuận**: Xác định chính xác lợi nhuận từng sản phẩm

## 🚀 Phát triển tiếp theo

1. **Tích hợp với POS**: Tự động khấu trừ khi bán hàng
2. **Cảnh báo tự động**: Email/SMS khi hết nguyên liệu
3. **Dự báo nhu cầu**: AI dự đoán nhu cầu nguyên liệu
4. **Quản lý hạn sử dụng**: Theo dõi hạn sử dụng nguyên liệu
5. **Báo cáo nâng cao**: Dashboard thống kê chi tiết 