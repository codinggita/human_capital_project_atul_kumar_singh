const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/country/:countryCode', statsController.getCountryStats);
router.get('/year/:year', statsController.getYearStats);
router.get('/month/:month', statsController.getMonthStats);

module.exports = router;
