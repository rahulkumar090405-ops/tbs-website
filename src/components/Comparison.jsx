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

    // Particle pool (approx 40 particles)
    const particleCount = 42;
    const colors = [
      { r: 216, g: 174, b: 230, alpha: 0.45 }, // soft lavender
      { r: 234, g: 196, b: 83, alpha: 0.6 },   // golden shimmer
      { r: 184, g: 146, b: 35, alpha: 0.35 },  // cocoa gold
      { r: 255, g: 255, b: 255, alpha: 0.7 },  // pure starlight
      { r: 16, g: 185, b: 129, alpha: 0.3 },   // fresh mint
    ];

    const particles = Array.from({ length: particleCount }, () => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        radius: Math.random() * 2.2 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 0.4 + 0.15, // float upwards
        speedX: (Math.random() - 0.5) * 0.2, // slight horizontal drift
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
        // Anti-gravity upward float with sinusoidal oscillation
        p.y -= p.speedY;
        p.x += Math.sin(time * p.sinSpeed + p.sinOffset) * 0.4 + p.speedX;

        // Wrap around when particle floats off top
        if (p.y < -10) {
          p.y = rect.height + 10;
          p.x = Math.random() * rect.width;
        }
        if (p.x < -10) p.x = rect.width + 10;
        if (p.x > rect.width + 10) p.x = -10;

        // Pulsing glow
        const currentAlpha =
          p.color.alpha *
          (0.7 + Math.sin(time * p.pulseSpeed + p.sinOffset) * 0.3) *
          p.alphaMultiplier;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.8})`;
        ctx.shadowBlur = p.radius * 3;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause when out of screen for maximum performance
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

  // 3D Parallax & Gyroscope Physics State
  const mouseState = useRef({
    currentRotX: 0,
    currentRotY: 0,
    targetRotX: 0,
    targetRotY: 0,
    isHovering: false,
    isTouchDevice: false,
  });

  const [shadowStyle, setShadowStyle] = useState({});

  useEffect(() => {
    // Detect touch / mobile devices
    mouseState.current.isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let animId;
    let clock = 0;

    const updatePhysics = () => {
      clock += 0.025;
      const { isHovering, isTouchDevice } = mouseState.current;

      // When hovering on desktop, lerp towards mouse rotation
      // When idle on desktop or mobile, blend with a natural zero-gravity floating oscillation
      const lerpFactor = 0.08;

      if (isHovering && !isTouchDevice) {
        mouseState.current.currentRotX +=
          (mouseState.current.targetRotX - mouseState.current.currentRotX) * lerpFactor;
        mouseState.current.currentRotY +=
          (mouseState.current.targetRotY - mouseState.current.currentRotY) * lerpFactor;
      } else {
        // Gentle anti-gravity bobbing when cursor is idle
        const idleRotX = Math.sin(clock * 0.8) * 1.5;
        const idleRotY = Math.cos(clock * 0.6) * 2;
        mouseState.current.currentRotX +=
          (idleRotX - mouseState.current.currentRotX) * 0.05;
        mouseState.current.currentRotY +=
          (idleRotY - mouseState.current.currentRotY) * 0.05;
      }

      if (cardRef.current && !isTouchDevice) {
        const rotX = mouseState.current.currentRotX.toFixed(2);
        const rotY = mouseState.current.currentRotY.toFixed(2);
        const idleY = (Math.sin(clock * 1.2) * 6).toFixed(2);

        cardRef.current.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${idleY}px) translateZ(16px)`;

        // Calculate dynamic light-source shadow based on tilt angle
        const shadowX = (-rotY * 1.8).toFixed(1);
        const shadowY = (parseFloat(rotX) * 1.8 + 28).toFixed(1);
        const shadowBlur = (40 + Math.abs(parseFloat(rotX)) * 2).toFixed(1);

        setShadowStyle({
          boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px -10px rgba(90, 28, 112, 0.18), 0 10px 20px -5px rgba(0, 0, 0, 0.04)`,
        });
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => cancelAnimationFrame(animId);
  }, []);

  // Desktop Mouse Parallax Handlers
  const handleMouseMove = (e) => {
    if (mouseState.current.isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 10 deg X tilt, 14 deg Y tilt
    mouseState.current.targetRotX = -((y - centerY) / centerY) * 9;
    mouseState.current.targetRotY = ((x - centerX) / centerX) * 12;
    mouseState.current.isHovering = true;
  };

  const handleMouseLeave = () => {
    mouseState.current.isHovering = false;
    mouseState.current.targetRotX = 0;
    mouseState.current.targetRotY = 0;
  };

  return (
    <section
      id="comparison"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-20 md:py-32 bg-cream-50 relative overflow-hidden select-none"
    >
      {/* 1. Background Ambient Anti-Gravity Particle Simulation */}
      <AntiGravityParticles />

      {/* 2. Soft Lavender & Gold Radial Back-Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-200/35 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] bg-gold-400/15 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/90 text-brand-900 border border-brand-200/80 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Scale className="w-3.5 h-3.5 text-brand-700" />
            <span>Honest Craftsmanship & Quality</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight mb-4">
            The Difference Is Clear
          </h2>

          <p className="text-base sm:text-lg text-charcoal-600 font-light max-w-xl mx-auto">
            Experience the elevated purity of boutique artisanal baking vs commercial mass-market production.
          </p>
        </div>

        {/* Comparison Cards: Side-by-Side 3D Perspective Plane */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch perspective-1200">
          
          {/* ======================================================== */}
          {/* 🌟 THE BAKING SPOT (Elevated Anti-Gravity Levitating Card) */}
          {/* ======================================================== */}
          <div
            ref={cardRef}
            style={shadowStyle}
            className="relative rounded-3xl bg-white/95 backdrop-blur-xl p-6 sm:p-9 md:p-10 border-2 border-brand-500/90 transition-shadow duration-300 preserve-3d order-1 flex flex-col justify-between"
          >
            {/* Ambient Inner Glowing Edge Reflection */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-brand-100/30 via-transparent to-brand-50/20 pointer-events-none" />

            {/* Floating 3D Badge: "★ THE BAKING SPOT STANDARD" (Foreground Z=36px) */}
            <div
              style={{ transform: 'translateZ(36px)' }}
              className="absolute -top-3.5 left-6 sm:left-8 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-800 to-brand-700 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-brand-900/25 border border-brand-400/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              <span>THE BAKING SPOT STANDARD</span>
            </div>

            <div>
              {/* Card Header with Floating Brand Seal */}
              <div
                style={{ transform: 'translateZ(26px)' }}
                className="flex items-center justify-between pb-6 border-b border-brand-100/80 mt-3 mb-6"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">
                      THE BAKING SPOT
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                      <Leaf className="w-2.5 h-2.5" />
                      100% Pure
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-700 font-medium tracking-wide mt-0.5">
                    Purely Homemade • Baked Fresh to Order
                  </p>
                </div>

                {/* Floating Official Circular Hallmark */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-brand-100 to-brand-50 border border-brand-200 p-1.5 flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-700/10 hover:rotate-6 transition-transform">
                  <img
                    src="/assets/tbs-logo.png"
                    alt="tBS Logo Hallmark"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Interactive Rows: TBS Checkmarks */}
              <div className="space-y-3">
                {COMPARISON_DATA.tbs.map((item, idx) => {
                  const isHovered = hoveredRow === idx;
                  const isOtherHovered = hoveredRow !== null && hoveredRow !== idx;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        transform: isHovered
                          ? 'translateZ(34px) translateY(-2px)'
                          : 'translateZ(18px)',
                        transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                      className={`flex items-center gap-3.5 p-3 rounded-2xl cursor-pointer border transition-all ${
                        isHovered
                          ? 'bg-gradient-to-r from-brand-100/95 via-brand-50/95 to-white border-brand-400 shadow-md shadow-brand-700/15'
                          : isOtherHovered
                          ? 'bg-brand-50/40 border-brand-100/60 opacity-80'
                          : 'bg-brand-50/60 border-brand-100/80 hover:bg-brand-50'
                      }`}
                    >
                      {/* Lush Emerald Green Glow Checkmark */}
                      <div
                        className={`w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-all ${
                          isHovered
                            ? 'bg-emerald-500 text-white scale-110 shadow-emerald-500/40 ring-2 ring-emerald-300'
                            : 'bg-emerald-500 text-white'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>

                      <span
                        className={`text-xs sm:text-sm font-semibold transition-colors ${
                          isHovered ? 'text-brand-950 font-bold' : 'text-charcoal-900'
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom 3D Trust Stamp Pill (Foreground Z=24px) */}
            <div
              style={{ transform: 'translateZ(24px)' }}
              className="mt-6 pt-5 border-t border-brand-100 flex items-center justify-between text-xs text-charcoal-600 font-medium"
            >
              <div className="flex items-center gap-1.5 text-brand-900 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Compromises Guaranteed</span>
              </div>
              <span className="text-[10px] text-brand-600 uppercase font-bold tracking-wider">
                100% Eggless Options
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 🪨 OTHER BAKERIES (Grounded, Heavy, Static Reality) */}
          {/* ======================================================== */}
          <div className="relative rounded-3xl bg-stone-100/80 p-6 sm:p-9 md:p-10 border border-stone-300/80 shadow-inner order-2 flex flex-col justify-between backdrop-blur-xs">
            
            {/* Heavy Grounded Anchor Stamp */}
            <div className="absolute -top-3.5 right-6 sm:right-8 px-3.5 py-1 rounded-full bg-stone-300 text-stone-700 text-[10px] font-bold uppercase tracking-wider border border-stone-400/50">
              Commercial Industry Norms
            </div>

            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-stone-200 mt-3 mb-6">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-600">
                    OTHER BAKERIES
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 font-medium">
                    Commercial Mass Production & Storage
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-stone-200 text-stone-500 flex items-center justify-center font-bold text-base shadow-inner">
                  ✕
                </div>
              </div>

              {/* Rows: Dim and blur when corresponding TBS row is hovered */}
              <div className="space-y-3">
                {COMPARISON_DATA.others.map((item, idx) => {
                  const isCorrespondingHovered = hoveredRow === idx;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      className={`flex items-center gap-3.5 p-3 rounded-2xl border transition-all ${
                        isCorrespondingHovered
                          ? 'bg-stone-200/50 border-stone-300 opacity-35 scale-[0.98] blur-[1px] grayscale'
                          : 'bg-stone-50/70 border-stone-200/70 opacity-90'
                      }`}
                    >
                      <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-rose-400 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                        <X className="w-4 h-4 stroke-[2.5]" />
                      </div>

                      <span
                        className={`text-xs sm:text-sm font-normal text-stone-600 ${
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
            <div className="mt-6 pt-5 border-t border-stone-200 text-xs text-stone-500 font-normal">
              <p>Made with shelf-life extensions, premix flours, and industrial preservatives.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
