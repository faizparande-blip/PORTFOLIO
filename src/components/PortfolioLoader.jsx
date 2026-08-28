import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

export const PortfolioLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const steps = [
    { label: 'RUNTIME ENGINE', status: 'OK' },
    { label: 'GRAPHICAL MESH & UI', status: 'OK' },
    { label: 'PROJECT REPOSITORIES', status: 'OK' },
    { label: 'SYSTEM INTERFACE', status: 'READY' }
  ];

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const isMobile = window.innerWidth < 768;
    const duration = isMobile ? 950 : 1250; // ~0.95s on mobile, ~1.25s on desktop
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 25 && currentProgress < 50) setStage(1);
      else if (currentProgress >= 50 && currentProgress < 75) setStage(2);
      else if (currentProgress >= 75 && currentProgress < 98) setStage(3);
      else if (currentProgress >= 98) setStage(4);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
        }, 150);
      }
    }, 16);

    // Fast-skip on tap / keypress
    const handleSkip = () => {
      clearInterval(interval);
      setProgress(100);
      setStage(4);
      onComplete?.();
    };

    window.addEventListener('click', handleSkip, { once: true });
    window.addEventListener('touchstart', handleSkip, { once: true, passive: true });
    window.addEventListener('keydown', handleSkip, { once: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
      window.removeEventListener('keydown', handleSkip);
    };
  }, [onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        filter: 'blur(8px)',
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050B14] text-slate-100 select-none overflow-hidden p-4"
    >
      {/* Ambient background depth */}
      <div className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-radial from-cyan-500/10 via-sky-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top and bottom subtle scanlines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md px-2 sm:px-6 flex flex-col items-center">
        {/* Animated Geometric Monogram Badge */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-4 sm:mb-5 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-2xl border border-dashed border-cyan-400/40 shadow-xs shadow-cyan-400/20"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cyan-400 flex items-center justify-center text-slate-950 font-mono font-black text-sm sm:text-base shadow-lg shadow-cyan-500/40"
          >
            FP
          </motion.div>
        </div>

        {/* Identity & Status */}
        <div className="text-center mb-4 sm:mb-5">
          <div className="font-mono text-[10px] sm:text-xs font-bold text-cyan-400 tracking-widest uppercase mb-1">
            {stage >= 4 ? 'SYSTEM INITIALIZED' : 'INITIALIZING WORKSPACE'}
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
            MUHAMMAD FAIZ PARANDE
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5">
            FULL-STACK DEVELOPER &amp; DATA ANALYST
          </p>
        </div>

        {/* Laser Progress Track & Percentage */}
        <div className="w-full mb-4 sm:mb-5">
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono font-semibold text-slate-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              BOOTSTRAP PROTOCOL
            </span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#0B1726] rounded-full overflow-hidden border border-slate-800 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 rounded-full shadow-xs shadow-cyan-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* System Checklist Sequence */}
        <div className="w-full p-3 sm:p-3.5 rounded-xl bg-[#0B1726]/85 backdrop-blur-md border border-slate-800/90 font-mono text-[10px] sm:text-xs space-y-1.5 text-slate-400 shadow-2xl">
          {steps.map((step, idx) => {
            const isDone = stage > idx;
            const isCurrent = stage === idx;

            return (
              <div
                key={idx}
                className={`flex items-center justify-between transition-opacity duration-200 gap-2 ${
                  isDone || isCurrent ? 'opacity-100' : 'opacity-35'
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                  <span className="text-slate-500 shrink-0">0{idx + 1}</span>
                  <span className="text-slate-200 font-medium truncate">{step.label}</span>
                </div>
                <span
                  className={`font-semibold shrink-0 text-[9px] sm:text-xs font-mono ${
                    isDone
                      ? 'text-cyan-400'
                      : isCurrent
                      ? 'text-cyan-300 animate-pulse'
                      : 'text-slate-500'
                  }`}
                >
                  {isDone ? 'OK' : isCurrent ? 'LOADING...' : 'WAITING'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Telemetry Footer */}
        <div className="mt-3.5 sm:mt-4 text-[9px] sm:text-[10px] font-mono text-slate-500 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-xs shadow-cyan-400" />
          <span className="truncate">FP.SYSTEMS // SECURE RUNTIME // READY</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioLoader;
