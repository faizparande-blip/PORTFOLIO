import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, CheckCircle2, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/ui/SectionHeading';
import Badge from '../components/ui/Badge';

export const Education = () => {
  const { education, certifications } = portfolioData;

  return (
    <section id="education" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#07111F]/40 backdrop-blur-xs border-t border-slate-800/80 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeading
          tag="ACADEMICS & CREDENTIALS"
          title="Education & Qualifications"
          subtitle="Academic journey, formal engineering degrees, and professional certifications."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">
          {/* Left Column: Education Timeline Cards with Glassmorphism */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 w-full">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 font-mono">
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>Academic Degrees</span>
            </div>

            <div className="space-y-3.5 sm:space-y-4 w-full">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className={`p-4 sm:p-7 rounded-2xl bg-[#0B1726]/75 backdrop-blur-md border transition-all duration-200 shadow-xl w-full overflow-hidden ${
                    edu.current
                      ? 'border-cyan-500/40 ring-1 ring-cyan-500/20 shadow-cyan-950/30'
                      : 'border-slate-800/80 hover:border-slate-700 hover:bg-[#0E1E33]/85'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-xl font-bold text-white break-words">
                        {edu.degree}
                      </h3>
                      {edu.current && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold font-mono tracking-wider bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow-xs backdrop-blur-xs shrink-0">
                          {edu.statusBadge || 'CURRENTLY PURSUING'}
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] sm:text-xs font-semibold font-mono bg-[#07111F]/80 backdrop-blur-xs text-slate-300 rounded-lg border border-slate-800 shrink-0 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {edu.duration}
                    </span>
                  </div>

                  <div className="text-xs sm:text-base font-semibold text-cyan-400 break-words">
                    {edu.institution}
                  </div>

                  {edu.description && (
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed break-words">
                      {edu.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Certifications with Glassmorphism */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5 w-full">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 font-mono">
              <Award className="w-4 h-4 shrink-0" />
              <span>Certifications & Workshops</span>
            </div>

            <div className="space-y-3 sm:space-y-3.5 w-full">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="p-4 sm:p-5 rounded-2xl bg-[#0B1726]/75 backdrop-blur-md border border-slate-800/80 shadow-xl hover:border-cyan-500/40 hover:bg-[#0E1E33]/85 transition-all flex items-start justify-between gap-3 overflow-hidden w-full"
                >
                  <div className="overflow-hidden">
                    <h4 className="text-xs sm:text-base font-bold text-slate-100 break-words">
                      {cert.name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-1 break-words">
                      {cert.issuer} {cert.date && `• ${cert.date}`}
                    </p>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 shrink-0 p-1 min-h-[36px] min-w-[36px] justify-center"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
