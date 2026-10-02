import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STUDIO_IMAGE } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const NumbersAndStudioSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statCol1Ref = useRef<HTMLDivElement>(null);
  const statCol2Ref = useRef<HTMLDivElement>(null);
  const statCol3Ref = useRef<HTMLDivElement>(null);

  const studioRef = useRef<HTMLDivElement>(null);
  const studioImageRef = useRef<HTMLImageElement>(null);
  const manifestoLine1Ref = useRef<HTMLDivElement>(null);
  const manifestoLine2Ref = useRef<HTMLDivElement>(null);
  const manifestoLine3Ref = useRef<HTMLDivElement>(null);

  const [counts, setCounts] = useState({
    projects: 12,
    transformed: 4,
    years: 2,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-scrubbed quantitative counters tied directly to scroll progress
      const counterProxy = { p: 0, t: 0, y: 0 };
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        end: 'bottom 40%',
        scrub: 1,
        onUpdate: (self) => {
          const prog = self.progress;
          setCounts({
            projects: Math.min(42, Math.floor(prog * 42)),
            transformed: Math.min(18, Math.floor(prog * 18)),
            years: Math.min(8, Math.floor(prog * 8)),
          });
        },
      });

      // Differential column parallax speeds
      gsap.fromTo(
        statCol1Ref.current,
        { y: 40 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        statCol2Ref.current,
        { y: 80 },
        {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.6,
          },
        }
      );

      gsap.fromTo(
        statCol3Ref.current,
        { y: 20 },
        {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        }
      );

      // 2. Studio Manifesto independent horizontal scroll-scrub reveals
      gsap.fromTo(
        manifestoLine1Ref.current,
        { x: -50, opacity: 0.3 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: studioRef.current,
            start: 'top 70%',
            end: 'center 45%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        manifestoLine2Ref.current,
        { x: 50, opacity: 0.3 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: studioRef.current,
            start: 'top 60%',
            end: 'center 40%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        manifestoLine3Ref.current,
        { x: -30, opacity: 0.3 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: studioRef.current,
            start: 'top 50%',
            end: 'center 35%',
            scrub: 1,
          },
        }
      );

      // Deep tactile window parallax on atelier photography
      gsap.fromTo(
        studioImageRef.current,
        { yPercent: -15, scale: 1.15 },
        {
          yPercent: 15,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: studioRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="studio" ref={containerRef} className="w-full bg-[#070707] text-[#F1EFE9] select-none">
      {/* Statistics Section with Scroll-Scrubbed Quantitative Discipline */}
      <section ref={statsRef} className="py-28 md:py-36 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.35em] text-[#B7AA98] uppercase mb-16">
            <span>08 / QUANTITATIVE RIGOR</span>
            <span>·</span>
            <span>METRICS OF PRACTICE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
            {/* Stat 1 */}
            <div
              ref={statCol1Ref}
              className="flex flex-col border-t border-white/15 pt-8 will-change-transform"
            >
              <span className="font-display text-7xl md:text-9xl font-light text-[#F1EFE9] tracking-tight tabular-nums leading-none">
                {counts.projects.toString().padStart(2, '0')}
              </span>
              <span className="font-mono text-xs md:text-sm text-[#B7AA98] tracking-[0.3em] uppercase mt-5">
                COMPLETED COMMISSIONS
              </span>
              <p className="font-body text-xs text-[#B7AA98]/70 mt-2 font-light leading-relaxed">
                Residential, institutional, and cultural spaces realized across 6 countries.
              </p>
            </div>

            {/* Stat 2 */}
            <div
              ref={statCol2Ref}
              className="flex flex-col border-t border-white/15 pt-8 will-change-transform"
            >
              <span className="font-display text-7xl md:text-9xl font-light text-[#F1EFE9] tracking-tight tabular-nums leading-none">
                {counts.transformed.toString().padStart(2, '0')}
              </span>
              <span className="font-mono text-xs md:text-sm text-[#B7AA98] tracking-[0.3em] uppercase mt-5">
                SPACES TRANSFORMED
              </span>
              <p className="font-body text-xs text-[#B7AA98]/70 mt-2 font-light leading-relaxed">
                Adaptive reuse and historic interior metamorphoses.
              </p>
            </div>

            {/* Stat 3 */}
            <div
              ref={statCol3Ref}
              className="flex flex-col border-t border-white/15 pt-8 will-change-transform"
            >
              <span className="font-display text-7xl md:text-9xl font-light text-[#F1EFE9] tracking-tight tabular-nums leading-none">
                0{counts.years}
              </span>
              <span className="font-mono text-xs md:text-sm text-[#B7AA98] tracking-[0.3em] uppercase mt-5">
                YEARS OF PRACTICE
              </span>
              <p className="font-body text-xs text-[#B7AA98]/70 mt-2 font-light leading-relaxed">
                Continuous material research, acoustic inquiry, and structural rigor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Section with Slow Parallax Photography */}
      <section ref={studioRef} className="py-28 md:py-44 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Manifesto Typography */}
          <div className="lg:col-span-7 flex flex-col gap-6 z-10">
            <span className="font-mono text-xs text-[#B7AA98] tracking-[0.35em] uppercase">
              THE STUDIO PRAXIS
            </span>

            <div className="flex flex-col gap-3">
              <div ref={manifestoLine1Ref} className="will-change-transform">
                <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-light uppercase tracking-tight text-[#F1EFE9] leading-[0.9]">
                  WE DESIGN
                  <br />
                  <span className="font-editorial italic font-normal text-[#B7AA98] lowercase tracking-normal">
                    for people.
                  </span>
                </h3>
              </div>

              <div ref={manifestoLine2Ref} className="will-change-transform mt-3">
                <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-light uppercase tracking-tight text-[#F1EFE9] leading-[0.9]">
                  WE CREATE
                  <br />
                  <span className="font-editorial italic font-normal text-[#B7AA98] lowercase tracking-normal">
                    for living.
                  </span>
                </h3>
              </div>

              <div ref={manifestoLine3Ref} className="will-change-transform mt-3">
                <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-light uppercase tracking-tight text-[#F1EFE9] leading-[0.9]">
                  WE BUILD
                  <br />
                  <span className="font-editorial italic font-normal text-[#B7AA98] lowercase tracking-normal">
                    for time.
                  </span>
                </h3>
              </div>
            </div>

            <p className="font-body text-base md:text-lg text-[#B7AA98] leading-relaxed max-w-xl mt-6 font-light">
              Founded with the conviction that true luxury is acoustic silence, balanced natural daylight, and geological permanence. We design buildings not as objects of ego, but as tactile sanctuaries that age gracefully with sunlight and patinated stone.
            </p>
          </div>

          {/* Parallax Image Container */}
          <div className="lg:col-span-5 relative">
            <div className="w-full h-[540px] md:h-[660px] overflow-hidden rounded-xs border border-white/10 bg-[#121212] shadow-2xl">
              <img
                ref={studioImageRef}
                src={STUDIO_IMAGE}
                alt="FORMA Atelier Architecture Workshop"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-[135%] object-cover object-center brightness-[0.88] will-change-transform"
              />
            </div>
            {/* Architectural caption */}
            <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-[#B7AA98] tracking-widest uppercase">
              <span>ATELIER ARCHIVE · DRAFTING BENCH</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

