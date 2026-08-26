import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import Button from '../components/ui/Button';

export const ResumeCTA = () => {
  const { social } = portfolioData;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative z-10 w-full overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0B1726]/85 via-[#0E1F35]/80 to-[#10243E]/85 backdrop-blur-xl border border-slate-800/80 text-white p-6 sm:p-10 md:p-14 shadow-2xl overflow-hidden w-full hover:border-cyan-500/30 transition-colors"
        >
          {/* Subtle cyan ambient depth */}
          <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left w-full">
            <div className="max-w-xl w-full">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-1.5 sm:mb-2 inline-block font-mono">
                CURRICULUM VITAE
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2.5 sm:mb-3 break-words">
                Let's build something great together.
              </h2>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                Looking for a detailed breakdown of my engineering background, technical experience, and completed projects?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <Button
                href={social.resume}
                variant="primary"
                size="lg"
                icon={<FileText className="w-4 h-4 text-slate-950" />}
                className="w-full sm:w-auto min-h-[44px] justify-center shadow-lg shadow-cyan-500/20"
                isExternal
              >
                View Resume
              </Button>
              <Button
                href={social.resume}
                download="Muhammad_Faiz_Parande_Resume.pdf"
                variant="secondary"
                size="lg"
                icon={<Download className="w-4 h-4 text-cyan-400" />}
                className="w-full sm:w-auto min-h-[44px] justify-center"
              >
                Download PDF
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeCTA;
