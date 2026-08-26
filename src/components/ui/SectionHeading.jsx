import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeading = ({
  tag = 'SECTION',
  title,
  subtitle,
  centered = false,
  className = ''
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center mx-auto' : ''} ${className}`}>
      {/* Eyebrow tag */}
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35 }}
          className={`inline-flex items-center gap-2 text-xs font-semibold text-blue-600 tracking-wider uppercase mb-2 ${
            centered ? 'justify-center' : ''
          }`}
        >
          <span>{tag}</span>
        </motion.div>
      )}

      {/* Main heading */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
      >
        {title}
      </motion.h2>

      {/* Subtitle description */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
