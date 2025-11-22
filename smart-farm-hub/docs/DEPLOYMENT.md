# 🚀 Deployment Guide

Complete instructions to deploy Smart Farm Hub to production.

---

## Deployment Checklist

- [ ] Code is tested and working
- [ ] All environment variables configured
- [ ] Database is set up and accessible
- [ ] Frontend environment variables set
- [ ] Backend environment variables set
- [ ] GitHub repository is up to date
- [ ] Git branch is clean (no uncommitted changes)

---

## Option A: Deploy Frontend to Vercel (Recommended)

Vercel is the easiest option for Next.js apps.

### Step 1: Prepare Frontend
```bash
# Make sure frontend builds without errors
cd frontend
npm run build
# Should complete successfully
```

### Step 2: Install Vercel CLI
```powershell
npm install -g vercel
```

### Step 3: Deploy
```powershell
cd frontend
vercel
```

Follow prompts:
- Project setup: Create new project
- Framework: Next.js
- Directory: `./` (current)
- Build settings: Accept defaults

### Step 4: Set Environment Variables
In Vercel Dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Add:
   ```
   NEXT_PUBLIC_API_URL=https://smartfarmhub-api.railway.app/api
   ```
4. Redeploy

**Frontend Live:** https://your-project-name.vercel.app

---

## Option B: Deploy Backend to Railway.app (Recommended)

Railway is simple for Node.js backends.

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Authorize Railway to access your repos

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your Hackathon repository
4. Select `backend` folder (or root if backend is there)

### Step 3: Configure Environment Variables
1. In Railway dashboard, go to Variables
2. Add:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartfarm
   NODE_ENV=production
   JWT_SECRET=your-super-secret-key
   ```

### Step 4: Deploy
- Railway automatically deploys when you push to GitHub
- Watch the build logs
- Once deployed, get the URL from Railway dashboard

**Backend Live:** https://smartfarmhub-api.railway.app

---

## Option C: Deploy Backend to Render.com

Alternative to Railway, also simple.

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Create New Service
1. Click "New Service"
2. Select "Web Service"
3. Connect GitHub repository
4. Select your repo and `backend` branch

### Step 3: Configure
```
Name: smartfarm-api
Environment: Node
Build Command: npm install
Start Command: node server.js
```

### Step 4: Set Environment Variables
1. Environment tab
2. Add variables (same as Railway above)

### Step 5: Deploy
Click "Create Web Service" and wait for deployment.

---

## Option D: Deploy to AWS (Advanced)

For more control and scaling.

### Step 1: Create EC2 Instance
1. Go to AWS Console
2. Launch EC2 instance (Ubuntu 22.04)
3. Create security group allowing ports 22, 80, 443, 5000

### Step 2: SSH into Instance
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

### Step 3: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 4: Clone Repository
```bash
git clone https://github.com/yourusername/Hackathon.git
cd Hackathon/backend
```

### Step 5: Install and Setup
```bash
npm install
cp .env.example .env
# Edit .env with MongoDB URI and other config
nano .env
```

### Step 6: Run with PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 start server.js --name smartfarm-api
pm2 startup
pm2 save
```

### Step 7: Setup Nginx (Reverse Proxy)
```bash
sudo apt install nginx

# Edit nginx config
sudo nano /etc/nginx/sites-available/default

# Add this configuration:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

### Step 8: Setup SSL Certificate (Free)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Database Deployment (MongoDB Atlas)

MongoDB Atlas is already cloud-hosted and free! Just use it.

### Already Setup? ✅
If you already created MongoDB Atlas account:
1. Copy connection string
2. Add to environment variables
3. Done!

### Need Setup?
1. Go to https://mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster
4. Get connection string
5. Update `.env` files

---

## Domain Setup (Optional)

### Custom Domain
1. Purchase domain from Namecheap, GoDaddy, etc.
2. Point to Vercel (for frontend)
3. Point to Railway/Render (for backend)

### Vercel Custom Domain
1. Settings → Domains
2. Add your domain
3. Update DNS records (Vercel shows instructions)

### Railway Custom Domain
1. Settings → Custom Domain
2. Add domain
3. Update DNS records

---

## CI/CD Pipeline (GitHub Actions)

Automatic deployment on push!

### Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches:
      - dev_sriskanda
      - main

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: vercel/actions/next@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g railway
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### Setup Secrets:
1. Go to GitHub repo → Settings → Secrets
2. Add VERCEL_TOKEN, RAILWAY_TOKEN, etc.

---

## Monitoring & Maintenance

### Vercel Monitoring
- Go to Vercel dashboard
- View logs in "Function Logs"
- Monitor performance in "Analytics"

### Railway/Render Monitoring
- Check application logs
- Monitor CPU/Memory usage
- Set up alerts for crashes

### Database Monitoring
- MongoDB Atlas dashboard
- Monitor storage usage
- View operation metrics

---

## Scaling (If Traffic Increases)

### Frontend
- Vercel automatically scales
- Use CDN for images
- Optimize bundle size

### Backend
- Railway/Render auto-scales
- Add database indexes for performance
- Use caching (Redis)
- Consider load balancing

### Database
- MongoDB Atlas auto-scales
- Can upgrade plan for more storage
- Consider sharding for very large data

---

## Troubleshooting Deployment

**Build fails?**
```bash
# Test locally first
npm install
npm run build
npm start
```

**Environment variable not working?**
- Make sure variable is set in hosting platform
- Restart application after adding variables
- Check variable name spelling

**Database connection error?**
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Verify credentials

**Slow performance?**
- Check backend logs for errors
- Monitor database query performance
- Enable caching
- Optimize API responses

**CORS still failing?**
- Make sure frontend URL is in backend CORS config
- Check headers are being set correctly
- Verify API URL in frontend .env

---

## Production Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway/Render
- [ ] Environment variables set correctly
- [ ] Database is accessible
- [ ] HTTPS enabled (SSL certificate)
- [ ] Custom domain configured (optional)
- [ ] CI/CD pipeline working
- [ ] Monitoring set up
- [ ] Error logging enabled
- [ ] Backups configured
- [ ] Team members have access
- [ ] Documentation updated

---

## Post-Deployment

### Monitor First Week
- Check error logs daily
- Monitor performance metrics
- Gather user feedback
- Fix critical bugs immediately

### Weekly Maintenance
- Review logs
- Update dependencies
- Monitor costs
- Backup database

### Monthly Review
- Performance analysis
- Cost optimization
- Feature usage analytics
- Plan improvements

---

## Cost Estimate (Monthly)

**Free Tier:**
- Vercel: Free (up to 100GB bandwidth)
- Railway: $5 (free credits)
- Render: Free (but limited)
- MongoDB Atlas: Free (512MB storage)
- **Total: ~$5/month**

**With Traffic:**
- Add Vercel Pro: $20/month
- Upgrade Railway: $10/month
- Upgrade MongoDB: $15+/month
- **Total: $45+/month**

---

**Your app is now live! 🎉**

Share your links:
- **Frontend:** [Your Vercel URL]
- **Backend:** [Your Railway URL]
- **API:** [Your Railway URL]/api
