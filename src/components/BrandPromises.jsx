import React from 'react';
import { CheckCircle2, Sparkles, Ban, Palette, PackageCheck, Truck } from 'lucide-react';

export default function BrandPromises() {
  const promises = [
    { title: 'Freshly Baked Daily', subtitle: 'Baked to order', icon: Sparkles },
    { title: 'Premium Ingredients', subtitle: 'Zero compromises', icon: CheckCircle2 },
    { title: 'Zero Palm Oil', subtitle: '100% wholesome fats', icon: Ban },
    { title: 'No Artificial Colours', subtitle: 'Natural fruit tints', icon: Palette },
    { title: 'Eco-Friendly Packaging', subtitle: 'Biodegradable boxes', icon: PackageCheck },
    { title: 'Free Society Delivery', subtitle: 'Prateek Grand City', icon: Truck },
  ];

  return (
    <section className="border-y border-brand-100 bg-white/70 backdrop-blur-sm py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Grid / Mobile Horizontal Scroll Container */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 sm:pb-0 scrollbar-none sm:grid sm:grid-cols-3 lg:grid-cols-6">
          {promises.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex-shrink-0 flex items-center gap-3 p-3 rounded-2xl bg-cream-50/80 sm:bg-transparent border border-brand-100/60 sm:border-none min-w-[200px] sm:min-w-0 group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-100/60 text-brand-700 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-700 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-charcoal-900 tracking-tight leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-charcoal-500 font-medium">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
