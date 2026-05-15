const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Country code is required'],
      index: true,
      trim: true
    },
    countryLabel: {
      type: String,
      required: [true, 'Country label is required'],
      trim: true
    },
    indicator: {
      type: String,
      required: [true, 'Indicator code is required'],
      index: true,
      trim: true
    },
    indicatorLabel: {
      type: String,
      required: [true, 'Indicator label is required'],
      trim: true
    },
    value: {
      type: Number,
      default: null
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      index: true
    },
    month: {
      type: Number,
      required: [true, 'Month is required'],
      index: true
    },
    freq: {
      type: String,
      default: 'M'
    }
  },
  {
    timestamps: true
  }
);

// Compound index for frequent queries
priceSchema.index({ country: 1, year: 1, month: 1 });
// Index for sorting by value
priceSchema.index({ value: 1 });

const Price = mongoose.model('Price', priceSchema);

module.exports = Price;
