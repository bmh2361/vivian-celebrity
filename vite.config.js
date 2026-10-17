import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, sep } from 'path';
import { readFileSync } from 'node:fs';
import { CASE_CATEGORIES, loadCaseStudies } from './scripts/case-studies-lib.mjs';
import { renderCaseStudyHtml } from './scripts/case-study-html.mjs';

// Compute base for GitHub Pages automatically
const explicitBase = process.env.VITE_BASE; // e.g. "/repo-name/"
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : undefined;
const autoPagesBase = process.env.GITHUB_ACTIONS && repo ? `/${repo}/` : '/';
const base = explicitBase || autoPagesBase;

const virtualCaseStudiesId = 'virtual:case-studies';
const resolvedVirtualCaseStudiesId = `\0${virtualCaseStudiesId}`;
const siteOrigin = `https://${readFileSync(resolve(__dirname, 'CNAME'), 'utf8').trim()}`;

function caseStudiesPlugin() {
	return {
		name: 'vivian-case-studies',
		resolveId(id) {
			if (id === virtualCaseStudiesId) return resolvedVirtualCaseStudiesId;
		},
		load(id) {
			if (id !== resolvedVirtualCaseStudiesId) return;
			const projects = loadCaseStudies({ root: __dirname });
			return [
				`export const caseStudies = ${JSON.stringify(projects)};`,
				`export const caseStudyCategories = ${JSON.stringify(CASE_CATEGORIES)};`,
			].join('\n');
		},
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				const pathname = new URL(req.url, 'http://localhost').pathname;
				if (!/\/case-studies\/[^/]+\/(?:index\.html)?$/.test(pathname)) return next();
				try {
					const project = loadCaseStudies({ root: __dirname }).find((item) => item.languages.en?.seo && [
						`${server.config.base}case-studies/${item.slug}/`,
						`${server.config.base}case-studies/${item.slug}/index.html`,
					].includes(pathname));
					if (!project) return next();
					const template = readFileSync(resolve(__dirname, 'pages/project.html'), 'utf8');
					const html = renderCaseStudyHtml(template, project, { base: server.config.base, origin: siteOrigin });
					res.setHeader('Content-Type', 'text/html; charset=utf-8');
					res.end(await server.transformIndexHtml(`${server.config.base}pages/project.html`, html));
				} catch (error) { next(error); }
			});
			const directories = [resolve(__dirname, 'public/case-studies')];
			server.watcher.add(directories);
			const reloadCaseStudies = (file) => {
				if (!directories.some((directory) => resolve(file).startsWith(`${directory}${sep}`))) return;
				const module = server.moduleGraph.getModuleById(resolvedVirtualCaseStudiesId);
				if (module) server.moduleGraph.invalidateModule(module);
				server.ws.send({ type: 'full-reload' });
			};
			['add', 'change', 'unlink'].forEach((event) => server.watcher.on(event, reloadCaseStudies));
		},
		generateBundle: {
			order: 'post',
			handler(options, bundle) {
				const template = bundle['pages/project.html'].source;
				for (const project of loadCaseStudies({ root: __dirname }).filter((item) => item.languages.en?.seo)) {
					this.emitFile({
						type: 'asset',
						fileName: `case-studies/${project.slug}/index.html`,
						source: renderCaseStudyHtml(template, project, { base, origin: siteOrigin }),
					});
				}
			},
		},
	};
}

export default defineConfig({
	base,
	plugins: [react(), caseStudiesPlugin()],
	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
				home: resolve(__dirname, 'pages/home.html'),
				imageDirection: resolve(__dirname, 'pages/image-direction.html'),
				makeup: resolve(__dirname, 'pages/makeup.html'),
				photography: resolve(__dirname, 'pages/photography.html'),
				bespoke: resolve(__dirname, 'pages/bespoke.html'),
				corporate: resolve(__dirname, 'pages/corporate.html'),
				project: resolve(__dirname, 'pages/project.html'),
				portfolio: resolve(__dirname, 'pages/portfolio.html'),
				about: resolve(__dirname, 'pages/about.html'),
				contact: resolve(__dirname, 'pages/contact.html'),
				models: resolve(__dirname, 'pages/models.html'),
				culture: resolve(__dirname, 'pages/culture.html'),
				members: resolve(__dirname, 'pages/members.html'),
				talent: resolve(__dirname, 'talent/index.html'),
				business: resolve(__dirname, 'business/index.html')
			}
		}
	}
});
