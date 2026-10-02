import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BEFORE_IMAGE, AFTER_IMAGE } from '../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(65); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const userInteractedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderBoxRef = useRef<HTMLDivElement>(null);
  const leftGutterRef = useRef<HTMLDivElement>(null);
  const rightGutterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-scrubbed divider demonstration as section enters viewport
      const proxy = { pos: 85 };
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'center 45%',
        scrub: 1.2,
        onUpdate: (self) => {
          if (!userInteractedRef.current) {
            // Sweep from 85% down to 45% based on scroll progress
            const newPos = 85 - self.progress * 40;
            setSliderPosition(newPos);
          }
        },
      });

      // 2. Independent gutter typography parallax
      gsap.fromTo(
        leftGutterRef.current,
        { y: 60, opacity: 0.3 },
        {
          y: -40,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        rightGutterRef.current,
        { y: -30, opacity: 0.3 },
        {
          y: 50,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMove = useCallback((clientX: number) => {
    userInteractedRef.current = true;
    if (!sliderBoxRef.current) return;
    const rect = sliderBoxRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pos);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    userInteractedRef.current = true;
    handleMove(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="transformation"
      ref={containerRef}
      className="relative w-full py-28 md:py-40 bg-[#070707] text-[#F1EFE9] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Floating Independent Gutter Annotations */}
        <div
          ref={leftGutterRef}
          className="hidden xl:block absolute -left-12 top-1/2 font-mono text-[10px] text-[#B7AA98]/60 tracking-[0.3em] uppercase -rotate-90 origin-left will-change-transform"
        >
          STAGE 01 // SKELETAL REBAR &amp; AGGREGATE
        </div>

        <div
          ref={rightGutterRef}
          className="hidden xl:block absolute -right-12 top-1/2 font-mono text-[10px] text-[#B7AA98]/60 tracking-[0.3em] uppercase rotate-90 origin-right will-change-transform"
        >
          STAGE 02 // TRAVERTINE HEARTH &amp; ACOUSTIC LINEN
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8">
          <div>
            <span className="font-mono text-xs text-[#B7AA98] tracking-[0.35em] uppercase block mb-3">
              05 / SPATIAL METAMORPHOSIS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F1EFE9] uppercase leading-[0.9]">
              FROM POSSIBILITY
              <br />
              <span className="font-editorial italic font-normal text-[#B7AA98] lowercase tracking-normal">
                to place.
              </span>
            </h2>
          </div>

          <div className="mt-6 md:mt-0 max-w-xs font-mono text-xs text-[#B7AA98]/80 leading-relaxed tracking-wider">
            Scroll initiates the spatial peel. Drag the central datum line for tactile manual inspection.
          </div>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={sliderBoxRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[65vh] md:h-[78vh] overflow-hidden rounded-xs border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] cursor-default select-none"
          style={{ touchAction: 'none' }}
        >
          {/* AFTER Image (Full container underneath) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={AFTER_IMAGE}
              alt="After architectural transformation - Luxury finished interior"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center pointer-events-none"
            />
            {/* Tag Right */}
            <div className="absolute bottom-6 right-6 z-20 font-mono text-xs tracking-[0.25em] uppercase px-4 py-2 bg-black/80 backdrop-blur-xs text-[#F1EFE9] border border-white/10 pointer-events-none">
              AFTER / REFINED TACTILITY
            </div>
          </div>

          {/* BEFORE Image (Clipped on top based on sliderPosition) */}
          <div
            className="absolute inset-0 h-full overflow-hidden will-change-[clip-path] pointer-events-none"
            style={{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            }}
          >
            <img
              src={BEFORE_IMAGE}
              alt="Before architectural transformation - Raw concrete frame"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />
            {/* Tag Left */}
            <div className="absolute bottom-6 left-6 z-20 font-mono text-xs tracking-[0.25em] uppercase px-4 py-2 bg-black/80 backdrop-blur-xs text-[#B7AA98] border border-white/10 pointer-events-none">
              BEFORE / SKELETAL ORIGIN
            </div>
          </div>

          {/* Vertical Divider Datum Line with System Resize Cursor */}
          <div
            className={`absolute top-0 bottom-0 z-30 will-change-[left] flex items-center justify-center cursor-ew-resize group/handle ${
              isDragging ? 'cursor-grabbing' : 'cursor-ew-resize'
            }`}
            style={{ left: `${sliderPosition}%`, width: '40px', transform: 'translateX(-50%)' }}
          >
            {/* Thin vertical line */}
            <div className="w-[2px] h-full bg-[#F1EFE9] shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none" />

            {/* Central Circular Drag Handle */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 md:w-13 md:h-13 rounded-full bg-[#0B0B0B] border border-[#F1EFE9] text-[#F1EFE9] flex items-center justify-center shadow-2xl backdrop-blur-xs transition-transform duration-200 pointer-events-none ${
              isDragging ? 'scale-110 bg-[#B7AA98] text-[#0B0B0B]' : 'group-hover/handle:scale-105'
            }`}>
              <span className="font-mono text-xs tracking-widest select-none">
                ↔
              </span>
            </div>
          </div>
        </div>

        {/* Footnote metadata */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between font-mono text-xs text-[#B7AA98] tracking-widest uppercase gap-4">
          <div className="flex items-center gap-4">
            <span>RESIDENTIAL VILLA TRANSFORM</span>
            <span className="text-white/20">·</span>
            <span>MILAN METROPOLITAN COMM</span>
          </div>
          <div>
            14 MONTHS ADAPTIVE RECONSTRUCTION
          </div>
        </div>
      </div>
    </section>
  );
};

