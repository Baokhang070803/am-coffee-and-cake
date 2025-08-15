-- =====================================================
-- THÊM 4 BẢNG QUẢN LÝ KHO HÀNG VÀO DATABASE
-- ẤM COFFEE AND CAKE
-- =====================================================

-- 1. BẢNG NHÀ CUNG CẤP
CREATE TABLE NhaCungCap (
    maNhaCungCap VARCHAR(50) PRIMARY KEY,
    maNhaCungCap VARCHAR(20) UNIQUE NOT NULL,
    tenNhaCungCap NVARCHAR(200) NOT NULL,
    nguoiLienHe NVARCHAR(100),
    email VARCHAR(100),
    soDienThoai VARCHAR(20),
    diaChi NVARCHAR(500),
    sanPhamCungCap NVARCHAR(500),
    trangThai VARCHAR(20) DEFAULT 'active',
    ngayTao DATETIME DEFAULT GETDATE(),
    ngayCapNhat DATETIME DEFAULT GETDATE()
);

-- 2. BẢNG NGUYÊN LIỆU
CREATE TABLE NguyenLieu (
    maNguyenLieu VARCHAR(50) PRIMARY KEY,
    tenNguyenLieu NVARCHAR(200) NOT NULL,
    danhMuc VARCHAR(50),
    moTa NVARCHAR(500),
    hinhAnh VARCHAR(500),
    giaNhap INT DEFAULT 0,
    soLuong FLOAT DEFAULT 0,
    donVi VARCHAR(20),
    soLuongToiThieu INT DEFAULT 0,
    nhaCungCap VARCHAR(50),
    ngayTao DATETIME DEFAULT GETDATE(),
    ngayCapNhat DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (nhaCungCap) REFERENCES NhaCungCap(maNhaCungCap)
);

-- 3. BẢNG KHO HÀNG (CÔNG THỨC SẢN XUẤT)
CREATE TABLE KhoHang (
    maKhoHang VARCHAR(50) PRIMARY KEY,
    maSanPham VARCHAR(50),
    tenSanPham NVARCHAR(200) NOT NULL,
    danhMuc VARCHAR(50),
    hinhAnh VARCHAR(500),
    giaNguyenLieu INT DEFAULT 0,
    nguyenLieu TEXT, -- JSON chứa danh sách nguyên liệu và số lượng
    chiPhiNhanCong INT DEFAULT 0,
    chiPhiVanHanh INT DEFAULT 0,
    giaBan INT DEFAULT 0,
    ngayTao DATETIME DEFAULT GETDATE(),
    ngayCapNhat DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (maSanPham) REFERENCES SanPham(maSanPham)
);

-- 4. BẢNG KHẤU TRỪ NGUYÊN LIỆU
CREATE TABLE KhauTruNguyenLieu (
    maKhauTru VARCHAR(50) PRIMARY KEY,
    maNguyenLieu VARCHAR(50),
    tenNguyenLieu NVARCHAR(200),
    soLuongCu FLOAT DEFAULT 0,
    soLuongMoi FLOAT DEFAULT 0,
    soLuongKhauTru FLOAT DEFAULT 0,
    donVi VARCHAR(20),
    maDonHang VARCHAR(50),
    lyDo NVARCHAR(500),
    ngayKhauTru DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (maNguyenLieu) REFERENCES NguyenLieu(maNguyenLieu),
    FOREIGN KEY (maDonHang) REFERENCES DonHang(maDonHang)
);

-- =====================================================
-- TẠO INDEX ĐỂ TỐI ƯU HIỆU SUẤT
-- =====================================================

-- Index cho bảng NhaCungCap
CREATE INDEX idx_nhacungcap_trangthai ON NhaCungCap(trangThai);
CREATE INDEX idx_nhacungcap_ten ON NhaCungCap(tenNhaCungCap);

-- Index cho bảng NguyenLieu
CREATE INDEX idx_nguyenlieu_danhmuc ON NguyenLieu(danhMuc);
CREATE INDEX idx_nguyenlieu_nhacungcap ON NguyenLieu(nhaCungCap);
CREATE INDEX idx_nguyenlieu_soluong ON NguyenLieu(soLuong);

-- Index cho bảng KhoHang
CREATE INDEX idx_khohang_sanpham ON KhoHang(maSanPham);
CREATE INDEX idx_khohang_danhmuc ON KhoHang(danhMuc);

-- Index cho bảng KhauTruNguyenLieu
CREATE INDEX idx_khautru_nguyenlieu ON KhauTruNguyenLieu(maNguyenLieu);
CREATE INDEX idx_khautru_donhang ON KhauTruNguyenLieu(maDonHang);
CREATE INDEX idx_khautru_ngay ON KhauTruNguyenLieu(ngayKhauTru);

-- =====================================================
-- TẠO TRIGGER ĐỂ TỰ ĐỘNG CẬP NHẬT
-- =====================================================

-- Trigger cập nhật ngàyCapNhat cho bảng NhaCungCap
CREATE TRIGGER tr_NhaCungCap_Update
ON NhaCungCap
AFTER UPDATE
AS
BEGIN
    UPDATE NhaCungCap 
    SET ngayCapNhat = GETDATE()
    FROM NhaCungCap ncc
    INNER JOIN inserted i ON ncc.maNhaCungCap = i.maNhaCungCap;
END;

-- Trigger cập nhật ngàyCapNhat cho bảng NguyenLieu
CREATE TRIGGER tr_NguyenLieu_Update
ON NguyenLieu
AFTER UPDATE
AS
BEGIN
    UPDATE NguyenLieu 
    SET ngayCapNhat = GETDATE()
    FROM NguyenLieu nl
    INNER JOIN inserted i ON nl.maNguyenLieu = i.maNguyenLieu;
END;

-- Trigger cập nhật ngàyCapNhat cho bảng KhoHang
CREATE TRIGGER tr_KhoHang_Update
ON KhoHang
AFTER UPDATE
AS
BEGIN
    UPDATE KhoHang 
    SET ngayCapNhat = GETDATE()
    FROM KhoHang kh
    INNER JOIN inserted i ON kh.maKhoHang = i.maKhoHang;
END;

-- =====================================================
-- TẠO VIEW ĐỂ BÁO CÁO
-- =====================================================

-- View báo cáo tồn kho
CREATE VIEW vw_BaoCaoTonKho AS
SELECT 
    nl.maNguyenLieu,
    nl.tenNguyenLieu,
    nl.danhMuc,
    nl.soLuong,
    nl.donVi,
    nl.soLuongToiThieu,
    nl.giaNhap,
    ncc.tenNhaCungCap,
    CASE 
        WHEN nl.soLuong <= nl.soLuongToiThieu THEN 'CẦN NHẬP'
        ELSE 'ĐỦ HÀNG'
    END as trangThai
FROM NguyenLieu nl
LEFT JOIN NhaCungCap ncc ON nl.nhaCungCap = ncc.maNhaCungCap;

-- View báo cáo sử dụng nguyên liệu
CREATE VIEW vw_BaoCaoSuDungNguyenLieu AS
SELECT 
    nl.tenNguyenLieu,
    nl.danhMuc,
    SUM(ktr.soLuongKhauTru) as tongSoLuongSuDung,
    nl.donVi,
    COUNT(ktr.maKhauTru) as soLanSuDung,
    MIN(ktr.ngayKhauTru) as ngaySuDungDau,
    MAX(ktr.ngayKhauTru) as ngaySuDungCuoi
FROM NguyenLieu nl
LEFT JOIN KhauTruNguyenLieu ktr ON nl.maNguyenLieu = ktr.maNguyenLieu
GROUP BY nl.maNguyenLieu, nl.tenNguyenLieu, nl.danhMuc, nl.donVi;

-- =====================================================
-- INSERT DỮ LIỆU MẪU
-- =====================================================

-- Thêm nhà cung cấp mẫu
INSERT INTO NhaCungCap (maNhaCungCap, maNhaCungCap, tenNhaCungCap, nguoiLienHe, email, soDienThoai, diaChi, sanPhamCungCap) VALUES
('NCC001', 'NCC001', N'Công ty TNHH Cà Phê Hoàng Khang', N'Trần Siêu Hoàng Khang', 'contact@caphehoangkhang.com', '0901 234 567', N'12 Nguyễn Thị Minh Khai, Q.1, TP.HCM', N'Cà phê hạt'),
('NCC002', 'NCC002', N'Cửa hàng Tạp Hóa Bảo Khang', N'Võ Trần Hoàng Bảo Khang', 'cuahangbaokhang@gmail.com', '0934 567 890', N'45 Trần Hưng Đạo, Q.5, TP.HCM', N'Sữa tươi, Đường'),
('NCC003', 'NCC003', N'Công ty TNHH Nguyên Liệu Bánh Ngọt SweetieCake', N'Nguyễn Thị Huỳnh Như', 'banhngotsweetiecake@gmail.com', '0909 888 777', N'215 Lý Thường Kiệt, Q.10, TP.HCM', N'Bột mì, Trứng, Men nở, Kem tươi, Bánh quy');

-- Thêm nguyên liệu mẫu
INSERT INTO NguyenLieu (maNguyenLieu, tenNguyenLieu, danhMuc, moTa, giaNhap, soLuong, donVi, soLuongToiThieu, nhaCungCap) VALUES
('NL001', N'Đường cát trắng', 'sugar', N'Đường bao ngập', 25000, 10, 'kg', 5, 'NCC002'),
('NL002', N'Sữa tươi', 'milk', N'Sữa tươi không đường', 50000, 9.4, 'l', 5, 'NCC002'),
('NL003', N'Cà phê hạt', 'coffee', N'Cà phê hạt nguyên chất', 200000, 15, 'kg', 5, 'NCC001'),
('NL004', N'Bột mì', 'flour', N'Bột mì đa dụng', 17000, 10, 'kg', 5, 'NCC003'),
('NL005', N'Trứng', 'other', N'Trứng gà tươi', 3000, 100, 'pcs', 5, 'NCC003'); 