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
      className="fixed inset-0 z-50 flex items-center justify-center bg-white text-slate-900 select-none overflow-hidden"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-blue-100/70 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        {/* Animated Geometric System Ring */}
        <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-2xl border-2 border-dashed border-blue-400/40"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20"
          >
            <Code2 className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Status Heading */}
        <div className="text-center mb-6">
          <div className="font-mono text-[11px] font-bold text-blue-600 tracking-widest uppercase mb-1">
            {stage >= 4 ? 'SYSTEM READY' : 'INITIALIZING PORTFOLIO'}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {stage >= 4 ? 'Welcome' : 'Loading Workspace'}
          </h2>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full mb-6">
          <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-500 mb-2">
            <span>BOOTSTRAP SEQUENCE</span>
            <span className="text-blue-600 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        {/* System Checklist Sequence */}
        <div className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200/90 font-mono text-xs space-y-2 text-slate-600 shadow-2xs">
          {steps.map((step, idx) => {
            const isDone = stage > idx;
            const isCurrent = stage === idx;

            return (
              <div
                key={idx}
                className={`flex items-center justify-between transition-opacity duration-200 ${
                  isDone || isCurrent ? 'opacity-100' : 'opacity-35'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">0{idx + 1}</span>
                  <span className="text-slate-800 font-medium">{step.label}</span>
                </div>
                <span
                  className={`font-semibold ${
                    isDone
                      ? 'text-emerald-600'
                      : isCurrent
                      ? 'text-blue-600 animate-pulse'
                      : 'text-slate-400'
                  }`}
                >
                  {isDone ? 'OK' : isCurrent ? 'LOADING...' : 'WAITING'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Telemetry Footer */}
        <div className="mt-5 text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>PORTFOLIO.RUNTIME // VITE HMR ACTIVE</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioLoader;
