# ⚡ Quick Start - Deploy in 5 Steps

**Total Time: ~1 hour**

---

## Step 1: Setup Database (10 min)

**Go to:** https://www.mongodb.com/cloud/atlas

```
1. Sign up with email
2. Create Project: "Smart Farm Hub"
3. Create Free Cluster
4. Create Database User (smartfarm/password)
5. Whitelist IP (Allow from Anywhere)
6. Get Connection String
7. Save as: mongodb+srv://smartfarm:password@cluster0.xxx.mongodb.net/smartfarm?retryWrites=true
```

---

## Step 2: Push Code to GitHub (5 min)

```powershell
cd c:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub

git status
git add .
git commit -m "Smart Farm Hub - Ready for deployment"
git push origin main

# If repo not created yet:
# Create on GitHub, then:
# git remote add origin https://github.com/YOUR_USERNAME/smart-farm-hub.git
# git branch -M main
# git push -u origin main
```

---

## Step 3: Deploy Frontend (10 min)

**Go to:** https://vercel.com

```
1. Sign up with GitHub
2. Click "New Project"
3. Import your smart-farm-hub repository
4. Root Directory: frontend
5. Environment Variables:
   NEXT_PUBLIC_API_URL=https://your-backend-url/api
   (Update this after step 4)
6. Click Deploy
7. Wait for build (~2-3 min)
8. Copy Vercel URL
```

---

## Step 4: Deploy Backend (15 min)

**Go to:** https://railway.app

```
1. Sign up with GitHub
2. Click "New Project"
3. Select "GitHub Repo"
4. Choose your repository
5. Railway auto-detects it's a Node.js project
6. Go to Variables tab
7. Add:
   - MONGODB_URI=mongodb+srv://smartfarm:password@cluster...
   - NODE_ENV=production
   - PORT=5000
   - JWT_SECRET=generate-random-string
   - CORS_ORIGIN=https://your-vercel-url.vercel.app
8. Go to Settings
9. Build Command: npm install && npm run build
10. Start Command: npm run start
11. Wait for deployment (5-10 min)
12. Copy Railway Backend URL
```

---

## Step 5: Connect Frontend to Backend (5 min)

**Go to:** Vercel Dashboard → Your Project

```
1. Settings → Environment Variables
2. Update NEXT_PUBLIC_API_URL to your Railway URL
3. Save
4. Go to Deployments
5. Click "Redeploy" on latest build
6. Wait for build (1-2 min)
```

---

## ✅ Verify Deployment

**Open your Vercel URL in browser:**

```
✓ Page loads without errors
✓ Navigation works
✓ Can sign up and log in
✓ Crop page loads
✓ Weather data shows
✓ Pest alerts visible
✓ Multi-language works (EN/KA/HI)
✓ Console has no red errors
```

**Test Backend API:**

```
Open in browser:
https://your-railway-url/api/health

Should see:
{"status":"ok"}
```

---

## 🎉 You're Live!

Your app is now deployed! Share these URLs:

- **Frontend:** `https://your-vercel-url.vercel.app`
- **Backend API:** `https://your-railway-url/api`
- **Database:** MongoDB Atlas (connection verified)

---

## 🆘 Issues?

**Blank page?** Check browser console (F12) for API errors

**API errors?** Verify CORS_ORIGIN in Railway backend matches Vercel URL

**Can't connect to DB?** Check IP whitelist in MongoDB Atlas

**Build failed?** Check logs in Vercel/Railway dashboard

---

**Next:** See `COMPLETE_DEPLOYMENT_READY.md` for detailed troubleshooting
