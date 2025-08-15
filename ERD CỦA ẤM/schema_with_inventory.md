# Schema Database ẤM COFFEE AND CAKE - Bổ sung Quản lý Kho hàng

## 📦 Quản lý Kho hàng & Nguyên liệu

### Table NguyenLieu (Nguyên liệu)
```sql
Table NguyenLieu {
  maNguyenLieu varchar [pk]
  tenNguyenLieu varchar
  danhMuc varchar
  moTa varchar
  hinhAnh varchar
  giaNhap int
  soLuong float
  donVi varchar
  soLuongToiThieu int
  nhaCungCap varchar
  ngayTao datetime
  ngayCapNhat datetime
}
```

### Table NhaCungCap (Nhà cung cấp)
```sql
Table NhaCungCap {
  maNhaCungCap varchar [pk]
  maNhaCungCap varchar [unique]
  tenNhaCungCap varchar
  nguoiLienHe varchar
  email varchar
  soDienThoai varchar
  diaChi varchar
  sanPhamCungCap varchar
  trangThai varchar
  ngayTao datetime
  ngayCapNhat datetime
}
```

### Table KhoHang (Kho hàng)
```sql
Table KhoHang {
  maKhoHang varchar [pk]
  maSanPham varchar
  tenSanPham varchar
  danhMuc varchar
  hinhAnh varchar
  giaNguyenLieu int
  nguyenLieu text
  chiPhiNhanCong int
  chiPhiVanHanh int
  giaBan int
  ngayTao datetime
  ngayCapNhat datetime
}
```

### Table KhauTruNguyenLieu (Khấu trừ nguyên liệu)
```sql
Table KhauTruNguyenLieu {
  maKhauTru varchar [pk]
  maNguyenLieu varchar
  tenNguyenLieu varchar
  soLuongCu float
  soLuongMoi float
  soLuongKhauTru float
  donVi varchar
  maDonHang varchar
  lyDo varchar
  ngayKhauTru datetime
}
```

## 🔗 Relationships (Mối quan hệ)

```sql
// Quan hệ giữa Nguyên liệu và Nhà cung cấp
Ref: NguyenLieu.nhaCungCap > NhaCungCap.maNhaCungCap

// Quan hệ giữa Kho hàng và Sản phẩm
Ref: KhoHang.maSanPham > SanPham.maSanPham

// Quan hệ giữa Khấu trừ nguyên liệu và Nguyên liệu
Ref: KhauTruNguyenLieu.maNguyenLieu > NguyenLieu.maNguyenLieu

// Quan hệ giữa Khấu trừ nguyên liệu và Đơn hàng
Ref: KhauTruNguyenLieu.maDonHang > DonHang.maDonHang
```

## 📊 Mô tả chức năng

### 1. **NguyenLieu (Nguyên liệu)**
- Quản lý thông tin các nguyên liệu sử dụng trong quán
- Theo dõi số lượng tồn kho, giá nhập, đơn vị tính
- Liên kết với nhà cung cấp
- Cảnh báo khi số lượng xuống dưới mức tối thiểu

### 2. **NhaCungCap (Nhà cung cấp)**
- Quản lý thông tin các nhà cung cấp nguyên liệu
- Lưu trữ thông tin liên hệ, địa chỉ, sản phẩm cung cấp
- Theo dõi trạng thái hoạt động

### 3. **KhoHang (Kho hàng)**
- Quản lý công thức sản xuất sản phẩm
- Tính toán chi phí nguyên liệu, nhân công, vận hành
- Xác định giá bán dựa trên chi phí
- Liên kết với bảng Sản phẩm

### 4. **KhauTruNguyenLieu (Khấu trừ nguyên liệu)**
- Theo dõi việc khấu trừ nguyên liệu khi có đơn hàng
- Lưu trữ lịch sử thay đổi số lượng
- Liên kết với đơn hàng để biết lý do khấu trừ
- Hỗ trợ kiểm kê và báo cáo

## 🔄 Quy trình hoạt động

1. **Nhập nguyên liệu**: Cập nhật số lượng trong bảng `NguyenLieu`
2. **Tạo sản phẩm**: Định nghĩa công thức trong bảng `KhoHang`
3. **Xử lý đơn hàng**: Tự động khấu trừ nguyên liệu qua bảng `KhauTruNguyenLieu`
4. **Cảnh báo**: Khi số lượng nguyên liệu xuống dưới mức tối thiểu
5. **Báo cáo**: Thống kê sử dụng nguyên liệu theo thời gian 