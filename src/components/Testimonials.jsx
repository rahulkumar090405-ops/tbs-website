import React from 'react';
import { Star, Quote, Heart, Award } from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-cream-50/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-brand-600" />
            <span>Community Love</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight mb-4">
            Cherished by Our Neighbours
          </h2>

          <p className="text-base sm:text-lg text-charcoal-600 font-light">
            Real feedback from residents across Prateek Grand City who celebrated with tBS.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white p-8 border border-brand-100/80 shadow-card hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-gold-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-200" />
                </div>

                {/* Quote Text */}
                <p className="font-serif text-base sm:text-lg text-charcoal-800 italic leading-relaxed mb-6 font-light">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Tag */}
              <div className="pt-4 border-t border-brand-50 flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-bold text-xs text-charcoal-900">{t.author}</h4>
                  <p className="text-[10px] text-brand-600 font-medium">Verified Customer</p>
                </div>
                <span className="text-[10px] uppercase font-semibold text-charcoal-500 bg-cream-100 px-2.5 py-1 rounded-full">
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
