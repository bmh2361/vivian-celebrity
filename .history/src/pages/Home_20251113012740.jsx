import '../index.css';
import { motion } from 'framer-motion';
import { Icon } from '../icons.jsx';
import { useLang } from '../layout/Layout.jsx';
import { useState } from 'react';

export default function Home() {
	const { lang } = useLang();
	// 适配 GitHub Pages 子路径部署
	const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
	const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;

	const copy = {
		zh: {
			heroTitle: '英伦美学巅峰叙事',
			tag1: '英国高端美业',
			tag2: '影视 · 时尚 · 婚礼 · 旅拍 · 品牌合作',
			ctaConsult: '预约咨询',
			ctaPortfolio: '查看作品集',
			founderRole: '造型总监 · VIVIAN ADVENTURE 创始人',
			founderBio:
				'资深影视与时尚造型指导，深耕中英与国际项目，专注高端定制与叙事视觉美学，将影片与品牌气质转化为优雅而具有辨识度的形象表现。',
			coreTitle: '核心资历',
			coreList: [
				'英国电影电视剧造型总监',
				'加拿大电影服化道总执行',
				'Chaumet/高珠晚宴/秀场/红毯合作',
			],
			scopeTitle: '服务领域',
			scopeList: [
				'电影/短片/综艺/广告',
				'时尚大片/婚礼定制/高端定制',
				'明星同款/旅拍项目',
			],
			ctaDeep: '预约深度沟通',
		},
			en: {
			heroTitle: 'British Aesthetics, Peak Storytelling',
			tag1: 'UK Luxury Beauty',
			tag2: 'Film · Fashion · Wedding · Travel · Brand Partnerships',
			ctaConsult: 'Consult',
			ctaPortfolio: 'View Portfolio',
			founderRole: 'Styling Director · VIVIAN ADVENTURE Founder',
			founderBio:
				'A seasoned film and fashion styling director, deeply engaged in UK–China and international projects. Focused on bespoke work and narrative visual aesthetics, transforming footage and brand temperament into elegant, distinctive expressions.',
			coreTitle: 'Core Credentials',
			coreList: [
				'Styling director for UK film & TV',
				'Head of costume, makeup and props for Canadian films',
				'Chaumet high-jewelry galas / runway / red-carpet collaborations',
			],
			scopeTitle: 'Service Scope',
			scopeList: [
				'Film · Short · Variety · Commercial',
				'Fashion editorials · Wedding couture · Bespoke',
				'Celebrity looks · Destination shoots',
			],
			ctaDeep: 'Book a deep‑dive consult',
		},
	};
	const t = copy[lang] || copy.zh;
	// 动画配置
	const fadeUp = (delay = 0) => ({ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6, ease: 'easeOut', delay } });
	const fade = (delay = 0) => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.7, ease: 'easeOut', delay } });

	return (
		<div className="">
			{/* Hero：文字在左，图卡片置于右上角（非全屏背景） */}
			<section className="relative overflow-hidden bg-white">
				<div className="max-w-7xl mx-auto px-6 pt-14 md:pt-20 pb-16 md:pb-24 relative">
					<div className="flex items-start justify-between gap-6">
						{/* 内容容器 */}
						<div className="max-w-xl bg-white/85 backdrop-blur-[2px] rounded-2xl p-6 shadow-[0_8px_28px_-4px_rgba(0,0,0,0.10)] border border-[#f2f2f2]">
						<motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 text-xs text-[#9A7B4F] rounded-full border border-[#E6CF9A] px-3 py-1 bg-white/80">
							<span className="tracking-widest">VIVIAN ADVENTURE</span>
						</motion.div>
						<motion.h1 {...fadeUp(0.1)} className="mt-5 text-3xl md:text-[40px] leading-tight font-extrabold text-[#111]">
							{t.heroTitle}
						</motion.h1>
						<motion.div {...fadeUp(0.2)} className="mt-4 text-[#555]">
							<div className="inline-flex flex-wrap items-center gap-2 text-sm">
								<span className="rounded-full bg-[#f9f7f1] text-[#9A7B4F] border border-[#E6CF9A] px-3 py-1">{t.tag1}</span>
								<span className="rounded-full bg-[#f9f7f1] text-[#9A7B4F] border border-[#E6CF9A] px-3 py-1">{t.tag2}</span>
							</div>
						</motion.div>
						<motion.div {...fadeUp(0.3)} className="mt-7 flex items-center gap-4">
							<a href={withBase('/pages/contact.html')} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">
								<Icon name="CalendarDays" /> {t.ctaConsult}
							</a>
							<a href={withBase('/pages/portfolio.html')} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#9A7B4F] border border-[#E6CF9A] bg-white hover:bg-[#f8f3e7] transition-colors">
								{t.ctaPortfolio}
							</a>
						</motion.div>
						</div>

						{/* 右上角图片卡片（md+ 显示），更大并与左侧对齐 */}
						<motion.div initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }} className="hidden md:block shrink-0">
							<div className="group rounded-3xl p-[1.5px] bg-gradient-to-br from-[#F4E7BE] via-[#CFAF6B] to-[#9A7B4F] shadow-[0_18px_42px_rgba(0,0,0,0.14)] transition-transform duration-500 will-change-transform">
								<div className="rounded-[22px] overflow-hidden bg-white/90 backdrop-blur-[1.5px] relative group-hover:shadow-[0_22px_48px_rgba(0,0,0,0.16)] group-hover:-translate-y-1 transition-all duration-500">
									{/* 尺寸放大 */}
									<HeroImage withBase={withBase} className="block w-[440px] lg:w-[520px] h-[280px] lg:h-[320px] object-cover" />
									{/* 细腻高亮层 */}
									<div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 0% 0%, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.16) 40%, rgba(255,255,255,0) 68%)' }} />
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* 创始人模块 */}
			<section className="max-w-7xl mx-auto px-6 pb-16">
				<motion.div {...fade(0.05)} className="grid md:grid-cols-[1.1fr_1.4fr] gap-8 items-stretch border border-[#eee] rounded-3xl p-4 md:p-6 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
					{/* 左图 */}
					<div className="overflow-hidden rounded-2xl">
							<motion.img
								src={withBase('/founder.jpg')}
							alt="founder"
							className="w-full h-[360px] md:h-full object-cover"
							initial={{ scale: 1.05, opacity: 0 }}
							whileInView={{ scale: 1, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, ease: 'easeOut' }}
						/>
					</div>

					{/* 右文案 */}
					<div className="flex flex-col">
																<motion.h2 {...fadeUp(0.05)} className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#111]">VIVIAN WANG</motion.h2>
																<motion.div {...fadeUp(0.12)} className="mt-1 text-xs md:text-sm tracking-widest text-[#CFAF6B]">{t.founderRole}</motion.div>
																<motion.p {...fadeUp(0.16)} className="mt-3 text-sm leading-7 text-[#444]">
																	{t.founderBio}
																</motion.p>

						<motion.div {...fadeUp(0.18)} className="mt-5 grid sm:grid-cols-2 gap-4">
							{/* 核心服务 */}
							<div className="rounded-2xl border border-[#eee] bg-white p-4">
																<div className="text-[#CFAF6B] font-semibold mb-2">{t.coreTitle}</div>
																<ul className="text-sm text-[#555] space-y-1 list-disc list-inside">
																	{t.coreList.map((line, idx) => (
																		<li key={idx}>{line}</li>
																	))}
																</ul>
							</div>
							{/* 服务领域 */}
							<div className="rounded-2xl border border-[#eee] bg-white p-4">
																<div className="text-[#CFAF6B] font-semibold mb-2">{t.scopeTitle}</div>
																<ul className="text-sm text-[#555] space-y-1 list-disc list-inside">
																	{t.scopeList.map((line, idx) => (
																		<li key={idx}>{line}</li>
																	))}
																</ul>
							</div>
						</motion.div>

						<motion.div {...fadeUp(0.24)} className="mt-6">
							<a href={withBase('/pages/contact.html')} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">
								<Icon name="CalendarDays" /> {t.ctaDeep}
							</a>
						</motion.div>
					</div>
				</motion.div>
			</section>
		</div>
	);
}

// 右上角图片卡片组件，带缺图回退
function HeroImage({ withBase, className }) {
	const [rel, setRel] = useState('/hero-bg-city.jpg');
	const src = withBase(rel);
	return (
		<img
			src={src}
			alt="hero"
			className={className || "w-[360px] lg:w-[420px] h-[240px] lg:h-[300px] object-cover"}
			onError={() => setRel(prev => (prev === '/hero-company.jpg' ? prev : '/hero-company.jpg'))}
			loading="eager"
			decoding="async"
		/>
	);
}

