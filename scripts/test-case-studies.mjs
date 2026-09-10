import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { CASE_CATEGORIES, loadCaseStudies, validateCaseStudy } from './case-studies-lib.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'va-case-tests-'));
const contentDir = path.join(root, 'public/case-studies');
const language = (ready = true) => ready ? {
  ready: true, title: 'Project title', summary: 'Project summary', role: 'Production',
  context: 'Project background', deliverables: ['Content'], outcomes: ['Project output'],
} : { ready: false };
const project = (overrides = {}) => ({
  id: 'project-one', slug: 'project-one', status: 'published', sortOrder: 10,
  primaryCategory: 'product-content', services: [],
  languages: { zh: language(), en: language(false) },
  media: { cover: { src: '/case-studies/project-one/cover.jpg', alt: { zh: '封面', en: '' } }, gallery: [] },
  ...overrides,
});
const write = (folder, value) => {
  const dir = path.join(contentDir, folder);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'cover.jpg'), 'fixture');
  fs.writeFileSync(path.join(dir, 'content.json'), JSON.stringify(value));
};
const removeContent = (folder) => fs.unlinkSync(path.join(contentDir, folder, 'content.json'));

try {
  assert.deepEqual(loadCaseStudies({ root }), []);
  write('project-one', project());
  let loaded = loadCaseStudies({ root });
  assert.equal(loaded.length, 1);
  assert.equal(loaded[0].languages.en.ready, false);
  assert.equal(loaded[0].languages.zh.context, 'Project background');
  assert.deepEqual(loaded[0].languages.zh.outcomes, ['Project output']);
  assert.equal(loaded[0].media.hero.src, loaded[0].media.cover.src);

  const display = { thumbnail: { ratio: '4 / 5', fit: 'cover', position: '50% 15%' }, preview: { ratio: '2 / 3', fit: 'contain' } };
  const editorial = project({ languages: { zh: { ...language(), preview: 'Distinct preview', narrativeSections: [{ heading: 'Production', text: 'Project detail' }] }, en: language(false) }, media: { cover: { src: '/case-studies/project-one/cover.jpg', display }, gallery: [] } });
  write('project-one', editorial);
  loaded = loadCaseStudies({ root });
  assert.equal(loaded[0].languages.zh.preview, 'Distinct preview');
  assert.deepEqual(loaded[0].media.cover.display, display);
  assert.equal(loaded[0].languages.zh.narrativeSections[0].heading, 'Production');
  for (const config of [{ fit: 'stretch', ratio: '4 / 3' }, { fit: 'cover', ratio: '0 / 3' }, { fit: 'contain', ratio: '4 / 0' }, { fit: 'cover', ratio: '4 / 3', position: 'top-ish' }]) {
    assert.match(validateCaseStudy(project({ media: { cover: { src: '/case-studies/project-one/cover.jpg', display: { thumbnail: config } }, gallery: [] } }), { root }).join('\n'), /requires a valid fit/);
  }
  assert.match(validateCaseStudy(project({ languages: { zh: { ...language(), preview: '' } } }), { root }).join('\n'), /preview must be/);
  assert.match(validateCaseStudy(project({ languages: { zh: { ...language(), narrativeSections: [{ heading: 'Incomplete' }] } } }), { root }).join('\n'), /narrativeSections must/);
  assert.match(validateCaseStudy(project({ languages: { zh: { ...language(), outcomes: 'Wrong type' } } }), { root }).join('\n'), /outcomes must/);
  assert.match(validateCaseStudy(project({ languages: { zh: { ...language(), role: '' } } }), { root }).join('\n'), /role is required/);
  assert.match(validateCaseStudy(project({ primaryCategory: 'invalid' }), { root }).join('\n'), /primaryCategory is invalid/);
  for (const src of ['/case-studies/project-one/missing.jpg', '/case-studies/project-two/cover.jpg', '/case-studies/project-one/../private.jpg', '/case-studies/project-one/%2e%2e/private.jpg']) {
    assert.ok(validateCaseStudy(project({ media: { cover: { src } } }), { root }).length, `invalid path accepted: ${src}`);
  }
  for (const extra of [{ review: {} }, { internal: 'Private' }, { sources: ['Internal source URL'] }, { factsConfirmed: true }]) {
    assert.match(validateCaseStudy(project(extra), { root }).join('\n'), /not a public field/);
  }
  assert.match(validateCaseStudy(project({ languages: { zh: { ...language(), sources: ['private'] } } }), { root }).join('\n'), /not a public field/);
  assert.match(validateCaseStudy(project({ languages: { zh: language(), en: { ready: false, title: 'Unpublished translation' } } }), { root }).join('\n'), /keep unpublished translations outside public/);
  assert.match(validateCaseStudy(project({ media: { cover: { src: '/case-studies/project-one/cover.jpg' }, notes: 'private' } }), { root }).join('\n'), /not a public field/);

  write('project-two', project({ id: 'project-two', slug: 'project-two', sortOrder: 5, primaryCategory: 'fashion-week', media: { cover: { src: '/case-studies/project-two/cover.jpg' } } }));
  assert.deepEqual(loadCaseStudies({ root }).map(({ id }) => id), ['project-two', 'project-one']);
  const draftDir = path.join(root, 'src/content/case-drafts/draft-one');
  fs.mkdirSync(draftDir, { recursive: true });
  fs.writeFileSync(path.join(draftDir, 'content.json'), JSON.stringify(project({ id: 'draft-one', slug: 'draft-one', status: 'draft' })));
  assert.equal(loadCaseStudies({ root }).length, 2, 'non-public drafts must not enter the site');
  write('draft-one', project({ id: 'draft-one', slug: 'draft-one', status: 'draft' }));
  assert.throws(() => loadCaseStudies({ root }), /draft content must be kept outside public/, 'a public draft is a privacy error, not merely a hidden row');
  removeContent('draft-one');
  write('duplicate', project());
  assert.throws(() => loadCaseStudies({ root }), /duplicate id/);
  assert.throws(() => loadCaseStudies({ root }), /duplicate slug/);
  removeContent('duplicate');
  write('wrong-folder', project({ id: 'wrong-folder' }));
  assert.throws(() => loadCaseStudies({ root }), /folder must match slug/);
  removeContent('wrong-folder');
  write('invalid', null);
  assert.throws(() => loadCaseStudies({ root }), /root value must be an object/);
  removeContent('invalid');
  fs.writeFileSync(path.join(contentDir, 'invalid/content.json'), '{');
  assert.throws(() => loadCaseStudies({ root }), /invalid JSON/);

  const live = loadCaseStudies();
  assert.ok(live.every((p) => p.status === 'published'));
  assert.equal(new Set(live.map((p) => p.slug)).size, live.length);
  assert.ok(live.every((p) => CASE_CATEGORIES[p.primaryCategory]));
  const hashes = (p) => new Set([p.media.cover, p.media.hero, p.media.thumbnail, ...p.media.gallery].map((image) => crypto.createHash('sha256').update(fs.readFileSync(path.resolve('public', image.src.slice(1)))).digest('hex')));
  const wang = live.find((p) => p.slug === 'wang-qing-london-fashion-week-2025');
  const qinglian = live.find((p) => p.slug === 'qinglian-london-fashion-week-2025');
  if (wang && qinglian) assert.ok([...hashes(wang)].every((hash) => !hashes(qinglian).has(hash)), 'Wang Qing and Qinglian must not share image assets');
  console.log(`Case tests passed: public-only schema, nested loading, drafts, languages, media, sorting, invalid inputs, duplicate identities; ${live.length} live cases and talent asset isolation.`);
} finally {
  const resolved = path.resolve(root);
  if (!resolved.startsWith(`${path.resolve(os.tmpdir())}${path.sep}va-case-tests-`)) throw new Error('Unsafe test cleanup path');
  fs.rmSync(resolved, { recursive: true, force: true });
}
