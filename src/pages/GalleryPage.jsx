import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ChevronRight, MessageCircle } from 'lucide-react';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';

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

export default function GalleryPage() {
  const images = [
    {
      src: '/images/hero-cake.jpg',
      title: 'Lavender & Fig Celebration Gateau',
      tag: 'Bespoke 2-Tier',
      desc: 'Hand-piped buttercream with edible gold leaf and floral crown.',
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      src: '/images/choco-truffle.jpg',
      title: 'Decadent Belgian Ganache Slice',
      tag: 'Chocolate Truffle',
      desc: 'Silky dark ganache with 54% Belgian cocoa sponge.',
      span: 'col-span-1',
    },
    {
      src: '/images/bento-cake.jpg',
      title: 'Pastel Bento in Eco Box',
      tag: 'Korean Bento',
      desc: 'Petite celebration bento with cute pastel piping.',
      span: 'col-span-1',
    },
    {
      src: '/images/pistachio-kunafa.jpg',
      title: 'Crispy Kunafa Phyllo Crown',
      tag: 'Middle-Eastern',
      desc: 'Roasted pistachios with golden buttered phyllo strands.',
      span: 'col-span-1',
    },
    {
      src: '/images/red-velvet.jpg',
      title: 'Ruby Red Sponge & Cream Cheese',
      tag: 'Red Velvet',
      desc: 'Classic velvety crumb paired with rich cream cheese frosting.',
      span: 'col-span-1',
    },
    {
      src: '/images/cheesecake.jpg',
      title: 'Baked Blueberry NY Cheesecake',
      tag: 'Baked Cheesecake',
      desc: 'Slow-baked New York cheesecake with wild blueberry compote.',
      span: 'col-span-1',
    },
    {
      src: '/images/chocolate-bowl.jpg',
      title: 'Layered Molten Fudge Bowl',
      tag: 'Dessert Bowl',
      desc: 'Warm chocolate fudge with sponge layers and choco chips.',
      span: 'col-span-1',
    },
    {
      src: '/images/kitchen-craft.jpg',
      title: 'Artisan Pastry Finishing',
      tag: 'Behind The Scenes',
      desc: 'Every slice and decoration crafted with utmost hygiene & passion.',
      span: 'md:col-span-2',
    },
    {
      src: '/images/belgium-chocolate.jpg',
      title: 'Belgium Chocolate Luxury Edition',
      tag: 'Chef Signature',
      desc: 'Dark truffle ganache with golden accents and cacao nibs.',
      span: 'col-span-1',
    },
    {
      src: '/images/lotus-biscoff.jpg',
      title: 'Lotus Biscoff Spiced Caramel',
      tag: 'Bestseller',
      desc: 'Caramelized speculoos cookie crust and velvety buttercream.',
      span: 'col-span-1',
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-cream-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-charcoal-500">
          <Link to="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
          <span className="font-semibold text-brand-900">Visual Gallery</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/90 text-brand-900 border border-brand-200/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Fresh From Our Kitchen</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight">
              Visual Gallery
            </h1>

            <p className="text-xs sm:text-base text-charcoal-600 font-light mt-2 max-w-xl">
              A visual glimpse into our artisanal bakes, textures, custom celebration gateaux, and behind-the-scenes moments.
            </p>
          </div>

          <a
            href="https://www.instagram.com/thebakingspot22/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-brand-700 bg-white hover:bg-brand-50 px-4 py-2.5 rounded-full self-start md:self-auto border border-brand-200 shadow-xs transition-all"
          >
            <InstagramIcon className="w-4 h-4 text-brand-700" />
            <span>Follow on Instagram @thebakingspot22</span>
          </a>
        </div>

        {/* Masonry / Photo Grid */}
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

              {/* Hover Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-200 mb-1">
                  {item.tag}
                </span>
                <p className="font-serif font-bold text-sm sm:text-base leading-snug mb-1">
                  {item.title}
                </p>
                <p className="text-[11px] text-cream-200 font-light line-clamp-2">
                  {item.desc}
                </p>
              </div>

              {/* Floating Heart Indicator */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                <Heart className="w-4 h-4 fill-rose-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 sm:mt-18 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-charcoal-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Inspired by what you see?
            </h3>
            <p className="text-xs sm:text-sm text-cream-200/80 font-light max-w-lg">
              Explore our full 48+ cake catalog or talk to our chef to design your custom birthday & anniversary cake.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/products"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-white text-brand-950 hover:bg-cream-100 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <span>Explore Menu</span>
            </Link>

            <a
              href={createGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
