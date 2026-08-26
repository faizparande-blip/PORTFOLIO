import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  ArrowRight,
  Download,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Database,
  Terminal,
  Server,
  Zap,
  ArrowDown,
  Globe,
  Radio,
  Activity
} from 'lucide-react';
import { Github, Linkedin } from '../components/ui/Icons';
import { portfolioData } from '../data/portfolio';
import Button from '../components/ui/Button';

export const Hero = ({ isLoaded = true }) => {
  const { personal, social } = portfolioData;

  const roles = personal.roles || [
    "FULL-STACK DEVELOPER",
    "COMPUTER SCIENCE ENGINEER",
    "DATA ANALYST",
    "DATA SCIENTIST"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Rotating role cycle every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Subtle interactive mouse parallax
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 16;
    setMousePos({ x, y });
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    personal.email
  )}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[94vh] sm:min-h-screen flex flex-col justify-center pt-28 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10 my-auto">
        
        {/* Left Column: Hero Typography, Dynamic Role & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Availability Status Badge */}
          {personal.availability && (
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                {personal.availability}
              </span>
            </motion.div>
          )}

          {/* 01. Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="text-xs sm:text-sm font-bold text-blue-600 tracking-widest uppercase mb-2 font-mono"
          >
            {personal.eyebrow || "HELLO, I'M"}
          </motion.div>

          {/* 02. Full Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-3"
          >
            {personal.name}
          </motion.h1>

          {/* 03. Dynamic Rotating Role */}
          <motion.div
            variants={itemVariants}
            className="h-9 sm:h-11 overflow-hidden mb-6 flex items-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 flex items-center gap-2.5"
              >
                <span>{roles[currentRoleIndex]}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* 04. Professional Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8"
          >
            {personal.tagline}{' '}
            <span className="text-slate-500">{personal.shortBio}</span>
          </motion.p>

          {/* 05. CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto"
          >
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-md shadow-blue-500/15"
              iconRight
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View My Work
            </Button>
            <Button
              href={social.resume}
              download="Muhammad_Faiz_Parande_Resume.pdf"
              variant="secondary"
              size="lg"
              icon={<Download className="w-4 h-4 text-blue-600" />}
              className="w-full sm:w-auto"
            >
              Download Resume
            </Button>
          </motion.div>

          {/* 06. Connect Links Bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-200/80 w-full"
          >
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
              CONNECT:
            </span>

            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-medium transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5 text-slate-700" />
                <span>GitHub</span>
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-600 text-xs font-medium transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <span>LinkedIn</span>
              </a>
            )}

            {personal.email && (
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-emerald-600 text-xs font-medium transition-all"
                aria-label="Compose Gmail"
                title="Send email via Gmail"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>Email</span>
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Right Column: Live Interactive Architecture Interface Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 24 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`
          }}
          className="lg:col-span-5 relative transition-transform duration-200 ease-out"
        >
          {/* Main Visual Card */}
          <div className="relative rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            {/* Top Window Header Bar */}
            <div className="px-4 py-3 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              </div>
              
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-md border border-slate-200 text-xs font-mono text-slate-600 shadow-2xs">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                <span>SystemArchitecture.live</span>
              </div>

              <span className="flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                LIVE
              </span>
            </div>

            {/* Architecture Pipeline Visual */}
            <div className="p-5 font-mono text-xs space-y-3 bg-white">
              {/* Telemetry metadata row */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-100">
                <span>SYSTEM.STATUS / <strong className="text-emerald-600">ONLINE</strong></span>
                <span>BUILD.VERSION / <strong className="text-slate-800">2026</strong></span>
              </div>

              {/* Tier 1: Frontend UI Layer */}
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between hover:border-blue-400 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 font-sans">CLIENT INTERFACE</div>
                    <div className="text-[11px] text-blue-700">React.js · Tailwind CSS · Vite</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold text-blue-600 bg-white px-2 py-0.5 rounded border border-blue-200">
                  UI LAYER
                </span>
              </div>

              {/* Connecting Flow Arrow */}
              <div className="flex justify-center -my-1">
                <div className="w-px h-3 bg-blue-300 relative">
                  <div className="absolute -bottom-1 -left-[3px] w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-blue-400" />
                </div>
              </div>

              {/* Tier 2: REST API & Routing Gateway */}
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200/80 flex items-center justify-between hover:border-indigo-400 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 font-sans">API & BACKEND SERVICES</div>
                    <div className="text-[11px] text-indigo-700">Node.js · Express · REST Routing</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold text-indigo-600 bg-white px-2 py-0.5 rounded border border-indigo-200">
                  API GATEWAY
                </span>
              </div>

              {/* Connecting Flow Arrow */}
              <div className="flex justify-center -my-1">
                <div className="w-px h-3 bg-indigo-300 relative">
                  <div className="absolute -bottom-1 -left-[3px] w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-indigo-400" />
                </div>
              </div>

              {/* Tier 3: Persistence Database Layer */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between hover:border-emerald-400 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 font-sans">PERSISTENCE & STORAGE</div>
                    <div className="text-[11px] text-emerald-700">MySQL · MongoDB · Relational Schema</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold text-emerald-600 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  DATABASE
                </span>
              </div>

              {/* Location & Stack status footer */}
              <div className="flex items-center justify-between text-xs pt-2 text-slate-500 border-t border-slate-100 font-sans">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>{personal.location}</span>
                </div>
                <span className="text-blue-600 font-semibold font-mono text-[11px]">
                  FULL-STACK // DEV
                </span>
              </div>
            </div>
          </div>

          {/* Floating Technology Badges with gentle floating animations */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-md text-xs font-semibold text-slate-800"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>React.js + Vite</span>
          </motion.div>

          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-md text-xs font-semibold text-slate-800"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Node.js & MySQL</span>
          </motion.div>

          {/* Soft background glow */}
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-100/70 via-indigo-100/60 to-sky-100/50 rounded-3xl blur-2xl -z-10" />
        </motion.div>
      </div>

      {/* 08. Subtle Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 flex justify-center"
      >
        <a
          href="#about"
          className="group inline-flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-blue-600 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
