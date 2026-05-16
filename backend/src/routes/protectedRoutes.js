const express = require('express');
const router = express.Router();
const protectedController = require('../controllers/protectedController');
const { protect } = require('../middlewares/auth');

// All protected routes require authentication
router.use(protect);

router.get('/prices', protectedController.getAllPrices);
router.post('/prices', protectedController.createPrice);
router.delete('/prices/:priceId', protectedController.deletePrice);
router.patch('/prices/:priceId', protectedController.updatePrice);

module.exports = router;
