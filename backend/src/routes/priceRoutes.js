const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

// Prices routes
router.route('/prices')
  .get(priceController.getAllPrices)
  .post(priceController.createPrice);

router.route('/prices/:id')
  .get(priceController.getPriceById)
  .put(priceController.replacePrice)
  .patch(priceController.updatePrice)
  .delete(priceController.deletePrice);

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
