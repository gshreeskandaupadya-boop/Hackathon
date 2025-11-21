# 🌾 Smart Farm Profit Maximization Hub

An AI-powered platform that helps Indian farmers maximize seasonal profit by centralizing crop recommendations, government schemes, market prices, soil data, weather forecasts, and pest alerts.

**Status:** 🚀 **Development** | **Team:** Smart Farm Hub | **Hackathon:** Accelerate 2024

---

## 📋 Table of Contents

- [📚 Documentation](#-documentation-first)
- [Quick Start](#quick-start)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 📚 Documentation (START HERE!)

**New to this project? Start here:**

1. **[📖 Documentation Index](docs/INDEX.md)** - Overview of all docs
2. **[🚀 Getting Started](docs/GETTING_STARTED.md)** - What you have and next steps (5 min)
3. **[⚡ Quick Start](docs/QUICK_START.md)** - Setup in 2 hours (step-by-step)
4. **[🎓 Beginners Guide](docs/BEGINNERS_GUIDE.md)** - Week-by-week implementation

**For reference:**
- [📋 Feature Specs](docs/FEATURE_SPECS.md) - All 13 features detailed
- [🗄️ Database Schema](docs/DATABASE_SCHEMA.md) - MongoDB design
- [🔌 API Documentation](docs/API_DOCS.md) - All endpoints
- [🛣️ Complete Roadmap](docs/COMPLETE_ROADMAP.md) - Detailed 4-week plan
- [🚀 Deployment Guide](docs/DEPLOYMENT.md) - Deploy to production

---

---

## 🚀 Quick Start

Get up and running in 2 hours:

```bash
# 1. Clone repo (already done)
cd smart-farm-hub

# 2. Setup Frontend
cd frontend
npm install
npm run dev
# Opens http://localhost:3000

# 3. Setup Backend (new terminal)
cd backend
npm install
npm run dev
# Opens http://localhost:5000

# 4. Setup Database
# Create MongoDB Atlas account and add connection string to .env
```

**Detailed guide:** See [docs/QUICK_START.md](docs/QUICK_START.md)

---

## ✨ Features

### Completed ✅
- [ ] User authentication
- [ ] Project structure & documentation

### In Development 🔄
- [ ] Crop Profit Dashboard
- [ ] What-If Simulator
- [ ] Government Schemes Matcher
- [ ] Market Price Predictor
- [ ] Digital Farm Twin

### Planned 📋
- [ ] Pest & Disease Map
- [ ] Input Cost Minimizer
- [ ] Irrigation Planner
- [ ] Climate Risk Shield
- [ ] Finance & Loan Optimizer
- [ ] Learning Hub
- [ ] Chat Advisor
- [ ] Multilingual Support
- [ ] Offline-First Mode

---

## 🏗️ Project Structure

```
smart-farm-hub/
├── frontend/                 # Next.js React app
│   ├── public/
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/             # Utilities & API calls
│   │   ├── hooks/           # Custom hooks
│   │   └── i18n/            # Translations
│   ├── package.json
│   └── .env.local
│
├── backend/                  # Express API server
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── models/          # Mongoose schemas
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Auth, validation
│   │   ├── services/        # Data services
│   │   └── config/          # Database config
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── docs/                     # Documentation
│   ├── QUICK_START.md       # Get started guide
│   ├── COMPLETE_ROADMAP.md  # Detailed roadmap
│   ├── API_DOCS.md          # API reference
│   ├── DATABASE_SCHEMA.md   # DB design
│   ├── FEATURE_SPECS.md     # Feature details
│   └── DEPLOYMENT.md        # Deploy guide
│
└── README.md               # This file
```

---

## 💻 Tech Stack

### Frontend
- **Framework:** Next.js 14 (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Charts:** Recharts
- **Maps:** Leaflet
- **State Management:** Zustand
- **HTTP Client:** Axios
- **i18n:** react-i18next
- **Hosting:** Vercel

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** JavaScript/TypeScript
- **Database:** MongoDB
- **ORM:** Mongoose
- **Authentication:** JWT + Bcrypt
- **API:** REST (GraphQL optional)
- **Hosting:** Railway/Render/AWS

### Optional (For Advanced Features)
- **ML:** Python FastAPI
- **Chat AI:** OpenAI ChatGPT API
- **Maps:** Mapbox GL
- **Email:** Nodemailer
- **File Storage:** AWS S3
- **Caching:** Redis

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB (free cloud at mongodb.com)
- Git

### Step 1: Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

### Step 2: Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with MongoDB URI and other config
npm run dev
```

### Step 3: Database Setup
1. Go to [mongodb.com](https://mongodb.com)
2. Create free account
3. Create cluster
4. Copy connection string
5. Update `backend/.env` with your URI

---

## 🔧 Development

### Running Locally
```bash
# Terminal 1: Frontend
cd frontend && npm run dev

# Terminal 2: Backend
cd backend && npm run dev

# Open http://localhost:3000
```

### Project Commands

**Frontend:**
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Lint code
```

**Backend:**
```bash
npm run dev      # Start with nodemon
npm start        # Run production
npm run seed     # Seed database (if available)
```

### Adding Dependencies
```bash
# Frontend
cd frontend && npm install package-name

# Backend
cd backend && npm install package-name
```

### Git Workflow
```bash
# Create branch
git checkout -b feature/your-feature

# Make changes
git add .
git commit -m "Add feature description"

# Push to GitHub
git push origin feature/your-feature

# Create PR on GitHub
```

---

## 📚 Documentation

- **[QUICK_START.md](docs/QUICK_START.md)** - Get started in 2 hours
- **[COMPLETE_ROADMAP.md](docs/COMPLETE_ROADMAP.md)** - Full development guide
- **[API_DOCS.md](docs/API_DOCS.md)** - Complete API reference
- **[DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)** - Database design
- **[FEATURE_SPECS.md](docs/FEATURE_SPECS.md)** - Feature specifications
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deploy to production

---

## 🌐 API Documentation

### Base URL
- **Development:** `http://localhost:5000/api`
- **Production:** `https://smartfarmhub.com/api`

### Key Endpoints

**Authentication:**
```
POST   /auth/register           # Create farmer account
POST   /auth/login              # Login
POST   /auth/logout             # Logout
```

**Crops:**
```
GET    /crops                   # List crops
GET    /crops/:id               # Single crop
POST   /crops/compare           # Compare crops
GET    /recommendations/crop    # Get recommendation
POST   /recommendations/simulate # What-if simulator
```

**Schemes:**
```
GET    /schemes/eligible        # Get eligible schemes
GET    /schemes/:id             # Scheme details
POST   /schemes/:id/apply       # Apply for scheme
POST   /schemes/missed-benefits # Calculate missed
```

**Market:**
```
GET    /market/prices           # Current prices
GET    /market/trend/:crop      # Price history
POST   /market/predict-price    # Price prediction
```

**Full API Reference:** See [docs/API_DOCS.md](docs/API_DOCS.md)

---

## 🚀 Deployment

### Deploy Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Deploy Backend (Railway/Render)
1. Push code to GitHub
2. Connect repo to Railway/Render
3. Set environment variables
4. Deploy automatically

### Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/smartfarm
NODE_ENV=production
JWT_SECRET=your-secret-key
```

**Full guide:** See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 📊 Database

MongoDB Collections:
- `farmers` - User profiles
- `crops` - Crop data
- `marketprices` - Market prices
- `schemes` - Government schemes
- `pests` - Pest alerts
- `soil` - Soil health data
- `weather` - Weather forecasts
- `irrigation` - Irrigation schedules
- `loans` - Loan options
- `inputs` - Fertilizer/seed shops

**Schema Details:** See [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)

---

## 🎯 Roadmap

### Phase 1 (Week 1) - MVP
- ✅ Project setup
- 🔄 Crop Dashboard
- 🔄 What-If Simulator
- 🔄 Government Schemes
- 🔄 Market Prices

### Phase 2 (Week 2) - Core Features
- Digital Farm Twin
- Pest & Disease Map
- Input Cost Minimizer
- Irrigation Planner

### Phase 3 (Week 3) - Advanced
- Climate Risk Shield
- Finance Optimizer
- Learning Hub
- Chat Advisor

### Phase 4 (Week 4) - Polish
- Multilingual support
- Offline-first mode
- Testing & optimization
- Deployment

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/new-feature`
5. Open Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint config
- Keep components small and reusable
- Add comments for complex logic

---

## 🐛 Troubleshooting

**Frontend won't start?**
```bash
cd frontend
rm -r node_modules package-lock.json
npm install
npm run dev
```

**Backend connection error?**
- Check MongoDB URI in `.env`
- Verify MongoDB cluster is running
- Check port 5000 is available

**CORS errors?**
- Make sure backend has `cors` middleware
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend is running on correct port

**More help:** Check [docs/QUICK_START.md](docs/QUICK_START.md#troubleshooting)

---

## 📝 License

This project is proprietary and part of Accelerate Hackathon 2024.

---

## 📞 Contact

**Team Lead:** [Your Name]  
**Repository:** https://github.com/gshreeskandaupadya-boop/Hackathon  
**Branch:** dev_sriskanda

---

## 🙏 Acknowledgments

- Indian farmers for inspiring this solution
- Government of India for agriculture schemes
- Open-source community for amazing tools

---

**Happy Coding! 🚀** 

Start with [QUICK_START.md](docs/QUICK_START.md) for the first 2 hours of development.
