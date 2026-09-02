import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Clock, MapPin, MessageCircle, Heart } from 'lucide-react';
import { BRAND_INFO, DISPLAY_PHONE, RAW_PHONE } from '../data/menuData';
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

export default function Footer() {
  const links = [
    { name: 'Home', to: '/' },
    { name: 'All Products (Menu)', to: '/products' },
    { name: 'Visual Gallery', to: '/gallery' },
    { name: 'Signature Highlights', to: '/#signature' },
    { name: 'Our Story', to: '/#story' },
    { name: 'Why tBS', to: '/#why-us' },
    { name: 'Custom Cake', to: '/#customise' },
    { name: 'Google Reviews', to: '/#reviews' },
    { name: 'Order Info', to: '/#order-info' },
  ];

  return (
    <footer className="bg-charcoal-900 text-cream-100 pt-16 pb-12 border-t border-brand-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-charcoal-700/60">
          
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Link to="/">
                <img
                  src="/assets/tbs-footer-logo.png"
                  alt="tBS THE BAKING SPOT"
                  className="h-11 sm:h-13 w-auto object-contain"
                />
              </Link>
            </div>

            <p className="font-serif italic text-sm text-brand-200/90 font-light">
              "{BRAND_INFO.tagline}"
            </p>

            <p className="text-xs text-charcoal-400 font-light leading-relaxed max-w-sm">
              Artisanal boutique bakery crafting homemade celebration cakes with fine cocoa, real cream, fresh fruits, and zero palm oil. Hand-delivered to your doorstep in Prateek Grand City.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/thebakingspot22/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-800 hover:bg-brand-800 text-xs text-brand-200 hover:text-white transition-all border border-charcoal-700"
              >
                <InstagramIcon className="w-4 h-4 text-rose-400" />
                <span>@thebakingspot22</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {links.map((l) => (
                <li key={l.name}>
                  <Link
                    to={l.to}
                    className="text-charcoal-300 hover:text-brand-300 transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Timings */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-white">
              Bakehouse Details
            </h4>

            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2.5 text-charcoal-300">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <div>
                  <a href={`tel:${RAW_PHONE}`} className="text-white hover:text-brand-300 font-semibold transition-colors">
                    {DISPLAY_PHONE}
                  </a>
                  <span className="text-[10px] text-charcoal-400 block">Call or WhatsApp</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-charcoal-300">
                <Clock className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <div>
                  <span className="text-white font-medium">{BRAND_INFO.openingHours}</span>
                  <span className="text-[10px] text-charcoal-400 block">Open Daily for Pre-orders</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-charcoal-300">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <div>
                  <span className="text-white font-medium">{BRAND_INFO.deliveryLocation}</span>
                  <span className="text-[10px] text-emerald-400 block">Free Doorstep Society Delivery</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 gap-4">
          <p>© 2026 The Baking Spot. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Baked with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Prateek Grand City</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
