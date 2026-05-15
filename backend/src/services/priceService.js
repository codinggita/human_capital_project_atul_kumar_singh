const Price = require('../models/Price');

const getAllPrices = async (query = {}) => {
  // We'll add pagination and advanced filtering in PR 4
  // For now, return a limited set to prevent massive payloads
  return await Price.find(query).limit(100);
};

const getPriceById = async (id) => {
  return await Price.findById(id);
};

const createPrice = async (data) => {
  return await Price.create(data);
};

const replacePrice = async (id, data) => {
  // PUT replaces the entire document, but we use findByIdAndUpdate with overwrite
  return await Price.findOneAndReplace({ _id: id }, data, { new: true, runValidators: true });
};

const updatePrice = async (id, data) => {
  // PATCH updates specific fields
  return await Price.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deletePrice = async (id) => {
  return await Price.findByIdAndDelete(id);
};

// Distinct value queries
const getAllCountries = async () => {
  return await Price.aggregate([
    {
      $group: {
        _id: '$country',
        countryLabel: { $first: '$countryLabel' }
      }
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        code: '$_id',
        name: '$countryLabel'
      }
    }
  ]);
};

const createCountry = async (data) => {
  // A 'country' is just represented by price records in our schema.
  // To "create" a country we could just create a dummy price record or require it to have valid price data.
  // We'll just create a basic price record with this country to register it.
  return await Price.create({
    country: data.country,
    countryLabel: data.countryLabel,
    indicator: data.indicator || 'UNKNOWN',
    indicatorLabel: data.indicatorLabel || 'Unknown',
    year: data.year || new Date().getFullYear(),
    month: data.month || 1
  });
};

const getAllIndicators = async () => {
  return await Price.aggregate([
    {
      $group: {
        _id: '$indicator',
        indicatorLabel: { $first: '$indicatorLabel' }
      }
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        code: '$_id',
        name: '$indicatorLabel'
      }
    }
  ]);
};

const createIndicator = async (data) => {
  // Similar to country, we just insert a base record to register it
  return await Price.create({
    country: data.country || 'UNKNOWN',
    countryLabel: data.countryLabel || 'Unknown',
    indicator: data.indicator,
    indicatorLabel: data.indicatorLabel,
    year: data.year || new Date().getFullYear(),
    month: data.month || 1
  });
};

const getMonths = async () => {
  return await Price.distinct('month');
};

const getYears = async () => {
  return await Price.distinct('year');
};

module.exports = {
  getAllPrices,
  getPriceById,
  createPrice,
  replacePrice,
  updatePrice,
  deletePrice,
  getAllCountries,
  createCountry,
  getAllIndicators,
  createIndicator,
  getMonths,
  getYears
};
