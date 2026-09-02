import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, MessageCircle, Phone, ChevronRight, Cake } from 'lucide-react';
import { DISPLAY_PHONE, RAW_PHONE } from '../data/menuData';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Crisp, concise 1-word/short navigation links that never wrap
  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Menu', to: '/products', isPrimary: true },
    { name: 'Gallery', to: '/gallery' },
    { name: 'Story', to: '/#story' },
    { name: 'Why Us', to: '/#why-us' },
    { name: 'Custom', to: '/#customise' },
    { name: 'Reviews', to: '/#reviews' },
    { name: 'Delivery', to: '/#order-info' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-sm border-b border-brand-100/90 py-2.5'
            : 'bg-cream-50/95 backdrop-blur-md py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Header Brand Logo */}
            <Link
              to="/"
              className="flex items-center flex-shrink-0 group py-0.5"
              aria-label="The Baking Spot Home"
            >
              <img
                src="/assets/tbs-header-logo.png"
                alt="tBS THE BAKING SPOT"
                className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </Link>

            {/* Desktop Navigation Links (Single row with whitespace-nowrap) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = link.to === '/products' 
                  ? location.pathname === '/products'
                  : link.to === '/gallery'
                  ? location.pathname === '/gallery'
                  : (location.pathname === '/' && !link.to.includes('#') && !location.hash);
                
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    className={`text-xs xl:text-sm font-medium transition-all px-3 py-1.5 rounded-full whitespace-nowrap ${
                      link.isPrimary
                        ? 'bg-brand-100/80 text-brand-900 font-semibold hover:bg-brand-200/80 border border-brand-200/70 shadow-2xs'
                        : isActive
                        ? 'text-brand-900 font-bold bg-brand-50/90'
                        : 'text-charcoal-700 hover:text-brand-800 hover:bg-brand-50/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 flex-shrink-0">
              {/* Instagram link icon */}
              <a
                href="https://www.instagram.com/thebakingspot22/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-brand-200 hover:border-brand-400 bg-white text-brand-700 hover:text-brand-900 hover:bg-brand-50 transition-all shadow-2xs flex-shrink-0"
                title="Follow @thebakingspot22 on Instagram"
              >
                <InstagramIcon className="w-4 h-4 text-brand-700" />
              </a>

              {/* Call button */}
              <a
                href={`tel:${RAW_PHONE}`}
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-700 hover:text-brand-800 px-3 py-2 rounded-full border border-brand-200 hover:border-brand-300 bg-white transition-all shadow-2xs whitespace-nowrap"
                title={`Call ${DISPLAY_PHONE}`}
              >
                <Phone className="w-3.5 h-3.5 text-brand-700 flex-shrink-0" />
                <span className="hidden xl:inline">{DISPLAY_PHONE}</span>
                <span className="xl:hidden">Call</span>
              </a>

              {/* Primary Order Now Button */}
              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white bg-brand-700 hover:bg-brand-800 px-4 py-2 rounded-full transition-all shadow-md shadow-brand-700/20 hover:shadow-brand-700/30 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white flex-shrink-0" />
                <span>Order Now</span>
              </a>
            </div>

            {/* Mobile Controls (< 640px) */}
            <div className="flex sm:hidden items-center gap-2 flex-shrink-0">
              <Link
                to="/products"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-900 bg-brand-100 border border-brand-200 px-2.5 py-1.5 rounded-full shadow-2xs whitespace-nowrap"
              >
                <Cake className="w-3.5 h-3.5 text-brand-700" />
                <span>Menu</span>
              </Link>

              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-brand-700 px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Order</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-charcoal-800 hover:text-brand-700 hover:bg-brand-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-cream-50 shadow-2xl p-6 flex flex-col justify-between z-50 border-l border-brand-100 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-brand-100">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <img
                    src="/assets/tbs-header-logo.png"
                    alt="tBS THE BAKING SPOT"
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-charcoal-500 hover:bg-brand-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                      link.isPrimary
                        ? 'bg-brand-100/90 text-brand-900 font-semibold border border-brand-200'
                        : 'text-charcoal-800 hover:text-brand-700 hover:bg-brand-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-brand-400" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-brand-100 space-y-3">
              <a
                href="https://www.instagram.com/thebakingspot22/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-brand-200 text-xs font-semibold text-brand-900 bg-white"
              >
                <InstagramIcon className="w-4 h-4 text-brand-700" />
                <span>Instagram @thebakingspot22</span>
              </a>

              <a
                href={`tel:${RAW_PHONE}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-brand-200 text-xs font-semibold text-charcoal-800 bg-white"
              >
                <Phone className="w-4 h-4 text-brand-700" />
                <span>Call {DISPLAY_PHONE}</span>
              </a>

              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-700 text-white text-xs uppercase tracking-wider font-semibold shadow-md shadow-brand-700/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
