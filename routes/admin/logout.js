const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    req.session.user = null;
    return res.render('admin/auth/login', {
        layout: 'orther'
    });
});

module.exports = router;
