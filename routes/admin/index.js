var express = require('express');
var router = express.Router();
var databaseConfig = require('../../models/db');

var fs = require('fs');

router.get('/', function(req, res, next) {
    res.render('admin/home/home', {
        layout: 'orther',
    });
});

module.exports = router