import React from 'react';
import { Cake } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { createWhatsAppOrderLink } from '../utils/whatsapp';

/**
 * 5 Pastel color themes matching the reference design:
 * - warm-yellow
 * - blush-pink
 * - soft-lavender
 * - warm-peach
 * - cocoa-cream
 */
const PASTEL_THEMES = [
  {
    bg: 'bg-[#FFFDF4]',
    border: 'border-[#F8ECC2]',
    iconBg: 'bg-[#FDF3D0]',
    iconColor: 'text-[#B88728]',
    priceBg: 'bg-[#FAF6EA]',
    priceBorder: 'border-[#EFE5CB]',
  },
  {
    bg: 'bg-[#FFF6F7]',
    border: 'border-[#FDD8DC]',
    iconBg: 'bg-[#FDE7EA]',
    iconColor: 'text-[#D94F6B]',
    priceBg: 'bg-[#FBF1F3]',
    priceBorder: 'border-[#F9D6DC]',
  },
  {
    bg: 'bg-[#F8F5FF]',
    border: 'border-[#E7DCFF]',
    iconBg: 'bg-[#EFE8FF]',
    iconColor: 'text-[#6C3EB8]',
    priceBg: 'bg-[#F3EDFF]',
    priceBorder: 'border-[#E3D6FE]',
  },
  {
    bg: 'bg-[#FFF8F2]',
    border: 'border-[#FCE0CA]',
    iconBg: 'bg-[#FDECDD]',
    iconColor: 'text-[#C96B28]',
    priceBg: 'bg-[#FAF1E8]',
    priceBorder: 'border-[#F6DEC9]',
  },
  {
    bg: 'bg-[#FCF9F6]',
    border: 'border-[#EFE5D9]',
    iconBg: 'bg-[#F5EBE0]',
    iconColor: 'text-[#82533B]',
    priceBg: 'bg-[#F7EFE6]',
    priceBorder: 'border-[#EADCCF]',
  },
];

export default function PremiumCakeCard({ product, category, index = 0 }) {
  // Pick one of the 5 pastel themes deterministically by index
  const theme = PASTEL_THEMES[index % PASTEL_THEMES.length];

  // Sized items (Half KG / Full KG)
  if (category.hasSizes) {
    const halfSizeLabel = category.sizeLabels?.half || 'Half KG';
    const fullSizeLabel = category.sizeLabels?.full || 'Full KG';

    const halfWhatsAppUrl = createWhatsAppOrderLink({
      cakeName: product.name,
      category: category.name,
      size: halfSizeLabel,
      isHeartShape: false,
      totalPrice: product.halfPrice,
    });

    const fullWhatsAppUrl = createWhatsAppOrderLink({
      cakeName: product.name,
      category: category.name,
      size: fullSizeLabel,
      isHeartShape: false,
      totalPrice: product.fullPrice,
    });

    return (
      <div
        className={`group relative rounded-2xl ${theme.bg} border ${theme.border} p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
      >
        {/* Top: Circular Icon + Cake Name (No Wishlist Heart) */}
        <div className="flex items-center gap-2.5 min-w-0 mb-3">
          {/* Small circular cake icon on the left */}
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${theme.iconBg} ${theme.iconColor} flex items-center justify-center flex-shrink-0 shadow-2xs`}
          >
            <Cake className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>

          {/* Cake name in premium serif typography */}
          <h4 className="font-serif font-bold text-sm sm:text-base text-charcoal-900 leading-snug break-words">
            {product.name}
          </h4>
        </div>

        {/* Bottom: Half KG & Full KG Pricing Buttons side-by-side */}
        <div className="grid grid-cols-2 gap-2 mt-auto pt-1">
          {/* Half KG / Half Button - Soft pastel themed */}
          <a
            href={halfWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between px-2.5 py-1.5 sm:py-2 rounded-xl ${theme.priceBg} hover:bg-white border ${theme.priceBorder} text-charcoal-900 transition-all text-xs font-semibold group/btn active:scale-98`}
            title={`Order ${halfSizeLabel} ${product.name} on WhatsApp`}
          >
            <div className="flex flex-col text-left leading-none">
              <span className="text-[10px] text-charcoal-500 font-normal mb-0.5">{halfSizeLabel}</span>
              <span className="font-bold text-charcoal-900 text-xs sm:text-sm font-sans">
                ₹{product.halfPrice}
              </span>
            </div>
            <WhatsAppIcon className="w-4 h-4 text-emerald-500 flex-shrink-0 ml-1 group-hover/btn:scale-110 transition-transform" />
          </a>

          {/* Full KG / Full Button - Deep Purple themed */}
          <a
            href={fullWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-2.5 py-1.5 sm:py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white shadow-xs transition-all text-xs font-semibold group/btn active:scale-98"
            title={`Order ${fullSizeLabel} ${product.name} on WhatsApp`}
          >
            <div className="flex flex-col text-left leading-none">
              <span className="text-[10px] text-brand-200 font-normal mb-0.5">{fullSizeLabel}</span>
              <span className="font-bold text-white text-xs sm:text-sm font-sans">
                ₹{product.fullPrice}
              </span>
            </div>
            <WhatsAppIcon className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-1 group-hover/btn:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    );
  }

  // Single-price items (Bento Cakes / Bowls / Cupcakes / Jars / Burgers / Sandwiches etc.)
  const singleWhatsAppUrl = createWhatsAppOrderLink({
    cakeName: product.name,
    category: category.name,
    size: category.fixedSizeLabel || '',
    isHeartShape: false,
    totalPrice: product.price,
  });

  return (
    <div
      className={`group relative rounded-2xl ${theme.bg} border ${theme.border} p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
    >
      {/* Top: Circular Icon + Flavour/Item Name (No Wishlist Heart) */}
      <div className="flex items-center gap-2.5 min-w-0 mb-3">
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${theme.iconBg} ${theme.iconColor} flex items-center justify-center flex-shrink-0 shadow-2xs`}
        >
          <Cake className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>

        <h4 className="font-serif font-bold text-sm sm:text-base text-charcoal-900 leading-snug break-words">
          {product.name}
        </h4>
      </div>

      {/* Bottom: Single Price Order Button */}
      <div className="mt-auto pt-1">
        <a
          href={singleWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white shadow-xs transition-all text-xs font-semibold group/btn active:scale-98"
          title={`Order ${product.name} on WhatsApp`}
        >
          <div className="flex items-center gap-2 leading-none">
            {category.fixedSizeLabel && (
              <span className="text-[10px] text-brand-200 font-normal">
                {category.fixedSizeLabel}
              </span>
            )}
            <span className="font-bold text-white text-sm font-sans">
              ₹{product.price}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-brand-200">Order</span>
            <WhatsAppIcon className="w-4 h-4 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
          </div>
        </a>
      </div>
    </div>
  );
}
