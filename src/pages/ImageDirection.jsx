import '../index.css';
import './image-direction.css';
import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../layout/Layout.jsx';

const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
const copy = {
  zh: {
    title: '形象美学', lead: '先理解你，\n再让形象有自己的表达。',
    intro: '你的气质、所处的场合与想传递的感受，共同决定形象的方向。Vivian Adventure 从人物出发，将妆发、服装、场景与镜头一起考虑，让现场的呈现与留下的内容相互呼应。',
    note: '妆发、造型、摄影与个人内容，均可独立委托；也可由我们统筹完整人物视觉。',
    personLabel: '人物，是所有判断的起点。',
    personTitle: '让每一个决定，\n都有同一个出发点。',
    personText: '我们先了解你希望保留的特点、这次出现的场合，以及内容将用于哪里。以此确定形象方向，再安排妆发、衣橱搭配与拍摄。共同的参考让准备时的选择更清楚，也让现场调整有据可循。',
    personValue: '妆造适合实际光线，服装与镜头互相配合，成片回应最初的用途。从一次重要亮相，到后续的个人内容，形象可以保持自己的连续性。',
    scopeLabel: '我们如何塑造形象', scopeTitle: '从人物的细节，\n到完整的呈现。',
    capabilities: [
      ['妆发与造型', '妆容 · 发型 · 衣橱方向', '结合脸部结构、人物气质、服装比例和场合时长，确定妆感、发型与搭配。兼顾持妆与镜头表现，让外在呈现与本人相称。'],
      ['人物与镜头', '私人肖像 · 时尚摄影 · 场景方向', '从主题、取景与镜头清单，到摄影器材、灯光和现场节奏，把人物状态与内容用途落实为拍摄安排。伦敦及欧洲目的地可按行程组织轻量拍摄。'],
      ['个人视觉内容', '照片 · 短片 · 后期交付', '为个人品牌、艺人及 Creator 组织照片和短片。按委托范围完成脚本或分镜、拍摄协调、剪辑、调色、字幕与视觉包装，交付可实际使用的内容。'],
    ],
    occasionsLabel: '同一个人，不同的场合', occasionsTitle: '重要的，\n是出现时的分寸。',
    occasionsText: '毕业与重要活动、职业肖像与社交内容、时尚拍摄与红毯，各有需要回应的场合。我们据此调整妆造与影像的表达，而不让一个固定风格替你作答。',
    bridal: '婚礼前后的人物形象同样从本人出发：面向新娘与新郎，可安排试妆，并协调发型、礼服及拍摄。日常形象调整与秀场后台造型也可单独委托。',
    motionLabel: '人物，在静止与流动之间', motionTitle: '从一个形象，\n延伸出一组内容。',
    motionText: '照片与短片可以共享一个方向，也各有用途。拍摄前确认内容、画幅与版本，让准备、现场和后期围绕最终交付展开。',
    delivery: '小红书、抖音、TikTok 或 Instagram 的内容，可按需求准备不同画幅、中英文版本与发布建议。范围、时间和成片形式在开始前确认。',
    startTitle: '从你需要的部分开始。',
    startText: '已有摄影师，可以只委托妆发与造型；已有形象方向，也可以只安排摄影或个人内容。完整委托则由我们将方向、准备、现场与交付连贯组织。',
    steps: [
      ['先聊清楚', '围绕场合、想法、时间与预算，确认需要的环节与最终用途。'],
      ['再确定准备', '妆造确认参考、服装与可选试妆；拍摄确认场景、镜头和成片形式。'],
      ['按约定完成', '在现场执行并调整；包含影像的委托继续进行筛选与后期，按约定交付。'],
    ],
    practice: '人物方向也延伸至影视造型指导、短剧和短视频的视觉体系、跨团队沟通及多机位协调。品牌与产品的英国制作由 Commercial 承接。',
    boundary: '形象美学围绕人物与个人内容。私人场合中的花艺、空间、场景及特别制作，由 Bespoke 组织整体体验。',
    workLink: '查看精选作品', bespokeLink: '了解高端定制',
    alts: ['人物依偎在苔藓与绿植旁的近景肖像', '夜间灯光下穿黑色皮衣的人物', '伦敦眼与巴士旁穿黑色造型的人物', '浅色礼服人物在户外的肖像', '自然肤色妆容的人物近景'],
    captions: ['人物与造型', '人物与场景', '私人肖像', 'Beauty study'],
    videos: ['棕色丝绒造型人物短片', '刺绣造型人物短片'],
  },
  en: {
    title: 'Image\nDirection', lead: 'The person comes first.',
    intro: 'How you want to be seen begins with who you are. From our London studio, we connect beauty, styling, setting and camera around your character, the occasion and the images you want to make.',
    note: 'Commission make-up, styling, photography or personal content individually, or bring them together through complete image direction.',
    personLabel: 'A point of view, built around you.',
    personTitle: 'One direction.\nConsidered all the way through.',
    personText: 'We agree what the image needs to say before deciding on the look or the shoot. Your character, the setting and the intended use give everyone a shared reference, making choices clearer in preparation and refinements more considered on the day.',
    personValue: 'Beauty responds to the clothes and lighting. Photography builds on the styling. The finished content serves its purpose, with a sense of continuity from an appearance today to the personal imagery that follows.',
    scopeLabel: 'What we shape', scopeTitle: 'The details of a person.\nThe whole of an image.',
    capabilities: [
      ['Beauty & styling', 'Make-up · Hair · Wardrobe direction', 'Facial features, character, proportions and the occasion guide the skin finish, hair and clothes. Wear and camera presence are considered together, keeping the look connected to the person.'],
      ['Portrait & editorial', 'Portraits · Fashion photography · Location direction', 'Concepts, locations and shot lists guide the camera, lighting and pace of the shoot. The plan follows the person and the use of the images, with light travelling set-ups for London and European destinations.'],
      ['Personal content', 'Stills · Short-form films · Post-production', 'Imagery for personal brands, artists and creators. The brief can include scripts or storyboards, shoot coordination, editing, colour, subtitles and visual finishing, with clear deliverables to work towards.'],
    ],
    occasionsLabel: 'A person, in different settings', occasionsTitle: 'A look that understands the occasion.',
    occasionsText: 'Graduations, important events, professional portraits, social content and fashion or red-carpet appearances each ask something different of an image. The approach responds to that setting while keeping your character in view.',
    bridal: 'Wedding imagery follows the same thinking. Beauty for brides and grooms can include a trial and coordination across hair, attire and photography. Personal image changes and fashion backstage styling can also be commissioned independently.',
    motionLabel: 'Stills & motion', motionTitle: 'An image with\nmore than one expression.',
    motionText: 'Photographs and films can share a direction while serving different purposes. We agree the outputs, formats and versions before the shoot, so preparation and post-production work towards the same brief.',
    delivery: 'For Xiaohongshu, Douyin, TikTok or Instagram, we can prepare different aspect ratios, Chinese and English versions, and release guidance. Scope, timing and the finished formats are agreed at the outset.',
    startTitle: 'Choose where we come in.',
    startText: 'You may have a photographer and need beauty and styling, or already have a direction and want a shoot or personal content. For a complete commission, we connect the decisions from preparation through to delivery.',
    steps: [
      ['The conversation', 'Discuss the occasion, your ideas, timing and budget, then agree the work and where it will be used.'],
      ['The preparations', 'Confirm beauty references, clothes and any trial, or the locations, shots and outputs for a shoot.'],
      ['The agreed finish', 'Carry out and refine the work on the day. Image commissions continue through selection, post-production and delivery.'],
    ],
    practice: 'Our attention to character also informs film and television styling, short-form drama, visual systems, cross-team planning and multicamera coordination. UK production for brands and products sits within Commercial.',
    boundary: 'Image Direction centres on the person and their content. Bespoke develops the wider experience for private occasions, flowers, spaces, scene design and special productions.',
    workLink: 'View selected work', bespokeLink: 'Explore Bespoke',
    alts: ['A close portrait beside moss and green foliage', 'A portrait in a black leather look under evening lights', 'A portrait in black beside the London Eye and a bus', 'An outdoor portrait in a pale dress', 'A close beauty portrait with a natural palette'],
    captions: ['Person & styling', 'Person & place', 'Personal portrait', 'Beauty study'],
    videos: ['Personal film in a brown velvet look', 'Personal film in an embroidered look'],
  },
};

const photos = [
  { src: '/portfolio/11.jpg', width: 1080, height: 1813 },
  { src: '/portfolio/23.jpg', width: 1440, height: 1754 },
  { src: '/portfolio/previews/work-030-1600.webp', width: 4160, height: 6240 },
  { src: '/portfolio/previews/work-041-946.webp', width: 946, height: 1613 },
];

function Photo({ index, t }) {
  const photo = photos[index];
  return <figure className="image-direction-photo"><img src={`${base}${photo.src}`} width={photo.width} height={photo.height} alt={t.alts[index + 1]} loading="lazy" decoding="async" /><figcaption>{t.captions[index]}</figcaption></figure>;
}

export default function ImageDirection() {
  const { lang } = useLang();
  const t = copy[lang];
  const reduced = useReducedMotion();
  const reveal = { initial: reduced ? false : { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: .55 } };
  return <article className="image-direction layout-visual" lang={lang === 'zh' ? 'zh-CN' : 'en-GB'}>
    <header className="image-direction-hero">
      <div className="image-direction-heading"><p className="image-direction-eyebrow">Vivian Adventure / Private Clients / London</p><motion.h1 initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>{t.title}</motion.h1></div>
      <motion.figure className="image-direction-hero-photo" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}><img src={`${base}/talent/hangphan/02.jpg`} width="918" height="1270" alt={t.alts[0]} fetchPriority="high" loading="eager" decoding="async" /></motion.figure>
      <motion.div className="image-direction-intro" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .1 }}><h2>{t.lead}</h2><p>{t.intro}</p><p className="image-direction-note">{t.note}</p></motion.div>
    </header>
    <motion.section className="image-direction-person" {...reveal}><p className="image-direction-eyebrow">{t.personLabel}</p><h2>{t.personTitle}</h2><div><p>{t.personText}</p><p>{t.personValue}</p></div></motion.section>
    <section className="image-direction-scope"><motion.div className="image-direction-section-heading" {...reveal}><p className="image-direction-eyebrow">{t.scopeLabel}</p><h2>{t.scopeTitle}</h2></motion.div><div className="image-direction-style"><motion.div {...reveal}><Photo index={0} t={t} /></motion.div><motion.div {...reveal}><Photo index={1} t={t} /></motion.div></div><dl className="image-direction-capabilities">{t.capabilities.map(([title, list, description]) => <div key={title}><dt>{title}</dt><dd className="image-direction-services">{list}</dd><dd>{description}</dd></div>)}</dl></section>
    <section className="image-direction-occasions"><motion.div className="image-direction-occasion-copy" {...reveal}><p className="image-direction-eyebrow">{t.occasionsLabel}</p><h2>{t.occasionsTitle}</h2><p>{t.occasionsText}</p><p>{t.bridal}</p></motion.div><div className="image-direction-occasion-images"><motion.div className="image-direction-occasion-main" {...reveal}><Photo index={2} t={t} /></motion.div><motion.div className="image-direction-occasion-detail" {...reveal}><Photo index={3} t={t} /></motion.div></div></section>
    <section className="image-direction-motion"><motion.div {...reveal}><p className="image-direction-eyebrow">{t.motionLabel}</p><h2>{t.motionTitle}</h2><p>{t.motionText}</p><p className="image-direction-delivery">{t.delivery}</p></motion.div><div className="image-direction-films">{[1, 3].map((number, index) => <figure key={number}><video controls playsInline preload="none" poster={`${base}/photography/${number}.jpg`} aria-label={t.videos[index]} src={`${base}/photography/${number}.mp4`} /><figcaption>{t.videos[index]}</figcaption></figure>)}</div></section>
    <section className="image-direction-start"><div className="image-direction-start-intro"><h2>{t.startTitle}</h2><p>{t.startText}</p></div><ol>{t.steps.map(([title, description], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol><div className="image-direction-footnotes"><p>{t.practice}</p><p>{t.boundary}</p></div><nav className="image-direction-related" aria-label={lang === 'zh' ? '继续浏览' : 'Explore more'}><a href={`${base}/pages/portfolio.html`}>{t.workLink} <span aria-hidden="true">↗</span></a><a href={`${base}/pages/bespoke.html`}>{t.bespokeLink} <span aria-hidden="true">↗</span></a></nav></section>
  </article>;
}
