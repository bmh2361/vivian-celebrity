export function projectContent(project, lang) {
  const content = project?.languages?.[lang];
  return content?.ready ? content : null;
}

export function availableLanguageLabels(project, lang) {
  const labels = lang === 'zh' ? { zh: '中文', en: '英文' } : { zh: 'Chinese', en: 'English' };
  return ['zh', 'en'].filter((key) => project?.languages?.[key]?.ready).map((key) => labels[key]);
}

export function categoryLabel(categories, key, lang) {
  return categories[key]?.[lang] || key;
}

export function projectMeta(project, categories, lang) {
  return [categoryLabel(categories, project.primaryCategory, lang), project.location, project.year || project.date].filter(Boolean);
}

export function projectHref(withBase, slug) {
  return withBase(`/pages/project.html?slug=${encodeURIComponent(slug)}`);
}

export function localizedMediaText(image, field, lang) {
  return image?.[field]?.[lang] || '';
}
