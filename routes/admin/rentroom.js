var express = require('express');
var router = express.Router();
var databaseConfig = require('../../models/db');
var fs = require('fs');

// Danh sách phiếu thuê phòng
router.get('/', function(req, res, next) {
    const sql = 'SELECT * FROM phieuthuephong '
    databaseConfig.query(sql, function(err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/rentroom/index', {
                data: '',
                layout: 'orther'
            });
        } else {
            res.render('admin/rentroom/index', {
                data: rows,
                layout: 'orther'
            });
        }

    })
})

// Get view 
router.get('/create', function(req, res, next) {
    res.render('admin/rentroom/create', {
        layout: 'orther'
    });
})

// add  rentroom
router.post('/create', function(req, res, next) {
    let MaPhong = req.body.MaPhong;
    let NgayThue = req.body.NgayThue;
    let NgayTra = req.body.NgayTra;
    let MaHD = req.body.MaHD;
    let SoNgaySuDung = req.body.SoNgaySuDung;
    let ThanhTien = req.body.ThanhTien;
    let TrangThaiThanhToan = req.body.TrangThaiThanhToan;

    let errors = false;
    if (!errors) {
        var form_data = {
            MaPhong: MaPhong,
            NgayThue: NgayThue,
            NgayTra: NgayTra,
            MaHD: MaHD,
            SoNgaySuDung: SoNgaySuDung,
            ThanhTien: ThanhTien,
            TrangThaiThanhToan: TrangThaiThanhToan,

        }
        databaseConfig.query('INSERT INTO phieuthuephong SET ?', form_data, function(err, result) {
            if (err) {
                // console.log(form_data.image);
                req.flash('error', err)
                console.log(form_data)
                    // render to add.ejs
                res.render('admin/rentroom/create', {
                    MaPhong: form_data.MaPhong,
                    NgayThue: form_data.NgayThue,
                    NgayTra: form_data.NgayTra,
                    MaHD: form_data.MaHD,
                    SoNgaySuDung: form_data.SoNgaySuDung,
                    ThanhTien: form_data.ThanhTien,
                    TrangThaiThanhToan: form_data.TrangThaiThanhToan,
                    layout: 'orther',
                })
            } else {
                req.flash('success', 'Product successfully added');
                res.redirect('/rentroom/');
            }
        })
    }
})

// get view edit
router.get('/edit/(:MaPhong)', function(req, res, next) {
    let id = req.params.MaPhong;
    databaseConfig.query(`SELECT * FROM phieuthuephong where MaPhong =` + id, function(err, rows, fields) {
        if (err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Phong not found with MaPhong = ' + id)
            res.redirect('/rentroom')
        } else {
            res.render('admin/rentroom/edit', {
                MaPhong: rows[0].MaPhong,
                NgayThue: rows[0].NgayThue,
                NgayTra: rows[0].NgayTra,
                MaHD: rows[0].MaHD,
                SoNgaySuDung: rows[0].SoNgaySuDung,
                ThanhTien: rows[0].ThanhTien,
                TrangThaiThanhToan: rows[0].TrangThaiThanhToan,
                layout: 'orther'
            })
        }
    })
})

// Sửa Phòng
router.post('/edit/:MaPhong', function(req, res, next) {
    let MaPhong = req.body.MaPhong;
    let NgayThue = req.body.NgayThue;
    let NgayTra = req.body.NgayTra;
    let MaHD = req.body.MaHD;
    let SoNgaySuDung = req.body.SoNgaySuDung;
    let ThanhTien = req.body.ThanhTien;
    let TrangThaiThanhToan = req.body.TrangThaiThanhToan;
    if (!errors) {
        var form_data = {
            MaPhong: MaPhong,
            NgayThue: NgayThue,
            NgayTra: NgayTra,
            MaHD: MaHD,
            SoNgaySuDung: SoNgaySuDung,
            ThanhTien: ThanhTien,
            TrangThaiThanhToan: TrangThaiThanhToan,
        }
        databaseConfig.query('UPDATE phieuthuephong SET ? WHERE MaPhong = ' + MaPhong, form_data, function(err, result) {
            if (err) {
                console.log(form_data);
                req.flash('error', err)
                    // render to add.ejs
                res.render('admin/rentroom/edit', {
                    MaPhong: form_data.MaPhong,
                    NgayThue: form_data.NgayThue,
                    NgayTra: form_data.NgayTra,
                    MaHD: form_data.MaHD,
                    SoNgaySuDung: form_data.SoNgaySuDung,
                    ThanhTien: form_data.ThanhTien,
                    TrangThaiThanhToan: form_data.TrangThaiThanhToan,
                    layout: 'orther',
                })
            } else {
                req.flash('success', 'Update Product successfully added');
                res.redirect('/rentroom/');
            }
        })
    }

})

router.get('/checkout', function(req, res, next) {

    res.render('admin/rentroom/checkout', {
        layout: 'orther'
    });


})

router.get('/getcustomer', function(req, res, next) {
    console.log(req.query.name);
    const sql = `SELECT * FROM KhachHang where TenKH like "%${req.query.name}%" `
    databaseConfig.query(sql, function(err, rows) {
        if (err) {
            req.flash('error', err);
            res.send(err.message);
        } else {
            console.log(rows);

            res.send(rows);
        }
    })
})

module.exports = router