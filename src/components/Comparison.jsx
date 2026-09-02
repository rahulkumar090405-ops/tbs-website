import React, { useState, useRef, useEffect } from 'react';
import { Check, X, Sparkles, Scale, ShieldCheck, Leaf } from 'lucide-react';
import { COMPARISON_DATA } from '../data/menuData';

/**
 * Lightweight Canvas Anti-Gravity Particle Background
 * Simulates weightless gold specks, lavender dust, and cocoa micro-sparkles floating upwards
 */
function AntiGravityParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;

    // Handle high DPI displays
    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    // Particle pool (approx 35 particles for optimal performance)
    const particleCount = 35;
    const colors = [
      { r: 216, g: 174, b: 230, alpha: 0.4 }, // soft lavender
      { r: 234, g: 196, b: 83, alpha: 0.55 }, // golden shimmer
      { r: 184, g: 146, b: 35, alpha: 0.3 },  // cocoa gold
      { r: 255, g: 255, b: 255, alpha: 0.6 }, // starlight
      { r: 16, g: 185, b: 129, alpha: 0.25 }, // fresh mint
    ];

    const particles = Array.from({ length: particleCount }, () => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        radius: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 0.35 + 0.12,
        speedX: (Math.random() - 0.5) * 0.15,
        sinOffset: Math.random() * Math.PI * 2,
        sinSpeed: Math.random() * 0.02 + 0.01,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        alphaMultiplier: Math.random() * 0.5 + 0.5,
      };
    });

    let time = 0;

    const render = () => {
      if (!isVisible) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      time += 1;

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(time * p.sinSpeed + p.sinOffset) * 0.3 + p.speedX;

        if (p.y < -10) {
          p.y = rect.height + 10;
          p.x = Math.random() * rect.width;
        }
        if (p.x < -10) p.x = rect.width + 10;
        if (p.x > rect.width + 10) p.x = -10;

        const currentAlpha =
          p.color.alpha *
          (0.7 + Math.sin(time * p.pulseSpeed + p.sinOffset) * 0.3) *
          p.alphaMultiplier;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.8})`;
        ctx.shadowBlur = p.radius * 2.5;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    });

    observer.observe(canvas);

    window.addEventListener('resize', setCanvasSize);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

export default function Comparison() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // 3D Parallax & Gyroscope Physics State
  const mouseState = useRef({
    currentRotX: 0,
    currentRotY: 0,
    targetRotX: 0,
    targetRotY: 0,
    isHovering: false,
  });

  const [shadowStyle, setShadowStyle] = useState({});

  useEffect(() => {
    const checkViewport = () => {
      // Enable 3D tilt only on desktop screens with fine pointer
      const desktopMatch =
        window.innerWidth >= 1024 &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setIsDesktop(desktopMatch);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    let animId;
    let clock = 0;

    const updatePhysics = () => {
      clock += 0.025;
      const { isHovering } = mouseState.current;
      const lerpFactor = 0.08;

      if (isDesktop) {
        if (isHovering) {
          mouseState.current.currentRotX +=
            (mouseState.current.targetRotX - mouseState.current.currentRotX) * lerpFactor;
          mouseState.current.currentRotY +=
            (mouseState.current.targetRotY - mouseState.current.currentRotY) * lerpFactor;
        } else {
          const idleRotX = Math.sin(clock * 0.8) * 1.5;
          const idleRotY = Math.cos(clock * 0.6) * 1.8;
          mouseState.current.currentRotX +=
            (idleRotX - mouseState.current.currentRotX) * 0.05;
          mouseState.current.currentRotY +=
            (idleRotY - mouseState.current.currentRotY) * 0.05;
        }

        if (cardRef.current) {
          const rotX = mouseState.current.currentRotX.toFixed(2);
          const rotY = mouseState.current.currentRotY.toFixed(2);
          const idleY = (Math.sin(clock * 1.2) * 6).toFixed(2);

          cardRef.current.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${idleY}px) translateZ(16px)`;

          const shadowX = (-rotY * 1.8).toFixed(1);
          const shadowY = (parseFloat(rotX) * 1.8 + 24).toFixed(1);
          const shadowBlur = (36 + Math.abs(parseFloat(rotX)) * 2).toFixed(1);

          setShadowStyle({
            boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px -10px rgba(90, 28, 112, 0.18), 0 10px 20px -5px rgba(0, 0, 0, 0.04)`,
          });
        }
      } else {
        if (cardRef.current) {
          cardRef.current.style.transform = '';
          setShadowStyle({});
        }
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', checkViewport);
    };
  }, [isDesktop]);

  // Desktop Mouse Parallax Handlers
  const handleMouseMove = (e) => {
    if (!isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    mouseState.current.targetRotX = -((y - centerY) / centerY) * 8;
    mouseState.current.targetRotY = ((x - centerX) / centerX) * 10;
    mouseState.current.isHovering = true;
  };

  const handleMouseLeave = () => {
    mouseState.current.isHovering = false;
    mouseState.current.targetRotX = 0;
    mouseState.current.targetRotY = 0;
  };

  return (
    <section
      id="why-us"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-14 sm:py-20 md:py-28 bg-cream-50 relative overflow-hidden"
    >
      {/* 1. Background Ambient Anti-Gravity Particle Simulation */}
      <AntiGravityParticles />

      {/* 2. Soft Lavender & Gold Radial Back-Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-brand-200/30 rounded-full blur-[80px] sm:blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] bg-gold-400/12 rounded-full blur-[70px] sm:blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/90 text-brand-900 border border-brand-200/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-brand-700" />
            <span>Honest Craftsmanship & Quality</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight mb-2.5 sm:mb-4">
            The Difference Is Clear
          </h2>

          <p className="text-xs sm:text-base text-charcoal-600 font-light max-w-xl mx-auto px-2">
            Experience the elevated purity of boutique artisanal baking vs commercial mass-market production.
          </p>
        </div>

        {/* Comparison Cards: Responsive 2-Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch lg:perspective-1200">
          
          {/* ======================================================== */}
          {/* 🌟 THE BAKING SPOT (Elevated Anti-Gravity Card)            */}
          {/* ======================================================== */}
          <div
            ref={cardRef}
            style={isDesktop ? shadowStyle : undefined}
            className={`relative rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md p-4 sm:p-7 md:p-9 border-2 border-brand-500/90 shadow-lg shadow-brand-900/10 transition-all duration-300 ${
              isDesktop ? 'preserve-3d' : 'animate-anti-gravity'
            } order-1 flex flex-col justify-between`}
          >
            {/* Ambient Inner Glowing Reflection */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-brand-100/30 via-transparent to-brand-50/20 pointer-events-none" />

            {/* Top Badge: "★ THE BAKING SPOT STANDARD" (No logo, clean pill) */}
            <div
              style={isDesktop ? { transform: 'translateZ(32px)' } : undefined}
              className="absolute -top-3 left-4 sm:left-6 px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r from-brand-800 to-brand-700 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-brand-900/20 border border-brand-400/40 z-20"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-400 animate-pulse" />
              <span>THE BAKING SPOT STANDARD</span>
            </div>

            <div>
              {/* Card Header (Clean & balanced without logo) */}
              <div
                style={isDesktop ? { transform: 'translateZ(24px)' } : undefined}
                className="pb-4 sm:pb-5 border-b border-brand-100/80 mt-2 sm:mt-1 mb-4 sm:mb-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-brand-950">
                      THE BAKING SPOT
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                      <Leaf className="w-2.5 h-2.5" />
                      100% Pure
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-brand-700 font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-100">
                    Boutique Bakehouse
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs md:text-sm text-brand-700 font-medium tracking-wide mt-1">
                  Purely Homemade • Baked Fresh to Order
                </p>
              </div>

              {/* Interactive Rows: TBS Checkmarks */}
              <div className="space-y-2 sm:space-y-2.5">
                {COMPARISON_DATA.tbs.map((item, idx) => {
                  const isHovered = hoveredRow === idx;
                  const isOtherHovered = hoveredRow !== null && hoveredRow !== idx;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onClick={() => setHoveredRow(hoveredRow === idx ? null : idx)}
                      style={
                        isDesktop
                          ? {
                              transform: isHovered
                                ? 'translateZ(30px) translateY(-2px)'
                                : 'translateZ(14px)',
                              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }
                          : undefined
                      }
                      className={`flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl cursor-pointer border transition-all ${
                        isHovered
                          ? 'bg-gradient-to-r from-brand-100/95 via-brand-50/95 to-white border-brand-400 shadow-md shadow-brand-700/15 ring-1 ring-brand-300'
                          : isOtherHovered
                          ? 'bg-brand-50/30 border-brand-100/60 opacity-85'
                          : 'bg-brand-50/60 border-brand-100/80 hover:bg-brand-50'
                      }`}
                    >
                      {/* Lush Emerald Green Checkmark */}
                      <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-xs transition-all ${
                          isHovered
                            ? 'bg-emerald-500 text-white scale-110 shadow-emerald-500/40'
                            : 'bg-emerald-500 text-white'
                        }`}
                      >
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                      </div>

                      <span
                        className={`text-xs sm:text-sm leading-snug transition-colors ${
                          isHovered ? 'text-brand-950 font-bold' : 'text-charcoal-900 font-semibold'
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Trust Stamp Pill */}
            <div
              style={isDesktop ? { transform: 'translateZ(20px)' } : undefined}
              className="mt-4 sm:mt-6 pt-3.5 sm:pt-4 border-t border-brand-100 flex items-center justify-between text-[10px] sm:text-xs text-charcoal-600 font-medium"
            >
              <div className="flex items-center gap-1 sm:gap-1.5 text-brand-900 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                <span>Zero Compromises Guaranteed</span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-brand-700 uppercase font-bold tracking-wider">
                100% Eggless Options
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 🪨 OTHER BAKERIES (Grounded, Heavy, Static Reality)       */}
          {/* ======================================================== */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-stone-100/90 p-4 sm:p-7 md:p-9 border border-stone-300/90 shadow-sm order-2 flex flex-col justify-between">
            
            {/* Top Tag: Commercial Norms */}
            <div className="absolute -top-3 right-4 sm:right-6 px-3 sm:px-3.5 py-1 rounded-full bg-stone-300 text-stone-700 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border border-stone-400/50">
              Commercial Industry Norms
            </div>

            <div>
              {/* Header */}
              <div className="pb-4 sm:pb-5 border-b border-stone-200 mt-2 sm:mt-1 mb-4 sm:mb-6">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-stone-600">
                    OTHER BAKERIES
                  </h3>
                  <span className="text-[10px] sm:text-xs text-stone-500 font-medium px-2.5 py-0.5 rounded-full bg-stone-200/80">
                    Mass Retail
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs md:text-sm text-stone-500 font-medium mt-1">
                  Commercial Mass Production & Display Cabinets
                </p>
              </div>

              {/* Rows */}
              <div className="space-y-2 sm:space-y-2.5">
                {COMPARISON_DATA.others.map((item, idx) => {
                  const isCorrespondingHovered = hoveredRow === idx;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onClick={() => setHoveredRow(hoveredRow === idx ? null : idx)}
                      style={{
                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      className={`flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl border transition-all ${
                        isCorrespondingHovered
                          ? 'bg-stone-200/70 border-stone-300 opacity-40 scale-[0.98] blur-[0.5px] grayscale'
                          : 'bg-stone-50/80 border-stone-200/70 opacity-90'
                      }`}
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-400 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                        <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                      </div>

                      <span
                        className={`text-xs sm:text-sm leading-snug font-normal text-stone-600 ${
                          isCorrespondingHovered ? 'line-through decoration-rose-400' : 'line-through decoration-stone-400'
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Grounded Note */}
            <div className="mt-4 sm:mt-6 pt-3.5 sm:pt-4 border-t border-stone-200 text-[10px] sm:text-xs text-stone-500 font-normal">
              <p>Made with shelf-life extensions, premix flours, and industrial fats.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
