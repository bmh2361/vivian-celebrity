import { projectContent } from '../cases/caseStudyUtils.js';

const preferredSlugs = ['london-fashion-week-2026', 'lil-ghost-london-live-2026', 'agibot-uk-launch-2026', 'geely-ex5-uk-launch-2025'];

export function selectFeaturedProjects(projects, lang) {
  if (!Array.isArray(projects)) return [];
  const available = projects.filter((project) => {
    const content = projectContent(project, lang);
    const cover = project?.media?.cover;
    return project?.status === 'published' && typeof project.slug === 'string' && typeof content?.title === 'string' && typeof content.summary === 'string' && typeof cover?.src === 'string' && cover.width > 0 && cover.height > 0 && typeof cover.alt?.[lang] === 'string' && cover.alt[lang].trim();
  });
  const preferred = preferredSlugs.map((slug) => available.find((project) => project.slug === slug)).filter(Boolean);
  return [...preferred, ...available.filter((project) => !preferredSlugs.includes(project.slug))].slice(0, 4);
}
