const Price = require('../models/Price');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

exports.compareCountries = asyncHandler(async (req, res) => {
  const { country1, country2 } = req.query;
  
  if (!country1 || !country2) {
    return res.status(400).json({ success: false, message: 'Please provide country1 and country2 in query parameters' });
  }

  const stats = await Price.aggregate([
    { $match: { country: { $in: [country1, country2] }, value: { $ne: null } } },
    {
      $group: {
        _id: '$country',
        avgPrice: { $avg: '$value' },
        maxPrice: { $max: '$value' },
        minPrice: { $min: '$value' },
        recordsCount: { $sum: 1 }
      }
    }
  ]);

  res.status(200).json(new ApiResponse(200, stats, `Comparison between ${country1} and ${country2}`));
});

exports.compareYears = asyncHandler(async (req, res) => {
  const { year1, year2 } = req.query;

  if (!year1 || !year2) {
    return res.status(400).json({ success: false, message: 'Please provide year1 and year2 in query parameters' });
  }

  const y1 = parseInt(year1, 10);
  const y2 = parseInt(year2, 10);

  const stats = await Price.aggregate([
    { $match: { year: { $in: [y1, y2] }, value: { $ne: null } } },
    {
      $group: {
        _id: '$year',
        avgPrice: { $avg: '$value' },
        maxPrice: { $max: '$value' },
        minPrice: { $min: '$value' },
        recordsCount: { $sum: 1 }
      }
    }
  ]);

  res.status(200).json(new ApiResponse(200, stats, `Comparison between year ${year1} and ${year2}`));
});
