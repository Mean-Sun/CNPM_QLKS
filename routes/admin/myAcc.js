const express = require('express');
const router = express.Router();
const databaseConfig = require('../../models/db');
const fs = require('fs');
const bcrypt = require("bcrypt");
const app = express();

router.get('/', function (req, res, next) {
    const id = req.session.user.MaNV;
    databaseConfig.query(`SELECT * FROM nhanvien where MaNV = "` + id + `" and isDel = 0`, function (err, rows, fields) {
        if (err) {
            throw err;
            const message = 'Đã có lỗi xảy ra, vui lòng kiểm tra lại';
            res.render('admin/auth/myAcc', {
                message,
                layout: 'orther'
            })
        } else {
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

            res.render('admin/auth/myAcc', {
                staff,
                user: req.session.user,
                layout: 'orther'
            })
        }
    })
});

router.post('/edit', function (req, res, next) {
    let staff = {
        MaNV: req.session.user.MaNV,
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
        return res.render('admin/auth/myAcc', {
            staff,
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }

    if (staff.email === '') {
        message = 'Email không được để trống';
        return res.render('admin/auth/myAcc', {
            staff,
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }

    if (staff.NgaySinh === '') {
        message = 'Vui lòng chọn ngày sinh';
        return res.render('admin/auth/myAcc', {
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
            res.render('admin/auth/myAcc', {
                staff,
                message,
                user: req.session.user,
                layout: 'orther',
            })
        } else {
            message = "Cập nhật thành công";
            req.flash('success', 'Update Product successfully added');
            res.render('admin/auth/myAcc', {
                staff,
                message,
                user: req.session.user,
                layout: 'orther',
            })
        }
    });
})

router.get('/changePassword', function (req, res, next) {
    res.render('admin/auth/changePassword', {
        user: req.session.user,
        layout: 'orther'
    });
})

router.post('/changePassword', function (req, res, next) {
    const id = req.session.user.MaNV;

    let MatKhau = req.body.MatKhau;
    const reMatKhau = req.body.reMatKhau;

    let message = ``;
    if (MatKhau !== reMatKhau) {
        message = 'Mật khẩu không khớp';
        return res.render('admin/auth/changePassword', {
            message,
            user: req.session.user,
            layout: 'orther'
        });
    }
    bcrypt.hash(MatKhau, 10, function (err, hash) {
        MatKhau = hash;
        const sql = 'UPDATE nhanvien SET MatKhau="' + MatKhau + `" WHERE MaNV="` + id + `"`;
        databaseConfig.query(sql, function (err, result) {
            if (err) {
                message = 'Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu';
                return res.render('admin/auth/changePassword', {
                    message,
                    user: req.session.user,
                    layout: 'orther'
                });
            } else {
                req.flash('success', 'Product successfully added');
                message = "Thành công"
                return res.render('admin/auth/changePassword', {
                    message,
                    user: req.session.user,
                    layout: 'orther'
                });
            }
        })
    });
})

router.get('/delete', function (req, res, next) {
    const id = req.session.user.MaNV;
    databaseConfig.query('UPDATE nhanvien SET isDel = 1 WHERE MaNV = ' + id, function (err, result) {
        if (err) {
            req.flash('error', err);
            res.redirect('/myAcc/');
        } else {
            req.session.user = null;
            req.flash('success', 'Staff successfully deleted! id = ' + id);
            res.redirect('/myAcc/');
        }
    })
})

module.exports = router;
