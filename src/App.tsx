import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CursorProvider } from './context/CursorContext';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { FeaturedProjectExpansion } from './components/FeaturedProjectExpansion';
import { SelectedProjectsHorizontal } from './components/SelectedProjectsHorizontal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ServicesSection } from './components/ServicesSection';
import { ArchitecturalDrawingSection } from './components/ArchitecturalDrawingSection';
import { NumbersAndStudioSection } from './components/NumbersAndStudioSection';
import { ImageMarquee } from './components/ImageMarquee';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { PROJECTS } from './data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Refresh ScrollTrigger after web fonts load and preloader completes
  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
  }, []);

  useEffect(() => {
    if (loadingComplete) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [loadingComplete]);

  // Monitor scroll to detect ivory philosophy section for adaptive navbar
  useEffect(() => {
    const handleScroll = () => {
      const philosophyEl = document.getElementById('philosophy');
      if (philosophyEl) {
        const rect = philosophyEl.getBoundingClientRect();
        // Check if top navbar (at y=40px) overlaps philosophy section
        setIsLightSection(rect.top <= 60 && rect.bottom >= 60);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId) || null;

  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#0B0B0B] text-[#F1EFE9] selection:bg-[#B7AA98] selection:text-[#0B0B0B]">
        {/* Cinematic Opening Preloader */}
        {!loadingComplete && (
          <Preloader onComplete={() => setLoadingComplete(true)} />
        )}

        {/* Minimal Floating Top Navigation Bar */}
        <Navbar
          onNavigate={handleNavigate}
          onOpenInquiry={() => setInquiryOpen(true)}
          isLightSection={isLightSection}
        />

        {/* Main Architectural Sections */}
        <main className="w-full relative">
          {/* 01: Hero — Cinematic Introduction */}
          <HeroSection onScrollClick={() => handleNavigate('philosophy')} />

          {/* 02: Philosophy Transition — Ivory Mask Reveal */}
          <PhilosophySection />

          {/* 03: Featured Project — Smooth Scroll Expansion */}
          <FeaturedProjectExpansion
            onSelectProject={(id) => setSelectedProjectId(id)}
          />

          {/* 04: Selected Projects — Horizontal Scroll Experience */}
          <SelectedProjectsHorizontal
            onSelectProject={(id) => setSelectedProjectId(id)}
          />

          {/* 05: Before / After Interaction — Draggable Spatial Comparison */}
          <BeforeAfterSlider />

          {/* 06: Services — Interactive Fullscreen Typography */}
          <ServicesSection />

          {/* 07: Architectural Drawing Experience — From Line to Life */}
          <ArchitecturalDrawingSection />

          {/* 08: Numbers / Studio Section — Quantitative Discipline & Manifesto */}
          <NumbersAndStudioSection />

          {/* 09: Image Marquee — Architectural Anthology */}
          <ImageMarquee />

          {/* 10: Contact / Final Experience */}
          <ContactSection onOpenInquiry={() => setInquiryOpen(true)} />
        </main>

        {/* Minimalist Footer with Levion Credit */}
        <Footer onNavigate={handleNavigate} />

        {/* Fullscreen Seamless Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProjectId(null)}
          onSelectProject={(id) => setSelectedProjectId(id)}
        />

        {/* Project Commission Inquiry Modal */}
        <ProjectInquiryModal
          isOpen={inquiryOpen}
          onClose={() => setInquiryOpen(false)}
        />
      </div>
    </CursorProvider>
  );
}
