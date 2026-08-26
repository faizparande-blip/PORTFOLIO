import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Code } from 'lucide-react';
import { Github } from '../ui/Icons';
import ProjectVisual from './ProjectVisual';
import Badge from '../ui/Badge';

export const ProjectCard = ({ project, onOpenCaseStudy, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group rounded-2xl bg-[#0B1726]/80 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-950/40 transition-all duration-300 overflow-hidden flex flex-col justify-between w-full"
    >
      <div>
        {/* Project Visual Header with Subtle Zoom on Hover */}
        <div onClick={() => onOpenCaseStudy(project)} className="cursor-pointer overflow-hidden">
          <ProjectVisual project={project} />
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <span className="text-[11px] font-mono font-semibold text-cyan-400 tracking-wider uppercase block mb-1">
                {project.category}
              </span>
              <h3
                onClick={() => onOpenCaseStudy(project)}
                className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors cursor-pointer break-words"
              >
                {project.title}
              </h3>
            </div>
            {project.featured && (
              <Badge variant="blue" size="sm">
                Featured
              </Badge>
            )}
          </div>

          <p className="text-xs font-medium text-slate-400 mb-3 line-clamp-1">
            {project.tagline}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 sm:mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Technology Badges with Glass Style */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[11px] sm:text-xs font-medium bg-[#07111F]/80 backdrop-blur-xs text-slate-300 rounded-md border border-slate-800/80 transition-colors hover:border-slate-700"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-2 py-1 text-[11px] font-medium bg-[#07111F]/80 text-slate-500 rounded-md">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer with Live Demo & View Source buttons */}
      <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-[#07111F]/90 backdrop-blur-md border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group/btn font-mono"
        >
          <span>Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
        </button>

        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#0B1726]/90 backdrop-blur-sm border border-slate-700/80 hover:bg-[#102238] hover:text-white hover:border-cyan-500/30 transition-colors shadow-2xs min-h-[36px]"
              aria-label={`View ${project.title} source code`}
            >
              <Github className="w-3.5 h-3.5 text-slate-300" />
              <span>Source</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/25 hover:shadow-cyan-400/40 min-h-[36px]"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
