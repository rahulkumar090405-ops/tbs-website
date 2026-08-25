import React, { useState } from 'react';
import { Sparkles, MessageCircle, Cake, Heart, Gift, Palette, CheckCircle2 } from 'lucide-react';
import { createCustomCakeWhatsAppLink } from '../utils/whatsapp';

export default function CustomCake() {
  const [flavor, setFlavor] = useState('');
  const [occasion, setOccasion] = useState('Birthday');
  const [weight, setWeight] = useState('1 KG');
  const [customNote, setCustomNote] = useState('');

  const features = [
    { title: 'Fresh Fruit Toppings', desc: 'Loaded with real seasonal berries, Alphonso mangoes, or fresh figs.', icon: Sparkles },
    { title: 'Personalised Piping', desc: 'Custom lettering, names, heartfelt messages, and fondant plaques.', icon: Heart },
    { title: 'Bespoke Shapes & Sizes', desc: 'Heart shapes, multi-tier towers, numbers, and custom geometries.', icon: Cake },
    { title: 'Themed Celebrations', desc: 'Artistic color palettes, floral accents, gold luster dust, and party themes.', icon: Palette },
  ];

  const handleWhatsAppConsult = () => {
    const link = createCustomCakeWhatsAppLink({
      flavor: flavor || 'To be decided with chef',
      occasion: occasion,
      weight: weight,
      message: customNote || 'Custom design request',
    });
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="customise" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Gift className="w-3.5 h-3.5 text-brand-600" />
            <span>Tailor-Made Celebrations</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight mb-4">
            Make It Yours
          </h2>

          <p className="text-base sm:text-lg text-charcoal-600 font-light">
            Your celebration. Your flavour. Your design.
          </p>
        </div>

        {/* Customization Details & Interactive Consultation Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Feature Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-charcoal-900 leading-snug">
              Every detail customized to perfection for birthdays, anniversaries & milestones.
            </h3>
            
            <p className="text-sm text-charcoal-600 leading-relaxed font-light">
              Whether you envision an elegant two-tier floral cake, an exquisite heart-shaped truffle gateau, or a minimalist Korean bento surprise with personalized calligraphy, our artisan kitchen brings your celebration vision to life.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-cream-50 border border-brand-100/80">
                    <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif font-bold text-sm text-charcoal-900 mb-1">{feat.title}</h4>
                    <p className="text-xs text-charcoal-600 font-light leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Quick Consultation Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-cream-50/90 p-8 sm:p-10 border border-brand-200 shadow-xl shadow-brand-900/5 relative">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-brand-700" />
                <h4 className="font-serif text-xl font-bold text-brand-950">Plan Your Custom Cake</h4>
              </div>

              <div className="space-y-4">
                {/* Occasion Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    Celebration Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-200 text-xs font-medium text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Birthday">Birthday Celebration 🎂</option>
                    <option value="Anniversary">Anniversary / Romantic Milestone ❤️</option>
                    <option value="Kids Theme">Kids Themed Party 🎈</option>
                    <option value="Milestone / Gathering">Milestone / Family Gathering 🥂</option>
                    <option value="Surprise Gift">Surprise Gifting 🎁</option>
                  </select>
                </div>

                {/* Estimated Weight / Portion */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    Estimated Size / Weight
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Bento (300g)', 'Half KG', '1 KG', '2+ KG'].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setWeight(w)}
                        className={`py-2 text-[11px] font-semibold rounded-xl border transition-all ${
                          weight === w
                            ? 'bg-brand-700 border-brand-700 text-white shadow-xs'
                            : 'bg-white border-brand-200 text-charcoal-700 hover:border-brand-400'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Flavour / Theme Idea */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    Preferred Flavour Idea (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Belgian Chocolate with Fresh Strawberries"
                    value={flavor}
                    onChange={(e) => setFlavor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-200 text-xs text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Custom Message or Design Description */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    Message on Cake / Theme Notes
                  </label>
                  <textarea
                    rows="2"
                    placeholder="e.g. 'Happy 25th Anniversary Mom & Dad', purple floral palette"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-200 text-xs text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppConsult}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-brand-700/25 hover:shadow-brand-700/35 hover:-translate-y-0.5 mt-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Discuss Your Custom Cake on WhatsApp</span>
                </button>

                <p className="text-[11px] text-charcoal-500 text-center font-light pt-1">
                  Connects directly with our head baker to finalize design, reference images & quote.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
