"""
Icon Generator for Smart Farm Hub
Creates all required PWA and web app icons as SVG files
Run: python create_icons.py
"""

import os
import json
from pathlib import Path

# Ensure directories exist
public_dir = Path('frontend/public')
public_dir.mkdir(parents=True, exist_ok=True)

def create_svg_icon(size):
    """Create SVG icon of specified size"""
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">
  <!-- Green background -->
  <rect width="{size}" height="{size}" fill="#16a34a"/>
  
  <!-- Plant/leaf symbol -->
  <g transform="translate({size/2}, {size/2})">
    <!-- Leaf 1 (left) -->
    <ellipse cx="{-size*0.15}" cy="{-size*0.1}" rx="{size*0.12}" ry="{size*0.2}" fill="#22c55e" transform="rotate(-30)"/>
    
    <!-- Leaf 2 (right) -->
    <ellipse cx="{size*0.15}" cy="{-size*0.1}" rx="{size*0.12}" ry="{size*0.2}" fill="#86efac" transform="rotate(30)"/>
    
    <!-- Center stem -->
    <rect x="{-size*0.03}" y="{-size*0.25}" width="{size*0.06}" height="{size*0.35}" fill="#22c55e" rx="{size*0.03}"/>
    
    <!-- Bottom leaf -->
    <ellipse cy="{size*0.15}" rx="{size*0.2}" ry="{size*0.15}" fill="#16a34a"/>
  </g>
</svg>'''
    return svg_content

# Create SVG icons for different sizes
sizes = {
    'icon-192x192.svg': 192,
    'icon-512x512.svg': 512,
    'apple-touch-icon.svg': 180,
    'favicon.svg': 64,
}

for filename, size in sizes.items():
    filepath = public_dir / filename
    svg_content = create_svg_icon(size)
    filepath.write_text(svg_content, encoding='utf-8')
    print(f'✓ Created {filename}')

# Create favicon.ico as SVG (will be converted by browser or online tool)
favicon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" fill="#16a34a"/>
  <g transform="translate(32, 32)">
    <ellipse cx="-10" cy="-7" rx="8" ry="14" fill="#22c55e" transform="rotate(-30)"/>
    <ellipse cx="10" cy="-7" rx="8" ry="14" fill="#86efac" transform="rotate(30)"/>
    <rect x="-2" y="-18" width="4" height="25" fill="#22c55e" rx="2"/>
    <ellipse cy="10" rx="14" ry="11" fill="#16a34a"/>
  </g>
</svg>'''

favicon_path = public_dir / 'favicon.ico'
favicon_path.write_text(favicon_svg, encoding='utf-8')
print(f'✓ Created favicon.ico')

# Update manifest.json with proper icon references
manifest_path = public_dir / 'manifest.json'

if manifest_path.exists():
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    
    manifest['icons'] = [
        {
            "src": "/icon-192x192.svg",
            "sizes": "192x192",
            "type": "image/svg+xml",
            "purpose": "any"
        },
        {
            "src": "/icon-512x512.svg",
            "sizes": "512x512",
            "type": "image/svg+xml",
            "purpose": "any"
        },
        {
            "src": "/icon-192x192.svg",
            "sizes": "192x192",
            "type": "image/svg+xml",
            "purpose": "maskable"
        },
        {
            "src": "/icon-512x512.svg",
            "sizes": "512x512",
            "type": "image/svg+xml",
            "purpose": "maskable"
        },
        {
            "src": "/apple-touch-icon.svg",
            "sizes": "180x180",
            "type": "image/svg+xml"
        }
    ]
    
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    print(f'✓ Updated manifest.json with icon references')

print('\n✅ Icon Generation Complete!\n')
print('📋 Files created in frontend/public/:')
print('  • icon-192x192.svg')
print('  • icon-512x512.svg')
print('  • apple-touch-icon.svg')
print('  • favicon.svg')
print('  • favicon.ico\n')

print('🚀 Your PWA is now ready with icons!')
print('   Next: Run "npm run build" in frontend/')
