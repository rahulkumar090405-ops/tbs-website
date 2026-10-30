import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, Heart, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SIGNATURE_CAKES } from '../data/menuData';
import { createWhatsAppOrderLink } from '../utils/whatsapp';

export default function HighlightSlider() {
  // Combine signature cakes with top picks from various categories for a rich showcase
  const highlightCakes = [
    ...SIGNATURE_CAKES,
    // Add extra highlights from other categories if available
    {
      id: "bento-vanilla-sprinkle",
      name: "Korean Bento Cake",
      category: "Bento Cakes",
      description: "Petite 250g birthday cake with custom message piping in eco-friendly sugarcane packaging.",
      startingPrice: 350,
      price: 350,
      image: "/images/bento-cake.jpg",
      tags: ["Birthday Special", "Trending"],
      isFixedPrice: true,
      fixedSizeLabel: "Petite (250g–300g)",
      heartAvailable: true,
    },
    {
      id: "cheesecake-blueberry",
      name: "Blueberry Cheesecake",
      category: "Cheese Cakes",
      description: "Baked New York style cream cheesecake topped with luscious wild blueberry compote.",
      startingPrice: 700,
      halfPrice: 700,
      fullPrice: 1350,
      image: "/images/blueberry-cheesecake.jpg",
      tags: ["Chef's Pick", "Eggless"],
      heartAvailable: false,
    },
  ];

  // State to track selected size & heart shape for each featured cake
  const [selections, setSelections] = useState(
    highlightCakes.reduce((acc, cake) => {
      acc[cake.id] = {
        size: 'half', // 'half' or 'full'
        isHeart: false,
      };
      return acc;
    }, {})
  );

  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

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
    <section id="signature" className="py-16 sm:py-24 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Chef's Bestsellers & Masterpieces</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight">
              Highlighted Bakes
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-charcoal-600 font-light mt-2 sm:mt-3 max-w-xl">
              Handpicked customer favourites baked fresh to order with Belgian cocoa, speculoos, and roasted nuts.
            </p>
          </div>

          {/* Controls & View All Link */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full md:w-auto">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-wider font-semibold text-brand-700 hover:text-brand-900 py-1.5 border-b-2 border-brand-700 hover:border-brand-900 transition-all"
            >
              <span>View All 48+ Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Slider Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all ${
                  canScrollLeft
                    ? 'bg-white border-brand-200 text-charcoal-800 hover:bg-brand-50 hover:border-brand-400 shadow-sm'
                    : 'bg-cream-100/60 border-brand-100 text-charcoal-300 cursor-not-allowed opacity-50'
                }`}
                aria-label="Previous cakes"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all ${
                  canScrollRight
                    ? 'bg-white border-brand-200 text-charcoal-800 hover:bg-brand-50 hover:border-brand-400 shadow-sm'
                    : 'bg-cream-100/60 border-brand-100 text-charcoal-300 cursor-not-allowed opacity-50'
                }`}
                aria-label="Next cakes"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Highlight Slider Carousel */}
        {/* On Mobile: 2-card scroll snapping; on tablet/desktop: 3 to 4 cards */}
        <div
          ref={sliderRef}
          onScroll={checkScroll}
          className="flex gap-3 sm:gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {highlightCakes.map((cake) => {
            const currentSelection = selections[cake.id] || { size: 'half', isHeart: false };
            const isHalf = currentSelection.size === 'half';
            
            let basePrice = 0;
            let sizeLabel = '';

            if (cake.isFixedPrice) {
              basePrice = cake.price;
              sizeLabel = cake.fixedSizeLabel || '';
            } else {
              basePrice = isHalf ? cake.halfPrice : cake.fullPrice;
              sizeLabel = isHalf ? 'Half KG' : 'Full KG';
            }

            const totalPrice = basePrice + (currentSelection.isHeart && cake.heartAvailable ? 50 : 0);

            const whatsappUrl = createWhatsAppOrderLink({
              cakeName: cake.name,
              category: cake.category,
              size: sizeLabel,
              isHeartShape: currentSelection.isHeart && cake.heartAvailable,
              totalPrice: totalPrice,
            });

            return (
              <div
                key={cake.id}
                className="w-[calc(50%-6px)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start group relative rounded-2xl sm:rounded-3xl bg-white border border-brand-100/80 shadow-card hover:shadow-luxury-hover transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100 shimmer-card">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1 z-10">
                    {cake.tags && cake.tags.slice(0, 1).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[8px] sm:text-[10px] uppercase font-bold tracking-wider text-brand-900 shadow-xs border border-brand-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Starting Price Pill */}
                  <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 px-2 sm:px-2.5 py-0.5 rounded-md bg-charcoal-900/80 backdrop-blur-md text-white text-[9px] sm:text-xs font-semibold shadow-xs">
                    ₹{cake.startingPrice}
                  </div>
                </div>

                {/* Card Content & Interactive Controls */}
                <div className="p-3 sm:p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-xs sm:text-base md:text-lg font-bold text-charcoal-900 group-hover:text-brand-800 transition-colors line-clamp-1 sm:line-clamp-2 mb-1">
                      {cake.name}
                    </h3>

                    <p className="text-[10px] sm:text-xs text-charcoal-600 leading-relaxed font-light mb-2.5 sm:mb-4 line-clamp-2">
                      {cake.description}
                    </p>
                  </div>

                  {/* Size & Customization Selectors */}
                  <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-brand-50">
                    {/* Size Selector Buttons */}
                    {!cake.isFixedPrice && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                        <span className="text-[9px] sm:text-[11px] font-medium text-charcoal-500 hidden sm:inline">Size:</span>
                        <div className="flex bg-cream-100 p-0.5 rounded-lg sm:rounded-xl border border-brand-100 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => handleSizeChange(cake.id, 'half')}
                            className={`flex-1 sm:flex-none px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[11px] font-semibold rounded-md transition-all ${
                              isHalf
                                ? 'bg-brand-700 text-white shadow-xs'
                                : 'text-charcoal-700 hover:text-brand-700'
                            }`}
                          >
                            Half (₹{cake.halfPrice})
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSizeChange(cake.id, 'full')}
                            className={`flex-1 sm:flex-none px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[11px] font-semibold rounded-md transition-all ${
                              !isHalf
                                ? 'bg-brand-700 text-white shadow-xs'
                                : 'text-charcoal-700 hover:text-brand-700'
                            }`}
                          >
                            Full (₹{cake.fullPrice})
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Heart Shape Toggle */}
                    {cake.heartAvailable && (
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] sm:text-[11px] text-charcoal-600 flex items-center gap-1">
                          <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-500" />
                          <span className="hidden sm:inline">Heart (+₹50)</span>
                          <span className="sm:hidden">+Heart (₹50)</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleHeartToggle(cake.id)}
                          className={`text-[9px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-md border font-medium transition-all ${
                            currentSelection.isHeart
                              ? 'bg-rose-50 border-rose-300 text-rose-700 font-semibold'
                              : 'border-charcoal-200 text-charcoal-600 hover:border-brand-300'
                          }`}
                        >
                          {currentSelection.isHeart ? '✓' : '+ Add'}
                        </button>
                      </div>
                    )}

                    {/* Price & Order Button */}
                    <div className="flex items-center justify-between pt-1 sm:pt-2">
                      <div>
                        <span className="text-[8px] sm:text-[10px] text-charcoal-400 uppercase tracking-wider block">Price</span>
                        <span className="font-serif text-sm sm:text-lg md:text-xl font-bold text-brand-900">
                          ₹{totalPrice}
                        </span>
                      </div>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-semibold text-[10px] sm:text-xs tracking-wide transition-all shadow-sm shadow-brand-700/20 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Order</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Banner CTA to Explore All Products */}
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-charcoal-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs uppercase tracking-wider font-semibold">
              48+ Artisanal Creations
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Want to see our full bakery menu?
            </h3>
            <p className="text-xs sm:text-sm text-cream-200/80 font-light max-w-xl">
              Explore our full collection featuring Fresh Fruit Cream Cakes, New York Cheesecakes, Korean Bento boxes, and Tea Loaves.
            </p>
          </div>

          <Link
            to="/products"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-white text-brand-950 hover:bg-cream-100 font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 text-brand-700" />
          </Link>
        </div>

      </div>
    </section>
  );
}
