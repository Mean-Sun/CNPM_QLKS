var express = require('express');
var router = express.Router();
var databaseConfig = require('../../models/db');
var fs = require('fs');

// Danh sách phiếu thuê phòng
router.get('/', function(req, res, next) {
    const sql = 'SELECT * FROM phieuthuephong '
    databaseConfig.query(sql, function(err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/rentroom/index', {
                data: '',
                user: req.session.user,
                layout: 'orther'
            });
        } else {
            res.render('admin/rentroom/index', {
                data: rows,
                user: req.session.user,
                layout: 'orther'
            });
        }

    })
})

module.exports = router;
