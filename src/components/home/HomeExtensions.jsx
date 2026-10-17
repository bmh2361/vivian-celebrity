import { Component, lazy, Suspense } from 'react';
import ImageDirectionHero from '../ImageDirectionHero.jsx';
import CommercialCapabilities from '../CommercialCapabilities.jsx';
import { commercialCapabilities } from '../../data/commercialCapabilities.js';
import './home-extensions.css';

const FeaturedProjects = lazy(() => import('./FeaturedProjects.jsx'));

const copy = {
  zh: {
    imageLink: '了解完整形象美学服务',
    deliverTitle: '企业可以委托我们做什么？',
    deliverText: '从个人形象中的妆造、摄影与视觉表达出发，我们将同样的审美判断与制作标准，延伸至品牌内容、商业活动、人才合作及英国本地执行。根据每个项目的目标，我们协调合适的团队与资源，将创意和商业需求转化为可以交付的成果。',
    deliver: [
      { title: '品牌进入英国与本地落地', text: '面向准备进入或已经进入英国市场的品牌，我们先明确项目目标与受众，再协调当地内容制作、活动、人才和执行资源，让品牌计划转化为具体的英国本地项目。' },
      { title: '品牌活动 · 发布会 · 展会', text: '从产品发布、展会到品牌快闪与客户活动，根据项目需求统筹场地、人员、内容拍摄和现场流程，使品牌呈现、活动制作与执行安排相互配合。' },
      { title: '达人 · 网红 · 模特 · 演员', text: '根据品牌定位、目标受众与传播平台筛选合适的人才，协调档期、合作要求、项目 Brief 与现场配合，为品牌活动及内容制作提供人才支持。' },
      { title: '商业摄影 · 视频 · 品牌内容', text: '围绕品牌传播用途制定内容制作方案，组织商业摄影、视频、妆造、人才及后期制作，交付可用于 Campaign、品牌传播与社交媒体的影像内容。' },
      { title: 'Campaign 整合执行', text: '当项目同时涉及策划、人才、拍摄、内容与活动时，我们协调时间线、合作团队和交付要求，减少多方沟通的重复成本，使各个环节围绕同一个项目目标推进。' },
      { title: '品牌合作与商业资源协调', text: '根据品牌定位与合作目标，对接适合的品牌、内容创作者、人才和项目资源，支持合作洽谈、Campaign 合作、商业内容协作及长期合作机会的推进。' },
    ],
    selectedTitle: '精选商业项目',
    selectedText: '从伦敦时装周、现场演出到品牌发布与商业影像，了解我们如何在不同项目中组织制作、人才协作与英国本地执行。',
    allProjects: '查看全部商业项目',
    unavailable: '精选项目暂时无法显示，请查看全部商业项目。',
    loading: '正在载入精选项目…',
  },
  en: {
    imageLink: 'Explore Image Direction',
    deliverTitle: 'What Can We Deliver for Your Brand?',
    deliverText: 'The same attention to image, styling and visual storytelling that shapes our private work also informs our commercial projects. From brand content and events to talent collaborations and UK-based execution, we bring together the right people, production resources and delivery process around each brief.',
    deliver: [
      { title: 'UK Brand Entry & Local Execution', text: 'For brands preparing to enter or already working in the UK, we clarify the project objectives and audience, then coordinate local content production, events, talent and delivery resources to turn the plan into a practical UK-based project.' },
      { title: 'Events & Brand Activation', text: 'From product launches and exhibitions to pop-ups and client events, we coordinate venue requirements, people, content capture and on-site schedules around the brief, bringing the brand presentation and event production together.' },
      { title: 'Talent & Creator Sourcing', text: 'We shortlist talent around the brand, target audience and platform, then coordinate availability, collaboration requirements, the project brief and on-site participation for events and content production.' },
      { title: 'Commercial Content Production', text: 'We plan production around how the brand will use the content, coordinating photography, video, hair and makeup, talent and post-production to deliver imagery for campaigns, brand communications and social media.' },
      { title: 'Integrated Campaign Delivery', text: 'When a brief spans planning, talent, shoots, content and events, we coordinate the timeline, partner teams and agreed deliverables so each part works towards the same objective, with less duplicated communication between suppliers.' },
      { title: 'Brand Partnerships', text: 'We connect suitable brands, creators, talent and project resources around the positioning and collaboration brief, supporting partnership discussions, campaign collaborations, commercial content and longer-term opportunities.' },
    ],
    selectedTitle: 'Selected Commercial Work',
    selectedText: 'Selected projects across fashion, live performance, brand launches and commercial content, highlighting our approach to production, collaboration and UK-based delivery.',
    allProjects: 'Explore All Projects',
    unavailable: 'Selected projects are temporarily unavailable. Please explore all projects.',
    loading: 'Loading selected projects…',
  },
};

class FeaturedProjectsBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) {
    if (import.meta.env.DEV) console.error('Home featured projects could not be loaded.', error);
  }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function HomeExtensions({ lang, withBase }) {
  const t = copy[lang];
  const items = commercialCapabilities[lang].map((item, index) => ({ ...item, ...t.deliver[index] }));
  const unavailable = <p className="home-projects-unavailable" role="status">{t.unavailable}</p>;
  return (
    <div className="home-extensions" lang={lang === 'zh' ? 'zh-CN' : 'en-GB'}>
      <section className="home-image-direction-feature image-direction layout-visual">
        <ImageDirectionHero lang={lang} home />
        <div className="home-image-direction-link"><a href={withBase('/pages/image-direction.html')} className="home-extension-link">{t.imageLink} <span aria-hidden="true">→</span></a></div>
      </section>

      <CommercialCapabilities title={t.deliverTitle} text={t.deliverText} items={items} withBase={withBase} home />

      <section className="home-selected-commercial-work layout-standard max-w-7xl mx-auto px-6">
        <header>
          <h2>{t.selectedTitle}</h2>
          <p>{t.selectedText}</p>
        </header>
        <FeaturedProjectsBoundary key={lang} fallback={unavailable}>
          <Suspense fallback={<p className="home-projects-unavailable" role="status">{t.loading}</p>}>
            <FeaturedProjects lang={lang} withBase={withBase} unavailable={t.unavailable} />
          </Suspense>
        </FeaturedProjectsBoundary>
        <div className="home-selected-projects-more"><a href={withBase('/pages/corporate.html#selected-projects')} className="home-extension-link">{t.allProjects} <span aria-hidden="true">→</span></a></div>
      </section>
    </div>
  );
}
