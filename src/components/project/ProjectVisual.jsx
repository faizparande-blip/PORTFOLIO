import React from 'react';

export const ProjectVisual = ({ project }) => {
  return (
    <div className="p-4 sm:p-5 pb-0 select-none">
      {/* Category and Project Number Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="px-2.5 py-1 rounded-md bg-[#07111F]/90 border border-slate-800 text-[10px] sm:text-[11px] font-semibold text-cyan-400 font-mono tracking-wider shadow-2xs uppercase">
          {project.category}
        </span>
        <span className="text-xs font-mono font-bold text-slate-500">
          #{project.number}
        </span>
      </div>

      {/* Real Project Homepage Screenshot Container */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl bg-[#07111F] border border-slate-800/80 group-hover:border-cyan-500/50 shadow-lg group-hover:shadow-cyan-950/30 transition-all duration-300">
        <img
          src={project.image}
          alt={`${project.title} homepage`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />

        {/* Subtle Bottom Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1726]/60 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default ProjectVisual;
