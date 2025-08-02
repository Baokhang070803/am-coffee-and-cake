// Dự án: Ấm Coffee and Cake ERD - Phiên bản hoàn chỉnh
// Dựa trên csdlNOSQL.json và phân tích code thực tế

// ========================================
// 1. QUẢN LÝ NGƯỜI DÙNG & THÀNH VIÊN
// ========================================

// Bảng NguoiDung: Lưu thông tin người dùng
Table NguoiDung {
  maNguoiDung string [pk, not null]
  hoTen string [not null]
  email string [not null, unique]
  soDienThoai string [not null]
  diaChi string [not null]
  anhDaiDien string [not null]
  maVach string [not null, unique]
  ngayTao datetime [not null]
}

// Bảng NhatKy: Nhật ký hệ thống của người dùng
Table NhatKy {
  maNhatKy string [pk, not null]
  maNguoiDung string [ref: > NguoiDung.maNguoiDung]
  hanhDong string [not null]
  chiTiet text
  thoiGian datetime [not null]
  ipAddress string
  userAgent string
}

// Bảng TheThanhVien: Thông tin thẻ thành viên
Table TheThanhVien {
  maNguoiDung string [pk, ref: > NguoiDung.maNguoiDung, not null]
  diemTichLuy int [not null]
  hang string [not null]
  hangTiepTheo string [not null]
  thongTinHangTiepTheo string [not null]
  diemHangTiepTheo int [not null]
  ngayCapNhat datetime [not null]
  loaiHang string [not null]
  maVach string [not null, unique]
}

// ========================================
// 2. MẠNG XÃ HỘI - KẾT BẠN
// ========================================

// Bảng BanBe: Mối quan hệ bạn bè (N:N)
Table BanBe {
  maNguoiDung1 string [ref: > NguoiDung.maNguoiDung, not null]
  maNguoiDung2 string [ref: > NguoiDung.maNguoiDung, not null]
  ngayKetBan datetime [not null]
  indexes {
    (maNguoiDung1, maNguoiDung2) [pk]
  }
}

// Bảng LoiMoiKetBan: Lời mời kết bạn
Table LoiMoiKetBan {
  maNguoiGui string [ref: > NguoiDung.maNguoiDung, not null]
  maNguoiNhan string [ref: > NguoiDung.maNguoiDung, not null]
  thoiGian datetime [not null]
  trangThai string [not null]
  indexes {
    (maNguoiGui, maNguoiNhan) [pk]
  }
}

// ========================================
// 3. MẠNG XÃ HỘI - BÀI ĐĂNG & TƯƠNG TÁC
// ========================================

// Bảng BaiDang: Bài đăng mạng xã hội
Table BaiDang {
  maBaiDang string [pk, not null]
  maTacGia string [ref: > NguoiDung.maNguoiDung, not null]
  noiDung string [not null]
  hinhAnh string
  thoiGian datetime [not null]
  emoji string
  trangThai string [not null]
}

// Bảng ThichBaiDang: Lượt thích bài đăng (N:N)
Table ThichBaiDang {
  maBaiDang string [ref: > BaiDang.maBaiDang, not null]
  maNguoiDung string [ref: > NguoiDung.maNguoiDung, not null]
  thoiGian datetime [not null]
  indexes {
    (maBaiDang, maNguoiDung) [pk]
  }
}

// Bảng BinhLuan: Bình luận bài đăng
Table BinhLuan {
  maBinhLuan string [pk, not null]
  maBaiDang string [ref: > BaiDang.maBaiDang, not null]
  maTacGia string [ref: > NguoiDung.maNguoiDung, not null]
  noiDung string [not null]
  thoiGian datetime [not null]
  trangThai string [not null]
}

// Bảng ThichBinhLuan: Lượt thích bình luận (N:N)
Table ThichBinhLuan {
  maBinhLuan string [ref: > BinhLuan.maBinhLuan, not null]
  maNguoiDung string [ref: > NguoiDung.maNguoiDung, not null]
  thoiGian datetime [not null]
  indexes {
    (maBinhLuan, maNguoiDung) [pk]
  }
}

// Bảng TraLoiBinhLuan: Trả lời bình luận
Table TraLoiBinhLuan {
  maTraLoi string [pk, not null]
  maBinhLuan string [ref: > BinhLuan.maBinhLuan, not null]
  maTacGia string [ref: > NguoiDung.maNguoiDung, not null]
  noiDung string [not null]
  thoiGian datetime [not null]
  trangThai string [not null]
}

// Bảng DangTin24Gio: Đăng tin 24 giờ (Story/Status)
Table DangTin24Gio {
  maDangTin string [pk, not null]
  maNguoiDung string [ref: > NguoiDung.maNguoiDung, not null]
  noiDung string
  hinhAnh string
  thoiGian datetime [not null]
  thoiHan datetime [not null]
  trangThai string [not null]
}

// ========================================
// 4. TIN NHẮN & CUỘC GỌI
// ========================================

// Bảng CuocTroChuyen: Hội thoại mạng xã hội
Table CuocTroChuyen {
  maCuocTroChuyen string [pk, not null]
  tinNhanCuoi string [not null]
  ngayCapNhat datetime [not null]
  loaiCuocTroChuyen string [not null]
}

// Bảng ThanhVienTroChuyen: Thành viên của hội thoại (N:N)
Table ThanhVienTroChuyen {
  maCuocTroChuyen string [ref: > CuocTroChuyen.maCuocTroChuyen, not null]
  maNguoiDung string [ref: > NguoiDung.maNguoiDung, not null]
  ngayThamGia datetime [not null]
  indexes {
    (maCuocTroChuyen, maNguoiDung) [pk]
  }
}

// Bảng TinNhan: Tin nhắn trong hội thoại
Table TinNhan {
  maTinNhan string [pk, not null]
  maCuocTroChuyen string [ref: > CuocTroChuyen.maCuocTroChuyen, not null]
  nguoiGui string [ref: > NguoiDung.maNguoiDung, not null]
  noiDung string
  hinhAnh string
  thoiGian datetime [not null]
  loaiTinNhan string [not null]
  trangThai string [not null]
  thoiLuong int [not null]
  loai string [not null]
}

// Bảng CuocGoi: Lưu thông tin cuộc gọi
Table CuocGoi {
  maCuocGoi string [pk, not null]
  loaiCuocGoi string [not null]
  candidate string
  sdpMLineIndex int
  sdpMid string
  usernameFragment string
  nguoiGoi string [ref: > NguoiDung.maNguoiDung, not null]
  nguoiNhan string [ref: > NguoiDung.maNguoiDung, not null]
  thoiGian datetime [not null]
  trangThai string [not null]
  thoiLuong int [not null]
}

// ========================================
// 5. HỖ TRỢ & LIÊN HỆ
// ========================================

// Bảng TinNhanHoTro: Tin nhắn hỗ trợ
Table TinNhanHoTro {
  maTinNhan string [pk, not null]
  noiDung string [not null]
  nguoiGui string [not null]
  maNguoiGui string [ref: > NguoiDung.maNguoiDung, not null]
  thoiGian datetime [not null]
  traLoi string [not null]
  trangThai string [not null]
}

// Bảng TinNhanLienHe: Tin nhắn liên hệ
Table TinNhanLienHe {
  maTinNhanLienHe string [pk, not null]
  ngayTao datetime [not null]
  email string [not null]
  noiDung string [not null]
  hoTen string [not null]
  soDienThoai string [not null]
  maNguoiDung string [ref: > NguoiDung.maNguoiDung, not null]
  trangThai string [not null]
}

// ========================================
// 6. E-COMMERCE - SẢN PHẨM
// ========================================

// Bảng SanPham: Sản phẩm
Table SanPham {
  maSanPham string [pk, not null]
  tenSanPham string [not null]
  thuocTinh string [not null]
  hinhAnh string [not null]
  giaSanPham int [not null]
  maDanhMuc string [ref: > DanhMuc.maDanhMuc, not null]
  moTa string
  trangThai string [not null]
  ngayTao datetime [not null]
  ngayCapNhat datetime [not null]
}

// Bảng KhuyenMai: Khuyến mãi
Table KhuyenMai {
  maKhuyenMai string [pk, not null]
  maGiamGia string [not null, unique]
  mucGiamGia int [not null]
  ngayBatDau datetime [not null]
  ngayKetThuc datetime [not null]
  trangThai string [not null]
  moTa string
  soLuongToiDa int [not null]
  soLuongDaSuDung int [default: 0]
}

// ========================================
// 7. E-COMMERCE - ĐƠN HÀNG
// ========================================

// Bảng DonHang: Đơn hàng
Table DonHang {
  maDonHang string [pk, not null]
  maNguoiDung string [ref: > NguoiDung.maNguoiDung, not null]
  
  // Thông tin hóa đơn
  thongTinHoaDon_ten string [not null]
  thongTinHoaDon_email string [not null]
  thongTinHoaDon_soDienThoai string [not null]
  thongTinHoaDon_diaChi string [not null]
  
  // Thông tin khách hàng
  thongTinKhachHang_ten string [not null]
  thongTinKhachHang_email string [not null]
  thongTinKhachHang_soDienThoai string [not null]
  thongTinKhachHang_diaChi string [not null]
  
  // Thông tin giao hàng
  thongTinGiaoHang_ten string [not null]
  thongTinGiaoHang_soDienThoai string [not null]
  thongTinGiaoHang_diaChi string [not null]
  
  // Thời gian
  ngayXacNhan datetime
  ngayTao datetime [not null]
  ngayCapNhat datetime [not null]
  
  // Khuyến mãi
  maGiamGia string [ref: > KhuyenMai.maKhuyenMai]
  giamGiaMaGiamGia int [not null]
  loaiMaGiamGia string [not null]
  
  // Thông tin giao hàng
  ngayGiao date [not null]
  gioGiao time [not null]
  
  // Tài chính
  soTienGiamGia int [not null, default: 0]
  tongCong int [not null]
  tongTien int [not null]
  phiVanChuyen int [not null, default: 0]
  
  // Thanh toán
  trangThaiThanhToan string [not null]
  chiTietThanhToan_soTien int
  chiTietThanhToan_ngayThanhToan datetime
  chiTietThanhToan_maPhieuThuHoi string
  chiTietThanhToan_soGiaoDich string
  chiTietThanhToan_maGiaoDichVnp string
  
  // Trạng thái
  trangThai string [not null]
  ghiChu string
}

// Bảng ChiTietDonHang: Mục hàng trong đơn hàng
Table ChiTietDonHang {
  maChiTietDonHang string [pk, not null]
  maDonHang string [ref: > DonHang.maDonHang, not null]
  maSanPham string [ref: > SanPham.maSanPham, not null]
  tenSanPham string [not null]
  giaSanPham int [not null]
  soLuong int [not null]
  hinhAnh string [not null]
  ghiChu string [not null]
}

// ========================================
// 8. THANH TOÁN
// ========================================

// Bảng KetQuaThanhToan: Kết quả thanh toán
Table KetQuaThanhToan {
  maGiaoDich string [pk, not null]
  maDonHang string [ref: > DonHang.maDonHang, not null]
  soTien int [not null]
  maPhieuThuHoi string
  ngayThanhToan datetime [not null]
  soGiaoDich string [not null]
  trangThai string [not null]
}

// Bảng GiaoDichVnpay: Giao dịch VNPay
Table GiaoDichVnpay {
  maGiaoDichRef string [pk, not null]
  maDonHang string [ref: > DonHang.maDonHang, not null]
  soTien int [not null]
  ngayTao datetime [not null]
  trangThai string [not null]
  orderKey string [not null]
  maGiaoDichVnp string [not null]
  thongTinTraVe text [not null]
}

// Bảng ThongKeThanhToan: Thống kê thanh toán
Table ThongKeThanhToan {
  maThongKe string [pk, not null]
  ngay date [not null]
  tongSoGiaoDich int [not null, default: 0]
  tongTien int [not null, default: 0]
  soGiaoDichThanhCong int [not null, default: 0]
  soGiaoDichThatBai int [not null, default: 0]
  ngayCapNhat datetime [not null]
}

// ========================================
// 9. NỘI DUNG & TIN TỨC
// ========================================

// Bảng TinTuc: Tin tức
Table TinTuc {
  maTinTuc string [pk, not null]
  tieuDe string [not null]
  tomTat string [not null]
  noiDung text [not null]
  hinhAnh string [not null]
  moTaAnh string
  ngayDang datetime [not null]
  tacGia string [not null]
  trangThai string [not null]
  luotXem int [default: 0]
}

// ========================================
// 10. ĐÁNH GIÁ & PHẢN HỒI
// ========================================

// Bảng DanhGiaDonHang: Đánh giá đơn hàng
Table DanhGiaDonHang {
  maDanhGia string [pk, not null]
  maDonHang string [ref: > DonHang.maDonHang, not null, unique]
  maNguoiDung string [ref: > NguoiDung.maNguoiDung, not null]
  tenNguoiDung string [not null]
  diemDanhGia int [not null]
  nhanXet string [not null]
  thoiGian datetime [not null]
  trangThai string [not null]
}




// ========================================
// DANH MỤC & PHÂN LOẠI
// ========================================

// Bảng DanhMuc: Danh mục sản phẩm
Table DanhMuc {
  maDanhMuc string [pk, not null]
  tenDanhMuc string [not null]
  moTa string
  hinhAnh string
  trangThai string [not null]
  thuTu int [default: 0]
} 

// ========================================
// 11. QUẢN LÝ NHÂN SỰ
// ========================================

Table ChucVu {
  maChucVu string [pk, not null]
  tenChucVu string [not null, unique]
  moTa string
  luongCoBan int [not null]
  quyenHan string
}

Table NhanVien {
  maNhanVien string [pk, not null]
  hoTen string [not null]
  email string [not null, unique]
  soDienThoai string [not null]
  diaChi string [not null]
  anhDaiDien string
  luongCoBan int [not null]
  chucVu string [ref: > ChucVu.tenChucVu, not null]
  ngayBatDau date [not null]
  trangThai string [not null]
}

Table ChamCong {
  maChamCong string [pk, not null]
  uid string [not null]
  email string [ref: > NhanVien.email, not null]
  ngay string [not null]
  thoiGian datetime [not null]
  loai string [not null]
  trangThai string [not null]
  viDo float
  kinhDo float
}

Table DonNghiPhep {
  maDonNghiPhep string [pk, not null]
  uid string [not null]
  email string [ref: > NhanVien.email, not null]
  lyDo string [not null]
  ngayBatDau date [not null]
  ngayKetThuc date [not null]
  trangThai string [not null]
  ngayTao datetime [not null]
  ngayDuyet datetime
  nguoiDuyet string
  ngayTuChoi datetime
  nguoiTuChoi string
}

Table DonTangCa {
  maDonTangCa string [pk, not null]
  uid string [not null]
  email string [ref: > NhanVien.email, not null]
  lyDo string [not null]
  ngay date [not null]
  thoiGianBatDau string [not null]
  thoiGianKetThuc string [not null]
  trangThai string [not null]
  ngayTao datetime [not null]
  ngayDuyet datetime
  nguoiDuyet string
  ngayTuChoi datetime
  nguoiTuChoi string
}

Ref: "DanhGiaDonHang"."maDanhGia" < "CuocGoi"."candidate"