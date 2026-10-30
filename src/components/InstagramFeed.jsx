import React, { useEffect } from 'react';
import { Sparkles, ArrowUpRight, Heart } from 'lucide-react';

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

export default function InstagramFeed() {
  useEffect(() => {
    const container = document.getElementById('JFWebsiteWidget-01a060485bf07000892a64ba74e1d29d48fc');
    if (!container) return;

    // Reset container contents to prevent duplicate elements on re-renders
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = `https://www.jotform.com/website-widgets/embed/01a060485bf07000892a64ba74e1d29d48fc?v=${Date.now()}`;
    script.async = true;
    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <section id="instagram-feed" className="py-16 sm:py-24 bg-gradient-to-b from-cream-50/70 via-white to-cream-50/70 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-rose-200/20 via-brand-200/25 to-gold-300/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-100/90 via-brand-100/90 to-purple-100/90 text-brand-950 border border-rose-200/70 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-2xs">
              <InstagramIcon className="w-3.5 h-3.5 text-rose-600" />
              <span>@thebakingspot22</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight">
              Fresh On Instagram
            </h2>

            <p className="text-xs sm:text-base text-charcoal-600 font-light mt-2 max-w-xl">
              Daily bake stories, custom theme cake reveals, and celebration moments from our boutique kitchen.
            </p>
          </div>

          {/* Instagram Follow Profile Pill */}
          <div className="flex items-center gap-3 p-2 sm:p-2.5 rounded-2xl bg-white border border-brand-100 shadow-sm self-start md:self-auto">
            <a
              href="https://www.instagram.com/thebakingspot22/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex-shrink-0 group"
              title="View Instagram Profile"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white p-0.5 overflow-hidden">
                <img
                  src="/assets/tbs-logo.png"
                  alt="@thebakingspot22"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                />
              </div>
            </a>

            <div className="min-w-0 pr-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-xs sm:text-sm text-charcoal-900 truncate">
                  @thebakingspot22
                </span>
                <Sparkles className="w-3 h-3 text-gold-500 fill-gold-500 flex-shrink-0" />
              </div>
              <p className="text-[10px] text-charcoal-500 font-medium truncate">
                Prateek Grand City
              </p>
            </div>

            <a
              href="https://www.instagram.com/thebakingspot22/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-[11px] sm:text-xs tracking-wide shadow-2xs hover:shadow-sm hover:-translate-y-0.5 transition-all flex-shrink-0"
            >
              <span>Follow</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Live Jotform Widget Container (Single, clean official widget embed) */}
        <div className="w-full rounded-3xl bg-white/95 backdrop-blur-md border border-brand-100/90 shadow-luxury p-3 sm:p-6 md:p-8 overflow-hidden min-h-[400px]">
          <div
            id="JFWebsiteWidget-01a060485bf07000892a64ba74e1d29d48fc"
            className="w-full"
          />
        </div>

        {/* Bottom Community Ribbon */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left px-4 py-3 rounded-2xl bg-brand-50/80 border border-brand-100/80 text-xs text-charcoal-700">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 flex-shrink-0" />
            <p>
              Loved your cake? Tag <strong className="text-brand-900 font-bold">@thebakingspot22</strong> in your celebration stories to be featured on our feed!
            </p>
          </div>
          <span className="font-semibold text-brand-700 tracking-wide text-[11px]">
            #TheBakingSpot #PurelyHomemade
          </span>
        </div>

      </div>
    </section>
  );
}
