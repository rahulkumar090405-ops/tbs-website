import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, Heart, ShieldCheck, Award, ChevronLeft, ChevronRight, Cake } from 'lucide-react';
import { createGeneralWhatsAppLink, createWhatsAppOrderLink } from '../utils/whatsapp';

export default function Hero() {
  // 3 Casual Cake Images: Custom cake, Birthday/Bento cake, Chocolate cake
  const heroCakes = [
    {
      id: 'custom-cake',
      title: 'Custom Designer Cake',
      subtitle: 'Bespoke 2-Tier Celebration',
      tag: 'Custom Crafted',
      image: '/images/hero-cake.jpg',
      price: 1250,
      size: '1 KG',
      desc: 'Handcrafted with edible gold leaf, fresh organic fruits, and delicate florals.',
    },
    {
      id: 'bento-cake',
      title: 'Birthday & Bento Cake',
      subtitle: 'Petite Korean-Style Bento',
      tag: 'Birthday Special',
      image: '/images/bento-cake.jpg',
      price: 350,
      size: '250g–300g',
      desc: 'Adorable pastel buttercream piping in eco-friendly sugarcane packaging.',
    },
    {
      id: 'choco-cake',
      title: 'Belgian Chocolate Truffle',
      subtitle: 'Decadent Ganache Glaze',
      tag: 'Chocoholic Favorite',
      image: '/images/choco-truffle.jpg',
      price: 600,
      size: 'Half KG',
      desc: 'Pure melted dark chocolate truffle ganache with silky sponge layers.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Gentle auto-rotate carousel every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroCakes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroCakes.length]);

  const activeCake = heroCakes[activeIndex];

  const activeCakeWhatsAppUrl = createWhatsAppOrderLink({
    cakeName: activeCake.title,
    size: activeCake.size,
    totalPrice: activeCake.price,
    category: 'Hero Showcase',
  });

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-radial-glow">
      {/* Background Ambience */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-gold-400/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Brand Story & Call to Actions */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Top Brand Positioning Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/80 border border-brand-200/80 text-brand-800 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
              <span>Purely Homemade • Freshly Baked</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-charcoal-900 tracking-tight leading-[1.12] mb-6">
              Where every slice <br className="hidden sm:inline" />
              <span className="relative inline-block text-brand-700 italic font-cormorant font-semibold">
                tells a story
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-brand-300/60 rounded-full" />
              </span>
            </h1>

            {/* Short Description */}
            <p className="text-base sm:text-lg md:text-xl text-charcoal-600 max-w-xl mb-8 leading-relaxed font-light">
              Premium homemade cakes crafted with quality ingredients, real care, and unforgettable flavours. Baked fresh to order without shortcuts.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-brand-700/25 hover:shadow-brand-700/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Cake className="w-4 h-4" />
                <span>Explore All Cakes</span>
              </Link>

              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-cream-100 border border-brand-200 text-brand-900 font-semibold text-sm tracking-wide transition-all shadow-sm hover:shadow-md hover:border-brand-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Small Trust Indicator Ribbon */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-6 border-t border-brand-100/80 text-xs font-medium text-charcoal-600">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-700" />
                <span>Freshly Baked Daily</span>
              </div>
              <span className="hidden sm:inline text-brand-200">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-700" />
                <span>Zero Palm Oil</span>
              </div>
              <span className="hidden sm:inline text-brand-200">•</span>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-brand-700 fill-brand-700/20" />
                <span>Made With Real Care</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3-Cake Interactive Collage Carousel */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Main Active Featured Slide */}
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/10 border-4 border-white aspect-[4/3] group shimmer-card bg-cream-100">
              <img
                key={activeCake.id}
                src={activeCake.image}
                alt={activeCake.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Top Tag & Prev/Next Arrows */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-brand-900 shadow-sm border border-brand-100">
                  {activeCake.tag}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev === 0 ? heroCakes.length - 1 : prev - 1))}
                    className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-charcoal-800 flex items-center justify-center shadow-sm transition-all"
                    aria-label="Previous cake"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % heroCakes.length)}
                    className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-charcoal-800 flex items-center justify-center shadow-sm transition-all"
                    aria-label="Next cake"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom In-Image Info Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-card border border-white/70 shadow-lg flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-brand-700 truncate">
                    {activeCake.subtitle}
                  </p>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-charcoal-900 truncate">
                    {activeCake.title}
                  </h3>
                  <p className="text-[11px] text-charcoal-500 font-light truncate">
                    {activeCake.size} • ₹{activeCake.price}
                  </p>
                </div>

                <a
                  href={activeCakeWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order</span>
                </a>
              </div>
            </div>

            {/* 3 Collage Thumbnail Selectors Below Carousel */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg mt-4">
              {heroCakes.map((cake, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={cake.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`relative rounded-2xl overflow-hidden p-1.5 border-2 text-left transition-all duration-300 flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-white border-brand-700 shadow-md ring-2 ring-brand-700/20 -translate-y-0.5'
                        : 'bg-white/80 border-brand-100 hover:border-brand-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={cake.image}
                      alt={cake.title}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1 hidden sm:block">
                      <p className="text-[10px] font-bold text-charcoal-900 truncate leading-tight">
                        {cake.title}
                      </p>
                      <p className="text-[9px] text-brand-700 font-semibold">
                        ₹{cake.price}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
