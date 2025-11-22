# 🏗️ API Endpoints Documentation

Complete API reference for Smart Farm Hub backend.

---

## Base URL
```
Development: http://localhost:5000/api
Production: https://smartfarmhub.com/api
```

---

## 1. AUTHENTICATION ENDPOINTS

### Register Farmer
```
POST /auth/register
Content-Type: application/json

{
  "name": "Rajesh Kumar",
  "phone": "9876543210",
  "email": "rajesh@example.com",
  "password": "securepass123",
  "state": "Karnataka",
  "district": "Belgaum",
  "taluk": "Belgaum",
  "village": "Londa",
  "landSizeHectares": 2.5,
  "soilType": "clayey",
  "waterSource": "borewell",
  "preferredLanguage": "ka"
}

Response: 200 OK
{
  "success": true,
  "message": "Farmer registered successfully",
  "farmerId": "507f1f77bcf86cd799439011",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "phone": "9876543210",
  "password": "securepass123"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "farmerId": "507f1f77bcf86cd799439011"
}
```

### Logout
```
POST /auth/logout
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 2. FARMER ENDPOINTS

### Get Farmer Profile
```
GET /farmers/:farmerId
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "farmer": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "phone": "9876543210",
    "state": "Karnataka",
    "district": "Belgaum",
    "landSizeHectares": 2.5,
    "soilType": "clayey",
    "previousCrops": [
      { "crop": "Sugarcane", "year": 2023, "yield": 75, "profit": 150000 }
    ]
  }
}
```

### Update Farmer Profile
```
PUT /farmers/:farmerId
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "landSizeHectares": 3.0,
  "soilType": "loamy",
  "waterSource": "canal"
}

Response: 200 OK
{
  "success": true,
  "message": "Profile updated",
  "farmer": { ... }
}
```

### Get Nearby Farmers (for peer comparisons)
```
GET /farmers/nearby?latitude=15.82&longitude=75.72&radiusKm=10
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "farmers": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Suresh",
      "distance": 2.3,
      "crops": ["Sugarcane", "Jowar"],
      "landSize": 2.0
    }
  ]
}
```

---

## 3. CROP ENDPOINTS

### Get All Crops
```
GET /crops?state=Karnataka&soilType=clayey
Headers: Authorization: Bearer <token>

Query Parameters:
- state: Filter by state (optional)
- soilType: Filter by soil type (optional)
- season: "kharif", "rabi", "summer" (optional)
- sortBy: "profit", "yield", "demand" (optional)

Response: 200 OK
{
  "success": true,
  "crops": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "name": "Sugarcane",
      "nameInKannada": "ಸೆಳೆ",
      "estimatedProfit": 200000,
      "costOfCultivation": 150000,
      "estimatedYield": 80,
      "marketPrice": 2500,
      "waterRequirement": 2000,
      "commonPests": ["Armyworm", "Scale insect"],
      "seasonality": ["kharif", "rabi"]
    }
  ]
}
```

### Get Single Crop Details
```
GET /crops/:cropId
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "crop": {
    "_id": "507f1f77bcf86cd799439020",
    "name": "Sugarcane",
    "description": "High-value cash crop...",
    "estimatedProfit": 200000,
    "marketPrice": 2500,
    "msp": 2500,
    "sowingDate": "June-July",
    "harvestingDate": "Nov-Dec",
    "cycleInDays": 150,
    "commonDiseases": ["Red Rot", "Smut"],
    "preventiveMeasures": ["Use disease-free seeds", "Drain excess water"],
    "usesInIndustry": ["Sugar production", "Ethanol", "Jaggery"]
  }
}
```

### Get Crop Comparison
```
POST /crops/compare
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "farmerId": "507f1f77bcf86cd799439011",
  "crops": ["507f1f77bcf86cd799439020", "507f1f77bcf86cd799439021"],
  "landSizeHectares": 2.5
}

Response: 200 OK
{
  "success": true,
  "comparison": [
    {
      "crop": "Sugarcane",
      "profit": 500000,
      "cost": 375000,
      "yield": 100,
      "waterNeeded": 5000,
      "suitability": "Very High",
      "risks": ["Moderate pest risk"]
    },
    {
      "crop": "Cotton",
      "profit": 300000,
      "cost": 250000,
      "yield": 15,
      "waterNeeded": 3000,
      "suitability": "High",
      "risks": ["Low market demand"]
    }
  ]
}
```

---

## 4. CROP RECOMMENDATION ENDPOINTS

### Get Recommended Crop
```
POST /recommendations/crop
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "farmerId": "507f1f77bcf86cd799439011",
  "season": "kharif"
}

Response: 200 OK
{
  "success": true,
  "topRecommendation": {
    "rank": 1,
    "crop": "Sugarcane",
    "expectedProfit": 500000,
    "confidence": 92,
    "reasoning": [
      "Soil type (clayey) is ideal",
      "Land size (2.5 ha) suits this crop",
      "Market demand is high",
      "Available government subsidies"
    ],
    "riskFactors": ["Armyworm outbreak in region - 45% probability"]
  },
  "alternativeRecommendations": [
    {
      "rank": 2,
      "crop": "Cotton",
      "expectedProfit": 300000,
      "confidence": 78
    }
  ]
}
```

### What-If Crop Simulation
```
POST /recommendations/simulate
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "farmerId": "507f1f77bcf86cd799439011",
  "crop1": "507f1f77bcf86cd799439020",
  "crop2": "507f1f77bcf86cd799439021",
  "crop3": "507f1f77bcf86cd799439022",
  "landSizeHectares": 2.5,
  "soilType": "clayey"
}

Response: 200 OK
{
  "success": true,
  "simulation": {
    "crop1": {
      "name": "Sugarcane",
      "expectedProfit": 500000,
      "costOfCultivation": 375000,
      "yield": 100,
      "bestSowingDate": "2024-06-15",
      "bestHarvestingDate": "2024-12-15",
      "waterRequirement": 5000,
      "riskScore": 35
    },
    "crop2": {
      "name": "Cotton",
      "expectedProfit": 300000,
      "costOfCultivation": 250000,
      "yield": 15,
      "bestSowingDate": "2024-05-01",
      "bestHarvestingDate": "2024-11-30",
      "waterRequirement": 3000,
      "riskScore": 48
    },
    "crop3": { ... }
  },
  "profitDifference": {
    "crop1VsCrop2": 200000,
    "crop1VsCrop3": 150000,
    "crop2VsCrop3": 50000
  }
}
```

---

## 5. GOVERNMENT SCHEME ENDPOINTS

### Get Eligible Schemes
```
GET /schemes/eligible
Headers: Authorization: Bearer <token>

Query Parameters:
- farmerId: (required)
- crop: Filter by crop (optional)

Response: 200 OK
{
  "success": true,
  "schemes": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "name": "PM-KISAN Yojana",
      "nameInKannada": "ಪ್ರಧಾನ ಮಂತ್ರಿ ಕೃಷಿ ಸಿಂಚನ ಯೋಜನೆ",
      "description": "Direct income support to farmers",
      "subsidy": 6000,
      "applicationDeadline": "2024-12-31",
      "eligibilityCriteria": {
        "minLandSize": 0,
        "maxLandSize": 100,
        "soilTypes": ["all"],
        "farmerCategory": "all"
      },
      "requiredDocuments": ["Aadhar", "Bank Account", "Land Certificate"],
      "applicationLink": "https://pmkisan.gov.in",
      "governmentBody": "Ministry of Agriculture"
    }
  ]
}
```

### Get Scheme Details
```
GET /schemes/:schemeId
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "scheme": {
    "_id": "507f1f77bcf86cd799439030",
    "name": "PM-KISAN Yojana",
    "description": "Provides ₹6000/year in 3 installments",
    "subsidy": 6000,
    "applicationProcess": "Online at pmkisan.gov.in",
    "faqs": [
      { "question": "Who is eligible?", "answer": "All farmers..." }
    ]
  }
}
```

### Apply for Scheme
```
POST /schemes/:schemeId/apply
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "farmerId": "507f1f77bcf86cd799439011",
  "documents": [file1, file2],
  "comments": "Please consider"
}

Response: 200 OK
{
  "success": true,
  "message": "Application submitted",
  "applicationId": "507f1f77bcf86cd799439040",
  "status": "submitted"
}
```

### Get Application Status
```
GET /schemes/applications/:applicationId
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "application": {
    "_id": "507f1f77bcf86cd799439040",
    "scheme": "PM-KISAN Yojana",
    "status": "approved",
    "submittedDate": "2024-01-15",
    "approvalDate": "2024-02-10",
    "subsidyAmount": 6000,
    "nextPaymentDate": "2024-03-15"
  }
}
```

### Calculate Missed Benefits
```
POST /schemes/missed-benefits
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "farmerId": "507f1f77bcf86cd799439011"
}

Response: 200 OK
{
  "success": true,
  "missedBenefits": {
    "totalMissedSubsidy": 45000,
    "year": 2024,
    "schemes": [
      {
        "scheme": "PM-KISAN",
        "missedAmount": 6000,
        "reason": "Not applied"
      },
      {
        "scheme": "Crop Insurance",
        "missedAmount": 25000,
        "reason": "Deadline passed"
      }
    ]
  }
}
```

---

## 6. MARKET PRICE ENDPOINTS

### Get Current Market Prices
```
GET /market/prices?crop=sugarcane&state=Karnataka
Headers: Authorization: Bearer <token>

Query Parameters:
- crop: Crop name (required)
- state: State filter (optional)
- mandi: Specific mandi (optional)
- days: Last N days (optional, default: 7)

Response: 200 OK
{
  "success": true,
  "prices": [
    {
      "mandi": "Belgaum Mandi",
      "state": "Karnataka",
      "pricePerKg": 2500,
      "date": "2024-01-20",
      "trend": "up",
      "priceChange24h": 2.5,
      "distance": 15,
      "transportCost": 500,
      "profitIfSoldToday": 195000
    },
    {
      "mandi": "Bijapur Mandi",
      "state": "Karnataka",
      "pricePerKg": 2450,
      "date": "2024-01-20",
      "trend": "down",
      "priceChange24h": -1.5,
      "distance": 45,
      "transportCost": 800,
      "profitIfSoldToday": 189600
    }
  ]
}
```

### Get Price Trend
```
GET /market/trend/:crop
Headers: Authorization: Bearer <token>

Query Parameters:
- days: "7", "30", "90", "365" (optional)
- mandi: Specific mandi (optional)

Response: 200 OK
{
  "success": true,
  "trendData": [
    { "date": "2024-01-01", "price": 2300, "mandi": "Belgaum" },
    { "date": "2024-01-02", "price": 2350, "mandi": "Belgaum" },
    { "date": "2024-01-03", "price": 2500, "mandi": "Belgaum" }
  ],
  "avgPrice": 2400,
  "minPrice": 2200,
  "maxPrice": 2600,
  "msp": 2500,
  "trend": "upward",
  "recommendation": "Wait for ₹2600 in next 3 days"
}
```

### Predict Price
```
POST /market/predict-price
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "crop": "Sugarcane",
  "days": 7
}

Response: 200 OK
{
  "success": true,
  "prediction": {
    "crop": "Sugarcane",
    "currentPrice": 2500,
    "predictedPrice7Days": 2650,
    "predictedPrice14Days": 2700,
    "confidence": 85,
    "recommendation": "Sell in 10-12 days for best price",
    "bestSellingWindow": "2024-01-28 to 2024-02-01"
  }
}
```

### Get Best Mandi to Sell
```
POST /market/best-mandi
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "crop": "Sugarcane",
  "quantity": 200,
  "farmerId": "507f1f77bcf86cd799439011"
}

Response: 200 OK
{
  "success": true,
  "bestMandi": {
    "name": "Belgaum Mandi",
    "state": "Karnataka",
    "distance": 15,
    "pricePerKg": 2500,
    "transportCost": 500,
    "totalRevenue": 500000,
    "netProfit": 495000,
    "facilities": ["Cold storage", "Fair price"],
    "contactPhone": "08312456789"
  },
  "alternatives": [
    {
      "name": "Bijapur Mandi",
      "netProfit": 489600
    }
  ]
}
```

---

## 7. WEATHER ENDPOINTS

### Get Current Weather
```
GET /weather?state=Karnataka&district=Belgaum
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "weather": {
    "location": "Belgaum, Karnataka",
    "temperature": 28,
    "humidity": 65,
    "rainfall": 0,
    "windSpeed": 12,
    "condition": "Partly cloudy",
    "fetchedAt": "2024-01-20T14:30:00Z"
  }
}
```

### Get 7-Day Forecast
```
GET /weather/forecast?state=Karnataka&district=Belgaum&days=7
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "forecast": [
    {
      "date": "2024-01-21",
      "high": 32,
      "low": 18,
      "rainfall": 0,
      "condition": "Sunny",
      "riskLevel": "low"
    },
    {
      "date": "2024-01-22",
      "high": 28,
      "low": 16,
      "rainfall": 15,
      "condition": "Rainy",
      "riskLevel": "medium"
    }
  ]
}
```

### Get Weather Alerts
```
GET /weather/alerts?state=Karnataka&district=Belgaum
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "alerts": [
    {
      "type": "heavy_rain",
      "severity": "warning",
      "message": "Heavy rainfall expected next 48 hours",
      "affectedDates": ["2024-01-21", "2024-01-22"],
      "recommendation": "Drain excess water, mulch crops"
    }
  ]
}
```

---

## 8. PEST & DISEASE ENDPOINTS

### Get Pest Alerts Map
```
GET /pests/map?latitude=15.82&longitude=75.72&radiusKm=20
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "pests": [
    {
      "_id": "507f1f77bcf86cd799439050",
      "name": "Armyworm",
      "location": {
        "district": "Belgaum",
        "taluk": "Belgaum",
        "coordinates": [15.85, 75.70]
      },
      "affectedCrops": ["Sugarcane", "Maize"],
      "severity": "high",
      "reportedCases": 12,
      "riskProbability": 78,
      "timeframe": "Next 7 days",
      "preventiveMeasures": [
        "Spray neem oil",
        "Remove infected leaves",
        "Introduce natural predators"
      ],
      "pesticides": [
        {
          "name": "Spinosad",
          "dosage": "2.5 ml/liter",
          "cost": 400,
          "safetyPeriod": "21 days"
        }
      ]
    }
  ]
}
```

### Get Pest Details
```
GET /pests/:pestId
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "pest": {
    "_id": "507f1f77bcf86cd799439050",
    "name": "Armyworm",
    "description": "Larvae feed on crop leaves...",
    "affectedCrops": ["Sugarcane", "Maize", "Cotton"],
    "lifecycle": "Eggs → Larvae (10-14 days) → Pupae → Adults",
    "signs": ["Irregular holes in leaves", "Wilting", "Frass"],
    "preventiveMeasures": [...],
    "organicPesticides": [...],
    "chemicalPesticides": [...]
  }
}
```

### Report Pest Outbreak
```
POST /pests/report
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "farmerId": "507f1f77bcf86cd799439011",
  "pestName": "Armyworm",
  "cropAffected": "Sugarcane",
  "severity": "high",
  "location": {
    "latitude": 15.82,
    "longitude": 75.72
  },
  "description": "Found 50+ worms on 1 hectare",
  "images": [file1, file2]
}

Response: 201 Created
{
  "success": true,
  "message": "Pest outbreak reported",
  "reportId": "507f1f77bcf86cd799439051"
}
```

---

## 9. SOIL & INPUTS ENDPOINTS

### Get Soil Health Report
```
GET /soil/:farmerId
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "soil": {
    "type": "clayey",
    "pH": 6.8,
    "organic": 2.5,
    "nitrogen": 280,
    "phosphorus": 18,
    "potassium": 200,
    "micronutrients": {
      "zinc": 0.8,
      "iron": 15
    },
    "testDate": "2024-01-10",
    "validUntilDate": "2025-01-10",
    "recommendedFertilizers": [
      {
        "name": "Urea",
        "dosage": 150,
        "cost": 3000,
        "applicationTiming": "Immediately"
      }
    ]
  }
}
```

### Get Nearby Input Shops
```
GET /inputs/nearby?latitude=15.82&longitude=75.72&radiusKm=10&type=fertilizer
Headers: Authorization: Bearer <token>

Query Parameters:
- type: "fertilizer", "seed", "pesticide"
- radiusKm: Search radius
- sortBy: "price", "rating", "distance"

Response: 200 OK
{
  "success": true,
  "inputs": [
    {
      "_id": "507f1f77bcf86cd799439060",
      "type": "fertilizer",
      "name": "Urea 46%",
      "supplier": {
        "name": "Belgaum Seeds Co.",
        "phone": "08312456789",
        "address": "Market Road, Belgaum",
        "rating": 4.5
      },
      "price": 20,
      "unit": "kg",
      "quantity": 500,
      "isGovernmentApproved": true,
      "distance": 2.3,
      "certifications": ["ISO 9001"]
    }
  ]
}
```

---

## 10. CHAT & ASSISTANCE ENDPOINTS

### Send Message to AI Advisor
```
POST /chat/message
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "farmerId": "507f1f77bcf86cd799439011",
  "message": "Which fertilizer should I use for groundnut on sandy soil?",
  "language": "en"
}

Response: 200 OK
{
  "success": true,
  "response": {
    "answer": "For sandy soil groundnuts, use NPK 10:26:26 with zinc sulphate...",
    "cropRecommendations": ["Groundnut", "Peanut"],
    "fertilizers": [
      {
        "name": "NPK 10:26:26",
        "dosage": "250 kg/hectare",
        "nearbyStores": 3
      }
    ]
  }
}
```

---

## Error Responses

All errors follow this format:

```javascript
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

Common error codes:
- `AUTH_REQUIRED` - Need to login
- `FARMER_NOT_FOUND` - Farmer doesn't exist
- `INVALID_INPUT` - Invalid data provided
- `DATABASE_ERROR` - Server error
- `UNAUTHORIZED` - No permission

---

## Authentication

All endpoints require Bearer token in Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Token is returned after login and is valid for 30 days.

---

This API is REST-based and uses JSON for all requests and responses. All timestamps are in ISO 8601 format (UTC).
