# 📊 Database Schema Design

## Overview
MongoDB collections for Smart Farm Hub

---

## Collections & Models

### 1. **Farmer** - User Profile
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String (unique),
  email: String (unique),
  password: String (hashed),
  
  // Location
  state: String,          // e.g., "Karnataka"
  district: String,       // e.g., "Belgaum"
  taluk: String,
  village: String,
  geoLocation: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  
  // Farm Details
  landSizeHectares: Number,
  soilType: String,       // e.g., "clayey", "sandy", "loamy"
  waterSource: String,    // e.g., "borewell", "irrigation", "canal"
  irrigationType: String, // e.g., "drip", "flood", "sprinkler"
  
  // Preferences
  preferredLanguage: String, // "en", "ka", "hi"
  phoneVerified: Boolean,
  
  // Historical Data
  previousCrops: [
    {
      crop: String,
      year: Number,
      yield: Number,
      profit: Number
    }
  ],
  
  // Document Links
  appliedSchemes: [ObjectId],  // Reference to Scheme collection
  createdAt: Date,
  updatedAt: Date
}
```

---

### 2. **Crop** - Crop Information
```javascript
{
  _id: ObjectId,
  name: String,
  nameInKannada: String,
  nameInHindi: String,
  
  // Economics
  estimatedYieldPerHectare: Number,     // kg/hectare
  estimatedProfit: Number,              // ₹/hectare
  costOfCultivation: Number,            // ₹/hectare
  marketPrice: Number,                  // ₹/kg (current)
  msp: Number,                          // Minimum Support Price
  
  // Requirements
  waterRequirement: Number,             // mm
  temperatureMin: Number,               // °C
  temperatureMax: Number,
  soilTypes: [String],                  // Compatible soil types
  seasonality: [String],                // ["kharif", "rabi", "summer"]
  
  // Farming Details
  sowingDate: String,                   // "June-July"
  harvestingDate: String,               // "Oct-Nov"
  cycleInDays: Number,                  // 120-150
  
  // Market
  usesInIndustry: [String],
  demandTrend: String,                  // "high", "medium", "low"
  
  // Health Risks
  commonPests: [String],
  commonDiseases: [String],
  preventiveMeasures: [String],
  
  createdAt: Date,
  updatedAt: Date
}
```

---

### 3. **MarketPrice** - Daily Price Tracking
```javascript
{
  _id: ObjectId,
  crop: ObjectId,              // Reference to Crop
  mandi: String,               // "Belgaum Mandi"
  mandiLocation: {
    state: String,
    district: String,
    coordinates: [lng, lat]
  },
  
  pricePerKg: Number,
  quantity: String,            // e.g., "100 kg"
  date: Date,
  
  // Trend
  priceChange24h: Number,      // % change
  trend: String,               // "up", "down", "stable"
  
  // Forecast
  predictedPrice7Days: Number,
  predictedPrice14Days: Number,
  
  createdAt: Date,
  updatedAt: Date
}
```

---

### 4. **Scheme** - Government Schemes
```javascript
{
  _id: ObjectId,
  name: String,
  nameInKannada: String,
  
  // Eligibility
  applicableStates: [String],
  applicableDistricts: [String],
  eligibilityCriteria: {
    minLandSize: Number,
    maxLandSize: Number,
    soilTypes: [String],
    cropTypes: [String],
    farmerCategory: String      // "small", "marginal", "SC/ST"
  },
  
  // Benefits
  subsidy: Number,              // ₹ amount
  subsidyPercentage: Number,    // %
  subsidyPerHectare: Number,    // ₹/hectare
  maxSubsidy: Number,
  
  // Details
  description: String,
  applicationDeadline: Date,
  requiredDocuments: [String],  // ["Aadhar", "Bank Account", etc]
  applicationLink: String,
  governmentBody: String,       // Ministry/Department
  
  createdAt: Date,
  updatedAt: Date
}
```

---

### 5. **SchemeApplication** - Track Farmer Applications
```javascript
{
  _id: ObjectId,
  farmer: ObjectId,             // Reference to Farmer
  scheme: ObjectId,             // Reference to Scheme
  
  status: String,               // "draft", "submitted", "approved", "rejected"
  submittedDocuments: [
    {
      documentType: String,
      url: String,              // S3/Cloud storage link
      uploadedAt: Date
    }
  ],
  
  applicationDate: Date,
  approvalDate: Date,
  subsidyAmount: Number,        // Final approved amount
  comments: String,
  
  createdAt: Date,
  updatedAt: Date
}
```

---

### 6. **Weather** - Weather Forecasts
```javascript
{
  _id: ObjectId,
  location: {
    state: String,
    district: String,
    coordinates: [lng, lat]
  },
  
  // Current
  temperature: Number,
  humidity: Number,
  windSpeed: Number,
  rainfall: Number,             // mm
  condition: String,            // "sunny", "rainy", "cloudy"
  
  // Forecast (7 days)
  forecast: [
    {
      date: Date,
      high: Number,
      low: Number,
      rainfall: Number,
      condition: String,
      riskLevel: String          // "low", "medium", "high"
    }
  ],
  
  // Alerts
  alerts: [
    {
      type: String,             // "heatwave", "heavy_rain", "frost"
      severity: String,         // "warning", "alert"
      message: String,
      affectedDates: [Date]
    }
  ],
  
  fetchedAt: Date,
  updatedAt: Date
}
```

---

### 7. **Pest** - Pest & Disease Alerts
```javascript
{
  _id: ObjectId,
  location: {
    state: String,
    district: String,
    taluk: String,
    coordinates: [lng, lat]
  },
  
  // Pest/Disease Info
  name: String,                 // "Armyworm", "Blast disease"
  affectedCrops: [String],
  severity: String,             // "low", "medium", "high"
  
  // Reporting
  reportedCases: Number,
  reportedBy: String,           // "Farmer", "Krishi Vigyan Kendra", "AI Detection"
  
  // Prediction
  riskProbability: Number,      // 0-100%
  timeframe: String,            // "Next 7 days"
  weatherConditions: [String],  // Ideal conditions for spread
  
  // Prevention/Treatment
  preventiveMeasures: [String],
  pesticides: [
    {
      name: String,
      dosage: String,
      cost: Number,
      safetyPeriod: String      // "21 days before harvest"
    }
  ],
  
  createdAt: Date,
  updatedAt: Date
}
```

---

### 8. **Soil** - Soil Health Data
```javascript
{
  _id: ObjectId,
  farmer: ObjectId,             // Reference to Farmer
  
  location: {
    coordinates: [lng, lat]
  },
  
  // Soil Properties
  type: String,                 // "clayey", "sandy", "loamy"
  pH: Number,
  organic: Number,              // %
  nitrogen: Number,             // ppm
  phosphorus: Number,           // ppm
  potassium: Number,            // ppm
  micronutrients: {
    zinc: Number,
    iron: Number,
    manganese: Number,
    copper: Number
  },
  
  // Recommendations
  recommendedFertilizers: [
    {
      name: String,
      dosage: Number,           // kg/hectare
      cost: Number,
      applicationTiming: String
    }
  ],
  
  testDate: Date,
  validUntilDate: Date,
  testedBy: String,             // Lab name
  
  createdAt: Date,
  updatedAt: Date
}
```

---

### 9. **Input** - Fertilizer, Seeds, Pesticides
```javascript
{
  _id: ObjectId,
  type: String,                 // "fertilizer", "seed", "pesticide"
  name: String,
  
  // Location & Availability
  location: {
    state: String,
    district: String,
    taluk: String,
    coordinates: [lng, lat]
  },
  
  // Shop/Supplier Info
  supplier: {
    name: String,
    phone: String,
    address: String,
    rating: Number
  },
  
  // Product Info
  price: Number,                // ₹/unit
  unit: String,                 // "kg", "liter", "packet"
  quantity: Number,             // Available quantity
  isGovernmentApproved: Boolean,
  
  // Quality
  certifications: [String],     // ["Organic", "ISO"]
  expiryDate: Date,
  
  createdAt: Date,
  updatedAt: Date
}
```

---

### 10. **CropRecommendation** - AI Recommendations
```javascript
{
  _id: ObjectId,
  farmer: ObjectId,             // Reference to Farmer
  
  // Inputs
  season: String,               // "kharif", "rabi", "summer"
  analysisDate: Date,
  
  // Recommendations (Ranked)
  recommendations: [
    {
      rank: Number,
      crop: ObjectId,           // Reference to Crop
      expectedProfit: Number,
      confidence: Number,       // 0-100%
      reasoning: [String],
      riskFactors: [String]
    }
  ],
  
  // Alternative Crops
  alternativeCrops: [ObjectId],
  
  createdAt: Date,
  updatedAt: Date
}
```

---

### 11. **Loan** - Loan Options
```javascript
{
  _id: ObjectId,
  name: String,
  provider: String,             // "SBI", "NABARD", "Bank Name"
  
  // Eligibility
  minLandSize: Number,
  maxLandSize: Number,
  eligibleStates: [String],
  
  // Terms
  minAmount: Number,
  maxAmount: Number,
  interestRate: Number,         // % per annum
  tenure: Number,               // years
  
  // Subsidies & Features
  hasInterestSubsidy: Boolean,
  subsidyPercentage: Number,    // % after subsidy
  hasProcessingFeeWaiver: Boolean,
  
  // Documentation
  requiredDocuments: [String],
  applicationProcess: String,
  
  createdAt: Date,
  updatedAt: Date
}
```

---

### 12. **IrrigationSchedule** - Smart Irrigation
```javascript
{
  _id: ObjectId,
  farmer: ObjectId,
  crop: ObjectId,
  season: String,
  
  // Schedule
  irrigationDates: [
    {
      date: Date,
      waterQuantity: Number,    // mm or liters/hectare
      method: String,           // "drip", "flood", "sprinkler"
      reason: String,           // "Growth stage", "Weather forecast"
      priority: String          // "high", "medium", "low"
    }
  ],
  
  // Monitoring
  soilMoisture: Number,         // % or sensor reading
  weatherAdjustments: [
    {
      date: Date,
      adjustment: String,
      reason: String
    }
  ],
  
  createdAt: Date,
  updatedAt: Date
}
```

---

## Indexes for Performance

```javascript
// Indexes to add:

db.farmers.createIndex({ phone: 1 }, { unique: true });
db.farmers.createIndex({ email: 1 }, { unique: true });
db.farmers.createIndex({ geoLocation: "2dsphere" });

db.marketprices.createIndex({ crop: 1, date: -1 });
db.marketprices.createIndex({ mandi: 1, date: -1 });

db.pests.createIndex({ location: "2dsphere" });
db.pests.createIndex({ affectedCrops: 1 });

db.crops.createIndex({ soilTypes: 1 });
db.crops.createIndex({ seasonality: 1 });

db.schemes.createIndex({ applicableStates: 1 });
db.schemes.createIndex({ applicableDistricts: 1 });

db.weather.createIndex({ location: "2dsphere" });
db.weather.createIndex({ updatedAt: -1 });
```

---

## Data Flow Example

1. **Farmer Sign Up** → Create document in `farmers` collection
2. **Get Crop Recommendation** → Query `crops` based on farmer's soil, water, location → Return top 3
3. **Check Schemes** → Query `schemes` matching farmer's state + crops → Return eligible
4. **Check Market Prices** → Query `marketprices` for that crop in nearby mandis
5. **Set Irrigation** → Create schedule in `irrigationschedules` based on weather + crop
6. **Get Soil Health** → Query `soil` collection, recommend fertilizers

---

This is a scalable design that supports all 13 features. Start with Farmers, Crops, and MarketPrice collections first!
