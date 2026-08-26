import React from 'react';

export const TechBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle modern background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Soft atmospheric gradient accents */}
      <div className="absolute -top-40 right-0 w-[550px] h-[550px] bg-blue-100/60 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/3 -left-40 w-[450px] h-[450px] bg-indigo-100/50 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-[130px] -z-10" />
    </div>
  );
};

export default TechBackground;
