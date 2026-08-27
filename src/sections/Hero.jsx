import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  ArrowRight,
  ArrowDown
} from 'lucide-react';
import { Github, Linkedin } from '../components/ui/Icons';
import { portfolioData } from '../data/portfolio';
import Button from '../components/ui/Button';
import profileImage from '../assets/images/Faizportfoliophoto.webp';

export const Hero = ({ isLoaded = true }) => {
  const { personal, social } = portfolioData;

  const roles = [
    "DATA SCIENTIST",
    "FULL-STACK DEVELOPER",
    "DATA ANALYST",
    "COMPUTER SCIENCE ENGINEER"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Rotating role cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    personal.email
  )}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] sm:min-h-screen flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden w-full"
    >
      {/* Top glowing horizon scanline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10 my-auto">
        
        {/* Left Column: Hero Narrative, Staggered Reveal, Rotating Role, CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="lg:col-span-7 flex flex-col items-start w-full"
        >
          {/* Eyebrow & Status Badge */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 inline-block animate-pulse shadow-xs shadow-cyan-400" />
              <span>Available for Engineering & Analytics</span>
            </span>
          </motion.div>

          {/* Monogram Tag */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-400 tracking-widest uppercase mb-1.5 sm:mb-2 font-mono"
          >
            <span className="w-5 h-px bg-cyan-400" />
            <span>HELLO, I'M</span>
          </motion.div>

          {/* Big Bold Name */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-2 sm:mb-3 leading-[1.1] break-words"
          >
            {personal.name}
          </motion.h1>

          {/* Dynamic Rotating Role Badge */}
          <motion.div
            variants={itemVariants}
            className="h-9 sm:h-11 flex items-center mb-4 sm:mb-5 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono text-xs sm:text-sm font-bold tracking-wider shadow-xs shadow-cyan-500/20"
              >
                <span className="text-cyan-400 font-mono">&gt;</span>
                <span>{roles[currentRoleIndex]}</span>
                <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 animate-pulse" />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Professional Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-6 sm:mb-8"
          >
            {personal.tagline}{' '}
            <span className="text-slate-400 hidden sm:inline">{personal.shortBio}</span>
          </motion.p>

          {/* Single Primary CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex items-center mb-8 sm:mb-10 w-full sm:w-auto"
          >
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-h-[46px] justify-center shadow-lg shadow-cyan-500/25 px-8"
              iconRight
              icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
            >
              View My Work
            </Button>
          </motion.div>

          {/* Connect Links Bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-2 sm:gap-3 pt-5 sm:pt-6 border-t border-slate-800/80 w-full"
          >
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1 font-mono">
              CONNECT:
            </span>

            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#0B1726]/80 hover:bg-[#102238] hover:text-white border border-slate-800 hover:border-cyan-500/40 transition-colors shadow-2xs min-h-[36px]"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5 text-slate-400" />
                <span>GitHub</span>
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#0B1726]/80 hover:bg-[#102238] hover:text-white border border-slate-800 hover:border-cyan-500/40 transition-colors shadow-2xs min-h-[36px]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
            )}

            {personal.email && (
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#0B1726]/80 hover:bg-[#102238] hover:text-white border border-slate-800 hover:border-cyan-500/40 transition-colors shadow-2xs min-h-[36px]"
                aria-label="Direct Email"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Email</span>
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Right Column: Framed Professional Profile Portrait with Cyber-Tech Corner Accents */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center items-center w-full"
        >
          <div className="relative max-w-[300px] xs:max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[440px] w-full group">
            {/* Ambient Cyan Radial Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-sky-500/15 to-transparent rounded-3xl blur-2xl -z-10 group-hover:bg-cyan-500/30 transition-colors duration-500" />

            {/* Rotating Subtle Geometric Tech Rings */}
            <div className="absolute -inset-3 sm:-inset-4 border border-dashed border-cyan-500/25 rounded-3xl pointer-events-none -z-10 animate-[spin_30s_linear_infinite]" />
            <div className="absolute -inset-1.5 border border-cyan-500/20 rounded-3xl pointer-events-none -z-10" />

            {/* Portrait Frame Container */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0B1726] border border-slate-800 group-hover:border-cyan-500/50 shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
              
              {/* Corner Tech Bracket Accents */}
              <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
              <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-20" />

              {/* Profile Photo */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-[#07111F]">
                <img
                  src={profileImage}
                  alt="Muhammad Faiz Parande"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-[center_20%] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />

                {/* Bottom subtle gradient vignette to blend with card surface */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B1726] via-[#0B1726]/40 to-transparent pointer-events-none" />
              </div>

              {/* Bottom Info Bar inside Card */}
              <div className="p-3.5 sm:p-4 bg-[#0B1726] border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="overflow-hidden">
                  <div className="text-xs sm:text-sm font-bold text-white truncate">
                    {personal.name}
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-cyan-400 font-medium truncate">
                    DATA &amp; SOFTWARE ENG.
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#07111F] border border-slate-800 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-300 font-semibold">
                    ONLINE
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle Floating Tech Badges on Frame Edge */}
            <div className="hidden sm:flex absolute -bottom-3 -left-3 items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0B1726]/95 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] font-bold shadow-lg shadow-cyan-950/40 backdrop-blur-sm">
              <span className="text-cyan-400 font-mono">#</span>
              <span>PYTHON &amp; ML</span>
            </div>

            <div className="hidden sm:flex absolute -top-3 -right-3 items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0B1726]/95 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] font-bold shadow-lg shadow-cyan-950/40 backdrop-blur-sm">
              <span className="text-cyan-400 font-mono">#</span>
              <span>FULL-STACK ENG</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-[10px] sm:text-xs font-mono select-none"
      >
        <span className="tracking-widest uppercase text-slate-400">SCROLL</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
