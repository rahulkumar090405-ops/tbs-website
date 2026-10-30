import React, { useState, useEffect, useRef } from 'react';
import {
  Menu as MenuIcon,
  X,
  Phone,
  ChevronRight,
  ChevronDown,
  Cake,
  PieChart,
  Coffee,
  Utensils,
  Image as GalleryIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { DISPLAY_PHONE, RAW_PHONE } from '../data/menuData';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';

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
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMenuDropdownOpen(false);
  }, [location.pathname]);

  // Click outside listener for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Menu subheaders linking to each section
  const menuSubheaders = [
    {
      name: 'Cakes',
      href: '/menu/cakes',
      icon: Cake,
      desc: 'Celebration, Bento, Cheesecakes & Tea Bakes',
    },
    {
      name: 'Dessert',
      href: '/menu/desserts',
      icon: PieChart,
      desc: 'Bowls, Jars, Brownies & Muffins',
    },
    {
      name: 'Snacks',
      href: '/menu/snacks',
      icon: Coffee,
      desc: 'Burgers, Sandwiches, Korean Buns & Shakes',
    },
    {
      name: 'All Menus',
      href: '/menu/all',
      icon: Utensils,
      desc: 'Browse complete bakery collection',
    },
  ];

  const navLinksAfterMenu = [
    { name: 'Gallery', href: '/gallery' },
    { name: 'Why tBS', href: '/#why-us' },
    { name: 'Customisation', href: '/custom-cake' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Order Info', href: '/#order-info' },
  ];

  const isMenuPath = location.pathname.startsWith('/menu') || location.pathname === '/products';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-brand-100 py-1.5 sm:py-2'
            : 'bg-cream-50/90 backdrop-blur-md border-brand-100/60 py-2 sm:py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-5 h-12 sm:h-14">
            
            {/* Header Brand Logo */}
            <Link to="/" className="flex items-center flex-shrink-0" aria-label="The Baking Spot Home">
              <img
                src="/assets/tbs-header-logo.png"
                alt="tBS THE BAKING SPOT"
                className="h-8 sm:h-9 w-auto object-contain transition-transform active:scale-95"
              />
            </Link>

            {/* Desktop Navigation Links (Clean, 1-line, zero wrapping) */}
            <nav className="hidden lg:flex items-center gap-2.5 xl:gap-4 2xl:gap-5 flex-shrink-0">
              {/* Home */}
              <Link
                to="/"
                className={`text-xs xl:text-sm font-medium py-1 transition-colors whitespace-nowrap ${
                  location.pathname === '/'
                    ? 'text-brand-900 font-bold border-b-2 border-brand-700'
                    : 'text-charcoal-700 hover:text-brand-700'
                }`}
              >
                Home
              </Link>

              {/* Our Story */}
              <a
                href="/#story"
                className="text-xs xl:text-sm font-medium text-charcoal-700 hover:text-brand-700 transition-colors py-1 whitespace-nowrap"
              >
                Our Story
              </a>

              {/* OUR MENU Dropdown (Desktop) */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setMenuDropdownOpen(true)}
                onMouseLeave={() => setMenuDropdownOpen(false)}
              >
                <Link
                  to="/menu/all"
                  className={`inline-flex items-center gap-1 text-xs xl:text-sm font-medium py-1 transition-colors whitespace-nowrap ${
                    isMenuPath
                      ? 'text-brand-900 font-bold border-b-2 border-brand-700'
                      : 'text-charcoal-700 hover:text-brand-700'
                  }`}
                  onClick={() => setMenuDropdownOpen(false)}
                >
                  <span>Our Menu</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-brand-600 transition-transform duration-200 ${
                      menuDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                {/* Dropdown Card - 100% Solid Opaque White */}
                {menuDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-brand-200/90 p-2.5 z-[100]"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-brand-700 border-b border-brand-100 mb-1">
                      Menu Categories
                    </div>

                    <div className="space-y-1">
                      {menuSubheaders.map((sub) => {
                        const SubIcon = sub.icon;
                        const active = location.pathname === sub.href;
                        return (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            onClick={() => setMenuDropdownOpen(false)}
                            className={`flex items-start gap-2.5 px-3 py-2 rounded-xl text-xs transition-all ${
                              active
                                ? 'bg-brand-50 text-brand-900 font-bold'
                                : 'text-charcoal-700 hover:bg-brand-50/70 hover:text-brand-900'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-full bg-brand-100/80 text-brand-800 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                              <SubIcon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="block font-bold text-charcoal-900 text-xs sm:text-sm">{sub.name}</span>
                              <span className="text-[10px] text-charcoal-500 font-normal leading-tight block">
                                {sub.desc}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Gallery, Why tBS, Customisation, Reviews, Order Info */}
              {navLinksAfterMenu.map((link) => (
                link.href.startsWith('/#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-xs xl:text-sm font-medium text-charcoal-700 hover:text-brand-700 transition-colors py-1 whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`text-xs xl:text-sm font-medium py-1 transition-colors whitespace-nowrap ${
                      location.pathname === link.href
                        ? 'text-brand-900 font-bold border-b-2 border-brand-700'
                        : 'text-charcoal-700 hover:text-brand-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </nav>

            {/* Right Action Buttons (Always 1-line, no text breaking) */}
            <div className="hidden sm:flex items-center gap-1.5 xl:gap-2.5 flex-shrink-0">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/thebakingspot22/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal-700 hover:text-brand-700 px-2.5 py-1.5 rounded-full border border-brand-200 bg-white transition-all shadow-xs hover:border-brand-400 flex-shrink-0 whitespace-nowrap"
                title="Instagram @thebakingspot22"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-brand-700 flex-shrink-0" />
                <span className="hidden xl:inline whitespace-nowrap">@thebakingspot22</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${RAW_PHONE}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal-700 hover:text-brand-700 px-2.5 xl:px-3 py-1.5 rounded-full border border-brand-200 bg-white transition-all shadow-xs hover:border-brand-400 flex-shrink-0 whitespace-nowrap"
                title={`Call ${DISPLAY_PHONE}`}
              >
                <Phone className="w-3.5 h-3.5 text-brand-700 flex-shrink-0" />
                <span className="whitespace-nowrap">{DISPLAY_PHONE}</span>
              </a>

              {/* Order Now CTA */}
              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-white bg-brand-800 hover:bg-brand-900 px-3 xl:px-4 py-1.5 xl:py-2 rounded-full transition-all shadow-xs hover:shadow-md active:scale-95 flex-shrink-0 whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">ORDER NOW</span>
              </a>
            </div>

            {/* Mobile Header Controls */}
            <div className="flex sm:hidden items-center gap-2">
              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>Order</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-charcoal-800 hover:text-brand-700 hover:bg-brand-50 rounded-lg focus:outline-none transition-colors"
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
          <div
            className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-cream-50 shadow-2xl p-5 flex flex-col justify-between z-50 border-l border-brand-100 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-brand-100">
                <img
                  src="/assets/tbs-header-logo.png"
                  alt="tBS THE BAKING SPOT"
                  className="h-8 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-charcoal-500 hover:bg-brand-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links with Menu Subheaders */}
              <nav className="mt-4 flex flex-col space-y-1.5">
                {/* Home */}
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-charcoal-800 hover:bg-brand-50"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>

                {/* Our Story */}
                <a
                  href="/#story"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-charcoal-800 hover:bg-brand-50"
                >
                  <span>Our Story</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>

                {/* MENU with Subheaders (Cakes, Dessert, Snacks) */}
                <div className="rounded-2xl border border-brand-200/80 bg-white/90 p-2 space-y-1">
                  <div className="flex items-center justify-between px-2.5 py-1 text-xs font-bold text-brand-900 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-brand-700" />
                      Our Menu
                    </span>
                    <Link
                      to="/menu/all"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[11px] font-semibold text-brand-700 hover:underline lowercase tracking-normal"
                    >
                      view all
                    </Link>
                  </div>

                  <div className="pt-1 space-y-1 border-t border-brand-50">
                    <Link
                      to="/menu/cakes"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold text-charcoal-800 hover:bg-brand-50 hover:text-brand-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Cake className="w-4 h-4 text-brand-600" />
                        Cakes
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
                    </Link>

                    <Link
                      to="/menu/desserts"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold text-charcoal-800 hover:bg-brand-50 hover:text-brand-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-brand-600" />
                        Dessert
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
                    </Link>

                    <Link
                      to="/menu/snacks"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold text-charcoal-800 hover:bg-brand-50 hover:text-brand-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-brand-600" />
                        Snacks
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
                    </Link>
                  </div>
                </div>

                {/* Gallery */}
                <Link
                  to="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-charcoal-800 hover:bg-brand-50"
                >
                  <span>Gallery</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>

                {/* Why tBS */}
                <a
                  href="/#why-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-charcoal-800 hover:bg-brand-50"
                >
                  <span>Why tBS</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>

                {/* Customisation */}
                <Link
                  to="/custom-cake"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-charcoal-800 hover:bg-brand-50"
                >
                  <span>Customisation</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>

                {/* Reviews */}
                <a
                  href="/#reviews"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-charcoal-800 hover:bg-brand-50"
                >
                  <span>Reviews</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>

                {/* Order Info */}
                <a
                  href="/#order-info"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-charcoal-800 hover:bg-brand-50"
                >
                  <span>Order Info</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-5 border-t border-brand-100 space-y-2">
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
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-brand-800 text-white text-xs uppercase tracking-wider font-semibold shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
