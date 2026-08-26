import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import Button from '../components/ui/Button';

export const ResumeCTA = () => {
  const { social } = portfolioData;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 sm:p-12 md:p-14 shadow-xl overflow-hidden"
        >
          {/* Subtle light accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <span className="text-xs font-semibold text-blue-200 tracking-wider uppercase mb-2 inline-block">
                CURRICULUM VITAE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                Let's build something great together.
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Looking for a detailed breakdown of my engineering background, technical experience, and completed projects?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto shrink-0">
              <Button
                href={social.resume}
                variant="secondary"
                size="lg"
                icon={<FileText className="w-4 h-4 text-blue-600" />}
                className="w-full sm:w-auto bg-white text-slate-900 hover:bg-blue-50 border-0 shadow-md"
                isExternal
              >
                View Resume
              </Button>
              <Button
                href={social.resume}
                variant="outline"
                size="lg"
                icon={<Download className="w-4 h-4 text-white" />}
                className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10"
                download
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
