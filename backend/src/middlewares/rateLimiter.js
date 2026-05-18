const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: 'Too many requests',
      error: { statusCode: options.statusCode }
    });
  }
});

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: 'Too many requests',
      error: { statusCode: options.statusCode }
    });
  }
});

const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: 'Too many requests',
      error: { statusCode: options.statusCode }
    });
  }
});

const adminLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: 'Too many requests',
      error: { statusCode: options.statusCode }
    });
  }
});

const deleteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: 'Too many requests',
      error: { statusCode: options.statusCode }
    });
  }
});

module.exports = {
  generalLimiter,
  authLimiter,
  searchLimiter,
  adminLimiter,
  deleteLimiter
};
