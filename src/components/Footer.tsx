import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#070707] text-[#F1EFE9] border-t border-white/5 py-16 md:py-20 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-16">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-light tracking-[0.25em] uppercase text-[#F1EFE9]">
              FORMA
            </h2>
            <p className="font-mono text-xs text-[#B7AA98] tracking-[0.25em] uppercase mt-2">
              Architecture / Interiors
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 md:gap-12 font-mono text-xs tracking-[0.2em] text-[#B7AA98] uppercase">
            <button
              onClick={() => onNavigate('projects')}
              className="hover:text-[#F1EFE9] transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            >
              PROJECTS
            </button>
            <button
              onClick={() => onNavigate('studio')}
              className="hover:text-[#F1EFE9] transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            >
              STUDIO
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-[#F1EFE9] transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            >
              SERVICES
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-[#F1EFE9] transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            >
              CONTACT
            </button>
          </div>
        </div>

        {/* Bottom Levion Attribution */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between font-mono text-xs text-[#B7AA98]/70 gap-4">
          <p className="text-xs text-[#F1EFE9]/90 tracking-wider">
            FORMA — A concept experience designed &amp; developed by{' '}
            <span className="text-[#F1EFE9] font-medium underline underline-offset-4 decoration-[#B7AA98] hover:text-[#B7AA98] transition-colors cursor-pointer">
              Levion
            </span>
            .
          </p>

          <div className="flex items-center gap-4 text-[11px] tabular-nums tracking-widest uppercase">
            <span>ALL RIGHTS RESERVED</span>
            <span>·</span>
            <span>© 2026 FORMA ATELIER</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

