const express = require('express');
const router = express.Router();
const databaseConfig = require('../../models/db');
const fs = require('fs');
const bcrypt = require("bcrypt");

//View
router.get('/', function (req, res, next) {
    res.render('admin/auth/register', {
        layout: 'orther'
    });
})

router.post('/', function (req, res, next) {
    let message = '';
    let acc = {
        MaNV: 0,
        TenNV: req.body.FullName,
        email: req.body.Email,
        MatKhau: req.body.Password,
        Role: 'NV'
    }
    const RePassword = req.body.RePassword;

    if (acc.TenNV === '') {
        message = 'Tên không được để trống';
        return res.render('admin/auth/register', {
            message,
            layout: 'orther'
        });
    }

    if (acc.email === '') {
        message = 'Email không được để trống';
        return res.render('admin/auth/register', {
            message,
            layout: 'orther'
        });
    }

    if (acc.MatKhau === '') {
        message = 'Mật khẩu không được để trống';
        return res.render('admin/auth/register', {
            message,
            layout: 'orther'
        });
    }

    if (acc.MatKhau !== RePassword) {
        message = 'Mật khẩu không khớp';
        return res.render('admin/auth/register', {
            message,
            layout: 'orther'
        });
    }

    let sql = `SELECT * FROM nhanvien WHERE email = "` + acc.email + `"`;
    databaseConfig.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
            /*res.render('admin/auth/register', {
                message,
                layout: 'orther'
            });*/
        } else {
            if (rows.length == 1) {
                message = 'Email này đã được sử dụng, vui lòng dùng email khác';
                return res.render('admin/auth/register', {
                    message,
                    layout: 'orther'
                });
            }
            sql = `SELECT MaNV FROM nhanvien ORDER BY MaNV DESC LIMIT 0, 1`;
            databaseConfig.query(sql, function (err, rows) {
                if (err) {
                    req.flash('error', err);
                } else {
                    acc.MaNV = rows[0].MaNV + 1;
                    bcrypt.hash(acc.MatKhau, 10, function(err, hash) {
                        console.log(hash);
                        acc.MatKhau = hash;
                        databaseConfig.query('INSERT INTO nhanvien SET ?', acc, function (err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                message = 'Đăng ký thành công, vui lòng đăng nhập';
                                return res.render('admin/auth/login', {
                                    message,
                                    layout: 'orther'
                                });
                            }
                        })
                    });
                }
            });
        }
    });
})

module.exports = router