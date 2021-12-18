-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 14, 2021 lúc 05:53 PM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `hotel`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ct_phieuthuephong`
--

CREATE TABLE `ct_phieuthuephong` (
  `MaPhong` int(11) NOT NULL,
  `NgayThue` date NOT NULL,
  `MaKH` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `ct_phieuthuephong`
--

INSERT INTO `ct_phieuthuephong` (`MaPhong`, `NgayThue`, `MaKH`) VALUES
(1, '2021-12-02', 1),
(1, '2021-12-02', 2),
(1, '2021-12-02', 7),
(2, '2021-12-02', 3),
(2, '2021-12-02', 4),
(2, '2021-12-02', 5),
(3, '2021-12-02', 8),
(3, '2021-12-02', 9),
(3, '2021-12-02', 10);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `MaHD` int(11) NOT NULL,
  `MaKH` int(11) NOT NULL,
  `NgayLap` date NOT NULL,
  `GiaTri` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`MaHD`, `MaKH`, `NgayLap`, `GiaTri`) VALUES
(1, 1, '2021-12-10', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `MaKH` int(11) NOT NULL,
  `TenKH` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci NOT NULL,
  `CMND` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SDT` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DiaChi` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci DEFAULT NULL,
  `LoaiKH` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`MaKH`, `TenKH`, `CMND`, `SDT`, `DiaChi`, `LoaiKH`) VALUES
(1, 'Phan Thị Luyến', '1122336655', '0123456789', 'Q5, TP.HCM', 1),
(2, 'Nguyễn Thị Quỳnh Như', '1166334455', '0124456789', 'Đức Trọng, Lâm Đồng', 1),
(3, 'Lê Khắc Đan', '1122334455', '0123664489', 'Q5, TP.Đà Lạt', 1),
(4, 'Raiden Shogun', '1122334455', '0123458889', 'Narukami, Inazuma', 2),
(5, 'Yae Miko', '1122247455', '0128856789', 'Narukami, Inazuma', 2),
(6, 'Violet Evergarde', '1122678455', '0123756789', 'Tokyo, Japa', 2),
(7, 'Sung Jinwoo', '1122345455', '0123457689', 'Seoul, Korea', 2),
(8, 'Arther', '1122144455', '0123676789', 'Berlin, Germany', 2),
(9, 'Trần Anh Tuấn', '1124474455', '0123816789', 'Tân Bình, TP.HCM', 1),
(10, 'Vũ Anh Quốc', '1124784455', '0123346789', 'Ngô Gia Tự, TP.Đà Lạt', 1),
(11, 'Hoàng Kim San', '1122334995', '0123168789', 'Q5, TP.Đà Lạt', 1),
(12, 'Lý Mạc Sầu', '1122334655', '0123450239', 'Q7, TP.Buôn Mê Thuột', 1),
(13, 'Dương Khai', '1145634455', '0123456981', 'Q1, TP.HCM', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaikh`
--

CREATE TABLE `loaikh` (
  `MaLoai` int(11) NOT NULL,
  `TenLoai` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci NOT NULL,
  `HeSo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `loaikh`
--

INSERT INTO `loaikh` (`MaLoai`, `TenLoai`, `HeSo`) VALUES
(1, 'Khách nội địa', 1),
(2, 'Khách nước ngoài', 1.5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaiphong`
--

CREATE TABLE `loaiphong` (
  `MaLoai` int(11) NOT NULL,
  `TenLoai` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci NOT NULL,
  `DonGia` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `loaiphong`
--

INSERT INTO `loaiphong` (`MaLoai`, `TenLoai`, `DonGia`) VALUES
(0, 'Daaaaaa', 300000),
(1, 'Aádasdadafsdf', 150000),
(2, 'B', 170000),
(3, 'C', 200000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `MaNV` int(11) NOT NULL,
  `TenNV` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci NOT NULL,
  `DiaChi` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci DEFAULT NULL,
  `NgaySinh` date DEFAULT NULL,
  `SDT` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MatKhau` varchar(150) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci NOT NULL,
  `Role` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`MaNV`, `TenNV`, `DiaChi`, `NgaySinh`, `SDT`, `email`, `MatKhau`, `Role`) VALUES
(1, 'Nguyễn Thùy Trang', 'Q5, TP.HCM', NULL, '0123456789', 'thuytrang@email.com', '123456', 'NV'),
(2, 'Võ Văn Tuấn', 'Tân Bình, TP.HCM', NULL, '0123456799', 'vantuan@email.com', '123456', 'Admin'),
(3, 'Đỗ Thanh Sang', 'Q1, TP.HCM', NULL, '0123456999', 'thanhsang@email.com', '123456', 'NV');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieuthuephong`
--

CREATE TABLE `phieuthuephong` (
  `MaPhong` int(11) NOT NULL,
  `NgayThue` date NOT NULL,
  `NgayTra` date DEFAULT NULL,
  `MaHD` int(11) DEFAULT NULL,
  `SoNgaySuDung` int(11) DEFAULT NULL,
  `ThanhTien` float DEFAULT NULL,
  `TrangThaiThanhToan` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `phieuthuephong`
--

INSERT INTO `phieuthuephong` (`MaPhong`, `NgayThue`, `NgayTra`, `MaHD`, `SoNgaySuDung`, `ThanhTien`, `TrangThaiThanhToan`) VALUES
(1, '2021-12-02', NULL, NULL, NULL, NULL, 'Chưa thanh toán'),
(2, '2021-12-02', NULL, NULL, NULL, NULL, 'Chưa thanh toán'),
(3, '2021-12-02', NULL, NULL, NULL, NULL, 'Chưa thanh toán');

--
-- Bẫy `phieuthuephong`
--
DELIMITER $$
CREATE TRIGGER `afer_phieuthuephong_hoadon_update` AFTER UPDATE ON `phieuthuephong` FOR EACH ROW BEGIN
    IF NEW.ThanhTien is not null then
        UPDATE HoaDon
        set GiaTri = ((select sum(p.ThanhTien) from PhieuThuePhong p where p.MaHD = NEW.MaHD))
        WHERE MaHD = NEW.MaHD;
    END IF; 
    UPDATE HoaDon
        set GiaTri = ((select sum(p.ThanhTien) from PhieuThuePhong p where p.MaHD = old.MaHD))
        WHERE MaHD = old.MaHD;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_phieuthuephong_insert` BEFORE INSERT ON `phieuthuephong` FOR EACH ROW BEGIN
    IF NEW.MaHD is not null then
        set NEW.NgayTra = (select NgayLap from HoaDon where MaHD = NEW.MaHD),
        NEW.SoNgaySuDung = datediff((select NgayLap from HoaDon where MaHD = NEW.MaHD),NEW.NgayThue),
        NEW.TrangThaiThanhToan = 'Đã thanh toán';
        
		set @PhuThu = 1;
		if (select count(*) from CT_PhieuThuePhong ct WHERE ct.MaPhong = NEW.MaPhong and ct.NgayThue = NEW.NgayThue) >= (select `value` from QuyDinh where `key`= 'SLToiDa') THEN
				set @PhuThu = (select `value` from QuyDinh where `key`= 'PhuThu');
                end if;
		set NEW.ThanhTien = (select DonGia from LoaiPhong lp join Phong p on lp.MaLoai = p.LoaiPhong WHERE NEW.MaPhong = p.MaPhong)
								* NEW.SoNgaySuDung * @PhuThu
								*(select MAX(l.HeSo) from CT_PhieuThuePhong ct 
														join KhachHang kh on ct.MaKH = kh.MaKH
														join LoaiKH l on kh.LoaiKH = l.MaLoai
                                 WHERE ct.MaPhong = NEW.MaPhong and ct.NgayThue = NEW.NgayThue)	;		
		UPDATE Phong
        set TinhTrang = 'Trống'
        WHERE MaPhong = NEW.MaPhong;

     ELSE
     set NEW.NgayTra = NULL,
        NEW.SoNgaySuDung = NULL,
        NEW.TrangThaiThanhToan = 'Chưa thanh toán',
        NEW.ThanhTien = NULL;
     UPDATE Phong
        set TinhTrang = 'Đã thuê'
        WHERE MaPhong = NEW.MaPhong;

    END IF; 

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_phieuthuephong_update` BEFORE UPDATE ON `phieuthuephong` FOR EACH ROW BEGIN
    IF NEW.MaHD is not null then
        set NEW.NgayTra = (select NgayLap from HoaDon where MaHD = NEW.MaHD),
        NEW.SoNgaySuDung = datediff((select NgayLap from HoaDon where MaHD = NEW.MaHD),NEW.NgayThue),
        NEW.TrangThaiThanhToan = 'Đã thanh toán';
        
		set @PhuThu = 1;
		if (select count(*) from CT_PhieuThuePhong ct WHERE ct.MaPhong = NEW.MaPhong and ct.NgayThue = NEW.NgayThue) >= (select `value` from QuyDinh where `key`= 'SLToiDa') THEN
				set @PhuThu = (select `value` from QuyDinh where `key`= 'PhuThu');
                end if;
		set NEW.ThanhTien = (select DonGia from LoaiPhong lp join Phong p on lp.MaLoai = p.LoaiPhong WHERE NEW.MaPhong = p.MaPhong)
								* NEW.SoNgaySuDung * @PhuThu
								*(select MAX(l.HeSo) from CT_PhieuThuePhong ct 
														join KhachHang kh on ct.MaKH = kh.MaKH
														join LoaiKH l on kh.LoaiKH = l.MaLoai
                                 WHERE ct.MaPhong = NEW.MaPhong and ct.NgayThue = NEW.NgayThue)	;		
		UPDATE Phong
        set TinhTrang = 'Trống'
        WHERE MaPhong = NEW.MaPhong;

     ELSE
     set NEW.NgayTra = NULL,
        NEW.SoNgaySuDung = NULL,
        NEW.TrangThaiThanhToan = 'Chưa thanh toán',
        NEW.ThanhTien = NULL;
     UPDATE Phong
        set TinhTrang = 'Đã thuê'
        WHERE MaPhong = NEW.MaPhong;

    END IF; 

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phong`
--

CREATE TABLE `phong` (
  `MaPhong` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int(11) NOT NULL,
  `status` varchar(20) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci NOT NULL,
  `note` varchar(255) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `phong`
--

INSERT INTO `phong` ( `MaPhong`, `name`, `type`, `status`, `note`) VALUES
( 1, 'P001', 1, 'Đã thuê', NULL),
( 2, 'P002', 1, 'Đã thuê', NULL),
(3, 'P003', 1, 'Đã thuê', NULL),
(4, 'P004', 1, 'Trống', NULL),
( 5, 'P005', 1, 'Trống', NULL),
( 6, 'P006', 1, 'Trống', NULL),
( 7, 'P101', 2, 'Trống', NULL),
( 8, 'P102', 2, 'Trống', NULL),
( 9, 'P103', 2, 'Trống', NULL),
( 10, 'P104', 2, 'Trống', NULL),
( 11, 'P105', 2, 'Trống2222222222222', ''),
( 12, 'P106', 2, 'Trống', NULL),
( 13, 'P201', 3, 'Trống', NULL),
( 14, 'P202', 3, 'Trống', NULL),
( 15, 'P203', 3, 'Trống', NULL),
( 16, 'P204', 3, 'Trống', NULL),
( 17, 'P205', 3, 'Trống', NULL),
( 18, 'P206', 3, 'Trống', NULL),
( 123, 'Nguyễn Văn Trung', 1, 'hết', 'adhajkldnawkld');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quydinh`
--

CREATE TABLE `quydinh` (
  `Key` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Value` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `quydinh`
--

INSERT INTO `quydinh` (`Key`, `Value`) VALUES
('PhuThu', 1.25),
('SLToiDa', 3);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `ct_phieuthuephong`
--
ALTER TABLE `ct_phieuthuephong`
  ADD PRIMARY KEY (`MaPhong`,`NgayThue`,`MaKH`),
  ADD KEY `FK_CT_ThuePhong_KhachHang` (`MaKH`),
  ADD KEY `FK_CT_ThuePhong_ThuePhong` (`NgayThue`,`MaPhong`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`MaHD`),
  ADD KEY `FK_HoaDon_KhachHang` (`MaKH`);

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`MaKH`),
  ADD KEY `FK_KhachHang_LoaiKH` (`LoaiKH`);

--
-- Chỉ mục cho bảng `loaikh`
--
ALTER TABLE `loaikh`
  ADD PRIMARY KEY (`MaLoai`);

--
-- Chỉ mục cho bảng `loaiphong`
--
ALTER TABLE `loaiphong`
  ADD PRIMARY KEY (`MaLoai`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`MaNV`);

--
-- Chỉ mục cho bảng `phieuthuephong`
--
ALTER TABLE `phieuthuephong`
  ADD PRIMARY KEY (`NgayThue`,`MaPhong`),
  ADD KEY `FK_PhieuThuePhong_HoaDon` (`MaHD`),
  ADD KEY `FK_ThuePhong_Phong` (`MaPhong`);

--
-- Chỉ mục cho bảng `phong`
--
ALTER TABLE `phong`
  ADD PRIMARY KEY (`MaPhong`);

--
-- Chỉ mục cho bảng `quydinh`
--
ALTER TABLE `quydinh`
  ADD PRIMARY KEY (`Key`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `phong`
--
ALTER TABLE `phong`
  MODIFY `MaPhong` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `ct_phieuthuephong`
--
ALTER TABLE `ct_phieuthuephong`
  ADD CONSTRAINT `FK_CT_ThuePhong_KhachHang` FOREIGN KEY (`MaKH`) REFERENCES `khachhang` (`MaKH`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_CT_ThuePhong_ThuePhong` FOREIGN KEY (`NgayThue`,`MaPhong`) REFERENCES `phieuthuephong` (`NgayThue`, `MaPhong`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `FK_HoaDon_KhachHang` FOREIGN KEY (`MaKH`) REFERENCES `khachhang` (`MaKH`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD CONSTRAINT `FK_KhachHang_LoaiKH` FOREIGN KEY (`LoaiKH`) REFERENCES `loaikh` (`MaLoai`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `phieuthuephong`
--
ALTER TABLE `phieuthuephong`
  ADD CONSTRAINT `FK_PhieuThuePhong_HoaDon` FOREIGN KEY (`MaHD`) REFERENCES `hoadon` (`MaHD`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ThuePhong_Phong` FOREIGN KEY (`MaPhong`) REFERENCES `phong` (`MaPhong`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
