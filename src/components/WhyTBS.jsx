import React from 'react';
import { Sparkles, Ban, HeartHandshake, PackageCheck, Award, Heart } from 'lucide-react';

export default function WhyTBS() {
  const cards = [
    {
      icon: Sparkles,
      title: 'Premium Quality Ingredients',
      tagline: 'Pure Dairy & Fine Cocoa',
      description: 'Only the finest quality ingredients go into every bake — chosen with care so every single bite is consistent, rich, and truly satisfying.',
      accent: 'from-brand-50 to-brand-100/50',
    },
    {
      icon: Ban,
      title: 'Zero Palm Oil',
      tagline: 'Wholesome & Honest',
      description: 'Only clean, quality fats. No palm oil, no hydrogenated shortcuts, no artificial food chemicals — just wholesome, honest homemade ingredients.',
      accent: 'from-amber-50 to-amber-100/40',
    },
    {
      icon: HeartHandshake,
      title: 'Freshness Beyond Imagination',
      tagline: 'Baked Fresh to Order',
      description: 'Every cake is baked fresh upon your order — a freshness so real, it is beyond what you have ever imagined from commercial bakeries.',
      accent: 'from-rose-50 to-rose-100/40',
    },
    {
      icon: PackageCheck,
      title: 'Eco Packaging + Free Delivery',
      tagline: 'Doorstep Care',
      description: 'Eco-friendly biodegradable packaging delivered free right to your door at Prateek Grand City Society — no hidden delivery charges.',
      accent: 'from-emerald-50 to-emerald-100/40',
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-cream-100/50 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-brand-600" />
            <span>Our Promise To You</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight mb-4">
            Why tBS Is Worth It
          </h2>
          
          <p className="text-base sm:text-lg text-charcoal-600 font-light">
            Every bite tells the difference between real and ordinary.
          </p>
        </div>

        {/* 4 Editorial Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl sm:rounded-3xl bg-white p-7 sm:p-8 border border-brand-100 shadow-card hover:shadow-luxury-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:bg-brand-700 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-brand-600 bg-brand-50/80 px-2.5 py-1 rounded-full">
                      {card.tagline}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-3 group-hover:text-brand-800 transition-colors">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-sm text-charcoal-600 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>

                {/* Subtle Card Footer Line */}
                <div className="mt-6 pt-4 border-t border-brand-50 flex items-center text-xs font-semibold text-brand-700 group-hover:text-brand-800">
                  <span className="inline-block w-2 h-2 rounded-full bg-brand-600 mr-2 group-hover:scale-125 transition-transform" />
                  <span>The Baking Spot Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
