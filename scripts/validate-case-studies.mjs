import { loadCaseStudies } from './case-studies-lib.mjs';

const projects = loadCaseStudies({ root: process.cwd() });
console.log(`Case study validation passed. ${projects.length} published project(s) will be included in the production build.`);
