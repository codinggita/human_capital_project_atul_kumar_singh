const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { authLimiter } = require('../middlewares/rateLimiter');
const { validate } = require('../middlewares/validate');
const { registerValidator, loginValidator, changePasswordValidator } = require('../validators/authValidator');

router.post('/register', authLimiter, registerValidator, validate, authController.register);
router.post('/login', authLimiter, loginValidator, validate, authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/refresh-token', authController.refreshToken);
router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);

router.use(protect); // All routes below are protected

router.get('/me', authController.getMe);
router.post('/change-password', changePasswordValidator, validate, authController.changePassword);

module.exports = router;
