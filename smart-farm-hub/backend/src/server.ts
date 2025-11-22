import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {
  predictCropProfit,
  forecastMarketPrice,
  predictPestRisk,
  optimizeInputs,
  optimizeIrrigationSchedule,
  optimizeFinance,
  ensemblePrediction,
} from './services/mlService';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/smartfarm';
let mongoConnected = false;

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    mongoConnected = true;
  })
  .catch((error) => {
    console.warn('⚠️  MongoDB connection failed, using mock data:', error.message);
    mongoConnected = false;
    // Don't exit, continue with mock data
  });

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    mongodb: mongoConnected ? 'connected' : 'using mock data',
  });
});

// Mock data for crops
const mockCrops = [
  {
    id: '1',
    name: 'Sugarcane',
    nameInKannada: 'ಸೆಳೆ',
    estimatedYield: 100,
    estimatedProfit: 500000,
    costOfCultivation: 375000,
    marketPrice: 2500,
    waterRequirement: 2000,
    risk: 'Medium',
    soilTypes: ['clayey', 'loamy'],
    seasonality: ['kharif', 'rabi'],
    sowingDate: 'June-July',
    harvestingDate: 'Nov-Dec',
  },
  {
    id: '2',
    name: 'Cotton',
    nameInKannada: 'ಹೆಂಪೆ',
    estimatedYield: 15,
    estimatedProfit: 300000,
    costOfCultivation: 250000,
    marketPrice: 5500,
    waterRequirement: 1200,
    risk: 'High',
    soilTypes: ['clayey', 'sandy'],
    seasonality: ['kharif'],
    sowingDate: 'May-June',
    harvestingDate: 'Oct-Nov',
  },
  {
    id: '3',
    name: 'Groundnut',
    nameInKannada: 'ಕಡಲೆ ಸೋಲು',
    estimatedYield: 30,
    estimatedProfit: 180000,
    costOfCultivation: 140000,
    marketPrice: 4500,
    waterRequirement: 600,
    risk: 'Low',
    soilTypes: ['sandy', 'loamy'],
    seasonality: ['kharif', 'rabi'],
    sowingDate: 'June-July',
    harvestingDate: 'Sept-Oct',
  },
  {
    id: '4',
    name: 'Maize',
    nameInKannada: 'ಜೋಳ',
    estimatedYield: 50,
    estimatedProfit: 250000,
    costOfCultivation: 180000,
    marketPrice: 1800,
    waterRequirement: 500,
    risk: 'Medium',
    soilTypes: ['loamy', 'sandy'],
    seasonality: ['kharif', 'rabi'],
    sowingDate: 'May-June',
    harvestingDate: 'Aug-Sept',
  },
];

// Crop endpoints
app.get('/api/crops', (req: Request, res: Response) => {
  res.json({
    success: true,
    crops: mockCrops,
  });
});

app.get('/api/crops/:id', (req: Request, res: Response) => {
  const crop = mockCrops.find(c => c.id === req.params.id);
  if (!crop) {
    return res.status(404).json({ success: false, error: 'Crop not found' });
  }
  res.json({ success: true, crop });
});

// Compare crops endpoint
app.post('/api/crops/compare', (req: Request, res: Response) => {
  const { crops: cropIds, landSizeHectares } = req.body;
  
  const selectedCrops = mockCrops.filter(c => cropIds.includes(c.id));
  
  const comparison = selectedCrops.map((crop: any) => ({
    crop: crop.name,
    profit: crop.estimatedProfit * (landSizeHectares || 1),
    cost: crop.costOfCultivation * (landSizeHectares || 1),
    yield: crop.estimatedYield * (landSizeHectares || 1),
    waterNeeded: crop.waterRequirement * (landSizeHectares || 1),
    suitability: crop.risk === 'Low' ? 'Very High' : crop.risk === 'Medium' ? 'High' : 'Medium',
    risks: [`${crop.risk} pest risk`],
  }));

  res.json({
    success: true,
    comparison,
  });
});

// Recommendation endpoint
app.post('/api/recommendations/crop', (req: Request, res: Response) => {
  const { farmerId, season } = req.body;
  
  const topRecommendation = {
    rank: 1,
    crop: 'Sugarcane',
    expectedProfit: 500000,
    confidence: 92,
    reasoning: [
      'Excellent for current season',
      'High market demand',
      'Suitable soil type',
    ],
    riskFactors: ['Moderate pest risk - 45% probability'],
  };

  res.json({
    success: true,
    topRecommendation,
    alternativeRecommendations: [
      { rank: 2, crop: 'Maize', expectedProfit: 250000, confidence: 78 },
      { rank: 3, crop: 'Groundnut', expectedProfit: 180000, confidence: 65 },
    ],
  });
});

// Simulation endpoint
app.post('/api/recommendations/simulate', (req: Request, res: Response) => {
  const { crop1, crop2, crop3, landSizeHectares } = req.body;
  
  const simulation = {
    crop1: {
      name: 'Sugarcane',
      expectedProfit: 500000 * (landSizeHectares || 1),
      costOfCultivation: 375000 * (landSizeHectares || 1),
      yield: 100 * (landSizeHectares || 1),
      bestSowingDate: '2024-06-15',
      bestHarvestingDate: '2024-12-15',
      waterRequirement: 2000 * (landSizeHectares || 1),
      riskScore: 35,
    },
    crop2: {
      name: 'Cotton',
      expectedProfit: 300000 * (landSizeHectares || 1),
      costOfCultivation: 250000 * (landSizeHectares || 1),
      yield: 15 * (landSizeHectares || 1),
      bestSowingDate: '2024-05-01',
      bestHarvestingDate: '2024-11-30',
      waterRequirement: 1200 * (landSizeHectares || 1),
      riskScore: 48,
    },
    crop3: {
      name: 'Groundnut',
      expectedProfit: 180000 * (landSizeHectares || 1),
      costOfCultivation: 140000 * (landSizeHectares || 1),
      yield: 30 * (landSizeHectares || 1),
      bestSowingDate: '2024-06-01',
      bestHarvestingDate: '2024-09-30',
      waterRequirement: 600 * (landSizeHectares || 1),
      riskScore: 25,
    },
  };

  res.json({
    success: true,
    simulation,
    profitDifference: {
      crop1VsCrop2: 200000 * (landSizeHectares || 1),
      crop1VsCrop3: 320000 * (landSizeHectares || 1),
    },
  });
});

// Scheme endpoints - Mock data
const mockSchemes = [
  {
    id: '1',
    name: 'PM-KISAN Yojana',
    nameInKannada: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಕೃಷಿ ಸಿಂಚನ ಯೋಜನೆ',
    description: 'Direct income support to farmers',
    subsidy: 6000,
    applicationDeadline: new Date('2024-12-31'),
    requiredDocuments: ['Aadhar', 'Bank Account', 'Land Certificate'],
  },
  {
    id: '2',
    name: 'Crop Insurance Scheme',
    nameInKannada: 'ಪಂತ ವಿಮೆ ಯೋಜನೆ',
    description: 'Insurance coverage for crops',
    subsidy: 25000,
    applicationDeadline: new Date('2024-06-30'),
    requiredDocuments: ['Aadhar', 'Land Certificate', 'Bank Details'],
  },
];

app.get('/api/schemes/eligible', (req: Request, res: Response) => {
  res.json({
    success: true,
    schemes: mockSchemes,
  });
});

app.get('/api/schemes/:id', (req: Request, res: Response) => {
  const scheme = mockSchemes.find(s => s.id === req.params.id);
  if (!scheme) {
    return res.status(404).json({ success: false, error: 'Scheme not found' });
  }
  res.json({ success: true, scheme });
});

app.post('/api/schemes/:id/apply', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Application submitted',
    applicationId: 'APP_' + Date.now(),
    status: 'submitted',
  });
});

app.post('/api/schemes/missed-benefits', (req: Request, res: Response) => {
  res.json({
    success: true,
    missedBenefits: {
      totalMissedSubsidy: 45000,
      year: 2024,
      schemes: [
        { scheme: 'PM-KISAN', missedAmount: 6000, reason: 'Not applied' },
        { scheme: 'Crop Insurance', missedAmount: 25000, reason: 'Deadline passed' },
        { scheme: 'Soil Health Card', missedAmount: 14000, reason: 'Unaware' },
      ],
    },
  });
});

// Market endpoints
app.get('/api/market/prices', (req: Request, res: Response) => {
  const { crop } = req.query;
  
  res.json({
    success: true,
    prices: [
      {
        mandi: 'Belgaum Mandi',
        state: 'Karnataka',
        pricePerKg: 2500,
        date: new Date(),
        trend: 'up',
        priceChange24h: 2.5,
        distance: 15,
        transportCost: 500,
        profitIfSoldToday: 195000,
      },
      {
        mandi: 'Bijapur Mandi',
        state: 'Karnataka',
        pricePerKg: 2450,
        date: new Date(),
        trend: 'down',
        priceChange24h: -1.5,
        distance: 45,
        transportCost: 800,
        profitIfSoldToday: 189600,
      },
    ],
  });
});

app.get('/api/market/trend/:crop', (req: Request, res: Response) => {
  const { crop } = req.params;
  
  res.json({
    success: true,
    trendData: [
      { date: '2024-01-01', price: 2300, mandi: 'Belgaum' },
      { date: '2024-01-02', price: 2350, mandi: 'Belgaum' },
      { date: '2024-01-03', price: 2500, mandi: 'Belgaum' },
      { date: '2024-01-04', price: 2480, mandi: 'Belgaum' },
    ],
    avgPrice: 2400,
    minPrice: 2200,
    maxPrice: 2600,
    msp: 2500,
    trend: 'upward',
    recommendation: 'Wait for ₹2600 in next 3 days',
  });
});

app.post('/api/market/predict-price', (req: Request, res: Response) => {
  const { crop, days } = req.body;
  
  res.json({
    success: true,
    prediction: {
      crop,
      currentPrice: 2500,
      predictedPrice7Days: 2650,
      predictedPrice14Days: 2700,
      confidence: 85,
      recommendation: 'Sell in 10-12 days for best price',
      bestSellingWindow: '2024-01-28 to 2024-02-01',
    },
  });
});

// Weather endpoint
app.get('/api/weather', (req: Request, res: Response) => {
  res.json({
    success: true,
    weather: {
      location: 'Belgaum, Karnataka',
      temperature: 28,
      humidity: 65,
      rainfall: 0,
      windSpeed: 12,
      condition: 'Partly cloudy',
      fetchedAt: new Date(),
    },
  });
});

app.get('/api/weather/forecast', (req: Request, res: Response) => {
  res.json({
    success: true,
    forecast: [
      { date: '2024-01-21', high: 32, low: 18, rainfall: 0, condition: 'Sunny', riskLevel: 'low' },
      { date: '2024-01-22', high: 28, low: 16, rainfall: 15, condition: 'Rainy', riskLevel: 'medium' },
      { date: '2024-01-23', high: 30, low: 17, rainfall: 5, condition: 'Cloudy', riskLevel: 'low' },
    ],
  });
});

// Pest endpoints
app.get('/api/pests/map', (req: Request, res: Response) => {
  res.json({
    success: true,
    pests: [
      {
        id: '1',
        name: 'Armyworm',
        location: { district: 'Belgaum' },
        affectedCrops: ['Sugarcane', 'Maize'],
        severity: 'high',
        reportedCases: 12,
        riskProbability: 78,
        preventiveMeasures: ['Spray neem oil', 'Remove infected leaves'],
      },
    ],
  });
});

// Inputs optimization endpoints
app.post('/api/inputs/optimize', (req: Request, res: Response) => {
  const { cropId, currentCost, landSize } = req.body;
  
  res.json({
    success: true,
    item: {
      cropId,
      currentCost,
      optimizedCost: currentCost * 0.75,
      savings: currentCost * 0.25,
      savingsPercent: 25,
      recommendations: [
        { input: 'Nitrogen Fertilizer', currentQty: currentCost * 0.3, optimizedQty: currentCost * 0.25, savings: currentCost * 0.05 },
        { input: 'Phosphorus Fertilizer', currentQty: currentCost * 0.2, optimizedQty: currentCost * 0.18, savings: currentCost * 0.02 },
        { input: 'Potassium Fertilizer', currentQty: currentCost * 0.15, optimizedQty: currentCost * 0.14, savings: currentCost * 0.01 },
        { input: 'Pesticides', currentQty: currentCost * 0.25, optimizedQty: currentCost * 0.18, savings: currentCost * 0.07 },
      ],
    },
  });
});

// Irrigation scheduling endpoints
app.post('/api/irrigation/schedule', (req: Request, res: Response) => {
  const { cropId, state, district } = req.body;
  
  res.json({
    success: true,
    items: [
      { month: 'January', waterNeeded: 50, rainfall: 15, irrigationRequired: 35, frequency: 2, timing: 'Early Morning' },
      { month: 'February', waterNeeded: 50, rainfall: 20, irrigationRequired: 30, frequency: 2, timing: 'Late Evening' },
      { month: 'March', waterNeeded: 55, rainfall: 30, irrigationRequired: 25, frequency: 2, timing: 'Early Morning' },
      { month: 'April', waterNeeded: 60, rainfall: 50, irrigationRequired: 10, frequency: 1, timing: 'Late Evening' },
    ],
  });
});

// Finance calculator endpoints
app.post('/api/finance/analyze', (req: Request, res: Response) => {
  const { cropId, landSize, loanAmount, interestRate, loanTerm } = req.body;
  
  const costPerHectare = 30000;
  const totalCost = costPerHectare * landSize;
  const expectedRevenue = 50 * landSize * 2500; // yield * price
  const profit = expectedRevenue - totalCost;
  
  const monthlyRate = interestRate / 100 / 12;
  const monthlyInstallment = loanAmount > 0 
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1)
    : 0;
  
  res.json({
    success: true,
    item: {
      totalCost,
      expectedRevenue,
      profit,
      roi: (profit / totalCost) * 100,
      monthlyInstallment,
      totalRepayment: monthlyInstallment * loanTerm,
      profitAfterLoan: profit - (monthlyInstallment * loanTerm),
    },
  });
});

// ==================== ML PREDICTION ENDPOINTS ====================

/**
 * ML Endpoint 1: Predict crop profit with detailed analysis
 * POST /api/ml/predict/crop-profit
 */
app.post('/api/ml/predict/crop-profit', (req: Request, res: Response) => {
  try {
    const { cropId, landSizeHectares, soilType, location, season, experienceYears, creditScore } = req.body;
    
    const crop = mockCrops.find(c => c.id === cropId);
    if (!crop) {
      return res.status(404).json({ success: false, error: 'Crop not found' });
    }

    const farmer = {
      farmerId: 'farmer-' + Date.now(),
      landSizeHectares: landSizeHectares || 1,
      soilType: soilType || 'loamy',
      location: location || 'Karnataka',
      season: season || 'kharif',
      experienceYears: experienceYears || 5,
      creditScore: creditScore || 700,
    };

    const prediction = predictCropProfit(crop, farmer);

    res.json({
      success: true,
      crop: crop.name,
      prediction,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ML Endpoint 2: Forecast market price for a crop
 * POST /api/ml/predict/market-price
 */
app.post('/api/ml/predict/market-price', (req: Request, res: Response) => {
  try {
    const { cropName, currentPrice, daysAhead } = req.body;
    
    const prediction = forecastMarketPrice(
      cropName || 'Sugarcane',
      currentPrice || 2500,
      daysAhead || 30
    );

    res.json({
      success: true,
      crop: cropName || 'Sugarcane',
      currentPrice: currentPrice || 2500,
      forecastedPrice: prediction.prediction,
      daysAhead: daysAhead || 30,
      prediction,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ML Endpoint 3: Predict pest outbreak risk
 * POST /api/ml/predict/pest-risk
 */
app.post('/api/ml/predict/pest-risk', (req: Request, res: Response) => {
  try {
    const { cropId, season, temperature, humidity, rainfall } = req.body;
    
    const crop = mockCrops.find(c => c.id === cropId);
    if (!crop) {
      return res.status(404).json({ success: false, error: 'Crop not found' });
    }

    const prediction = predictPestRisk(
      crop,
      season || 'kharif',
      temperature || 25,
      humidity || 70,
      rainfall || 60
    );

    res.json({
      success: true,
      crop: crop.name,
      season: season || 'kharif',
      weatherConditions: {
        temperature: temperature || 25,
        humidity: humidity || 70,
        rainfall: rainfall || 60,
      },
      prediction,
      riskLevel: prediction.prediction > 70 ? 'High' : prediction.prediction > 50 ? 'Medium' : 'Low',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ML Endpoint 4: Optimize input costs
 * POST /api/ml/predict/optimize-inputs
 */
app.post('/api/ml/predict/optimize-inputs', (req: Request, res: Response) => {
  try {
    const { cropId, soilType, experienceYears } = req.body;
    
    const crop = mockCrops.find(c => c.id === cropId);
    if (!crop) {
      return res.status(404).json({ success: false, error: 'Crop not found' });
    }

    const farmer = {
      farmerId: 'farmer-' + Date.now(),
      landSizeHectares: 1,
      soilType: soilType || 'loamy',
      location: 'Karnataka',
      season: 'kharif',
      experienceYears: experienceYears || 5,
    };

    const optimization = optimizeInputs(crop, farmer);

    res.json({
      success: true,
      crop: crop.name,
      optimization,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ML Endpoint 5: Generate optimal irrigation schedule
 * POST /api/ml/predict/irrigation-schedule
 */
app.post('/api/ml/predict/irrigation-schedule', (req: Request, res: Response) => {
  try {
    const { cropId, soilType, expectedRainfall } = req.body;
    
    const crop = mockCrops.find(c => c.id === cropId);
    if (!crop) {
      return res.status(404).json({ success: false, error: 'Crop not found' });
    }

    const farmer = {
      farmerId: 'farmer-' + Date.now(),
      landSizeHectares: 1,
      soilType: soilType || 'loamy',
      location: 'Karnataka',
      season: 'kharif',
    };

    const schedule = optimizeIrrigationSchedule(crop, farmer, expectedRainfall || 0);

    res.json({
      success: true,
      crop: crop.name,
      soilType: soilType || 'loamy',
      schedule,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ML Endpoint 6: Financial optimization with loan analysis
 * POST /api/ml/predict/finance-optimize
 */
app.post('/api/ml/predict/finance-optimize', (req: Request, res: Response) => {
  try {
    const { expectedProfit, cropCost, creditScore } = req.body;
    
    const farmer = {
      farmerId: 'farmer-' + Date.now(),
      landSizeHectares: 1,
      soilType: 'loamy',
      location: 'Karnataka',
      season: 'kharif',
      creditScore: creditScore || 700,
    };

    const finance = optimizeFinance(expectedProfit || 500000, cropCost || 375000, farmer);

    res.json({
      success: true,
      finance,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ML Endpoint 7: Ensemble prediction - Complete analysis for a crop
 * POST /api/ml/predict/ensemble
 */
app.post('/api/ml/predict/ensemble', (req: Request, res: Response) => {
  try {
    const { 
      cropId, 
      landSizeHectares, 
      soilType, 
      location, 
      season, 
      experienceYears,
      creditScore,
      temperature,
      humidity,
      rainfall,
    } = req.body;
    
    const crop = mockCrops.find(c => c.id === cropId);
    if (!crop) {
      return res.status(404).json({ success: false, error: 'Crop not found' });
    }

    const farmer = {
      farmerId: 'farmer-' + Date.now(),
      landSizeHectares: landSizeHectares || 1,
      soilType: soilType || 'loamy',
      location: location || 'Karnataka',
      season: season || 'kharif',
      experienceYears: experienceYears || 5,
      creditScore: creditScore || 700,
    };

    const weatherData = {
      temperature: temperature || 25,
      humidity: humidity || 70,
      rainfall: rainfall || 60,
    };

    const ensemble = ensemblePrediction(crop, farmer, weatherData);

    res.json({
      success: true,
      ensemble,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ML Endpoint 8: Get ML model information
 * GET /api/ml/models
 */
app.get('/api/ml/models', (req: Request, res: Response) => {
  res.json({
    success: true,
    models: [
      {
        id: 'crop-profit-predictor',
        name: 'Crop Profit Predictor',
        description: 'Linear regression model predicting crop profit based on farmer profile and crop characteristics',
        accuracy: 87,
        endpoint: '/api/ml/predict/crop-profit',
        inputs: ['cropId', 'landSizeHectares', 'soilType', 'season', 'experienceYears', 'creditScore'],
      },
      {
        id: 'market-price-forecaster',
        name: 'Market Price Forecaster',
        description: 'Time series forecasting model predicting crop market prices',
        accuracy: 74,
        endpoint: '/api/ml/predict/market-price',
        inputs: ['cropName', 'currentPrice', 'daysAhead'],
      },
      {
        id: 'pest-risk-predictor',
        name: 'Pest Risk Predictor',
        description: 'Environmental risk model predicting pest outbreak probability',
        accuracy: 79,
        endpoint: '/api/ml/predict/pest-risk',
        inputs: ['cropId', 'season', 'temperature', 'humidity', 'rainfall'],
      },
      {
        id: 'input-optimizer',
        name: 'Input Cost Optimizer',
        description: 'Regression model optimizing fertilizer and pesticide inputs',
        accuracy: 82,
        endpoint: '/api/ml/predict/optimize-inputs',
        inputs: ['cropId', 'soilType', 'experienceYears'],
      },
      {
        id: 'irrigation-scheduler',
        name: 'Irrigation Schedule Optimizer',
        description: 'Water management model generating monthly irrigation schedules',
        accuracy: 85,
        endpoint: '/api/ml/predict/irrigation-schedule',
        inputs: ['cropId', 'soilType', 'expectedRainfall'],
      },
      {
        id: 'finance-optimizer',
        name: 'Finance Optimizer',
        description: 'Financial model calculating loan EMI and ROI analysis',
        accuracy: 90,
        endpoint: '/api/ml/predict/finance-optimize',
        inputs: ['expectedProfit', 'cropCost', 'creditScore'],
      },
      {
        id: 'ensemble-predictor',
        name: 'Ensemble Predictor',
        description: 'Combines all 6 models for comprehensive crop and farm analysis',
        accuracy: 85,
        endpoint: '/api/ml/predict/ensemble',
        inputs: ['cropId', 'landSizeHectares', 'soilType', 'season', 'temperature', 'humidity', 'rainfall'],
      },
    ],
  });
});

// Chat endpoint (24/7 Farming Assistant)
app.post('/api/chat/message', (req: Request, res: Response) => {
  const { message } = req.body;
  
  // Mock AI responses based on keywords
  let reply = '';
  
  if (message.toLowerCase().includes('crop') || message.toLowerCase().includes('plant')) {
    reply = 'Based on your location and current season, I recommend growing sugarcane, rice, or maize. Would you like to know more about any specific crop?';
  } else if (message.toLowerCase().includes('pest') || message.toLowerCase().includes('disease')) {
    reply = 'I see pest problems are a concern. Use integrated pest management (IPM) techniques including neem spraying, crop rotation, and biological controls. Check your local pest map for current threats.';
  } else if (message.toLowerCase().includes('water') || message.toLowerCase().includes('irrigation')) {
    reply = 'For optimal water management, implement drip irrigation systems. This can save 30-40% water compared to flood irrigation. Based on your crop, I can generate a monthly irrigation schedule.';
  } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('market')) {
    reply = 'Current mandi prices: Sugarcane: ₹2,500/quintal, Rice: ₹1,950/quintal, Maize: ₹1,850/quintal. Best time to sell is January-March for better prices.';
  } else if (message.toLowerCase().includes('profit') || message.toLowerCase().includes('finance')) {
    reply = 'To maximize profits, optimize your input costs, access government schemes, and diversify crops. Use our finance calculator to analyze ROI and loan options.';
  } else if (message.toLowerCase().includes('soil')) {
    reply = 'Soil health is crucial. Get your soil tested to know NPK levels. Add compost or organic matter yearly. Rotate crops to maintain fertility. I recommend soil testing once every 2 years.';
  } else if (message.toLowerCase().includes('weather')) {
    reply = 'Current forecast shows sunny weather for the next 3 days with scattered rains expected on day 4-5. Ideal for spraying pesticides today. Plan irrigation accordingly.';
  } else {
    reply = 'I\'m your 24/7 farming assistant. I can help with crop selection, pest management, irrigation scheduling, market prices, finance planning, and much more. What specific aspect of farming would you like help with?';
  }
  
  res.json({
    success: true,
    item: {
      reply,
      timestamp: new Date(),
    },
  });
});

app.get('/api/chat/history/:farmerId', (req: Request, res: Response) => {
  res.json({
    success: true,
    items: [],
  });
});

// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: error.message || 'Internal server error',
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Smart Farm Hub Backend`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Server running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

export default app;
