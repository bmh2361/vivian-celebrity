import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../layout/Layout.jsx';
import '../index.css';

// 简单业务图标（纯 SVG），避免外部资源依赖
function BizIcon({ name, className = 'w-6 h-6' }) {
  const stroke = 'currentColor';
  switch (name) {
    case 'event': // 活动策划
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M8 2v4M16 2v4M3 10h18" />
        </svg>
      );
    case 'media': // 影像制作
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'identity': // 视觉升级
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="4" />
          <rect x="12" y="12" width="9" height="6" rx="2" />
        </svg>
      );
    case 'link': // 跨界联名
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" />
          <path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 1 1-7-7L7 11" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Corporate() {
  const { lang } = useLang();
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;

  const copy = {
    zh: {
      heroTitle: '企业策划',
      heroSub: '专业策划 · 创意执行 · 品牌升级',
      heroDesc: [
        'Vivian Adventure 致力于为企业客户提供一站式品牌策划与活动执行服务。',
        '我们以创意为核心，以执行为支撑，从品牌发布、年会庆典、媒体拍摄到高端私享活动，',
        '为企业打造具有影响力与记忆点的高品质体验。',
      ],
      cta: '立即咨询',

      svcTitle: '服务范围',
      services: [
        { title: '品牌活动策划', desc: '提供从主题创意、流程设计到现场执行的全流程活动策划方案。', icon: 'event' },
        { title: '企业影像制作', desc: '为企业制作宣传片、形象片、活动记录及品牌视觉内容。', icon: 'media' },
        { title: '品牌视觉升级', desc: '协助企业进行视觉体系优化与内容包装，增强品牌影响力。', icon: 'identity' },
        { title: '跨界联名策划', desc: '策划并执行品牌合作、展会及高端商务活动。', icon: 'link' },
      ],

      caseTitle: '合作案例',

      flowTitle: '合作流程',
      steps: [
        { k: '01 需求沟通 · Consultation', v: '理解目标与预算、时间线与关键里程碑。' },
        { k: '02 策划方案 · Planning & Proposal', v: '主题创意、流程设计、资源配置与风险评估。' },
        { k: '03 视觉设计 · Design & Content', v: '视觉规范、物料与内容制作，统一品牌表达。' },
        { k: '04 执行落地 · On-site Execution', v: '现场统筹、舞美与多媒体、团队分工与把控。' },
        { k: '05 效果复盘 · Review & Feedback', v: '数据复盘与媒体物料交付，提出后续增效建议。' },
      ],

      partnerTitle: '合作伙伴',
      quote: '“Vivian Adventure 的团队把我们的活动提升到了国际水准。” — 合作品牌代表',

      callTitle: '开启您的品牌旅程',
      callText: '让我们为您的企业打造专属的视觉与策划体验。联系我们，了解更多合作细节。',
      callBtn: '立即咨询'
    },
    en: {
      heroTitle: 'Corporate Planning',
      heroSub: 'Strategy · Creative · Execution',
      heroDesc: [
        'Vivian Adventure provides one-stop corporate event and brand planning solutions.',
        'From concept to execution, we deliver impactful brand moments — product launches, corporate galas, media productions, and private events — all crafted with creativity and precision.',
      ],
      cta: 'Get in Touch',

      svcTitle: 'Services',
      services: [
        { title: 'Brand Event Planning', desc: 'Plan and execute creative, customized corporate events from concept to completion.', icon: 'event' },
        { title: 'Visual & Media Production', desc: 'Professional photography, video production, and promotional media for your brand.', icon: 'media' },
        { title: 'Brand Identity Design', desc: 'Enhance your brand identity through refined design and visual storytelling.', icon: 'identity' },
        { title: 'Cross-Brand Collaboration', desc: 'Build unique collaborations, exhibitions, and premium business events.', icon: 'link' },
      ],

  caseTitle: 'Partnership Cases',
  caseDesc: 'Selected partnership highlights from launches to executive events.',

      flowTitle: 'Our Process',
      steps: [
        { k: '01 Consultation', v: 'Goals, budget and key milestones.' },
        { k: '02 Planning & Proposal', v: 'Theme, rundown, resourcing and risk review.' },
        { k: '03 Design & Content', v: 'Visual system and deliverables for consistent branding.' },
        { k: '04 On‑site Execution', v: 'Stage, multimedia and team orchestration.' },
        { k: '05 Review & Feedback', v: 'Reporting and media delivery, with follow‑up suggestions.' },
      ],

      partnerTitle: 'Trusted by',
      quote: '“Vivian Adventure’s team elevated our event to a global‑class experience.” — Partner Brand Representative',

      callTitle: 'Start Your Next Chapter',
      callText: 'Let us tailor an integrated visual and planning experience for your brand. Contact us to learn more.',
      callBtn: 'Contact Us'
    }
  };

  const t = copy[lang] || copy.zh;
  const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.5, delay: d } });

  // 合作伙伴 LOGO：多后缀兜底，自动尝试 .png/.jpg/.jpeg/.webp/.svg
  const LogoCell = ({ index }) => {
    const exts = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
    const [ei, setEi] = useState(0);
    const [found, setFound] = useState(false);
    const src = withBase(`/partners-logos/${index}${exts[ei]}`);
    return (
      <div className="h-48 md:h-56 px-8 md:px-10 py-6 md:py-8 rounded-lg border border-[#eee] bg-white relative overflow-hidden grid place-items-center shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
        <img
          src={src}
          alt={`Partner Logo ${index}`}
          className="block h-full w-full object-contain z-[1]"
          loading="lazy"
          onLoad={() => setFound(true)}
          onError={() => {
            if (ei < exts.length - 1) setEi(ei + 1);
          }}
        />
        {!found && (
          <div className="absolute inset-0 grid place-items-center text-xs text-[#888] pointer-events-none z-0">LOGO</div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Hero */}
      <motion.section {...fade(0)} className="rounded-2xl border border-[#eee] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] relative overflow-hidden">
        {/* 底部金色柔光 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(207,175,107,0.18)] to-transparent" />
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#111]">{t.heroTitle}</h1>
        <p className="text-[#9A7B4F] mt-2 font-medium">{t.heroSub}</p>
        <div className="mt-3 text-[#555] space-y-1">
          {t.heroDesc.map((line) => (<p key={line}>{line}</p>))}
        </div>
        <div className="mt-5">
          <a href={withBase('/pages/contact.html')} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">{t.cta}</a>
        </div>
      </motion.section>

      {/* Services */}
      <motion.section {...fade(0.05)}>
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-bold text-[#111]">{t.svcTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.services.map((s, i) => (
            <motion.div key={s.title} {...fade(i * 0.04)} className="rounded-2xl border border-[#eee] bg-white p-6 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#E6CF9A] text-[#9A7B4F] bg-[#fbf8ef]">
                  <BizIcon name={s.icon} />
                </span>
                <div>
                  <div className="text-base font-semibold text-[#111] leading-snug">{s.title}</div>
                  <p className="text-[#666] mt-1 text-sm leading-6">{s.desc}</p>
                  {s.descEn && <p className="text-[#666] mt-1 text-sm leading-6 italic opacity-90">{s.descEn}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Partnership Cases: restore previous fill style (object-cover, .jpg) */}
      <motion.section {...fade(0.1)}>
        <h2 className="text-xl md:text-2xl font-bold text-[#111]">{t.caseTitle}</h2>
        <p className="text-[#666] mt-2">{t.caseDesc}</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => {
            const i = idx + 1;
            const src = withBase(`/corporate-cases/${i}.jpg`);
            const fallbackLabel = lang === 'zh' ? `案例图片 ${i}` : `Case Image ${i}`;
            return (
              <motion.div key={i} {...fade(idx * 0.03)} className="relative rounded-2xl border border-[#eee] bg-white overflow-hidden shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
                <div className="aspect-[4/3] relative grid place-items-center bg-gradient-to-br from-[#faf7ef] to-white">
                  <img
                    src={src}
                    alt={fallbackLabel}
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoad={(e) => { const label = e.currentTarget.nextElementSibling; if (label) label.style.display = 'none'; }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    loading="lazy"
                  />
                  <div className="text-sm text-[#888]">{fallbackLabel}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Process */}
      <motion.section {...fade(0.15)}>
        <h2 className="text-xl md:text-2xl font-bold text-[#111]">{t.flowTitle}</h2>
        <ol className="mt-4 grid md:grid-cols-3 gap-3">
          {t.steps.map((s, i) => (
            <li key={i} className="rounded-xl border border-[#eee] bg-white px-4 py-3 text-[#444]">
              <div className="font-semibold text-[#111]">{s.k}</div>
              <div className="mt-1 text-sm leading-6">{s.v}</div>
            </li>
          ))}
        </ol>
      </motion.section>

      {/* Partners & Testimonials */}
      <motion.section {...fade(0.2)} className="rounded-2xl border border-[#eee] bg-white p-6 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
        <h2 className="text-xl md:text-2xl font-bold text-[#111]">{t.partnerTitle}</h2>
        <blockquote className="mt-3 text-[#444] italic">{t.quote}</blockquote>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, idx) => (
            <LogoCell key={idx} index={idx + 1} />
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section {...fade(0.25)} className="rounded-2xl border border-[#eee] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_100%,rgba(207,175,107,0.15),transparent)]" />
        <h3 className="relative text-xl md:text-2xl font-bold text-[#111]">{t.callTitle}</h3>
        <p className="relative mt-3 text-[#555] whitespace-pre-line">{t.callText}</p>
        <div className="relative mt-5">
          <a href={withBase('/pages/contact.html')} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">{t.callBtn}</a>
        </div>
      </motion.section>
    </div>
  );
}
