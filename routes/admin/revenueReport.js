var express = require('express');
var router = express.Router();
var databaseConfig = require('../../models/db');
var fs = require('fs');


// Get view add Product
router.get('/', function (req, res, next) {

    res.render('admin/revenueReport/index', {
        layout: 'orther'
    });
})

router.post('/', function (req, res, next) {
    var thang = req.body.Thang
    const sql = `
    SET @curRow = 0;
    SET @total = (SELECT sum(pt.ThanhTien) FROM PhieuThuePhong pt WHERE month(pt.NgayTra) = ${thang});      
    SELECT @curRow := @curRow + 1 AS STT,l.MaLoai,l.TenLoai, sum(pt.ThanhTien) DoanhThu, sum(pt.ThanhTien)/@total as TyLe
        FROM Phong p Join PhieuThuePhong pt on p.MaPhong = pt.MaPhong
        Join LoaiPhong l on p.type = l.MaLoai
        WHERE month(pt.NgayTra) = ${thang}
        GROUP BY l.MaLoai,l.TenLoai`

    databaseConfig.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/revenueReport/index', {
                data: '',
                layout: 'orther'
            });
        } else {
            console.log(rows);
            res.render('admin/revenueReport/index', {
                data: rows,
                layout: 'orther'
            });
        }
        layout: 'orther'
    });
})
module.exports = router