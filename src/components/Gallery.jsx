import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Gallery() {
  const images = [
    {
      src: '/images/hero-cake.jpg',
      title: 'Lavender & Fig Celebration Gateau',
      tag: 'Bespoke 2-Tier',
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      src: '/images/choco-truffle.jpg',
      title: 'Decadent Belgian Ganache Slice',
      tag: 'Chocolate Truffle',
      span: 'col-span-1',
    },
    {
      src: '/images/bento-cake.jpg',
      title: 'Pastel Bento in Eco Box',
      tag: 'Korean Bento',
      span: 'col-span-1',
    },
    {
      src: '/images/pistachio-kunafa.jpg',
      title: 'Crispy Kunafa Phyllo Crown',
      tag: 'Middle-Eastern',
      span: 'col-span-1',
    },
    {
      src: '/images/red-velvet.jpg',
      title: 'Ruby Red Sponge & Cream Cheese',
      tag: 'Red Velvet',
      span: 'col-span-1',
    },
    {
      src: '/images/cheesecake.jpg',
      title: 'Baked Blueberry NY Cheesecake',
      tag: 'Baked Cheesecake',
      span: 'col-span-1',
    },
    {
      src: '/images/chocolate-bowl.jpg',
      title: 'Layered Molten Fudge Bowl',
      tag: 'Dessert Bowl',
      span: 'col-span-1',
    },
    {
      src: '/images/kitchen-craft.jpg',
      title: 'Artisan Pastry Finishing',
      tag: 'Behind The Scenes',
      span: 'md:col-span-2',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Visual Gallery</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight">
              Fresh From Our Kitchen
            </h2>

            <p className="text-base sm:text-lg text-charcoal-600 font-light mt-2">
              A glimpse into our daily bakes, textures, and bespoke celebration cakes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-brand-700 bg-brand-50 px-4 py-2 rounded-full self-start md:self-auto border border-brand-200/60">
            <InstagramIcon className="w-4 h-4 text-brand-700" />
            <span>@thebakingspot.tbs</span>
          </div>
        </div>

        {/* Instagram-style Mosaic Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {images.map((item, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-cream-100 shimmer-card aspect-square ${
                item.span || 'col-span-1'
              }`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-200 mb-1">
                  {item.tag}
                </span>
                <p className="font-serif font-bold text-sm sm:text-base leading-snug">
                  {item.title}
                </p>
              </div>

              {/* Floating Mini Badge */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                <Heart className="w-4 h-4 fill-rose-500" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
