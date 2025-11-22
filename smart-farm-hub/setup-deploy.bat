@echo off
REM Smart Farm Hub - Quick Deployment Setup Script (Windows)
REM Run this to prepare everything for deployment

title Smart Farm Hub - Deployment Setup
color 0A
cls

echo.
echo ====================================
echo    Smart Farm Hub - Deployment Setup
echo ====================================
echo.

REM Check Node.js
echo [1/7] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    color 0C
    echo ERROR: Node.js not found
    echo Please install from https://nodejs.org
    pause
    exit /b 1
)
echo OK: Node.js installed
echo.

REM Check Git
echo [2/7] Checking Git installation...
git --version >nul 2>&1
if errorlevel 1 (
    color 0C
    echo ERROR: Git not found
    echo Please install from https://git-scm.com
    pause
    exit /b 1
)
echo OK: Git installed
echo.

REM Frontend setup
echo [3/7] Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    color 0C
    echo ERROR: Frontend installation failed
    pause
    exit /b 1
)
echo OK: Frontend dependencies installed
cd ..
echo.

REM Frontend build test
echo [4/7] Testing frontend build...
cd frontend
call npm run build
if errorlevel 1 (
    color 0C
    echo ERROR: Frontend build failed. Check console output above.
    pause
    exit /b 1
)
echo OK: Frontend builds successfully
cd ..
echo.

REM Backend setup
echo [5/7] Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    color 0C
    echo ERROR: Backend installation failed
    pause
    exit /b 1
)
echo OK: Backend dependencies installed
cd ..
echo.

REM Check icons
echo [6/7] Checking app icons...
if exist "frontend\public\favicon.ico" (
    if exist "frontend\public\icon-192x192.png" (
        echo OK: App icons found
    ) else (
        echo WARNING: Some app icons missing
    )
) else (
    echo WARNING: App icons not found
    echo           Generate using: https://realfavicongenerator.net/
)
echo.

REM Check environment
echo [7/7] Checking environment files...
if exist "backend\.env" (
    echo OK: Backend .env file exists
) else (
    echo WARNING: Backend .env file missing
    echo          Create one from .env.example if it exists
)
echo.

REM Summary
color 0A
cls
echo.
echo ====================================
echo    Setup Complete! 
echo ====================================
echo.
echo Next Steps:
echo.
echo 1. Generate app icons:
echo    Visit: https://realfavicongenerator.net/
echo.
echo 2. Setup environment variables:
echo    - MongoDB URI in backend/.env
echo.
echo 3. Deploy frontend:
echo    npm install -g vercel
echo    vercel --prod
echo.
echo 4. Deploy backend:
echo    Push to GitHub ^(auto-deploy on Railway/Render^)
echo.
echo 5. Read deployment guide:
echo    type DEPLOYMENT_GUIDE.md
echo.
echo For more information:
echo    https://vercel.com/docs
echo    https://railway.app/docs
echo.
pause
