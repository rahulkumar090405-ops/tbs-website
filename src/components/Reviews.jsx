import React, { useState, useEffect } from 'react';
import { Star, Award, ChevronLeft, ChevronRight, MessageSquareHeart, ExternalLink, CheckCircle2 } from 'lucide-react';
import reviewsData from '../data/googleReviews.json';

function GoogleIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export default function Reviews() {
  const reviews = reviewsData.reviews || [];
  const overallRating = reviewsData.overallRating || 4.9;
  const totalReviews = reviewsData.totalReviews || reviews.length;

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  // Load Jotform Widget in background
  useEffect(() => {
    const scriptId = 'jotform-widget-script-01a038520330700089a4742dfff122d11215';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.jotform.com/website-widgets/embed/01a038520330700089a4742dfff122d11215';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const displayedReviews = reviews.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section id="reviews" className="py-20 md:py-28 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-brand-600" />
            <span>Real Customer Reviews</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight mb-4">
            Loved by Our Customers
          </h2>

          <p className="text-base sm:text-lg text-charcoal-600 font-light">
            Verified Google Reviews from cake lovers and residents in Prateek Grand City.
          </p>
        </div>

        {/* Google Rating Overview Hero Card */}
        <div className="max-w-4xl mx-auto mb-12 p-6 sm:p-8 rounded-3xl bg-white/90 border border-brand-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-cream-50 border border-brand-100 flex items-center justify-center flex-shrink-0 shadow-xs">
              <GoogleIcon className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl font-bold text-charcoal-900 leading-none">
                  {overallRating}
                </span>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-charcoal-600 font-medium mt-1">
                Based on <strong className="font-bold text-charcoal-900">{totalReviews} Google Reviews</strong>
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Verified Google Customer Ratings</span>
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=The+Baking+Spot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex-shrink-0"
          >
            <span>Write a Google Review</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Real Google Reviews Grid with Profile Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {displayedReviews.map((item, idx) => {
            const avatarSrc = item.localPhoto || item.photo;
            const initials = item.name
              ? item.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase()
              : 'G';

            return (
              <div
                key={idx}
                className="group rounded-3xl bg-white/95 p-6 sm:p-7 border border-brand-100/80 shadow-card hover:shadow-luxury-hover hover:border-brand-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top: User Avatar, Name & Google Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-brand-100 ring-2 ring-brand-200/80 flex-shrink-0">
                        {avatarSrc ? (
                          <img
                            src={avatarSrc}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // If image fails, fallback to initials
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="w-full h-full bg-gradient-to-br from-brand-600 to-brand-800 text-white font-bold text-xs flex items-center justify-center"
                          style={{ display: avatarSrc ? 'none' : 'flex' }}
                        >
                          {initials}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-sans font-bold text-sm text-charcoal-900 leading-tight">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1 mt-0.5">
                          <GoogleIcon className="w-3 h-3 inline-block" />
                          <span className="text-[10px] text-charcoal-500 font-medium">Google Review</span>
                        </div>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, sIdx) => (
                        <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="font-serif italic text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed mb-4 line-clamp-4">
                    "{item.text}"
                  </p>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-3 border-t border-brand-50 flex items-center justify-between text-[11px] text-charcoal-500">
                  <span className="text-brand-700 font-semibold">Verified Customer</span>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-charcoal-500 hover:text-brand-700 transition-colors"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Navigation Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              className="px-4 py-2 rounded-full bg-white border border-brand-200 text-xs font-semibold text-charcoal-700 hover:bg-brand-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-charcoal-600 font-medium px-2">
              Page {currentPage + 1} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              className="px-4 py-2 rounded-full bg-white border border-brand-200 text-xs font-semibold text-charcoal-700 hover:bg-brand-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>Next Reviews</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Hidden Container for Jotform Script Hook */}
        <div id="JFWebsiteWidget-01a038520330700089a4742dfff122d11215" className="hidden"></div>

      </div>
    </section>
  );
}
