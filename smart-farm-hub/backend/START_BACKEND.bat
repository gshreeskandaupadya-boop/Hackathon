@echo off
setlocal enabledelayedexpansion

REM Smart Farm Hub - Backend Startup Script
echo.
echo ========================================
echo   Smart Farm Hub - Backend
echo ========================================
echo.

REM Add Node.js to PATH
set PATH=C:\Program Files\nodejs;%PATH%

REM Navigate to backend directory
cd /d "C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\backend"

REM Check if npm and node are available
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not in PATH!
    echo Trying to add it manually...
    setx PATH "C:\Program Files\nodejs;%%PATH%%"
    echo Please close and reopen this window.
    pause
    exit /b 1
)

REM Show versions
echo Node.js version:
node --version
echo npm version:
npm --version
echo.

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    echo.
    call npm install
    echo.
)

REM Start the development server
echo ========================================
echo Starting development server...
echo ========================================
echo.
call npm run dev

pause
