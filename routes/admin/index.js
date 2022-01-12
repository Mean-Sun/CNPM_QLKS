const express = require('express');
const router = express.Router();
const databaseConfig = require('../../models/db');
const fs = require('fs');

router.get('/', function(req, res, next) {
    res.render('admin/home/home', {
        user: req.session.user,
        layout: 'orther',
    });
});

module.exports = router;