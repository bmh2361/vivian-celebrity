import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../layout/Layout.jsx';
import '../index.css';

export default function Photography() {
	const { lang } = useLang();
	const [items, setItems] = useState([]);

	// BASE_URL 兼容，统一前缀
	const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
	const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;

	useEffect(() => {
		const fallback = Array.from({ length: 6 }, (_, i) => {
			const idx = i + 1;
			return { type: 'video', src: withBase(`/photography/${idx}.mp4`), poster: withBase(`/photography/${idx}.jpg`), mime: 'video/mp4' };
		});
		fetch(withBase('/photography/index.json'))
			.then(r => (r.ok ? r.json() : Promise.reject()))
			.then((arr) => {
				if (!Array.isArray(arr)) throw new Error('bad json');
				// 允许 JSON 中混合图片/视频；统一补上 BASE_URL
				const normalized = arr.slice(0, 6).map((m) => {
					if (typeof m === 'string') {
						// 仅给出路径时默认按视频处理，并尝试匹配对应海报
						const posterGuess = m.replace(/\.(mp4|mov|webm)$/i, '.jpg');
						return { type: 'video', src: withBase(m), poster: withBase(posterGuess), mime: 'video/mp4' };
					}
					return {
						...m,
						src: withBase(m.src || ''),
						poster: m.poster ? withBase(m.poster) : undefined,
					};
				});
				setItems(normalized.length ? normalized : fallback);
			})
			.catch((e) => { console.warn('[photography] fallback to defaults:', e); setItems(fallback); });
	}, []);

	const copy = {
		zh: {
			title: '摄影服务',
			subtitle: '聚焦人物气场与叙事感，按电影摄影质感风格完成造型、电影级别的光效与后期制作，确保在多场景中具有大气与细节自信气场。',
			showcase: '案例展示',
		},
		en: {
			title: 'Photography',
			subtitle: 'Cinematic portraits with narrative mood—styling, lighting and finishing at film-grade quality for confident presence across scenarios.',
			showcase: 'Case Showcase',
		}
	};
	const t = copy[lang] || copy.zh;

	return (
		<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
			<section className="max-w-7xl mx-auto px-6 pt-10 md:pt-12 pb-8">
				<h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#111]">{t.title}</h1>
				<p className="text-[#666] mt-2">{t.subtitle}</p>
			</section>

			<section className="max-w-7xl mx-auto px-6 pb-16">
				<h2 className="text-xl md:text-2xl font-bold text-[#111] mb-5">{t.showcase}</h2>
				{/* 直接 animate，避免 whileInView 未触发 */}
				<motion.div
					key={items.map((m) => m.src).join('|')}
					initial="hidden"
					animate="show"
					variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
				>
					{items.slice(0, 6).map((m, i) => (
						<motion.div key={i} variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="relative group border border-[#eee] rounded-2xl overflow-hidden bg-white shadow-sm">
							{m.type === 'video' ? <VideoCard m={m} /> : <img loading="lazy" src={m.src} alt={`photo-${i+1}`} className="w-full aspect-[3/4] object-cover" />}
						</motion.div>
					))}
				</motion.div>
			</section>
		</motion.div>
	);
}

function VideoCard({ m }) {
	const ref = useRef(null);
	const [playing, setPlaying] = useState(false);
	return (
		<div className="relative">
			<video
				ref={ref}
				controls={false}
				preload="metadata"
				poster={m.poster}
				className="w-full aspect-[3/4] object-cover"
				playsInline
				muted
			>
				<source src={m.src} type={m.mime || 'video/mp4'} />
			</video>
			<button
				onClick={() => {
					const v = ref.current; if (!v) return;
					if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
				}}
				className="absolute inset-0 grid place-items-center text-white/95"
				aria-label="play"
			>
				<span className={`inline-grid place-items-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/45 backdrop-blur ${playing ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
				</span>
			</button>
		</div>
	);
}

