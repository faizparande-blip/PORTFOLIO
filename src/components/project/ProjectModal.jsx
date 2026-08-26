import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Layers,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Zap,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Github } from '../ui/Icons';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl z-10 text-slate-900"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 p-6 sm:p-8 flex items-start justify-between z-20">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                <span>PROJECT CASE STUDY</span>
                <span>•</span>
                <span>#{project.number}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-500 mt-1">
                {project.tagline}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Tech Stack Chips */}
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg border border-blue-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview / Description */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 leading-relaxed text-sm sm:text-base">
              {project.description}
            </div>

            {/* Case Study Sections */}
            {caseStudy && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Problem */}
                {caseStudy.problem && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm mb-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      The Problem
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {caseStudy.problem}
                    </p>
                  </div>
                )}

                {/* Solution */}
                {caseStudy.solution && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      The Solution
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Architecture Details */}
            {caseStudy?.architecture && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm mb-2">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  Technical Architecture
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {caseStudy.architecture}
                </p>
              </div>
            )}

            {/* Key Features */}
            {caseStudy?.features && caseStudy.features.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Core Features & Capabilities
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {caseStudy.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges & Outcome */}
            {caseStudy && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.challenges && caseStudy.challenges.length > 0 && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm mb-2">
                      <Flame className="w-4 h-4 text-amber-600" />
                      Technical Challenges
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {caseStudy.challenges.map((ch, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {caseStudy.outcome && (
                  <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-900 font-semibold text-sm mb-2">
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                      Outcome & Results
                    </div>
                    <p className="text-sm text-blue-950 leading-relaxed">
                      {caseStudy.outcome}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Links CTA Bar */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.live && (
                  <Button
                    href={project.live}
                    variant="primary"
                    size="md"
                    icon={<ExternalLink className="w-4 h-4" />}
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
                    icon={<Github className="w-4 h-4" />}
                    isExternal
                  >
                    View Source Code
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                size="md"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
