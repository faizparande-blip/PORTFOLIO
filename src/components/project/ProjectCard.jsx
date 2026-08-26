import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Code } from 'lucide-react';
import { Github } from '../ui/Icons';
import ProjectVisual from './ProjectVisual';
import Badge from '../ui/Badge';

export const ProjectCard = ({ project, onOpenCaseStudy, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1"
    >
      <div>
        {/* Project Visual Header */}
        <div onClick={() => onOpenCaseStudy(project)} className="cursor-pointer">
          <ProjectVisual project={project} />
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <span className="text-xs font-mono font-semibold text-blue-600 tracking-wider uppercase block mb-1">
                {project.category}
              </span>
              <h3
                onClick={() => onOpenCaseStudy(project)}
                className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer"
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

          <p className="text-xs font-medium text-slate-500 mb-3 line-clamp-1">
            {project.tagline}
          </p>

          <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Technology Badges */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md border border-slate-200/60"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-2.5 py-1 text-xs font-medium bg-slate-50 text-slate-400 rounded-md">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer with Live Demo & View Source buttons */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer group/btn"
        >
          <span>Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
        </button>

        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
              aria-label={`View ${project.title} source code`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>View Source</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-2xs"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
