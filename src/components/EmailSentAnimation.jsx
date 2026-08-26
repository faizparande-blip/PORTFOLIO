import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Send } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

export const EmailSentAnimation = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="w-24 h-24 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 my-4 shadow-sm">
        <Check className="w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="relative w-48 h-36 mx-auto my-2 flex items-center justify-center select-none overflow-visible">
      {/* Background Soft Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1.15 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 bg-gradient-to-tr from-blue-100/60 via-indigo-100/50 to-emerald-100/50 rounded-full blur-2xl -z-10"
      />

      {/* Flight Path Arc (Dotted Line) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 192 144"
        fill="none"
      >
        <motion.path
          d="M 40 100 Q 96 20 160 50"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.6, delay: 0.6, ease: 'easeInOut' }}
        />
      </svg>

      {/* Floating Sparkles Burst */}
      {[
        { x: -50, y: -35, delay: 0.9, size: 'w-4 h-4', color: 'text-amber-400' },
        { x: 55, y: -40, delay: 1.1, size: 'w-3.5 h-3.5', color: 'text-blue-500' },
        { x: 60, y: 30, delay: 1.2, size: 'w-4 h-4', color: 'text-emerald-500' },
        { x: -45, y: 35, delay: 1.0, size: 'w-3 h-3', color: 'text-indigo-400' }
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
        <div className="relative w-28 h-20 bg-white rounded-xl border border-slate-200 shadow-lg flex items-center justify-center overflow-hidden">
          {/* Back Wall of Envelope */}
          <div className="absolute inset-0 bg-slate-50" />

          {/* Letter gliding in */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: [ -30, 0, 4 ], opacity: [0, 1, 1] }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="absolute top-2 w-20 h-14 bg-white rounded-md border border-slate-200 shadow-xs p-1.5 flex flex-col gap-1 z-10"
          >
            <div className="w-8 h-1 bg-blue-500 rounded-full" />
            <div className="w-14 h-1 bg-slate-200 rounded-full" />
            <div className="w-11 h-1 bg-slate-200 rounded-full" />
            <div className="w-15 h-1 bg-slate-100 rounded-full" />
          </motion.div>

          {/* Front Fold / Triangle Flap */}
          <motion.div
            initial={{ rotateX: 180, originY: 0 }}
            animate={{ rotateX: [180, 180, 0] }}
            transition={{ duration: 0.6, delay: 0.55, ease: 'easeInOut' }}
            className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-slate-100 to-slate-200 border-b border-slate-300 shadow-2xs z-20"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
            }}
          />

          {/* Front Left and Right Fold Overlays */}
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-white/95 border-t border-slate-100 z-20 pointer-events-none"
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
          className="absolute z-30 text-blue-600 pointer-events-none drop-shadow-md"
        >
          <Send className="w-7 h-7 fill-blue-600 text-blue-600" />
        </motion.div>

        {/* Final Success Glowing Checkmark Stamp Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: [0, 1.25, 1], opacity: 1, rotate: [ -45, 10, 0 ] }}
          transition={{ duration: 0.5, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-emerald-500 text-white border-2 border-white shadow-md flex items-center justify-center z-40"
        >
          <Check className="w-5 h-5 stroke-[2.5]" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmailSentAnimation;
