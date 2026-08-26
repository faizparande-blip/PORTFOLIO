import React from 'react';
import { Layout, Server, Database, Layers, ArrowUpRight } from 'lucide-react';

export const ProjectVisual = ({ project }) => {
  if (project.image) {
    return (
      <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-t-2xl bg-[#07111F]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
    );
  }

  // Clean Modern Abstract UI / Architecture Visual
  return (
    <div className="relative w-full h-44 sm:h-52 overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#07111F] via-[#0B1726] to-[#0D1F34] border-b border-slate-800/80 p-5 flex flex-col justify-between select-none">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="px-2.5 py-1 rounded-md bg-[#050B14] border border-slate-800 text-[10px] sm:text-[11px] font-semibold text-cyan-400 font-mono tracking-wider shadow-2xs uppercase">
          {project.category}
        </span>
        <span className="text-xs font-mono font-bold text-slate-500">
          #{project.number}
        </span>
      </div>

      {/* Center abstract UI cards */}
      <div className="my-auto flex items-center justify-center gap-3 py-2">
        <div className="p-3 sm:p-3.5 rounded-xl bg-[#07111F] border border-slate-800 text-cyan-400 group-hover:border-cyan-500/40 group-hover:shadow-md group-hover:shadow-cyan-950/20 transition-all">
          <Layout className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <span className="w-6 sm:w-8 h-px bg-slate-800" />
        <div className="p-3 sm:p-3.5 rounded-xl bg-[#07111F] border border-slate-800 text-blue-400 group-hover:border-blue-500/40 group-hover:shadow-md transition-all">
          <Server className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <span className="w-6 sm:w-8 h-px bg-slate-800" />
        <div className="p-3 sm:p-3.5 rounded-xl bg-[#07111F] border border-slate-800 text-emerald-400 group-hover:border-emerald-500/40 group-hover:shadow-md transition-all">
          <Database className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      {/* Footer hint */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/60 font-sans">
        <span className="font-medium text-slate-400">Architecture Overview</span>
        <span className="text-cyan-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform font-mono text-[11px]">
          View Case Study →
        </span>
      </div>
    </div>
  );
};

export default ProjectVisual;
