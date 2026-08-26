import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/ui/SectionHeading';
import Badge from '../components/ui/Badge';

export const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="CAREER"
          title="Work Experience"
          subtitle="My practical engineering experience and developer internships."
        />

        {/* Timeline Container */}
        <div className="relative border-l border-slate-200 ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-10">
          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Indicator Node */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 transition-transform group-hover:scale-125 ${
                  item.current ? 'border-blue-600 ring-4 ring-blue-500/20' : 'border-slate-400'
                }`}
              />

              {/* Experience Card */}
              <div
                className={`p-6 sm:p-7 rounded-2xl bg-white border transition-all duration-200 shadow-xs hover:shadow-md ${
                  item.current
                    ? 'border-blue-300 ring-2 ring-blue-500/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        {item.role}
                      </h3>
                      {item.current && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                          {item.statusBadge || 'CURRENT'}
                        </span>
                      )}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-blue-600 mt-0.5">
                      {item.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold font-mono bg-slate-100 text-slate-700 rounded-lg border border-slate-200/80 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.duration}
                    </span>
                    {item.location && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md border border-slate-200/80 shrink-0">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Summary Description */}
                {item.description && (
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}

                {/* Responsibilities bullets */}
                {item.responsibilities && item.responsibilities.length > 0 && (
                  <div className="space-y-1.5 mb-5">
                    {item.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                        <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech stack used in this role */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="pt-3.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-400 mr-1.5 uppercase">
                      Stack:
                    </span>
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs font-medium bg-slate-50 text-slate-700 rounded border border-slate-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
