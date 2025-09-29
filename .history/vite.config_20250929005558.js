import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Compute base for GitHub Pages automatically
const explicitBase = process.env.VITE_BASE; // e.g. "/repo-name/"
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : undefined;
const autoPagesBase = process.env.GITHUB_ACTIONS && repo ? `/${repo}/` : '/';
const base = explicitBase || autoPagesBase;

export default defineConfig({
	base,
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
				home: resolve(__dirname, 'pages/home.html'),
				makeup: resolve(__dirname, 'pages/makeup.html'),
				photography: resolve(__dirname, 'pages/photography.html'),
				bespoke: resolve(__dirname, 'pages/bespoke.html'),
				portfolio: resolve(__dirname, 'pages/portfolio.html'),
				about: resolve(__dirname, 'pages/about.html'),
				contact: resolve(__dirname, 'pages/contact.html'),
				models: resolve(__dirname, 'pages/models.html'),
				culture: resolve(__dirname, 'pages/culture.html'),
				members: resolve(__dirname, 'pages/members.html')
			}
		}
	}
});
