import '../index.css';
import { motion } from 'framer-motion';
import { useLang } from '../layout/Layout.jsx';
import { useMemo, useState } from 'react';

export default function Home() {
	const { lang } = useLang();
	// 适配 GitHub Pages 子路径部署
	const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
	const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;

	const copy = {
		zh: {
			heroTitle: '以审美塑造形象，\n以内容构建品牌，以人才延展表达。',
			heroSupport: '立足伦敦，从私人形象、品牌内容到人才合作，以创意方向与本地执行完成统一而有辨识度的视觉表达。',
			pillars: [
				{
					index: '01',
					eyebrow: 'PRIVATE CLIENTS',
					title: '私人形象',
					description: '围绕个人气质、场景与表达，完成从妆造到影像的整体形象塑造。',
					items: [
						{ label: '妆造美学', href: '/pages/makeup.html' },
						{ label: '影像美学', href: '/pages/photography.html' },
						{ label: '高端定制', href: '/pages/bespoke.html' },
					],
				},
				{
					index: '02',
					eyebrow: 'COMMERCIAL',
					title: '商业项目',
					description: '从品牌内容到活动执行，将创意方向转化为真正落地的英国商业表达。',
					items: [
						{ label: '品牌与商业执行', href: '/business/' },
						{ label: '企业策划', href: '/pages/corporate.html' },
						{ label: '商业内容' },
						{ label: '英国本地项目落地' },
					],
					cta: '查看商业项目',
					ctaHref: '/business/',
				},
				{
					index: '03',
					eyebrow: 'TALENT',
					title: 'Talent',
					description: '围绕品牌调性、受众与项目目标，筛选并协调真正适合的人才合作。',
					items: [
						{ label: '模特 · 演员' },
						{ label: 'Creator · Influencer' },
						{ label: '广告与活动人才' },
						{ label: '品牌合作' },
					],
					cta: '查看 Talent',
					ctaHref: '/talent/',
				},
			],
			ctaPortfolio: '查看精选作品',
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
			heroTitle: 'Image, Brand & Talent —\nShaped with Intention.',
			heroSupport: 'A London creative house creating refined personal imagery, distinctive brand presence and talent-led experiences — from creative direction through to local execution.',
			pillars: [
				{
					index: '01',
					eyebrow: 'PRIVATE CLIENTS',
					description: 'Refined image-making shaped around identity, occasion and presence.',
					items: [
						{ label: 'Makeup & Styling', href: '/pages/makeup.html' },
						{ label: 'Visual Aesthetics', href: '/pages/photography.html' },
						{ label: 'Bespoke', href: '/pages/bespoke.html' },
					],
				},
				{
					index: '02',
					eyebrow: 'COMMERCIAL',
					description: 'From brand content to activations, we translate creative direction into polished UK-based execution.',
					items: [
						{ label: 'Brand & Commercial Execution', href: '/business/' },
						{ label: 'Business Planning', href: '/pages/corporate.html' },
						{ label: 'Commercial Content' },
						{ label: 'UK Delivery' },
					],
					cta: 'Explore Commercial',
					ctaHref: '/business/',
				},
				{
					index: '03',
					eyebrow: 'TALENT',
					description: 'Curated talent sourcing and collaboration shaped around the brand, audience and project.',
					items: [
						{ label: 'Models · Actors' },
						{ label: 'Creators · Influencers' },
						{ label: 'Campaign Talent' },
						{ label: 'Brand Partnerships' },
					],
					cta: 'Explore Talent',
					ctaHref: '/talent/',
				},
			],
			ctaPortfolio: 'View Selected Work',
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
				<div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 md:pt-20 pb-12 md:pb-16 relative">
					<div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
						{/* 内容容器 */}
						<div className="w-full h-full bg-white/85 backdrop-blur-[2px] rounded-2xl p-5 sm:p-7 md:p-8 shadow-[0_8px_28px_-4px_rgba(0,0,0,0.10)] border border-[#f2f2f2] flex flex-col">
							<motion.div {...fadeUp(0)} className="flex items-center gap-3 text-[#CFAF6B]">
								<span className="text-xs font-semibold tracking-[0.15em]">VIVIAN ADVENTURE</span>
								<span className="h-px flex-1 bg-[#E6CF9A]" />
							</motion.div>
			<motion.h1 {...fadeUp(0.1)} className={`mt-5 whitespace-pre-line leading-tight font-extrabold text-[#111] ${lang === 'zh' ? 'text-[26px] sm:text-[30px]' : 'text-[24px] sm:text-3xl md:text-[34px] lg:text-[32px] xl:text-[36px]'}`}>
								{t.heroTitle}
							</motion.h1>
							<motion.p {...fadeUp(0.2)} className="mt-4 max-w-xl text-sm leading-6 text-[#666]">
								{t.heroSupport}
							</motion.p>
							<motion.div {...fadeUp(0.3)} className="mt-5">
								<div className="border-t border-[#eee]">
									{t.pillars.map((pillar) => (
										<div key={pillar.index} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 border-b border-[#eee] py-5">
											<div className="pt-0.5 text-[11px] font-semibold tracking-[0.16em] text-[#CFAF6B]">{pillar.index}</div>
											<div className="min-w-0 xl:grid xl:grid-cols-[minmax(0,1.05fr)_minmax(190px,.95fr)] xl:gap-5">
											<div>
												<div className="text-[10px] font-semibold tracking-[0.18em] text-[#9A7B4F]">{pillar.eyebrow}</div>
												{pillar.title && <h2 className="mt-1 text-lg font-semibold leading-snug text-[#111]">{pillar.title}</h2>}
													<p className="mt-2 text-[13px] leading-5 text-[#555]">{pillar.description}</p>
												</div>
												<div className="mt-3 xl:mt-0">
													<div className="flex flex-wrap gap-x-3 gap-y-2 text-xs leading-5">
														{pillar.items.map((item) => item.href ? (
															<a key={item.label} href={withBase(item.href)} className="border-b border-[#E6CF9A] text-[#333] transition-colors hover:border-[#9A7B4F] hover:text-[#9A7B4F]">{item.label}</a>
														) : (
															<span key={item.label} className="text-[#666]">{item.label}</span>
														))}
													</div>
													{pillar.cta && (
														<a href={withBase(pillar.ctaHref)} className="group mt-3 inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] text-[#8B7048] transition-colors hover:text-[#6F5737]">
															{pillar.cta}<span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
														</a>
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</motion.div>

							<motion.div {...fadeUp(0.3)} className="mt-5 flex justify-start sm:justify-end">
								<a href={withBase('/pages/portfolio.html')} className="group inline-flex items-center gap-2 border-b border-[#E6CF9A] pb-1 text-xs font-medium tracking-[0.08em] text-[#8B7048] transition-colors hover:border-[#9A7B4F] hover:text-[#6F5737]">
									{t.ctaPortfolio}
									<span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
								</a>
							</motion.div>
						</div>

						{/* 右侧图片卡片（移动端也展示） */}
						<motion.div initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }} className="w-full lg:h-full">
							<div className="group rounded-3xl p-[1.5px] bg-gradient-to-br from-[#F4E7BE] via-[#CFAF6B] to-[#9A7B4F] shadow-[0_18px_42px_rgba(0,0,0,0.14)] transition-transform duration-500 will-change-transform lg:h-full">
								<div className="overflow-hidden rounded-[22px] bg-[#fbfaf7] group-hover:shadow-[0_22px_48px_rgba(0,0,0,0.16)] group-hover:-translate-y-1 transition-all duration-500 lg:h-full">
									<HeroImage withBase={withBase} className="block h-auto w-full object-contain lg:h-full" />
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
								<span className="px-3 py-1 rounded-full border border-[#E6CF9A] bg-[#fbf8ef]">BUSINESS</span>
								<span className="hidden sm:inline h-px w-10 bg-[#E6CF9A]" />
								<span className="hidden sm:inline">CORPORATE PLANNING</span>
							</div>
							<h2 className="mt-3 text-xl md:text-2xl font-extrabold text-[#111]">{lang === 'en' ? 'Partners' : '合作伙伴'}</h2>
							<p className="mt-2 text-sm text-[#555] break-words">{lang === 'en' ? 'One project, long‑term partnership · Trusted by leading brands' : '一次合作，长久合作 · 携手共赢'}</p>
						</div>
						<a
							href={withBase('/business/')}
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
		<img
			src={src}
			alt="hero"
			className={className}
			onError={onError}
			loading="eager"
			decoding="async"
			fetchpriority="high"
		/>
	);
}

