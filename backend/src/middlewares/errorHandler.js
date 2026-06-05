const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    let statusCode = 500;
    let message = error.message || 'Something went wrong';

    // Mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      statusCode = 400;
      message = 'Validation Error';
    }
    // Mongoose cast errors (bad ObjectId)
    if (error instanceof mongoose.Error.CastError) {
      statusCode = 400;
      message = `Invalid ${error.path}: ${error.value}`;
    }
    // Mongoose duplicate key errors
    if (error.code === 11000) {
      statusCode = 409;
      const field = Object.keys(error.keyValue);
      message = `Duplicate field value: ${field}. Please use another value`;
    }

    if (error.statusCode) {
      statusCode = error.statusCode;
    }

    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    success: false,
    message: error.message,
    error: {
      statusCode: error.statusCode,
      ...(error.errors && error.errors.length > 0 ? { details: error.errors } : {})
    }
  };

  if (process.env.NODE_ENV === 'development') {
    response.error.stack = error.stack;
  }

  res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
