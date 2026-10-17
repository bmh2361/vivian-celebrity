import { motion } from 'framer-motion';
import { useLang } from '../layout/Layout.jsx';
import '../index.css';
import CommercialCapabilities from '../components/CommercialCapabilities.jsx';
import { commercialCapabilities } from '../data/commercialCapabilities.js';

const copy = {
	zh: {
		eyebrow: 'BUSINESS',
		title: '帮助品牌在英国开展业务、创造内容并落地执行。',
		text: '从品牌策划、内容制作到达人、活动与英国本地执行，Vivian Adventure 根据项目目标组织合适的人、资源与执行团队。',
		items: [
			{ no: '01', title: '商业项目案例', en: 'Commercial Projects', text: '品牌活动、视觉内容、合作策划与英国本地执行。', href: '/pages/corporate.html', cta: '查看商业项目案例' },
			{ no: '02', title: '达人 · 网红 · 模特', en: 'Talent & Creator Services', text: '为广告、内容、展会与品牌活动寻找并协调合适的人才。', href: '/talent/', cta: '查看人才服务' },
		],
		deliverTitle: '企业可以委托我们做什么？',
		deliverText: '从一次品牌活动、一场展会、一组商业内容，到完整的英国本地 Campaign，我们可以根据项目目标组合策划、人才、内容与现场执行。',
		deliver: commercialCapabilities.zh,
		needTitle: '你现在需要解决什么？',
		needText: '无需先研究我们的服务架构，从您当前的项目需求开始即可。',
		needs: [
			{ no: '01', title: '准备进入英国市场', text: '您已经有品牌或产品，但需要确定如何在英国开始内容、曝光与本地执行。' },
			{ no: '02', title: '准备一次品牌发布或活动', text: '需要活动与场地协调、人才、拍摄、内容或现场团队。' },
			{ no: '03', title: '需要英国本地达人 / 模特 / Creator', text: '已经有 Campaign Brief，需要快速寻找符合品牌要求的人。' },
			{ no: '04', title: '需要制作一组商业内容', text: '需要摄影、视频、广告内容、Social Assets、Talent、Makeup 或 Styling。' },
			{ no: '05', title: '已有完整想法，但缺英国执行团队', text: '品牌已经完成内部策划，需要英国团队组织人员、制作、协调与交付。' },
		],
		needCta: '告诉我们您的项目',
		oneEyebrow: 'ONE BRIEF. ONE COORDINATED TEAM.',
		oneTitle: '一个 Brief，组织完整执行。',
		oneText: '企业项目往往不是只缺一个摄影师、一个模特或一家活动公司。我们可以根据项目范围，把所需的人才、内容制作、妆造、活动与英国本地执行资源组织到同一个项目流程中。',
		oneFlow: ['STRATEGY', 'TALENT', 'CONTENT', 'ACTIVATION', 'DELIVERY'],
		oneCapabilities: ['Business Planning', 'Talent & Casting', 'Creators & Influencers', 'Photography', 'Video', 'Hair & Makeup', 'Styling', 'Event Talent', 'On-site Production', 'Local Coordination'],
		howTitle: '合作方式',
		how: [
			{ no: '01', en: 'SEND THE BRIEF', title: '发送项目需求', text: '告诉我们项目目标、时间、地点、预算范围与需要解决的问题。' },
			{ no: '02', en: 'WE BUILD THE RIGHT TEAM', title: '组织合适团队', text: '根据 Brief 配置人才、创作者、制作、妆造、活动人员与合作资源。' },
			{ no: '03', en: 'WE COORDINATE', title: '统一协调', text: '协调档期、Brief、拍摄、Production、活动与现场执行。' },
			{ no: '04', en: 'WE DELIVER', title: '按范围交付', text: '完成约定范围内的内容、Campaign、活动、Activation 或本地执行。' },
		],
		finalEyebrow: 'HAVE A PROJECT IN THE UK?',
		finalTitle: '把项目需求发给我们。',
		finalText: '无论您正在准备品牌进入英国、一次展会、一组商业内容，还是需要达人、模特与本地执行团队，我们可以先从您的项目目标开始。',
		primary: '告诉我们您的项目',
		secondary: '预约咨询',
	},
	en: {
		eyebrow: 'BUSINESS',
		title: 'Helping brands operate, create and activate in the UK.',
		text: 'From brand planning and content production to talent, events and UK-based execution, Vivian Adventure organises the right people, resources and delivery team around each project objective.',
		items: [
			{ no: '01', title: 'Commercial Projects', en: '商业项目案例', text: 'Brand events, visual content, partnership planning and UK-based execution.', href: '/pages/corporate.html', cta: 'Explore Commercial Projects' },
			{ no: '02', title: 'Talent & Creator Services', en: '达人 · 网红 · 模特', text: 'Talent sourcing and coordination for campaigns, content, exhibitions and brand activations.', href: '/talent/', cta: 'Explore Talent Services' },
		],
		deliverTitle: 'What can you entrust us to deliver?',
		deliverText: 'From a brand event, exhibition or commercial content shoot to a coordinated UK campaign, we combine planning, talent, content and on-site delivery around the project objective.',
		deliver: commercialCapabilities.en,
		needTitle: 'What do you need to solve right now?',
		needText: 'You do not need to navigate our service structure first. Start with the project in front of you.',
		needs: [
			{ no: '01', title: 'Preparing to enter the UK market', text: 'You have a brand or product and need to shape the first UK content, exposure and local execution.' },
			{ no: '02', title: 'Planning a launch or brand event', text: 'You need event or venue coordination, talent, filming, content or an on-site team.' },
			{ no: '03', title: 'Looking for UK talent or creators', text: 'You have a campaign brief and need suitable models, influencers, actors or creators.' },
			{ no: '04', title: 'Producing commercial content', text: 'You need photography, video, campaign assets, talent, hair and makeup or styling.' },
			{ no: '05', title: 'Your plan is ready, but the UK team is missing', text: 'You need local people, production, coordination and delivery around an established plan.' },
		],
		needCta: 'Tell us about your project',
		oneEyebrow: 'ONE BRIEF. ONE COORDINATED TEAM.',
		oneTitle: 'One brief, organised for delivery.',
		oneText: 'Business projects rarely need only a photographer, a model or an events company. Within the project scope, we can organise talent, content production, styling, activations and UK-based delivery resources into one coordinated process.',
		oneFlow: ['STRATEGY', 'TALENT', 'CONTENT', 'ACTIVATION', 'DELIVERY'],
		oneCapabilities: ['Business Planning', 'Talent & Casting', 'Creators & Influencers', 'Photography', 'Video', 'Hair & Makeup', 'Styling', 'Event Talent', 'On-site Production', 'Local Coordination'],
		howTitle: 'How we work',
		how: [
			{ no: '01', en: 'SEND THE BRIEF', title: 'Send the brief', text: 'Share the objective, timing, location, budget range and the problem to solve.' },
			{ no: '02', en: 'WE BUILD THE RIGHT TEAM', title: 'We build the right team', text: 'We organise the relevant talent, creators, production, styling, event people and partner resources.' },
			{ no: '03', en: 'WE COORDINATE', title: 'We coordinate', text: 'We align availability, briefs, production, filming, activations and on-site delivery.' },
			{ no: '04', en: 'WE DELIVER', title: 'We deliver', text: 'We complete the agreed content, campaign, event, activation or local execution scope.' },
		],
		finalEyebrow: 'HAVE A PROJECT IN THE UK?',
		finalTitle: 'Send us your project brief.',
		finalText: 'Whether you are preparing a UK brand launch, an exhibition, commercial content or a talent-led campaign, we can start with the objective and what needs to be delivered.',
		primary: 'Send Us Your Brief',
		secondary: 'Book a Consult',
	},
};

export default function Business() {
	const { lang } = useLang();
	const t = copy[lang] || copy.en;
	const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
	const withBase = (path) => `${base}${path.startsWith('/') ? path : `/${path}`}`;
	const enquiry = withBase('/pages/contact.html?project=business');

	return (
		<div className="layout-standard max-w-7xl mx-auto px-6 py-12 space-y-16 md:space-y-20">
			<motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-2xl border border-[#eee] bg-white p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.05)] relative overflow-hidden">
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(207,175,107,0.18)] to-transparent" />
				<p className="relative text-xs font-semibold tracking-[0.18em] text-[#9A7B4F]">{t.eyebrow}</p>
				<h1 className="relative mt-4 max-w-4xl text-3xl md:text-5xl font-extrabold tracking-wide text-[#111]">{t.title}</h1>
				<p className="relative mt-4 max-w-3xl leading-7 text-[#555]">{t.text}</p>
			</motion.section>

			<section className="grid md:grid-cols-2 gap-6">
				{t.items.map((item, index) => (
					<motion.article key={item.no} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.06 }} className="rounded-2xl border border-[#eee] bg-white p-7 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
						<div className="text-xs tracking-[0.2em] text-[#CFAF6B]">{item.no}</div>
						<h2 className="mt-5 text-2xl font-bold text-[#111]">{item.title}</h2>
						<p className="mt-1 text-sm text-[#9A7B4F]">{item.en}</p>
						<p className="mt-4 leading-7 text-[#666]">{item.text}</p>
						<a href={withBase(item.href)} className="mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#9A7B4F] border border-[#E6CF9A] bg-white hover:bg-[#f8f3e7] transition-colors">{item.cta}</a>
					</motion.article>
				))}
			</section>

			<CommercialCapabilities title={t.deliverTitle} text={t.deliverText} items={t.deliver} withBase={withBase} />

			<motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.55 }}>
				<p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B4F]">START WITH YOUR NEED</p>
				<h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-wide text-[#111]">{t.needTitle}</h2>
				<p className="mt-3 max-w-2xl leading-7 text-[#666]">{t.needText}</p>
				<ol className="mt-10 border-y border-[#e5ded2] divide-y divide-[#e5ded2]">
					{t.needs.map((item, index) => (
						<motion.li key={item.no} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.4, delay: index * 0.06 }}>
							<a href={enquiry} className="group grid gap-3 py-6 transition-colors hover:bg-[#fffaf1] md:grid-cols-[48px_minmax(220px,0.8fr)_1.4fr_auto] md:items-center md:gap-6 md:px-5">
								<span className="text-xs tracking-[0.2em] text-[#B08B43]">{item.no}</span>
								<h3 className="text-lg font-semibold text-[#111]">{item.title}</h3>
								<p className="max-w-2xl text-sm leading-6 text-[#666]">{item.text}</p>
								<span className="inline-flex items-center gap-2 text-xs font-medium text-[#8B7048]">{t.needCta}<span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
							</a>
						</motion.li>
					))}
				</ol>
			</motion.section>

			<motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55 }} className="rounded-2xl border border-[#E6CF9A] bg-[#fbf8f1] p-8 md:p-10 lg:p-12">
				<p className="text-xs font-semibold tracking-[0.2em] text-[#9A7B4F]">{t.oneEyebrow}</p>
				<div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
					<h2 className="max-w-xl text-2xl md:text-3xl font-semibold leading-tight tracking-wide text-[#111]">{t.oneTitle}</h2>
					<p className="max-w-2xl leading-7 text-[#5f5a51]">{t.oneText}</p>
				</div>
				<div className="mt-10 flex flex-col border-y border-[#dfd1b5] py-6 md:flex-row md:items-center md:justify-between md:gap-3">
					{t.oneFlow.map((step, index) => <div key={step} className="flex flex-col items-center gap-3 md:flex-row"><span className="text-xs font-semibold tracking-[0.16em] text-[#4c463d]">{step}</span>{index < t.oneFlow.length - 1 && <span aria-hidden="true" className="rotate-90 text-[#B08B43] md:rotate-0">→</span>}</div>)}
				</div>
				<div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">{t.oneCapabilities.map((item) => <span key={item} className="border-b border-[#d9c89f] pb-1 text-xs tracking-[0.08em] text-[#655d50]">{item}</span>)}</div>
			</motion.section>

			<motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.55 }}>
				<p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B4F]">HOW WE WORK</p>
				<h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-wide text-[#111]">{t.howTitle}</h2>
				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-8">
					{t.how.map((item, index) => (
						<motion.article key={item.no} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45, delay: index * 0.06 }} className="border-t border-[#d9c89f] pt-5">
							<div className="text-xs tracking-[0.2em] text-[#B08B43]">{item.no}</div>
							<p className="mt-5 text-[10px] font-semibold tracking-[0.14em] text-[#9A7B4F]">{item.en}</p>
							<h3 className="mt-2 text-lg font-semibold text-[#111]">{item.title}</h3>
							<p className="mt-3 text-sm leading-6 text-[#666]">{item.text}</p>
						</motion.article>
					))}
				</div>
			</motion.section>

			<motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55 }} className="relative overflow-hidden rounded-2xl border border-[#eee] bg-white p-8 md:p-10 lg:p-12">
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_60%_at_100%_100%,rgba(207,175,107,0.18),transparent)]" />
				<p className="relative text-xs font-semibold tracking-[0.2em] text-[#9A7B4F]">{t.finalEyebrow}</p>
				<h2 className="relative mt-5 max-w-3xl text-2xl md:text-4xl font-semibold tracking-wide text-[#111]">{t.finalTitle}</h2>
				<p className="relative mt-4 max-w-3xl leading-7 text-[#5f5a51]">{t.finalText}</p>
				<div className="relative mt-8 flex flex-wrap gap-3">
					<a href={enquiry} className="inline-flex items-center rounded-full bg-[#111] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black">{t.primary}</a>
					<a href={withBase('/pages/contact.html')} className="inline-flex items-center rounded-full border border-[#E6CF9A] bg-white px-5 py-2.5 text-sm font-medium text-[#8B7048] transition-colors hover:bg-[#f8f3e7]">{t.secondary}</a>
				</div>
			</motion.section>
		</div>
	);
}
