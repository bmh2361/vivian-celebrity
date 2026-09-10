import fs from 'node:fs';
import path from 'node:path';

export const CASE_CATEGORIES = {
  'fashion-week': { zh: '时装周项目', en: 'Fashion Week Projects' },
  'product-content': { zh: '产品内容', en: 'Product Content' },
  'live-performance': { zh: '现场演出', en: 'Live Performance' },
  'brand-cultural-events': { zh: '品牌与文化活动', en: 'Brand & Cultural Events' },
};

const LANGUAGE_KEYS = ['zh', 'en'];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PUBLIC_FIELDS = ['id', 'slug', 'status', 'sortOrder', 'primaryCategory', 'year', 'date', 'location', 'services', 'languages', 'media'];
const CONTENT_FIELDS = ['ready', 'title', 'summary', 'preview', 'role', 'context', 'brief', 'approach', 'narrativeSections', 'deliverables', 'outcomes', 'publicEventOutcome', 'ourMeasuredImpact', 'credits'];
const IMAGE_FIELDS = ['src', 'alt', 'caption', 'width', 'height', 'focalPoint', 'display', 'sources'];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function checkFields(value, allowed, label, errors) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    errors.push(`${label} must be an object`);
    return;
  }
  for (const field of Object.keys(value)) {
    if (!allowed.includes(field)) errors.push(`${label}.${field} is not a public field`);
  }
}

function validateMediaPath(root, value, slug, label, errors) {
  const prefix = `/case-studies/${slug}/`;
  if (!isNonEmptyString(value) || !value.startsWith(prefix) || value.includes('..') || value.includes('\\') || /[?#%]/.test(value)) {
    errors.push(`${label} must use ${prefix} without traversal, query or encoded paths`);
    return;
  }
  const resolved = path.resolve(root, 'public', value.slice(1));
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) errors.push(`${label} does not resolve to a file in public/`);
}

export function validateCaseStudy(project, { root = process.cwd(), source = 'case study' } = {}) {
  const errors = [];
  if (!project || typeof project !== 'object' || Array.isArray(project)) return [`${source}: root value must be an object`];
  checkFields(project, PUBLIC_FIELDS, 'project', errors);
  if (!isNonEmptyString(project.id)) errors.push('id is required');
  if (!isNonEmptyString(project.slug) || !SLUG_PATTERN.test(project.slug)) errors.push('slug must use lowercase letters, numbers and hyphens');
  if (!['draft', 'published'].includes(project.status)) errors.push('status must be draft or published');
  if (!Number.isFinite(project.sortOrder)) errors.push('sortOrder must be a number');
  if (!Object.hasOwn(CASE_CATEGORIES, project.primaryCategory)) errors.push('primaryCategory is invalid');
  if (!Array.isArray(project.services) || project.services.some((item) => !isNonEmptyString(item))) errors.push('services must be an array of non-empty strings');

  if (project.status === 'published') {
    checkFields(project.languages, LANGUAGE_KEYS, 'languages', errors);
    const readyLanguages = LANGUAGE_KEYS.filter((key) => project.languages?.[key]?.ready === true);
    if (readyLanguages.length === 0) errors.push('at least one language must be ready before publishing');
    LANGUAGE_KEYS.forEach((key) => {
      const content = project.languages?.[key];
      if (!content) return;
      checkFields(content, CONTENT_FIELDS, `languages.${key}`, errors);
      if (!content.ready) {
        if (Object.keys(content).some((field) => field !== 'ready')) errors.push(`languages.${key}: keep unpublished translations outside public`);
        return;
      }
      ['title', 'summary', 'role'].forEach((field) => {
        if (!isNonEmptyString(content[field])) errors.push(`languages.${key}.${field} is required when ready`);
      });
      if (content.preview != null && !isNonEmptyString(content.preview)) errors.push(`languages.${key}.preview must be a non-empty string`);
      if (content.narrativeSections != null) {
        if (!Array.isArray(content.narrativeSections)) errors.push(`languages.${key}.narrativeSections must contain headings and text`);
        else content.narrativeSections.forEach((section) => {
          checkFields(section, ['heading', 'text'], 'narrativeSections', errors);
          if (!isNonEmptyString(section?.heading) || !isNonEmptyString(section?.text)) errors.push(`languages.${key}.narrativeSections must contain headings and text`);
        });
      }
      for (const field of ['deliverables', 'outcomes', 'credits']) {
        if (field !== 'deliverables' && content[field] == null) continue;
        if (!Array.isArray(content[field]) || (field === 'deliverables' && !content[field].length) || content[field].some((item) => !isNonEmptyString(item))) errors.push(`languages.${key}.${field} must contain text items`);
      }
    });
    checkFields(project.media, ['cover', 'hero', 'thumbnail', 'gallery', 'layoutFamily', 'layoutVariant'], 'media', errors);
    validateMediaPath(root, project.media?.cover?.src, project.slug, 'media.cover.src', errors);
    if (project.media?.gallery != null && !Array.isArray(project.media.gallery)) errors.push('media.gallery must be an array');
    const gallery = Array.isArray(project.media?.gallery) ? project.media.gallery : [];
    [project.media?.cover, project.media?.hero, project.media?.thumbnail, ...gallery].filter(Boolean).forEach((image) => {
      checkFields(image, IMAGE_FIELDS, 'image', errors);
      validateMediaPath(root, image.src, project.slug, 'image.src', errors);
      for (const field of ['alt', 'caption']) if (image[field]) checkFields(image[field], LANGUAGE_KEYS, `image.${field}`, errors);
      for (const [usage, config] of Object.entries(image.display || {})) {
        checkFields(config, ['fit', 'ratio', 'position'], `media.display.${usage}`, errors);
        if (!['thumbnail', 'preview', 'hero', 'gallery'].includes(usage) || !config || !['cover', 'contain'].includes(config.fit) || !/^\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?$/.test(config.ratio || '') || config.ratio.split('/').some((value) => Number(value) <= 0) || (config.position != null && !/^\d+(?:\.\d+)?% \d+(?:\.\d+)?%$/.test(config.position))) errors.push(`media.display.${usage} requires a valid fit, positive ratio and optional percentage position`);
      }
      if (image.sources != null && !Array.isArray(image.sources)) errors.push('image.sources must be an array');
      (Array.isArray(image.sources) ? image.sources : []).forEach((item) => {
        checkFields(item, ['srcSet', 'media', 'type'], 'image.sources', errors);
        validateMediaPath(root, item?.srcSet, project.slug, 'image.sources.srcSet', errors);
      });
    });
  }
  return errors.map((message) => `${source}: ${message}`);
}

export function loadCaseStudies({ root = process.cwd() } = {}) {
  const directory = path.resolve(root, 'public/case-studies');
  if (!fs.existsSync(directory)) return [];
  const records = fs.readdirSync(directory, { withFileTypes: true }).filter((entry) => entry.isDirectory())
    .map((entry) => ({ folder: entry.name, source: path.join(directory, entry.name, 'content.json') }))
    .filter(({ source }) => fs.existsSync(source))
    .map((record) => {
      try { return { ...record, project: JSON.parse(fs.readFileSync(record.source, 'utf8')) }; }
      catch (error) { throw new Error(`${record.source}: invalid JSON (${error.message})`); }
    });
  const errors = records.flatMap(({ project, source, folder }) => [
    ...validateCaseStudy(project, { root, source }),
    ...(project?.status === 'draft' ? [`${source}: draft content must be kept outside public in src/content/case-drafts/`] : []),
    ...(project?.slug !== folder ? [`${source}: folder must match slug`] : []),
  ]);
  for (const field of ['id', 'slug']) {
    const seen = new Set();
    for (const { project, source } of records) {
      if (seen.has(project?.[field])) errors.push(`${source}: duplicate ${field}`);
      seen.add(project?.[field]);
    }
  }
  if (errors.length) throw new Error(`Case study validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
  return records.map(({ project }) => ({
    ...project,
    media: {
      ...project.media,
      hero: project.media.hero || project.media.cover,
      thumbnail: project.media.thumbnail || project.media.cover,
      gallery: project.media.gallery || [],
      layoutFamily: project.media.layoutFamily || 'wide',
    },
  })).filter((project) => project.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id));
}
