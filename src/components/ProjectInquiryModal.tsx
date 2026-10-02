import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    typology: 'Residential',
    budget: '$1M – $3M',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds or user can close immediately
    }, 3000);
  };

  const typologies = ['Residential', 'Commercial', 'Interior Architecture', 'Cultural Pavilion'];
  const budgets = ['< $500K', '$500K – $1.5M', '$1.5M – $5M', '$5M+'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#0F0F0F] border border-white/15 p-8 md:p-12 text-[#F1EFE9] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#B7AA98] hover:text-white p-2 cursor-pointer transition-colors"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-[#B7AA98] flex items-center justify-center text-[#B7AA98] mb-6">
              <Check size={28} />
            </div>
            <h3 className="font-display text-3xl font-light tracking-wide uppercase mb-3">
              INQUIRY RECORDED
            </h3>
            <p className="font-body text-sm text-[#B7AA98] max-w-md leading-relaxed">
              Thank you for initiating dialogue with FORMA. Elias Lindqvist and the partner studio will review your site brief within 48 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-8 font-mono text-xs tracking-widest uppercase border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-colors"
            >
              CLOSE WINDOW
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs text-[#B7AA98] tracking-[0.3em] uppercase block mb-2">
                COMMISSION DIALOGUE
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-light tracking-tight uppercase">
                START A PROJECT
              </h3>
              <p className="font-body text-xs text-[#B7AA98]/70 mt-1">
                Share your architectural vision or space inquiry.
              </p>
            </div>

            {/* Typology Selector */}
            <div>
              <label className="font-mono text-xs text-[#B7AA98] tracking-widest uppercase block mb-2">
                PROJECT TYPOLOGY
              </label>
              <div className="grid grid-cols-2 gap-2">
                {typologies.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setFormData({ ...formData, typology: t })}
                    className={`font-mono text-xs px-3 py-2 text-left border transition-colors ${
                      formData.typology === t
                        ? 'border-[#F1EFE9] bg-white/10 text-white'
                        : 'border-white/10 text-[#B7AA98] hover:border-white/30'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs text-[#B7AA98] tracking-widest uppercase block mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Vane"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#181818] border border-white/10 px-4 py-2.5 text-sm text-[#F1EFE9] focus:outline-none focus:border-[#B7AA98]"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-[#B7AA98] tracking-widest uppercase block mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="julian@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#181818] border border-white/10 px-4 py-2.5 text-sm text-[#F1EFE9] focus:outline-none focus:border-[#B7AA98]"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-[#B7AA98] tracking-widest uppercase block mb-1">
                PROJECT LOCATION / SITE COORDINATES
              </label>
              <input
                type="text"
                placeholder="e.g. Zurich, Switzerland or Kozhikode Coast"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 px-4 py-2.5 text-sm text-[#F1EFE9] focus:outline-none focus:border-[#B7AA98]"
              />
            </div>

            {/* Budget Range */}
            <div>
              <label className="font-mono text-xs text-[#B7AA98] tracking-widest uppercase block mb-2">
                ESTIMATED CAPITAL BUDGET
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {budgets.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setFormData({ ...formData, budget: b })}
                    className={`font-mono text-[11px] px-2 py-2 text-center border transition-colors ${
                      formData.budget === b
                        ? 'border-[#F1EFE9] bg-white/10 text-white'
                        : 'border-white/10 text-[#B7AA98] hover:border-white/30'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-[#B7AA98] tracking-widest uppercase block mb-1">
                BRIEF NARRATIVE / SCOPE
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about the space, existing site conditions, or timeline..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 px-4 py-2.5 text-sm text-[#F1EFE9] focus:outline-none focus:border-[#B7AA98] resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-4 bg-[#F1EFE9] text-[#0B0B0B] font-mono text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#B7AA98] transition-colors"
            >
              TRANSMIT PROJECT BRIEF ↗
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
