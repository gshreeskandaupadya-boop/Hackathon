import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
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
} from '../src/services/mlService';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
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
  });

// Health check endpoint
app.get('/api/health', (req: express.Request, res: express.Response) => {
  res.json({
    message: 'Smart Farm Hub Backend is running!',
    timestamp: new Date().toISOString(),
    mongodb: mongoConnected ? 'connected' : 'using mock data',
    environment: process.env.NODE_ENV || 'development',
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
app.get('/api/crops', (req: express.Request, res: express.Response) => {
  res.json({
    success: true,
    crops: mockCrops,
  });
});

app.get('/api/crops/:id', (req: express.Request, res: express.Response) => {
  const crop = mockCrops.find(c => c.id === req.params.id);
  if (!crop) {
    return res.status(404).json({ success: false, error: 'Crop not found' });
  }
  res.json({ success: true, crop });
});

// Compare crops endpoint
app.post('/api/crops/compare', (req: express.Request, res: express.Response) => {
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
app.post('/api/recommendations/crop', (req: express.Request, res: express.Response) => {
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

export default app;
