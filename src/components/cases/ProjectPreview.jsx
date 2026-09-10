import ProjectImage from './ProjectImage.jsx';
import { availableLanguageLabels, categoryLabel, projectContent, projectHref, projectMeta } from './caseStudyUtils.js';

export default function ProjectPreview({ project, categories, lang, withBase }) {
  if (!project) return null;
  const content = projectContent(project, lang);
  const copy = lang === 'zh' ? {
    unavailable: '该项目暂未提供中文版本。',
    available: '可用语言',
    role: '我们的角色',
    view: '查看项目',
  } : {
    unavailable: 'This project is not yet available in English.',
    available: 'Available in',
    role: 'Our Role',
    view: 'View Project',
  };

  return (
    <article className="case-preview overflow-hidden rounded-2xl border border-[#eee] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.06)]" data-project={project.slug} data-portrait={project.media.cover?.width / project.media.cover?.height < 0.9 ? 'true' : 'false'}>
      <div className="case-preview-media" key={project.slug}>
        <ProjectImage image={project.media.cover} usage="preview" lang={lang} withBase={withBase} loading="eager" className="case-preview-image" fallbackClassName="h-full w-full" />
      </div>
      <div className="case-preview-heading p-6" key={`${project.slug}-${lang}-heading`}>
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A7B4F]">{categoryLabel(categories, project.primaryCategory, lang)}</div>
        {content && <>
            <h3 className="mt-2 text-xl font-semibold leading-snug text-[#111]">{content.title}</h3>
            {projectMeta(project, categories, lang).slice(1).length > 0 && (
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#777]">
                {projectMeta(project, categories, lang).slice(1).map((item) => <span key={item}>{item}</span>)}
              </div>
            )}
        </>}
      </div>
      <div className="case-preview-copy px-6 pb-6" key={`${project.slug}-${lang}`}>
        {content ? (
          <>
            <p className="text-sm leading-6 text-[#555]">{content.preview || content.summary}</p>
            <div className="mt-4 border-t border-[#eee] pt-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9A7B4F]">{copy.role}</div>
              <p className="mt-2 text-sm leading-6 text-[#444]">{content.role}</p>
            </div>
          </>
        ) : (
          <div className="mt-3 rounded-xl bg-[#fbfaf7] p-4 text-sm leading-6 text-[#555]">
            <p>{copy.unavailable}</p>
            <p className="mt-1 text-xs text-[#777]">{copy.available}: {availableLanguageLabels(project, lang).join(' · ')}</p>
          </div>
        )}
        <a href={projectHref(withBase, project.slug)} className="group mt-5 inline-flex items-center gap-2 border-b border-[#E6CF9A] pb-1 text-sm font-medium text-[#8B7048] transition-colors hover:border-[#9A7B4F] hover:text-[#6F5737] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAF6B] focus-visible:ring-offset-4">
          {copy.view}<span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}
