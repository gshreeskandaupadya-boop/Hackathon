# 🚀 LOCAL DEVELOPMENT STARTUP GUIDE

**Start Frontend & Backend Locally**

---

## ✅ REQUIREMENTS

Before starting, make sure you have:

- [ ] Node.js 18+ installed (https://nodejs.org/)
- [ ] npm installed (comes with Node.js)
- [ ] MongoDB running locally OR MongoDB Atlas connection string
- [ ] Code editor (VS Code recommended)

**Check if Node.js is installed:**
```powershell
node --version
npm --version
```

---

## 📋 SETUP (One-time only)

### Step 1: Install Backend Dependencies
```powershell
cd c:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\backend
npm install
```

### Step 2: Install Frontend Dependencies
```powershell
cd c:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\frontend
npm install
```

---

## ▶️ STARTING THE APPLICATION

### Option 1: Start Both Services (Recommended)

**Terminal 1 - Start Backend:**
```powershell
cd c:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\backend
npm run dev
```

Expected output:
```
🚀 Smart Farm Hub Backend
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Server running on port 5000
API: http://localhost:5000/api
Health: http://localhost:5000/api/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Terminal 2 - Start Frontend:**
```powershell
cd c:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\frontend
npm run dev
```

Expected output:
```
> next dev

  ▲ Next.js (version)
  - Local: http://localhost:3000
  - Environments: .env.local
```

---

## 🌐 ACCESS THE APP

Once both services are running:

- **Frontend:** Open http://localhost:3000 in your browser
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## ✔️ VERIFY CONNECTION

### Test 1: Check Backend Health
```powershell
# In PowerShell, you can test with:
Invoke-WebRequest http://localhost:5000/api/health

# Or in browser, open:
# http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "message": "Backend is working!",
  "timestamp": "2025-11-21T12:00:00.000Z",
  "mongodb": "using mock data"
}
```

### Test 2: Check Frontend Loads
- Open http://localhost:3000
- Should see the landing page
- No red errors in browser console (F12)

### Test 3: Test API Connection
1. On the frontend, navigate to any page
2. Open browser console (F12)
3. Check Network tab
4. Look for API calls to `http://localhost:5000/api/...`
5. Should show 200 (success) status codes

---

## 📊 CONFIGURATION

### Frontend Configuration
**File:** `frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend Configuration
**File:** `backend/.env`
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smartfarm
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:3000
```

---

## 🆘 TROUBLESHOOTING

### Issue: "npm: The term 'npm' is not recognized"
**Solution:** Node.js is not installed or not in PATH
```
1. Install Node.js: https://nodejs.org/
2. Restart your terminal
3. Run: npm --version
```

### Issue: Port 3000 or 5000 already in use
**Solution:** Change the port or kill the process
```powershell
# For backend (change PORT in .env):
PORT=5001 npm run dev

# For frontend (Next.js uses 3000 by default):
npm run dev -- -p 3001
```

### Issue: Frontend shows blank page
**Solution:** 
1. Check browser console (F12) for errors
2. Check that backend is running
3. Check `frontend/.env.local` has correct API URL
4. Restart both services

### Issue: "Cannot GET /api/crops" error
**Solution:**
1. Make sure backend is running on port 5000
2. Check CORS is properly configured
3. Check that `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue: MongoDB Connection Error
**Solution:**
1. Start MongoDB locally:
   ```
   mongod
   ```
2. Or use MongoDB Atlas connection string in `.env`
3. If not needed, backend uses mock data automatically

---

## 📁 PROJECT STRUCTURE

```
smart-farm-hub/
├── frontend/                 (Next.js - Port 3000)
│   ├── src/
│   │   ├── app/             (Pages)
│   │   ├── components/      (React Components)
│   │   └── lib/
│   │       ├── api.ts       (API client - connects to backend)
│   │       └── store.ts     (State management)
│   ├── .env.local           (Frontend config)
│   └── package.json
│
├── backend/                 (Express - Port 5000)
│   ├── src/
│   │   ├── server.ts        (Main server)
│   │   ├── models.ts        (Database schemas)
│   │   └── services/        (Business logic)
│   ├── .env                 (Backend config)
│   └── package.json
│
└── docs/                    (Documentation)
```

---

## 🔄 HOW FRONTEND CONNECTS TO BACKEND

### Flow:
1. **Frontend** (Port 3000) makes HTTP request to **Backend** (Port 5000)
2. **Backend** handles request, queries MongoDB or returns mock data
3. **Backend** sends JSON response back to **Frontend**
4. **Frontend** displays data in React components

### Example - Getting Crops:
```typescript
// Frontend: src/lib/api.ts
export const cropAPI = {
  getAll: () => api.get('/crops'),
  // ...
};

// When you call cropAPI.getAll():
// 1. Makes request to: http://localhost:5000/api/crops
// 2. Backend receives at: app.get('/api/crops', ...)
// 3. Returns crops data
// 4. Frontend receives and displays
```

---

## 🎯 COMMON TASKS

### Restart Backend Only
```powershell
# In backend terminal: Ctrl+C to stop
# Then:
npm run dev
```

### Restart Frontend Only
```powershell
# In frontend terminal: Ctrl+C to stop
# Then:
npm run dev
```

### Clear Node Modules (if issues occur)
```powershell
# Backend:
cd backend
rm -r node_modules package-lock.json
npm install

# Frontend:
cd frontend
rm -r node_modules package-lock.json
npm install
```

### View Console Logs
**Backend logs:** Visible in Terminal 1 (backend terminal)
**Frontend logs:** Visible in Terminal 2 (frontend terminal)
**Browser logs:** F12 → Console tab

---

## ✨ DEVELOPMENT WORKFLOW

1. **Start both services** (as shown above)
2. **Edit code** in your editor
3. **Frontend hot-reloads** automatically (you see changes instantly)
4. **Backend hot-reloads** automatically if using `npm run dev`
5. **Check browser console** (F12) for any errors
6. **Test features** in the app

---

## 📝 ENVIRONMENT VARIABLES EXPLAINED

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# ^^ This tells frontend where to find the backend API
```

### Backend (`backend/.env`)
```
PORT=5000                                    # Server port
NODE_ENV=development                         # Environment mode
MONGODB_URI=mongodb://localhost:27017/smartfarm  # Database connection
JWT_SECRET=your-secret-key-here             # For user authentication
CORS_ORIGIN=http://localhost:3000           # Allow requests from frontend
```

---

## 🎉 YOU'RE READY!

Your local development environment is set up. You can now:

✅ Start frontend and backend  
✅ They automatically connect via localhost  
✅ Make changes and see them instantly  
✅ Test features locally before deploying  

---

## 📞 NEED HELP?

**Backend not starting?**
- Check: `npm install` succeeded
- Check: PORT 5000 is not in use
- Check: `backend/.env` exists with correct values

**Frontend not loading?**
- Check: `npm install` succeeded
- Check: Backend is running on port 5000
- Check: `frontend/.env.local` has correct API URL
- Clear cache: Ctrl+Shift+Delete

**API calls failing?**
- Check console (F12) for error messages
- Check that backend is running
- Check CORS configuration in backend
- Verify both services on correct ports

---

**Ready to start? Follow the "STARTING THE APPLICATION" section above! 🚀**

*Last Updated: November 21, 2025*
