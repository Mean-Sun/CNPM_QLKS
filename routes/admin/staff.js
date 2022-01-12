const express = require('express');
const router = express.Router();
const databaseConfig = require('../../models/db');
const fs = require('fs');
const bcrypt = require("bcrypt");

// Danh sách nhân viên
router.get('/', function (req, res, next) {
    const sql = 'SELECT * FROM nhanvien '
    databaseConfig.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/staff/index', {
                data: '',
                user: req.session.user,
                layout: 'orther'
            });
        } else {
            res.render('admin/staff/index',
                {
                    data: rows,
                    user: req.session.user,
                    layout: 'orther'
                });
        }

    })
})

// Get view add staff
router.get('/create', function (req, res, next) {
    res.render('admin/staff/create',
        {
            user: req.session.user,
            layout: 'orther'
        });
})

// add staff
router.post('/create', function (req, res, next) {
    let staff = {
        MaNV: 0,
        TenNV: req.body.TenNV,
        DiaChi: req.body.DiaChi,
        NgaySinh: req.body.NgaySinh,
        SDT: req.body.SDT,
        email: req.body.email,
        MatKhau: req.body.MatKhau,
        Role: req.body.Role,
        isDel: 0
    }

    const reMatKhau = req.body.reMatKhau;

    let message = '';

    if (staff.TenNV === '') {
        message = 'Tên không được để trống';
        return res.render('admin/staff/create', {
            staff,
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }

    if (staff.email === '') {
        message = 'Email không được để trống';
        return res.render('admin/staff/create', {
            staff,
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }

    if (staff.NgaySinh === '') {
        message = 'Vui lòng chọn ngày sinh';
        return res.render('admin/staff/create', {
            staff,
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }

    if (staff.MatKhau === '') {
        message = 'Mật khẩu không được để trống';
        return res.render('admin/staff/create', {
            staff,
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }

    if (staff.MatKhau !== reMatKhau) {
        message = 'Mật khẩu không khớp';
        return res.render('admin/staff/create', {
            staff,
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }

    let sql = `SELECT * FROM nhanvien WHERE email = "` + staff.email + `"`;
    databaseConfig.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
        } else {
            if (rows.length == 1) {
                message = 'Email này đã được sử dụng, vui lòng dùng email khác';
                return res.render('admin/staff/create', {
                    message,
                    user: req.session.user,
                    layout: 'orther'
                });
            }
            sql = `SELECT MaNV FROM nhanvien ORDER BY MaNV DESC LIMIT 0, 1`;
            databaseConfig.query(sql, function (err, rows) {
                if (err) {
                    req.flash('error', err);
                } else {
                    staff.MaNV = rows[0].MaNV + 1;
                    bcrypt.hash(staff.MatKhau, 10, function (err, hash) {
                        //console.log(hash);
                        staff.MatKhau = hash;
                        databaseConfig.query('INSERT INTO nhanvien SET ?', staff, function (err, result) {
                            if (err) {
                                message = 'Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu';
                                return res.render('admin/staff/create', {
                                    staff,
                                    message,
                                    user: req.session.user,
                                    layout: 'orther'
                                });
                            } else {
                                req.flash('success', 'Product successfully added');
                                res.redirect('/staff/');
                            }
                        })
                    });
                }
            });
        }
    });
})

// get view edit
router.get('/edit/(:MaNV)', function (req, res, next) {
    const id = req.params.MaNV;
    databaseConfig.query(`SELECT * FROM nhanvien where MaNV =` + id, function (err, rows, fields) {
        if (err) throw err;
        else {
            const staff = {
                MaNV: id,
                TenNV: rows[0].TenNV,
                DiaChi: rows[0].DiaChi,
                NgaySinh: rows[0].NgaySinh,
                SDT: rows[0].SDT,
                email: rows[0].email,
                Role: rows[0].Role,
                isDel: rows[0].isDel,
            }

            res.render('admin/staff/edit', {
                staff,
                user: req.session.user,
                layout: 'orther'
            })
        }
    })
})

// edit staff
router.post('/edit/:MaNV', function (req, res, next) {

    let staff = {
        MaNV: req.params.MaNV,
        TenNV: req.body.TenNV,
        DiaChi: req.body.DiaChi,
        NgaySinh: req.body.NgaySinh,
        SDT: req.body.SDT,
        email: req.body.email,
        Role: req.body.Role,
        isDel: req.body.isDel
    }

    let message = '';

    if (staff.TenNV === '') {
        message = 'Tên không được để trống';
        return res.render('admin/staff/edit', {
            staff,
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }

    if (staff.email === '') {
        message = 'Email không được để trống';
        return res.render('admin/staff/edit', {
            staff,
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }

    if (staff.NgaySinh === '') {
        message = 'Vui lòng chọn ngày sinh';
        return res.render('admin/staff/edit', {
            staff,
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }

    databaseConfig.query('UPDATE nhanvien SET ? WHERE MaNV = ' + staff.MaNV, staff, function (err, result) {
        if (err) {
            req.flash('error', err);
            message = "Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu";
            res.render('admin/staff/edit', {
                staff,
                message,
                user: req.session.user,
                layout: 'orther',
            })
        } else {
            req.flash('success', 'Update Product successfully added');
            res.redirect('/staff/');
        }
    });
});

// Xóa
router.get('/delete/(:MaNV)', function (req, res, next) {

    let id = req.params.MaNV;

    databaseConfig.query('UPDATE nhanvien SET isDel = 1 WHERE MaNV = ' + id, function (err, result) {
        if (err) {
            req.flash('error', err);
            res.redirect('/staff/');
        } else {
            req.flash('success', 'Staff successfully deleted! id = ' + id);
            res.redirect('/staff/');
        }
    })
})

module.exports = router;
