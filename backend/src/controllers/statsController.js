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
