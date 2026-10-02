import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scrolling while preloader runs
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        }
      });

      // Animate percentage counter smoothly
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 1.8,
        ease: 'power3.inOut',
        onUpdate: () => {
          setPercent(Math.floor(counter.val));
        }
      });

      // Expand fine architectural horizontal datum
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: 'expo.inOut'
      }, 0.2);

      // Fade & elevate text right before curtain split
      tl.to([textRef.current, percentRef.current, lineRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in'
      });

      // Cinematic vertical split reveal: Top panel slides UP, Bottom panel slides DOWN
      tl.to(topPanelRef.current, {
        yPercent: -100,
        duration: 1.1,
        ease: 'power4.inOut'
      }, '-=0.1');

      tl.to(bottomPanelRef.current, {
        yPercent: 100,
        duration: 1.1,
        ease: 'power4.inOut'
      }, '<');

      // Hide whole container when done
      tl.set(containerRef.current, {
        display: 'none'
      });
    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [onComplete]);

  const formattedPercent = percent.toString().padStart(2, '0');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-auto select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Top half panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0B0B0B] border-b border-[#272727]/30 will-change-transform"
      />

      {/* Bottom half panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0B0B0B] border-t border-[#272727]/30 will-change-transform"
      />

      {/* Central content locked strictly in center across split */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6">
        <div ref={textRef} className="text-center">
          <span className="font-mono text-[11px] tracking-[0.35em] text-[#B7AA98] uppercase block mb-3">
            Atelier of Space & Form
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-[0.25em] text-[#F1EFE9]">
            FORMA
          </h1>
        </div>

        {/* Delicate architectural dividing datum */}
        <div
          ref={lineRef}
          className="w-32 md:w-48 h-[1px] bg-[#B7AA98]/40 my-6 origin-center scale-x-0 will-change-transform"
        />

        <div ref={percentRef} className="flex items-center gap-3 text-[#B7AA98]">
          <span className="font-mono text-sm tracking-widest tabular-nums">
            {formattedPercent}
          </span>
          <span className="font-mono text-xs tracking-widest text-[#B7AA98]/60">
            / 100
          </span>
        </div>
      </div>
    </div>
  );
};
