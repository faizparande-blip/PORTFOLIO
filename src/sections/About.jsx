import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Layout, Sparkles, CheckCircle2, FolderGit2, Calendar, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/ui/SectionHeading';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import getIcon from '../utils/iconMap';

export const About = () => {
  const { about } = portfolioData;

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const stats = [
    { label: 'Projects Completed', value: 10, suffix: '+', icon: <FolderGit2 className="w-4 h-4 text-cyan-400" /> },
    { label: 'Internships & Roles', value: 2, suffix: '+', icon: <Calendar className="w-4 h-4 text-blue-400" /> },
    { label: 'Core Technologies', value: 15, suffix: '+', icon: <Cpu className="w-4 h-4 text-emerald-400" /> }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#07111F]/40 backdrop-blur-xs border-y border-slate-800/80 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeading
          tag="ABOUT ME"
          title={about.heading}
          subtitle="A blend of engineering rigor, data-driven reasoning, and scalable problem-solving focus."
        />

        {/* Animated Metrics / Stats Counter Row with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-10 sm:mb-14 w-full"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-[#0B1726]/75 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/40 shadow-xl hover:shadow-cyan-950/30 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#07111F]/80 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                {stat.icon}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start w-full">
          {/* Left Column: Human narrative */}
          <div className="lg:col-span-6 space-y-5 w-full">
            <div className="space-y-4 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
              {about.intro.map((p, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Core Values with Glassmorphism */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <div className="p-4 rounded-xl bg-[#0B1726]/75 backdrop-blur-md border border-slate-800/80 shadow-md hover:border-cyan-500/30 transition-all">
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1 font-mono">
                  Code Philosophy
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  Clean, Modular & Scalable
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1726]/75 backdrop-blur-md border border-slate-800/80 shadow-md hover:border-blue-500/30 transition-all">
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1 font-mono">
                  Data Mindset
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  Analytical & Actionable
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Frosted Glass Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full">
            {about.cards.map((card, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                className="group p-4 sm:p-5 rounded-2xl bg-[#0B1726]/75 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/40 hover:bg-[#0E1E33]/85 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-200"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform shrink-0"
                >
                  {getIcon(card.icon, { className: 'w-4 h-4 sm:w-5 sm:h-5' })}
                </motion.div>
                <h3 className="text-sm sm:text-base font-bold text-slate-100 mb-1 group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
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
