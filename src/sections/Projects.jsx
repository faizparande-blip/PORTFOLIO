import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectCard from '../components/project/ProjectCard';
import ProjectModal from '../components/project/ProjectModal';

export const Projects = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenCaseStudy = (project) => {
    setSelectedProject(project);
  };

  const handleCloseCaseStudy = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-50/60 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="PORTFOLIO"
          title="Featured Projects"
          subtitle="Selected full-stack web applications and engineering projects."
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenCaseStudy={handleOpenCaseStudy}
            />
          ))}
        </div>

        {/* Case Study Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={handleCloseCaseStudy}
        />
      </div>
    </section>
  );
};

export default Projects;
