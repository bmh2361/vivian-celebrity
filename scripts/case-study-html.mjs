function escapeHtml(value) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value).replace(/[&<>"']/g, (character) => entities[character]);
}

export function renderCaseStudyHtml(template, project, { base, origin }) {
  const content = project.languages.en;
  const cover = project.media.share || project.media.cover;
  const url = new URL(`${base}case-studies/${project.slug}/`, origin).href;
  const image = new URL(`${base}${cover.src.slice(1)}`, origin).href;
  const meta = (attribute, key, value) => `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  const metadata = [
    meta('name', 'project-slug', project.slug),
    meta('name', 'description', content.seo.description),
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    meta('property', 'og:type', 'article'),
    meta('property', 'og:site_name', 'Vivian Adventure'),
    meta('property', 'og:locale', 'en_GB'),
    meta('property', 'og:title', content.seo.title),
    meta('property', 'og:description', content.seo.description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', image),
    meta('property', 'og:image:width', cover.width),
    meta('property', 'og:image:height', cover.height),
    meta('property', 'og:image:alt', cover.alt.en),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', content.seo.title),
    meta('name', 'twitter:description', content.seo.description),
    meta('name', 'twitter:image', image),
    meta('name', 'twitter:image:alt', cover.alt.en),
  ];
  return template.replace(/<html lang="[^"]*">/, '<html lang="en-GB">')
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(content.seo.title)}</title>\n\t\t${metadata.join('\n\t\t')}`);
}
