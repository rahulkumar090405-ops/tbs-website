import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, Cake, Gift, PieChart, Soup, Coffee, Heart, ArrowUpDown, ChevronRight, MessageCircle } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/menuData';
import ProductCard from '../components/ProductCard';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high', 'name-asc'

  // Icon mapping for category tabs
  const iconMap = {
    'cream-cakes': Cake,
    'premium-cakes': Sparkles,
    'bento-cakes': Gift,
    'cheese-cakes': PieChart,
    'bowl-cakes': Soup,
    'tea-cakes': Coffee,
  };

  // Process and filter products
  const displayCategories = useMemo(() => {
    return MENU_CATEGORIES.map((cat) => {
      // Filter by category tab
      if (activeCategory !== 'all' && cat.id !== activeCategory) {
        return null;
      }

      // Filter products by search query
      let filtered = cat.products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (cat.name && cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      if (filtered.length === 0) return null;

      // Apply sorting if requested
      if (sortBy === 'price-low') {
        filtered = [...filtered].sort((a, b) => {
          const priceA = a.startingPrice || a.price || a.halfPrice || 0;
          const priceB = b.startingPrice || b.price || b.halfPrice || 0;
          return priceA - priceB;
        });
      } else if (sortBy === 'price-high') {
        filtered = [...filtered].sort((a, b) => {
          const priceA = a.startingPrice || a.price || a.halfPrice || 0;
          const priceB = b.startingPrice || b.price || b.halfPrice || 0;
          return priceB - priceA;
        });
      } else if (sortBy === 'name-asc') {
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      }

      return {
        ...cat,
        products: filtered,
      };
    }).filter(Boolean);
  }, [activeCategory, searchQuery, sortBy]);

  const totalFilteredCount = useMemo(() => {
    return displayCategories.reduce((acc, cat) => acc + cat.products.length, 0);
  }, [displayCategories]);

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-cream-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center gap-2 text-xs text-charcoal-500">
          <Link to="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
          <span className="font-semibold text-brand-900">All Products</span>
        </div>

        {/* Page Title & Intro */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Complete Boutique Catalog</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight mb-3">
            All Cakes & Bakes
          </h1>

          <p className="text-sm sm:text-base text-charcoal-600 font-light max-w-2xl">
            Explore all 48+ freshly baked cakes, bento boxes, cheesecakes, and tea loaves. Baked fresh to order with premium Belgian cocoa, real butter, and zero palm oil.
          </p>
        </div>

        {/* Filter, Search & Sort Bar */}
        <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          
          {/* Top Controls: Search Input & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            
            {/* Search Input Bar */}
            <div className="w-full sm:max-w-md relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
              <input
                type="text"
                placeholder="Search flavours (e.g. Biscoff, Kunafa, Truffle, Mango...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-16 py-2.5 sm:py-3 rounded-full bg-white border border-brand-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-200 outline-none text-xs sm:text-sm text-charcoal-800 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-700 hover:text-brand-900"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Product Count & Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto text-xs">
              <span className="text-charcoal-500 font-medium whitespace-nowrap">
                Showing <strong className="text-charcoal-900">{totalFilteredCount}</strong> items
              </span>

              <div className="flex items-center gap-1.5 bg-white border border-brand-200 px-3 py-2 rounded-full shadow-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-brand-700" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-charcoal-800 outline-none cursor-pointer"
                >
                  <option value="default">Default Order</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>

          </div>

          {/* Horizontally Scrollable Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 ${
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
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-brand-700 text-white shadow-md shadow-brand-700/20'
                      : 'bg-white text-charcoal-700 hover:bg-brand-50 border border-brand-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name} ({cat.products.length})</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Categories & Products 2-in-a-Row Responsive Grid */}
        {displayCategories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-brand-100 p-8 max-w-lg mx-auto">
            <Cake className="w-12 h-12 text-brand-300 mx-auto mb-3" />
            <p className="text-base text-charcoal-700 font-semibold mb-1">No cakes found matching "{searchQuery}"</p>
            <p className="text-xs text-charcoal-500 mb-4">Try searching for other flavours like Chocolate, Mango, Truffle or Biscoff.</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); setSortBy('default'); }}
              className="px-5 py-2 rounded-full bg-brand-700 text-white text-xs font-semibold hover:bg-brand-800 transition-all shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {displayCategories.map((category) => (
              <div key={category.id} className="space-y-4 sm:space-y-6">
                
                {/* Category Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-brand-200/80 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-brand-950">
                        {category.name}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px] sm:text-xs font-semibold">
                        {category.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal-600 font-light mt-1">
                      {category.subtitle}
                    </p>
                  </div>

                  {category.heartShapeAvailable && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] sm:text-xs font-medium self-start sm:self-auto">
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span>Heart shape available (+₹50)</span>
                    </div>
                  )}
                </div>

                {/* 2 Cakes per row on mobile, 3 on tablet, 4 on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
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

        {/* Custom Cake & WhatsApp Banner at Bottom */}
        <div className="mt-16 sm:mt-20 p-6 sm:p-10 rounded-3xl bg-white border border-brand-200/90 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-[11px] uppercase tracking-wider font-bold">
              Customised Celebrations
            </span>
            <h3 className="font-serif text-2xl font-bold text-charcoal-900">
              Need a customized cake design?
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 font-light max-w-xl">
              We create multi-tier birthday cakes, anniversary themes, real floral decor, and bespoke flavour pairings. Talk directly to our chef on WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/#customise"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-cream-100 hover:bg-cream-200 text-brand-900 font-semibold text-xs uppercase tracking-wider transition-all border border-brand-200"
            >
              Custom Cake Form
            </Link>

            <a
              href={createGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
