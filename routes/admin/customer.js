const express = require('express');
const router = express.Router();
const databaseConfig = require('../../models/db');
const fs = require('fs');

// Danh sách KH
router.get('/', function (req, res, next) {
    const sql = 'SELECT * FROM khachhang, loaikh where khachhang.LoaiKH = loaikh.MaLoai ORDER BY MaKH';
    databaseConfig.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/customer/index', {
                data: '',
                user: req.session.user,
                layout: 'orther'
            });
        } else {
            res.render('admin/customer/index',
                {
                    data: rows,
                    user: req.session.user,
                    layout: 'orther'
                });
        }
    })
})

// Get view add customer
router.get('/create', function (req, res, next) {
    res.render('admin/customer/create',
        {
            user: req.session.user,
            layout: 'orther'
        });
})

// add customer
router.post('/create', function (req, res, next) {
    let customer = {
        MaKH: 0,
        TenKH: req.body.TenKH,
        CMND: req.body.CMND,
        DiaChi: req.body.DiaChi,
        SDT: req.body.SDT,
        LoaiKH: req.body.LoaiKH
    }

    let message = '';

    if (customer.TenKH === '') {
        message = 'Vui lòng nhập họ tên';
        return res.render('admin/customer/create', {
            customer,
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }

    databaseConfig.query('SELECT MaKH FROM khachhang ORDER BY MaKH DESC LIMIT 0, 1', function (err, rows) {
            if (err) {
                req.flash('error', err);
            } else {
                customer.MaKH = rows[0].MaKH + 1;
                databaseConfig.query('INSERT INTO khachhang SET ?', customer, function (err, result) {
                    if (err) {
                        req.flash('error', err)
                        message = 'Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu';
                        res.render('admin/customer/create', {
                            customer,
                            message,
                            user: req.session.user,
                            layout: 'orther',
                        })
                    } else {
                        req.flash('success', 'Customer successfully added');
                        res.redirect('/customer/');
                    }
                })
            }
        }
    );
})

// get view edit
router.get('/edit/(:MaKH)', function (req, res, next) {
    const id = req.params.MaKH;
    databaseConfig.query(`SELECT * FROM khachhang where MaKH =` + id, function (err, rows, fields) {
        if (err) throw err;
        const customer = {
            MaKH: id,
            TenKH: rows[0].TenKH,
            DiaChi: rows[0].DiaChi,
            CMND: rows[0].CMND,
            SDT: rows[0].SDT,
            LoaiKH: rows[0].LoaiKH,
            isDel: rows[0].isDel
        }

        res.render('admin/customer/edit', {
            customer,
            user: req.session.user,
            layout: 'orther'
        })
    })
})

// Sửa khách hàng
router.post('/edit/:MaKH', function (req, res, next) {
    let customer = {
        MaKH: req.params.MaKH,
        TenKH: req.body.TenKH,
        CMND: req.body.CMND,
        DiaChi: req.body.DiaChi,
        SDT: req.body.SDT,
        LoaiKH: req.body.LoaiKH,
        isDel: req.body.isDel
    }

    let message = '';

    if (customer.TenKH === '') {
        message = 'Vui lòng nhập họ tên';
        return res.render('admin/customer/edit', {
            customer,
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }

    databaseConfig.query('UPDATE khachhang SET ? WHERE MaKH = ' + customer.MaKH, customer, function (err, result) {
        if (err) {
            req.flash('error', err);
            message = 'Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu';
            res.render('admin/customer/edit', {
                customer,
                message,
                user: req.session.user,
                layout: 'orther',
            })
        } else {
            req.flash('success', 'Update customer successfully added');
            res.redirect('/customer/');
        }
    })
})

// Xóa
router.get('/delete/(:MaKH)', function (req, res, next) {
    const id = req.params.MaKH;

    databaseConfig.query('UPDATE khachhang SET isDel = 1 WHERE MaKH = ' + id, function (err, result) {
        if (err) {
            req.flash('error', err);
            res.redirect('/customer/');
        } else {
            req.flash('success', 'Customer successfully deleted! id = ' + id);
            res.redirect('/customer/');
        }
    });
})

module.exports = router;
