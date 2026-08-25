import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating button after user scrolls past 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 animate-fade-in">
      
      {/* WhatsApp Floating Action Pill */}
      <a
        href={createGeneralWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full shadow-2xl shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all duration-300 group border-2 border-white"
        aria-label="Order on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold uppercase tracking-wider leading-none">
            Order on WhatsApp
          </span>
          <span className="text-[10px] text-emerald-100 font-medium leading-tight">
            Direct Bakery Hotline
          </span>
        </div>
      </a>
    </div>
  );
}
