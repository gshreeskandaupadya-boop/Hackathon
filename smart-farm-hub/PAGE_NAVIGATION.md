# 🗺️ Smart Farm Hub - PAGE NAVIGATION GUIDE

## All 13 Pages at a Glance

```
HOME ROUTES
└── http://localhost:3000
    ├── / (Landing Page)
    └── /dashboard (Dashboard)

FARMING TOOLS
├── /crops (Crop Browser)
├── /simulator (What-If Simulator)
├── /inputs (Input Cost Optimizer)
├── /irrigation (Irrigation Assistant)
├── /finance (Farm Finance Calculator)
└── /pests (Pest & Disease Alerts)

GOVERNMENT & MARKET
├── /schemes (Government Schemes)
└── /market (Mandi Prices & Market)

LEARNING & SUPPORT
├── /learn (Learning Hub)
└── /chat (24/7 Chat Assistant)

AUTHENTICATION
├── /auth/login (Login)
└── /auth/signup (Signup)
```

---

## PAGE DESCRIPTIONS

### 🏠 Landing Page (`/`)
**What:** Home page with hero section and project overview
**Features:** 
- Welcome message for new farmers
- Health check badge
- Navigation to all other pages
- Language switcher in header
**Best For:** First-time visitors

---

### 📊 Dashboard (`/dashboard`)
**What:** Overview of farmer's crops and recommendations
**Features:**
- List of crops with profit data
- Crop cards showing yield, water, risk
- API integration with crop data
- Click to view crop details
**Best For:** Quick overview of farm status

---

### 🌾 Crops Browser (`/crops`)
**What:** Browse and compare available crops
**Features:**
- Filter by risk level (Low/Medium/High)
- Sort by profit, yield, or risk
- Search functionality
- Detailed crop information
- Compare crops side-by-side
**Best For:** Crop selection planning

---

### 🎯 Simulator (`/simulator`)
**What:** What-if analysis tool for crop profitability
**Features:**
- Select up to 3 crops to compare
- Input land size (hectares)
- See profit comparisons
- View ROI percentages
- Compare costs vs revenue
- Water and yield requirements
**Best For:** Decision making on which crops to plant

---

### 💡 Input Optimizer (`/inputs`)
**What:** Minimize farming input costs
**Features:**
- Select your main crop
- Input your current input cost
- Get optimization recommendations
- See potential 25% savings
- Breakdown by input type (fertilizers, pesticides)
**Best For:** Cost reduction planning

---

### 💧 Irrigation Assistant (`/irrigation`)
**What:** Smart watering schedule for your crops
**Features:**
- Generate 12-month irrigation schedule
- View current weather data
- See rainfall vs needed irrigation
- Know irrigation frequency and timing
- Get water-saving tips
**Best For:** Water management efficiency

---

### 💰 Finance Calculator (`/finance`)
**What:** Farm financial planning and ROI analysis
**Features:**
- Input crop and land size
- Configure loan amount and interest rate
- See cost breakdown (initial, maintenance, harvest)
- View profit and ROI calculations
- Calculate monthly loan installments
- Analyze profit after loan repayment
**Best For:** Financial planning and loan decisions

---

### 📚 Learning Hub (`/learn`)
**What:** Educational courses on modern farming
**Features:**
- 6 premium courses (Soil, Pest, Water, Market, Tech, Organic)
- Filter by difficulty level (Beginner/Intermediate/Advanced)
- Course details including duration and instructor
- View topics covered in each course
- Enrollment capability
**Best For:** Skill development and knowledge building

---

### 🐛 Pests & Diseases (`/pests`)
**What:** Real-time pest and disease alerts
**Features:**
- Current pest alerts by location
- Risk probability percentage
- Severity indicators (Low/Medium/High)
- Affected crops identification
- Prevention and control measures
- Report sighting functionality
**Best For:** Pest management and prevention

---

### 🏛️ Government Schemes (`/schemes`)
**What:** Access government agricultural schemes and subsidies
**Features:**
- Check eligible schemes for your state
- View subsidy amounts
- See application deadlines
- View required documents
- Apply for schemes directly
- Identify missed benefit opportunities
**Best For:** Accessing government support and subsidies

---

### 📈 Market Intelligence (`/market`)
**What:** Real-time mandi prices and market analysis
**Features:**
- Current mandi prices for all crops
- Price predictions (24h, 7d, 14d)
- Historical price trends
- Best selling window recommendations
- Location-based mandi prices
- Profit if sold today calculations
**Best For:** Selling decisions and market timing

---

### 🤖 Chat Assistant (`/chat`)
**What:** 24/7 AI-powered farming advice bot
**Features:**
- Chat interface with messaging
- Suggested starting questions
- Intelligent responses based on keywords
- Message history with timestamps
- Help with crop selection, pest control, prices, irrigation, finance, soil
**Best For:** Quick questions and expert guidance anytime

---

### 🔐 Login (`/auth/login`)
**What:** Sign in with existing account
**Features:**
- Email and password login
- Demo credentials provided (demo@farm.com / demo123)
- JWT token storage
- Redirect to dashboard on success
- Link to signup page
**Best For:** Existing farmer accounts

---

### ✍️ Signup (`/auth/signup`)
**What:** Create new farmer account
**Features:**
- 3-step registration process
  - Step 1: Name, email, phone
  - Step 2: Password with confirmation
  - Step 3: Farm details (state, district, land size)
- Progress indicator
- Form validation
- Error messages
- Link to login page
**Best For:** New farmer registration

---

## 🎯 RECOMMENDED USER JOURNEY

### First-Time Visitor
1. Land on **Landing Page** (`/`)
2. Select language (En/Ka/Hi)
3. Click "Get Started"
4. Go to **Signup** to create account
5. Explore **Dashboard** to see mock crop data

### Returning Farmer (Decision Making)
1. **Login** to access account
2. Visit **Simulator** to compare crops
3. Check **Market** prices for current crops
4. Review **Schemes** for available subsidies
5. Use **Chat** for any quick questions

### Farmer (Cost Optimization)
1. **Crops Browser** to select crop
2. **Input Optimizer** to reduce costs
3. **Finance Calculator** to analyze ROI
4. **Schemes** to find subsidy programs

### Farmer (Risk Management)
1. **Pests** page for alerts
2. **Chat** for prevention advice
3. **Learning Hub** for detailed knowledge
4. **Irrigation** for water management

---

## 📱 MOBILE EXPERIENCE

All pages are **fully responsive**:
- ✅ Optimized for phones (320px+)
- ✅ Tablet-friendly layouts
- ✅ Desktop-enhanced features
- ✅ Touch-friendly buttons (48px minimum)
- ✅ Readable fonts at all sizes
- ✅ Mobile menu navigation

---

## 🌐 LANGUAGE SWITCHING

Available on every page via dropdown in Navigation:
- **English (en)** - Default
- **ಕನ್ನಡ (Kannada)** - Local language
- **हिंदी (Hindi)** - Regional language

All UI text updates immediately when language is changed.

---

## 🔗 DIRECT URLs

```
http://localhost:3000/                 → Landing
http://localhost:3000/dashboard        → Dashboard
http://localhost:3000/crops            → Crops
http://localhost:3000/simulator        → Simulator
http://localhost:3000/inputs           → Input Optimizer
http://localhost:3000/irrigation       → Irrigation
http://localhost:3000/finance          → Finance
http://localhost:3000/learn            → Learning Hub
http://localhost:3000/pests            → Pests & Diseases
http://localhost:3000/schemes          → Government Schemes
http://localhost:3000/market           → Market Intelligence
http://localhost:3000/chat             → Chat Assistant
http://localhost:3000/auth/login       → Login
http://localhost:3000/auth/signup      → Signup
```

---

## 💻 BACKEND ENDPOINTS

All pages use these API endpoints:

```
CROPS
GET /api/crops                  → Get all crops
GET /api/crops/:id              → Get single crop
POST /api/crops/compare         → Compare crops

RECOMMENDATIONS
POST /api/recommendations/crop      → Get recommendations
POST /api/recommendations/simulate  → Simulate crops

SCHEMES
GET /api/schemes/eligible           → Get eligible schemes
GET /api/schemes/:id                → Get scheme details
POST /api/schemes/:id/apply         → Apply for scheme
POST /api/schemes/missed-benefits   → Check missed schemes

MARKET
GET /api/market/prices              → Get mandi prices
GET /api/market/trend/:crop         → Price trends
POST /api/market/predict-price      → Price predictions
POST /api/market/best-mandi         → Find best mandi

WEATHER
GET /api/weather                    → Current weather
GET /api/weather/forecast           → 5-day forecast
GET /api/weather/alerts             → Weather alerts

PESTS
GET /api/pests/map                  → Pest map
GET /api/pests/:id                  → Pest details
POST /api/pests/report              → Report sighting

NEW FEATURES
POST /api/inputs/optimize           → Optimize inputs
POST /api/irrigation/schedule       → Generate schedule
POST /api/finance/analyze           → Analyze finances
POST /api/chat/message              → Chat with AI

HEALTH
GET /api/health                     → Server status
```

---

## ⚙️ CONFIGURATION

**Frontend Environment:** `frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend Environment:** `backend/.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartfarm
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

---

## 🆘 TROUBLESHOOTING

### Page Won't Load
1. Check backend is running: `npm run dev` in `backend/` folder
2. Check frontend is running: `npm run dev` in `frontend/` folder
3. Check console (F12) for errors
4. Clear browser cache: Ctrl+Shift+Del

### API Calls Failing
1. Verify backend is on http://localhost:5000
2. Check CORS_ORIGIN in backend/.env
3. Check NEXT_PUBLIC_API_URL in frontend/.env.local
4. Check MongoDB is running (if using real database)

### Language Not Changing
1. Refresh page after changing language
2. Check browser console for errors
3. Ensure Zustand store is initialized

### Mobile View Issues
1. Open DevTools (F12) and toggle device toolbar
2. Test on actual mobile device
3. Check viewport meta tag is present
4. Ensure CSS breakpoints are correct

---

## 📞 SUPPORT

For questions about specific pages:
- **Crop Data Issues**: Check `/crops` page
- **API Problems**: Check backend logs
- **UI Issues**: Check `/` landing page for instructions
- **Chat Not Working**: Check backend `/api/chat/message` endpoint
- **Forms Not Submitting**: Check console for validation errors

---

**Last Updated:** November 21, 2025  
**Status:** ✅ All 13 pages operational and documented
