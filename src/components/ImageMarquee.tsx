import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MARQUEE_IMAGES } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const ImageMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Horizontal track travel with scrub
      gsap.to(trackRef.current, {
        x: '-22%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // 2. Alternating vertical offset on items (odd up, even down)
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const yOffset = i % 2 === 0 ? -35 : 35;
        gsap.fromTo(
          el,
          { y: -yOffset * 0.8 },
          {
            y: yOffset,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Double the array for smooth infinite marquee feel
  const images = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-36 bg-[#070707] text-[#F1EFE9] overflow-hidden select-none border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 flex items-center justify-between font-mono text-xs text-[#B7AA98] tracking-[0.3em] uppercase">
        <span>09 / VISUAL ANTHOLOGY</span>
        <span>SHADOW · VOID · TECTONIC SURFACE</span>
      </div>

      <div
        ref={trackRef}
        className="flex items-center gap-8 md:gap-14 w-max cursor-grab active:cursor-grabbing will-change-transform py-6"
      >
        {images.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => {
              itemsRef.current[idx] = el;
            }}
            className={`shrink-0 flex flex-col group will-change-transform ${item.aspect}`}
          >
            <div className="relative w-full h-full overflow-hidden bg-[#141414] rounded-xs border border-white/10 shadow-xl">
              <img
                src={item.src}
                alt={item.label}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center brightness-[0.82] group-hover:scale-108 group-hover:brightness-100 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:opacity-0 transition-opacity" />
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#B7AA98] tracking-widest uppercase">
              <span>{item.label}</span>
              <span className="text-[#B7AA98]/30">·</span>
              <span>PLATE 0{(idx % 6) + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

