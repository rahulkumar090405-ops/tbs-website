import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, MessageCircle, Phone, ChevronRight } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Our Story', href: '#story' },
    { name: 'Cakes', href: '#signature' },
    { name: 'Menu', href: '#menu' },
    { name: 'Why tBS', href: '#why-us' },
    { name: 'Customisation', href: '#customise' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Order Info', href: '#order-info' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-sm border-b border-brand-100 py-2.5'
            : 'bg-cream-50/90 backdrop-blur-md py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Header Brand Logo (Using official horizontal logo image, no duplicate text) */}
            <a href="#hero" className="flex items-center group py-1" aria-label="The Baking Spot Home">
              <img
                src="/assets/tbs-header-logo.png"
                alt="tBS THE BAKING SPOT"
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-charcoal-700 hover:text-brand-700 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-brand-700 hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Instagram link */}
              <a
                href="https://www.instagram.com/thebakingspot22/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-700 hover:text-brand-700 px-3 py-2 rounded-full border border-brand-200 hover:border-brand-300 bg-white transition-all shadow-xs"
                title="Follow us on Instagram @thebakingspot22"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-brand-700" />
                <span className="hidden xl:inline">@thebakingspot22</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${RAW_PHONE}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-700 hover:text-brand-700 px-3 py-2 rounded-full border border-brand-200 hover:border-brand-300 bg-white transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-brand-700" />
                <span>{DISPLAY_PHONE}</span>
              </a>

              {/* WhatsApp Order CTA */}
              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-white bg-brand-700 hover:bg-brand-800 px-4 py-2.5 rounded-full transition-all shadow-md shadow-brand-700/20 hover:shadow-brand-700/30 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Order Now</span>
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex sm:hidden items-center gap-2">
              <a
                href="https://www.instagram.com/thebakingspot22/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-brand-700 hover:bg-brand-50 rounded-full border border-brand-200 bg-white"
                aria-label="Instagram @thebakingspot22"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-brand-700 px-3 py-1.5 rounded-full shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Order</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal-800 hover:text-brand-700 hover:bg-brand-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
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
                <img
                  src="/assets/tbs-header-logo.png"
                  alt="tBS THE BAKING SPOT"
                  className="h-9 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-charcoal-500 hover:bg-brand-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-charcoal-800 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-brand-400" />
                  </a>
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
