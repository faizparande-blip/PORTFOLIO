import React from 'react';
import { Layout, Server, Database, Layers, ArrowUpRight } from 'lucide-react';

export const ProjectVisual = ({ project }) => {
  if (project.image) {
    return (
      <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-t-2xl bg-slate-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
    );
  }

  // Clean Modern Abstract UI / Workspace Visual
  return (
    <div className="relative w-full h-48 sm:h-52 overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/40 border-b border-slate-200/80 p-5 flex flex-col justify-between select-none">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-blue-600 shadow-2xs uppercase">
          {project.category}
        </span>
        <span className="text-xs font-mono font-bold text-slate-400">
          #{project.number}
        </span>
      </div>

      {/* Center abstract UI cards */}
      <div className="my-auto flex items-center justify-center gap-3 py-2">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm text-blue-600 group-hover:border-blue-300 group-hover:shadow-md transition-all">
          <Layout className="w-6 h-6" />
        </div>
        <span className="w-8 h-px bg-slate-300" />
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm text-indigo-600 group-hover:border-indigo-300 group-hover:shadow-md transition-all">
          <Server className="w-6 h-6" />
        </div>
        <span className="w-8 h-px bg-slate-300" />
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm text-emerald-600 group-hover:border-emerald-300 group-hover:shadow-md transition-all">
          <Database className="w-6 h-6" />
        </div>
      </div>

      {/* Footer hint */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-200/60">
        <span className="font-medium">Architecture Overview</span>
        <span className="text-blue-600 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
          View Case Study →
        </span>
      </div>
    </div>
  );
};

export default ProjectVisual;
