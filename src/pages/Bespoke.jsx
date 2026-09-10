import '../index.css';
import './bespoke.css';
import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../layout/Layout.jsx';

const copy = {
  zh: {
    title: '让重要的时刻，\n有自己的样子。',
    intro: '围绕你想经历的时刻、想留下的画面，将空间、花艺、人物形象与拍摄放在同一个方向里考虑。Vivian Adventure 为私人场合与特别拍摄提供视觉设计、资源协调和现场执行。',
    worlds: ['私人重要时刻', '特别拍摄'],
    occasionTitle: '从你在意的人与事开始。',
    occasionIntro: '婚礼、生日，或一次值得认真安排的相聚。我们从场合的意义与你的喜好出发，确定视觉方向，再让花艺、场景与人物造型在实际空间里相互呼应。',
    capabilities: [
      ['花艺与空间', '结合场地尺度、现场光线、服装与色彩，选择花材和陈设。让入口、桌面与背景场景各有作用，也属于同一个整体。'],
      ['场景与体验', '围绕相聚、交流和拍摄安排空间，推敲材质、桌面细节与背景布置。既考虑人在其中的感受，也考虑最终留下的影像。'],
      ['人物与现场', '按项目需要协调妆造、摄影与相关供应商，明确布置、人员和时间安排，并在现场完成视觉调整与执行。'],
    ],
    detailTitle: '从走进空间，\n到留在记忆里的细节。',
    detailText: '花艺的尺度、桌面的陈设、人物的装束，都从同一份视觉方案延伸。我们在筹备时把这些关系想清楚，让现场自然地围绕你展开。',
    bridge: '每个项目，从一份具体的想法展开。',
    bridgeText: '有时是一次相聚的氛围，有时是一组想了很久的画面。我们依照需求组织创意、资源与执行，让不同的项目都有清楚的方向。',
    productionTitle: '把特别的想法，\n变成可执行的拍摄。',
    productionIntro: '从车辆与人物的关系，到空中视角和特殊地点，我们将场景资源纳入创意方案，再协调拍摄所需的条件与团队。',
    productions: [
      ['豪车拍摄', '围绕人物风格匹配车型、配色与造型，安排取景路线、道路协调与必要许可；将驾控、安全和车内外机位纳入拍摄计划。'],
      ['直升机拍摄', '围绕画面需求协调空域与航线审批、停机坪联络及飞行计划，结合安全评估组织空地拍摄协作。'],
      ['特殊地点与制作', '从取景、场地沟通到人员与拍摄排期，将创意落实为现场方案；依照场地条件和资源安排确认可执行范围。'],
    ],
    processTitle: '从初步想法，到现场与影像。',
    processIntro: '先明确你在意什么，再确定需要哪些工作。服务范围、时间与交付内容随项目确认。',
    steps: [
      ['了解需求', '沟通场合、喜好、预算和时间，明确希望获得的体验与画面。'],
      ['确定方向', '形成视觉概念，统筹色彩、花艺、场景与人物形象。'],
      ['协调空间与资源', '结合场地条件，确认花材、陈设、人员及所需拍摄资源。'],
      ['细化执行方案', '落实布置、造型、拍摄与排期，明确各环节分工。'],
      ['现场呈现', '协调到场与布置，完成现场造型、视觉调整和拍摄执行。'],
      ['记录与交付', '按约定完成影像筛选、后期与交付，留存当天的视觉成果。'],
    ],
    captions: ['私人场合 · 人物与花艺', '花艺与空间布置', '桌面与场景设计', '花艺与迎宾场景', '人物造型与花艺', '私人庆祝 · 桌面细节', '特别拍摄 · 人物与车辆'],
    alts: ['人物坐在粉白花艺环绕的长桌旁', '白色花艺与求婚背景组成的室内场景', '白色花艺、烛台与长桌布置', '粉白花艺围绕迎宾牌与餐桌', '草地上穿浅色礼服的人物与粉色花篮', '花艺环绕的生日蛋糕与桌面细节', '黑色着装人物站在车辆旁', '建筑前的黄色跑车', '停放在建筑外的黑色车辆', '车旁人物的黑白照片', '坐在车内的人物侧面'],
  },
  en: {
    title: 'A moment that\nfeels like you.',
    intro: 'An occasion to gather. An image you have in mind. Vivian Adventure brings space, flowers, personal styling and photography into one creative direction, with the coordination to carry it through.',
    worlds: ['Private occasions', 'Special productions'],
    occasionTitle: 'Begin with the people.\nShape the occasion.',
    occasionIntro: 'For weddings, birthdays and personal celebrations, we develop the visual setting around you. Your tastes and the character of the space guide the flowers, scene styling and personal looks, from the first idea to the day itself.',
    capabilities: [
      ['Flowers & space', 'Floral choices grow from the setting: its scale, light, palette and the clothes you will wear. Entrances, tables and backdrops are considered together, with a clear purpose for each.'],
      ['Scene & atmosphere', 'We plan the setting around how people gather, move and spend time together. Materials, table details and backdrops create a place that feels right to be in and works for the camera.'],
      ['People & delivery', 'Make-up, styling, photography and relevant suppliers are brought together as the brief requires. We coordinate preparations and timings, then refine the visual details on site.'],
    ],
    detailTitle: 'A sense of occasion,\nright down to the details.',
    detailText: 'Flowers, table settings and personal styling develop from a shared visual plan. Considering their relationship early gives every detail a place, and leaves room for the occasion to unfold.',
    bridge: 'The brief gives each project its shape.',
    bridgeText: 'It might begin with the feeling of a gathering, or an image you have wanted to make. We bring the creative direction, resources and practical planning together around that idea.',
    productionTitle: 'An unusual idea.\nA considered production.',
    productionIntro: 'A car, an aerial perspective or a particular location can become part of a personal visual story. We develop the creative approach and coordinate the people and access needed to make it happen.',
    productions: [
      ['Luxury car shoots', 'Vehicle selection, colour and wardrobe follow the creative direction. Routes, road coordination, necessary permissions, driving arrangements and safety inform the plan for interior and exterior shots.'],
      ['Helicopter shoots', 'We coordinate airspace and route approvals, helipad liaison and flight planning around the intended images, with safety assessment and a joined-up plan for air and ground crews.'],
      ['Special locations & production', 'Location research, access discussions, crew and scheduling turn the concept into a practical shoot plan. The scope is confirmed against the setting and available resources.'],
    ],
    processTitle: 'An idea, carefully brought together.',
    processIntro: 'We agree what matters to you first, then define the work, timing and deliverables around the project.',
    steps: [
      ['The conversation', 'Understand the occasion, your tastes, budget and timing, and what you want to experience or create.'],
      ['Creative direction', 'Develop a visual approach across colour, flowers, scene and personal styling.'],
      ['Space & sourcing', 'Confirm the setting, floral and styling materials, people and production resources.'],
      ['The working plan', 'Agree preparations, styling, photography, timings and responsibilities.'],
      ['On the day', 'Coordinate arrivals and set-up, refine the styling and oversee the agreed visual work.'],
      ['Images to keep', 'Complete the agreed image selection, post-production and delivery.'],
    ],
    captions: ['Private occasions · People & flowers', 'Floral & scene styling', 'Tables & settings', 'Flowers & arrival spaces', 'Personal styling & flowers', 'Private celebrations · Table details', 'Special productions · People & cars'],
    alts: ['A person seated at a table surrounded by pink and white flowers', 'An indoor proposal setting with white flowers and a backdrop', 'White flowers, candle holders and a dressed dining table', 'Pink and white flowers around a welcome sign and dining space', 'A person in a pale dress beside a pink floral basket on a lawn', 'A birthday cake and floral details beside a dining table', 'A person dressed in black beside a car', 'A yellow sports car outside a building', 'A black car parked outside a building', 'A black and white portrait beside a car', 'A seated portrait inside a car'],
  },
};

const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
const occasion = '/bespoke/private-occasions/';

function Photo({ file, alt, caption, width, height, className = '', priority = false }) {
  return (
    <figure className={`bespoke-photo ${className}`}>
      <img src={`${base}${file}`} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default function Bespoke() {
  const { lang } = useLang();
  const t = copy[lang] || copy.en;
  const reducedMotion = useReducedMotion();
  return (
    <div className="bespoke-page layout-visual" lang={lang === 'zh' ? 'zh-CN' : 'en-GB'}>
      <section className="bespoke-hero">
        <motion.div className="bespoke-hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <p className="bespoke-eyebrow">Vivian Adventure / Bespoke experiences</p>
          <h1>{t.title}</h1><p className="bespoke-intro">{t.intro}</p>
          <div className="bespoke-worlds"><span>01 / {t.worlds[0]}</span><span>02 / {t.worlds[1]}</span></div>
        </motion.div>
        <Photo file={`${occasion}occasion-portrait.jpg`} alt={t.alts[0]} caption={t.captions[0]} width={1280} height={1842} className="bespoke-hero-image" priority />
      </section>
      <section className="bespoke-section" aria-labelledby="bespoke-occasions">
        <div className="bespoke-section-heading"><div><p className="bespoke-eyebrow">01 / {t.worlds[0]}</p><h2 id="bespoke-occasions">{t.occasionTitle}</h2></div><p>{t.occasionIntro}</p></div>
        <div className="bespoke-occasion-layout">
          <Photo file={`${occasion}floral-setting.jpg`} alt={t.alts[1]} caption={t.captions[1]} width={1279} height={1677} />
          <div className="bespoke-capabilities">
            {t.capabilities.map(([title, text], index) => <article key={title}><span className="bespoke-number">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
            <Photo file={`${occasion}table-and-space.jpg`} alt={t.alts[2]} caption={t.captions[2]} width={1290} height={1884} className="bespoke-table-image" />
          </div>
        </div>
        <div className="bespoke-details">
          <div className="bespoke-detail-copy"><h2>{t.detailTitle}</h2><p>{t.detailText}</p></div>
          <Photo file={`${occasion}floral-welcome.jpg`} alt={t.alts[3]} caption={t.captions[3]} width={1290} height={1668} className="bespoke-welcome" />
          <Photo file={`${occasion}garden-portrait.jpg`} alt={t.alts[4]} caption={t.captions[4]} width={1280} height={1280} className="bespoke-garden" />
          <Photo file={`${occasion}occasion-detail.jpg`} alt={t.alts[5]} caption={t.captions[5]} width={960} height={1440} className="bespoke-detail" />
        </div>
      </section>
      <div className="bespoke-bridge"><p className="bespoke-eyebrow">Bespoke / Vivian Adventure</p><h2>{t.bridge}</h2><p>{t.bridgeText}</p></div>
      <section className="bespoke-section" aria-labelledby="bespoke-productions">
        <div className="bespoke-section-heading"><div><p className="bespoke-eyebrow">02 / {t.worlds[1]}</p><h2 id="bespoke-productions">{t.productionTitle}</h2></div><p>{t.productionIntro}</p></div>
        <div className="bespoke-production-layout">
          <Photo file="/bespoke-cases/4.jpg" alt={t.alts[6]} caption={t.captions[6]} width={1440} height={1920} />
          <div className="bespoke-production-copy">{t.productions.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
            <div className="bespoke-car-pair"><Photo file="/bespoke-cases/2.jpg" alt={t.alts[7]} width={1276} height={1702} /><Photo file="/bespoke-cases/3.jpg" alt={t.alts[8]} width={1280} height={1707} /></div>
          </div>
        </div>
        <div className="bespoke-portraits"><Photo file="/bespoke-cases/5.jpg" alt={t.alts[9]} width={1440} height={1920} /><Photo file="/bespoke-cases/6.jpg" alt={t.alts[10]} width={1440} height={2160} /></div>
      </section>
      <section className="bespoke-process" aria-labelledby="bespoke-process-title">
        <div className="bespoke-section-heading"><div><p className="bespoke-eyebrow">{lang === 'zh' ? '项目如何展开' : 'How it comes together'}</p><h2 id="bespoke-process-title">{t.processTitle}</h2></div><p>{t.processIntro}</p></div>
        <ol>{t.steps.map(([title, text], index) => <li key={title}><span className="bespoke-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      </section>
    </div>
  );
}
