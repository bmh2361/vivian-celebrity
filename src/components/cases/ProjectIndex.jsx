import { useEffect, useMemo, useState } from 'react';
import ProjectImage from './ProjectImage.jsx';
import ProjectPreview from './ProjectPreview.jsx';
import './cases.css';
import { availableLanguageLabels, categoryLabel, projectContent, projectHref, projectMeta } from './caseStudyUtils.js';

export default function ProjectIndex({ projects, categories, lang, withBase }) {
  const copy = lang === 'zh' ? {
    all: '全部',
    empty: '暂无公开项目。',
    unavailable: '该项目暂未提供中文版本',
    available: '可用语言',
    open: '查看项目',
  } : {
    all: 'All',
    empty: 'No published projects yet.',
    unavailable: 'This project is not yet available in English',
    available: 'Available in',
    open: 'View project',
  };

  const categoryKeys = useMemo(() => Object.keys(categories).filter((key) => projects.some((project) => project.primaryCategory === key)), [projects, categories]);
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredProjects = useMemo(() => activeCategory === 'all' ? projects : projects.filter((project) => project.primaryCategory === activeCategory), [activeCategory, projects]);
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug || null);

  useEffect(() => {
    if (activeCategory !== 'all' && !categoryKeys.includes(activeCategory)) setActiveCategory('all');
  }, [activeCategory, categoryKeys]);

  useEffect(() => {
    if (!filteredProjects.some((project) => project.slug === activeSlug)) setActiveSlug(filteredProjects[0]?.slug || null);
  }, [activeSlug, filteredProjects]);

  const activeProject = filteredProjects.find((project) => project.slug === activeSlug) || filteredProjects[0] || null;

  if (projects.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-[#eee] bg-white px-6 py-10 text-center shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
        <p className="text-sm leading-6 text-[#555]">{copy.empty}</p>
      </div>
    );
  }

  return (
    <div className="case-index mt-6" lang={lang === 'zh' ? 'zh-CN' : 'en-GB'}>

      {categoryKeys.length > 1 && (
        <div className="flex flex-wrap gap-2" aria-label={lang === 'zh' ? '项目分类' : 'Project categories'}>
          {['all', ...categoryKeys].map((key) => {
            const selected = activeCategory === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveCategory(key)}
                className={`rounded-full border px-4 py-2 text-xs font-medium tracking-[0.04em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAF6B] focus-visible:ring-offset-2 ${selected ? 'border-[#CFAF6B] bg-[#fbf8ef] text-[#6F5737]' : 'border-[#e8e8e8] bg-white text-[#555] hover:border-[#E6CF9A] hover:text-[#8B7048]'}`}
              >
                {key === 'all' ? copy.all : categoryLabel(categories, key, lang)}
              </button>
            );
          })}
        </div>
      )}

      <div className="case-browser-layout mt-5 xl:grid xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] xl:items-start xl:gap-8">
        <div className="border-t border-[#ddd]">
          {filteredProjects.map((project) => {
            const content = projectContent(project, lang);
            const isActive = project.slug === activeProject?.slug;
            const number = String(projects.findIndex((item) => item.id === project.id) + 1).padStart(2, '0');
            return (
              <a
                key={project.id}
                href={projectHref(withBase, project.slug)}
                onPointerEnter={(event) => { if (event.pointerType === 'mouse') setActiveSlug(project.slug); }}
                onFocusCapture={() => setActiveSlug(project.slug)}
                data-active={isActive ? 'true' : 'false'}
                className={`case-row group grid grid-cols-[72px_minmax(0,1fr)_14px] items-start gap-3 border-b border-[#e5e5e5] px-2 py-4 transition-colors sm:grid-cols-[24px_92px_minmax(0,1fr)_18px] sm:px-4 sm:py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#CFAF6B] ${isActive ? 'bg-[#fbf8ef]' : 'bg-white hover:bg-[#fdfbf6]'}`}
              >
                <span className="hidden sm:block pt-1 text-[10px] font-semibold tracking-[0.12em] text-[#CFAF6B]">{number}</span>
                <ProjectImage image={project.media.thumbnail} usage="thumbnail" lang={lang} withBase={withBase} className="aspect-[4/3] w-full rounded-lg object-cover" fallbackClassName="aspect-[4/3] w-full rounded-lg" />
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9A7B4F]">{categoryLabel(categories, project.primaryCategory, lang)}</span>
                  <span className="mt-1 block text-sm font-semibold leading-5 text-[#111] sm:text-base sm:leading-6">{content?.title || copy.unavailable}</span>
                  {content ? (
                    <>
                      {projectMeta(project, categories, lang).slice(1).length > 0 && <span className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#777]">{projectMeta(project, categories, lang).slice(1).map((item) => <span key={item}>{item}</span>)}</span>}
                      <span className="mt-2 block text-sm leading-6 text-[#555]">{content.summary}</span>
                    </>
                  ) : (
                    <span className="mt-2 block text-xs leading-5 text-[#777]">{copy.available}: {availableLanguageLabels(project, lang).join(' · ')}</span>
                  )}
                </span>
                <span aria-hidden="true" className="pt-1 text-[#9A7B4F] transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="sr-only">{copy.open}</span>
              </a>
            );
          })}
        </div>
        <div className="case-preview-column hidden xl:block" aria-live="polite" aria-atomic="true">
          <ProjectPreview project={activeProject} categories={categories} lang={lang} withBase={withBase} />
        </div>
      </div>
    </div>
  );
}
