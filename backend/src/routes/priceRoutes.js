const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

// Parameterized routes (must go before /prices/:id to avoid conflict, or use different base)
// We will use standard /prices as base but order matters
router.get('/prices/country/:countryCode', priceController.getPricesByCountry);
router.get('/prices/country/:countryCode/latest', priceController.getLatestCountryPrices);
router.get('/prices/country/:countryCode/history', priceController.getCountryHistory);
router.get('/prices/country/:countryCode/year/:year', priceController.getPricesByCountryAndYear);
router.get('/prices/country/:countryCode/month/:month', priceController.getPricesByCountryAndMonth);

router.get('/prices/year/:year', priceController.getPricesByYear);
router.get('/prices/year/:year/highest', priceController.getHighestPricesByYear);
router.get('/prices/year/:year/lowest', priceController.getLowestPricesByYear);

router.get('/prices/month/:month', priceController.getPricesByMonth);
router.get('/prices/month/:month/highest', priceController.getHighestPricesByMonth);
router.get('/prices/month/:month/lowest', priceController.getLowestPricesByMonth);

router.get('/prices/indicator/:indicator', priceController.getPricesByIndicator);
router.get('/prices/value/:value', priceController.getPricesByValue);
router.get('/prices/frequency/:freq', priceController.getPricesByFreq);
router.get('/prices/range/:startYear/:endYear', priceController.getPricesByRange);

const { createPriceValidator, updatePriceValidator } = require('../validators/priceValidator');
const { validate } = require('../middlewares/validate');
const { deleteLimiter } = require('../middlewares/rateLimiter');

// Base Prices routes
router.route('/prices')
  .get(priceController.getAllPrices)
  .post(createPriceValidator, validate, priceController.createPrice);

router.route('/prices/:id')
  .get(priceController.getPriceById)
  .put(updatePriceValidator, validate, priceController.replacePrice)
  .patch(updatePriceValidator, validate, priceController.updatePrice)
  .delete(deleteLimiter, priceController.deletePrice);

// Countries routes
router.route('/countries')
  .get(priceController.getAllCountries)
  .post(priceController.createCountry);

// Indicators routes
router.route('/indicators')
  .get(priceController.getAllIndicators)
  .post(priceController.createIndicator);

// Date specific routes
router.get('/months', priceController.getMonths);
router.get('/years', priceController.getYears);

module.exports = router;
