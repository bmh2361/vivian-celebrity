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
			case 'runway':
				// 走秀T台/红毯
				return (
					<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
						<path d="M8 3h8" />
						<path d="M10 3v6M14 3v6" />
						<path d="M6 21h12" />
						<path d="M9 15l-3 6M15 15l3 6" />
						<rect x="9" y="9" width="6" height="6" rx="1" />
					</svg>
				);
		case 'heart':
			return (
				<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
					<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
				</svg>
			);
			case 'ring':
				// 戒指代表婚礼
				return (
					<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
						<circle cx="12" cy="14" r="6" />
						<path d="M9 8l3-3 3 3" />
					</svg>
				);
		case 'globe':
			return (
				<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="12" cy="12" r="9" />
					<path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
				</svg>
			);
			case 'plane':
				// 旅拍
				return (
					<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
						<path d="M10 21l2-5 7-7a3 3 0 1 0-4-4l-7 7-5 2 4 2 2 4z" />
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
		const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
		const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;
		const fallback = Array.from({ length: 6 }, (_, i) => withBase(`/makeup/${i + 1}.jpg`));
		fetch(withBase('/makeup/index.json'))
			.then(r => (r.ok ? r.json() : Promise.reject()))
			.then((arr) => {
				if (!Array.isArray(arr)) throw new Error('bad json');
				// 仅取前6个，并按文件名中的数字升序
				const ordered = [...arr]
					.map(String)
					.sort((a, b) => {
						const na = Number((a.match(/(\d+)/) || [])[1] || 0);
						const nb = Number((b.match(/(\d+)/) || [])[1] || 0);
						return na - nb;
					})
					.slice(0, 6);
				// 将 JSON 中的路径统一加上 BASE_URL 前缀
				const prefixed = ordered.map((p) => withBase(p));
				setItems(prefixed.length ? prefixed : fallback);
			})
			.catch((e) => { console.warn('[makeup] fallback to defaults:', e); setItems(fallback); });
	}, []);

		const copy = {
		zh: {
				title: '妆造服务',
				subtitle: '以电影级流程与方法论，保障不同场景下的高适配，上镜与风格统一。',
				cards: [
					{ icon: 'clapper', title: '影视造型指导', desc: '电影/剧集整体造型视觉体系与协同把控。' },
					{ icon: 'runway', title: '时尚与红毯', desc: '秀场后台与红毯造型的质感线条与稳定持妆。' },
					{ icon: 'ring', title: '婚礼新人妆造', desc: '新娘/新郎整体形象：底妆结构 · 发型设计 · 服饰协同及试妆。' },
					{ icon: 'plane', title: '旅拍形象升级', desc: '伦敦与欧洲目的地轻制作也能呈现大片氛围。' },
					{ icon: 'face', title: '素人大改造', desc: '形象定位与五官优势提炼，建立可持续日常与上镜方案。' },
					{ icon: 'hanger', title: '服装搭配方案', desc: '针对风格/场景/体态的高效衣橱与造型矩阵规划。' },
				],
			showcase: '案例展示',
			more: '联系我们，获取更多案例',
		},
		en: {
				title: 'Makeup & Styling',
				subtitle: 'Film‑grade workflow ensures on‑camera consistency across scenes and occasions.',
				cards: [
					{ icon: 'clapper', title: 'Film Styling Direction', desc: 'End‑to‑end styling visual systems and cross‑team alignment for film/series.' },
					{ icon: 'runway', title: 'Fashion & Red Carpet', desc: 'Backstage runway and red‑carpet looks with refined lines and long‑wear complexion.' },
					{ icon: 'ring', title: 'Bridal Styling', desc: 'Bride/Groom total look: base structure, hair design, wardrobe coordination and trial.' },
					{ icon: 'plane', title: 'Travel Shoot Upgrade', desc: 'London & Europe destinations: lightweight setups that still deliver cinematic mood.' },
					{ icon: 'face', title: 'Makeover for Everyone', desc: 'Identity positioning and feature enhancement; sustainable daily + on‑camera routines.' },
					{ icon: 'hanger', title: 'Wardrobe Styling Plan', desc: 'Efficient wardrobe and styling matrix by style, scenario and bodyline.' },
				],
			showcase: 'Case Showcase',
			more: 'Contact us for more work',
		},
	};
	const t = copy[lang] || copy.zh;

	const fade = (d=0)=>({ initial:{opacity:0,y:12}, whileInView:{opacity:1,y:0}, viewport:{ once:true, amount:0.2 }, transition:{ duration:0.5, delay:d } });

		return (
			<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
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
								{items.slice(0,6).map((src, i) => (
									<motion.div key={i} variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="group overflow-hidden rounded-2xl border border-[#eee] bg-white shadow-sm">
										<img src={src} alt={`case-${i+1}`} className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
									</motion.div>
								))}
				</motion.div>
			</section>
					</motion.div>
	);
}

