import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  state: String,
  district: String,
  taluk: String,
  village: String,
  landSizeHectares: Number,
  soilType: String,
  waterSource: String,
  irrigationType: String,
  preferredLanguage: { type: String, default: 'en' },
  phoneVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Farmer = mongoose.model('Farmer', farmerSchema);

const cropSchema = new mongoose.Schema({
  name: String,
  nameInKannada: String,
  nameInHindi: String,
  estimatedYieldPerHectare: Number,
  estimatedProfit: Number,
  costOfCultivation: Number,
  marketPrice: Number,
  msp: Number,
  waterRequirement: Number,
  temperatureMin: Number,
  temperatureMax: Number,
  soilTypes: [String],
  seasonality: [String],
  sowingDate: String,
  harvestingDate: String,
  cycleInDays: Number,
  commonPests: [String],
  commonDiseases: [String],
  preventiveMeasures: [String],
  createdAt: { type: Date, default: Date.now },
});

export const Crop = mongoose.model('Crop', cropSchema);

const schemeSchema = new mongoose.Schema({
  name: String,
  nameInKannada: String,
  applicableStates: [String],
  applicableDistricts: [String],
  subsidy: Number,
  subsidyPercentage: Number,
  description: String,
  applicationDeadline: Date,
  requiredDocuments: [String],
  createdAt: { type: Date, default: Date.now },
});

export const Scheme = mongoose.model('Scheme', schemeSchema);

const marketPriceSchema = new mongoose.Schema({
  crop: String,
  mandi: String,
  pricePerKg: Number,
  date: { type: Date, default: Date.now },
  trend: String,
  updatedAt: { type: Date, default: Date.now },
});

export const MarketPrice = mongoose.model('MarketPrice', marketPriceSchema);
