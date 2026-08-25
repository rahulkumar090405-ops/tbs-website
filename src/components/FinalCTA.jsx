import React from 'react';
import { Sparkles, MessageCircle, ArrowDown, Heart, ShieldCheck } from 'lucide-react';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-brand-950 text-white relative overflow-hidden">
      {/* Background Decorative Rings and Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-800/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-900/90 border border-brand-700/60 text-brand-200 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Purely Homemade • Freshly Baked</span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight max-w-3xl mx-auto">
          Your Next Celebration <br />
          <span className="text-brand-300 font-cormorant italic">Deserves a Better Cake.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-brand-100/80 font-light max-w-xl mx-auto mb-10 leading-relaxed">
          Freshly baked. Premium ingredients. Made with care. Experience the joy of authentic homemade cake craft.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <a
            href={createGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-cream-100 text-brand-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Order on WhatsApp</span>
          </a>

          <a
            href="#menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-900/80 hover:bg-brand-800 border border-brand-700 text-brand-100 font-semibold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5"
          >
            <span>Explore Menu</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-brand-300/80 font-light">
          <span>✓ Free Society Delivery</span>
          <span>•</span>
          <span>✓ Zero Palm Oil</span>
          <span>•</span>
          <span>✓ No Artificial Colours</span>
          <span>•</span>
          <span>✓ 100% Fresh Daily</span>
        </div>

      </div>
    </section>
  );
}
