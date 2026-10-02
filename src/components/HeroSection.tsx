import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_IMAGE } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onScrollClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageOverlayRef = useRef<HTMLDivElement>(null);
  const textLine1Ref = useRef<HTMLDivElement>(null);
  const textLine2Ref = useRef<HTMLDivElement>(null);
  const textLine3Ref = useRef<HTMLDivElement>(null);
  const metaLeftRef = useRef<HTMLDivElement>(null);
  const metaRightRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const coordAxeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned scroll-scrubbed storytelling sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Image: Dramatic scale reduction (1.20 -> 1.0) and darkening scrim
      tl.to(
        imageRef.current,
        {
          scale: 1.0,
          yPercent: 8,
          ease: 'none',
        },
        0
      );

      tl.to(
        imageOverlayRef.current,
        {
          backgroundColor: 'rgba(11, 11, 11, 0.65)',
          ease: 'none',
        },
        0
      );

      // 2. Independent, pronounced typographic separation
      // 'SPACES' travels far left with negative letter tracking
      tl.to(
        textLine1Ref.current,
        {
          x: '-40vw',
          opacity: 0.25,
          letterSpacing: '0.12em',
          ease: 'none',
        },
        0
      );

      // 'THAT MOVE' drifts down and scales gracefully
      tl.to(
        textLine2Ref.current,
        {
          yPercent: 80,
          scale: 1.15,
          opacity: 0.4,
          ease: 'none',
        },
        0
      );

      // 'WITH YOU.' travels far right with wide tracking
      tl.to(
        textLine3Ref.current,
        {
          x: '40vw',
          opacity: 0.25,
          letterSpacing: '0.15em',
          ease: 'none',
        },
        0
      );

      // 3. Parallax architectural coordinate axes
      tl.to(
        coordAxeRef.current,
        {
          yPercent: -60,
          opacity: 0.8,
          ease: 'none',
        },
        0
      );

      // 4. Muted metadata dissolve
      tl.to(
        [metaLeftRef.current, metaRightRef.current, bottomBarRef.current],
        {
          opacity: 0,
          y: -40,
          ease: 'none',
        },
        0.1
      );

      // 5. Seamless bottom mask reveal toward Philosophy section
      tl.to(
        heroWrapperRef.current,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 0% 100%)',
          ease: 'power2.in',
        },
        0.7
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#0B0B0B] select-none">
      <div
        ref={heroWrapperRef}
        className="relative w-full h-full overflow-hidden flex items-center justify-center will-change-[clip-path]"
      >
        {/* Background Architectural Canvas */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={imageRef}
            src={HERO_IMAGE}
            alt="Brutalist architectural villa at dusk"
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center scale-[1.20] will-change-transform brightness-[0.78] contrast-[1.08]"
          />
          <div
            ref={imageOverlayRef}
            className="absolute inset-0 bg-[#0B0B0B]/40 pointer-events-none transition-colors"
          />
          {/* Subtle architectural vertical guides */}
          <div className="absolute inset-0 flex justify-between px-12 md:px-24 pointer-events-none opacity-20">
            <div className="w-[1px] h-full bg-white/30" />
            <div className="w-[1px] h-full bg-white/30" />
            <div className="w-[1px] h-full bg-white/30" />
          </div>
        </div>

        {/* Floating Architectural Coordinate Axis */}
        <div
          ref={coordAxeRef}
          className="absolute right-8 md:right-16 top-1/3 pointer-events-none z-10 flex flex-col items-end font-mono text-[10px] text-[#B7AA98]/60 tracking-[0.3em] uppercase opacity-40 will-change-transform"
        >
          <span>ELEVATION: +14.2M</span>
          <span>LAT: 11.2588° N</span>
          <span>LONG: 75.7804° E</span>
          <div className="w-12 h-[1px] bg-[#B7AA98]/40 my-2" />
          <span>AXIS Z-01</span>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between py-24 md:py-28 pointer-events-none">
          {/* Top Metadata Row */}
          <div className="flex items-center justify-between text-xs font-mono tracking-[0.3em] text-[#B7AA98] uppercase">
            <div ref={metaLeftRef} className="flex items-center gap-4">
              <span className="text-[#F1EFE9]">FORMA</span>
              <span className="text-[#B7AA98]/40">/</span>
              <span>ATELIER ARCHITECTURE</span>
            </div>
            <div ref={metaRightRef} className="tabular-nums hidden sm:block">
              VOL. 2026 · MONOGRAPH 01
            </div>
          </div>

          {/* Massive Typographic Sculpture */}
          <div className="my-auto flex flex-col items-center justify-center text-center w-full">
            <div
              ref={textLine1Ref}
              className="w-full will-change-transform py-1"
            >
              <h1 className="font-display text-[13vw] md:text-[9.5vw] font-light tracking-[-0.04em] leading-[0.85] text-[#F1EFE9] uppercase whitespace-nowrap drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                SPACES
              </h1>
            </div>

            <div
              ref={textLine2Ref}
              className="w-full will-change-transform my-2 md:my-4"
            >
              <span className="font-editorial italic font-normal text-[11vw] md:text-[7.8vw] leading-[0.88] text-[#B7AA98] tracking-[0.01em] block drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                THAT MOVE
              </span>
            </div>

            <div
              ref={textLine3Ref}
              className="w-full will-change-transform py-1"
            >
              <h1 className="font-display text-[13vw] md:text-[9.5vw] font-light tracking-[-0.04em] leading-[0.85] text-[#F1EFE9] uppercase whitespace-nowrap drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                WITH YOU.
              </h1>
            </div>
          </div>

          {/* Bottom Row / Scroll prompt */}
          <div
            ref={bottomBarRef}
            className="flex items-end justify-between font-mono text-xs tracking-[0.25em] text-[#B7AA98]"
          >
            <div className="hidden md:block uppercase text-[#B7AA98]/80 text-[11px] max-w-xs">
              PORTFOLIO SHOWCASE BY LEVION
            </div>

            <button
              onClick={onScrollClick}
              className="pointer-events-auto flex items-center gap-4 mx-auto md:mx-0 group uppercase hover:text-[#F1EFE9] transition-colors py-2 cursor-pointer"
            >
              <span className="text-[11px] tracking-[0.3em] transform group-hover:translate-x-0.5 transition-transform duration-300">
                SCROLL TO EXPLORE
              </span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-1.5 text-sm">
                ↓
              </span>
            </button>

            <div className="hidden md:block text-right tabular-nums text-[11px]">
              01 / 07 CHOREOGRAPHY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

