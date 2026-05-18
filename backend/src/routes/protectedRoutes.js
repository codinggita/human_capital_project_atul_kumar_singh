const express = require('express');
const router = express.Router();
const protectedController = require('../controllers/protectedController');
const { protect } = require('../middlewares/auth');

const { deleteLimiter } = require('../middlewares/rateLimiter');
const { createPriceValidator, updatePriceValidator } = require('../validators/priceValidator');
const { validate } = require('../middlewares/validate');

// All protected routes require authentication
router.use(protect);

router.get('/prices', protectedController.getAllPrices);
router.post('/prices', createPriceValidator, validate, protectedController.createPrice);
router.delete('/prices/:priceId', deleteLimiter, protectedController.deletePrice);
router.patch('/prices/:priceId', updatePriceValidator, validate, protectedController.updatePrice);

module.exports = router;
