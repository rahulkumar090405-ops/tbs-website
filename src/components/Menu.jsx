import React from 'react';
import { Sparkles, Cake, PieChart, Coffee, Utensils, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MENU_HUBS } from '../data/menuData';

export default function Menu() {
  const hubIcons = {
    all: Utensils,
    cakes: Cake,
    desserts: PieChart,
    snacks: Coffee,
  };

  const hubLinks = {
    all: '/menu/all',
    cakes: '/menu/cakes',
    desserts: '/menu/desserts',
    snacks: '/menu/snacks',
  };

  const hubTags = {
    all: 'Complete 49+ Bakes',
    cakes: '31 Cake Varieties',
    desserts: '10 Sweet Delights',
    snacks: '8 Chai Loaves',
  };

  return (
    <section id="menu" className="py-20 md:py-28 bg-cream-50/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cake className="w-3.5 h-3.5 text-brand-600" />
            <span>Independent Menu Collections</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight mb-4">
            Explore Our Menus
          </h2>

          <p className="text-base sm:text-lg text-charcoal-600 font-light leading-relaxed">
            Choose a dedicated menu page below to browse our fresh bakes from the official kitchen menu. Every item is freshly baked to order with pure ingredients and zero palm oil.
          </p>
        </div>

        {/* 4 Dedicated Menu Hub Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {MENU_HUBS.map((hub) => {
            const Icon = hubIcons[hub.id] || Cake;
            const targetUrl = hubLinks[hub.id] || `/menu/${hub.slug}`;
            const countTag = hubTags[hub.id] || hub.badge;

            return (
              <Link
                key={hub.id}
                to={targetUrl}
                className="group relative rounded-3xl bg-white p-7 sm:p-8 border border-brand-100/80 shadow-card hover:shadow-luxury-hover hover:border-brand-400 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:bg-brand-700 group-hover:text-white transition-colors duration-300 shadow-sm p-3">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-brand-700 bg-brand-100/70 px-2.5 py-1 rounded-full">
                      {countTag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 mb-2 group-hover:text-brand-800 transition-colors">
                    {hub.name}
                  </h3>

                  {/* Subtitle / Description */}
                  <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed mb-6">
                    {hub.subtitle}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-brand-50 flex items-center justify-between text-xs font-bold text-brand-700 group-hover:text-brand-900">
                  <span className="uppercase tracking-wider">Open Independent Menu</span>
                  <div className="w-7 h-7 rounded-full bg-brand-50 flex items-center justify-center group-hover:bg-brand-700 group-hover:text-white transition-all group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Help Strip */}
        <div className="text-center">
          <p className="text-xs text-charcoal-500 font-light">
            Need help choosing or looking for something bespoke?{' '}
            <Link to="/custom-cake" className="text-brand-700 font-semibold underline hover:text-brand-900">
              Customize your dream cake
            </Link>{' '}
            or{' '}
            <a
              href="https://wa.me/918440882334?text=Hello%20The%20Baking%20Spot!%20I%20would%20like%20to%20inquire%20about%20ordering."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-semibold underline hover:text-emerald-900"
            >
              chat with our baker on WhatsApp
            </a>.
          </p>
        </div>

      </div>
    </section>
  );
}
