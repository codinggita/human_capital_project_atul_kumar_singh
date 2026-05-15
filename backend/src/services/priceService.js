const Price = require('../models/Price');

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search', 'contains', 'latest', 'recent', 'random', 'minValue', 'maxValue'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
    let parsedQuery = JSON.parse(queryStr);

    // Value ranges
    if (this.queryString.minValue || this.queryString.maxValue) {
      parsedQuery.value = {};
      if (this.queryString.minValue) parsedQuery.value.$gte = Number(this.queryString.minValue);
      if (this.queryString.maxValue) parsedQuery.value.$lte = Number(this.queryString.maxValue);
    }

    // Search and contains
    if (this.queryString.search) {
      parsedQuery.$or = [
        { indicatorLabel: { $regex: this.queryString.search, $options: 'i' } },
        { countryLabel: { $regex: this.queryString.search, $options: 'i' } }
      ];
    } else if (this.queryString.contains) {
      parsedQuery.$or = [
        { indicatorLabel: { $regex: this.queryString.contains, $options: 'i' } },
        { countryLabel: { $regex: this.queryString.contains, $options: 'i' } }
      ];
    }

    if (this.queryString.latest === 'true') {
      // Logic for latest can be applied via sorting, but we just set it here if needed
      // Actual latest logic often involves fetching highest year/month.
    }

    this.query = this.query.find(parsedQuery);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-year -month');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const getAllPrices = async (queryString) => {
  if (queryString.random === 'true') {
    const limit = queryString.limit * 1 || 5;
    return await Price.aggregate([{ $sample: { size: limit } }]);
  }

  const features = new APIFeatures(Price.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
  return await features.query;
};

const getPriceById = async (id) => {
  return await Price.findById(id);
};

const createPrice = async (data) => {
  return await Price.create(data);
};

const replacePrice = async (id, data) => {
  return await Price.findOneAndReplace({ _id: id }, data, { new: true, runValidators: true });
};

const updatePrice = async (id, data) => {
  return await Price.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deletePrice = async (id) => {
  return await Price.findByIdAndDelete(id);
};

// Parameterized queries
const getPricesByParams = async (params, queryString) => {
  const features = new APIFeatures(Price.find(params), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return await features.query;
};

const getHighestPrices = async (params, limit = 10) => {
  return await Price.find(params).sort('-value').limit(limit);
};

const getLowestPrices = async (params, limit = 10) => {
  // ensure value is not null for lowest
  return await Price.find({ ...params, value: { $ne: null } }).sort('value').limit(limit);
};

// Distinct value queries
const getAllCountries = async () => {
  return await Price.aggregate([
    { $group: { _id: '$country', countryLabel: { $first: '$countryLabel' } } },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, code: '$_id', name: '$countryLabel' } }
  ]);
};

const createCountry = async (data) => {
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
    { $group: { _id: '$indicator', indicatorLabel: { $first: '$indicatorLabel' } } },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, code: '$_id', name: '$indicatorLabel' } }
  ]);
};

const createIndicator = async (data) => {
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
  getPricesByParams,
  getHighestPrices,
  getLowestPrices,
  getAllCountries,
  createCountry,
  getAllIndicators,
  createIndicator,
  getMonths,
  getYears
};
