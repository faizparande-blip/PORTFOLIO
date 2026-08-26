import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

export const PortfolioLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const steps = [
    { label: 'CORE ENGINE', status: 'OK' },
    { label: 'COMPONENT SCHEMAS', status: 'OK' },
    { label: 'PROJECT REPOSITORIES', status: 'OK' },
    { label: 'SYSTEM INTERFACE', status: 'READY' }
  ];

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const isMobile = window.innerWidth < 768;
    const duration = isMobile ? 850 : 1100; // ~0.85s on mobile, ~1.1s on desktop
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
        }, 120);
      }
    }, 20);

    // Fast-skip on tap / keypress
    const handleSkip = () => {
      clearInterval(interval);
      setProgress(100);
      setStage(4);
      onComplete?.();
    };

    window.addEventListener('click', handleSkip, { once: true });
    window.addEventListener('touchstart', handleSkip, { once: true, passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
    };
  }, [onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050B14] text-slate-100 select-none overflow-hidden p-4"
    >
      {/* Subtle background ambient depth */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-cyan-950/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md px-2 sm:px-6 flex flex-col items-center">
        {/* Animated Geometric System Ring */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-5 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-2xl border border-dashed border-cyan-500/40"
          />
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-400 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/30">
            <Code2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </div>
        </div>

        {/* Status Heading */}
        <div className="text-center mb-4 sm:mb-5">
          <div className="font-mono text-[10px] sm:text-[11px] font-bold text-cyan-400 tracking-widest uppercase mb-1">
            {stage >= 4 ? 'SYSTEM READY' : 'INITIALIZING PORTFOLIO'}
          </div>
          <h2 className="text-base sm:text-xl font-extrabold text-slate-100 tracking-tight">
            {stage >= 4 ? 'Welcome' : 'Loading Workspace'}
          </h2>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full mb-4 sm:mb-5">
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono font-semibold text-slate-400 mb-1.5">
            <span>BOOTSTRAP SEQUENCE</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#0B1726] rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-full transition-all duration-75 ease-out shadow-xs shadow-cyan-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* System Checklist Sequence */}
        <div className="w-full p-3 sm:p-3.5 rounded-xl bg-[#0B1726]/80 backdrop-blur-md border border-slate-800/90 font-mono text-[10px] sm:text-xs space-y-1.5 text-slate-400 shadow-xl">
          {steps.map((step, idx) => {
            const isDone = stage > idx;
            const isCurrent = stage === idx;

            return (
              <div
                key={idx}
                className={`flex items-center justify-between transition-opacity duration-150 gap-2 ${
                  isDone || isCurrent ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                  <span className="text-slate-500 shrink-0">0{idx + 1}</span>
                  <span className="text-slate-200 font-medium truncate">{step.label}</span>
                </div>
                <span
                  className={`font-semibold shrink-0 text-[9px] sm:text-xs ${
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
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-xs shadow-cyan-400/50" />
          <span className="truncate">PORTFOLIO.RUNTIME // FAST INIT ACTIVE</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioLoader;
