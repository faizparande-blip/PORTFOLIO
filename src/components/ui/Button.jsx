import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  target,
  rel,
  icon = null,
  iconRight = false,
  isExternal = false,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.18;
    const y = (clientY - (top + height / 2)) * 0.18;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 active:scale-[0.98]',
    secondary: 'bg-[#0B1726]/80 hover:bg-[#102238]/90 text-slate-100 border border-slate-700/60 hover:border-cyan-500/50 backdrop-blur-md shadow-md hover:shadow-cyan-950/40 active:scale-[0.98]',
    outline: 'bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 backdrop-blur-sm shadow-xs hover:shadow-cyan-500/20 active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white border border-transparent backdrop-blur-xs'
  };

  const content = (
    <>
      {icon && !iconRight && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconRight && <span className="shrink-0">{icon}</span>}
      {isExternal && !icon && (
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={buttonRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.1 }}
        target={target || (isExternal ? '_blank' : undefined)}
        rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
        className={`group ${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.1 }}
      disabled={disabled}
      className={`group ${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
