import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

/**
 * High-performance pointer spotlight tracking cursor position.
 * Creates an ambient cyan cyber aura across the dark viewport.
 * Automatically disabled on touch devices and reduced motion.
 */
export const PointerSpotlight = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block overflow-hidden"
      style={{
        background: `radial-gradient(600px circle at var(--x, -1000px) var(--y, -1000px), rgba(34, 211, 238, 0.06), transparent 80%)`
      }}
    >
      <motion.div
        className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.04] blur-3xl pointer-events-none"
        style={{
          left: smoothX,
          top: smoothY
        }}
      />
    </motion.div>
  );
};

export default PointerSpotlight;
