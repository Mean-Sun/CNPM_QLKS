var express = require('express');
var router = express.Router();
var databaseConfig = require('../../models/db');
var fs = require('fs');

//hiện thị danh sách loại phòng
router.get('/', function (req, res, next) {
    const sql = 'SELECT * FROM loaiphong ORDER BY MaLoai'
    databaseConfig.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/typeRoom/index',
                {
                    data: '',
                    user: req.session.user,
                    layout: 'orther'
                });
        } else {
            res.render('admin/typeRoom/index',
                {
                    data: rows,
                    user: req.session.user,
                    layout: 'orther'
                });
        }

    })
})

// Get view add Product
router.get('/create', function (req, res, next) {
    res.render('admin/typeRoom/create',
        {
            user: req.session.user,
            layout: 'orther'
        });
})

// add type room
router.post('/create', function (req, res, next) {
    let maLoai = req.body.MaLoai;
    let tenLoai = req.body.TenLoai;
    let donGia = req.body.DonGia;

    let errors = false;
    if (!errors) {
        var form_data = {
            MaLoai: maLoai,
            TenLoai: tenLoai,
            DonGia: donGia,

        }
        databaseConfig.query('INSERT INTO loaiphong SET ?', form_data, function (err, result) {
            if (err) {
                // console.log(form_data.image);
                req.flash('error', err)
                console.log(err)
                // render to add.ejs
                res.render('admin/typeRoom/create', {
                    MaLoai: form_data.MaLoai,
                    TenLoai: form_data.TenLoai,
                    DonGia: form_data.DonGia,
                    user: req.session.user,
                    layout: 'orther',
                })
            } else {
                req.flash('success', 'Product successfully added');
                res.redirect('/typeRoom/');
            }
        })
    }
})

// edit view
router.get('/edit/(:MaLoai)', function (req, res, next) {
    let MaLoai = req.params.MaLoai;
    // console.log(id)
    databaseConfig.query(`SELECT * FROM loaiphong where MaLoai =` + MaLoai, function (err, rows, fields) {
        if (err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Phong not found with MaLoai = ' + MaLoai)
            res.redirect('/typeRoom/edit/' + MaLoai)
        } else {
            res.render('admin/typeRoom/edit', {
                MaLoai: rows[0].MaLoai,
                TenLoai: rows[0].TenLoai,
                DonGia: rows[0].DonGia,
                user: req.session.user,
                layout: 'orther'
            })
        }
    })
})

// Sửa Phòng
router.post('/edit/:Maloai', function (req, res, next) {
    let maLoai = req.body.MaLoai;
    let tenLoai = req.body.TenLoai;
    let donGia = req.body.DonGia;
    let errors = false;
    if (!errors) {
        var form_data = {
            MaLoai: maLoai,
            TenLoai: tenLoai,
            DonGia: donGia,
        }
        databaseConfig.query('UPDATE loaiphong SET ? WHERE MaLoai = ' + maLoai, form_data, function (err, result) {
            if (err) {

                req.flash('error', err)
                // render to add.ejs
                res.render('admin/typeRoom/edit', {
                    MaLoai: form_data.MaLoai,
                    TenLoai: form_data.TenLoai,
                    DonGia: form_data.DonGia,
                    user: req.session.user,
                    layout: 'orther',
                })
            } else {
                req.flash('success', 'Update Product successfully added');
                res.redirect('/typeRoom/');
            }
        })
    }
})

//Xoa
router.get('/delete/:MaLoai', function (req, res, next) {
    let id = req.params.MaLoai;

    databaseConfig.query('DELETE FROM loaiphong WHERE MaLoai = ' + id, function (err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err);
            // redirect to books page
            res.redirect('/typeRoom/');
        } else {
            // set flash message
            req.flash('success', 'Type of Room successfully deleted! ID = ' + id);
            // redirect to books page
            res.redirect('/typeRoom/');
        }
    })
})


module.exports = router;
