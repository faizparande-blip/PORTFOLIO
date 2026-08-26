import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Layout, Sparkles, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/ui/SectionHeading';
import getIcon from '../utils/iconMap';

export const About = () => {
  const { about } = portfolioData;

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-50/60 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="ABOUT ME"
          title={about.heading}
          subtitle="A blend of engineering rigor, design sensibility, and problem-solving focus."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Human narrative */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {about.intro.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Core Values */}
            <div className="pt-4 grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                  Code Philosophy
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  Clean, Modular & Maintainable
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                  Product Mindset
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  User-Centric & Pragmatic
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {about.cards.map((card, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3.5 group-hover:scale-105 transition-transform">
                  {getIcon(card.icon, { className: 'w-5 h-5' })}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
