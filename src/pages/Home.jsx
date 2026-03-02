import '../index.css';
import { motion } from 'framer-motion';
import { Icon } from '../icons.jsx';
import { useLang } from '../layout/Layout.jsx';
import { useMemo, useState } from 'react';

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
				ctaConsult: '查看妆造美学',
				ctaImaging: '查看影像美学',
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
			heroTitle: 'Peak British Aesthetics, Elevated Storytelling',
			tagBeauty: 'UK Luxury Beauty',
			tagMedia: 'Film & Media',
			beautyKicker: 'BEAUTY',
			mediaKicker: 'MEDIA',
			beautyPoints: [
				'Film / Fashion / Bridal — Styling Direction',
				'Beauty & wardrobe look development',
				'Private bespoke looks · Image consulting',
			],
			mediaPoints: [
				'Visual curation · Creative direction',
				'Production coordination · On‑set execution',
				'Brand storytelling · Partnerships',
			],
				ctaConsult: 'View Makeup & Styling',
				ctaImaging: 'View Visual Aesthetics',
			ctaPortfolio: 'View Portfolio',
			founderRole: 'Fashion Director · VIVIAN ADVENTURE Founder',
			founderBio:
				'A seasoned film and fashion styling director with extensive UK–China and international experience. Focused on bespoke work and narrative visual aesthetics—translating stories and brand identity into elegant, distinctive looks.',
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

	// 合作伙伴 LOGO 数量：按序号命名（1.png/1.svg ... N.png/N.svg）
	// 你只要往 /public/partners-logos/ 继续放 13.png、14.svg…，再把这里的数量加大即可。
	const PARTNER_LOGO_COUNT = 40;
	const partnerIndices = useMemo(() => Array.from({ length: PARTNER_LOGO_COUNT }).map((_, i) => i + 1), []);

	// 合作伙伴 LOGO：多后缀兜底，自动尝试 .png/.jpg/.jpeg/.webp/.svg
	const PartnerLogo = ({ index, className = '' }) => {
		const exts = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
		const [ei, setEi] = useState(0);
		const [found, setFound] = useState(false);
		const src = withBase(`/partners-logos/${index}${exts[ei]}`);
		return (
			<div className={`relative grid place-items-center p-5 sm:p-6 ${className}`}>
				<img
					src={src}
					alt={`Partner Logo ${index}`}
					className="block max-h-[86%] max-w-[92%] h-auto w-auto object-contain relative z-[1]"
					loading="lazy"
					decoding="async"
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

	const PartnersGrid = () => (
		<div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
			{partnerIndices.map((idx, i) => (
				<motion.div
					key={idx}
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.45, delay: i * 0.02 }}
					className="group relative overflow-hidden h-24 sm:h-28 md:h-32 rounded-2xl border border-[#eee] bg-[#fbfaf7] shadow-[0_6px_18px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,0.10)] transition-all"
				>
					<PartnerLogo index={idx} className="h-full w-full" />
				</motion.div>
			))}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.25 }}
				transition={{ duration: 0.45, delay: Math.min(partnerIndices.length, 40) * 0.02 }}
				className="group relative overflow-hidden h-24 sm:h-28 md:h-32 rounded-2xl border border-[#eee] bg-[#fbfaf7] shadow-[0_6px_18px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,0.10)] transition-all col-span-2 sm:col-span-2"
			>
				<div className="h-full w-full grid place-items-center px-6">
					<div className="text-[#9A7B4F] text-sm sm:text-base font-semibold tracking-[0.18em]">More To Come...</div>
				</div>
			</motion.div>
		</div>
	);

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
														<span className="break-words">{line}</span>
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
														<span className="break-words">{line}</span>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</motion.div>

							<motion.div {...fadeUp(0.3)} className="mt-6 flex flex-wrap items-center gap-4">
								<a href={withBase('/pages/makeup.html')} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">
									<Icon name="CalendarDays" /> {t.ctaConsult}
								</a>
								<a href={withBase('/pages/photography.html')} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#9A7B4F] border border-[#E6CF9A] bg-white hover:bg-[#f8f3e7] transition-colors">
									{t.ctaImaging}
								</a>
								<a href={withBase('/pages/portfolio.html')} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#9A7B4F] border border-[#E6CF9A] bg-white hover:bg-[#f8f3e7] transition-colors sm:ml-auto">
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

			{/* 影视传媒 · 企业策划：合作伙伴（首页展示） */}
			<section className="max-w-7xl mx-auto px-6 pb-16">
				<motion.section
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className="rounded-3xl border border-[#eee] bg-white p-5 md:p-7 shadow-[0_10px_34px_rgba(0,0,0,0.06)] relative overflow-hidden"
				>
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_20%_0%,rgba(207,175,107,0.16),transparent)]" />
					<div className="relative flex items-end justify-between gap-4 flex-wrap">
						<div>
							<div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-[#9A7B4F]">
								<span className="px-3 py-1 rounded-full border border-[#E6CF9A] bg-[#fbf8ef]">MEDIA</span>
								<span className="hidden sm:inline h-px w-10 bg-[#E6CF9A]" />
								<span className="hidden sm:inline">CORPORATE PLANNING</span>
							</div>
							<h2 className="mt-3 text-xl md:text-2xl font-extrabold text-[#111]">{lang === 'en' ? 'Partners' : '合作伙伴'}</h2>
							<p className="mt-2 text-sm text-[#555] break-words">{lang === 'en' ? 'One project, long‑term partnership · Trusted by leading brands' : '一次合作，长久合作 · 携手共赢'}</p>
						</div>
						<a
							href={withBase('/pages/corporate.html')}
							className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#9A7B4F] border border-[#E6CF9A] bg-white hover:bg-[#f8f3e7] transition-colors"
						>
							{lang === 'en' ? 'Corporate Planning' : '查看企业策划'}
						</a>
					</div>

					{/* 合作伙伴 LOGO 网格（全端展示） */}
					<PartnersGrid />
				</motion.section>
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

