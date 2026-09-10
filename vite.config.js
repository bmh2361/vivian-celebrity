import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, sep } from 'path';
import { CASE_CATEGORIES, loadCaseStudies } from './scripts/case-studies-lib.mjs';

// Compute base for GitHub Pages automatically
const explicitBase = process.env.VITE_BASE; // e.g. "/repo-name/"
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : undefined;
const autoPagesBase = process.env.GITHUB_ACTIONS && repo ? `/${repo}/` : '/';
const base = explicitBase || autoPagesBase;

const virtualCaseStudiesId = 'virtual:case-studies';
const resolvedVirtualCaseStudiesId = `\0${virtualCaseStudiesId}`;

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
