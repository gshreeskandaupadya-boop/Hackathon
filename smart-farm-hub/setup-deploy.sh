#!/bin/bash

# Smart Farm Hub - Quick Deployment Setup Script
# Run this to prepare everything for deployment

echo "🌾 Smart Farm Hub - Deployment Setup"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}1. Checking Node.js installation...${NC}"
if command -v node &> /dev/null
then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js ${NODE_VERSION} installed${NC}"
else
    echo -e "${RED}✗ Node.js not found. Please install from https://nodejs.org${NC}"
    exit 1
fi

# Check Git
echo -e "${BLUE}2. Checking Git installation...${NC}"
if command -v git &> /dev/null
then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓ ${GIT_VERSION} installed${NC}"
else
    echo -e "${RED}✗ Git not found. Please install from https://git-scm.com${NC}"
    exit 1
fi

# Frontend setup
echo -e "${BLUE}3. Installing frontend dependencies...${NC}"
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}✗ Frontend installation failed${NC}"
    exit 1
fi
cd ..

# Frontend build test
echo -e "${BLUE}4. Testing frontend build...${NC}"
cd frontend
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend builds successfully${NC}"
else
    echo -e "${RED}✗ Frontend build failed. Check errors above${NC}"
    exit 1
fi
cd ..

# Backend setup
echo -e "${BLUE}5. Installing backend dependencies...${NC}"
cd backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}✗ Backend installation failed${NC}"
    exit 1
fi
cd ..

# Check icons
echo -e "${BLUE}6. Checking app icons...${NC}"
if [ -f "frontend/public/favicon.ico" ] && [ -f "frontend/public/icon-192x192.png" ]; then
    echo -e "${GREEN}✓ App icons found${NC}"
else
    echo -e "${YELLOW}⚠ App icons missing. Generate using:${NC}"
    echo -e "   ${YELLOW}Visit: https://realfavicongenerator.net/${NC}"
    echo -e "   ${YELLOW}Or run: node generate-icons.js${NC}"
fi

# Check environment files
echo -e "${BLUE}7. Checking environment files...${NC}"
if [ -f "backend/.env" ] || [ -f "backend/.env.local" ]; then
    echo -e "${GREEN}✓ Backend .env file exists${NC}"
else
    echo -e "${YELLOW}⚠ Backend .env file missing. Create with:${NC}"
    echo -e "   ${YELLOW}cp backend/.env.example backend/.env${NC}"
fi

# Summary
echo ""
echo -e "${BLUE}======================================"
echo "Setup Complete! 🎉"
echo "======================================${NC}"
echo ""
echo -e "${GREEN}✓ Node.js and Git installed"
echo "✓ Frontend ready for deployment"
echo "✓ Backend ready for deployment"
echo "✓ All dependencies installed${NC}"
echo ""
echo "Next Steps:"
echo "1. Generate app icons:"
echo "   Visit: https://realfavicongenerator.net/"
echo ""
echo "2. Setup environment variables:"
echo "   - MongoDB URI"
echo "   - API keys (if needed)"
echo ""
echo "3. Deploy frontend:"
echo "   vercel --prod"
echo ""
echo "4. Deploy backend:"
echo "   Push to GitHub → Auto-deploy on Railway/Render"
echo ""
echo "5. Read deployment guide:"
echo "   cat DEPLOYMENT_GUIDE.md"
echo ""
echo -e "${BLUE}For more info: https://vercel.com/docs${NC}"
