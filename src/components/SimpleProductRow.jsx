import React from 'react';
import { Cake } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { createWhatsAppOrderLink } from '../utils/whatsapp';

export default function SimpleProductRow({ product, category }) {
  // If item has sizes (Half / Full)
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
      <div className="bg-white rounded-xl border border-brand-100 hover:border-brand-300 shadow-2xs hover:shadow-xs transition-all p-3 flex flex-col justify-between gap-2.5">
        
        {/* Top: Cake Icon + Full Flavour Name (No truncation) */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-brand-50 text-brand-700 flex items-center justify-center flex-shrink-0">
            <Cake className="w-3.5 h-3.5" />
          </div>
          <span className="font-serif font-bold text-sm sm:text-base text-charcoal-900 leading-snug break-words">
            {product.name}
          </span>
        </div>

        {/* Bottom: Two distinct, clean buttons for Half & Full */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-brand-50/80">
          
          {/* Half KG Button */}
          <a
            href={halfWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-cream-100 hover:bg-emerald-50 border border-brand-200/80 hover:border-emerald-400 text-charcoal-800 hover:text-emerald-900 transition-all text-xs font-semibold active:scale-98"
            title={`Order Half KG ${product.name} on WhatsApp`}
          >
            <span className="text-[11px] text-charcoal-500 font-medium">Half</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-brand-900">₹{product.halfPrice}</span>
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Full KG Button */}
          <a
            href={fullWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-brand-700 hover:bg-brand-800 text-white shadow-2xs transition-all text-xs font-semibold active:scale-98"
            title={`Order Full KG ${product.name} on WhatsApp`}
          >
            <span className="text-[11px] text-brand-200 font-medium">Full</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-white">₹{product.fullPrice}</span>
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </div>
          </a>

        </div>

      </div>
    );
  }

  // Single price items (Bento Cakes & Bowl Cakes)
  const singleWhatsAppUrl = createWhatsAppOrderLink({
    cakeName: product.name,
    category: category.name,
    size: category.fixedSizeLabel || '',
    isHeartShape: false,
    totalPrice: product.price,
  });

  return (
    <div className="bg-white rounded-xl border border-brand-100 hover:border-brand-300 shadow-2xs hover:shadow-xs transition-all p-3 flex items-center justify-between gap-2.5">
      
      {/* Left: Cake Icon + Full Flavour Name */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="w-6 h-6 rounded-md bg-brand-50 text-brand-700 flex items-center justify-center flex-shrink-0">
          <Cake className="w-3.5 h-3.5" />
        </div>
        <span className="font-serif font-bold text-sm sm:text-base text-charcoal-900 leading-snug break-words">
          {product.name}
        </span>
      </div>

      {/* Right: Portion & Order Button */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {category.fixedSizeLabel && (
          <span className="hidden sm:inline text-[10px] text-charcoal-500 bg-cream-100 px-1.5 py-0.5 rounded">
            {category.fixedSizeLabel}
          </span>
        )}
        <a
          href={singleWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-700 hover:bg-brand-800 text-white shadow-2xs transition-all text-xs font-semibold active:scale-98"
          title={`Order ${product.name} on WhatsApp`}
        >
          <span className="font-bold">₹{product.price}</span>
          <span className="text-[10px] text-brand-200">Order</span>
          <WhatsAppIcon className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}
