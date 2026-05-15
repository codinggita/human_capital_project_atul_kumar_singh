const priceService = require('../services/priceService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

exports.getAllPrices = asyncHandler(async (req, res) => {
  const prices = await priceService.getAllPrices(req.query);
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

// Parameterized Route Handlers
exports.getPricesByCountry = asyncHandler(async (req, res) => {
  const prices = await priceService.getPricesByParams({ country: req.params.countryCode }, req.query);
  res.status(200).json(new ApiResponse(200, prices, `Prices for ${req.params.countryCode}`));
});

exports.getPricesByCountryAndYear = asyncHandler(async (req, res) => {
  const prices = await priceService.getPricesByParams({ country: req.params.countryCode, year: req.params.year }, req.query);
  res.status(200).json(new ApiResponse(200, prices, `Prices for ${req.params.countryCode} in ${req.params.year}`));
});

exports.getPricesByCountryAndMonth = asyncHandler(async (req, res) => {
  const prices = await priceService.getPricesByParams({ country: req.params.countryCode, month: req.params.month }, req.query);
  res.status(200).json(new ApiResponse(200, prices, `Prices for ${req.params.countryCode} in month ${req.params.month}`));
});

exports.getLatestCountryPrices = asyncHandler(async (req, res) => {
  req.query.sort = '-year,-month';
  req.query.limit = req.query.limit || 1;
  const prices = await priceService.getPricesByParams({ country: req.params.countryCode }, req.query);
  res.status(200).json(new ApiResponse(200, prices, `Latest prices for ${req.params.countryCode}`));
});

exports.getCountryHistory = asyncHandler(async (req, res) => {
  req.query.sort = 'year,month';
  const prices = await priceService.getPricesByParams({ country: req.params.countryCode }, req.query);
  res.status(200).json(new ApiResponse(200, prices, `Price history for ${req.params.countryCode}`));
});

exports.getPricesByYear = asyncHandler(async (req, res) => {
  const prices = await priceService.getPricesByParams({ year: req.params.year }, req.query);
  res.status(200).json(new ApiResponse(200, prices, `Prices in ${req.params.year}`));
});

exports.getHighestPricesByYear = asyncHandler(async (req, res) => {
  const limit = req.query.limit * 1 || 10;
  const prices = await priceService.getHighestPrices({ year: req.params.year }, limit);
  res.status(200).json(new ApiResponse(200, prices, `Highest prices in ${req.params.year}`));
});

exports.getLowestPricesByYear = asyncHandler(async (req, res) => {
  const limit = req.query.limit * 1 || 10;
  const prices = await priceService.getLowestPrices({ year: req.params.year }, limit);
  res.status(200).json(new ApiResponse(200, prices, `Lowest prices in ${req.params.year}`));
});

exports.getPricesByMonth = asyncHandler(async (req, res) => {
  const prices = await priceService.getPricesByParams({ month: req.params.month }, req.query);
  res.status(200).json(new ApiResponse(200, prices, `Prices in month ${req.params.month}`));
});

exports.getHighestPricesByMonth = asyncHandler(async (req, res) => {
  const limit = req.query.limit * 1 || 10;
  const prices = await priceService.getHighestPrices({ month: req.params.month }, limit);
  res.status(200).json(new ApiResponse(200, prices, `Highest prices in month ${req.params.month}`));
});

exports.getLowestPricesByMonth = asyncHandler(async (req, res) => {
  const limit = req.query.limit * 1 || 10;
  const prices = await priceService.getLowestPrices({ month: req.params.month }, limit);
  res.status(200).json(new ApiResponse(200, prices, `Lowest prices in month ${req.params.month}`));
});

exports.getPricesByIndicator = asyncHandler(async (req, res) => {
  const prices = await priceService.getPricesByParams({ indicator: req.params.indicator }, req.query);
  res.status(200).json(new ApiResponse(200, prices, `Prices for indicator ${req.params.indicator}`));
});

exports.getPricesByValue = asyncHandler(async (req, res) => {
  const prices = await priceService.getPricesByParams({ value: req.params.value }, req.query);
  res.status(200).json(new ApiResponse(200, prices, `Prices with value ${req.params.value}`));
});

exports.getPricesByFreq = asyncHandler(async (req, res) => {
  const prices = await priceService.getPricesByParams({ freq: req.params.freq }, req.query);
  res.status(200).json(new ApiResponse(200, prices, `Prices with frequency ${req.params.freq}`));
});

exports.getPricesByRange = asyncHandler(async (req, res) => {
  const params = { year: { $gte: req.params.startYear, $lte: req.params.endYear } };
  const prices = await priceService.getPricesByParams(params, req.query);
  res.status(200).json(new ApiResponse(200, prices, `Prices between ${req.params.startYear} and ${req.params.endYear}`));
});

// Original specific ones
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
