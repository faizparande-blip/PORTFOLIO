import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/ui/SectionHeading';
import Badge from '../components/ui/Badge';

export const Experience = () => {
  const { experience } = portfolioData;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" ref={containerRef} className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative z-10 w-full overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <SectionHeading
          tag="CAREER"
          title="Work Experience"
          subtitle="My practical engineering experience, developer internships, and data solutions."
        />

        {/* Timeline Container with Dynamic Animated Drawing Line */}
        <div className="relative border-l border-slate-800 ml-2.5 sm:ml-6 pl-4 sm:pl-8 space-y-6 sm:space-y-10 w-full">
          {/* Animated Cyan Progress Stroke */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 to-blue-500 shadow-xs shadow-cyan-400/50"
          />

          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative group w-full"
            >
              {/* Timeline Indicator Node with Cyan Glow */}
              <motion.div
                initial={{ scale: 0.7 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.12 }}
                className={`absolute -left-[23px] sm:-left-[39px] top-2 w-3.5 h-3.5 rounded-full bg-[#050B14] border-2 transition-transform group-hover:scale-125 ${
                  item.current
                    ? 'border-cyan-400 ring-4 ring-cyan-500/30 shadow-xs shadow-cyan-400'
                    : 'border-slate-500 group-hover:border-cyan-400'
                }`}
              />

              {/* Experience Frosted Glass Card */}
              <div
                className={`p-4 sm:p-7 rounded-2xl bg-[#0B1726]/75 backdrop-blur-md border transition-all duration-300 shadow-xl w-full overflow-hidden hover:-translate-y-1 ${
                  item.current
                    ? 'border-cyan-500/40 ring-1 ring-cyan-500/20 shadow-cyan-950/40'
                    : 'border-slate-800/80 hover:border-cyan-500/40 hover:bg-[#0E1E33]/85'
                }`}
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 w-full">
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-xl font-bold text-white break-words">
                        {item.role}
                      </h3>
                      {item.current && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold font-mono tracking-wider bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow-xs backdrop-blur-xs shrink-0">
                          {item.statusBadge || 'CURRENT'}
                        </span>
                      )}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-cyan-400 mt-0.5 break-words">
                      {item.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] sm:text-xs font-semibold font-mono bg-[#07111F]/80 backdrop-blur-xs text-slate-300 rounded-lg border border-slate-800 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {item.duration}
                    </span>
                    {item.location && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-xs font-medium bg-[#07111F]/80 backdrop-blur-xs text-slate-400 rounded-md border border-slate-800 shrink-0">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Summary Description */}
                {item.description && (
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3.5 break-words">
                    {item.description}
                  </p>
                )}

                {/* Responsibilities bullets */}
                {item.responsibilities && item.responsibilities.length > 0 && (
                  <div className="space-y-1.5 mb-4">
                    {item.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="break-words">{resp}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech stack used in this role */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1 sm:gap-1.5">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-500 mr-1 uppercase font-mono">
                      Stack:
                    </span>
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] sm:text-xs font-medium bg-[#07111F]/80 text-slate-300 rounded border border-slate-800"
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
