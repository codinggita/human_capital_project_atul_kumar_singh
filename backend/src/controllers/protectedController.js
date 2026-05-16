const priceService = require('../services/priceService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

// Protected: Get all prices (authenticated users)
exports.getAllPrices = asyncHandler(async (req, res) => {
  const prices = await priceService.getAllPrices(req.query);
  res.status(200).json(new ApiResponse(200, prices, 'Protected: Prices retrieved successfully'));
});

// Protected: Create a new price record
exports.createPrice = asyncHandler(async (req, res) => {
  const newPrice = await priceService.createPrice(req.body);
  res.status(201).json(new ApiResponse(201, newPrice, 'Protected: Price created successfully'));
});

// Protected: Delete a price record
exports.deletePrice = asyncHandler(async (req, res) => {
  const deletedPrice = await priceService.deletePrice(req.params.priceId);
  if (!deletedPrice) {
    throw new ApiError(404, 'Price record not found');
  }
  res.status(200).json(new ApiResponse(200, {}, 'Protected: Price deleted successfully'));
});

// Protected: Update a price record (partial)
exports.updatePrice = asyncHandler(async (req, res) => {
  const updatedPrice = await priceService.updatePrice(req.params.priceId, req.body);
  if (!updatedPrice) {
    throw new ApiError(404, 'Price record not found');
  }
  res.status(200).json(new ApiResponse(200, updatedPrice, 'Protected: Price updated successfully'));
});
