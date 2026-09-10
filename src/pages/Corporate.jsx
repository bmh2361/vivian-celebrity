import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../layout/Layout.jsx';
import { caseStudies, caseStudyCategories } from 'virtual:case-studies';
import ProjectIndex from '../components/cases/ProjectIndex.jsx';
import '../index.css';

export default function Corporate() {
  const { lang } = useLang();
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;
  const copy = {
    zh: {
      heroTitle: '企业策划案例',
      heroSub: '时装周 · 产品内容 · 演出 · 品牌与文化活动',
      heroDesc: '从人物与产品内容，到舞台演出、品牌发布和文化交流，记录不同项目中的制作与执行。',
      caseTitle: '精选项目',
      caseDesc: '按项目类型浏览制作、协作与交付。',
    },
    en: {
      heroTitle: 'Commercial Case Studies',
      heroSub: 'Fashion Week · Product Content · Performance · Events',
      heroDesc: 'Selected work across talent and product content, live performance, brand launches and cultural events.',
      caseTitle: 'Selected Work',
      caseDesc: 'Explore the production, collaboration and delivery behind each project.',
    },
  };
  const t = copy[lang] || copy.zh;
  useEffect(() => {
    if (window.location.hash === '#selected-projects') {
      document.getElementById('selected-projects')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, []);
  useEffect(() => {
    document.title = `${t.heroTitle} · Vivian Adventure`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = t.heroDesc;
  }, [t.heroTitle, t.heroDesc]);

  return (
    <div className="layout-wide max-w-7xl mx-auto px-6 py-12 space-y-12">
      <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-2xl border border-[#eee] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(207,175,107,0.18)] to-transparent" />
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#111]">{t.heroTitle}</h1>
        <p className="text-[#9A7B4F] mt-2 font-medium">{t.heroSub}</p>
        <p className="mt-3 text-[#555] leading-7 break-words">{t.heroDesc}</p>
      </motion.section>
      <section id="selected-projects" className="scroll-mt-24">
        <h2 className="text-xl md:text-2xl font-bold text-[#111]">{t.caseTitle}</h2>
        <p className="text-[#666] mt-2 break-words">{t.caseDesc}</p>
        <ProjectIndex projects={caseStudies} categories={caseStudyCategories} lang={lang} withBase={withBase} />
      </section>
    </div>
  );
}
