import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Check, Sparkles, Cpu, Terminal } from 'lucide-react';
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

    // Smooth progress counter reaching 100% in ~1.8s
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 25 && currentProgress < 50) setStage(1);
      else if (currentProgress >= 50 && currentProgress < 75) setStage(2);
      else if (currentProgress >= 75 && currentProgress < 98) setStage(3);
      else if (currentProgress >= 98) setStage(4);

      if (elapsed >= duration + 200) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
        }, 250);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050B14] text-slate-100 select-none overflow-hidden p-4"
    >
      {/* Subtle background ambient depth */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute w-80 sm:w-96 h-80 sm:h-96 bg-cyan-950/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md px-2 sm:px-6 flex flex-col items-center">
        {/* Animated Geometric System Ring */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-5 sm:mb-6 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-2xl border-2 border-dashed border-cyan-500/30"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-400 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/20"
          >
            <Code2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </motion.div>
        </div>

        {/* Status Heading */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="font-mono text-[10px] sm:text-[11px] font-bold text-cyan-400 tracking-widest uppercase mb-1">
            {stage >= 4 ? 'SYSTEM READY' : 'INITIALIZING PORTFOLIO'}
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            {stage >= 4 ? 'Welcome' : 'Loading Workspace'}
          </h2>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full mb-5 sm:mb-6">
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono font-semibold text-slate-400 mb-2">
            <span>BOOTSTRAP SEQUENCE</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#0B1726] rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-full shadow-xs shadow-cyan-500/50"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        {/* System Checklist Sequence */}
        <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-[#0B1726] border border-slate-800/90 font-mono text-[11px] sm:text-xs space-y-2 text-slate-400 shadow-xl">
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
                  className={`font-semibold shrink-0 text-[10px] sm:text-xs ${
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
        <div className="mt-4 sm:mt-5 text-[10px] sm:text-[11px] font-mono text-slate-500 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-xs shadow-cyan-400/50" />
          <span className="truncate">PORTFOLIO.RUNTIME // VITE HMR ACTIVE</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioLoader;
