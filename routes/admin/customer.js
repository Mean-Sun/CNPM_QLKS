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
            res.render('admin/customer/index',
                { data: '',
                    layout:'orther' });
        } else {
            res.render('admin/customer/index',
                {
                    data: rows,
                    layout: 'orther'
                });
        }

    })
})

// Get view add customer
router.get('/create', function (req, res, next) {
    res.render('admin/customer/create',
        {
            layout: 'orther'
        });
})

// add customer
router.post('/create', function (req, res, next) {
    let MaKH = req.body.MaKH;
    let TenKH = req.body.TenKH;
    let CMND = req.body.CMND;
    let SDT = req.body.SDT;
    let DiaChi = req.body.DiaChi;
    let LoaiKH = req.body.LoaiKH;

    let errors = false;
    if (!errors) {
        var form_data = {
            MaKH: MaKH,
            TenKH: TenKH,        
            SDT: SDT,
            DiaChi: DiaChi,
            CMND: CMND,
            LoaiKH: LoaiKH,
        }
        databaseConfig.query('INSERT INTO khachhang SET ?', form_data, function (err, result) {
            if (err) {              
                req.flash('error', err)
                console.log(err)
                res.render('admin/customer/create', {
                    MaKH: form_data.MaKH,
                    TenKH: form_data.TenKH,
                    DiaChi: form_data.DiaChi,
                    SDT:form_data.SDT,
                    CMND:form_data.CMND,
                    LoaiKH: form_data.LoaiKH,
                    layout: 'orther',
                })
            } else {
                req.flash('success', 'Customer successfully added');
                res.redirect('/customer/');
            }
        })
    }
})

// get view edit
router.get('/edit/(:MaKH)', function (req, res, next) {
    const id = req.params.MaKH;
    databaseConfig.query(`SELECT * FROM khachhang where MaKH =` + id, function (err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'KH not found with MaKH = ' + id)
            res.redirect('/customer/edit/')
        }
        else{
            res.render('admin/customer/edit',{
                MaKH:rows[0].MaKH,
                TenKH:rows[0].TenKH,
                DiaChi: rows[0].DiaChi,
                CMND: rows[0].CMND,
                SDT: rows[0].SDT,
                LoaiKH: rows[0].LoaiKH,
                layout:'orther'
            })
        }
    })
})

// Sửa khách hàng
router.post('/edit/:MaKH',function(req,res,next){
    let MaKH = req.body.MaKH;
    let TenKH = req.body.TenKH;
    let DiaChi = req.body.DiaChi;
    let CMND = req.body.CMND;
    let SDT = req.body.SDT;
    let LoaiKH = req.body.LoaiKH;
    let errors = false;
    if (!errors) {
        var form_data = {
            MaKH: MaKH,
            TenKH: TenKH,
            DiaChi: DiaChi,
            CMND: CMND,
            SDT: SDT,
            LoaiKH: LoaiKH,
        }
        databaseConfig.query('UPDATE khachhang SET ? WHERE MaKH = ' + MaKH, form_data, function(err, result) {
            if (err) {
                req.flash('error', err)
                // render to add.ejs
                res.render('admin/customer/edit', {
                    MaKH: form_data.MaKH,
                    TenKH: form_data.TenKH,
                    DiaChi: form_data.DiaChi,
                    CMND: form_data.CMND,
                    SDT:form_data.SDT,
                    LoaiKH:form_data.LoaiKH,
                    layout: 'orther',
                })
            } else {
                req.flash('success', 'Update customer successfully added');
                res.redirect('/customer/');
            }
        })
    }

})

// Xóa
router.get('/delete/(:MaKH)', function (req, res, next) {

    const id = req.params.MaKH;

    databaseConfig.query('DELETE FROM khachhang WHERE MaKH = ' + id, function (err, result) {
        if (err) {
            req.flash('error', err);
            res.redirect('/customer/');
        } else {
            req.flash('success', 'Customer successfully deleted! id = ' + id);
            res.redirect('/customer/');
        }
    });
})


module.exports=router
