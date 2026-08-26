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
    <section id="projects" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#07111F]/60 border-t border-slate-800/80 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeading
          tag="PORTFOLIO"
          title="Featured Projects"
          subtitle="Selected full-stack web applications, e-commerce systems, and data-driven platforms."
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 w-full">
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
