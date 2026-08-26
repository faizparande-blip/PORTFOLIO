import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, CheckCircle2, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/ui/SectionHeading';
import Badge from '../components/ui/Badge';

export const Education = () => {
  const { education, certifications } = portfolioData;

  return (
    <section id="education" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-50/60 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="ACADEMICS & CREDENTIALS"
          title="Education & Qualifications"
          subtitle="Academic journey and professional certifications."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Education Timeline Cards */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 font-mono">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Degrees</span>
            </div>

            <div className="space-y-4">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className={`p-6 sm:p-7 rounded-2xl bg-white border transition-all duration-200 shadow-xs hover:shadow-md ${
                    edu.current
                      ? 'border-blue-300 ring-2 ring-blue-500/10'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        {edu.degree}
                      </h3>
                      {edu.current && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                          {edu.statusBadge || 'CURRENTLY PURSUING'}
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold font-mono bg-slate-100 text-slate-700 rounded-lg border border-slate-200 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {edu.duration}
                    </span>
                  </div>

                  <div className="text-sm sm:text-base font-semibold text-blue-600">
                    {edu.institution}
                  </div>

                  {edu.description && (
                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Certifications */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 font-mono">
              <Award className="w-4 h-4" />
              <span>Certifications & Workshops</span>
            </div>

            <div className="space-y-3.5">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-4"
                >
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {cert.issuer} {cert.date && `• ${cert.date}`}
                    </p>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
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
