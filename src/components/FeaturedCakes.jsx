import React, { useState } from 'react';
import { Sparkles, MessageCircle, Heart, Check, ChevronRight } from 'lucide-react';
import { SIGNATURE_CAKES } from '../data/menuData';
import { createWhatsAppOrderLink } from '../utils/whatsapp';

export default function FeaturedCakes() {
  // State to track selected size & heart shape for each featured cake
  const [selections, setSelections] = useState(
    SIGNATURE_CAKES.reduce((acc, cake) => {
      acc[cake.id] = {
        size: 'half', // 'half' or 'full'
        isHeart: false,
      };
      return acc;
    }, {})
  );

  const handleSizeChange = (cakeId, size) => {
    setSelections((prev) => ({
      ...prev,
      [cakeId]: { ...prev[cakeId], size },
    }));
  };

  const handleHeartToggle = (cakeId) => {
    setSelections((prev) => ({
      ...prev,
      [cakeId]: { ...prev[cakeId], isHeart: !prev[cakeId]?.isHeart },
    }));
  };

  return (
    <section id="signature" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Chef's Masterpieces</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight">
              Signature Cakes
            </h2>
            
            <p className="text-base sm:text-lg text-charcoal-600 font-light mt-3 max-w-xl">
              Our most celebrated artisan creations, baked fresh with Belgian cocoa, cream cheese, speculoos, and roasted nuts.
            </p>
          </div>

          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-brand-700 hover:text-brand-900 py-2 border-b-2 border-brand-700 transition-all self-start md:self-auto"
          >
            <span>View Complete Menu (45+ Items)</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* 6 Signature Cake Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SIGNATURE_CAKES.map((cake) => {
            const currentSelection = selections[cake.id] || { size: 'half', isHeart: false };
            const isHalf = currentSelection.size === 'half';
            const basePrice = isHalf ? cake.halfPrice : cake.fullPrice;
            const sizeLabel = isHalf ? 'Half KG' : 'Full KG';
            const totalPrice = basePrice + (currentSelection.isHeart ? 50 : 0);

            const whatsappUrl = createWhatsAppOrderLink({
              cakeName: cake.name,
              category: cake.category,
              size: sizeLabel,
              isHeartShape: currentSelection.isHeart,
              totalPrice: totalPrice,
            });

            return (
              <div
                key={cake.id}
                className="group relative rounded-3xl bg-white border border-brand-100/80 shadow-card hover:shadow-luxury-hover transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                {/* Image Container with Shimmer & Zoom Effect */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100 shimmer-card">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
                    {cake.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-brand-900 shadow-sm border border-brand-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Starting Price Pill */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-charcoal-900/80 backdrop-blur-md text-white text-xs font-semibold shadow-md">
                    Starting ₹{cake.startingPrice}
                  </div>
                </div>

                {/* Card Content & Interactive Controls */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif text-xl font-bold text-charcoal-900 group-hover:text-brand-800 transition-colors">
                        {cake.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light mb-6">
                      {cake.description}
                    </p>
                  </div>

                  {/* Size & Customization Selectors */}
                  <div className="space-y-4 pt-4 border-t border-brand-50">
                    {/* Size Selector Buttons */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-charcoal-500">Select Size:</span>
                      <div className="flex bg-cream-100 p-1 rounded-xl border border-brand-100">
                        <button
                          type="button"
                          onClick={() => handleSizeChange(cake.id, 'half')}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                            isHalf
                              ? 'bg-brand-700 text-white shadow-sm'
                              : 'text-charcoal-700 hover:text-brand-700'
                          }`}
                        >
                          Half KG (₹{cake.halfPrice})
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSizeChange(cake.id, 'full')}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                            !isHalf
                              ? 'bg-brand-700 text-white shadow-sm'
                              : 'text-charcoal-700 hover:text-brand-700'
                          }`}
                        >
                          Full KG (₹{cake.fullPrice})
                        </button>
                      </div>
                    </div>

                    {/* Heart Shape Toggle */}
                    {cake.heartAvailable && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-charcoal-600 flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          <span>Heart Shape (+₹50)</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleHeartToggle(cake.id)}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                            currentSelection.isHeart
                              ? 'bg-rose-50 border-rose-300 text-rose-700 font-semibold'
                              : 'border-charcoal-200 text-charcoal-600 hover:border-brand-300'
                          }`}
                        >
                          {currentSelection.isHeart ? '✓ Added' : '+ Add'}
                        </button>
                      </div>
                    )}

                    {/* Price & Order Button */}
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-[10px] text-charcoal-500 uppercase tracking-wider block">Total Price</span>
                        <span className="font-serif text-2xl font-bold text-brand-900">
                          ₹{totalPrice}
                        </span>
                      </div>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-brand-700/20 hover:shadow-brand-700/30 hover:-translate-y-0.5"
                      >
                        <MessageCircle className="w-4 h-4 text-white" />
                        <span>Order Now</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
