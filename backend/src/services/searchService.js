const { getPricesByParams } = require('./priceService');

const searchService = {
  searchCountry: async (name, queryString) => {
    return await getPricesByParams({
      countryLabel: { $regex: name, $options: 'i' }
    }, queryString);
  },
  searchIndicator: async (text, queryString) => {
    return await getPricesByParams({
      indicatorLabel: { $regex: text, $options: 'i' }
    }, queryString);
  },
  searchValue: async (value, queryString) => {
    return await getPricesByParams({
      value: Number(value)
    }, queryString);
  },
  searchMonth: async (month, queryString) => {
    return await getPricesByParams({
      month: Number(month)
    }, queryString);
  },
  searchYear: async (year, queryString) => {
    return await getPricesByParams({
      year: Number(year)
    }, queryString);
  },
  searchFrequency: async (freq, queryString) => {
    return await getPricesByParams({
      freq: { $regex: `^${freq}$`, $options: 'i' }
    }, queryString);
  },
  searchPrices: async (q, queryString) => {
    return await getPricesByParams({
      $or: [
        { countryLabel: { $regex: q, $options: 'i' } },
        { indicatorLabel: { $regex: q, $options: 'i' } },
        { country: { $regex: q, $options: 'i' } },
        { indicator: { $regex: q, $options: 'i' } }
      ]
    }, queryString);
  }
};

module.exports = searchService;
