const Price = require('../models/Price');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

exports.getCountryStats = asyncHandler(async (req, res) => {
  const stats = await Price.aggregate([
    { $match: { country: req.params.countryCode, value: { $ne: null } } },
    {
      $group: {
        _id: '$country',
        totalRecords: { $sum: 1 },
        avgPrice: { $avg: '$value' },
        minPrice: { $min: '$value' },
        maxPrice: { $max: '$value' }
      }
    }
  ]);
  
  res.status(200).json(new ApiResponse(200, stats[0] || {}, `Stats for ${req.params.countryCode}`));
});

exports.getYearStats = asyncHandler(async (req, res) => {
  const stats = await Price.aggregate([
    { $match: { year: parseInt(req.params.year, 10), value: { $ne: null } } },
    {
      $group: {
        _id: '$year',
        totalRecords: { $sum: 1 },
        avgPrice: { $avg: '$value' },
        minPrice: { $min: '$value' },
        maxPrice: { $max: '$value' }
      }
    }
  ]);
  
  res.status(200).json(new ApiResponse(200, stats[0] || {}, `Stats for year ${req.params.year}`));
});

exports.getMonthStats = asyncHandler(async (req, res) => {
  const stats = await Price.aggregate([
    { $match: { month: parseInt(req.params.month, 10), value: { $ne: null } } },
    {
      $group: {
        _id: '$month',
        totalRecords: { $sum: 1 },
        avgPrice: { $avg: '$value' },
        minPrice: { $min: '$value' },
        maxPrice: { $max: '$value' }
      }
    }
  ]);
  
  res.status(200).json(new ApiResponse(200, stats[0] || {}, `Stats for month ${req.params.month}`));
});

exports.getPricesStats = asyncHandler(async (req, res) => {
  const stats = await Price.aggregate([
    { $match: { value: { $ne: null } } },
    {
      $group: {
        _id: null,
        totalRecords: { $sum: 1 },
        avgPrice: { $avg: '$value' },
        minPrice: { $min: '$value' },
        maxPrice: { $max: '$value' }
      }
    }
  ]);
  res.status(200).json(new ApiResponse(200, stats[0] || {}, 'Overall prices statistics'));
});

exports.getHighestValueStats = asyncHandler(async (req, res) => {
  const highest = await Price.find({ value: { $ne: null } }).sort({ value: -1 }).limit(10);
  res.status(200).json(new ApiResponse(200, highest, 'Top 10 highest prices'));
});

exports.getLowestValueStats = asyncHandler(async (req, res) => {
  const lowest = await Price.find({ value: { $ne: null } }).sort({ value: 1 }).limit(10);
  res.status(200).json(new ApiResponse(200, lowest, 'Top 10 lowest prices'));
});

exports.getMonthlyAverageStats = asyncHandler(async (req, res) => {
  const stats = await Price.aggregate([
    { $match: { value: { $ne: null } } },
    { $group: { _id: '$month', avgPrice: { $avg: '$value' } } },
    { $sort: { _id: 1 } }
  ]);
  res.status(200).json(new ApiResponse(200, stats, 'Monthly average prices'));
});

exports.getYearlyAverageStats = asyncHandler(async (req, res) => {
  const stats = await Price.aggregate([
    { $match: { value: { $ne: null } } },
    { $group: { _id: '$year', avgPrice: { $avg: '$value' } } },
    { $sort: { _id: 1 } }
  ]);
  res.status(200).json(new ApiResponse(200, stats, 'Yearly average prices'));
});

exports.getTopCountriesStats = asyncHandler(async (req, res) => {
  const stats = await Price.aggregate([
    { $group: { _id: '$country', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
  res.status(200).json(new ApiResponse(200, stats, 'Top 10 countries with most records'));
});

exports.getTopIndicatorsStats = asyncHandler(async (req, res) => {
  const stats = await Price.aggregate([
    { $group: { _id: '$indicator', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
  res.status(200).json(new ApiResponse(200, stats, 'Top indicators by record count'));
});

exports.getValueDistributionStats = asyncHandler(async (req, res) => {
  const stats = await Price.aggregate([
    { $match: { value: { $ne: null } } },
    {
      $bucket: {
        groupBy: '$value',
        boundaries: [0, 50, 100, 150, 200, 250, 300],
        default: 'Other',
        output: {
          count: { $sum: 1 }
        }
      }
    }
  ]);
  res.status(200).json(new ApiResponse(200, stats, 'Price value distribution'));
});

exports.getRecordsCountStats = asyncHandler(async (req, res) => {
  const count = await Price.countDocuments();
  res.status(200).json(new ApiResponse(200, { totalRecords: count }, 'Total records count'));
});

exports.getTrendingStats = asyncHandler(async (req, res) => {
  // Mock trending stats by finding latest records grouped by indicator
  const stats = await Price.aggregate([
    { $sort: { year: -1, month: -1 } },
    { $group: { _id: '$indicator', latestValue: { $first: '$value' }, year: { $first: '$year' }, month: { $first: '$month' } } }
  ]);
  res.status(200).json(new ApiResponse(200, stats, 'Trending indicator values'));
});
