const searchService = require('../services/searchService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

exports.searchCountry = asyncHandler(async (req, res) => {
  const { name } = req.query;
  if (!name) throw new ApiError(400, 'Please provide a name query parameter');
  
  const results = await searchService.searchCountry(name, req.query);
  
  res.status(200).json(new ApiResponse(200, results, `Found results for country search: ${name}`));
});

exports.searchIndicator = asyncHandler(async (req, res) => {
  const { text } = req.query;
  if (!text) throw new ApiError(400, 'Please provide a text query parameter');

  const results = await searchService.searchIndicator(text, req.query);
  
  res.status(200).json(new ApiResponse(200, results, `Found results for indicator search: ${text}`));
});

exports.searchValue = asyncHandler(async (req, res) => {
  const { value } = req.query;
  if (!value) throw new ApiError(400, 'Please provide a value query parameter');

  const results = await searchService.searchValue(value, req.query);
  
  res.status(200).json(new ApiResponse(200, results, `Found results for value search: ${value}`));
});

exports.searchMonth = asyncHandler(async (req, res) => {
  const { month } = req.query;
  if (!month) throw new ApiError(400, 'Please provide a month query parameter');

  const results = await searchService.searchMonth(month, req.query);
  
  res.status(200).json(new ApiResponse(200, results, `Found results for month search: ${month}`));
});

exports.searchYear = asyncHandler(async (req, res) => {
  const { year } = req.query;
  if (!year) throw new ApiError(400, 'Please provide a year query parameter');

  const results = await searchService.searchYear(year, req.query);
  
  res.status(200).json(new ApiResponse(200, results, `Found results for year search: ${year}`));
});

exports.searchFrequency = asyncHandler(async (req, res) => {
  const { freq } = req.query;
  if (!freq) throw new ApiError(400, 'Please provide a freq query parameter');

  const results = await searchService.searchFrequency(freq, req.query);
  
  res.status(200).json(new ApiResponse(200, results, `Found results for frequency search: ${freq}`));
});

exports.searchPrices = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) throw new ApiError(400, 'Please provide a q query parameter');

  const results = await searchService.searchPrices(q, req.query);
  
  res.status(200).json(new ApiResponse(200, results, `Found results for prices search: ${q}`));
});
