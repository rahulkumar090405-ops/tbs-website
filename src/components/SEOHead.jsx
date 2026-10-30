import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_SEO = {
  title: 'The Baking Spot | Freshly Baked Cakes, Desserts & Premium Bakery Menu',
  description: 'Explore delicious homemade cakes, premium desserts, muffins, cookies and freshly baked treats at The Baking Spot. Discover our menu and order your favourites online.',
  keywords: 'The Baking Spot, Cakes in Noida, Homemade Cakes, Premium Cakes, Customised Cakes, Chocolate Cakes, Birthday Cakes, Desserts in Noida, Freshly Baked Muffins, Bakery Menu Noida',
  canonical: 'https://www.thebakingspot.com/menu/cakes',
  ogTitle: 'The Baking Spot | Freshly Baked Cakes & Desserts',
  ogDescription: 'Explore our delicious homemade cakes, premium desserts, muffins and freshly baked treats.',
  ogImage: 'https://www.thebakingspot.com/the-baking-spot-cake-menu-social.jpg',
  ogUrl: 'https://www.thebakingspot.com/menu/cakes',
  imageAlt: 'The Baking Spot – Freshly Baked Premium Cakes, Desserts and Bakery Menu',
};

const ROUTE_SEO = {
  '/menu/cakes': {
    title: 'The Baking Spot | Freshly Baked Cakes, Desserts & Premium Bakery Menu',
    description: 'Explore delicious homemade cakes, premium desserts, muffins, cookies and freshly baked treats at The Baking Spot. Discover our menu and order your favourites online.',
    keywords: 'The Baking Spot, Cakes in Noida, Homemade Cakes, Premium Cakes, Customised Cakes, Chocolate Cakes, Birthday Cakes, Desserts in Noida, Freshly Baked Muffins, Bakery Menu Noida',
    canonical: 'https://www.thebakingspot.com/menu/cakes',
    ogTitle: 'The Baking Spot | Freshly Baked Cakes & Desserts',
    ogDescription: 'Explore our delicious homemade cakes, premium desserts, muffins and freshly baked treats.',
    ogImage: 'https://www.thebakingspot.com/the-baking-spot-cake-menu-social.jpg',
    ogUrl: 'https://www.thebakingspot.com/menu/cakes',
  },
  '/menu/desserts': {
    title: 'Artisanal Desserts, Jars, Brownies & Muffins | The Baking Spot',
    description: 'Treat yourself to delicious cheesecakes, cupcakes, loaded jar cakes, brownies & freshly baked muffins.',
    canonical: 'https://www.thebakingspot.com/menu/desserts',
    ogTitle: 'Artisanal Desserts & Bakes | The Baking Spot',
    ogDescription: 'Freshly baked cupcakes, jar cakes, molten brownies & muffins.',
    ogImage: 'https://www.thebakingspot.com/the-baking-spot-cake-menu-social.jpg',
    ogUrl: 'https://www.thebakingspot.com/menu/desserts',
  },
  '/menu/snacks': {
    title: 'Snacks, Burgers, Sandwiches & Shakes | The Baking Spot',
    description: 'Freshly made burgers, 3-slice jumbo sandwiches, Korean cream cheese garlic buns, chilled thick shakes & mojitos.',
    canonical: 'https://www.thebakingspot.com/menu/snacks',
    ogTitle: 'Snacks & Bakes | The Baking Spot',
    ogDescription: 'Crispy burgers, cheesy garlic buns, loaded sandwiches & refreshing shakes.',
    ogImage: 'https://www.thebakingspot.com/the-baking-spot-cake-menu-social.jpg',
    ogUrl: 'https://www.thebakingspot.com/menu/snacks',
  },
  '/custom-cake': {
    title: 'Design Your Customised Celebration Cake | The Baking Spot',
    description: 'Personalise bespoke birthday, anniversary, multi-tier & themed celebration cakes made with 100% pure butter and zero palm oil.',
    canonical: 'https://www.thebakingspot.com/custom-cake',
    ogTitle: 'Customised Celebration Cakes | The Baking Spot',
    ogDescription: 'Bespoke custom cakes designed for your special occasions.',
    ogImage: 'https://www.thebakingspot.com/the-baking-spot-cake-menu-social.jpg',
    ogUrl: 'https://www.thebakingspot.com/custom-cake',
  },
};

export default function SEOHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = ROUTE_SEO[pathname] || DEFAULT_SEO;

    // Update Title
    document.title = seo.title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    }

    // Update Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', seo.canonical);
    }

    // Update Open Graph tags
    const ogTags = {
      'og:title': seo.ogTitle || seo.title,
      'og:description': seo.ogDescription || seo.description,
      'og:url': seo.ogUrl || seo.canonical,
      'og:image': seo.ogImage || DEFAULT_SEO.ogImage,
      'twitter:title': seo.title,
      'twitter:description': seo.description,
      'twitter:image': seo.ogImage || DEFAULT_SEO.ogImage,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      const isTwitter = property.startsWith('twitter:');
      const selector = isTwitter
        ? `meta[name="${property}"], meta[property="${property}"]`
        : `meta[property="${property}"]`;
      let tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute('content', content);
      }
    });
  }, [pathname]);

  return null;
}
