import React, { useState, useEffect, useRef } from 'react';
import { SERVICES } from '../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const serviceRowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-linked alternating horizontal displacement
      serviceRowsRef.current.forEach((row, i) => {
        if (!row) return;
        const direction = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(
          row,
          { x: -direction * 0.5 },
          {
            x: direction * 0.8,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#070707] text-[#F1EFE9] py-28 md:py-40 overflow-hidden select-none"
    >
      {/* Dynamic Background Image Layers with Dramatic Diagonal Masks */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700">
        {SERVICES.map((service) => {
          const isActive = service.id === activeServiceId;
          return (
            <div
              key={service.id}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                isActive
                  ? 'opacity-35 scale-100'
                  : 'opacity-0 scale-110 pointer-events-none'
              }`}
              style={{
                clipPath: isActive
                  ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                  : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center brightness-[0.7] contrast-[1.15]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/60 to-transparent" />
            </div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between min-h-[75vh]">
        {/* Section Heading */}
        <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#B7AA98] tracking-[0.35em] uppercase">
              06 / DISCIPLINE &amp; METHODOLOGY
            </span>
          </div>
          <span className="font-mono text-xs text-[#B7AA98] tracking-widest uppercase">
            WHAT WE DO
          </span>
        </div>

        {/* Massive Vertical Typography Stack with Spotlight Focus */}
        <div className="flex flex-col gap-6 md:gap-12 my-auto">
          {SERVICES.map((service, idx) => {
            const isHovered = service.id === activeServiceId;
            return (
              <div
                key={service.id}
                ref={(el) => {
                  serviceRowsRef.current[idx] = el;
                }}
                onMouseEnter={() => {
                  setActiveServiceId(service.id);
                }}
                className="group relative cursor-pointer border-b border-white/5 pb-8 transition-all duration-500 will-change-transform"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Service Number & Name */}
                  <div className="flex items-baseline gap-6 md:gap-14">
                    <span className="font-mono text-sm md:text-base text-[#B7AA98] tracking-widest tabular-nums">
                      {service.number}
                    </span>
                    <h3
                      className={`font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-tight uppercase transition-all duration-500 leading-none ${
                        isHovered
                          ? 'text-[#F1EFE9] translate-x-4 md:translate-x-8 opacity-100'
                          : 'text-[#F1EFE9]/25 hover:text-[#F1EFE9]/60'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Deliverables summary tag list shown when active */}
                  <div
                    className={`transition-all duration-500 max-w-md lg:text-right ${
                      isHovered
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-3 pointer-events-none'
                    }`}
                  >
                    <p className="font-body text-xs md:text-sm text-[#B7AA98] mb-3 leading-relaxed font-light">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap lg:justify-end gap-2 font-mono text-[10px] text-[#F1EFE9]/80 tracking-widest uppercase">
                      {service.deliverables.map((d, dIdx) => (
                        <span key={dIdx} className="bg-white/5 px-2.5 py-1 border border-white/10">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between font-mono text-xs text-[#B7AA98]/60 tracking-widest uppercase gap-4">
          <span>COMPREHENSIVE SPATIAL PRACTICE</span>
          <span>CONCEPT DESIGN · TECHNICAL ARCHITECTURE · SITE MASTERY</span>
        </div>
      </div>
    </section>
  );
};

