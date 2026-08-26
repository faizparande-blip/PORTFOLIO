import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  icon = null,
  className = '',
  size = 'md'
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full transition-colors';

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wide',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-3.5 py-1.5'
  };

  const variantStyles = {
    default: 'bg-[#0B1726] text-slate-300 border border-slate-700/60',
    blue: 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/30',
    indigo: 'bg-blue-950/40 text-blue-300 border border-blue-500/30',
    emerald: 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30',
    status: 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/40 shadow-xs'
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
