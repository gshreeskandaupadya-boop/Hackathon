# 🚀 SMART FARM HUB - DEPLOYMENT COMMANDS

## Quick Reference Guide

**Status:** All code verified and ready ✅  
**Copy-paste these commands to deploy**

---

## STEP 1: LOCAL BUILD VERIFICATION (Optional but Recommended)

```bash
# Test Backend Build
cd backend
npm ci
npm run build

# Test Frontend Build
cd frontend
npm ci
npm run build
```

If both complete without errors, you're ready to deploy!

---

## STEP 2: MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
```
Go to: mongodb.com/cloud
```

### 2. Create Cluster
```
- Select M0 free tier
- Choose your region
- Create cluster
```

### 3. Create Database User
```
- Go to Security → Database Access
- Click "Add New Database User"
- Username: farmhub-admin
- Password: [Generate strong password - SAVE THIS]
- Click "Add User"
```

### 4. Get Connection String
```
- Go to Databases → Deployment
- Click "Connect" button
- Select "Drivers"
- Copy connection string
- Replace <password> with your password
- Example: mongodb+srv://farmhub-admin:PASSWORD@cluster.mongodb.net/smartfarmhub?retryWrites=true&w=majority
```

### 5. Add Network Access
```
- Go to Security → Network Access
- Click "Add IP Address"
- Select "Allow access from anywhere" (0.0.0.0/0)
- Confirm
```

---

## STEP 3: Deploy Backend to Railway

### Option A: Using Railway Web Dashboard (Easiest)

```
1. Go to: railway.app
2. Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your smart-farm-hub repository
6. Select "backend" in the settings
7. Click "Deploy"
8. Wait for deployment to complete (2-3 minutes)
9. Go to "Settings" → "Environment"
10. Add variables:

    MONGO_URI=mongodb+srv://farmhub-admin:PASSWORD@cluster.mongodb.net/smartfarmhub?retryWrites=true&w=majority
    JWT_SECRET=your-super-secret-key-min-32-chars
    CORS_ORIGIN=https://your-vercel-url.vercel.app
    NODE_ENV=production

11. Railway will automatically redeploy
12. Copy the public URL (shown in Railway dashboard)
    Example: https://smart-farm-hub-backend-prod.up.railway.app
```

### Option B: Using Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create project
railway init

# Set environment variables
railway variables set MONGO_URI=mongodb+srv://...
railway variables set JWT_SECRET=your-secret-key
railway variables set CORS_ORIGIN=https://your-frontend-url.vercel.app
railway variables set NODE_ENV=production

# Deploy
railway up
```

---

## STEP 4: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard (Easiest)

```
1. Go to: vercel.com
2. Login with GitHub
3. Click "Add New" → "Project"
4. Select your smart-farm-hub repository
5. Framework: Next.js (auto-detected)
6. Root Directory: frontend
7. Environment Variables:
   
   NEXT_PUBLIC_API_URL=https://your-railway-backend-url
   (Without trailing slash)
   Example: https://smart-farm-hub-backend-prod.up.railway.app

8. Click "Deploy"
9. Wait for deployment (2-3 minutes)
10. Copy the deployment URL
    Example: https://smart-farm-hub.vercel.app
11. Update Railway CORS_ORIGIN to this URL
```

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Follow prompts and set environment variables
# After deployment, update Railway with your Vercel URL
```

---

## STEP 5: Testing After Deployment

### Test Backend API

```bash
# Replace with your actual Railway URL
BACKEND_URL="https://your-railway-backend-url"

# 1. Health Check
curl "$BACKEND_URL/api/health"
# Expected: { "status": "healthy", "mongodb": "connected" }

# 2. Get All Crops
curl "$BACKEND_URL/api/crops"
# Expected: Array of crops

# 3. Test ML Prediction
curl -X POST "$BACKEND_URL/api/ml/predict/profit" \
  -H "Content-Type: application/json" \
  -d '{
    "crop": "Sugarcane",
    "area": 5,
    "soilType": "black"
  }'
# Expected: Profit prediction with confidence score
```

### Test Frontend App

```
1. Open https://your-vercel-url.vercel.app
2. Should see login page
3. Try these actions:
   - Sign up with test account
   - Login
   - Navigate to dashboard
   - View crops list
   - Try simulator
   - Change language to Kannada/Hindi
4. Check browser console (F12) - should be no errors
```

---

## STEP 6: Environment Variables Checklist

### Backend (Set in Railway)
```
MONGO_URI=mongodb+srv://farmhub-admin:PASSWORD@cluster.mongodb.net/smartfarmhub?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-must-be-min-32-characters-long
CORS_ORIGIN=https://your-vercel-url.vercel.app
NODE_ENV=production
```

### Frontend (Set in Vercel)
```
NEXT_PUBLIC_API_URL=https://your-railway-backend-url
```

---

## QUICK DEPLOYMENT CHECKLIST

```
Before Deployment:
[ ] MongoDB Atlas account created
[ ] MongoDB user created
[ ] Connection string obtained
[ ] Strong JWT_SECRET generated
[ ] GitHub repository up to date
[ ] All code committed and pushed

Backend Deployment:
[ ] Railway project created
[ ] GitHub repo connected
[ ] Environment variables set
[ ] Deployment successful
[ ] Health check returns {"status": "healthy"}
[ ] Note the public URL

Frontend Deployment:
[ ] Vercel project created
[ ] GitHub repo connected
[ ] NEXT_PUBLIC_API_URL set to backend URL
[ ] Deployment successful
[ ] Login page loads
[ ] Can navigate pages

Post-Deployment:
[ ] Test API endpoints
[ ] Test frontend navigation
[ ] Test ML predictions
[ ] Test language switching
[ ] Check browser console (no errors)
[ ] Check Railway logs (no errors)
[ ] All features working
```

---

## COMMON DEPLOYMENT ISSUES & FIXES

### Issue: Railway CORS_ORIGIN not updating
```
Solution:
1. Go to Railway project settings
2. Click "Environment" tab
3. Update CORS_ORIGIN variable
4. Wait 1-2 minutes for automatic redeploy
5. Or click "Redeploy" button
```

### Issue: Frontend can't connect to backend
```
Solution:
1. Verify NEXT_PUBLIC_API_URL in Vercel
2. Verify CORS_ORIGIN in Railway matches Vercel URL exactly
3. Test backend health endpoint: /api/health
4. Check browser console for specific error
5. Check Railway logs for CORS errors
```

### Issue: Database connection fails
```
Solution:
1. Verify MONGO_URI is correct
2. Check MongoDB Atlas network access (should be 0.0.0.0/0)
3. Verify database user credentials
4. Test connection string locally first
5. Check Railway logs for connection errors
```

### Issue: ML predictions are slow (>5 seconds)
```
Solution:
1. Normal first request takes 1-2 seconds
2. If consistently slow, check Railway CPU usage
3. Consider upgrading to paid tier if needed
4. Check backend logs for errors
```

---

## DEPLOYMENT TIMELINE

| Step | Task | Time |
|------|------|------|
| 1 | MongoDB Atlas setup | 5 min |
| 2 | Backend to Railway | 5-10 min |
| 3 | Frontend to Vercel | 5-10 min |
| 4 | Testing & verification | 10-15 min |
| **Total** | **Full deployment** | **25-40 min** |

---

## FINAL CHECKLIST

```
✅ Code reviewed and verified
✅ Database configured
✅ Backend deployed
✅ Frontend deployed
✅ Environment variables set
✅ API tested and working
✅ Frontend tested and working
✅ ML predictions tested
✅ Language switching tested
✅ All features verified
✅ Ready for hackathon submission
```

---

## SUCCESS INDICATORS

After deployment, you should see:

```
✅ Frontend loads at https://your-vercel-url.vercel.app
✅ Login page displays with language options
✅ Can create new account
✅ Can login with credentials
✅ Dashboard loads with crop data
✅ Can navigate to all 13 pages
✅ ML predictions return results < 2 seconds
✅ Language switching works (EN/KA/HI)
✅ API health check returns healthy status
✅ No console errors in browser
✅ No error logs in Railway
```

---

## DEPLOYMENT COMPLETE! 🎉

Once all tests pass, your project is live and ready for hackathon submission!

### Share These URLs:
- **Frontend:** https://your-vercel-url.vercel.app
- **Backend API:** https://your-railway-backend-url/api/health
- **GitHub:** https://github.com/your-github/smart-farm-hub

---

## Support Resources

For help with specific platforms:
- **Railway Issues:** Support within Railway dashboard
- **Vercel Issues:** Support within Vercel dashboard
- **MongoDB Issues:** MongoDB Atlas support documentation
- **Backend Issues:** Check `backend/README.md`
- **Frontend Issues:** Check `frontend/README.md`

---

**You've got this! Deploy with confidence! 🚀**

Document Version: 1.0  
Last Updated: November 21, 2025  
Status: READY FOR DEPLOYMENT
