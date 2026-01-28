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
			tagBeauty: '英国高端美业',
			tagMedia: '影视传媒',
			beautyKicker: 'BEAUTY',
			mediaKicker: 'MEDIA',
			beautyPoints: [
				'影视 / 时尚 / 婚礼｜造型艺术指导',
				'妆发与服装整体风格统筹',
				'高定级私人定制 · 形象顾问',
			],
			mediaPoints: [
				'视觉策展 · 创意方向',
				'内容制作与制片统筹',
				'品牌叙事与传播 · 合作统筹',
			],
			ctaConsult: '预约咨询',
			ctaPortfolio: '查看作品集',
			founderRole: '时尚总监 · VIVIAN ADVENTURE 创始人',
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
			tagBeauty: 'UK Luxury Beauty',
			tagMedia: 'Media Production',
			beautyKicker: 'BEAUTY',
			mediaKicker: 'MEDIA',
			beautyPoints: [
				'Film / Fashion / Bridal — Styling Direction',
				'Beauty & wardrobe look development',
				'Private bespoke looks · Image consulting',
			],
			mediaPoints: [
				'Visual curation · Creative direction',
				'Content production · Line producing',
				'Brand storytelling · Partnerships',
			],
			ctaConsult: 'Consult',
			ctaPortfolio: 'View Portfolio',
			founderRole: 'Fashion Director · VIVIAN ADVENTURE Founder',
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
				<div className="max-w-7xl mx-auto px-6 pt-14 md:pt-20 pb-12 md:pb-16 relative">
					<div className="grid gap-6 md:grid-cols-2 md:items-stretch">
						{/* 内容容器 */}
						<div className="w-full h-full bg-white/85 backdrop-blur-[2px] rounded-2xl p-7 md:p-8 shadow-[0_8px_28px_-4px_rgba(0,0,0,0.10)] border border-[#f2f2f2] flex flex-col">
							<motion.div {...fadeUp(0)} className="flex items-center gap-3 text-[#CFAF6B]">
								<span className="text-xs font-semibold tracking-[0.15em]">VIVIAN ADVENTURE</span>
								<span className="h-px flex-1 bg-[#E6CF9A]" />
							</motion.div>
							<motion.h1 {...fadeUp(0.1)} className="mt-5 text-3xl md:text-[40px] leading-tight font-extrabold text-[#111]">
								{t.heroTitle}
							</motion.h1>
							<motion.div {...fadeUp(0.2)} className="mt-4">
								<div className="flex flex-wrap items-center gap-2 text-sm">
									<span className="rounded-full bg-[#111] text-white px-3 py-1">{t.tagBeauty}</span>
									<span className="rounded-full bg-white text-[#9A7B4F] border border-[#E6CF9A] px-3 py-1">{t.tagMedia}</span>
								</div>
								<div className="mt-4 rounded-2xl border border-[#eee] bg-white/80 overflow-hidden">
									<div className="grid sm:grid-cols-2">
										<div className="p-4 md:p-5">
											<div className="flex items-baseline justify-between gap-3">
												<div className="text-[12px] font-semibold tracking-[0.08em] text-[#111]">{t.tagBeauty}</div>
												<div className="text-[10px] tracking-[0.2em] text-[#CFAF6B]">{t.beautyKicker}</div>
											</div>
											<div className="mt-3 space-y-2 text-[13px] leading-6 text-[#333]">
												{t.beautyPoints.map((line, idx) => (
													<div key={idx} className="flex gap-2">
														<span className="mt-[9px] h-[5px] w-[5px] rounded-full bg-[#CFAF6B] shrink-0" />
														<span>{line}</span>
													</div>
												))}
											</div>
										</div>
										<div className="p-4 md:p-5 sm:border-l border-[#eee] bg-[#fbfaf7]">
											<div className="flex items-baseline justify-between gap-3">
												<div className="text-[12px] font-semibold tracking-[0.08em] text-[#111]">{t.tagMedia}</div>
												<div className="text-[10px] tracking-[0.2em] text-[#CFAF6B]">{t.mediaKicker}</div>
											</div>
											<div className="mt-3 space-y-2 text-[13px] leading-6 text-[#333]">
												{t.mediaPoints.map((line, idx) => (
													<div key={idx} className="flex gap-2">
														<span className="mt-[9px] h-[5px] w-[5px] rounded-full bg-[#CFAF6B] shrink-0" />
														<span>{line}</span>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</motion.div>

							<motion.div {...fadeUp(0.3)} className="mt-6 flex flex-wrap items-center gap-4">
								<a href={withBase('/pages/contact.html')} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">
									<Icon name="CalendarDays" /> {t.ctaConsult}
								</a>
								<a href={withBase('/pages/portfolio.html')} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#9A7B4F] border border-[#E6CF9A] bg-white hover:bg-[#f8f3e7] transition-colors">
									{t.ctaPortfolio}
								</a>
							</motion.div>
						</div>

						{/* 右侧图片卡片（移动端也展示） */}
						<motion.div initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }} className="w-full h-[320px] sm:h-[360px] md:h-full">
							<div className="group h-full rounded-3xl p-[1.5px] bg-gradient-to-br from-[#F4E7BE] via-[#CFAF6B] to-[#9A7B4F] shadow-[0_18px_42px_rgba(0,0,0,0.14)] transition-transform duration-500 will-change-transform">
								<div className="h-full rounded-[22px] overflow-hidden bg-[#fbfaf7] relative group-hover:shadow-[0_22px_48px_rgba(0,0,0,0.16)] group-hover:-translate-y-1 transition-all duration-500">
									{/* 以“模糊背景 + 前景完整展示”的方式避免黑边且不裁切 */}
									<HeroImage withBase={withBase} className="relative w-full h-full" />
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
							loading="lazy"
							decoding="async"
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
	// Hero 右侧主图：优先使用 /public/hero-right.jpg（可按需替换），失败则回退到现有图片
	const [rel, setRel] = useState('/hero-right.jpg');
	const src = withBase(rel);
	const onError = () => setRel(prev => (prev === '/hero-company.jpg' ? prev : '/hero-company.jpg'));
	return (
		<div className={className}>
			<img
				src={src}
				alt=""
				aria-hidden="true"
				className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
				onError={onError}
				loading="eager"
				decoding="async"
				fetchpriority="low"
			/>
			<img
				src={src}
				alt="hero"
				className="relative w-full h-full object-contain"
				onError={onError}
				loading="eager"
				decoding="async"
				fetchpriority="high"
			/>
		</div>
	);
}

