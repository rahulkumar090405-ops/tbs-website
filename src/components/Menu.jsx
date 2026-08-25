import React, { useState, useMemo } from 'react';
import { Sparkles, Search, Cake, Gift, PieChart, Soup, Coffee, Heart, Info, ArrowRight } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/menuData';
import ProductCard from './ProductCard';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping for tabs
  const iconMap = {
    'cream-cakes': Cake,
    'premium-cakes': Sparkles,
    'bento-cakes': Gift,
    'cheese-cakes': PieChart,
    'bowl-cakes': Soup,
    'tea-cakes': Coffee,
  };

  // Filtered categories and products
  const displayCategories = useMemo(() => {
    return MENU_CATEGORIES.map((cat) => {
      // Filter by category tab
      if (activeCategory !== 'all' && cat.id !== activeCategory) {
        return null;
      }

      // Filter by search query
      const filteredProducts = cat.products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      if (filteredProducts.length === 0) return null;

      return {
        ...cat,
        products: filteredProducts,
      };
    }).filter(Boolean);
  }, [activeCategory, searchQuery]);

  const totalProductCount = useMemo(() => {
    return displayCategories.reduce((acc, cat) => acc + cat.products.length, 0);
  }, [displayCategories]);

  return (
    <section id="menu" className="py-20 md:py-28 bg-cream-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cake className="w-3.5 h-3.5 text-brand-600" />
            <span>Complete Boutique Menu</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight mb-4">
            Explore Our Creations
          </h2>

          <p className="text-base sm:text-lg text-charcoal-600 font-light">
            Every product is freshly baked to order using premium ingredients with zero palm oil. Select any size and order straight via WhatsApp.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mb-12 space-y-6">
          
          {/* Search Input Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
            <input
              type="text"
              placeholder="Search flavours (e.g. Biscoff, Kunafa, Mango...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-brand-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-200 outline-none text-sm text-charcoal-800 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-charcoal-400 hover:text-charcoal-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Horizontally Scrollable Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-brand-700 text-white shadow-md shadow-brand-700/20'
                  : 'bg-white text-charcoal-700 hover:bg-brand-50 border border-brand-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Cakes (48)</span>
            </button>

            {MENU_CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.id] || Cake;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-brand-700 text-white shadow-md shadow-brand-700/20'
                      : 'bg-white text-charcoal-700 hover:bg-brand-50 border border-brand-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Categories & Product Cards */}
        {displayCategories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-brand-100 p-8 max-w-lg mx-auto">
            <p className="text-base text-charcoal-600 mb-2">No cakes found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="text-xs text-brand-700 font-semibold underline mt-2"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {displayCategories.map((category) => (
              <div key={category.id} className="space-y-6">
                
                {/* Category Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-200/70 gap-2">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">
                        {category.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold">
                        {category.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal-600 font-light mt-1">
                      {category.subtitle}
                    </p>
                  </div>

                  {category.heartShapeAvailable && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium self-start sm:self-auto">
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span>Heart shape available (+₹50)</span>
                    </div>
                  )}
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      category={category}
                    />
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Notice Info Card at Bottom of Menu */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-brand-50/70 border border-brand-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-brand-700 text-white flex items-center justify-center flex-shrink-0 mt-1">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-brand-950 mb-1">
                Special Customisations & Pre-Orders
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed">
                Need real fruit toppings, custom message piping, special anniversary shapes, or multi-tier wedding themes? We happily craft customized bespoke designs.
              </p>
            </div>
          </div>

          <a
            href="#customise"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <span>Design Custom Cake</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
