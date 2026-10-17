import { useEffect } from 'react';
import { caseStudies, caseStudyCategories } from 'virtual:case-studies';
import ProjectIndex from '../cases/ProjectIndex.jsx';
import { selectFeaturedProjects } from './featuredProjects.js';

export default function FeaturedProjects({ lang, withBase, unavailable }) {
  const projects = selectFeaturedProjects(caseStudies, lang);
  useEffect(() => {
    if (import.meta.env.DEV && projects.length < 4) console.warn('Home featured projects: fewer than four complete published projects are available.');
  }, [projects.length]);
  if (!projects.length) return <p className="home-projects-unavailable" role="status">{unavailable}</p>;
  return <ProjectIndex projects={projects} categories={caseStudyCategories} lang={lang} withBase={withBase} />;
}
