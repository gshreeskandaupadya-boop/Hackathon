@echo off
REM Smart Farm Hub - Backend Startup Script

echo.
echo Starting Smart Farm Hub Backend...
echo.

REM Add Node.js to PATH
set PATH=C:\Program Files\nodejs;%PATH%

REM Navigate to backend directory
cd /d "C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\backend"

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

REM Start the development server
echo.
echo Starting development server...
echo.
call npm run dev

pause
