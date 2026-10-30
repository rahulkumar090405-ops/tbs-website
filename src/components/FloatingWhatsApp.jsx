import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Show floating button after user scrolls past 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  // If on a menu page, hide on mobile devices (show only on tablet/desktop: sm:flex)
  const isMenuPage = location.pathname.startsWith('/menu');

  return (
    <div
      className={`fixed bottom-5 right-4 sm:right-5 z-40 flex-col items-end gap-2 animate-fade-in ${
        isMenuPage ? 'hidden sm:flex' : 'flex'
      }`}
    >
      {/* WhatsApp Floating Action Pill with Official Icon */}
      <a
        href={createGeneralWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-2xl shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all duration-300 group border-2 border-white"
        aria-label="Order on WhatsApp"
      >
        <div className="relative flex items-center justify-center">
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider leading-none">
            Order on WhatsApp
          </span>
          <span className="text-[9px] sm:text-[10px] text-emerald-100 font-medium leading-tight">
            Direct Bakery Hotline
          </span>
        </div>
      </a>
    </div>
  );
}
