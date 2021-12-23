const { response } = require('express');
var express = require('express');
var  router = express.Router();
var databaseConfig = require('../../models/db');

// get view register
router.get('/login/', function (req, res, next) {
    res.render('partials/admin/login',{
        // layout:'orther'
    });
})

router.post('/login', async function(req, res, next) {
    let u = req.body.email;
    let p = req.body.MatKhau;
    let sql = 'SELECT * FROM nhanvien WHERE email = ?';
    databaseConfig.query(sql, [u] , (err, rows) => { 
        if (rows.length<=0) { res.redirect("/auth/login"); return;}
        let user = rows[0];        
        let pass_fromdb = user.MatKhau;        
        const bcrypt = require("bcrypt");        
        var kq = bcrypt.compareSync(p, pass_fromdb);
        if (kq){ 
            console.log("OK");   
            var sess = req.session;  //initialize session variable
            sess.daDangNhap = true;
            sess.email = user.email;                     
            res.redirect("/staff");
        }   
        else {
            res.redirect("/auth/login");

        }
    });   
});

router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect("/auth/login");
});




module.exports = router