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
    default: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    blue: 'bg-blue-50 text-blue-700 border border-blue-200/70',
    indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-200/70',
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200/70',
    status: 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
