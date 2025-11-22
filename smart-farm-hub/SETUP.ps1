#!/usr/bin/env pwsh
# Smart Farm Hub - Quick Start Script for Windows PowerShell

Write-Host "`n" -ForegroundColor Green
Write-Host "🌾 Smart Farm Profit Maximization Hub - Setup Script" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green

# Check Node.js
Write-Host "`n📋 Checking Node.js installation..." -ForegroundColor Cyan
$node_version = node --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Node.js $node_version found" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host "   Please install Node.js from https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Frontend
Write-Host "`n📦 Installing Frontend Dependencies..." -ForegroundColor Cyan
cd frontend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend installation failed" -ForegroundColor Red
    exit 1
}

# Backend
Write-Host "`n📦 Installing Backend Dependencies..." -ForegroundColor Cyan
cd ../backend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Backend installation failed" -ForegroundColor Red
    exit 1
}

# Summary
Write-Host "`n" -ForegroundColor Green
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green

Write-Host "`n📝 Next Steps:`n" -ForegroundColor Cyan
Write-Host "1️⃣  Start Backend (Terminal 1):" -ForegroundColor Yellow
Write-Host "    cd backend" -ForegroundColor White
Write-Host "    npm run dev" -ForegroundColor White

Write-Host "`n2️⃣  Start Frontend (Terminal 2):" -ForegroundColor Yellow
Write-Host "    cd frontend" -ForegroundColor White
Write-Host "    npm run dev" -ForegroundColor White

Write-Host "`n3️⃣  Open in Browser:" -ForegroundColor Yellow
Write-Host "    Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "    Backend Health: http://localhost:5000/api/health" -ForegroundColor White

Write-Host "`n📚 Documentation:" -ForegroundColor Cyan
Write-Host "    - BUILD_AND_RUN.md (Complete guide)" -ForegroundColor White
Write-Host "    - docs/API_DOCS.md (All endpoints)" -ForegroundColor White
Write-Host "    - docs/QUICK_START.md (2-hour setup)" -ForegroundColor White

Write-Host "`n" -ForegroundColor Green
