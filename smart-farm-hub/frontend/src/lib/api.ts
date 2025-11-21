import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Crop API
export const cropAPI = {
  getAll: (filters?: any) => api.get('/crops', { params: filters }),
  getById: (id: string) => api.get(`/crops/${id}`),
  compare: (data: any) => api.post('/crops/compare', data),
};

// Also export as cropsAPI for consistency
export const cropsAPI = cropAPI;

// Recommendations API
export const recommendAPI = {
  getCrop: (data: any) => api.post('/recommendations/crop', data),
  simulate: (data: any) => api.post('/recommendations/simulate', data),
};

// Schemes API
export const schemeAPI = {
  getEligible: (farmerId: string) => api.get('/schemes/eligible', { params: { farmerId } }),
  getById: (id: string) => api.get(`/schemes/${id}`),
  apply: (id: string, data: any) => api.post(`/schemes/${id}/apply`, data),
  getApplicationStatus: (appId: string) => api.get(`/schemes/applications/${appId}`),
  getMissedBenefits: (farmerId: string) => api.post('/schemes/missed-benefits', { farmerId }),
};

// Market API
export const marketAPI = {
  getPrices: (crop: string, filters?: any) => api.get('/market/prices', { params: { crop, ...filters } }),
  getTrend: (crop: string, days?: number) => api.get(`/market/trend/${crop}`, { params: { days } }),
  predictPrice: (crop: string, days: number) => api.post('/market/predict-price', { crop, days }),
  getBestMandi: (data: any) => api.post('/market/best-mandi', data),
};

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
};

// Farmer API
export const farmerAPI = {
  getProfile: (id: string) => api.get(`/farmers/${id}`),
  updateProfile: (id: string, data: any) => api.put(`/farmers/${id}`, data),
  getNearby: (lat: number, lng: number, radius: number) => 
    api.get('/farmers/nearby', { params: { latitude: lat, longitude: lng, radiusKm: radius } }),
};

// Weather API
export const weatherAPI = {
  getCurrent: (state: string, district: string) => 
    api.get('/weather', { params: { state, district } }),
  getForecast: (state: string, district: string, days?: number) =>
    api.get('/weather/forecast', { params: { state, district, days } }),
  getAlerts: (state: string, district: string) =>
    api.get('/weather/alerts', { params: { state, district } }),
};

// Pest API
export const pestAPI = {
  getMap: (lat: number, lng: number, radius: number) =>
    api.get('/pests/map', { params: { latitude: lat, longitude: lng, radiusKm: radius } }),
  getDetails: (id: string) => api.get(`/pests/${id}`),
  report: (data: any) => api.post('/pests/report', data),
};

// Chat API (24/7 Farming Assistant)
export const chatAPI = {
  sendMessage: (message: string) => api.post('/chat/message', { message }),
  getHistory: (farmerId: string) => api.get(`/chat/history/${farmerId}`),
  clearHistory: (farmerId: string) => api.delete(`/chat/history/${farmerId}`),
};

/**
 * ML PREDICTION API
 * 7 ML models for intelligent farming recommendations
 */
export const mlAPI = {
  /**
   * Predict crop profit with detailed analysis
   * Considers: crop type, land size, soil, experience, credit score
   */
  predictCropProfit: (data: {
    cropId: string;
    landSizeHectares: number;
    soilType: string;
    location: string;
    season: string;
    experienceYears?: number;
    creditScore?: number;
  }) => api.post('/ml/predict/crop-profit', data),

  /**
   * Forecast market price for next 30+ days
   * Uses: time series analysis + seasonal patterns
   */
  forecastMarketPrice: (data: {
    cropName: string;
    currentPrice: number;
    daysAhead: number;
  }) => api.post('/ml/predict/market-price', data),

  /**
   * Predict pest outbreak risk percentage
   * Considers: weather, season, crop type
   */
  predictPestRisk: (data: {
    cropId: string;
    season: string;
    temperature: number;
    humidity: number;
    rainfall: number;
  }) => api.post('/ml/predict/pest-risk', data),

  /**
   * Optimize input costs (fertilizer, pesticides)
   * Calculates: potential savings + recommendations
   */
  optimizeInputs: (data: {
    cropId: string;
    soilType: string;
    experienceYears?: number;
  }) => api.post('/ml/predict/optimize-inputs', data),

  /**
   * Generate optimal monthly irrigation schedule
   * Considers: crop water need, rainfall, soil type
   */
  optimizeIrrigation: (data: {
    cropId: string;
    soilType: string;
    expectedRainfall: number;
  }) => api.post('/ml/predict/irrigation-schedule', data),

  /**
   * Financial optimization with loan EMI analysis
   * Calculates: monthly EMI, ROI, profit after loan
   */
  optimizeFinance: (data: {
    expectedProfit: number;
    cropCost: number;
    creditScore?: number;
  }) => api.post('/ml/predict/finance-optimize', data),

  /**
   * ENSEMBLE PREDICTION
   * Complete analysis combining all 6 ML models
   * Perfect for comprehensive farm planning
   */
  ensembleAnalysis: (data: {
    cropId: string;
    landSizeHectares: number;
    soilType: string;
    location: string;
    season: string;
    experienceYears?: number;
    creditScore?: number;
    temperature?: number;
    humidity?: number;
    rainfall?: number;
  }) => api.post('/ml/predict/ensemble', data),

  /**
   * Get information about all available ML models
   * Returns: model descriptions, accuracy, endpoints
   */
  getModels: () => api.get('/ml/models'),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
