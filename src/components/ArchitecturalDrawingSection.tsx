import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AFTER_IMAGE } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const ArchitecturalDrawingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgLinesRef = useRef<SVGSVGElement>(null);
  const strokePath1Ref = useRef<SVGPathElement>(null);
  const strokePath2Ref = useRef<SVGPathElement>(null);
  const detailGridRef = useRef<SVGGElement>(null);
  const finishedImageRef = useRef<HTMLDivElement>(null);
  const blueprintGridRef = useRef<HTMLDivElement>(null);
  const laserScannerRef = useRef<HTMLDivElement>(null);
  const stageLabelRef = useRef<HTMLSpanElement>(null);
  const [currentStageText, setCurrentStageText] = useState('STAGE 01 / DRAFTING SCHEMATICS');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Extended pinned scroll-scrubbed metamorphosis
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=280%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.22) {
              setCurrentStageText('STAGE 01 / VECTOR AXIS DRAFTING');
            } else if (p < 0.45) {
              setCurrentStageText('STAGE 02 / PLAN CO-ORDINATES & PARTITIONS');
            } else if (p < 0.68) {
              setCurrentStageText('STAGE 03 / SCANNER & MATERIAL TRANSCENDENCE');
            } else if (p < 0.86) {
              setCurrentStageText('STAGE 04 / SKELETAL LINE DISSOLUTION');
            } else {
              setCurrentStageText('STAGE 05 / REALIZED PHOTOREALISTIC LIFE');
            }
          },
        },
      });

      // Stage 1: Vector stroke drafting lines write themselves onto the grid
      tl.fromTo(
        [strokePath1Ref.current, strokePath2Ref.current],
        { strokeDashoffset: 1400 },
        { strokeDashoffset: 0, duration: 0.35, ease: 'none' },
        0
      );

      // Stage 2: Detailed room partitions and dimensions illuminate
      tl.fromTo(
        detailGridRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
        0.15
      );

      // Stage 3: Scanning laser beam travels vertically downwards, peeling open the photorealistic interior underneath
      tl.fromTo(
        laserScannerRef.current,
        { top: '0%', opacity: 0 },
        { top: '100%', opacity: 1, duration: 0.5, ease: 'none' },
        0.35
      );

      tl.fromTo(
        finishedImageRef.current,
        {
          opacity: 0,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          scale: 1.08,
        },
        {
          opacity: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1.0,
          duration: 0.5,
          ease: 'none',
        },
        0.35
      );

      // Stage 4: Technical drawing lines fade and dissolve into ambient space
      tl.to(
        [svgLinesRef.current, blueprintGridRef.current, laserScannerRef.current],
        {
          opacity: 0,
          filter: 'blur(6px)',
          duration: 0.25,
          ease: 'power2.in',
        },
        0.75
      );

      // Stage 5: Finished photorealistic interior takes full dominance
      tl.to(
        finishedImageRef.current,
        {
          scale: 1.03,
          filter: 'brightness(1.08) contrast(1.05)',
          duration: 0.2,
          ease: 'none',
        },
        0.85
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="drawing-experience"
      ref={containerRef}
      className="relative w-full h-screen bg-[#070707] text-[#F1EFE9] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Architectural Coordinate Grid */}
      <div
        ref={blueprintGridRef}
        className="absolute inset-0 pointer-events-none opacity-20 transition-opacity"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(183, 170, 152, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(183, 170, 152, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Finished Photorealistic Luxury Interior (Emerges underneath via laser scan) */}
      <div
        ref={finishedImageRef}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none overflow-hidden will-change-[clip-path,opacity,transform]"
      >
        <img
          src={AFTER_IMAGE}
          alt="Completed luxury architecture interior space"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60" />
      </div>

      {/* Laser Scanner Horizontal Beam */}
      <div
        ref={laserScannerRef}
        className="absolute left-0 right-0 h-[2px] bg-[#F1EFE9] shadow-[0_0_20px_rgba(241,239,233,0.9)] z-25 pointer-events-none opacity-0 will-change-[top,opacity]"
      />

      {/* Top Header */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 pt-8 md:pt-12 flex items-center justify-between pointer-events-none">
        <div>
          <span className="font-mono text-xs text-[#B7AA98] tracking-[0.35em] uppercase block mb-1">
            07 / ARCHITECTURAL ALCHEMY
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#F1EFE9] uppercase leading-none">
            FROM LINE
            <span className="font-editorial italic font-normal text-[#B7AA98] lowercase ml-3">
              to life.
            </span>
          </h2>
        </div>

        <div className="text-right">
          <span
            ref={stageLabelRef}
            className="font-mono text-xs text-[#B7AA98] tracking-[0.25em] uppercase border border-[#B7AA98]/40 px-3.5 py-2 backdrop-blur-xs bg-black/60 inline-block tabular-nums"
          >
            {currentStageText}
          </span>
        </div>
      </div>

      {/* SVG Architectural Blueprint & Technical Drawing */}
      <div className="relative z-20 w-full max-w-5xl mx-auto my-auto px-6 pointer-events-none flex items-center justify-center">
        <svg
          ref={svgLinesRef}
          viewBox="0 0 1000 600"
          className="w-full h-auto max-h-[62vh] will-change-transform drop-shadow-[0_0_15px_rgba(241,239,233,0.2)]"
          fill="none"
          stroke="#F1EFE9"
          strokeWidth="1.4"
        >
          {/* Outer Building Structural Perimeter (Draws via strokeDashoffset) */}
          <path
            ref={strokePath1Ref}
            d="M 100,60 L 900,60 L 900,540 L 100,540 Z"
            stroke="#B7AA98"
            strokeWidth="1.8"
            strokeDasharray="1400"
            strokeDashoffset="1400"
            className="will-change-[stroke-dashoffset]"
          />

          {/* Cross Structural Axes */}
          <path
            ref={strokePath2Ref}
            d="M 100,300 L 900,300 M 500,60 L 500,540"
            stroke="#B7AA98"
            strokeWidth="0.8"
            strokeDasharray="1400"
            strokeDashoffset="1400"
            opacity="0.6"
            className="will-change-[stroke-dashoffset]"
          />

          {/* Detailed Room Partitions & Inner Courtyard */}
          <g ref={detailGridRef} className="transition-opacity">
            {/* Inner Courtyard Void */}
            <rect
              x="380"
              y="180"
              width="240"
              height="240"
              stroke="#F1EFE9"
              strokeWidth="2.2"
            />
            {/* Courtyard Tree Symbol & Radians */}
            <circle cx="500" cy="300" r="38" stroke="#B7AA98" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="500" cy="300" r="9" fill="#B7AA98" />
            <text x="500" y="360" textAnchor="middle" fill="#B7AA98" fontSize="11" fontFamily="Space Grotesk" letterSpacing="3">
              CENTRAL ATRIUM / VOID
            </text>

            {/* Living Pavilion */}
            <line x1="100" y1="240" x2="380" y2="240" stroke="#F1EFE9" strokeWidth="2" />
            <line x1="100" y1="420" x2="380" y2="420" stroke="#F1EFE9" strokeWidth="2" />
            <text x="240" y="325" textAnchor="middle" fill="#F1EFE9" fontSize="14" fontFamily="Syne" letterSpacing="3">
              LIVING SALON
            </text>
            <text x="240" y="348" textAnchor="middle" fill="#B7AA98" fontSize="10" fontFamily="Space Grotesk">
              AREA: 124 m² · LEVEL ±0.00
            </text>

            {/* Hearth & Chimney Cantilever */}
            <rect x="130" y="295" width="45" height="70" stroke="#B7AA98" strokeWidth="1.5" />

            {/* Gallery Corridor */}
            <line x1="380" y1="180" x2="380" y2="60" stroke="#F1EFE9" strokeWidth="2" />
            <line x1="620" y1="180" x2="620" y2="60" stroke="#F1EFE9" strokeWidth="2" />
            <text x="500" y="125" textAnchor="middle" fill="#F1EFE9" fontSize="13" fontFamily="Syne" letterSpacing="3">
              NORTH GALLERY
            </text>

            {/* Master Wing */}
            <line x1="620" y1="240" x2="900" y2="240" stroke="#F1EFE9" strokeWidth="2" />
            <line x1="620" y1="420" x2="900" y2="420" stroke="#F1EFE9" strokeWidth="2" />
            <text x="760" y="325" textAnchor="middle" fill="#F1EFE9" fontSize="14" fontFamily="Syne" letterSpacing="3">
              SANCTUARY
            </text>
            <text x="760" y="348" textAnchor="middle" fill="#B7AA98" fontSize="10" fontFamily="Space Grotesk">
              SMOKED OAK &amp; HONED TRAVERTINE
            </text>

            {/* Glazing Window Lines */}
            <line x1="380" y1="420" x2="620" y2="420" stroke="#B7AA98" strokeWidth="1.2" strokeDasharray="6 3" />
            <text x="500" y="445" textAnchor="middle" fill="#B7AA98" fontSize="10" fontFamily="Space Grotesk">
              10.0m FRAMELESS POCKET GLAZING
            </text>

            {/* Dimension Lines & Coordinate Ticks */}
            <line x1="100" y1="36" x2="900" y2="36" stroke="#B7AA98" strokeWidth="0.8" />
            <line x1="100" y1="30" x2="100" y2="42" stroke="#B7AA98" strokeWidth="1" />
            <line x1="900" y1="30" x2="900" y2="42" stroke="#B7AA98" strokeWidth="1" />
            <text x="500" y="28" textAnchor="middle" fill="#B7AA98" fontSize="11" fontFamily="Space Grotesk" letterSpacing="2">
              34,500 mm TOTAL FACADE SPAN
            </text>

            <line x1="65" y1="60" x2="65" y2="540" stroke="#B7AA98" strokeWidth="0.8" />
            <line x1="58" y1="60" x2="72" y2="60" stroke="#B7AA98" strokeWidth="1" />
            <line x1="58" y1="540" x2="72" y2="540" stroke="#B7AA98" strokeWidth="1" />
            <text x="40" y="305" textAnchor="middle" fill="#B7AA98" fontSize="11" fontFamily="Space Grotesk" transform="rotate(-90 40 305)">
              21,000 mm SPATIAL DEPTH
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Architectural Caption */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 pb-8 md:pb-12 flex flex-col md:flex-row items-start md:items-end justify-between font-mono text-xs text-[#B7AA98] tracking-widest uppercase gap-4 pointer-events-none">
        <div>
          <span>PLAN 04 / GROUND ATRIUM TOPOGRAPHY</span>
          <span className="block text-[11px] text-[#B7AA98]/60 mt-1">
            CONTINUE SCROLLING TO COMPLETE TRANSCENDENCE
          </span>
        </div>
        <div className="tabular-nums">
          CO-ORDINATE: 11.2588° N, 75.7804° E
        </div>
      </div>
    </section>
  );
};

