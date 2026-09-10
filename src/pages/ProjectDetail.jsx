import { useEffect } from 'react';
import { caseStudies, caseStudyCategories } from 'virtual:case-studies';
import { useLang } from '../layout/Layout.jsx';
import ProjectImage from '../components/cases/ProjectImage.jsx';
import { availableLanguageLabels, categoryLabel, localizedMediaText, projectContent, projectMeta } from '../components/cases/caseStudyUtils.js';
import '../index.css';
import '../components/cases/cases.css';

function TextSection({ title, children }) {
  if (!children || (Array.isArray(children) && children.length === 0)) return null;
  return (
    <section className="border-t border-[#e8e8e8] pt-8">
      <h2 className="text-lg font-semibold text-[#111]">{title}</h2>
      {Array.isArray(children) ? (
        <ul className="mt-4 space-y-2 text-sm leading-7 text-[#555]">
          {children.map((item) => <li key={item} className="flex gap-3"><span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-[#CFAF6B]" /><span>{item}</span></li>)}
        </ul>
      ) : <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#555]">{children}</p>}
    </section>
  );
}

export default function ProjectDetail() {
  const { lang } = useLang();
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;
  const slug = new URLSearchParams(window.location.search).get('slug') || '';
  const project = caseStudies.find((item) => item.slug === slug) || null;
  const content = projectContent(project, lang);
  const copy = lang === 'zh' ? {
    back: '企业策划案例',
    unavailableTitle: '项目暂不可用',
    unavailableText: '该项目不存在、尚未发布，或当前不可公开访问。',
    languageUnavailable: '该项目暂未提供中文版本。',
    available: '可用语言',
    role: '我们的角色',
    context: '项目背景',
    brief: '项目要求',
    approach: '执行方式',
    deliverables: '项目交付',
    gallery: '精选影像',
    outcomes: '项目成果',
    eventOutcome: '活动层面结果',
    measuredImpact: '我方可归因效果',
    credits: '合作与署名',
  } : {
    back: 'Commercial Case Studies',
    unavailableTitle: 'Project unavailable',
    unavailableText: 'This project does not exist, is not published, or is not currently available for public access.',
    languageUnavailable: 'This project is not yet available in English.',
    available: 'Available in',
    role: 'Our Role',
    context: 'Project Context',
    brief: 'The Brief',
    approach: 'Our Approach',
    deliverables: 'Deliverables',
    gallery: 'Project Gallery',
    outcomes: 'Outcomes',
    eventOutcome: 'Event-level Outcome',
    measuredImpact: 'Our Attributable Impact',
    credits: 'Credits',
  };
  const backHref = withBase('/pages/corporate.html#selected-projects');

  useEffect(() => {
    document.title = content?.title ? `${content.title} · Vivian Adventure` : `${copy.unavailableTitle} · Vivian Adventure`;
  }, [content, copy.unavailableTitle]);

  if (!project) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-14 md:py-20">
        <a href={backHref} className="inline-flex border-b border-[#E6CF9A] pb-1 text-sm text-[#8B7048] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAF6B] focus-visible:ring-offset-4">← {copy.back}</a>
        <section className="mt-8 rounded-2xl border border-[#eee] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
          <h1 className="text-2xl font-bold text-[#111]">{copy.unavailableTitle}</h1>
          <p className="mt-3 text-sm leading-7 text-[#555]">{copy.unavailableText}</p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <a href={backHref} className="border-b border-[#E6CF9A] pb-1 text-[#8B7048]">{copy.back}</a>
          </div>
        </section>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-14 md:py-20">
        <a href={backHref} className="inline-flex border-b border-[#E6CF9A] pb-1 text-sm text-[#8B7048]">← {copy.back}</a>
        <section className="mt-8 rounded-2xl border border-[#eee] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
          <h1 className="text-2xl font-bold text-[#111]">{copy.languageUnavailable}</h1>
          <p className="mt-3 text-sm leading-7 text-[#555]">{copy.available}: {availableLanguageLabels(project, lang).join(' · ')}</p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <a href={backHref} className="border-b border-[#E6CF9A] pb-1 text-[#8B7048]">{copy.back}</a>
          </div>
        </section>
      </main>
    );
  }

  const secondaryMeta = projectMeta(project, caseStudyCategories, lang).slice(1);

  return (
    <main className="case-detail layout-wide mx-auto max-w-6xl px-6 py-12 md:py-16" lang={lang === 'zh' ? 'zh-CN' : 'en-GB'}>
      <a href={backHref} className="inline-flex border-b border-[#E6CF9A] pb-1 text-sm text-[#8B7048] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAF6B] focus-visible:ring-offset-4">← {copy.back}</a>

      <header className="mt-8 max-w-4xl">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7B4F]">{categoryLabel(caseStudyCategories, project.primaryCategory, lang)}</div>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[#111] md:text-5xl">{content.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#555]">{content.summary}</p>
        {secondaryMeta.length > 0 && <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#777]">{secondaryMeta.map((item) => <span key={item}>{item}</span>)}</div>}
        {content.narrativeSections?.length > 0 && content.context && <p className="mt-6 max-w-3xl text-sm leading-7 text-[#555]">{content.context}</p>}
      </header>

      <div className={`mt-10 grid items-start gap-8 ${project.media.layoutFamily === 'wide' ? '' : 'lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]'}`}>
        <ProjectImage image={project.media.hero || project.media.cover} lang={lang} withBase={withBase} className="case-detail-hero h-auto w-full rounded-2xl border border-[#eee] object-contain shadow-[0_8px_30px_rgba(0,0,0,0.06)]" fallbackClassName="aspect-[4/3] w-full rounded-2xl border border-[#eee]" loading="eager" />
        <aside className="rounded-2xl border border-[#eee] bg-white p-6 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A7B4F]">{copy.role}</div>
          <p className="mt-3 text-sm leading-7 text-[#444]">{content.role}</p>
          {project.services.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{project.services.map((service) => <span key={service} className="rounded-full border border-[#E6CF9A] px-3 py-1 text-xs text-[#6F5737]">{service}</span>)}</div>}
        </aside>
      </div>

      {content.narrativeSections?.length > 0 ? (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <section className="border-t border-[#e8e8e8] pt-8 md:col-span-2">
            <div className={`mt-5 grid gap-6 ${project.media.layoutFamily === 'single' ? '' : 'md:grid-cols-2'}`}>
              {content.narrativeSections.map((section) => (
                <article key={section.heading} className="py-2">
                  <h2 className="text-base font-semibold text-[#111]">{section.heading}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#555]">{section.text}</p>
                </article>
              ))}
            </div>
          </section>
          <TextSection title={copy.deliverables}>{content.deliverables}</TextSection>
          <TextSection title={copy.outcomes}>{content.outcomes}</TextSection>
          <TextSection title={copy.eventOutcome}>{content.publicEventOutcome}</TextSection>
          {content.ourMeasuredImpact && <TextSection title={copy.measuredImpact}>{content.ourMeasuredImpact}</TextSection>}
        </div>
      ) : (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <TextSection title={copy.context}>{content.context}</TextSection>
          <TextSection title={copy.brief}>{content.brief}</TextSection>
          <TextSection title={copy.approach}>{content.approach}</TextSection>
          <TextSection title={copy.deliverables}>{content.deliverables}</TextSection>
          <TextSection title={copy.outcomes}>{content.outcomes}</TextSection>
          <TextSection title={copy.credits}>{content.credits}</TextSection>
        </div>
      )}

      {project.media.gallery.length > 0 && (
        <section className="mt-14 border-t border-[#e8e8e8] pt-8">
          <h2 className="text-xl font-semibold text-[#111]">{copy.gallery}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {project.media.gallery.map((image) => (
              <figure key={image.src}>
                <ProjectImage image={image} lang={lang} withBase={withBase} className="case-gallery-image h-auto w-full rounded-xl border border-[#eee] object-contain" fallbackClassName="aspect-[4/3] w-full rounded-xl border border-[#eee]" />
                {localizedMediaText(image, 'caption', lang) && <figcaption className="mt-2 text-xs leading-5 text-[#777]">{localizedMediaText(image, 'caption', lang)}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}


      <div className="mt-12 border-t border-[#e8e8e8] pt-6">
        <a href={backHref} className="text-sm text-[#8B7048] underline decoration-[#E6CF9A] underline-offset-4">← {copy.back}</a>
      </div>
    </main>
  );
}
