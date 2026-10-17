import { useEffect } from 'react';
import { caseStudies, caseStudyCategories } from 'virtual:case-studies';
import { useLang } from '../layout/Layout.jsx';
import ProjectImage from '../components/cases/ProjectImage.jsx';
import { availableLanguageLabels, categoryLabel, localizedMediaText, projectContent } from '../components/cases/caseStudyUtils.js';
import '../index.css';
import './project-detail.css';

function TextSection({ title, children }) {
  if (!children || (Array.isArray(children) && children.length === 0)) return null;
  return (
    <section className="project-detail-text-section">
      <h2>{title}</h2>
      {Array.isArray(children) ? <ul>{children.map((item) => <li key={item}>{item}</li>)}</ul> : <p>{children}</p>}
    </section>
  );
}

function ProjectFigure({ image, lang, withBase, className = '', usage = 'gallery' }) {
  const caption = localizedMediaText(image, 'caption', lang);
  return (
    <figure className={`project-detail-figure ${className}`} style={{ '--detail-image-ratio': image.width / image.height }}>
      <div className="project-detail-frame">
        <ProjectImage image={image} usage={usage} lang={lang} withBase={withBase} className="project-detail-image" fallbackClassName="project-detail-image-fallback" loading={usage === 'hero' ? 'eager' : 'lazy'} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default function ProjectDetail() {
  const { lang } = useLang();
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;
  const slug = new URLSearchParams(window.location.search).get('slug') || document.querySelector('meta[name="project-slug"]')?.content || '';
  const project = caseStudies.find((item) => item.slug === slug) || null;
  const content = projectContent(project, lang);
  const copy = lang === 'zh' ? {
    back: '企业策划案例',
    unavailableTitle: '项目暂不可用',
    unavailableText: '该项目不存在、尚未发布，或当前不可公开访问。',
    languageUnavailable: '该项目暂未提供中文版本。',
    available: '可用语言',
    role: '我们的角色',
    overview: '项目简介',
    services: '服务范围',
    context: '项目背景',
    brief: '项目要求',
    approach: '执行方式',
    deliverables: '项目交付',
    gallery: '精选影像',
    outcomes: '项目成果',
    eventOutcome: '活动层面结果',
    measuredImpact: '我方可归因效果',
    credits: '合作与署名',
    year: '年份',
    location: '地点',
    skip: '跳至项目正文',
  } : {
    back: 'Commercial Case Studies',
    unavailableTitle: 'Project unavailable',
    unavailableText: 'This project does not exist, is not published, or is not currently available for public access.',
    languageUnavailable: 'This project is not yet available in English.',
    available: 'Available in',
    role: 'Our Role',
    overview: 'Project Overview',
    services: 'Services',
    context: 'Project Context',
    brief: 'The Brief',
    approach: 'Our Approach',
    deliverables: 'Deliverables',
    gallery: 'Project Gallery',
    outcomes: 'Outcomes',
    eventOutcome: 'Event-level Outcome',
    measuredImpact: 'Our Attributable Impact',
    credits: 'Credits',
    year: 'Year',
    location: 'Location',
    skip: 'Skip to project content',
  };
  const backHref = withBase('/pages/corporate.html#selected-projects');

  useEffect(() => {
    document.title = content?.seo?.title || (content?.title ? `${content.title} · Vivian Adventure` : `${copy.unavailableTitle} · Vivian Adventure`);
    if (!content?.seo) return;
    const metadata = {
      'meta[name="description"]': content.seo.description,
      'meta[property="og:title"]': content.seo.title,
      'meta[property="og:description"]': content.seo.description,
      'meta[property="og:locale"]': lang === 'zh' ? 'zh_CN' : 'en_GB',
      'meta[property="og:image:alt"]': localizedMediaText(project.media.cover, 'alt', lang),
      'meta[name="twitter:title"]': content.seo.title,
      'meta[name="twitter:description"]': content.seo.description,
      'meta[name="twitter:image:alt"]': localizedMediaText(project.media.cover, 'alt', lang),
    };
    for (const [selector, value] of Object.entries(metadata)) {
      const tag = document.querySelector(selector);
      if (tag) tag.content = value;
    }
  }, [content, copy.unavailableTitle, lang, project]);

  if (!project || !content) {
    return (
      <article className="project-detail project-detail-unavailable" lang={lang === 'zh' ? 'zh-CN' : 'en-GB'}>
        <a href={backHref} className="project-detail-back"><span aria-hidden="true">←</span> {copy.back}</a>
        <section>
          <h1>{project ? copy.languageUnavailable : copy.unavailableTitle}</h1>
          <p>{project ? `${copy.available}: ${availableLanguageLabels(project, lang).join(' · ')}` : copy.unavailableText}</p>
        </section>
      </article>
    );
  }

  const [title, subtitle] = content.title.split(/\s*[|｜]\s*/, 2);
  const hero = project.media.hero || project.media.cover;
  const gallery = project.media.gallery.filter((image) => image.src !== hero.src);
  const storySections = [
    ...(content.brief ? [{ heading: copy.brief, text: content.brief }] : []),
    ...(content.approach ? [{ heading: copy.approach, text: content.approach }] : []),
    ...(content.narrativeSections || []),
  ];
  const remainingGallery = gallery.slice(storySections.length);

  return (
    <article className="project-detail" data-project={project.slug} lang={lang === 'zh' ? 'zh-CN' : 'en-GB'}>
      <a href="#project-content" className="project-detail-skip">{copy.skip}</a>
      <a href={backHref} className="project-detail-back"><span aria-hidden="true">←</span> {copy.back}</a>

      <div className="project-detail-hero">
        <header className="project-detail-heading">
          <p className="project-detail-category">{categoryLabel(caseStudyCategories, project.primaryCategory, lang)}</p>
          <h1><span>{title}</span>{subtitle && <span className="project-detail-subtitle">{subtitle}</span>}</h1>
          <p className="project-detail-lead">{content.overview ? content.role : content.summary}</p>
          {(project.year || project.date || project.location) && (
            <dl className="project-detail-meta">
              {(project.year || project.date) && <div><dt>{copy.year}</dt><dd>{project.year || project.date}</dd></div>}
              {project.location && <div><dt>{copy.location}</dt><dd>{project.location}</dd></div>}
            </dl>
          )}
        </header>
        <ProjectFigure image={hero} usage="hero" lang={lang} withBase={withBase} className="project-detail-hero-media" />
      </div>

      <div id="project-content" className="project-detail-content" tabIndex={-1}>
        <div className="project-detail-brief">
          <TextSection title={content.overview ? copy.overview : copy.context}>{content.overview || content.context}</TextSection>
          <aside className="project-detail-scope">
            {!content.overview && <TextSection title={copy.role}>{content.role}</TextSection>}
            <TextSection title={content.overview ? copy.services : copy.deliverables}>{content.deliverables}</TextSection>
          </aside>
        </div>

        {storySections.length > 0 && (
          <div className="project-detail-story">
            {storySections.map((section, index) => (
              <section key={section.heading} className="project-detail-story-row" data-illustrated={gallery[index] ? 'true' : 'false'}>
                <div className="project-detail-story-copy">
                  <h2>{section.heading}</h2>
                  <p>{section.text}</p>
                </div>
                {gallery[index] && <ProjectFigure image={gallery[index]} lang={lang} withBase={withBase} />}
              </section>
            ))}
          </div>
        )}

        {remainingGallery.length > 0 && (
          <section className="project-detail-gallery-section">
            <header className="project-detail-section-heading">
              <h2>{content.galleryHeading || copy.gallery}</h2>
              {content.galleryIntroduction && <p>{content.galleryIntroduction}</p>}
            </header>
            <div className="project-detail-gallery" data-single={remainingGallery.length === 1 ? 'true' : 'false'}>
              {remainingGallery.map((image) => <ProjectFigure key={image.src} image={image} lang={lang} withBase={withBase} />)}
            </div>
          </section>
        )}

        {(content.outcomes?.length > 0 || content.publicEventOutcome || content.ourMeasuredImpact || content.credits?.length > 0) && (
          <div className="project-detail-results">
            <TextSection title={copy.outcomes}>{content.outcomes}</TextSection>
            <TextSection title={copy.eventOutcome}>{content.publicEventOutcome}</TextSection>
            <TextSection title={copy.measuredImpact}>{content.ourMeasuredImpact}</TextSection>
            <TextSection title={copy.credits}>{content.credits}</TextSection>
          </div>
        )}

        {content.inquiry && (
          <section className="project-detail-inquiry">
            <div><h2>{content.inquiry.heading}</h2><p>{content.inquiry.text}</p></div>
            <a href={withBase('/pages/contact.html?project=business')} className="project-detail-button">{content.inquiry.button}</a>
          </section>
        )}
      </div>

      <footer className="project-detail-footer">
        <a href={backHref} className="project-detail-back"><span aria-hidden="true">←</span> {copy.back}</a>
      </footer>
    </article>
  );
}
