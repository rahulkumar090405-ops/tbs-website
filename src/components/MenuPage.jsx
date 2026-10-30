import React, { useState, useEffect, useMemo } from 'react';
import {
  Cake,
  PieChart,
  Coffee,
  Utensils,
  Search,
  Sparkles,
  Heart,
  Crown,
  Leaf,
  Truck,
  ArrowUpDown
} from 'lucide-react';
import { MENU_HUBS, MENU_CATEGORIES } from '../data/menuData';
import PremiumCakeCard from './PremiumCakeCard';
import MuffinsSection from './MuffinsSection';

export default function MenuPage({ initialHub = "all" }) {
  const [selectedHub, setSelectedHub] = useState(initialHub);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-asc"); // 'price-asc', 'price-desc', 'name-asc'

  // Sync selected hub when navigating via header links (e.g. /menu/cakes, /menu/desserts)
  useEffect(() => {
    setSelectedHub(initialHub);
    setActiveCategoryFilter("all");
  }, [initialHub]);

  const hubIconMap = {
    all: Utensils,
    cakes: Cake,
    desserts: PieChart,
    snacks: Coffee,
  };

  const categoryIconMap = {
    'cream-cakes': Cake,
    'premium-cakes': Sparkles,
    'bento-cakes': Cake,
    'cheese-cakes': PieChart,
    'cup-cakes': Cake,
    'jar-cakes': Utensils,
    'brownies': Cake,
    'muffins': Cake,
    'muffins-small': Cake,
    'muffins-medium': Cake,
    'muffins-large': Cake,
    'bowl-cakes': Utensils,
    'burgers': Utensils,
    'sandwiches': Utensils,
    'korean-buns': Cake,
    'tea-cakes': Coffee,
    'shakes': Coffee,
    'mojitos': Coffee,
  };

  const currentHubInfo = MENU_HUBS.find((h) => h.id === selectedHub) || MENU_HUBS[0];

  // Filter categories according to the selected Hub (strictly in currentHubInfo.categoryIds order)
  const hubCategories = useMemo(() => {
    if (selectedHub === "all") {
      return MENU_CATEGORIES;
    }
    const targetCategoryIds = currentHubInfo.categoryIds || [];
    return targetCategoryIds
      .map((id) => MENU_CATEGORIES.find((cat) => cat.id === id))
      .filter(Boolean);
  }, [selectedHub, currentHubInfo]);

  const handleSelectHub = (hubId) => {
    setSelectedHub(hubId);
    setActiveCategoryFilter("all");
  };

  // Filter and sort products dynamically
  const displayedCategories = useMemo(() => {
    return hubCategories
      .map((cat) => {
        if (activeCategoryFilter !== "all" && cat.id !== activeCategoryFilter) {
          return null;
        }

        const filteredProducts = cat.products.filter((p) => {
          const matchName = p.name.toLowerCase().includes(searchQuery.toLowerCase());
          return matchName;
        });

        if (filteredProducts.length === 0) return null;

        // Sorting
        const sortedProducts = [...filteredProducts].sort((a, b) => {
          const priceA = a.small ?? a.halfPrice ?? a.price ?? a.large ?? 0;
          const priceB = b.small ?? b.halfPrice ?? b.price ?? b.large ?? 0;

          if (sortBy === "price-asc") {
            return priceA - priceB;
          } else if (sortBy === "price-desc") {
            return priceB - priceA;
          } else if (sortBy === "name-asc") {
            return a.name.localeCompare(b.name);
          }
          return 0;
        });

        return {
          ...cat,
          products: sortedProducts,
        };
      })
      .filter(Boolean);
  }, [hubCategories, activeCategoryFilter, searchQuery, sortBy]);

  const totalFilteredItems = useMemo(() => {
    return displayedCategories.reduce((acc, cat) => acc + cat.products.length, 0);
  }, [displayedCategories]);

  return (
    <div className="pt-16 sm:pt-20 pb-20 bg-[#FDFBF7] min-h-screen text-charcoal-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* SECTION 3: MENU HERO SECTION                              */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2 pb-6 sm:pb-8 border-b border-brand-100/60">
          
          {/* Left: Heading & Tagline */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal-900">
                Our <span className="text-brand-800">Menu</span>
              </h1>
              <div className="hidden sm:flex flex-col gap-1 -mt-4 text-brand-600">
                <span className="w-4 h-0.5 bg-brand-700 rounded-full rotate-12" />
                <span className="w-3 h-0.5 bg-brand-500 rounded-full rotate-6" />
                <span className="w-2 h-0.5 bg-brand-400 rounded-full -rotate-12" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-charcoal-500 font-medium tracking-wide mt-2">
              Freshly Baked <span className="mx-1.5 text-brand-300">•</span> Premium Ingredients <span className="mx-1.5 text-brand-300">•</span> Made With Love
            </p>
          </div>

          {/* Right: 4 Feature Highlights (Hidden on mobile) */}
          <div className="hidden md:grid grid-cols-4 gap-2.5 sm:gap-3 bg-white/80 p-2.5 sm:p-3 rounded-2xl border border-brand-100/80 shadow-2xs">
            <div className="flex flex-col items-center text-center px-2 py-1">
              <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-800 flex items-center justify-center mb-1">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-bold text-[11px] sm:text-xs text-charcoal-900 leading-tight">Purely</span>
              <span className="text-[10px] text-charcoal-500 font-light">Homemade</span>
            </div>

            <div className="flex flex-col items-center text-center px-2 py-1">
              <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-800 flex items-center justify-center mb-1">
                <Crown className="w-4 h-4" />
              </div>
              <span className="font-bold text-[11px] sm:text-xs text-charcoal-900 leading-tight">Premium</span>
              <span className="text-[10px] text-charcoal-500 font-light">Ingredients</span>
            </div>

            <div className="flex flex-col items-center text-center px-2 py-1">
              <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-800 flex items-center justify-center mb-1">
                <Heart className="w-4 h-4" />
              </div>
              <span className="font-bold text-[11px] sm:text-xs text-charcoal-900 leading-tight">No Palm Oil</span>
              <span className="text-[10px] text-charcoal-500 font-light">No Artificial Colours</span>
            </div>

            <div className="flex flex-col items-center text-center px-2 py-1">
              <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-800 flex items-center justify-center mb-1">
                <Truck className="w-4 h-4" />
              </div>
              <span className="font-bold text-[11px] sm:text-xs text-charcoal-900 leading-tight">Free Delivery</span>
              <span className="text-[10px] text-charcoal-500 font-light">Prateek Grand City</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 4: MAIN MENU NAVIGATION (4 Rounded Horizontal Tabs)*/}
        {/* ========================================================= */}
        <div className="flex items-center gap-2.5 overflow-x-auto pt-5 sm:pt-6 pb-2 scrollbar-none">
          {MENU_HUBS.map((hub) => {
            const Icon = hubIconMap[hub.id] || Utensils;
            const isSelected = selectedHub === hub.id;
            const countNum = hub.categoryIds.reduce((sum, catId) => {
              const cat = MENU_CATEGORIES.find(c => c.id === catId);
              return sum + (cat ? cat.products.length : 0);
            }, 0);

            return (
              <button
                key={hub.id}
                type="button"
                onClick={() => handleSelectHub(hub.id)}
                className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 shadow-2xs ${
                  isSelected
                    ? 'bg-brand-800 text-white shadow-sm ring-1 ring-brand-800'
                    : 'bg-white hover:bg-cream-100 text-charcoal-800 border border-brand-200/90'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? 'text-white' : 'text-brand-800'}`} />
                <span>{hub.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand-900'
                  }`}
                >
                  {countNum}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* SECTION 5: SEARCH, FILTER AND SORTING PANEL               */}
        {/* ========================================================= */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-brand-100/90 shadow-2xs mt-3 sm:mt-4 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-64 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
              <input
                type="text"
                placeholder="Search cake flavour..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-brand-200/80 focus:border-brand-700 focus:bg-white text-xs text-charcoal-900 outline-none transition-all placeholder:text-charcoal-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-400 hover:text-charcoal-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dynamic Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none flex-grow">
              <button
                type="button"
                onClick={() => setActiveCategoryFilter("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategoryFilter === "all"
                    ? 'bg-brand-800 text-white shadow-2xs'
                    : 'bg-white hover:bg-cream-100 text-charcoal-700 border border-brand-200/70'
                }`}
              >
                All ({hubCategories.reduce((acc, c) => acc + c.products.length, 0)})
              </button>

              {hubCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                    activeCategoryFilter === cat.id
                      ? 'bg-brand-800 text-white shadow-2xs'
                      : 'bg-white hover:bg-cream-100 text-charcoal-700 border border-brand-200/70'
                  }`}
                >
                  {cat.name} ({cat.products.length})
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-shrink-0 self-end lg:self-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-brand-200/90 text-xs font-semibold text-charcoal-800 shadow-2xs hover:border-brand-400">
                <ArrowUpDown className="w-3.5 h-3.5 text-brand-700" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-charcoal-800 outline-none cursor-pointer pr-1"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTIONS 6 & 7: CATEGORY SECTIONS & CAKE GRID (NO HEARTS) */}
        {/* ========================================================= */}
        {displayedCategories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-brand-100 p-8 max-w-md mx-auto">
            <p className="font-serif text-lg font-bold text-charcoal-900 mb-1">No matching items found</p>
            <p className="text-xs text-charcoal-500 mb-4">
              Try searching for another item or resetting the filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategoryFilter('all'); }}
              className="px-4 py-2 rounded-xl bg-brand-800 text-white text-xs font-semibold shadow-xs hover:bg-brand-900 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {displayedCategories.map((category) => {
              if (category.id === 'muffins') {
                return (
                  <MuffinsSection
                    key={category.id}
                    category={category}
                    searchQuery={searchQuery}
                  />
                );
              }

              const CatIcon = categoryIconMap[category.id] || Cake;

              return (
                <div key={category.id} className="space-y-4">
                  
                  {/* Category Section Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-brand-100/80 gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-100/70 text-brand-800 flex items-center justify-center flex-shrink-0 shadow-2xs">
                        <CatIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-950">
                        {category.name}
                      </h2>

                      <span className="text-[11px] font-bold text-brand-800 bg-brand-100/80 px-2.5 py-0.5 rounded-full">
                        {category.products.length} Items
                      </span>

                      <span className="hidden md:inline-block w-16 h-0.5 bg-brand-200/80 rounded-full" />
                    </div>

                    {category.subtitle && (
                      <span className="text-xs text-charcoal-500 font-light">
                        {category.subtitle}
                      </span>
                    )}
                  </div>

                  {/* 4-Column Desktop Grid / 2-Column Tablet / 1-Column Mobile Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
                    {category.products.map((product, idx) => (
                      <PremiumCakeCard
                        key={product.id}
                        product={product}
                        category={category}
                        index={idx}
                      />
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
