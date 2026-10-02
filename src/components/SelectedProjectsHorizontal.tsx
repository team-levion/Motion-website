import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../types';
import { PROJECTS } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface SelectedProjectsHorizontalProps {
  onSelectProject: (projectId: string) => void;
}

export const SelectedProjectsHorizontal: React.FC<SelectedProjectsHorizontalProps> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const innerImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal travel distance with generous breathing margin
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 200);

      // Main horizontal track translation
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 1200}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update active project index for footer telemetry
            const progress = self.progress;
            const index = Math.min(PROJECTS.length - 1, Math.floor(progress * PROJECTS.length));
            setActiveProjectIndex(index);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${progress * 100}%`;
            }
          },
        },
      });

      // Layer 1: Background giant numerals travel at a differential accelerated speed (Parallax Plane 1)
      numberRefs.current.forEach((numEl) => {
        if (!numEl) return;
        gsap.to(numEl, {
          xPercent: 60,
          opacity: 0.6,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${track.scrollWidth - window.innerWidth + 1200}`,
            scrub: 1.4,
          },
        });
      });

      // Layer 2: Inner image counter-parallax (Parallax Plane 2)
      // Gives the tactile sensation of looking through a deep window aperture
      innerImagesRef.current.forEach((imgEl) => {
        if (!imgEl) return;
        gsap.fromTo(
          imgEl,
          { xPercent: 12, scale: 1.15 },
          {
            xPercent: -12,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${track.scrollWidth - window.innerWidth + 1200}`,
              scrub: 1.2,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#070707] text-[#F1EFE9] overflow-hidden flex flex-col justify-center select-none"
    >
      {/* Top Section Header */}
      <div className="absolute top-8 md:top-12 left-6 md:left-16 right-6 md:right-16 z-20 flex items-center justify-between font-mono text-xs tracking-[0.3em] text-[#B7AA98] uppercase pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B7AA98] animate-pulse" />
          <span>04 / CURATED ANTHOLOGY</span>
        </div>
        <div className="tabular-nums">
          INDEX 0{activeProjectIndex + 1} / 0{PROJECTS.length}
        </div>
      </div>

      {/* Horizontal Projects Track */}
      <div
        ref={trackRef}
        className="flex items-center gap-14 md:gap-28 pl-8 md:pl-20 pr-48 w-max h-[82vh] will-change-transform pt-10 md:pt-14"
      >
        {/* Intro Big Typographic Title Slide */}
        <div className="w-[300px] md:w-[420px] shrink-0 flex flex-col justify-center pr-6">
          <span className="font-mono text-xs text-[#B7AA98] tracking-[0.35em] uppercase mb-4 block">
            SELECTED COMMISSIONS
          </span>
          <h2 className="font-display text-5xl md:text-8xl font-light tracking-tight text-[#F1EFE9] uppercase leading-[0.88]">
            SELECTED
            <br />
            <span className="font-editorial italic font-normal text-[#B7AA98] lowercase tracking-normal">
              projects.
            </span>
          </h2>
          <p className="font-body text-xs md:text-sm text-[#B7AA98]/80 leading-relaxed mt-6 max-w-sm font-light">
            Each commission represents an unrepeatable tectonic response to site topography, microclimate, and spatial stillness.
          </p>
          <div className="mt-8 font-mono text-[11px] text-[#B7AA98] tracking-widest flex items-center gap-3">
            <span>SCROLL HORIZONTALLY</span>
            <span className="text-sm">→</span>
          </div>
        </div>

        {/* Project Cards with distinct editorial aspect ratios and dimensions */}
        {PROJECTS.map((project: Project, idx: number) => {
          // Editorial width & height variations to avoid identical cards
          const cardDimensions = [
            'w-[360px] md:w-[540px] h-[64vh]',
            'w-[300px] md:w-[420px] h-[70vh]',
            'w-[340px] md:w-[490px] h-[60vh]',
            'w-[400px] md:w-[600px] h-[64vh]',
          ][idx % 4];

          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className={`shrink-0 flex flex-col justify-end group cursor-pointer relative ${cardDimensions}`}
            >
              {/* Parallax Accelerated Project Number */}
              <div className="absolute -top-12 md:-top-16 left-0 pointer-events-none z-0 overflow-hidden">
                <span
                  ref={(el) => {
                    numberRefs.current[idx] = el;
                  }}
                  className="font-mono text-4xl md:text-7xl font-extralight text-[#B7AA98]/35 tracking-widest inline-block will-change-transform"
                >
                  {project.number}
                </span>
              </div>

              {/* Architectural Image Container with Subtle Scale and Attached Label */}
              <div className="relative w-full h-[76%] overflow-hidden bg-[#141414] rounded-xs border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-10 cursor-pointer">
                <img
                  ref={(el) => {
                    innerImagesRef.current[idx] = el;
                  }}
                  src={project.mainImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center brightness-[0.88] group-hover:brightness-[0.82] group-hover:scale-[1.025] will-change-transform transition-all duration-700 ease-out"
                />

                {/* Soft darkening overlay on hover */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none" />

                {/* Subtle base gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Top-left subtle metadata */}
                <div className="absolute top-4 left-4 font-mono text-[9px] tracking-widest uppercase text-[#B7AA98]/70 pointer-events-none">
                  {project.specs.materials[0]} · {project.year}
                </div>

                {/* Elegant attached "VIEW PROJECT ↗" label with clip-mask reveal near bottom-right */}
                <div className="absolute bottom-4 right-4 z-20 pointer-events-none overflow-hidden">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0B0B0B]/90 border border-[#F1EFE9]/30 text-[#F1EFE9] font-mono text-[10px] tracking-[0.22em] uppercase backdrop-blur-md shadow-xl transform transition-all duration-400 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <span>VIEW PROJECT</span>
                    <span className="text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                      ↗
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Metadata Footer with Subtle 2-4px Hover Shift */}
              <div className="mt-4 flex flex-col gap-1 z-10">
                <div className="flex items-center justify-between text-[#F1EFE9]">
                  <h3 className="font-display text-xl md:text-3xl font-light tracking-[0.06em] uppercase group-hover:text-[#B7AA98] transform group-hover:translate-x-2 transition-all duration-300">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-[#B7AA98] tracking-widest tabular-nums transform group-hover:translate-x-1 transition-transform duration-300">
                    {project.year}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-[#B7AA98]/70 tracking-widest uppercase mt-0.5 transform group-hover:translate-x-1.5 transition-transform duration-300">
                  <span>{project.category}</span>
                  <span className="text-white/20">·</span>
                  <span>{project.location}</span>
                  <span className="text-white/20">·</span>
                  <span>{project.area}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Pinned Progress Ribbon with Live Progress Bar */}
      <div className="absolute bottom-8 left-6 md:left-16 right-6 md:right-16 z-20 flex flex-col gap-2 pointer-events-none">
        <div className="w-full h-[1.5px] bg-white/10 relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full bg-[#B7AA98] transition-all duration-150"
            style={{ width: '0%' }}
          />
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] text-[#B7AA98]/70 tracking-[0.25em] uppercase">
          <span>ARCHITECTURAL PORTFOLIO ARCHIVE</span>
          <span>DRAG OR SCROLL TO TRAVERSE MONOGRAPHS</span>
        </div>
      </div>
    </section>
  );
};

