CREATE TABLE [NguoiDung] (
  [maNguoiDung] nvarchar(255) PRIMARY KEY,
  [hoTen] nvarchar(255),
  [email] nvarchar(255) UNIQUE,
  [soDienThoai] nvarchar(255),
  [diaChi] nvarchar(255),
  [anhDaiDien] nvarchar(255),
  [maVach] nvarchar(255) UNIQUE,
  [ngayTao] datetime
)
GO

CREATE TABLE [NhatKy] (
  [maNhatKy] nvarchar(255) PRIMARY KEY,
  [maNguoiDung] nvarchar(255),
  [hanhDong] nvarchar(255),
  [chiTiet] text,
  [thoiGian] datetime,
  [ipAddress] nvarchar(255),
  [userAgent] nvarchar(255)
)
GO

CREATE TABLE [TheThanhVien] (
  [maNguoiDung] nvarchar(255) PRIMARY KEY,
  [diemTichLuy] int,
  [hang] nvarchar(255),
  [hangTiepTheo] nvarchar(255),
  [thongTinHangTiepTheo] nvarchar(255),
  [diemHangTiepTheo] int,
  [ngayCapNhat] datetime,
  [loaiHang] nvarchar(255),
  [maVach] nvarchar(255) UNIQUE
)
GO

CREATE TABLE [BanBe] (
  [maNguoiDung1] nvarchar(255),
  [maNguoiDung2] nvarchar(255),
  [ngayKetBan] datetime
)
GO

CREATE TABLE [LoiMoiKetBan] (
  [maNguoiGui] nvarchar(255),
  [maNguoiNhan] nvarchar(255),
  [thoiGian] datetime,
  [trangThai] nvarchar(255)
)
GO

CREATE TABLE [BaiDang] (
  [maBaiDang] nvarchar(255) PRIMARY KEY,
  [maTacGia] nvarchar(255),
  [noiDung] nvarchar(255),
  [hinhAnh] nvarchar(255),
  [thoiGian] datetime,
  [emoji] nvarchar(255),
  [trangThai] nvarchar(255)
)
GO

CREATE TABLE [ThichBaiDang] (
  [maBaiDang] nvarchar(255),
  [maNguoiDung] nvarchar(255),
  [thoiGian] datetime
)
GO

CREATE TABLE [BinhLuan] (
  [maBinhLuan] nvarchar(255) PRIMARY KEY,
  [maBaiDang] nvarchar(255),
  [maTacGia] nvarchar(255),
  [noiDung] nvarchar(255),
  [thoiGian] datetime,
  [trangThai] nvarchar(255)
)
GO

CREATE TABLE [ThichBinhLuan] (
  [maBinhLuan] nvarchar(255),
  [maNguoiDung] nvarchar(255),
  [thoiGian] datetime
)
GO

CREATE TABLE [TraLoiBinhLuan] (
  [maTraLoi] nvarchar(255) PRIMARY KEY,
  [maBinhLuan] nvarchar(255),
  [maTacGia] nvarchar(255),
  [noiDung] nvarchar(255),
  [thoiGian] datetime,
  [trangThai] nvarchar(255)
)
GO

CREATE TABLE [DangTin24Gio] (
  [maDangTin] nvarchar(255) PRIMARY KEY,
  [maNguoiDung] nvarchar(255),
  [noiDung] nvarchar(255),
  [hinhAnh] nvarchar(255),
  [thoiGian] datetime,
  [thoiHan] datetime,
  [trangThai] nvarchar(255)
)
GO

CREATE TABLE [CuocTroChuyen] (
  [maCuocTroChuyen] nvarchar(255) PRIMARY KEY,
  [tinNhanCuoi] nvarchar(255),
  [ngayCapNhat] datetime,
  [loaiCuocTroChuyen] nvarchar(255)
)
GO

CREATE TABLE [ThanhVienTroChuyen] (
  [maCuocTroChuyen] nvarchar(255),
  [maNguoiDung] nvarchar(255),
  [ngayThamGia] datetime
)
GO

CREATE TABLE [TinNhan] (
  [maTinNhan] nvarchar(255) PRIMARY KEY,
  [maCuocTroChuyen] nvarchar(255),
  [nguoiGui] nvarchar(255),
  [noiDung] nvarchar(255),
  [hinhAnh] nvarchar(255),
  [thoiGian] datetime,
  [loaiTinNhan] nvarchar(255),
  [trangThai] nvarchar(255),
  [thoiLuong] int,
  [loai] nvarchar(255)
)
GO

CREATE TABLE [CuocGoi] (
  [maCuocGoi] nvarchar(255) PRIMARY KEY,
  [loaiCuocGoi] nvarchar(255),
  [candidate] nvarchar(255),
  [sdpMLineIndex] int,
  [sdpMid] nvarchar(255),
  [usernameFragment] nvarchar(255),
  [nguoiGoi] nvarchar(255),
  [nguoiNhan] nvarchar(255),
  [thoiGian] datetime,
  [trangThai] nvarchar(255),
  [thoiLuong] int
)
GO

CREATE TABLE [TinNhanHoTro] (
  [maTinNhan] nvarchar(255) PRIMARY KEY,
  [noiDung] nvarchar(255),
  [nguoiGui] nvarchar(255),
  [maNguoiGui] nvarchar(255),
  [thoiGian] datetime,
  [traLoi] nvarchar(255),
  [trangThai] nvarchar(255)
)
GO

CREATE TABLE [TinNhanLienHe] (
  [maTinNhanLienHe] nvarchar(255) PRIMARY KEY,
  [ngayTao] datetime,
  [email] nvarchar(255),
  [noiDung] nvarchar(255),
  [hoTen] nvarchar(255),
  [soDienThoai] nvarchar(255),
  [maNguoiDung] nvarchar(255),
  [trangThai] nvarchar(255)
)
GO

CREATE TABLE [DanhMuc] (
  [maDanhMuc] nvarchar(255) PRIMARY KEY,
  [tenDanhMuc] nvarchar(255),
  [moTa] nvarchar(255),
  [hinhAnh] nvarchar(255),
  [trangThai] nvarchar(255),
  [thuTu] int
)
GO

CREATE TABLE [SanPham] (
  [maSanPham] nvarchar(255) PRIMARY KEY,
  [tenSanPham] nvarchar(255),
  [thuocTinh] nvarchar(255),
  [hinhAnh] nvarchar(255),
  [giaSanPham] int,
  [maDanhMuc] nvarchar(255),
  [moTa] nvarchar(255),
  [trangThai] nvarchar(255),
  [ngayTao] datetime,
  [ngayCapNhat] datetime
)
GO

CREATE TABLE [KhuyenMai] (
  [maKhuyenMai] nvarchar(255) PRIMARY KEY,
  [maGiamGia] nvarchar(255) UNIQUE,
  [mucGiamGia] int,
  [ngayBatDau] datetime,
  [ngayKetThuc] datetime,
  [trangThai] nvarchar(255),
  [moTa] nvarchar(255),
  [soLuongToiDa] int,
  [soLuongDaSuDung] int
)
GO

CREATE TABLE [DonHang] (
  [maDonHang] nvarchar(255) PRIMARY KEY,
  [maNguoiDung] nvarchar(255),
  [tenNguoiNhan] nvarchar(255),
  [soDienThoaiNhan] nvarchar(255),
  [diaChiGiaoHang] nvarchar(255),
  [ngayTao] datetime,
  [ngayCapNhat] datetime,
  [ngayGiaoYeuCau] date,
  [gioGiaoYeuCau] time,
  [maGiamGia] nvarchar(255),
  [phiVanChuyen] int,
  [trangThai] nvarchar(255),
  [ghiChu] nvarchar(255)
)
GO

CREATE TABLE [ThanhToanDonHang] (
  [maThanhToan] nvarchar(255) PRIMARY KEY,
  [maDonHang] nvarchar(255) UNIQUE,
  [tongTienHang] int,
  [soTienGiamGia] int,
  [phiVanChuyen] int,
  [tongThanhToan] int,
  [phuongThucThanhToan] nvarchar(255),
  [trangThaiThanhToan] nvarchar(255),
  [ngayThanhToan] datetime,
  [maGiaoDichNganHang] nvarchar(255)
)
GO

CREATE TABLE [ChiTietDonHang] (
  [maChiTietDonHang] nvarchar(255) PRIMARY KEY,
  [maDonHang] nvarchar(255),
  [maSanPham] nvarchar(255),
  [tenSanPham] nvarchar(255),
  [giaSanPham] int,
  [soLuong] int,
  [hinhAnh] nvarchar(255),
  [ghiChu] nvarchar(255)
)
GO

CREATE TABLE [KetQuaThanhToan] (
  [maGiaoDich] nvarchar(255) PRIMARY KEY,
  [maThanhToan] nvarchar(255),
  [soTien] int,
  [maPhieuThuHoi] nvarchar(255),
  [ngayThanhToan] datetime,
  [soGiaoDich] nvarchar(255),
  [trangThai] nvarchar(255)
)
GO

CREATE TABLE [GiaoDichVnpay] (
  [maGiaoDichRef] nvarchar(255) PRIMARY KEY,
  [maThanhToan] nvarchar(255),
  [soTien] int,
  [ngayTao] datetime,
  [trangThai] nvarchar(255),
  [orderKey] nvarchar(255),
  [maGiaoDichVnp] nvarchar(255),
  [thongTinTraVe] text
)
GO

CREATE TABLE [ThongKeThanhToan] (
  [maThongKe] nvarchar(255) PRIMARY KEY,
  [ngay] date,
  [tongSoGiaoDich] int,
  [tongTien] int,
  [soGiaoDichThanhCong] int,
  [soGiaoDichThatBai] int,
  [ngayCapNhat] datetime
)
GO

CREATE TABLE [TinTuc] (
  [maTinTuc] nvarchar(255) PRIMARY KEY,
  [tieuDe] nvarchar(255),
  [tomTat] nvarchar(255),
  [noiDung] text,
  [hinhAnh] nvarchar(255),
  [moTaAnh] nvarchar(255),
  [ngayDang] datetime,
  [tacGia] nvarchar(255),
  [trangThai] nvarchar(255),
  [luotXem] int
)
GO

CREATE TABLE [DanhGiaDonHang] (
  [maDanhGia] nvarchar(255) PRIMARY KEY,
  [maDonHang] nvarchar(255) UNIQUE,
  [maNguoiDung] nvarchar(255),
  [tenNguoiDung] nvarchar(255),
  [diemDanhGia] int,
  [nhanXet] nvarchar(255),
  [thoiGian] datetime,
  [trangThai] nvarchar(255)
)
GO

CREATE TABLE [ChucVu] (
  [maChucVu] nvarchar(255) PRIMARY KEY,
  [tenChucVu] nvarchar(255) UNIQUE,
  [moTa] nvarchar(255),
  [luongCoBan] int,
  [quyenHan] nvarchar(255)
)
GO

CREATE TABLE [NhanVien] (
  [maNhanVien] nvarchar(255) PRIMARY KEY,
  [hoTen] nvarchar(255),
  [email] nvarchar(255) UNIQUE,
  [soDienThoai] nvarchar(255),
  [diaChi] nvarchar(255),
  [anhDaiDien] nvarchar(255),
  [luongCoBan] int,
  [chucVu] nvarchar(255),
  [ngayBatDau] date,
  [trangThai] nvarchar(255)
)
GO

CREATE TABLE [ChamCong] (
  [maChamCong] nvarchar(255) PRIMARY KEY,
  [uid] nvarchar(255),
  [email] nvarchar(255),
  [ngay] date,
  [thoiGian] datetime,
  [loai] nvarchar(255),
  [trangThai] nvarchar(255),
  [viDo] float,
  [kinhDo] float
)
GO

CREATE TABLE [DonNghiPhep] (
  [maDonNghiPhep] nvarchar(255) PRIMARY KEY,
  [uid] nvarchar(255),
  [email] nvarchar(255),
  [lyDo] nvarchar(255),
  [ngayBatDau] date,
  [ngayKetThuc] date,
  [trangThai] nvarchar(255),
  [ngayTao] datetime,
  [ngayDuyet] datetime,
  [nguoiDuyet] nvarchar(255),
  [ngayTuChoi] datetime,
  [nguoiTuChoi] nvarchar(255)
)
GO

CREATE TABLE [DonTangCa] (
  [maDonTangCa] nvarchar(255) PRIMARY KEY,
  [uid] nvarchar(255),
  [email] nvarchar(255),
  [lyDo] nvarchar(255),
  [ngay] date,
  [thoiGianBatDau] nvarchar(255),
  [thoiGianKetThuc] nvarchar(255),
  [trangThai] nvarchar(255),
  [ngayTao] datetime,
  [ngayDuyet] datetime,
  [nguoiDuyet] nvarchar(255),
  [ngayTuChoi] datetime,
  [nguoiTuChoi] nvarchar(255)
)
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'PRIMARY KEY (maNguoiDung1, maNguoiDung2)',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'BanBe';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'PRIMARY KEY (maNguoiGui, maNguoiNhan)',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'LoiMoiKetBan';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'PRIMARY KEY (maBaiDang, maNguoiDung)',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'ThichBaiDang';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'PRIMARY KEY (maBinhLuan, maNguoiDung)',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'ThichBinhLuan';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'PRIMARY KEY (maCuocTroChuyen, maNguoiDung)',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'ThanhVienTroChuyen';
GO

ALTER TABLE [NhatKy] ADD FOREIGN KEY ([maNguoiDung]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [TheThanhVien] ADD FOREIGN KEY ([maNguoiDung]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [BanBe] ADD FOREIGN KEY ([maNguoiDung1]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [BanBe] ADD FOREIGN KEY ([maNguoiDung2]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [LoiMoiKetBan] ADD FOREIGN KEY ([maNguoiGui]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [LoiMoiKetBan] ADD FOREIGN KEY ([maNguoiNhan]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [BaiDang] ADD FOREIGN KEY ([maTacGia]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [ThichBaiDang] ADD FOREIGN KEY ([maBaiDang]) REFERENCES [BaiDang] ([maBaiDang])
GO

ALTER TABLE [ThichBaiDang] ADD FOREIGN KEY ([maNguoiDung]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [BinhLuan] ADD FOREIGN KEY ([maBaiDang]) REFERENCES [BaiDang] ([maBaiDang])
GO

ALTER TABLE [BinhLuan] ADD FOREIGN KEY ([maTacGia]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [ThichBinhLuan] ADD FOREIGN KEY ([maBinhLuan]) REFERENCES [BinhLuan] ([maBinhLuan])
GO

ALTER TABLE [ThichBinhLuan] ADD FOREIGN KEY ([maNguoiDung]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [TraLoiBinhLuan] ADD FOREIGN KEY ([maBinhLuan]) REFERENCES [BinhLuan] ([maBinhLuan])
GO

ALTER TABLE [TraLoiBinhLuan] ADD FOREIGN KEY ([maTacGia]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [DangTin24Gio] ADD FOREIGN KEY ([maNguoiDung]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [ThanhVienTroChuyen] ADD FOREIGN KEY ([maCuocTroChuyen]) REFERENCES [CuocTroChuyen] ([maCuocTroChuyen])
GO

ALTER TABLE [ThanhVienTroChuyen] ADD FOREIGN KEY ([maNguoiDung]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [TinNhan] ADD FOREIGN KEY ([maCuocTroChuyen]) REFERENCES [CuocTroChuyen] ([maCuocTroChuyen])
GO

ALTER TABLE [TinNhan] ADD FOREIGN KEY ([nguoiGui]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [CuocGoi] ADD FOREIGN KEY ([nguoiGoi]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [CuocGoi] ADD FOREIGN KEY ([nguoiNhan]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [TinNhanHoTro] ADD FOREIGN KEY ([maNguoiGui]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [TinNhanLienHe] ADD FOREIGN KEY ([maNguoiDung]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [SanPham] ADD FOREIGN KEY ([maDanhMuc]) REFERENCES [DanhMuc] ([maDanhMuc])
GO

ALTER TABLE [DonHang] ADD FOREIGN KEY ([maNguoiDung]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [DonHang] ADD FOREIGN KEY ([maGiamGia]) REFERENCES [KhuyenMai] ([maGiamGia])
GO

ALTER TABLE [ThanhToanDonHang] ADD FOREIGN KEY ([maDonHang]) REFERENCES [DonHang] ([maDonHang])
GO

ALTER TABLE [ChiTietDonHang] ADD FOREIGN KEY ([maDonHang]) REFERENCES [DonHang] ([maDonHang])
GO

ALTER TABLE [ChiTietDonHang] ADD FOREIGN KEY ([maSanPham]) REFERENCES [SanPham] ([maSanPham])
GO

ALTER TABLE [KetQuaThanhToan] ADD FOREIGN KEY ([maThanhToan]) REFERENCES [ThanhToanDonHang] ([maThanhToan])
GO

ALTER TABLE [GiaoDichVnpay] ADD FOREIGN KEY ([maThanhToan]) REFERENCES [ThanhToanDonHang] ([maThanhToan])
GO

ALTER TABLE [DanhGiaDonHang] ADD FOREIGN KEY ([maDonHang]) REFERENCES [DonHang] ([maDonHang])
GO

ALTER TABLE [DanhGiaDonHang] ADD FOREIGN KEY ([maNguoiDung]) REFERENCES [NguoiDung] ([maNguoiDung])
GO

ALTER TABLE [NhanVien] ADD FOREIGN KEY ([chucVu]) REFERENCES [ChucVu] ([tenChucVu])
GO

ALTER TABLE [ChamCong] ADD FOREIGN KEY ([email]) REFERENCES [NhanVien] ([email])
GO

ALTER TABLE [DonNghiPhep] ADD FOREIGN KEY ([email]) REFERENCES [NhanVien] ([email])
GO

ALTER TABLE [DonTangCa] ADD FOREIGN KEY ([email]) REFERENCES [NhanVien] ([email])
GO

ALTER TABLE [DonTangCa] ADD FOREIGN KEY ([nguoiDuyet]) REFERENCES [NhanVien] ([email])
GO

ALTER TABLE [DonTangCa] ADD FOREIGN KEY ([nguoiTuChoi]) REFERENCES [NhanVien] ([email])
GO
