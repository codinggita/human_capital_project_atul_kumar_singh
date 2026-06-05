const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');

const errorHandler = require('./middlewares/errorHandler');
const { generalLimiter } = require('./middlewares/rateLimiter');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN === '*'
    ? '*'
    : process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
      : '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: process.env.CORS_ORIGIN !== '*'
};

// Middleware
app.use(generalLimiter);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Trust proxy (required for Render / reverse proxies for rate limiting)
app.set('trust proxy', 1);

// Routes
const priceRoutes = require('./routes/priceRoutes');
const statsRoutes = require('./routes/statsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');
const jwtRoutes = require('./routes/jwtRoutes');
const compareRoutes = require('./routes/compareRoutes');
const advancedRoutes = require('./routes/advancedRoutes');
const adminRoutes = require('./routes/adminRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const headOptionsRoutes = require('./routes/headOptionsRoutes');

// Health Check Route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Human Capital API',
    version: '1.0.0',
    docs: '/api/v1/health',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/v1', priceRoutes);
app.use('/api/v1/stats', statsRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jwt', jwtRoutes);
app.use('/api/v1/compare', compareRoutes);
app.use('/api/v1', advancedRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/protected', protectedRoutes);
app.use('/api/v1', headOptionsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    error: { statusCode: 404 }
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
