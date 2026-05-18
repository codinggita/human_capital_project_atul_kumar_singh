const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

const { searchLimiter } = require('../middlewares/rateLimiter');

router.use(searchLimiter);

router.get('/country', searchController.searchCountry);
router.get('/indicator', searchController.searchIndicator);
router.get('/value', searchController.searchValue);
router.get('/month', searchController.searchMonth);
router.get('/year', searchController.searchYear);
router.get('/frequency', searchController.searchFrequency);
router.get('/prices', searchController.searchPrices);

module.exports = router;
