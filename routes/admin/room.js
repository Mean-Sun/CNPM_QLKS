var express = require('express');
var     router = express.Router();
var databaseConfig = require('../../models/db');
var fs = require('fs');

// Danh sách phòng
router.get('/', function (req, res, next) {
    const sql = 'SELECT * FROM phong '
    databaseConfig.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/room/index',
             { data: '',
             layout:'orther' });
        } else {
            res.render('admin/room/index',
                {
                    data: rows,
                    layout: 'orther'
                });
        }

    })
})

// Get view add Product
router.get('/create', function (req, res, next) {
    res.render('admin/room/create',
        {
            layout: 'orther'
        });
})

// add room
router.post('/create', function (req, res, next) {
    let MaPhong = req.body.MaPhong;
    let name = req.body.name;
    let type = req.body.type;
    let status = req.body.status;
    let note = req.body.note;
    let errors = false;
    if (!errors) {
        var form_data = {
            MaPhong: MaPhong,
            name: name,
            type: type,
            status: status,
            note: note,
        }
        databaseConfig.query('INSERT INTO phong SET ?', form_data, function (err, result) {
            if (err) {
                // console.log(form_data.image);
                req.flash('error', err)
                console.log(err)
                // render to add.ejs
                res.render('admin/room/create', {
                    MaPhong: form_data.MaPhong,
                    name: form_data.name,
                    type: form_data.type,
                    status: form_data.status,
                    note:form_data.note,
                    layout: 'orther',
                })
            } else {
                req.flash('success', 'Product successfully added');
                res.redirect('/room/');
            }
        })
    }
})

// get view edit
router.get('/edit/(:MaPhong)', function (req, res, next) {
    let id = req.params.MaPhong;
    databaseConfig.query(`SELECT * FROM phong where MaPhong =` + id, function (err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Phong not found with MaPhong = ' + id)
            res.redirect('/room')
        }
        else{
            res.render('admin/room/edit',{
                MaPhong:rows[0].MaPhong,
                name: rows[0].name,
                type: rows[0].type,
                status: rows[0].status,
                note: rows[0].note,
                layout:'orther'
            })
        }
    })
})

// Sửa Phòng
router.post('/edit/:MaPhong',function(req,res,next){
    let MaPhong = req.body.MaPhong;
    let name = req.body.name;
    let type = req.body.type;
    let status = req.body.status;
    let note = req.body.note;
    let errors = false;
    if (!errors) {
        var form_data = {
            MaPhong: MaPhong,
            name: name,
            type: type,
            status: status,
            note: note,
        }
            databaseConfig.query('UPDATE phong SET ? WHERE MaPhong = ' + MaPhong, form_data, function(err, result) {
                if (err) {
                    console.log(form_data);
                    req.flash('error', err)
                    // render to add.ejs
                    res.render('admin/room/edit', {
                        MaPhong: form_data.MaPhong,
                        name: form_data.name,
                        type: form_data.type,
                        status: form_data.status,
                        note:form_data.note,
                        layout: 'orther',
                    })
                } else {
                    req.flash('success', 'Update Product successfully added');
                    res.redirect('/room/');
                }
            })
    }

})

// Xóa 

router.get('/delete/(:MaPhong)', function (req, res, next) {

    let id = req.params.MaPhong;

    databaseConfig.query('DELETE FROM phong WHERE MaPhong = ' + id, function (err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/room/')
        } else {
            // set flash message
            req.flash('success', 'Book successfully deleted! ID = ' + id)
            // redirect to books page
            res.redirect('/room/')
        }
    })
})

module.exports = router