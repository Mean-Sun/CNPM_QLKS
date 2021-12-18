var express = require('express');
var router = express.Router();
var databaseConfig = require('../../models/db');
var fs = require('fs');


// Get view add Product
router.get('/', function(req, res, next) {
    res.render('admin/revenueReport/index', {
        layout: 'orther'
    });
})
module.exports = router