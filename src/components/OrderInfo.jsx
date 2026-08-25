import React from 'react';
import { Clock, Calendar, AlertCircle, Sparkles, Heart, Truck, Phone, MessageCircle } from 'lucide-react';
import { BRAND_INFO, DISPLAY_PHONE, RAW_PHONE } from '../data/menuData';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';

export default function OrderInfo() {
  const guidelines = [
    {
      icon: Calendar,
      title: 'Advance Notice',
      text: 'Please inform us at least one day in advance for standard cake orders to ensure the freshest bake.',
      highlight: true,
    },
    {
      icon: Clock,
      title: 'Emergency Orders',
      text: 'Same-day urgent orders accepted with a minimum of 4–5 hours notice (subject to daily kitchen slots).',
      highlight: false,
    },
    {
      icon: Sparkles,
      title: 'Special Customisation',
      text: 'Real fruit toppings, handcrafted messages, fondant plaques, bespoke shapes & designer themes available.',
      highlight: false,
    },
    {
      icon: AlertCircle,
      title: 'Premium Add-Ons',
      text: 'Exotic seasonal fruits and imported luxury add-ons may carry nominal additional charges based on market prices.',
      highlight: false,
    },
    {
      icon: Heart,
      title: 'Heart Shape Available',
      text: 'Heart shape is available on any Cream Cake or Premium Cake for just +₹50 extra per order.',
      highlight: false,
    },
    {
      icon: Truck,
      title: 'Free Society Delivery',
      text: 'Complimentary, careful doorstep delivery for all residents of Prateek Grand City Society.',
      highlight: true,
    },
  ];

  return (
    <section id="order-info" className="py-20 md:py-28 bg-cream-100/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Clock className="w-3.5 h-3.5 text-brand-600" />
            <span>Ordering Guidelines</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight mb-4">
            Order Information
          </h2>

          <p className="text-base sm:text-lg text-charcoal-600 font-light">
            Everything you need to know for a seamless, freshly baked celebration.
          </p>
        </div>

        {/* Top Highlight Banner: Timings & Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          
          <div className="rounded-2xl bg-white p-6 border border-brand-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-charcoal-500 uppercase tracking-wider font-semibold">Kitchen Timings</p>
              <p className="font-serif text-lg font-bold text-charcoal-900">10:00 AM – 10:00 PM</p>
              <p className="text-[11px] text-brand-600 font-medium">Open Daily (7 Days)</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-brand-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-charcoal-500 uppercase tracking-wider font-semibold">Delivery Zone</p>
              <p className="font-serif text-lg font-bold text-charcoal-900">Prateek Grand City</p>
              <p className="text-[11px] text-emerald-600 font-semibold">100% Free Doorstep Delivery</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-brand-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-charcoal-500 uppercase tracking-wider font-semibold">Direct Hotline</p>
              <a href={`tel:${RAW_PHONE}`} className="font-serif text-lg font-bold text-charcoal-900 hover:text-brand-700 transition-colors">
                {DISPLAY_PHONE}
              </a>
              <p className="text-[11px] text-brand-600 font-medium">Call or WhatsApp</p>
            </div>
          </div>

        </div>

        {/* 6 Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {guidelines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl p-6 transition-all duration-300 ${
                  item.highlight
                    ? 'bg-brand-50/90 border-2 border-brand-300 shadow-sm'
                    : 'bg-white border border-brand-100/80 shadow-xs hover:border-brand-200'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs text-brand-700 flex items-center justify-center mb-4 border border-brand-100">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-charcoal-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Order Strip */}
        <div className="text-center mt-12">
          <a
            href={createGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md shadow-brand-700/20 hover:shadow-brand-700/30 hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Connect on WhatsApp for Immediate Orders</span>
          </a>
        </div>

      </div>
    </section>
  );
}
