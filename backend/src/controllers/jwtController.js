const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

exports.getProfile = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { user: req.user }, 'JWT profile data'));
});

exports.getDashboard = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { user: req.user }, 'JWT dashboard data'));
});

exports.generateToken = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Token generated (Stub)'));
});

exports.verifyToken = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { valid: true }, 'Token verified (Stub)'));
});

exports.refreshToken = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Token refreshed (Stub)'));
});

exports.getAdmin = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { user: req.user }, 'Admin area accessed'));
});

exports.getUser = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { user: req.user }, 'User area accessed'));
});

exports.checkRoleAdmin = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { role: 'admin' }, 'Role admin confirmed'));
});

exports.checkRoleUser = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { role: 'user' }, 'Role user confirmed'));
});
