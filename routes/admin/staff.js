const express = require('express');
const router = express.Router();
const databaseConfig = require('../../models/db');
const fs = require('fs');

// Danh sách nhân viên
router.get('/', function (req, res, next) {
    const sql = 'SELECT * FROM nhanvien '
    databaseConfig.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/staff/index',
             { data: '',
             layout:'orther' });
        } else {
            res.render('admin/staff/index',
                {
                    data: rows,
                    layout: 'orther'
                });
        }

    })
})

// Get view add Product
router.get('/create', function (req, res, next) {
    res.render('admin/staff/create',
        {
            layout: 'orther'
        });
})

// add room
router.post('/create', function (req, res, next) {
    let MaNV = req.body.MaNV;
    let TenNV = req.body.TenNV;
    let DiaChi = req.body.DiaChi;
    let NgaySinh = req.body.NgaySinh;
    let SDT = req.body.SDT;
    let email = req.body.email;
    let MatKhau = req.body.MatKhau;
    const bcrypt = require("bcrypt");        
    var salt = bcrypt.genSaltSync(10);
    var pass_mahoa = bcrypt.hashSync(MatKhau, salt);
    let Role = req.body.Role;

    let errors = false;
    if (!errors) {
        var form_data = {
            MaNV: MaNV,
            TenNV: TenNV,
            DiaChi: DiaChi,
            NgaySinh: NgaySinh,
            SDT: SDT,
            email: email,
            MatKhau: pass_mahoa,
            Role: Role,
        }
        databaseConfig.query('INSERT INTO nhanvien SET ?', form_data, function (err, result) {
            if (err) {
                // console.log(form_data.image);
                req.flash('error', err)
                console.log(err)
                // render to add.ejs
                res.render('admin/staff/create', {
                    MaNV: form_data.MaNV,
                    TenNV: form_data.TenNV,
                    DiaChi: form_data.DiaChi,
                    NgaySinh: form_data.NgaySinh,
                    SDT:form_data.SDT,
                    email:form_data.email,
                    MatKhau:form_data.pass_mahoa,
                    Role:form_data.Role,
                    layout: 'orther',
                })
            } else {
                req.flash('success', 'Product successfully added');
                res.redirect('/staff/');
            }
        })
    }
})

// get view edit
router.get('/edit/(:MaNV)', function (req, res, next) {
    let id = req.params.MaNV;
    databaseConfig.query(`SELECT * FROM nhanvien where MaNV =` + id, function (err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Phong not found with MaNV = ' + id)
            res.redirect('/staff/edit/')
        }
        else{
            res.render('admin/staff/edit',{
                MaNV:rows[0].MaNV,
                TenNV:rows[0].TenNV,
                DiaChi: rows[0].DiaChi,
                NgaySinh: rows[0].NgaySinh,
                SDT: rows[0].SDT,
                email: rows[0].email,
                MatKhau: rows[0].MatKhau,
                Role: rows[0].Role,
                layout:'orther'
            })
        }
    })
})

// Sửa Phòng
router.post('/edit/:MaNV',function(req,res,next){
    let MaNV = req.body.MaNV;
    let TenNV = req.body.TenNV;
    let DiaChi = req.body.DiaChi;
    let NgaySinh = req.body.NgaySinh;
    let SDT = req.body.SDT;
    let email = req.body.email;
    let MatKhau = req.body.MatKhau;
    const bcrypt = require("bcrypt");        
    var salt = bcrypt.genSaltSync(10);
    var pass_mahoa = bcrypt.hashSync(MatKhau, salt);
    let Role = req.body.Role;
    let errors = false;
    if (!errors) {
        var form_data = {
            MaNV: MaNV,
            TenNV: TenNV,
            DiaChi: DiaChi,
            NgaySinh: NgaySinh,
            SDT: SDT,
            email: email,
            MatKhau: pass_mahoa,
            Role: Role,
        }
            databaseConfig.query('UPDATE nhanvien SET ? WHERE MaNV = ' + MaNV, form_data, function(err, result) {
                if (err) {
                    console.log(form_data);
                    req.flash('error', err)
                    // render to add.ejs
                    res.render('admin/staff/edit', {

                        MaNV: form_data.MaNV,
                        TenNV: form_data.TenNV,
                        DiaChi: form_data.DiaChi,
                        NgaySinh: form_data.NgaySinh,
                        SDT:form_data.SDT,
                        email:form_data.email,
                        MatKhau:form_data.pass_mahoa,
                        Role:form_data.Role,
                        layout: 'orther',
                    })
                } else {
                    req.flash('success', 'Update Product successfully added');
                    res.redirect('/staff/');
                }
            })
    }

})

// Xóa 

router.get('/delete/(:MaNV)', function (req, res, next) {

    let id = req.params.MaNV;

    databaseConfig.query('DELETE FROM nhanvien WHERE MaNV = ' + id, function (err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/staff/')
        } else {
            // set flash message
            req.flash('success', 'Book successfully deleted! id = ' + id)
            // redirect to books page
            res.redirect('/staff/')
        }
    })
})


module.exports=router