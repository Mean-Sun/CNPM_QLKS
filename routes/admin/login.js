const express = require('express');
const router = express.Router();
const databaseConfig = require('../../models/db');
const fs = require('fs');
const bcrypt = require("bcrypt");
const app = express();

router.get('/', function (req, res, next) {
    res.render('admin/auth/login', {
        layout: 'orther'
    });
})

router.post('/', function (req, res, next) {
    let message = '';
    let acc = {
        email: req.body.Email,
        MatKhau: req.body.Password
    }

    if (acc.email === '') {
        message = 'Vui lòng nhập Email';
        return res.render('admin/auth/login', {
            message,
            layout: 'orther'
        });
    }

    if (acc.MatKhau === '') {
        message = 'Vui lòng nhập Mật khẩu';
        return res.render('admin/auth/login', {
            message,
            layout: 'orther'
        });
    }

    let sql = `SELECT * FROM nhanvien WHERE email = "` + acc.email + `"`;
    databaseConfig.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
        } else {
            if (rows.length < 1) {
                message = 'Email không chính xác';
                return res.render('admin/auth/login', {
                    message,
                    layout: 'orther'
                });
            }

            const password = rows[0].MatKhau;

            bcrypt.compare(acc.MatKhau, password, function (err, result) {
                    if (result) {
                        User = {
                            MaNV: rows[0].MaNV,
                            TenNV: rows[0].TenNV,
                            email: rows[0].email
                        }

                        global.user = User;
                        //message = 'Đăng nhập thành công';
                        return res.redirect('/');
                        /*return res.render('admin/auth/login', {
                            message,
                            layout: 'orther'
                        });*/
                    } else {
                        message = 'Mật khẩu không đúng';
                        return res.render('admin/auth/login', {
                            message,
                            layout: 'orther'
                        });
                    }
                }
            )
            ;
        }
    });

})
module.exports = router