import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/ui/SectionHeading';
import getIcon from '../utils/iconMap';

export const Skills = () => {
  const { skills } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSkills = selectedCategory === 'all'
    ? skills.items
    : skills.items.filter((item) => item.category === selectedCategory);

  return (
    <section id="skills" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5">
          <SectionHeading
            tag="SKILLS & TOOLS"
            title="Technologies I Work With"
            subtitle="My primary stack for engineering scalable applications, machine learning workflows, and data pipelines."
            className="mb-0"
          />

          {/* Filter Pills with Glassmorphism */}
          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-[#0B1726]/80 backdrop-blur-md border border-slate-800/90 w-full md:w-auto shrink-0 shadow-lg">
            {skills.categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer min-h-[36px] flex items-center justify-center ${
                    isSelected ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 bg-cyan-950/70 rounded-lg border border-cyan-500/40 shadow-xs shadow-cyan-400/20 backdrop-blur-xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid with Frosted Glass Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3.5 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, delay: (idx % 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className="group p-3.5 sm:p-4 rounded-xl bg-[#0B1726]/75 backdrop-blur-md hover:bg-[#0E1E33]/90 border border-slate-800/80 hover:border-cyan-500/50 shadow-md hover:shadow-xl hover:shadow-cyan-950/30 transition-all duration-200 flex items-center gap-3 overflow-hidden"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (idx % 8) * 0.05 + 0.1 }}
                  className="w-8 h-8 rounded-lg bg-[#07111F]/90 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/40 group-hover:scale-110 transition-all shrink-0 shadow-xs"
                >
                  {getIcon(skill.icon, { className: 'w-4 h-4' })}
                </motion.div>
                <div className="overflow-hidden">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 capitalize block truncate font-mono">
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
