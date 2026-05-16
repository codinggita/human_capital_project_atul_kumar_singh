const express = require('express');
const router = express.Router();
const jwtController = require('../controllers/jwtController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/roleCheck');

router.post('/generate-token', jwtController.generateToken);
router.post('/verify-token', jwtController.verifyToken);
router.post('/refresh-token', jwtController.refreshToken);

router.use(protect); // Require user to be logged in for routes below

router.get('/profile', jwtController.getProfile);
router.get('/dashboard', jwtController.getDashboard);
router.get('/user', jwtController.getUser);
router.get('/check-role/user', authorize('user', 'admin'), jwtController.checkRoleUser);

router.get('/admin', authorize('admin'), jwtController.getAdmin);
router.get('/check-role/admin', authorize('admin'), jwtController.checkRoleAdmin);

module.exports = router;
