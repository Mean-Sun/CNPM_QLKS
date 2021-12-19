var express = require('express');
var router = express.Router();
var databaseConfig = require('../../models/db');
var fs = require('fs');


router.get('/', function (req, res, next) {

    res.render('admin/densityReport/index', {
        layout: 'orther'
    });
})

router.post('/', function (req, res, next) {
    var thang = req.body.Thang
    const sql = `
    SELECT p.MaPhong,p.name, sum(SoNgaySuDung) as SoNgaySuDung
        FROM Phong p Join PhieuThuePhong pt on p.MaPhong = pt.MaPhong
        WHERE month(pt.NgayTra) = ${thang}
        GROUP BY p.MaPhong,p.name`

    databaseConfig.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/densityReport/index', {
                data: '',
                layout: 'orther'
            });
        } else {
            console.log(rows);
            res.render('admin/densityReport/index', {
                data: rows,
                layout: 'orther'
            });
        }
        layout: 'orther'
    });
})
module.exports = router