# ⚠️ Node.js Installation & Setup Guide

**Node.js has been installed successfully!**  
**Node v25.2.1 & npm 11.6.2 are ready to use**

---

## ✅ STATUS

- ✅ Node.js v25.2.1 installed
- ✅ npm 11.6.2 installed
- ✅ Backend dependencies installed
- ⏳ PowerShell needs configuration to recognize npm/node

---

## 🚀 QUICK START

### Option 1: Use the Batch Files (EASIEST) ⭐

**For Backend:**
1. Double-click: `backend\START_BACKEND.bat`
2. Backend starts at: http://localhost:5000/api

**For Frontend:**
1. Double-click: `frontend\START_FRONTEND.bat`
2. Frontend starts at: http://localhost:3000

**Setup Environment First (optional):**
1. Double-click: `SETUP_ENVIRONMENT.bat`
2. This sets up both frontend and backend

---

### Option 2: Use Command Prompt (Windows CMD)

**Start Backend:**
```cmd
cd C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\backend
npm run dev
```

**Start Frontend (in another CMD window):**
```cmd
cd C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\frontend
npm run dev
```

---

### Option 3: Use PowerShell (with manual PATH)

**Start Backend:**
```powershell
cd "C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\backend"
$env:Path = "C:\Program Files\nodejs;$env:Path"
npm run dev
```

**Start Frontend:**
```powershell
cd "C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\frontend"
$env:Path = "C:\Program Files\nodejs;$env:Path"
npm run dev
```

---

## 🔧 PERMANENT FIX FOR POWERSHELL

To make `npm` and `node` work permanently in PowerShell, follow these steps:

### Step 1: Create PowerShell Profile

```powershell
# Check if profile exists
Test-Path $PROFILE

# Create profile if it doesn't exist
if (!(Test-Path $PROFILE)) { 
    New-Item -ItemType File -Path $PROFILE -Force 
}

# Edit the profile
notepad $PROFILE
```

### Step 2: Add Node.js to Profile

In Notepad, paste this at the end of the profile:

```powershell
# Add Node.js to PATH
$env:Path = "C:\Program Files\nodejs;$env:Path"

# Create alias for easy access
Set-Alias npm "C:\Program Files\nodejs\npm.cmd"
Set-Alias node "C:\Program Files\nodejs\node.exe"
```

### Step 3: Save and Reload

1. Save the file (Ctrl+S)
2. Close Notepad
3. Close and reopen PowerShell
4. Test: `npm --version` (should work now!)

---

## 📋 VERIFICATION

Test that everything is working:

```powershell
# Test Node.js
node --version
# Should show: v25.2.1

# Test npm
npm --version
# Should show: 11.6.2

# Test in backend directory
cd "C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\backend"
npm list
# Should show installed packages
```

---

## 🚨 IF npm STILL DOESN'T WORK

Try these solutions:

### Solution 1: Restart PowerShell
- Close all PowerShell windows
- Open a new PowerShell window
- Try again

### Solution 2: Use Windows Terminal
- Install: https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701
- Open Windows Terminal
- Try: `npm --version`

### Solution 3: Use Command Prompt Instead
- Press: Win+R
- Type: `cmd`
- Try: `npm run dev`

### Solution 4: Reinstall Node.js
```powershell
# Open PowerShell as Administrator
winget uninstall OpenJS.NodeJS
winget install OpenJS.NodeJS
```

Then restart your computer and try again.

---

## 📖 HOW TO START YOUR APP

### Method A: Batch Files (Recommended)

Double-click these files in Windows Explorer:

1. **Start Backend First:**
   - `C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\backend\START_BACKEND.bat`
   - Wait for it to say "Server running on port 5000"

2. **Start Frontend (new window):**
   - `C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\frontend\START_FRONTEND.bat`
   - Wait for it to say "ready - started server on 0.0.0.0:3000"

3. **Open browser:**
   - Go to: http://localhost:3000

---

### Method B: Manual Terminal

**Terminal 1 - Backend:**
```cmd
cd C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\backend
npm run dev
```

**Terminal 2 - Frontend:**
```cmd
cd C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\frontend
npm run dev
```

**Then visit:** http://localhost:3000

---

## ✅ SUCCESS INDICATORS

When running correctly, you should see:

**Backend terminal:**
```
🚀 Smart Farm Hub Backend
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Server running on port 5000
API: http://localhost:5000/api
Health: http://localhost:5000/api/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Frontend terminal:**
```
> next dev

  ▲ Next.js (version)
  - Local: http://localhost:3000
```

**Browser:**
- Page loads at http://localhost:3000
- No console errors (F12 to check)

---

## 🎯 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| "npm is not recognized" | Use `SETUP_ENVIRONMENT.bat` or restart PowerShell |
| Port 5000 already in use | Change backend PORT in `.env` |
| Port 3000 already in use | Run: `npm run dev -- -p 3001` |
| Blank page on frontend | Check console (F12), ensure backend is running |
| API errors in console | Check backend is running on port 5000 |
| "Cannot find module" | Run: `npm install` in that directory |

---

## 📁 BATCH FILES CREATED FOR YOU

You now have these convenient batch files:

1. **`SETUP_ENVIRONMENT.bat`** (root directory)
   - Sets up everything
   - Installs dependencies
   - Shows instructions

2. **`backend/START_BACKEND.bat`**
   - Starts backend instantly
   - Auto-installs if needed
   - Sets up PATH automatically

3. **`frontend/START_FRONTEND.bat`**
   - Starts frontend instantly
   - Auto-installs if needed
   - Sets up PATH automatically

---

## ⚡ RECOMMENDED WORKFLOW

1. **Double-click** `SETUP_ENVIRONMENT.bat` (first time only)
   - This installs all dependencies

2. **Double-click** `backend/START_BACKEND.bat`
   - Backend starts and listens on port 5000

3. **Double-click** `frontend/START_FRONTEND.bat` (in another window)
   - Frontend starts and listens on port 3000

4. **Open browser:** http://localhost:3000

5. **Edit code** - both services hot-reload automatically

---

## 🎓 WHAT WAS INSTALLED

```
Node.js v25.2.1
├─ Includes: node executable
├─ Includes: npm package manager
└─ Installed to: C:\Program Files\nodejs

Your Project Dependencies:
├─ Backend: 156 packages (already installed)
└─ Frontend: (will be installed when you start)
```

---

## 🚀 YOU'RE ALL SET!

**Your environment is ready to go!**

- ✅ Node.js installed
- ✅ npm installed
- ✅ Dependencies installed
- ✅ Batch scripts created
- ✅ Ready to code!

**Next Step:** Double-click `SETUP_ENVIRONMENT.bat` or `backend/START_BACKEND.bat` to begin!

---

*Last Updated: November 21, 2025*
