# 🚀 Quick Start Guide (First 2 Hours)

## What You'll Do
Get a working Next.js + Express app with basic database connectivity.

---

## Step 1: Clone/Setup Repository (5 min)

You're already in: `C:\Users\ADMIN\OneDrive\Desktop\Accelerate`

Open PowerShell and run:
```powershell
cd C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub
```

---

## Step 2: Setup Frontend (30 min)

### 2.1 Create Next.js App
```powershell
cd frontend
npx create-next-app@latest . --typescript --tailwind --eslint
# Select options:
# - Use ESLint: Yes
# - Use Tailwind: Yes
# - Use App Router: Yes
# - Others: defaults
```

### 2.2 Install Additional Packages
```powershell
npm install axios zustand recharts leaflet react-i18next
```

### 2.3 Test Frontend
```powershell
npm run dev
```
Open browser: http://localhost:3000

You should see the Next.js welcome page. ✅

---

## Step 3: Setup Backend (30 min)

### 3.1 Create Express Server
```powershell
cd ../backend
npm init -y
```

### 3.2 Install Dependencies
```powershell
npm install express cors dotenv mongoose axios
npm install --save-dev nodemon typescript @types/express @types/node
```

### 3.3 Create `server.js`
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3.4 Update `package.json`
Add to "scripts":
```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

### 3.5 Create `.env`
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartfarm
NODE_ENV=development
```

### 3.6 Test Backend
```powershell
npm run dev
```
Open browser: http://localhost:5000/api/health

You should see: `{"message":"Backend is working!"}` ✅

---

## Step 4: Setup MongoDB (15 min)

### 4.1 Create Free MongoDB Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" → Fill form → Verify email
3. Create free cluster

### 4.2 Get Connection String
1. In Atlas, click "Connect"
2. Choose "Drivers" option
3. Copy the connection string
4. Replace `<password>` with your MongoDB password
5. Replace `smartfarm` with database name

### 4.3 Update Backend `.env`
```
MONGODB_URI=mongodb+srv://yourname:yourpassword@cluster.mongodb.net/smartfarm
```

### 4.4 Test Connection
In `server.js`, add before `app.listen()`:
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('MongoDB error:', err));
```

Restart backend - you should see: `MongoDB connected!` ✅

---

## Step 5: Connect Frontend to Backend (10 min)

### 5.1 Create API Service
Create `frontend/src/lib/api.ts`:
```typescript
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
});

export const healthCheck = () => API.get('/health');

export default API;
```

### 5.2 Update Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 5.3 Test Connection
Create `frontend/src/app/page.tsx`:
```typescript
'use client';
import { useEffect, useState } from 'react';
import { healthCheck } from '@/lib/api';

export default function Home() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    healthCheck()
      .then(res => setStatus(res.data.message))
      .catch(() => setStatus('Backend error'));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Smart Farm Hub</h1>
      <p className="text-xl">{status}</p>
    </main>
  );
}
```

Refresh frontend - you should see: `"Backend is working!"` ✅

---

## Step 6: You're Done! 🎉

You now have:
- ✅ Next.js frontend on http://localhost:3000
- ✅ Express backend on http://localhost:5000
- ✅ MongoDB database connected
- ✅ Frontend ↔ Backend communication working

---

## What's Next?

1. Read the `COMPLETE_ROADMAP.md` in the docs folder
2. Start building the dashboard (see Step 5 in roadmap)
3. Create database models for farmers, crops, schemes
4. Build out API endpoints
5. Create UI components in React

---

## Useful Commands

### Start Everything
```powershell
# Terminal 1: Frontend
cd frontend; npm run dev

# Terminal 2: Backend
cd backend; npm run dev
```

### Add New Dependencies
```powershell
# Frontend
cd frontend
npm install package-name

# Backend
cd backend
npm install package-name
```

### Commit to Git
```powershell
git add .
git commit -m "Initial setup with Next.js and Express"
git push origin dev_sriskanda
```

---

## Troubleshooting

**"Cannot find module 'express'"**
→ Run `npm install` in the backend folder

**"EADDRINUSE :::5000"**
→ Another app is using port 5000. Change PORT in `.env` to 5001

**"MongoDB connection error"**
→ Check your connection string and password in `.env`

**"CORS error"**
→ Make sure backend has `cors` middleware: `app.use(cors())`

**"Frontend can't reach backend"**
→ Check `NEXT_PUBLIC_API_URL` in `.env.local`

---

**You've got this! 🚀** Start with these steps, then tackle one feature at a time.
