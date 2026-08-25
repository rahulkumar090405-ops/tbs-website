import React from 'react';
import { Heart, Sparkles, ChefHat, Check, ArrowRight } from 'lucide-react';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';

export default function OurStory() {
  return (
    <section id="story" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Storytelling */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-cream-100 aspect-[4/3] sm:aspect-square group shimmer-card">
              <img
                src="/images/kitchen-craft.jpg"
                alt="Artisan Pastry Chef Decorating Cake at The Baking Spot"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-transparent pointer-events-none" />

              {/* Floating Story Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-card border border-white/70 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-700 text-white flex items-center justify-center flex-shrink-0">
                    <ChefHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-charcoal-900">Bespoke Artisan Kitchen</h4>
                    <p className="text-xs text-charcoal-600">Every cake is baked from scratch only upon order</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Background Stamp */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-32 h-32 bg-brand-100/60 rounded-full -z-10 blur-xl" />
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <Heart className="w-3.5 h-3.5 text-brand-600 fill-brand-600/30" />
              <span>Our Story & Passion</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight mb-6 leading-tight">
              Cakes made with real care, <br className="hidden sm:inline" />
              <span className="text-brand-700 font-cormorant italic">not commercial shortcuts.</span>
            </h2>

            <p className="text-base sm:text-lg text-charcoal-600 font-light leading-relaxed mb-6">
              At <strong className="font-semibold text-charcoal-900">THE BAKING SPOT (tBS)</strong>, we believe every celebration deserves something truly memorable. We started with a single uncompromising mission: to bring back the pure joy of honest, wholesome homemade baking.
            </p>

            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed mb-8">
              Unlike commercial bakeries that rely on pre-made frozen sponge bases, hydrogenated palm oil creams, and artificial food colours for long shelf lives, our kitchen bakes <span className="font-semibold text-brand-900">fresh to order</span>. We use authentic dairy butter, rich Belgian cocoa, natural fruit compotes, and pure vanilla so that each bite is light, flavorful, and completely guilt-free.
            </p>

            {/* Core Values Bullet List */}
            <div className="space-y-3 mb-8">
              {[
                "100% Homemade with strictly zero palm oil or cheap bakery shortenings",
                "Naturally coloured and flavoured using real fruits and gourmet cocoa",
                "Freshly baked upon confirmation — never refrigerated days in advance",
                "Complimentary white-glove doorstep delivery within Prateek Grand City",
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-charcoal-700 font-medium">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#signature"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-brand-700 hover:text-brand-900 py-2 border-b-2 border-brand-700 transition-all hover:border-brand-900"
              >
                <span>Discover Our Signature Flavours</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
