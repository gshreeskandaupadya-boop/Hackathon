# Smart Farm Hub - Backend

Express.js API server for Smart Farm Hub.

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with MongoDB URI
npm run dev
```

Server runs on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create farmer account
- `POST /api/auth/login` - Login farmer
- `POST /api/auth/logout` - Logout

### Crops
- `GET /api/crops` - List crops
- `GET /api/crops/:id` - Get single crop
- `POST /api/crops/compare` - Compare crops
- `GET /api/recommendations/crop` - Get recommendation
- `POST /api/recommendations/simulate` - What-if simulator

### Government Schemes
- `GET /api/schemes/eligible` - Get eligible schemes
- `GET /api/schemes/:id` - Scheme details
- `POST /api/schemes/:id/apply` - Apply for scheme

### Market
- `GET /api/market/prices` - Current market prices
- `GET /api/market/trend/:crop` - Price history
- `POST /api/market/predict-price` - Predict future price

### Weather & Pests
- `GET /api/weather` - Weather forecast
- `GET /api/pests/map` - Pest outbreak map

Full API docs: See `docs/API_DOCS.md`

## Project Structure

```
src/
├── routes/                 # API endpoints
├── models/                 # Mongoose schemas
├── controllers/            # Business logic
├── services/              # Data services
├── middleware/            # Auth, validation
└── config/                # Database config
```

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Cors

## Environment Variables

Create `.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/smartfarm
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
```

## Available Scripts

```bash
npm run dev      # Start with nodemon
npm start        # Run production
npm run seed     # Seed database (if available)
```

## Database Models

- Farmer (Users)
- Crop
- MarketPrice
- Scheme
- SchemeApplication
- Weather
- Pest
- Soil
- Input
- CropRecommendation
- Loan
- IrrigationSchedule

See `docs/DATABASE_SCHEMA.md` for detailed schema.

## Testing

```bash
npm test
```

## Contributing

1. Create feature branch
2. Implement feature
3. Test endpoints with Postman/Insomnia
4. Commit with message
5. Push and create PR

## Status

🚀 In Development - Part of Accelerate Hackathon 2024
