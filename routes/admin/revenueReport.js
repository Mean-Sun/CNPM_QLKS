
const express = require('express');
const router = express.Router();

const revenueReportController = require('../controllers/revenueReportController');

/* GET home page. */
router.get('/', revenueReportController.list);

module.exports = router;