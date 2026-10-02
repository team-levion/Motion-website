import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PhilosophySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const part1Line1Ref = useRef<HTMLDivElement>(null);
  const part1Line2Ref = useRef<HTMLDivElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);
  const part2Line1Ref = useRef<HTMLDivElement>(null);
  const part2Line2Ref = useRef<HTMLDivElement>(null);
  const leftAnnotationRef = useRef<HTMLDivElement>(null);
  const rightAnnotationRef = useRef<HTMLDivElement>(null);
  const bgCanvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Extended pinned scroll-scrubbed storytelling sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
        },
      });

      // 1. First statement masked clip reveal (WE DON'T DECORATE SPACES.)
      tl.fromTo(
        part1Line1Ref.current,
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          yPercent: 80,
          skewY: 3,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          yPercent: 0,
          skewY: 0,
          ease: 'power3.out',
          duration: 0.35,
        },
        0
      );

      tl.fromTo(
        part1Line2Ref.current,
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          yPercent: 80,
          skewY: -3,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          yPercent: 0,
          skewY: 0,
          ease: 'power3.out',
          duration: 0.35,
        },
        0.08
      );

      // 2. Fine horizontal datum slice draws across
      tl.fromTo(
        dividerLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.25, ease: 'expo.inOut' },
        0.28
      );

      // 3. Second statement enters with counter-motion (WE SHAPE EXPERIENCES.)
      tl.fromTo(
        part2Line1Ref.current,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          yPercent: -70,
          skewY: -2,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          yPercent: 0,
          skewY: 0,
          ease: 'power3.out',
          duration: 0.35,
        },
        0.35
      );

      tl.fromTo(
        part2Line2Ref.current,
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          yPercent: 90,
          scale: 0.95,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          yPercent: 0,
          scale: 1,
          ease: 'power3.out',
          duration: 0.4,
        },
        0.42
      );

      // 4. Differential floating margin annotations
      tl.fromTo(
        leftAnnotationRef.current,
        { y: 80, opacity: 0 },
        { y: -30, opacity: 1, duration: 0.5, ease: 'none' },
        0.2
      );

      tl.fromTo(
        rightAnnotationRef.current,
        { y: 120, opacity: 0 },
        { y: -50, opacity: 1, duration: 0.5, ease: 'none' },
        0.25
      );

      // 5. Subtle background warmth shift and exit preparation
      tl.to(
        bgCanvasRef.current,
        {
          backgroundColor: '#E8E3D7',
          ease: 'none',
        },
        0.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="philosophy"
      ref={containerRef}
      className="relative w-full h-screen select-none overflow-hidden"
    >
      <div
        ref={bgCanvasRef}
        className="w-full h-full bg-[#F1EFE9] text-[#0B0B0B] flex flex-col justify-between py-16 md:py-20 px-6 md:px-16 transition-colors duration-700"
      >
        {/* Top Header metadata */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between font-mono text-xs tracking-[0.3em] text-[#0B0B0B]/60 uppercase border-b border-[#0B0B0B]/15 pb-6">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#0B0B0B]">02 / DOCTRINE</span>
            <span>·</span>
            <span>THE PRIMACY OF VOID</span>
          </div>
          <div className="tabular-nums hidden sm:block">
            PHILOSOPHICAL AXIOM
          </div>
        </div>

        {/* Central Masked Typographic Architecture */}
        <div className="w-full max-w-6xl mx-auto my-auto flex flex-col items-center justify-center text-center py-6 relative">
          {/* Floating Left Editorial Annotation */}
          <div
            ref={leftAnnotationRef}
            className="hidden xl:block absolute -left-12 top-1/4 max-w-[200px] text-left font-mono text-[11px] text-[#0B0B0B]/70 tracking-wider leading-relaxed will-change-transform"
          >
            <span className="text-[#0B0B0B] block font-semibold mb-1">
              [ 01. INTENTION ]
            </span>
            Eliminating ornamental surplus until only light, weight, and silence remain.
          </div>

          {/* Floating Right Editorial Annotation */}
          <div
            ref={rightAnnotationRef}
            className="hidden xl:block absolute -right-12 bottom-1/4 max-w-[200px] text-right font-mono text-[11px] text-[#0B0B0B]/70 tracking-wider leading-relaxed will-change-transform"
          >
            <span className="text-[#0B0B0B] block font-semibold mb-1">
              [ 02. CHOREOGRAPHY ]
            </span>
            Designing the threshold between human vulnerability and geological time.
          </div>

          {/* Group 1: WE DON'T DECORATE SPACES. */}
          <div className="w-full flex flex-col items-center">
            <div ref={part1Line1Ref} className="will-change-transform">
              <h2 className="font-display text-[9vw] md:text-[6.5vw] font-light leading-[0.9] tracking-[-0.03em] uppercase text-[#0B0B0B]">
                WE DON'T DECORATE
              </h2>
            </div>
            <div ref={part1Line2Ref} className="will-change-transform">
              <span className="font-display text-[9vw] md:text-[6.5vw] font-light leading-[0.9] tracking-[-0.03em] uppercase text-[#0B0B0B]">
                SPACES.
              </span>
            </div>
          </div>

          {/* Architectural dividing datum line */}
          <div
            ref={dividerLineRef}
            className="w-48 md:w-96 h-[1.5px] bg-[#0B0B0B]/25 my-6 md:my-10 origin-center scale-x-0 will-change-transform"
          />

          {/* Group 2: WE SHAPE EXPERIENCES. */}
          <div className="w-full flex flex-col items-center">
            <div ref={part2Line1Ref} className="will-change-transform">
              <span className="font-display text-[8.5vw] md:text-[6vw] font-light leading-[0.9] tracking-[-0.03em] uppercase text-[#0B0B0B]/80">
                WE SHAPE
              </span>
            </div>
            <div ref={part2Line2Ref} className="will-change-transform">
              <span className="font-editorial italic font-normal text-[11vw] md:text-[8vw] leading-[0.88] text-[#8C7E6C] tracking-[0.01em] block">
                experiences.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Footnote */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#0B0B0B]/15 font-mono text-xs text-[#0B0B0B]/70 tracking-wider">
          <div className="text-[11px] leading-relaxed">
            Every material selection is an acoustic decision. We build quiet rooms for loud worlds.
          </div>
          <div className="hidden md:block text-[11px] leading-relaxed text-center">
            SCROLL DOWN TO WITNESS THE ARCHITECTURAL TRANSITION
          </div>
          <div className="text-left md:text-right text-[11px] tabular-nums">
            FORMA ATELIER · 2026
          </div>
        </div>
      </div>
    </div>
  );
};

