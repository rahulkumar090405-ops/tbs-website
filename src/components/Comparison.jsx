import React from 'react';
import { Check, X, Sparkles, Scale } from 'lucide-react';
import { COMPARISON_DATA } from '../data/menuData';

export default function Comparison() {
  return (
    <section className="py-20 md:py-28 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5 text-brand-600" />
            <span>Honest Craftsmanship</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight mb-4">
            The Difference Is Clear
          </h2>

          <p className="text-base sm:text-lg text-charcoal-600 font-light">
            Not all bakeries are created equal. Here is how tBS stands apart.
          </p>
        </div>

        {/* Comparison Cards Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* THE BAKING SPOT Column (Premium Highlighted) */}
          <div className="relative rounded-3xl bg-white p-8 sm:p-10 border-2 border-brand-600 shadow-xl shadow-brand-900/5 order-1">
            
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-8 px-4 py-1 rounded-full bg-brand-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE BAKING SPOT Standard</span>
            </div>

            <div className="flex items-center justify-between pb-6 border-b border-brand-100 mt-2 mb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-950">THE BAKING SPOT</h3>
                <p className="text-xs text-brand-600 font-medium tracking-wide">Purely Homemade & Freshly Baked</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-brand-50 p-1 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/tbs-logo.png"
                  alt="tBS Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="space-y-4">
              {COMPARISON_DATA.tbs.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 p-2.5 rounded-xl bg-brand-50/60 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-semibold text-charcoal-900">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* OTHER BAKERIES Column */}
          <div className="relative rounded-3xl bg-white/70 p-8 sm:p-10 border border-charcoal-200/60 shadow-sm order-2">
            <div className="flex items-center justify-between pb-6 border-b border-charcoal-100 mt-2 mb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-700">OTHER BAKERIES</h3>
                <p className="text-xs text-charcoal-500 font-medium">Commercial Mass Production</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-charcoal-100 text-charcoal-500 flex items-center justify-center font-bold text-sm">
                ✕
              </div>
            </div>

            <div className="space-y-4">
              {COMPARISON_DATA.others.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 p-2.5 rounded-xl bg-charcoal-50/60">
                  <div className="w-6 h-6 rounded-full bg-rose-400 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-normal text-charcoal-600 line-through decoration-rose-300 decoration-1">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
