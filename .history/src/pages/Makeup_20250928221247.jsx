import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../layout/Layout.jsx';
import '../index.css';

// 简易线性图标
function MiniIcon({ name }) {
	const common = 'w-5 h-5';
	switch (name) {
		case 'clapper':
			return (
				<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
					<rect x="3" y="8" width="18" height="12" rx="2" />
					<path d="M3 8l4-5 6 5 4-5 4 5" />
				</svg>
			);
		case 'star':
			return (
				<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
					<path d="M12 3l2.9 6 6.6.5-5 4.2 1.6 6.3L12 17l-6.1 3 1.6-6.3-5-4.2 6.6-.5L12 3z" />
				</svg>
			);
		case 'heart':
			return (
				<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
					<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
				</svg>
			);
		case 'globe':
			return (
				<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="12" cy="12" r="9" />
					<path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
				</svg>
			);
		case 'face':
			return (
				<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="12" cy="12" r="9" />
					<path d="M8 14s1.5 2 4 2 4-2 4-2M9 10h.01M15 10h.01" />
				</svg>
			);
		case 'hanger':
			return (
				<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
					<path d="M12 7a2 2 0 1 1 2-2" />
					<path d="M12 7l-9 6h18l-9-6Z" />
					<path d="M3 13v4h18v-4" />
				</svg>
			);
		default:
			return null;
	}
}

export default function Makeup() {
	const { lang } = useLang();
	const [items, setItems] = useState([]);
	useEffect(() => {
		fetch('/makeup/index.json').then(r => r.json()).then(setItems).catch(() => setItems([]));
	}, []);

	const copy = {
		zh: {
			title: '妆造服务',
			subtitle: '以电影级流程与方法论，保障不同场景下的高适配，上镜与风格统一。',
			cards: [
				{ icon: 'clapper', title: '影视造型指导', desc: '电影/剧组形象统筹与妆造体系搭建，快速进组与现场协作。' },
				{ icon: 'star', title: '时尚与红毯', desc: '采访/盛典/红毯造型，强调质感与镜头表现张力的平衡。' },
				{ icon: 'heart', title: '婚礼新人造型', desc: '婚前沟通与总监亲自定制：质感细节 · 空间动线 · 亲密时刻。' },
				{ icon: 'globe', title: '出镜御用升级', desc: '综艺/访谈/品牌视频镜头妆发升级，建立可复用上镜方案。' },
				{ icon: 'face', title: '美人九宫造', desc: '轮廓优化与五官自信表达，建立可执行的日常上镜习惯。' },
				{ icon: 'hanger', title: '服装搭配方案', desc: '针对场地/季节/体态，提供妆发与服装的完整一体化方案。' },
			],
			showcase: '案例展示',
			more: '联系我们，获取更多案例',
		},
		en: {
			title: 'Makeup & Styling',
			subtitle: 'Film-grade workflow ensures on-camera consistency across scenes and occasions.',
			cards: [
				{ icon: 'clapper', title: 'Film Styling Direction', desc: 'Image direction and styling systems for film/TV; rapid on‑set collaboration.' },
				{ icon: 'star', title: 'Fashion & Red Carpet', desc: 'Interview, gala and red‑carpet looks with balanced texture and camera appeal.' },
				{ icon: 'heart', title: 'Bridal Styling', desc: 'Pre‑wedding consult and bespoke direction: details · movement · intimate moments.' },
				{ icon: 'globe', title: 'On‑camera Upgrade', desc: 'Upgraded camera styling for variety/interview/brand videos with reusable routines.' },
				{ icon: 'face', title: 'Beauty Grid Makeover', desc: 'Contour refinement and confident features; practical everyday on‑camera routine.' },
				{ icon: 'hanger', title: 'Wardrobe Styling Plan', desc: 'Complete hair‑makeup‑wardrobe plan by venue, season and bodyline.' },
			],
			showcase: 'Case Showcase',
			more: 'Contact us for more work',
		},
	};
	const t = copy[lang] || copy.zh;

	const fade = (d=0)=>({ initial:{opacity:0,y:12}, whileInView:{opacity:1,y:0}, viewport:{ once:true, amount:0.2 }, transition:{ duration:0.5, delay:d } });

	return (
		<div>
			{/* 顶部功能六宫格 */}
			<section className="max-w-7xl mx-auto px-6 pt-10 md:pt-12 pb-10">
				<h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#111]">{t.title}</h1>
				<p className="text-[#666] mt-2">{t.subtitle}</p>

				<div className="grid md:grid-cols-3 gap-4 mt-8">
					{t.cards.map((c, i) => (
						<motion.div key={c.title} {...fade(i*0.05)} className="rounded-2xl border border-[#eee] bg-white p-5 md:p-6 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
							<div className="flex items-start gap-3">
								<div className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#E6CF9A] text-[#9A7B4F] bg-[#fbf8ef]">
									<MiniIcon name={c.icon} />
								</div>
								<div>
									<div className="text-[#111] font-semibold">{c.title}</div>
									<div className="text-sm text-[#666] mt-1 leading-6">{c.desc}</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* 案例展示 */}
			<section className="max-w-7xl mx-auto px-6 pb-16">
				<div className="flex items-end justify-between mb-5">
					<h2 className="text-xl md:text-2xl font-bold text-[#111]">{t.showcase}</h2>
					<a href="/pages/contact.html" className="text-sm text-[#9A7B4F] hover:underline">{t.more}</a>
				</div>

				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.2 }}
					variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
				>
					{items.map((src, i) => (
						<motion.div key={i} variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="overflow-hidden rounded-2xl border border-[#eee] bg-white shadow-sm">
							<img src={src} alt="case" className="w-full aspect-[3/4] object-cover" />
						</motion.div>
					))}
				</motion.div>
			</section>
		</div>
	);
}

