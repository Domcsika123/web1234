const fs = require('fs');
const path = require('path');

// Egyszerű placeholder SVG generátor
function createPlaceholder(width, height, text) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#0ea5e9;stop-opacity:0.8" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#grad)"/>
    <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">${text}</text>
  </svg>`;
}

// Portfolio
const portfolioDir = 'src/assets/images/portfolio';
if (!fs.existsSync(portfolioDir)) fs.mkdirSync(portfolioDir, { recursive: true });

const projects = [
  { file: 'project-1.svg', text: 'TechFlow SaaS' },
  { file: 'project-2.svg', text: 'Luxe Design' },
  { file: 'project-3.svg', text: 'EcoShop' },
  { file: 'project-4.svg', text: 'FinanceHub' },
  { file: 'project-5.svg', text: 'Wellness App' },
  { file: 'project-6.svg', text: 'Agency Hub' }
];

projects.forEach(p => {
  const svg = createPlaceholder(1200, 600, p.text);
  fs.writeFileSync(path.join(portfolioDir, p.file), svg);
  console.log(`Created ${p.file}`);
});

// Hero szekció
const heroDir = 'src/assets/images/hero';
if (!fs.existsSync(heroDir)) fs.mkdirSync(heroDir, { recursive: true });

const heroBefore = createPlaceholder(600, 400, 'Régi Design');
const heroAfter = createPlaceholder(600, 400, 'Új Design');

fs.writeFileSync(path.join(heroDir, 'before.svg'), heroBefore);
fs.writeFileSync(path.join(heroDir, 'after.svg'), heroAfter);
console.log('Created hero images');

console.log('✓ Placeholder images created!');
