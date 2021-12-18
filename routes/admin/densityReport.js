
const express = require('express');
const router = express.Router();

const densityReportController = require('../controllers/densityReportController');

/* GET home page. */
router.get('/', densityReportController.list);

module.exports = router;