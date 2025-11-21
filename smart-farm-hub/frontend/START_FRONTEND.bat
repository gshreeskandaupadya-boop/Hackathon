@echo off
REM Smart Farm Hub - Frontend Startup Script

echo.
echo Starting Smart Farm Hub Frontend...
echo.

REM Add Node.js to PATH
set PATH=C:\Program Files\nodejs;%PATH%

REM Navigate to frontend directory
cd /d "C:\Users\ADMIN\OneDrive\Desktop\Accelerate\smart-farm-hub\frontend"

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

REM Start the development server
echo.
echo Starting development server on http://localhost:3000...
echo.
call npm run dev

pause
