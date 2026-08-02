import { motion } from 'framer-motion';
import { talentVisuals } from '../data/talentVisuals.js';
import { useLang } from '../layout/Layout.jsx';
import '../index.css';

const copy = {
	zh: {
		title: '为品牌找到合适的人。',
		description: '从模特和创作者，到网红、演员与品牌人才，Vivian Adventure 帮助企业在英国为广告、内容、活动与品牌体验寻找合适的人。',
		primary: '告诉我们您的需求',
		secondary: '索取人才名单',
		supportTitle: '我们可以为您做什么？',
		supportIntro: '从人才筛选到完整制作支持，我们围绕品牌目标与项目需求组合合适的服务。',
		support: [
			{ no: '01', eyebrow: 'CAMPAIGNS', title: '商业广告', text: '围绕品牌定位、受众和广告要求寻找人才，支持商业摄影、视频和品牌内容。', tags: ['时尚', '美妆', '产品', '电商', '生活方式'] },
			{ no: '02', eyebrow: 'CREATOR MARKETING', title: '达人与网红营销', text: '根据受众、平台与传播目标，帮助品牌识别并协调合适的创作者和网红，支持内容合作与整合广告。', tags: ['创作者', '网红', 'KOL / KOC', '社交内容', '产品种草'] },
			{ no: '03', eyebrow: 'LIVE EXPERIENCES', title: '活动与品牌体验', text: '为英国境内的展会、发布会、品牌活动和客户接待匹配专业、符合品牌气质的人才。', tags: ['品牌大使', '活动模特', '主持', '礼宾', '现场人才'] },
			{ no: '04', eyebrow: 'INTEGRATED PRODUCTION', title: '不止于人才', text: '除了找到合适的人，我们还可以整合选角、摄影、视频、妆发、造型、创意方向和现场制作，从选角到内容交付由一个团队协调。', tags: ['Talent', 'Casting', 'Photography', 'Video', 'Hair & Makeup', 'Styling', 'Production'], featured: true },
			{ no: '05', eyebrow: 'PARTNERSHIPS', title: '品牌合作', text: '针对适合的人才和创作者，我们也可支持品牌合作、广告露出与长期大使机会，具体取决于资料、档期、使用范围与商业条款。', tags: ['品牌合作', '创作者合作', '广告露出', '长期合作'] },
		],
		howTitle: '合作方式',
		steps: [
			['01', '发送需求', '告诉我们广告、活动或内容目标，以及受众、地点、日期和人才要求。'],
			['02', '寻找并筛选', '根据品牌需求筛选、匹配、联系并确认档期。'],
			['03', '确认人选', '从符合需求的候选中确认合适的人选。'],
			['04', '协调交付', '根据范围协助预约、Brief、排期、使用需求、制作与现场协调。'],
		],
		visualTitle: '人才网络精选',
		visualText: '以下图片展示 Vivian Adventure 与更广泛人才网络可提供的部分视觉类型。每个项目都会围绕具体需求、品牌和受众重新寻找。',
		different: '需要不同类型的人才？告诉我们您的要求，我们可以围绕项目需求继续寻找。',
		finalTitle: '项目需要人才？',
		finalText: '告诉我们广告、活动或内容需求，我们会帮助识别适合项目的人才。',
	},
	en: {
		title: 'Find the right people for your brand.',
		description: 'From models and creators to influencers, actors and brand-facing talent, Vivian Adventure helps businesses source the right people for campaigns, content, events and brand activations across the UK.',
		primary: 'Tell Us What You Need',
		secondary: 'Request a Talent Shortlist',
		supportTitle: 'What can we help you with?',
		supportIntro: 'From talent sourcing to full production support, we shape the right service around your brand and brief.',
		support: [
			{ no: '01', eyebrow: 'CAMPAIGNS', title: 'Commercial Campaigns', text: 'We source talent around your brand positioning, audience and campaign requirements — helping you find the right people for commercial photography, video and branded content.', tags: ['Fashion', 'Beauty', 'Product', 'E-commerce', 'Lifestyle'] },
			{ no: '02', eyebrow: 'CREATOR MARKETING', title: 'Creator & Influencer Campaigns', text: 'We help brands identify and coordinate creators and influencers suited to the audience, platform and campaign objective — from content collaborations to integrated brand campaigns.', tags: ['Creators', 'Influencers', 'KOL / KOC', 'Social Content', 'Product Seeding'] },
			{ no: '03', eyebrow: 'LIVE EXPERIENCES', title: 'Events & Brand Activations', text: 'Professional, brand-appropriate talent for exhibitions, launches, activations and customer-facing events across the UK.', tags: ['Brand Ambassadors', 'Event Models', 'Hosts', 'Hostesses', 'On-site Talent'] },
			{ no: '04', eyebrow: 'INTEGRATED PRODUCTION', title: 'More Than Talent', text: 'Need more than the right person? Vivian Adventure can combine talent sourcing with photography, video production, styling, hair & makeup and on-site production — giving brands one coordinated team from casting through content delivery.', tags: ['Talent', 'Casting', 'Photography', 'Video', 'Hair & Makeup', 'Styling', 'Production'], featured: true },
			{ no: '05', eyebrow: 'PARTNERSHIPS', title: 'Brand Partnerships', text: 'For suitable talent and creators, we can also support brand collaborations, campaign appearances and longer-term ambassador opportunities, subject to profile, availability, usage and commercial terms.', tags: ['Brand Collaborations', 'Creator Partnerships', 'Campaign Appearances', 'Long-term Partnerships'] },
		],
		howTitle: 'How it works',
		steps: [
			['01', 'Send Us Your Brief', 'Tell us the campaign, event or content objective, audience, location, date and talent requirements.'],
			['02', 'We Source & Shortlist', 'We screen, match, contact and confirm availability around the brand brief.'],
			['03', 'You Select', 'Choose from the suitable candidates prepared around your requirements.'],
			['04', 'We Coordinate Delivery', 'We can support booking, briefing, schedules, usage, production and on-site coordination.'],
		],
		visualTitle: 'Talent in our network',
		visualText: 'A glimpse of the talent available through Vivian Adventure and our wider network. Each project is sourced around the specific brief, brand and audience.',
		different: 'Looking for a different profile? Tell us your requirements and we can source talent around your brief.',
		finalTitle: 'Need talent for a project?',
		finalText: 'Tell us your campaign, event or content requirements and we’ll help identify the right talent for the brief.',
	},
};

export default function Talent() {
	const { lang } = useLang();
	const t = copy[lang] || copy.en;
	const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
	const withBase = (path) => `${base}${path.startsWith('/') ? path : `/${path}`}`;
	const enquiry = withBase('/pages/contact.html?project=talent');

	return (
		<div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
			<motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-2xl border border-[#eee] bg-white p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.05)] relative overflow-hidden">
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(207,175,107,0.18)] to-transparent" />
				<p className="relative text-xs font-semibold tracking-[0.18em] text-[#9A7B4F]">TALENT & CREATOR SERVICES</p>
				<h1 className="relative mt-5 max-w-4xl text-3xl md:text-5xl font-extrabold tracking-wide text-[#111]">{t.title}</h1>
				<p className="relative mt-4 max-w-3xl leading-7 text-[#555]">{t.description}</p>
				<div className="relative mt-6 flex flex-wrap gap-3">
					<a href={enquiry} className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">{t.primary}</a>
					<a href={enquiry} className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-[#9A7B4F] border border-[#E6CF9A] bg-white hover:bg-[#f8f3e7] transition-colors">{t.secondary}</a>
				</div>
			</motion.section>

			<section>
				<p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B4F]">CAPABILITIES</p>
				<h2 className="mt-4 text-2xl md:text-3xl font-semibold text-[#111] uppercase tracking-wide">{t.supportTitle}</h2>
				<p className="mt-3 max-w-2xl leading-7 text-[#666]">{t.supportIntro}</p>
				<div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
					{t.support.map((item, index) => {
						const width = index < 3 ? 'lg:col-span-4' : index === 3 ? 'lg:col-span-8' : 'lg:col-span-4';
						return (
							<motion.article key={item.no} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.04 }} className={`${width} ${item.featured ? 'border-[#E6CF9A] bg-[#fbf8f1] hover:bg-[#faf5e9]' : 'border-[#e9e3d8] bg-[#fffdfa] hover:bg-[#fffaf1]'} rounded-2xl border p-7 md:p-8 shadow-none transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-[#d5bd84]`}>
								<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold tracking-[0.2em] text-[#B08B43]">
									<span>{item.no}</span>
									<span aria-hidden="true" className="h-px w-5 bg-[#D8BE83]" />
									<span>{item.eyebrow}</span>
								</div>
								<h3 className="mt-5 text-xl md:text-[22px] font-semibold leading-tight text-[#111] uppercase tracking-[0.04em]">{item.title}</h3>
								{item.featured && <p className="mt-5 text-[10px] font-semibold leading-5 tracking-[0.16em] text-[#9A7B4F]">FROM THE RIGHT FACE TO THE FULL PRODUCTION TEAM.</p>}
								<p className={`${item.featured ? 'max-w-2xl' : 'max-w-[34rem]'} mt-4 text-sm leading-7 text-[#666]`}>{item.text}</p>
								{item.featured ? (
									<div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 border-y border-[#e6dbc2] py-4 text-[10px] font-medium uppercase tracking-[0.12em] text-[#6d6251]">
										{item.tags.map((tag, tagIndex) => <span key={tag} className="inline-flex items-center gap-x-2"><span>{tag}</span>{tagIndex < item.tags.length - 1 && <span aria-hidden="true" className="text-[#B08B43]">→</span>}</span>)}
									</div>
								) : (
									<p className="mt-8 border-t border-[#e9e3d8] pt-5 text-[10px] font-medium uppercase leading-6 tracking-[0.12em] text-[#746c60]">{item.tags.join(' · ')}</p>
								)}
							</motion.article>
						);
					})}
				</div>
			</section>

			<section>
				<h2 className="text-xl md:text-2xl font-bold text-[#111] uppercase tracking-wide">{t.howTitle}</h2>
				<ol className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
					{t.steps.map(([number, title, text], index) => <motion.li key={number} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.04 }} className="rounded-xl border border-[#eee] bg-white px-5 py-4"><div className="text-xs tracking-[0.2em] text-[#CFAF6B]">{number}</div><h3 className="mt-3 font-semibold text-[#111] uppercase text-sm">{title}</h3><p className="mt-2 text-sm leading-6 text-[#666]">{text}</p></motion.li>)}
				</ol>
			</section>

			<section>
				<h2 className="text-xl md:text-2xl font-bold text-[#111] uppercase tracking-wide">{t.visualTitle}</h2>
				<p className="mt-2 max-w-3xl leading-7 text-[#666]">{t.visualText}</p>
				<div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
					{talentVisuals.map((visual, index) => <motion.figure key={visual.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5, delay: (index % 4) * 0.04 }} className="group relative overflow-hidden rounded-2xl border border-[#eee] bg-white"><img src={withBase(visual.image)} alt={`${visual.category.toLowerCase()} talent visual`} className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-[1.02]" style={{ objectPosition: visual.position || 'center' }} loading="lazy" decoding="async" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" /><figcaption className="absolute bottom-0 left-0 bg-white/90 px-3 py-2 text-[10px] tracking-[0.2em] text-[#555]">{visual.category}</figcaption></motion.figure>)}
				</div>
				<p className="mt-5 text-sm text-[#555]">{t.different}</p>
			</section>

			<section className="rounded-2xl border border-[#eee] bg-white p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.05)] relative overflow-hidden">
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_100%,rgba(207,175,107,0.15),transparent)]" />
				<p className="relative text-xs tracking-[0.18em] text-[#9A7B4F]">FROM THE RIGHT FACE TO THE FULL PRODUCTION TEAM.</p>
				<h2 className="relative mt-4 text-xl md:text-2xl font-bold text-[#111] uppercase tracking-wide">{t.finalTitle}</h2>
				<p className="relative mt-3 text-[#555]">{t.finalText}</p>
				<div className="relative mt-6 flex flex-wrap justify-center gap-3"><a href={enquiry} className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">{t.primary}</a><a href={enquiry} className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-[#9A7B4F] border border-[#E6CF9A] bg-white hover:bg-[#f8f3e7] transition-colors">{t.secondary}</a></div>
			</section>
		</div>
	);
}
