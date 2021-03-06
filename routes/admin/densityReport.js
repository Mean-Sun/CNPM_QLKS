var express = require('express');
var router = express.Router();
var databaseConfig = require('../../models/db');
var fs = require('fs');

// Get density report view
router.get('/', function (req, res, next) {

    res.render('admin/densityReport/index', {
        user: req.session.user,
        layout: 'orther'
    });
})

// Get density report data by month
router.post('/', function (req, res, next) {
    var thang = parseInt(req.body.Thang)
    const sql = `
    SET @curRow = 0;
    SET @total = (SELECT sum(pt.SoNgaySuDung) FROM PhieuThuePhong pt WHERE month(pt.NgayTra) = ${thang});
    SELECT @curRow := @curRow + 1 AS STT,p.name, sum(SoNgaySuDung) as SoNgaySuDung, (sum(SoNgaySuDung) / @total)*100 as TyLe
    	FROM Phong p Join PhieuThuePhong pt on p.MaPhong = pt.MaPhong
        WHERE month(pt.NgayTra) = ${thang}
    	GROUP BY p.MaPhong,p.name`

    databaseConfig.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/densityReport/index', {
                data: '',
                user: req.session.user,
                layout: 'orther'
            });
        } else {
            console.log(rows);
            res.render('admin/densityReport/index', {
                data: rows[2],
                user: req.session.user,
                layout: 'orther'
            });
        }
    });
})

module.exports = router;
