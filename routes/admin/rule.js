var express = require('express');
var     router = express.Router();
var databaseConfig = require('../../models/db');
var fs = require('fs');

// Danh sách nhân viên
router.get('/', function (req, res, next) {
    const sql = 'SELECT * FROM quydinh '
    databaseConfig.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/rule/index',
             { data: '',
             layout:'orther' });
        } else {
            res.render('admin/rule/index',
                {
                    data: rows,
                    layout: 'orther'
                });
        }

    })
})

router.get('/create', function (req, res, next) {
    res.render('admin/rule/create',
        {
            layout: 'orther'
        });
})

router.post('/create', function (req, res, next) {
    let id = req.body.id;
    let Key = req.body.Key;
    let Value = req.body.Value;

    let errors = false;
    if (!errors) {
        var form_data = {
            id: id,
            Key: Key,
            Value: Value,
    
        }
        databaseConfig.query('INSERT INTO quydinh SET ?', form_data, function (err, result) {
            if (err) {       
                req.flash('error', err)
                res.render('admin/rule/create', {
                    id: form_data.id,
                    Key: form_data.Key,
                    Value: form_data.Value,
                    layout: 'orther',
                })
            } else {
                req.flash('success','add rule successfully added');
                res.redirect('/rule-info/');
            }
        })
    }
})

router.get('/edit/(:id)/', function (req, res, next) {
    let id = req.params.id;
    databaseConfig.query(`SELECT * FROM quydinh where id =` + id, function (err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Phong not found with id = ' + id)
            res.redirect('/rule-info')
        }
        else{
            res.render('admin/rule/edit',{
                id:rows[0].id,
                Key:rows[0].Key,
                Value:rows[0].Value,
                layout:'orther'
            })
        }
    })
})

// Sửa Phòng
router.post('/edit/:id', function(req, res, next) {
   let id = req.params.id
   let Key = req.body.Key
   let Value = req.body.Value
   let errors =false
    if (!errors) {
        var form_data = {
          id: id,
          Key:Key,
          Value:Value,
        }
        databaseConfig.query('UPDATE quydinh SET ? WHERE id = ' + id, form_data, function(err, result) {
            if (err) {
                console.log(form_data);
                req.flash('error', err)
                    // render to add.ejs
                res.render('admin/rule/edit', {
                    id:form_data.id,
                    Key:form_data.Key,
                    Value:form_data.Value,
                    layout: 'orther',
                })
            } else {
                req.flash('success', 'Update Product successfully added');
                res.redirect('/rule-info/');
            }
        })
    }

})

// //Xoa
// router.get('/delete/:id',function(req,res,next){
//     let id = req.params.id;

//     databaseConfig.query('DELETE FROM quydinh WHERE id = ' + id, function(err, result) {
//         //if(err) throw err
//         if (err) {
//             // set flash message
//             req.flash('error', err);
//             // redirect to books page
//             res.redirect('/rule-info/');
//         } else {
//             // set flash message
//             req.flash('success', 'Rule successfully deleted! ID = ' + id);
//             // redirect to books page
//             res.redirect('/rule-info/');
//         }
//     })
// })
module.exports=router