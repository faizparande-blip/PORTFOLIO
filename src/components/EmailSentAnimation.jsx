import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Send } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

export const EmailSentAnimation = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="w-20 h-20 rounded-full bg-cyan-950/50 border border-cyan-500/40 flex items-center justify-center text-cyan-400 my-4 shadow-lg shadow-cyan-950/40">
        <Check className="w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="relative w-48 h-36 mx-auto my-2 flex items-center justify-center select-none overflow-visible max-w-full">
      {/* Background Soft Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1.15 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-blue-950/30 to-indigo-950/20 rounded-full blur-2xl -z-10"
      />

      {/* Flight Path Arc (Dotted Line) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 192 144"
        fill="none"
      >
        <motion.path
          d="M 40 100 Q 96 20 160 50"
          stroke="#22D3EE"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.6, delay: 0.6, ease: 'easeInOut' }}
        />
      </svg>

      {/* Floating Sparkles Burst */}
      {[
        { x: -50, y: -35, delay: 0.9, size: 'w-4 h-4', color: 'text-cyan-400' },
        { x: 55, y: -40, delay: 1.1, size: 'w-3.5 h-3.5', color: 'text-sky-300' },
        { x: 60, y: 30, delay: 1.2, size: 'w-4 h-4', color: 'text-emerald-400' },
        { x: -45, y: 35, delay: 1.0, size: 'w-3 h-3', color: 'text-blue-400' }
      ].map((sparkle, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0.9],
            scale: [0, 1.2, 1],
            x: sparkle.x,
            y: sparkle.y
          }}
          transition={{ duration: 0.6, delay: sparkle.delay, ease: 'easeOut' }}
          className={`absolute ${sparkle.size} ${sparkle.color} pointer-events-none`}
        >
          <Sparkles className="w-full h-full" />
        </motion.div>
      ))}

      {/* Envelope & Paper Letter Sequence */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{
          scale: [0.8, 1, 1, 0.9, 1],
          opacity: 1,
          y: [20, 0, 0, -4, 0]
        }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Envelope Container */}
        <div className="relative w-28 h-20 bg-[#0B1726] rounded-xl border border-slate-700 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Back Wall of Envelope */}
          <div className="absolute inset-0 bg-[#07111F]" />

          {/* Letter gliding in */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: [ -30, 0, 4 ], opacity: [0, 1, 1] }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="absolute top-2 w-20 h-14 bg-[#0B1726] rounded-md border border-slate-700 shadow-xs p-1.5 flex flex-col gap-1 z-10"
          >
            <div className="w-8 h-1 bg-cyan-400 rounded-full" />
            <div className="w-14 h-1 bg-slate-700 rounded-full" />
            <div className="w-11 h-1 bg-slate-700 rounded-full" />
            <div className="w-15 h-1 bg-slate-800 rounded-full" />
          </motion.div>

          {/* Front Fold / Triangle Flap */}
          <motion.div
            initial={{ rotateX: 180, originY: 0 }}
            animate={{ rotateX: [180, 180, 0] }}
            transition={{ duration: 0.6, delay: 0.55, ease: 'easeInOut' }}
            className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#0E2038] to-[#0B1726] border-b border-slate-700 shadow-2xs z-20"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
            }}
          />

          {/* Front Left and Right Fold Overlays */}
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-[#0B1726]/95 border-t border-slate-700/60 z-20 pointer-events-none"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 50% 45%)'
            }}
          />
        </div>

        {/* Soaring Paper Plane Launch Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0, x: -10, y: 10, rotate: -20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.1, 1.2, 0.8],
            x: [-10, 20, 60, 90],
            y: [10, -20, -45, -60],
            rotate: [-20, 10, 25, 35]
          }}
          transition={{ duration: 1.1, delay: 0.8, ease: 'easeOut' }}
          className="absolute z-30 text-cyan-400 pointer-events-none drop-shadow-lg"
        >
          <Send className="w-7 h-7 fill-cyan-400 text-cyan-400" />
        </motion.div>

        {/* Final Success Stamp Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: [0, 1.25, 1], opacity: 1, rotate: [ -45, 10, 0 ] }}
          transition={{ duration: 0.5, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-cyan-400 text-slate-950 border-2 border-[#0B1726] shadow-lg shadow-cyan-500/30 flex items-center justify-center z-40"
        >
          <Check className="w-5 h-5 stroke-[3]" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmailSentAnimation;
