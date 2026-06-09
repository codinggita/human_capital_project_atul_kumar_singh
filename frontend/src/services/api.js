const BASE_URL = 'https://human-capital-api.onrender.com/api/v1';

export const api = {
  async get(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const json = await res.json();
    return json.data;
  },
  getPrices: () => api.get('/prices?limit=100'),
  getStats: () => api.get('/stats/prices'),
  getTopCountries: () => api.get('/stats/top-countries'),
  getCountries: () => api.get('/countries'),
  getCountryStats: (code) => api.get(`/stats/country/${code}`),
  getCountryPrices: (code) => api.get(`/prices/country/${code}?limit=50`),
  search: (query) => api.get(`/search/prices?q=${query}`),
};