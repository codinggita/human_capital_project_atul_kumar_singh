const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Existing Routes
router.get('/country/:countryCode', statsController.getCountryStats);
router.get('/year/:year', statsController.getYearStats);
router.get('/month/:month', statsController.getMonthStats);

// New Routes
router.get('/prices', statsController.getPricesStats);
router.get('/highest-value', statsController.getHighestValueStats);
router.get('/lowest-value', statsController.getLowestValueStats);
router.get('/monthly-average', statsController.getMonthlyAverageStats);
router.get('/yearly-average', statsController.getYearlyAverageStats);
router.get('/top-countries', statsController.getTopCountriesStats);
router.get('/top-indicators', statsController.getTopIndicatorsStats);
router.get('/value-distribution', statsController.getValueDistributionStats);
router.get('/records-count', statsController.getRecordsCountStats);
router.get('/trending', statsController.getTrendingStats);

module.exports = router;
