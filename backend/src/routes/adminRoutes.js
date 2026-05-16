const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/roleCheck');

// All admin routes require authentication + admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/prices', adminController.getAllPrices);
router.post('/prices', adminController.createPrice);
router.delete('/prices/:priceId', adminController.deletePrice);
router.patch('/prices/:priceId', adminController.updatePrice);
router.get('/dashboard', adminController.getDashboard);
router.get('/stats', adminController.getStats);

module.exports = router;
