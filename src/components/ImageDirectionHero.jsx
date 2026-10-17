import { motion, useReducedMotion } from 'framer-motion';
import '../pages/image-direction.css';

export const imageDirectionHeroCopy = {
  zh: {
    title: '形象美学',
    lead: '先理解你，\n再让形象有自己的表达。',
    intro: '你的气质、所处的场合与想传递的感受，共同决定形象的方向。Vivian Adventure 从人物出发，将妆发、服装、场景与镜头一起考虑，让现场的呈现与留下的内容相互呼应。',
    note: '妆发、造型、摄影与个人内容，均可独立委托；也可由我们统筹完整人物视觉。',
    alt: '人物依偎在苔藓与绿植旁的近景肖像',
  },
  en: {
    title: 'Image\nDirection',
    lead: 'The person comes first.',
    intro: 'How you want to be seen begins with who you are. From our London studio, we connect beauty, styling, setting and camera around your character, the occasion and the images you want to make.',
    note: 'Commission make-up, styling, photography or personal content individually, or bring them together through complete image direction.',
    alt: 'A close portrait beside moss and green foliage',
  },
};

export default function ImageDirectionHero({ lang, home = false }) {
  const t = imageDirectionHeroCopy[lang];
  const reduced = useReducedMotion();
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  const Title = home ? motion.h2 : motion.h1;
  const Lead = home ? 'h3' : 'h2';
  return (
    <header className="image-direction-hero">
      <div className="image-direction-heading"><p className="image-direction-eyebrow">Vivian Adventure / Private Clients / London</p><Title initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>{t.title}</Title></div>
      <motion.figure className="image-direction-hero-photo" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}><img src={`${base}/talent/hangphan/02.jpg`} width="918" height="1270" alt={t.alt} fetchpriority={home ? undefined : 'high'} loading={home ? 'lazy' : 'eager'} decoding="async" /></motion.figure>
      <motion.div className="image-direction-intro" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .1 }}><Lead>{t.lead}</Lead><p>{t.intro}</p><p className="image-direction-note">{t.note}</p></motion.div>
    </header>
  );
}
