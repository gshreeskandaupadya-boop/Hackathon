#!/usr/bin/env node

/**
 * Icon Generator for Smart Farm Hub
 * Creates all required PWA and web app icons
 * Run: node create-icons.js
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'frontend', 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('✓ Created public directory');
}

// SVG template for green farm icon
const svgTemplate = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <!-- Green background -->
  <rect width="${size}" height="${size}" fill="#16a34a"/>
  
  <!-- Plant/leaf symbol -->
  <g transform="translate(${size/2}, ${size/2})">
    <!-- Leaf 1 -->
    <ellipse cx="-${size*0.15}" cy="-${size*0.1}" rx="${size*0.12}" ry="${size*0.2}" fill="#22c55e" transform="rotate(-30)"/>
    
    <!-- Leaf 2 -->
    <ellipse cx="${size*0.15}" cy="-${size*0.1}" rx="${size*0.12}" ry="${size*0.2}" fill="#86efac" transform="rotate(30)"/>
    
    <!-- Center stem -->
    <rect x="-${size*0.03}" y="-${size*0.25}" width="${size*0.06}" height="${size*0.35}" fill="#22c55e" rx="${size*0.03}"/>
    
    <!-- Bottom leaf -->
    <ellipse cy="${size*0.15}" rx="${size*0.2}" ry="${size*0.15}" fill="#16a34a"/>
  </g>
</svg>`;

// Create SVG icons
const svgSizes = [192, 512];
svgSizes.forEach(size => {
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(publicDir, filename);
  fs.writeFileSync(filepath, svgTemplate(size));
  console.log(`✓ Created ${filename}`);
});

// Create favicon ICO (multi-size, simplified)
const icoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" fill="#16a34a"/>
  <g transform="translate(32, 32)">
    <ellipse cx="-10" cy="-7" rx="8" ry="14" fill="#22c55e" transform="rotate(-30)"/>
    <ellipse cx="10" cy="-7" rx="8" ry="14" fill="#86efac" transform="rotate(30)"/>
    <rect x="-2" y="-18" width="4" height="25" fill="#22c55e" rx="2"/>
    <ellipse cy="10" rx="14" ry="11" fill="#16a34a"/>
  </g>
</svg>`;

const icoPath = path.join(publicDir, 'favicon.ico.svg');
fs.writeFileSync(icoPath, icoSvg);
console.log('✓ Created favicon.ico.svg (use online converter for ICO)');

// Create Apple touch icon
const applePath = path.join(publicDir, 'apple-touch-icon.svg');
fs.writeFileSync(applePath, svgTemplate(180));
console.log('✓ Created apple-touch-icon.svg');

// Create manifest icons array
const manifestIcons = [
  { src: '/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
  { src: '/icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
  { src: '/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'maskable' },
  { src: '/icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' }
];

console.log('\n✅ Icon Generation Complete!\n');
console.log('📋 Files created in frontend/public/:');
console.log('  • icon-192x192.svg');
console.log('  • icon-512x512.svg');
console.log('  • apple-touch-icon.svg');
console.log('  • favicon.ico.svg\n');

console.log('📝 Manifest icons array (for reference):');
console.log(JSON.stringify(manifestIcons, null, 2));

console.log('\n🔄 Next steps:');
console.log('  1. SVG icons are created and ready');
console.log('  2. For favicon.ico: Use https://icoconvert.com/ to convert favicon.ico.svg');
console.log('  3. For better quality: Use https://realfavicongenerator.net/');
console.log('  4. Place all icons in frontend/public/');
console.log('\n✨ Your PWA manifest.json is already configured to use these icons!');
