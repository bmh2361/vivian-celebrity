import '../index.css';
import './home.css';
import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../layout/Layout.jsx';
import { useState } from 'react';

// Optical bounds preserve the complete source canvas; percentages are relative to each tile.
const partnerLogos = [
	{ file: '1.png', name: 'Charm 昌荣传媒', width: 78, height: 72 },
	{ file: '2.png', name: 'London Fashion Week', width: 58, height: 58 },
	{ file: '3.png', name: 'Holiland 好利来', width: 78, height: 72 },
	{ file: '4.png', name: 'iQIYI 爱奇艺', width: 86, height: 84 },
	{ file: '5.png', name: 'Geely', width: 90, height: 88 },
	{ file: '6.png', name: '德云红', width: 78, height: 72 },
	{ file: '7.png', name: 'China National Tourist Office London', width: 66, height: 72 },
	{ file: '8.png', name: 'Vogue', width: 78, height: 72 },
	{ file: '9.jpg', name: 'Marie Claire', width: 78, height: 72 },
	{ file: '10.png', name: 'Cartier', width: 78, height: 72 },
	{ file: '11.png', name: 'Prada', width: 78, height: 72 },
	{ file: '12.jpg', name: 'MAC', width: 78, height: 72 },
	{ file: '13.png', name: 'Lanvin', width: 66, height: 68 },
	{ file: '14.png', name: 'Harper’s Bazaar', width: 78, height: 72 },
	{ file: '15.png', name: 'Chanel', width: 68, height: 72 },
	{ file: '16.jpg', name: 'Hugo Boss', width: 78, height: 72 },
	{ file: '17.png', name: 'Caroline', width: 78, height: 72 },
	{ file: '18.png', name: 'Gucci', width: 78, height: 72 },
	{ file: '19.jpg', name: 'NARS', width: 70, height: 66 },
	{ file: '20.png', name: 'MaxMara', width: 78, height: 72 },
	{ file: '21.jpg', name: 'ELLE China', width: 46, height: 58 },
	{ file: '22.png', name: 'Shiseido', width: 88, height: 92 },
	{ file: '23.png', name: 'Bobbi Brown', width: 84, height: 72 },
	{ file: '24.png', name: 'Sandro', width: 78, height: 72 },
	{ file: '25.png', name: 'Tasaki', width: 84, height: 72 },
	{ file: '26.png', name: 'Pinko', width: 78, height: 72 },
	{ file: '27.png', name: 'Dyson', width: 78, height: 72 },
	{ file: '28.png', name: 'Rolex', width: 68, height: 76 },
	{ file: '29.jpg', name: 'YSL', width: 62, height: 66 },
	{ file: '30.png', name: 'Givenchy', width: 72, height: 70 },
	{ file: '31.png', name: 'Giorgio Armani', width: 84, height: 72 },
	{ file: '32.png', name: 'Sina', width: 78, height: 72 },
	{ file: '33.png', name: 'Tencent', width: 78, height: 72 },
	{ file: '34.png', name: 'Pepsi', width: 78, height: 72 },
	{ file: '35.png', name: 'MangoFun', width: 62, height: 72 },
	{ file: '36.png', name: '东方卫视', width: 80, height: 84 },
	{ file: '37.png', name: 'Mango TV', width: 78, height: 72 },
	{ file: '38.png', name: 'King’s College London', width: 56, height: 60 },
	{ file: '39.png', name: 'UCL', width: 68, height: 58 },
	{ file: '40.png', name: 'University of Cambridge', width: 84, height: 70 },
];

export default function Home() {
	const { lang } = useLang();
	const reducedMotion = useReducedMotion();
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
						{ label: '形象美学', href: '/pages/image-direction.html' },
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
						{ label: '企业策划案例', href: '/pages/corporate.html' },
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
						{ label: 'Image Direction', href: '/pages/image-direction.html' },
						{ label: 'Bespoke', href: '/pages/bespoke.html' },
					],
				},
				{
					index: '02',
					eyebrow: 'COMMERCIAL',
					description: 'From brand content to activations, we translate creative direction into polished UK-based execution.',
					items: [
						{ label: 'Brand & Commercial Execution', href: '/business/' },
						{ label: 'Commercial Case Studies', href: '/pages/corporate.html' },
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
	const fadeUp = (delay = 0) => ({ initial: reducedMotion ? false : { y: 10, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6, ease: 'easeOut', delay } });
	const fade = (delay = 0) => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.7, ease: 'easeOut', delay } });


	return (
		<div className="">
			{/* Hero：文字在左，图卡片置于右上角（非全屏背景） */}
			<section className="relative overflow-hidden bg-white">
				<div className="home-hero-container layout-standard mx-auto px-4 sm:px-6 pt-14 md:pt-20 pb-12 md:pb-16 relative">
					<div className="home-hero-layout grid gap-6 lg:grid-cols-2 lg:items-start">
						{/* 内容容器 */}
						<div className="home-hero-card w-full bg-white/85 backdrop-blur-[2px] rounded-2xl p-5 sm:p-7 md:p-8 shadow-[0_8px_28px_-4px_rgba(0,0,0,0.10)] border border-[#f2f2f2] flex flex-col">
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
										<div key={pillar.index} className="home-pillar">
											<div className="pt-0.5 text-[11px] font-semibold tracking-[0.16em] text-[#CFAF6B]">{pillar.index}</div>
											<div className="home-pillar-body">
											<div>
												<div className="text-[11px] font-semibold tracking-[0.18em] text-[#9A7B4F]">{pillar.eyebrow}</div>
												{pillar.title && <h2 className="mt-1 text-lg font-semibold leading-snug text-[#111]">{pillar.title}</h2>}
													<p className="home-pillar-description">{pillar.description}</p>
												</div>
												<div className="home-capabilities">
													<div className="home-capability-index">
														{pillar.items.map((item) => item.href ? (
															<a key={item.label} href={withBase(item.href)} className="text-[#333] transition-colors hover:text-[#9A7B4F]">{item.label}</a>
														) : (
															<span key={item.label} className="text-[#666]">{item.label}</span>
														))}
													</div>
													{pillar.cta && (
														<a href={withBase(pillar.ctaHref)} className="home-pillar-cta group mt-3 inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] text-[#8B7048] transition-colors hover:text-[#6F5737]">
															{pillar.cta}<span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
														</a>
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</motion.div>

							<motion.div {...fadeUp(0.3)} className="home-selected-work flex justify-end">
								<a href={withBase('/pages/portfolio.html')} className="group inline-flex items-center gap-2 border-b border-[#E6CF9A] pb-1 text-xs font-medium tracking-[0.08em] text-[#8B7048] transition-colors hover:border-[#9A7B4F] hover:text-[#6F5737]">
									{t.ctaPortfolio}
									<span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
								</a>
							</motion.div>
						</div>

						{/* 右侧图片卡片（移动端也展示） */}
						<motion.div initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }} className="w-full">
							<div className="group rounded-3xl p-[1.5px] bg-gradient-to-br from-[#F4E7BE] via-[#CFAF6B] to-[#9A7B4F] shadow-[0_18px_42px_rgba(0,0,0,0.14)] transition-transform duration-500 will-change-transform">
								<div className="overflow-hidden rounded-[22px] bg-[#fbfaf7] group-hover:shadow-[0_22px_48px_rgba(0,0,0,0.16)] group-hover:-translate-y-1 transition-all duration-500">
									<HeroImage withBase={withBase} className="block h-auto w-full object-contain" />
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* 影视传媒 · 企业策划：合作伙伴（首页展示） */}
			<section className="home-partners-container layout-wide mx-auto px-6 pb-16">
				<motion.section
					initial={reducedMotion ? false : { opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.05 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className="rounded-3xl border border-[#eee] bg-white p-5 md:p-7 shadow-[0_10px_34px_rgba(0,0,0,0.06)] relative overflow-hidden"
				>
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_20%_0%,rgba(207,175,107,0.16),transparent)]" />
					<div className="relative flex items-end justify-between gap-4 flex-wrap">
						<div>
							<div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-[#9A7B4F]">
								<span className="px-3 py-1 rounded-full border border-[#E6CF9A] bg-[#fbf8ef]">BUSINESS</span>
								<span className="hidden sm:inline h-px w-10 bg-[#E6CF9A]" />
								<span className="hidden sm:inline">COMMERCIAL CASE STUDIES</span>
							</div>
							<h2 className="mt-3 text-xl md:text-2xl font-extrabold text-[#111]">{lang === 'en' ? 'Partners' : '合作伙伴'}</h2>
							<p className="mt-2 text-sm text-[#555] break-words">{lang === 'en' ? 'One project, long‑term partnership · Trusted by leading brands' : '一次合作，长久合作 · 携手共赢'}</p>
						</div>
						<a
							href={withBase('/pages/corporate.html#selected-projects')}
							className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#9A7B4F] border border-[#E6CF9A] bg-white hover:bg-[#f8f3e7] transition-colors"
						>
							{lang === 'en' ? 'Commercial Case Studies' : '查看企业策划案例'}
						</a>
					</div>

					{/* 合作伙伴 LOGO 网格（全端展示） */}
					<div className="home-partners-grid">
						{partnerLogos.map((logo) => (
							<div key={logo.file} className="home-partner-tile">
								<img src={withBase(`/partners-logos/${logo.file}`)} alt={logo.name} loading="lazy" decoding="async"
									style={{ width: `${logo.width}%`, height: `${logo.height}%` }} />
							</div>
						))}
					</div>
					<p className="home-partners-note">More to come.</p>
				</motion.section>
			</section>
		</div>
	);
}

// 右上角图片卡片组件，带缺图回退
function HeroImage({ withBase, className }) {
	// 正式版本化资产；历史图片仅作为应急回退。
	const [rel, setRel] = useState('/home/home-hero-editorial-v2.jpg');
	const src = withBase(rel);
	const onError = () => {
		if (rel === '/hero-company.jpg') return;
		if (import.meta.env.DEV) console.warn(`Primary Hero failed: ${src}; fallback activated.`);
		setRel('/hero-company.jpg');
	};
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
