const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const sendTokenResponse = (user, statusCode, res, message) => {
  const token = authService.generateToken(user._id);

  res.status(statusCode).json(new ApiResponse(statusCode, { token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } }, message));
};

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await authService.register({ name, email, password, role });
  sendTokenResponse(user, 201, res, 'User registered successfully');
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new ApiError(400, 'Please provide an email and password');
  }

  const user = await authService.login(email, password);
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  sendTokenResponse(user, 200, res, 'Logged in successfully');
});

exports.getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user.id);
  res.status(200).json(new ApiResponse(200, user, 'User profile retrieved'));
});

// Stubs for remaining auth routes
exports.logout = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Logged out successfully'));
});
exports.forgotPassword = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Password reset email sent (Stub)'));
});
exports.resetPassword = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Password reset successfully (Stub)'));
});
exports.refreshToken = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Token refreshed (Stub)'));
});
exports.sendOtp = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'OTP sent (Stub)'));
});
exports.verifyOtp = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'OTP verified (Stub)'));
});
exports.changePassword = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Password changed (Stub)'));
});
