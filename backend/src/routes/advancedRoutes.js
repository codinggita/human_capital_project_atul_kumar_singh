const express = require('express');
const router = express.Router();
const advancedController = require('../controllers/advancedController');

router.get('/prices/random', advancedController.getRandomPrices);
router.get('/prices/trending', advancedController.getTrendingPrices);
router.get('/prices/recent', advancedController.getRecentPrices);
router.get('/prices/latest', advancedController.getLatestPrices);
router.get('/prices/high-value', advancedController.getHighValuePrices);
router.get('/prices/low-value', advancedController.getLowValuePrices);

router.get('/health', advancedController.getHealth);
router.get('/version', advancedController.getVersion);
router.get('/metrics', advancedController.getMetrics);
router.get('/server-status', advancedController.getServerStatus);

module.exports = router;
