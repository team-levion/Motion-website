import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenInquiry: () => void;
  isLightSection?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenInquiry, isLightSection = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'PROJECTS', id: 'projects' },
    { label: 'STUDIO', id: 'studio' },
    { label: 'SERVICES', id: 'services' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  // Determine color scheme based on section background
  const textColor = isLightSection ? 'text-[#0B0B0B]' : 'text-[#F1EFE9]';
  const mutedTextColor = isLightSection ? 'text-[#0B0B0B]/70 hover:text-[#0B0B0B]' : 'text-[#F1EFE9]/70 hover:text-[#F1EFE9]';
  const navBg = isScrolled
    ? isLightSection
      ? 'bg-[#F1EFE9]/85 border-b border-[#0B0B0B]/10 backdrop-blur-md shadow-xs'
      : 'bg-[#0B0B0B]/85 border-b border-white/5 backdrop-blur-md shadow-xs'
    : 'bg-transparent';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-colors duration-500 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
          {/* Brand Wordmark (Zone 1) */}
          <button
            onClick={() => handleNavClick('hero')}
            className={`font-display text-lg md:text-xl font-light tracking-[0.28em] uppercase transition-all duration-300 focus-visible:outline-none cursor-pointer hover:opacity-80 ${textColor}`}
          >
            FORMA
          </button>

          {/* Desktop Navigation Links (Zone 2) */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 relative group py-1 cursor-pointer hover:-translate-y-0.5 ${mutedTextColor}`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                    isLightSection ? 'bg-[#0B0B0B]' : 'bg-[#F1EFE9]'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* CTA & Mobile Trigger (Zone 3) */}
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenInquiry}
              className={`hidden sm:inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase transition-all duration-300 px-4 py-2 border cursor-pointer group ${
                isLightSection
                  ? 'border-[#0B0B0B] text-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#F1EFE9]'
                  : 'border-[#F1EFE9]/40 text-[#F1EFE9] hover:border-[#F1EFE9] hover:bg-[#F1EFE9] hover:text-[#0B0B0B]'
              }`}
            >
              <span className="transform group-hover:translate-x-0.5 transition-transform duration-200">INQUIRE</span>
              <span className="text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className={`md:hidden p-2 transition-colors cursor-pointer ${textColor}`}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0B] text-[#F1EFE9] flex flex-col justify-between p-8 md:hidden animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl tracking-[0.28em] text-[#F1EFE9]">
              FORMA
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 text-[#F1EFE9]/80 hover:text-white cursor-pointer"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left font-display text-3xl font-light tracking-[0.15em] text-[#F1EFE9] hover:text-[#B7AA98] transition-colors py-2 flex items-center justify-between border-b border-white/10 cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-[#B7AA98]">0{idx + 1}</span>
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3.5 border border-[#F1EFE9] text-[#F1EFE9] font-mono text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              START A PROJECT ↗
            </button>
            <div className="flex items-center justify-between text-xs text-[#B7AA98] font-mono">
              <span>Levion Portfolio Project</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

