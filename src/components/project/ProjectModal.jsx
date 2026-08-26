import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Layers,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Github } from '../ui/Icons';
import Button from '../ui/Button';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto w-full">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0B1726] border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl z-10 text-slate-100"
        >
          {/* Header with Sticky Close Button */}
          <div className="sticky top-0 bg-[#0B1726]/95 backdrop-blur-md border-b border-slate-800 p-4 sm:p-6 md:p-8 flex items-start justify-between gap-4 z-20">
            <div className="overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 font-mono">
                <span>CASE STUDY</span>
                <span>•</span>
                <span>#{project.number}</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight break-words">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-400 mt-1 line-clamp-2">
                {project.tagline}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-xl bg-[#07111F] text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 w-full">
            {/* Tech Stack Chips */}
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 font-mono">
                  Technologies & Stack
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 sm:px-3 py-1 text-xs font-medium bg-cyan-950/40 text-cyan-300 rounded-lg border border-cyan-500/30 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview / Description */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#07111F] border border-slate-800 text-slate-300 leading-relaxed text-sm sm:text-base break-words">
              {project.description}
            </div>

            {/* Case Study Sections */}
            {caseStudy && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Problem */}
                {caseStudy.problem && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#07111F] border border-slate-800">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>The Problem</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                      {caseStudy.problem}
                    </p>
                  </div>
                )}

                {/* Solution */}
                {caseStudy.solution && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#07111F] border border-slate-800">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>The Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                      {caseStudy.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Architecture Details */}
            {caseStudy?.architecture && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#07111F] border border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
                  <Cpu className="w-4 h-4 shrink-0" />
                  <span>Technical Architecture</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                  {caseStudy.architecture}
                </p>
              </div>
            )}

            {/* Key Features */}
            {caseStudy?.features && caseStudy.features.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 font-mono">
                  Core Features
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {caseStudy.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-xl bg-[#07111F] border border-slate-800 shadow-xs flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="break-words">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges & Outcome */}
            {caseStudy && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {caseStudy.challenges && caseStudy.challenges.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#07111F] border border-slate-800">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                      <Flame className="w-4 h-4 shrink-0" />
                      <span>Technical Challenges</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {caseStudy.challenges.map((ch, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span className="break-words">{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {caseStudy.outcome && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
                    <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm mb-2">
                      <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Outcome & Results</span>
                    </div>
                    <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed break-words">
                      {caseStudy.outcome}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Links CTA Bar */}
            <div className="pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {project.live && (
                  <Button
                    href={project.live}
                    variant="primary"
                    size="md"
                    className="min-h-[44px] justify-center"
                    icon={<ExternalLink className="w-4 h-4 text-slate-950" />}
                    isExternal
                  >
                    Launch Live Demo
                  </Button>
                )}
                {project.github && (
                  <Button
                    href={project.github}
                    variant="secondary"
                    size="md"
                    className="min-h-[44px] justify-center"
                    icon={<Github className="w-4 h-4 text-cyan-400" />}
                    isExternal
                  >
                    View Source Code
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                size="md"
                className="min-h-[44px] justify-center"
                onClick={onClose}
              >
                Close Case Study
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
