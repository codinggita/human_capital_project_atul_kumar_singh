const priceService = require('../services/priceService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

exports.getAllPrices = asyncHandler(async (req, res) => {
  const prices = await priceService.getAllPrices();
  res.status(200).json(new ApiResponse(200, prices, 'Prices retrieved successfully'));
});

exports.getPriceById = asyncHandler(async (req, res) => {
  const price = await priceService.getPriceById(req.params.id);
  if (!price) {
    throw new ApiError(404, 'Price record not found');
  }
  res.status(200).json(new ApiResponse(200, price, 'Price retrieved successfully'));
});

exports.createPrice = asyncHandler(async (req, res) => {
  const newPrice = await priceService.createPrice(req.body);
  res.status(201).json(new ApiResponse(201, newPrice, 'Price created successfully'));
});

exports.replacePrice = asyncHandler(async (req, res) => {
  const updatedPrice = await priceService.replacePrice(req.params.id, req.body);
  if (!updatedPrice) {
    throw new ApiError(404, 'Price record not found');
  }
  res.status(200).json(new ApiResponse(200, updatedPrice, 'Price replaced successfully'));
});

exports.updatePrice = asyncHandler(async (req, res) => {
  const updatedPrice = await priceService.updatePrice(req.params.id, req.body);
  if (!updatedPrice) {
    throw new ApiError(404, 'Price record not found');
  }
  res.status(200).json(new ApiResponse(200, updatedPrice, 'Price updated successfully'));
});

exports.deletePrice = asyncHandler(async (req, res) => {
  const deletedPrice = await priceService.deletePrice(req.params.id);
  if (!deletedPrice) {
    throw new ApiError(404, 'Price record not found');
  }
  res.status(200).json(new ApiResponse(200, {}, 'Price deleted successfully'));
});

exports.getAllCountries = asyncHandler(async (req, res) => {
  const countries = await priceService.getAllCountries();
  res.status(200).json(new ApiResponse(200, countries, 'Countries retrieved successfully'));
});

exports.createCountry = asyncHandler(async (req, res) => {
  const country = await priceService.createCountry(req.body);
  res.status(201).json(new ApiResponse(201, country, 'Country registered successfully'));
});

exports.getAllIndicators = asyncHandler(async (req, res) => {
  const indicators = await priceService.getAllIndicators();
  res.status(200).json(new ApiResponse(200, indicators, 'Indicators retrieved successfully'));
});

exports.createIndicator = asyncHandler(async (req, res) => {
  const indicator = await priceService.createIndicator(req.body);
  res.status(201).json(new ApiResponse(201, indicator, 'Indicator registered successfully'));
});

exports.getMonths = asyncHandler(async (req, res) => {
  const months = await priceService.getMonths();
  res.status(200).json(new ApiResponse(200, months.sort((a, b) => a - b), 'Months retrieved successfully'));
});

exports.getYears = asyncHandler(async (req, res) => {
  const years = await priceService.getYears();
  res.status(200).json(new ApiResponse(200, years.sort((a, b) => a - b), 'Years retrieved successfully'));
});
