import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectExpansionProps {
  onSelectProject: (projectId: string) => void;
}

export const FeaturedProjectExpansion: React.FC<FeaturedProjectExpansionProps> = ({ onSelectProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const initialFrameRef = useRef<HTMLDivElement>(null);
  const initialHeaderRef = useRef<HTMLDivElement>(null);
  const fullScreenOverlayRef = useRef<HTMLDivElement>(null);
  const titlePart1Ref = useRef<HTMLHeadingElement>(null);
  const titlePart2Ref = useRef<HTMLSpanElement>(null);
  const fullScreenMetaRef = useRef<HTMLDivElement>(null);
  const progressBadgeRef = useRef<HTMLDivElement>(null);

  const project = PROJECTS[0]; // The Courtyard House

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Extended pinned scroll-scrubbed storytelling sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Initial framing lines & metadata disperse outward
      tl.to(
        initialHeaderRef.current,
        {
          opacity: 0,
          y: -40,
          scale: 0.95,
          ease: 'power2.out',
        },
        0
      );

      tl.to(
        initialFrameRef.current,
        {
          opacity: 0,
          scale: 1.3,
          ease: 'power2.out',
        },
        0.05
      );

      // 2. Dramatic image expansion from miniature vignette (24vw x 32vh) to full bleed (100vw x 100vh)
      tl.to(
        imageWrapperRef.current,
        {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          ease: 'power2.inOut',
          duration: 0.6,
        },
        0.1
      );

      // Inner image zooms slightly in counter-motion to maintain crisp depth
      tl.fromTo(
        imageRef.current,
        { scale: 1.25, brightness: 0.75 },
        { scale: 1.05, brightness: 0.9, ease: 'none', duration: 0.6 },
        0.1
      );

      // 3. Reveal the fullscreen overlay typography as image locks into full bleed
      tl.to(
        fullScreenOverlayRef.current,
        { opacity: 1, duration: 0.25, ease: 'power2.out' },
        0.65
      );

      // Split typographic emergence: 'THE COURTYARD' from left, 'house' from right
      tl.fromTo(
        titlePart1Ref.current,
        { x: '-15vw', opacity: 0 },
        { x: '0vw', opacity: 1, duration: 0.35, ease: 'power3.out' },
        0.68
      );

      tl.fromTo(
        titlePart2Ref.current,
        { x: '15vw', opacity: 0 },
        { x: '0vw', opacity: 1, duration: 0.35, ease: 'power3.out' },
        0.72
      );

      // Floating architectural metadata plaque glides up from bottom
      tl.fromTo(
        fullScreenMetaRef.current,
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
        0.75
      );

      tl.fromTo(
        progressBadgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
        0.78
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="featured-expansion"
      ref={containerRef}
      className="relative w-full h-screen bg-[#0B0B0B] text-[#F1EFE9] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Initial Header text before expansion */}
      <div
        ref={initialHeaderRef}
        className="absolute top-10 md:top-16 z-20 text-center pointer-events-none px-6"
      >
        <span className="font-mono text-xs text-[#B7AA98] tracking-[0.35em] uppercase block mb-2">
          03 / MONOGRAPHIC REVELATION
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-light tracking-[0.18em] text-[#F1EFE9] uppercase">
          {project.title}
        </h2>
        <p className="font-mono text-[11px] text-[#B7AA98]/70 tracking-[0.25em] mt-1.5 uppercase">
          {project.category} · {project.location} · {project.year}
        </p>
      </div>

      {/* Architectural framing calipers surrounding initial thumbnail */}
      <div
        ref={initialFrameRef}
        className="absolute z-15 pointer-events-none flex flex-col items-center justify-center gap-2 will-change-[transform,opacity]"
        style={{
          width: 'clamp(320px, 32vw, 440px)',
          height: 'clamp(230px, 24vw, 320px)',
        }}
      >
        <div className="absolute -top-3 left-0 font-mono text-[9px] text-[#B7AA98]/60 tracking-widest">
          + LAT: 11.2588° N
        </div>
        <div className="absolute -bottom-3 right-0 font-mono text-[9px] text-[#B7AA98]/60 tracking-widest">
          + LONG: 75.7804° E
        </div>
        <div className="w-full h-full border border-dashed border-[#B7AA98]/30 p-2" />
      </div>

      {/* Expandable Image Container */}
      <div
        ref={imageWrapperRef}
        onClick={() => onSelectProject(project.id)}
        className="group relative z-10 cursor-pointer overflow-hidden rounded-md shadow-2xl transition-shadow will-change-[width,height,border-radius]"
        style={{
          width: 'clamp(260px, 26vw, 380px)',
          height: 'clamp(190px, 19vw, 270px)',
        }}
      >
        <img
          ref={imageRef}
          src={project.mainImage}
          alt={project.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center will-change-transform brightness-[0.88] group-hover:brightness-[0.80] group-hover:scale-[1.025] transition-all duration-700 ease-out"
        />

        {/* Soft darkening overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none" />

        {/* Attached "VIEW PROJECT ↗" badge in corner */}
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0B0B0B]/90 border border-[#F1EFE9]/30 text-[#F1EFE9] font-mono text-[10px] tracking-[0.22em] uppercase backdrop-blur-md shadow-xl transform transition-all duration-400 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <span>VIEW PROJECT</span>
            <span className="text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              ↗
            </span>
          </div>
        </div>

        {/* Fullscreen Reveal Overlay (Fades in as it expands) */}
        <div
          ref={fullScreenOverlayRef}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/50 flex flex-col justify-between p-8 md:p-16 opacity-0 pointer-events-none"
        >
          <div
            ref={progressBadgeRef}
            className="flex items-center justify-between font-mono text-xs tracking-[0.3em] text-[#B7AA98] uppercase"
          >
            <span>01 / FEATURED COMMISSION</span>
            <span className="border border-white/20 px-3 py-1 bg-black/40 backdrop-blur-xs">
              INSPECT ARCHITECTURAL MONOGRAPH ↗
            </span>
          </div>

          <div className="max-w-5xl">
            <div className="flex flex-col">
              <h3
                ref={titlePart1Ref}
                className="font-display text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-[#F1EFE9] uppercase leading-[0.88] will-change-transform group-hover:translate-x-2 transition-transform duration-300"
              >
                THE COURTYARD
              </h3>
              <span
                ref={titlePart2Ref}
                className="font-editorial italic font-normal text-4xl sm:text-6xl md:text-7xl text-[#B7AA98] lowercase tracking-normal leading-[0.9] mt-2 will-change-transform group-hover:translate-x-3 transition-transform duration-300"
              >
                house
              </span>
            </div>

            <div
              ref={fullScreenMetaRef}
              className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs md:text-sm tracking-[0.25em] text-[#B7AA98] uppercase border-t border-white/15 pt-6 will-change-transform"
            >
              <span>{project.category}</span>
              <span className="text-white/30">·</span>
              <span>{project.location}</span>
              <span className="text-white/30">·</span>
              <span>{project.year}</span>
              <span className="text-white/30">·</span>
              <span>{project.area}</span>
              <span className="text-white/30">·</span>
              <span>PASSIVE THERMAL COOLING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

