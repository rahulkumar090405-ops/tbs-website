import React from 'react';
import { Cake, Info } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { createWhatsAppOrderLink } from '../utils/whatsapp';
import { WHATSAPP_NUMBER } from '../data/menuData';

// Subtle pastel icon styling for each flavour matching reference image
const FLAVOUR_STYLES = {
  Vanilla: {
    bg: 'bg-[#FEF3C7]',
    text: 'text-[#D97706]',
  },
  Pineapple: {
    bg: 'bg-[#FFE4E6]',
    text: 'text-[#E11D48]',
  },
  Strawberry: {
    bg: 'bg-[#FCE7F3]',
    text: 'text-[#DB2777]',
  },
  Butterscotch: {
    bg: 'bg-[#FFEDD5]',
    text: 'text-[#EA580C]',
  },
  Blueberry: {
    bg: 'bg-[#EDE9FE]',
    text: 'text-[#7C3AED]',
  },
  Chocolate: {
    bg: 'bg-[#EFEAE2]',
    text: 'text-[#78350F]',
  },
  'Choco Lava': {
    bg: 'bg-[#D1FAE5]',
    text: 'text-[#059669]',
  },
  Biscoff: {
    bg: 'bg-[#FFE4E6]',
    text: 'text-[#BE123C]',
  },
  Mawa: {
    bg: 'bg-[#E0F2FE]',
    text: 'text-[#0284C7]',
  },
  'Red Velvet': {
    bg: 'bg-[#FCE7F3]',
    text: 'text-[#E11D48]',
  },
  'Banana Walnut': {
    bg: 'bg-[#FEF3C7]',
    text: 'text-[#B45309]',
  },
};

export default function MuffinsSection({ category, searchQuery = '' }) {
  const products = (category.products || []).filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (products.length === 0) return null;

  return (
    <section id={category.id} className="scroll-mt-36 mb-12 sm:mb-16">
      {/* Outer Card Container Matching Reference Design */}
      <div className="bg-[#FFFDFA] rounded-3xl p-4 sm:p-7 border border-[#F4EBE2] shadow-xs">
        
        {/* ========================================================= */}
        {/* 1. SECTION HEADING & INFORMATION BADGE                    */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F5EBE1]">
          {/* Left: Pastel Icon + "Muffins" + Badge + Decorative Line */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F3E8FF] text-[#6B21A8] flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Cake className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2A1635] tracking-tight">
              Muffins
            </h3>

            <span className="px-3 py-1 rounded-full bg-[#F3E8FF] text-[#6B21A8] text-xs font-semibold">
              {products.length} Flavours
            </span>

            <div className="hidden sm:block w-12 h-0.5 bg-[#DDD6FE] rounded-full ml-1" />
          </div>

          {/* Right: Info Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF1F2] border border-[#FECDD3] text-[#E11D48] text-xs font-medium self-start sm:self-auto shadow-2xs">
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Min Order 6 Qty in Same Flavour & Min Order ₹200</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. FIVE-COLUMN PRICING GRID / TABLE                       */}
        {/* ========================================================= */}
        <div className="overflow-x-auto -mx-2 sm:mx-0 pt-4">
          <div className="min-w-[620px] px-2 sm:px-0">
            {/* Table Column Headers */}
            <div className="grid grid-cols-12 gap-3 px-4 py-2.5 rounded-xl bg-[#FAF5FF] text-xs font-bold uppercase tracking-wider text-[#581C87] items-center mb-2">
              <div className="col-span-4 text-left">FLAVOUR</div>
              <div className="col-span-2 text-center">SMALL</div>
              <div className="col-span-2 text-center">MEDIUM</div>
              <div className="col-span-2 text-center">LARGE</div>
              <div className="col-span-2 text-center">ORDER</div>
            </div>

            {/* Flavour Rows */}
            <div className="divide-y divide-[#F5EBE1]/60">
              {products.map((item) => {
                const style = FLAVOUR_STYLES[item.name] || {
                  bg: 'bg-[#F3E8FF]',
                  text: 'text-[#6B21A8]',
                };

                // WhatsApp links for each size
                const smallLink = item.small
                  ? createWhatsAppOrderLink({
                      cakeName: `${item.name} Muffin`,
                      category: 'Muffins',
                      size: 'Small',
                      totalPrice: item.small,
                    })
                  : null;

                const mediumLink = item.medium
                  ? createWhatsAppOrderLink({
                      cakeName: `${item.name} Muffin`,
                      category: 'Muffins',
                      size: 'Medium',
                      totalPrice: item.medium,
                    })
                  : null;

                const largeLink = item.large
                  ? createWhatsAppOrderLink({
                      cakeName: `${item.name} Muffin`,
                      category: 'Muffins',
                      size: 'Large',
                      totalPrice: item.large,
                    })
                  : null;

                const generalOrderLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hello The Baking Spot! I would like to order ${item.name} Muffins (Min Order 6 Qty in Same Flavour & Min Order ₹200). Please share availability & size options.`
                )}`;

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-3 px-4 py-3 items-center hover:bg-[#FDF9F3]/80 transition-colors rounded-xl"
                  >
                    {/* 1. Flavour Name + Pastel Circle Icon */}
                    <div className="col-span-4 flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${style.bg} ${style.text} flex items-center justify-center flex-shrink-0 shadow-2xs`}
                      >
                        <Cake className="w-4 h-4" />
                      </div>
                      <span className="font-serif font-bold text-base sm:text-lg text-[#1E1B4B]">
                        {item.name}
                      </span>
                    </div>

                    {/* 2. Small Price Cell */}
                    <div className="col-span-2 flex justify-center">
                      {item.small ? (
                        <a
                          href={smallLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Order Small ${item.name} Muffin (₹${item.small}) on WhatsApp`}
                          className="w-full max-w-[100px] py-2 px-3 rounded-xl bg-[#F7F3FB] hover:bg-[#EFEBFA] hover:scale-105 border border-[#EDE4F6] text-center font-bold text-[#581C87] text-sm sm:text-base transition-all active:scale-95 shadow-2xs block"
                        >
                          ₹{item.small}
                        </a>
                      ) : (
                        <span className="text-charcoal-300 font-medium text-lg">-</span>
                      )}
                    </div>

                    {/* 3. Medium Price Cell */}
                    <div className="col-span-2 flex justify-center">
                      {item.medium ? (
                        <a
                          href={mediumLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Order Medium ${item.name} Muffin (₹${item.medium}) on WhatsApp`}
                          className="w-full max-w-[100px] py-2 px-3 rounded-xl bg-[#F7F3FB] hover:bg-[#EFEBFA] hover:scale-105 border border-[#EDE4F6] text-center font-bold text-[#581C87] text-sm sm:text-base transition-all active:scale-95 shadow-2xs block"
                        >
                          ₹{item.medium}
                        </a>
                      ) : (
                        <span className="text-charcoal-300 font-medium text-lg">-</span>
                      )}
                    </div>

                    {/* 4. Large Price Cell */}
                    <div className="col-span-2 flex justify-center">
                      {item.large ? (
                        <a
                          href={largeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Order Large ${item.name} Muffin (₹${item.large}) on WhatsApp`}
                          className="w-full max-w-[100px] py-2 px-3 rounded-xl bg-[#F7F3FB] hover:bg-[#EFEBFA] hover:scale-105 border border-[#EDE4F6] text-center font-bold text-[#581C87] text-sm sm:text-base transition-all active:scale-95 shadow-2xs block"
                        >
                          ₹{item.large}
                        </a>
                      ) : (
                        <span className="text-charcoal-300 font-medium text-lg">-</span>
                      )}
                    </div>

                    {/* 5. WhatsApp Order Button */}
                    <div className="col-span-2 flex justify-center">
                      <a
                        href={largeLink || generalOrderLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full max-w-[110px] py-2 px-3.5 rounded-full bg-[#581C87] hover:bg-[#4A1572] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md hover:scale-102 transition-all active:scale-95"
                        title={`Order ${item.name} on WhatsApp`}
                      >
                        <WhatsAppIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Order</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. BOTTOM INFORMATION STRIP                               */}
        {/* ========================================================= */}
        <div className="mt-6 p-3 sm:p-3.5 rounded-2xl bg-[#FFF1F0] border border-[#FFE4E1] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[#E11D48] text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#FFE4E1] text-[#E11D48] flex items-center justify-center flex-shrink-0">
              <Cake className="w-3.5 h-3.5" />
            </div>
            <span>
              All Price Of Muffins Is Per Pics. - With cream frosting add 5 rs extra per pics
            </span>
          </div>
          <span className="text-xs font-medium text-[#BE123C] bg-[#FFE4E6] px-3 py-1 rounded-full border border-[#FECDD3] self-start sm:self-auto">
            (Biscoff, Red Velvet &amp; Chocolate frosting 10 rs extra per pics)
          </span>
        </div>
      </div>
    </section>
  );
}
