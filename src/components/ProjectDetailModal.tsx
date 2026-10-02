import React, { useEffect, useRef } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/projects';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (id: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    // Prevent body scroll when modal is active
    document.body.style.overflow = 'hidden';

    // Keyboard navigation (Escape to close)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // GSAP expansion animation from center into viewport
    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
      );
      gsap.fromTo(
        heroImageRef.current,
        { scale: 1.15 },
        { scale: 1.0, duration: 1.2, ease: 'power2.out' }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' }
      );
    });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      ctx.revert();
    };
  }, [project, onClose]);

  if (!project) return null;

  // Find next & prev projects
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 bg-[#0B0B0B] text-[#F1EFE9] overflow-y-auto overscroll-contain select-none"
    >
      {/* Top Floating Bar */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex items-center justify-between pointer-events-none bg-gradient-to-b from-[#0B0B0B]/80 to-transparent backdrop-blur-xs">
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-[#B7AA98] uppercase">
          <span>{project.number}</span>
          <span>·</span>
          <span>{project.category}</span>
        </div>

        <button
          onClick={onClose}
          className="pointer-events-auto flex items-center gap-2 font-mono text-xs tracking-widest text-[#F1EFE9] hover:text-[#B7AA98] uppercase px-4 py-2 bg-black/60 border border-white/10 rounded-full transition-colors cursor-pointer"
        >
          <span>CLOSE</span>
          <X size={14} />
        </button>
      </header>

      {/* Hero Fullscreen Section */}
      <div className="relative w-full h-[90vh] md:h-screen overflow-hidden flex items-end">
        <img
          ref={heroImageRef}
          src={project.mainImage}
          alt={project.title}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.8] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24 w-full">
          <span className="font-mono text-xs md:text-sm text-[#B7AA98] tracking-[0.3em] uppercase block mb-3">
            {project.number} — {project.location} · {project.year}
          </span>
          <h1 className="font-display text-4xl md:text-8xl font-light tracking-tight text-[#F1EFE9] uppercase max-w-5xl leading-[0.92]">
            {project.title}
          </h1>
          <p className="font-body text-base md:text-xl text-[#B7AA98] mt-4 max-w-2xl font-light">
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* Project Body & Story Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Architectural Specifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/10 font-mono text-xs text-[#B7AA98]">
          <div>
            <span className="text-[#B7AA98]/60 uppercase tracking-widest block mb-1">
              LOCATION
            </span>
            <span className="text-[#F1EFE9] text-sm">{project.location}</span>
          </div>
          <div>
            <span className="text-[#B7AA98]/60 uppercase tracking-widest block mb-1">
              TOTAL AREA
            </span>
            <span className="text-[#F1EFE9] text-sm">{project.area}</span>
          </div>
          <div>
            <span className="text-[#B7AA98]/60 uppercase tracking-widest block mb-1">
              LEAD ARCHITECT
            </span>
            <span className="text-[#F1EFE9] text-sm">{project.specs.architect}</span>
          </div>
          <div>
            <span className="text-[#B7AA98]/60 uppercase tracking-widest block mb-1">
              TIMELINE
            </span>
            <span className="text-[#F1EFE9] text-sm">{project.specs.timeline}</span>
          </div>
        </div>

        {/* Narrative & Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 my-20">
          <div className="md:col-span-4">
            <span className="font-mono text-xs tracking-[0.25em] text-[#B7AA98] uppercase block mb-2">
              DESIGN NARRATIVE
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-light text-[#F1EFE9] uppercase leading-tight">
              A Study in Acoustic Silence & Daylight
            </h3>
          </div>

          <div className="md:col-span-8 flex flex-col gap-6 text-[#F1EFE9]/85 font-body text-base md:text-lg leading-relaxed font-light">
            <p className="text-xl text-[#F1EFE9]">
              {project.description}
            </p>
            {project.story.map((paragraph, i) => (
              <p key={i} className="text-[#B7AA98]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Full-Width Visual Anchor */}
        <div className="my-16 overflow-hidden rounded-xs border border-white/5">
          <img
            src={project.secondaryImage}
            alt={`${project.title} architectural perspective`}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="w-full h-[65vh] object-cover object-center brightness-[0.9]"
          />
          <div className="p-4 bg-[#111111] flex items-center justify-between font-mono text-[11px] text-[#B7AA98] tracking-widest uppercase">
            <span>FIG. 02 — SHADOW & MATERIAL INTERFACE</span>
            <span>{project.location}</span>
          </div>
        </div>

        {/* Image Pair Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          <div className="flex flex-col gap-3">
            <div className="overflow-hidden aspect-[4/3] bg-[#141414] rounded-xs border border-white/5">
              <img
                src={project.detailImage}
                alt={`${project.title} detail view`}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover brightness-[0.88] hover:scale-103 transition-transform duration-700"
              />
            </div>
            <span className="font-mono text-[11px] text-[#B7AA98] tracking-widest uppercase">
              FIG. 03 — TACTILE INTERIOR JOINERY
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="overflow-hidden aspect-[4/3] bg-[#141414] rounded-xs border border-white/5">
              <img
                src={project.mainImage}
                alt={`${project.title} dusk lighting`}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover brightness-[0.88] hover:scale-103 transition-transform duration-700"
              />
            </div>
            <span className="font-mono text-[11px] text-[#B7AA98] tracking-widest uppercase">
              FIG. 04 — EXTERIOR FACADE AT SUNSET
            </span>
          </div>
        </div>

        {/* Material Specification Highlights */}
        <div className="my-16 p-8 md:p-12 bg-[#141414] border border-white/5 rounded-xs">
          <span className="font-mono text-xs tracking-[0.25em] text-[#B7AA98] uppercase block mb-6">
            MATERIAL CURATION
          </span>
          <div className="flex flex-wrap gap-4">
            {project.specs.materials.map((mat, i) => (
              <span
                key={i}
                className="font-mono text-xs tracking-wider uppercase px-4 py-2 border border-white/10 text-[#F1EFE9]"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Project Navigation */}
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <button
            onClick={() => onSelectProject(prevProject.id)}
            className="flex items-center gap-4 text-left group cursor-pointer"
          >
            <ArrowLeft className="text-[#B7AA98] group-hover:-translate-x-1.5 transition-transform duration-300" />
            <div>
              <span className="font-mono text-[10px] text-[#B7AA98] tracking-widest uppercase block">
                PREVIOUS PROJECT
              </span>
              <span className="font-display text-lg uppercase text-[#F1EFE9] group-hover:text-[#B7AA98] transform group-hover:translate-x-1 transition-all duration-300 inline-block">
                {prevProject.title}
              </span>
            </div>
          </button>

          <button
            onClick={onClose}
            className="font-mono text-xs tracking-[0.25em] uppercase text-[#B7AA98] hover:text-[#F1EFE9] py-2 border-b border-white/20 cursor-pointer hover:border-white transition-all duration-200"
          >
            BACK TO ARCHIVE
          </button>

          <button
            onClick={() => onSelectProject(nextProject.id)}
            className="flex items-center gap-4 text-right group cursor-pointer"
          >
            <div>
              <span className="font-mono text-[10px] text-[#B7AA98] tracking-widest uppercase block">
                NEXT PROJECT
              </span>
              <span className="font-display text-lg uppercase text-[#F1EFE9] group-hover:text-[#B7AA98] transform group-hover:-translate-x-1 transition-all duration-300 inline-block">
                {nextProject.title}
              </span>
            </div>
            <ArrowRight className="text-[#B7AA98] group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
