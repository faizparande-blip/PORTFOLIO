import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const dotSpringConfig = { damping: 45, stiffness: 700, mass: 0.1 };
  const dotSmoothX = useSpring(cursorX, dotSpringConfig);
  const dotSmoothY = useSpring(cursorY, dotSpringConfig);

  useEffect(() => {
    // Disable on touch devices and if user prefers reduced motion
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleElementHover = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor-hover], .group, .card-midnight');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block select-none" aria-hidden="true">
      {/* Outer Soft Cyan Glow Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          width: isHovered ? 44 : 26,
          height: isHovered ? 44 : 26,
          backgroundColor: isHovered ? 'rgba(34, 211, 238, 0.08)' : 'transparent',
          borderColor: isHovered ? 'rgba(34, 211, 238, 0.65)' : 'rgba(34, 211, 238, 0.3)',
          boxShadow: isHovered ? '0 0 16px rgba(0, 217, 255, 0.3)' : 'none'
        }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        className="fixed rounded-full border border-cyan-400/35 pointer-events-none"
      />

      {/* Center Precise Cyan Core Dot */}
      <motion.div
        style={{
          x: dotSmoothX,
          y: dotSmoothY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovered ? 0.65 : 1
        }}
        transition={{ duration: 0.12 }}
        className="fixed w-2 h-2 rounded-full bg-cyan-400 pointer-events-none shadow-xs shadow-cyan-400"
      />
    </div>
  );
};

export default CustomCursor;
