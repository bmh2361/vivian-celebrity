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
				// 只接受视频条目，统一加 BASE_URL 和 poster 回退
				const normalized = arr
					.map((m) => (typeof m === 'string' ? { src: m } : m))
					.filter((m) => /\.(mp4|mov|webm)$/i.test(m.src || ''))
					.slice(0, 6)
					.map((m) => {
						const posterGuess = (m.poster && /\.(jpg|jpeg|png|webp)$/i.test(m.poster))
							? m.poster
							: (m.src || '').replace(/\.(mp4|mov|webm)$/i, '.jpg');
						return { type: 'video', src: withBase(m.src), poster: withBase(posterGuess), mime: m.mime || 'video/mp4' };
					});
				setItems(normalized.length ? normalized : fallback);
			})
			.catch((e) => { console.warn('[photography] fallback to defaults:', e); setItems(fallback); });
	}, []);

	const copy = {
		zh: {
			title: '影像美学',
			subtitle: '以电影级影像语言，打造“可传播”的人物与品牌内容：从策划到拍摄，再到后期与发布建议，全链路为英国场景而生。',
			forWhoTitle: '面向人群',
			forWho: [
				'短剧 / 短视频内容团队：英国落地拍摄与制作统筹',
				'KOL / KOC / Influencer：建立英伦质感的个人内容体系',
				'出海品牌 / 产品：英国市场传播物料与内容矩阵',
				'个人形象与职业名片：高端肖像与社媒视觉统一',
			],
			platformsTitle: '宣传平台',
			platforms: ['小红书', '抖音', 'TikTok', 'Instagram'],
			aestheticsTitle: '多元审美适配',
			aesthetics: [
				'亚洲细节审美 × 欧洲氛围叙事：兼顾质感与传播效率',
				'人物气质与镜头语言统一：更适配英伦场景与国际审美',
				'肤色与光影友好：室内外/阴晴/舞台多环境稳定呈现',
			],
			capTitle: '能力覆盖',
			caps: [
				{ t: '拍摄与器材', d: '电影级机身/镜头/灯光方案，多场景稳定输出质感。' },
				{ t: '策划与分镜', d: '选题定位、脚本结构、分镜与场景规划，保证内容方向可落地。' },
				{ t: '短剧/短视频制作', d: '拍摄统筹、现场执行、多机位节奏把控，适配平台内容逻辑。' },
				{ t: '后期与包装', d: '剪辑、调色、字幕与视觉包装，让内容更“像品牌”。' },
				{ t: '传播与交付', d: '面向英国传播场景：输出多比例版本与发布建议（可中英双语）。' },
			],
			showcase: '案例展示',
			more: '联系我们，获取更多案例',
		},
		en: {
			title: 'Visual Aesthetics',
			subtitle: 'Cinematic visual language for content that travels—strategy, shoot, post, and delivery tailored for UK visibility.',
			forWhoTitle: 'Best For',
			forWho: [
				'Short drama / short-form teams — UK-based shoots & production coordination',
				'KOL/KOC/Influencers — premium personal content system for UK visibility',
				'Brands & products — UK market content assets and distribution-ready materials',
				'Personal branding — premium portraits and cohesive social identity',
			],
			platformsTitle: 'Platforms',
			platforms: ['Xiaohongshu', 'Douyin', 'TikTok', 'Instagram'],
			aestheticsTitle: 'Aesthetic Range',
			aesthetics: [
				'Asian detail-driven polish × European cinematic mood',
				'Character-first framing aligned with UK settings',
				'Skin-tone & lighting friendly across changing weather and venues',
			],
			capTitle: 'What We Cover',
			caps: [
				{ t: 'Cameras & lighting', d: 'Film-grade setup with consistent output across locations.' },
				{ t: 'Planning & storyboards', d: 'Positioning, scripting, shot lists and on-set execution plans.' },
				{ t: 'Short-form production', d: 'Production coordination and pacing for platform-first content.' },
				{ t: 'Post-production', d: 'Edit, grade, subtitles and visual packaging that looks premium.' },
				{ t: 'UK-ready delivery', d: 'Multi-format exports plus release suggestions (CN/EN optional).' },
			],
			showcase: 'Case Showcase',
			more: 'Contact us for more work',
		}
	};
	const t = copy[lang] || copy.zh;

	return (
		<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
			<section className="max-w-7xl mx-auto px-6 pt-10 md:pt-12 pb-8">
				<div className="rounded-3xl border border-[#eee] bg-white shadow-[0_6px_22px_rgba(0,0,0,0.05)] p-6 md:p-8">
					<div className="flex items-center gap-3 text-[#CFAF6B]">
						<span className="text-xs font-semibold tracking-[0.15em]">VIVIAN ADVENTURE</span>
						<span className="h-px flex-1 bg-[#E6CF9A]" />
					</div>
					<h1 className="mt-5 text-2xl md:text-3xl font-extrabold tracking-wide text-[#111]">{t.title}</h1>
					<p className="text-[#666] mt-2 leading-7">{t.subtitle}</p>

					<div className="mt-6 grid md:grid-cols-2 gap-4 items-start">
						<div className="rounded-2xl border border-[#eee] bg-[#fbfaf7] p-5">
							<div className="text-[12px] tracking-[0.2em] text-[#CFAF6B]">{t.forWhoTitle}</div>
							<ul className="mt-3 space-y-2 text-sm text-[#333]">
								{t.forWho.map((line, idx) => (
									<li key={idx} className="flex gap-2">
										<span className="mt-[9px] h-[5px] w-[5px] rounded-full bg-[#CFAF6B] shrink-0" />
										<span>{line}</span>
									</li>
								))}
							</ul>
							{Array.isArray(t.platforms) && t.platforms.length ? (
								<div className="mt-5 pt-4 border-t border-[#eee]">
									<div className="text-[12px] tracking-[0.2em] text-[#CFAF6B]">{t.platformsTitle}</div>
									<div className="mt-3 flex flex-wrap gap-2">
										{t.platforms.map((p, idx) => (
											<span key={idx} className="text-xs px-3 py-1 rounded-full bg-white border border-[#eee] text-[#444]">
												{p}
											</span>
										))}
									</div>
								</div>
							) : null}
							{Array.isArray(t.aesthetics) && t.aesthetics.length ? (
								<div className="mt-5 pt-4 border-t border-[#eee]">
									<div className="text-[12px] tracking-[0.2em] text-[#CFAF6B]">{t.aestheticsTitle}</div>
									<ul className="mt-3 space-y-2 text-sm text-[#333]">
										{t.aesthetics.map((line, idx) => (
											<li key={idx} className="flex gap-2">
												<span className="mt-[9px] h-[5px] w-[5px] rounded-full bg-[#CFAF6B] shrink-0" />
												<span>{line}</span>
											</li>
										))}
									</ul>
								</div>
							) : null}
						</div>
						<div className="rounded-2xl border border-[#eee] bg-white p-5">
							<div className="text-[12px] tracking-[0.2em] text-[#CFAF6B]">{t.capTitle}</div>
							<div className="mt-3 grid gap-3">
								{t.caps.map((c, idx) => (
									<div key={idx} className="rounded-xl border border-[#f0f0f0] bg-white px-4 py-3">
										<div className="text-sm font-semibold text-[#111]">{c.t}</div>
										<div className="mt-1 text-sm text-[#555] leading-6">{c.d}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="max-w-7xl mx-auto px-6 pb-16">
				<div className="flex items-end justify-between mb-5">
					<h2 className="text-xl md:text-2xl font-bold text-[#111]">{t.showcase}</h2>
					<a href={withBase('/pages/contact.html')} className="text-sm text-[#9A7B4F] hover:underline">{t.more}</a>
				</div>
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
								{m.type === 'video' ? <VideoCard m={m} /> : <img loading="lazy" decoding="async" src={m.src} alt={`photo-${i+1}`} className="w-full aspect-[3/4] object-cover" />}
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
	const [shouldLoad, setShouldLoad] = useState(false);
	const wrapRef = useRef(null);

	// 策略优化（不改变视觉）：
	// - 首次渲染只加载 poster，不拉取视频文件
	// - 接近可视区域再挂载 <source>
	useEffect(() => {
		const el = wrapRef.current;
		if (!el || shouldLoad) return;
		if (typeof IntersectionObserver === 'undefined') {
			setShouldLoad(true);
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					setShouldLoad(true);
					io.disconnect();
				}
			},
			{ root: null, rootMargin: '600px 0px', threshold: 0.01 }
		);
		io.observe(el);
		return () => io.disconnect();
	}, [shouldLoad]);

	useEffect(() => {
		const v = ref.current;
		if (!v) return;
		// 挂载 source 后手动 load，避免浏览器提前预取
		if (shouldLoad) {
			try { v.load(); } catch (_) {}
		}
	}, [shouldLoad]);
	// 切换播放/暂停，并在播放时暂停其它视频
	const togglePlay = () => {
		const v = ref.current; if (!v) return;
		if (!shouldLoad) setShouldLoad(true);
		if (v.paused) {
			// 暂停其他视频
			document.querySelectorAll('video').forEach((el) => { if (el !== v) try { el.pause(); } catch(_){} });
			v.play();
			setPlaying(true);
		} else {
			v.pause();
			setPlaying(false);
		}
	};
	return (
		<div ref={wrapRef} className="relative">
			<video
				ref={ref}
				controls={false}
				preload="none"
				poster={m.poster}
				className="w-full aspect-[3/4] object-cover"
				playsInline
			>
				{shouldLoad ? <source src={m.src} type={m.mime || 'video/mp4'} /> : null}
			</video>
			{/* 覆盖整卡片，可点击任意位置播放/暂停；按钮样式为白色圆形 */}
			<button
				onClick={togglePlay}
				onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePlay(); } }}
				className="absolute inset-0 grid place-items-center focus:outline-none"
				aria-label={playing ? 'pause video' : 'play video'}
				tabIndex={0}
			>
				<span className={`inline-grid place-items-center w-12 h-12 md:w-12 md:h-12 rounded-full bg-white text-black shadow-[0_3px_12px_rgba(0,0,0,0.18)] ring-1 ring-black/10 transition-all ${playing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} `}>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
				</span>
			</button>
		</div>
	);
}

