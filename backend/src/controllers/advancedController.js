const Price = require('../models/Price');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const os = require('os');

exports.getRandomPrices = asyncHandler(async (req, res) => {
  const count = parseInt(req.query.count, 10) || 5;
  const prices = await Price.aggregate([{ $sample: { size: count } }]);
  res.status(200).json(new ApiResponse(200, prices, 'Random prices fetched'));
});

exports.getTrendingPrices = asyncHandler(async (req, res) => {
  // Mock trending by picking records from the latest available year/month
  const prices = await Price.find({ value: { $ne: null } })
    .sort({ year: -1, month: -1, value: -1 })
    .limit(10);
  res.status(200).json(new ApiResponse(200, prices, 'Trending prices'));
});

exports.getRecentPrices = asyncHandler(async (req, res) => {
  const prices = await Price.find()
    .sort({ createdAt: -1 })
    .limit(10);
  res.status(200).json(new ApiResponse(200, prices, 'Recently added/updated prices'));
});

exports.getLatestPrices = asyncHandler(async (req, res) => {
  const prices = await Price.find()
    .sort({ year: -1, month: -1 })
    .limit(10);
  res.status(200).json(new ApiResponse(200, prices, 'Latest prices by date'));
});

exports.getHighValuePrices = asyncHandler(async (req, res) => {
  const prices = await Price.find({ value: { $ne: null } })
    .sort({ value: -1 })
    .limit(10);
  res.status(200).json(new ApiResponse(200, prices, 'High value prices'));
});

exports.getLowValuePrices = asyncHandler(async (req, res) => {
  const prices = await Price.find({ value: { $ne: null } })
    .sort({ value: 1 })
    .limit(10);
  res.status(200).json(new ApiResponse(200, prices, 'Low value prices'));
});

exports.getHealth = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date()
  }, 'Server is healthy'));
});

exports.getVersion = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  }, 'API version info'));
});

exports.getMetrics = asyncHandler(async (req, res) => {
  const memUsage = process.memoryUsage();
  res.status(200).json(new ApiResponse(200, {
    rss: `${Math.round(memUsage.rss / 1024 / 1024 * 100) / 100} MB`,
    heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024 * 100) / 100} MB`,
    heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024 * 100) / 100} MB`,
    external: `${Math.round(memUsage.external / 1024 / 1024 * 100) / 100} MB`
  }, 'Server memory metrics'));
});

exports.getServerStatus = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {
    osType: os.type(),
    osRelease: os.release(),
    totalMemory: `${Math.round(os.totalmem() / 1024 / 1024 / 1024 * 100) / 100} GB`,
    freeMemory: `${Math.round(os.freemem() / 1024 / 1024 / 1024 * 100) / 100} GB`,
    cpus: os.cpus().length
  }, 'Server system status'));
});
