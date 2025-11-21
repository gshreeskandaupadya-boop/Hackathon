@echo off
REM Smart Farm Hub - Complete Startup Script
REM Starts both Backend and Frontend

color 0A
cls

echo.
echo ========================================
echo   Smart Farm Hub - Local Development
echo ========================================
echo.

REM Add Node.js to PATH
set PATH=C:\Program Files\nodejs;%PATH%

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install from: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version
echo.

REM Set the base directory
set BASE_DIR=C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub

REM Backend setup
echo ========================================
echo Setting up Backend...
echo ========================================
cd /d "%BASE_DIR%\backend"

if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
    echo.
)

REM Frontend setup
echo ========================================
echo Setting up Frontend...
echo ========================================
cd /d "%BASE_DIR%\frontend"

if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
    echo.
)

REM All set
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the services:
echo.
echo 1. Start Backend:
echo    - Open Command Prompt or PowerShell
echo    - Run: cd "%BASE_DIR%\backend"
echo    - Run: npm run dev
echo    - Backend will be at: http://localhost:5000/api
echo.
echo 2. Start Frontend (in another terminal):
echo    - Open Command Prompt or PowerShell
echo    - Run: cd "%BASE_DIR%\frontend"
echo    - Run: npm run dev
echo    - Frontend will be at: http://localhost:3000
echo.
echo Or use the provided batch files:
echo   - "%BASE_DIR%\backend\START_BACKEND.bat"
echo   - "%BASE_DIR%\frontend\START_FRONTEND.bat"
echo.
echo ========================================
pause
