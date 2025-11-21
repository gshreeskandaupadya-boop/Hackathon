#!/usr/bin/env node

/**
 * Smart Farm Hub - Icon Generator Script
 * 
 * This script helps generate all required PWA icons from a source image.
 * 
 * Usage:
 * 1. Save your app icon as 'source-icon.png' (512x512 or larger)
 * 2. Run: node generate-icons.js
 * 3. Icons will be created in frontend/public/
 * 
 * Alternative (easier):
 * 1. Visit: https://realfavicongenerator.net/
 * 2. Upload your icon
 * 3. Download the package
 * 4. Extract files to frontend/public/
 */

const fs = require('fs');
const path = require('path');

// Icon specifications
const ICONS = [
  {
    name: 'favicon.ico',
    size: 32,
    format: 'ico',
    description: 'Browser tab icon'
  },
  {
    name: 'apple-touch-icon.png',
    size: 180,
    format: 'png',
    description: 'iOS home screen icon'
  },
  {
    name: 'icon-192x192.png',
    size: 192,
    format: 'png',
    description: 'Android home screen icon'
  },
  {
    name: 'icon-512x512.png',
    size: 512,
    format: 'png',
    description: 'Large app icon'
  },
  {
    name: 'icon-192x192-maskable.png',
    size: 192,
    format: 'png-maskable',
    description: 'Adaptive icon (maskable)'
  },
  {
    name: 'icon-512x512-maskable.png',
    size: 512,
    format: 'png-maskable',
    description: 'Large adaptive icon'
  }
];

console.log('🌾 Smart Farm Hub - Icon Generator');
console.log('====================================\n');

console.log('Required Icons:');
ICONS.forEach((icon, i) => {
  console.log(`${i + 1}. ${icon.name} (${icon.size}x${icon.size}) - ${icon.description}`);
});

console.log('\n📝 Instructions:\n');
console.log('Option 1: Automatic Generation (Recommended)');
console.log('1. Install: npm install -g jimp sharp');
console.log('2. Place source-icon.png (512x512 or larger) in current directory');
console.log('3. Run: node generate-icons.js');
console.log('');

console.log('Option 2: Online Tool (Easiest)');
console.log('1. Visit: https://realfavicongenerator.net/');
console.log('2. Upload your app icon (PNG, 512x512 or larger)');
console.log('3. Configure as needed');
console.log('4. Download the package');
console.log('5. Extract all files to: frontend/public/');
console.log('');

console.log('Option 3: Manual Creation');
console.log('1. Use Figma (www.figma.com)');
console.log('2. Create icons in sizes: 32, 192, 180, 512');
console.log('3. Export as PNG');
console.log('4. Place in frontend/public/');
console.log('');

console.log('Icon Specifications:');
console.log('- Format: PNG (except favicon.ico)');
console.log('- Background: Transparent (PNG) or Solid Green #16a34a');
console.log('- Safe Zone: Leave 1/3 margin from edges for maskable icons');
console.log('- Color: Green (#16a34a) with white design');
console.log('');

console.log('✅ After icons are placed:');
console.log('1. Verify files exist in frontend/public/');
console.log('2. Run: npm run dev');
console.log('3. Test: Open http://localhost:3000');
console.log('4. Check: Install button should appear');
console.log('5. Ready to deploy!');
console.log('');

// Check if source icon exists
if (fs.existsSync('source-icon.png')) {
  console.log('⚠️  Found source-icon.png');
  console.log('Would you like to generate icons automatically?');
  console.log('(Requires: npm install sharp)');
} else {
  console.log('No source-icon.png found.');
  console.log('Please follow Option 2 or 3 above.');
}

console.log('\n📚 Reference:');
console.log('- PWA Manifest: frontend/public/manifest.json');
console.log('- Layout Config: frontend/src/app/layout.tsx');
console.log('- Next.js Config: frontend/next.config.js');
console.log('- Icon Docs: ML_IMPLEMENTATION.md (search "icon")');
