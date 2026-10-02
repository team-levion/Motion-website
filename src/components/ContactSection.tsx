import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  onOpenInquiry: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenInquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-scrubbed typographic convergence:
      // Line 1 glides in from the left, Line 2 glides in from the right as user scrolls into the finale
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });

      tl.fromTo(
        title1Ref.current,
        { x: -60, opacity: 0.2 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      tl.fromTo(
        title2Ref.current,
        { x: 60, opacity: 0.2 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      tl.fromTo(
        ctaRef.current,
        { scale: 0.9, opacity: 0.3 },
        { scale: 1, opacity: 1, ease: 'power2.out' },
        0.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#070707] text-[#F1EFE9] flex flex-col justify-between py-24 md:py-36 px-6 md:px-12 select-none"
    >
      {/* Top Tagline */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-8 font-mono text-xs text-[#B7AA98] tracking-[0.35em] uppercase">
        <span>10 / INITIATION OF SPACE</span>
        <span>COMMISSIONS OPEN · 2026–2027</span>
      </div>

      {/* Main Dramatic Typographic Statement */}
      <div className="max-w-7xl mx-auto w-full my-auto flex flex-col items-start py-12">
        <h2
          ref={title1Ref}
          className="font-display text-5xl sm:text-7xl md:text-9xl font-light tracking-tight text-[#F1EFE9] uppercase leading-[0.88] will-change-transform"
        >
          HAVE
          <br />
          A SPACE?
        </h2>

        <div className="my-8 md:my-12">
          <h3
            ref={title2Ref}
            className="font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-tight text-[#B7AA98] uppercase leading-[0.92] will-change-transform"
          >
            LET'S MAKE IT
            <br />
            <span className="font-editorial italic font-normal text-[#F1EFE9] lowercase tracking-normal">
              unforgettable.
            </span>
          </h3>
        </div>

        {/* Start a Project CTA Button */}
        <div ref={ctaRef} className="mt-4 will-change-transform">
          <button
            onClick={onOpenInquiry}
            className="group relative inline-flex items-center gap-6 px-8 md:px-14 py-5 md:py-6 bg-[#F1EFE9] text-[#0B0B0B] hover:bg-[#B7AA98] transition-all duration-300 font-mono text-xs md:text-sm tracking-[0.3em] uppercase font-semibold shadow-2xl cursor-pointer"
          >
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              START A PROJECT
            </span>
            <span className="text-sm md:text-base transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1">
              ↗
            </span>
          </button>
        </div>
      </div>

      {/* Contact Channels & Socials */}
      <div className="max-w-7xl mx-auto w-full pt-12 border-t border-white/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 font-mono text-xs text-[#B7AA98]">
        <div>
          <span className="text-[11px] tracking-widest uppercase block mb-1.5 text-[#B7AA98]/60">
            DIRECT COMMISSION INQUIRIES
          </span>
          <a
            href="mailto:hello@forma.studio"
            className="text-[#F1EFE9] hover:text-[#B7AA98] text-sm md:text-base tracking-wider transition-colors inline-flex items-center gap-2 group cursor-pointer"
          >
            <span className="group-hover:underline underline-offset-4 decoration-[#B7AA98]">hello@forma.studio</span>
            <span className="text-xs transform group-hover:translate-x-1 transition-transform duration-200">↗</span>
          </a>
        </div>

        <div className="flex items-center gap-8 text-xs tracking-[0.25em] uppercase">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F1EFE9] transition-all duration-200 cursor-pointer inline-flex items-center gap-1 group hover:-translate-y-0.5"
          >
            <span className="group-hover:underline underline-offset-4">INSTAGRAM</span>
            <span className="text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
          </a>
          <a
            href="https://behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F1EFE9] transition-all duration-200 cursor-pointer inline-flex items-center gap-1 group hover:-translate-y-0.5"
          >
            <span className="group-hover:underline underline-offset-4">BEHANCE</span>
            <span className="text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F1EFE9] transition-all duration-200 cursor-pointer inline-flex items-center gap-1 group hover:-translate-y-0.5"
          >
            <span className="group-hover:underline underline-offset-4">LINKEDIN</span>
            <span className="text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

