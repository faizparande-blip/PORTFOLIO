import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  ArrowRight,
  Download,
  ArrowDown
} from 'lucide-react';
import { Github, Linkedin } from '../components/ui/Icons';
import { portfolioData } from '../data/portfolio';
import Button from '../components/ui/Button';
import profileImage from '../assets/images/Faizportfoliophoto.jpeg';

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

          {/* Full Name with Upward Mask Reveal */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-2 sm:mb-3 break-words max-w-full"
          >
            {personal.name}
          </motion.h1>

          {/* Dynamic Rotating Role with Cyan Glow */}
          <motion.div
            variants={itemVariants}
            className="h-8 sm:h-10 md:h-11 overflow-hidden mb-4 sm:mb-6 flex items-center w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-2xl md:text-3xl font-bold text-cyan-400 flex items-center gap-2.5 drop-shadow-[0_0_15px_rgba(0,217,255,0.35)]"
              >
                <span>{roles[currentRoleIndex]}</span>
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

          {/* CTA Buttons with Magnetic Physics */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8 sm:mb-10 w-full sm:w-auto"
          >
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-h-[44px] justify-center shadow-lg shadow-cyan-500/20"
              iconRight
              icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
            >
              View My Work
            </Button>
            <Button
              href={social.resume}
              download="Muhammad_Faiz_Parande_Resume.pdf"
              variant="secondary"
              size="lg"
              icon={<Download className="w-4 h-4 text-cyan-400" />}
              className="w-full sm:w-auto min-h-[44px] justify-center"
            >
              Download Resume
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
                className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-[#0B1726] hover:bg-[#102238] border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all min-h-[40px]"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span>GitHub</span>
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-[#0B1726] hover:bg-[#102238] border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all min-h-[40px]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>LinkedIn</span>
              </a>
            )}

            {personal.email && (
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-[#0B1726] hover:bg-[#102238] border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all min-h-[40px]"
                aria-label="Compose Gmail"
                title="Send email via Gmail"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Email</span>
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Right Column: Professional Profile Portrait with Cyber-Tech Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="lg:col-span-5 relative w-full flex items-center justify-center select-none"
        >
          {/* Animated Circular Tech/Circuit System Behind Portrait */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            {/* Outer Orbiting Circuit Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              className="w-72 sm:w-[420px] h-72 sm:h-[420px] rounded-full border border-dashed border-cyan-500/20"
            />
            {/* Inner Rotating Dashed Tech Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute w-60 sm:w-[350px] h-60 sm:h-[350px] rounded-full border border-cyan-400/25"
            />
            {/* Soft Ambient Cyan Depth */}
            <div className="absolute w-64 sm:w-[380px] h-64 sm:h-[380px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Main Professional Portrait Card & Frame */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-[#0B1726]/90 p-2 sm:p-2.5 border border-slate-800 shadow-2xl hover:border-cyan-500/50 hover:shadow-cyan-950/40 transition-all duration-300 group max-w-[300px] xs:max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[440px] w-full backdrop-blur-md">
            {/* Subtle Cyber-Tech Corner Accents */}
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg pointer-events-none z-20 shadow-xs shadow-cyan-400/50" />
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-lg pointer-events-none z-20 shadow-xs shadow-cyan-400/50" />

            {/* Profile Image Viewport */}
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl bg-[#07111F]">
              <img
                src={profileImage}
                alt="Muhammad Faiz Parande"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover object-[center_20%] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />

              {/* Bottom Subtle Gradient Fade Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1726]/85 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Tech Badges Outside Face Area */}
            <div className="absolute -top-3 -right-2 sm:-right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1726]/95 border border-cyan-500/40 shadow-xl text-xs font-semibold text-slate-200 backdrop-blur-md z-20">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-xs shadow-cyan-400" />
              <span className="font-mono text-[11px] tracking-wide">PYTHON & ML</span>
            </div>

            <div className="absolute -bottom-2 -left-2 sm:-left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1726]/95 border border-emerald-500/40 shadow-xl text-xs font-semibold text-slate-200 backdrop-blur-md z-20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400" />
              <span className="font-mono text-[11px] tracking-wide">FULL-STACK ENG</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 08. Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-8 sm:mt-10 flex justify-center"
      >
        <a
          href="#about"
          className="group inline-flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer min-h-[44px] justify-center"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
