import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist! Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

const routes = [
  {
    path: 'menu/cakes',
    title: 'The Baking Spot | Freshly Baked Cakes, Desserts & Premium Bakery Menu',
    description: 'Explore delicious homemade cakes, premium desserts, muffins, cookies and freshly baked treats at The Baking Spot. Discover our menu and order your favourites online.',
    canonical: 'https://www.thebakingspot.com/menu/cakes',
    ogTitle: 'The Baking Spot | Freshly Baked Cakes & Desserts',
    ogDescription: 'Explore our delicious homemade cakes, premium desserts, muffins and freshly baked treats.',
    ogUrl: 'https://www.thebakingspot.com/menu/cakes'
  },
  {
    path: 'menu/all',
    title: 'The Baking Spot | Bakery Menu - Cakes, Desserts & Snacks',
    description: 'Explore our complete menu of cakes, desserts, muffins and snacks handcrafted fresh with love.',
    canonical: 'https://www.thebakingspot.com/menu/all',
    ogTitle: 'The Baking Spot | Complete Bakery Menu',
    ogDescription: 'Explore our complete menu of cakes, desserts, muffins and snacks handcrafted fresh with love.',
    ogUrl: 'https://www.thebakingspot.com/menu/all'
  },
  {
    path: 'menu/desserts',
    title: 'The Baking Spot | Handcrafted Desserts, Cheesecakes & Brownies',
    description: 'Indulge in delicious cheesecakes, artisanal brownies, muffins, and jars freshly baked at The Baking Spot.',
    canonical: 'https://www.thebakingspot.com/menu/desserts',
    ogTitle: 'The Baking Spot | Desserts Menu',
    ogDescription: 'Indulge in delicious cheesecakes, artisanal brownies, muffins, and jars freshly baked at The Baking Spot.',
    ogUrl: 'https://www.thebakingspot.com/menu/desserts'
  },
  {
    path: 'menu/snacks',
    title: 'The Baking Spot | Savory Snacks, Patties & Quiches',
    description: 'Freshly baked savory treats, flaky patties, puffs, and quick bites at The Baking Spot.',
    canonical: 'https://www.thebakingspot.com/menu/snacks',
    ogTitle: 'The Baking Spot | Savory Snacks Menu',
    ogDescription: 'Freshly baked savory treats, flaky patties, puffs, and quick bites at The Baking Spot.',
    ogUrl: 'https://www.thebakingspot.com/menu/snacks'
  },
  {
    path: 'menu',
    title: 'The Baking Spot | Bakery Menu - Cakes, Desserts & Snacks',
    description: 'Explore our complete menu of cakes, desserts, muffins and snacks handcrafted fresh with love.',
    canonical: 'https://www.thebakingspot.com/menu',
    ogTitle: 'The Baking Spot | Complete Bakery Menu',
    ogDescription: 'Explore our complete menu of cakes, desserts, muffins and snacks handcrafted fresh with love.',
    ogUrl: 'https://www.thebakingspot.com/menu'
  },
  {
    path: 'custom-cake',
    title: 'The Baking Spot | Custom Cake Consultation & Order',
    description: 'Design and customize your dream cake for birthdays, weddings, anniversaries, and special moments with The Baking Spot.',
    canonical: 'https://www.thebakingspot.com/custom-cake',
    ogTitle: 'The Baking Spot | Customized Birthday & Celebration Cakes',
    ogDescription: 'Design and customize your dream cake with The Baking Spot.',
    ogUrl: 'https://www.thebakingspot.com/custom-cake'
  },
  {
    path: 'gallery',
    title: 'The Baking Spot | Cake & Dessert Gallery',
    description: 'Browse our gallery of handcrafted cakes, cupcakes, custom creations, and dessert tables.',
    canonical: 'https://www.thebakingspot.com/gallery',
    ogTitle: 'The Baking Spot | Photo Gallery',
    ogDescription: 'Browse our gallery of handcrafted cakes, cupcakes, and custom creations.',
    ogUrl: 'https://www.thebakingspot.com/gallery'
  },
  {
    path: 'products',
    title: 'The Baking Spot | Complete Bakery Menu',
    description: 'Explore our complete selection of fresh homemade baked treats.',
    canonical: 'https://www.thebakingspot.com/products',
    ogTitle: 'The Baking Spot | Complete Bakery Menu',
    ogDescription: 'Explore our complete selection of fresh homemade baked treats.',
    ogUrl: 'https://www.thebakingspot.com/products'
  }
];

function customizeHtml(html, route) {
  let custom = html;

  if (route.title) {
    custom = custom.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);
    custom = custom.replace(/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i, `<meta name="title" content="${route.title}" />`);
  }

  if (route.description) {
    custom = custom.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${route.description}" />`);
  }

  if (route.canonical) {
    custom = custom.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${route.canonical}" />`);
  }

  if (route.ogTitle) {
    custom = custom.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${route.ogTitle}" />`);
    custom = custom.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${route.title || route.ogTitle}" />`);
  }

  if (route.ogDescription) {
    custom = custom.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${route.ogDescription}" />`);
    custom = custom.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${route.description || route.ogDescription}" />`);
  }

  if (route.ogUrl) {
    custom = custom.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${route.ogUrl}" />`);
    custom = custom.replace(/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:url" content="${route.ogUrl}" />`);
  }

  return custom;
}

// Generate physical index.html for each route
routes.forEach((route) => {
  const targetDir = path.join(distDir, route.path);
  fs.mkdirSync(targetDir, { recursive: true });
  const customizedHtml = customizeHtml(baseHtml, route);
  fs.writeFileSync(path.join(targetDir, 'index.html'), customizedHtml, 'utf8');
  console.log(`✓ Generated static route: /${route.path}/index.html`);
});

// Also create dist/404.html
fs.writeFileSync(path.join(distDir, '404.html'), baseHtml, 'utf8');
console.log('✓ Generated dist/404.html');

console.log('All static routes generated successfully.');
