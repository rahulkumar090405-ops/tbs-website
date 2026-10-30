import React, { useState } from 'react';
import { MessageCircle, Heart } from 'lucide-react';
import { createWhatsAppOrderLink } from '../utils/whatsapp';

export default function ProductCard({ product, category }) {
  // State for size selection and heart shape
  const [selectedSize, setSelectedSize] = useState('half'); // 'half' or 'full'
  const [isHeart, setIsHeart] = useState(false);

  // Price calculations
  let basePrice = 0;
  let sizeLabel = '';

  if (category.hasSizes) {
    if (selectedSize === 'half') {
      basePrice = product.halfPrice;
      sizeLabel = category.sizeLabels ? category.sizeLabels.half : 'Half KG';
    } else {
      basePrice = product.fullPrice;
      sizeLabel = category.sizeLabels ? category.sizeLabels.full : 'Full KG';
    }
  } else {
    basePrice = product.price;
    sizeLabel = category.fixedSizeLabel || '';
  }

  // Heart shape addition
  const heartCost = isHeart && category.heartShapeAvailable ? 50 : 0;
  const totalPrice = basePrice + heartCost;

  // WhatsApp order URL
  const whatsappUrl = createWhatsAppOrderLink({
    cakeName: product.name,
    category: category.name,
    size: sizeLabel,
    isHeartShape: isHeart && category.heartShapeAvailable,
    totalPrice: totalPrice,
  });

  return (
    <div className="group rounded-2xl sm:rounded-3xl bg-white border border-brand-100/80 shadow-sm hover:shadow-luxury-hover hover:border-brand-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100 shimmer-card">
        <img
          src={product.image || category.image}
          alt={`${product.name} - ${category.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Tags */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1">
          {product.tags && product.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[9px] sm:text-[10px] font-semibold text-brand-900 border border-brand-100/80 shadow-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Fixed Size Badge for Bento / Bowl */}
        {!category.hasSizes && category.fixedSizeLabel && (
          <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 px-2 py-0.5 rounded-md bg-charcoal-900/75 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-medium">
            {category.fixedSizeLabel}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-start justify-between gap-1 mb-1 sm:mb-1.5">
            <h4 className="font-serif text-xs sm:text-base md:text-lg font-bold text-charcoal-900 group-hover:text-brand-800 transition-colors line-clamp-1 sm:line-clamp-2">
              {product.name}
            </h4>
          </div>

          <p className="text-[10px] sm:text-xs text-charcoal-600 font-light leading-relaxed mb-2.5 sm:mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Sizing & Add-ons Controls */}
        <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-brand-50">
          
          {/* Dual Size Selector (Half vs Full) */}
          {category.hasSizes && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
              <span className="text-[9px] sm:text-[11px] font-medium text-charcoal-500 hidden sm:inline">Size:</span>
              <div className="flex bg-cream-100 p-0.5 rounded-lg sm:rounded-xl border border-brand-100 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedSize('half')}
                  className={`flex-1 sm:flex-none px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-semibold rounded-md sm:rounded-lg transition-all ${
                    selectedSize === 'half'
                      ? 'bg-brand-700 text-white shadow-xs'
                      : 'text-charcoal-700 hover:text-brand-700'
                  }`}
                >
                  {category.sizeLabels?.half || 'Half'} (₹{product.halfPrice})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSize('full')}
                  className={`flex-1 sm:flex-none px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-semibold rounded-md sm:rounded-lg transition-all ${
                    selectedSize === 'full'
                      ? 'bg-brand-700 text-white shadow-xs'
                      : 'text-charcoal-700 hover:text-brand-700'
                  }`}
                >
                  {category.sizeLabels?.full || 'Full'} (₹{product.fullPrice})
                </button>
              </div>
            </div>
          )}

          {/* Heart Shape Customization (+₹50) */}
          {category.heartShapeAvailable && (
            <div className="flex items-center justify-between">
              <span className="text-[9px] sm:text-[11px] text-charcoal-600 flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-500" />
                <span className="hidden sm:inline">Heart (+₹50)</span>
                <span className="sm:hidden">+Heart (₹50)</span>
              </span>
              <button
                type="button"
                onClick={() => setIsHeart(!isHeart)}
                className={`text-[9px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-md border transition-all ${
                  isHeart
                    ? 'bg-rose-50 border-rose-300 text-rose-700 font-semibold'
                    : 'border-charcoal-200 text-charcoal-600 hover:border-brand-300'
                }`}
              >
                {isHeart ? '✓' : '+ Add'}
              </button>
            </div>
          )}

          {/* Price and WhatsApp Button */}
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
}
