import '../index.css';
import { useEffect, useState, useRef } from 'react';
import { useLang } from '../layout/Layout.jsx';

// 动态加载逻辑说明：
// 1. 优先尝试 /portfolio/index.json （数组：可为字符串数组或对象数组 { src }），保持可控顺序
// 2. 若不存在或为空，则按序号自动探测：1,2,3,... 直到遇到连续 miss 达到阈值 (gapLimit)
// 3. 支持扩展名：.jpg/.jpeg/.png/.webp；按编号升序排序，未来新增只需上传命名为数字即可自动生效
// 4. 使用 HEAD 探测避免加载失败产生多余网络体积

const exts = ['jpg', 'jpeg', 'png', 'webp'];
const gapLimit = 6;         // 允许的连续缺失上限（超过则停止）
const maxProbe = 400;       // 为未来扩展预留上界

async function probeSequential(withBase) {
	const found = [];
	let consecutiveMiss = 0;
	for (let i = 1; i <= maxProbe; i++) {
		let hit = null;
		for (const ext of exts) {
			const url = withBase(`/portfolio/${i}.${ext}`);
			try {
				const r = await fetch(url, { method: 'HEAD' });
				if (r.ok) { hit = `/portfolio/${i}.${ext}`; break; }
			} catch {}
		}
		if (hit) {
			found.push(hit);
			consecutiveMiss = 0; // 重置
		} else {
			if (found.length) {
				consecutiveMiss++;
				if (consecutiveMiss >= gapLimit) break;
			}
		}
	}
	return found;
}

async function loadImages(withBase) {
	// 1) 尝试 index.json
	try {
		const r = await fetch(withBase('/portfolio/index.json') + '?v=1', { cache: 'no-store' });
		if (r.ok) {
			const data = await r.json();
			if (Array.isArray(data) && data.length) {
				const list = data.map(it => {
					if (typeof it === 'string') return it;
					if (it && typeof it === 'object') return it.src || it.url || it.path || '';
					return '';
				}).filter(Boolean);
				if (list.length) return list;
			}
		}
	} catch {}
	// 2) 回退顺序探测
	return await probeSequential(withBase);
}

export default function Portfolio() {
	const { lang } = useLang ? useLang() : { lang: 'zh' };
	const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
	const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;
	const moreText = lang === 'en' ? 'Contact us for more work' : '联系我们，获取更多案例';
	const titleText = lang === 'en' ? 'Portfolio' : '作品集';
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			setLoading(true);
			const list = await loadImages(withBase);
			if (!cancelled) {
				// 统一排序：按数字编号；非纯数字项排到后面
				const sorted = [...list].sort((a, b) => {
					const ra = /\/portfolio\/(\d+)\./.exec(a); const rb = /\/portfolio\/(\d+)\./.exec(b);
					if (ra && rb) return Number(ra[1]) - Number(rb[1]);
					if (ra) return -1; if (rb) return 1; return a.localeCompare(b);
				});
				setImages(sorted);
				setLoading(false);
			}
		})();
		return () => { cancelled = true; };
	}, []);

	const col = (start) => images.filter((_, i) => i % 3 === start);

	return (
		<section className="max-w-6xl mx-auto px-6 py-12">
			<div className="flex items-end justify-between mb-5">
				<h1 className="text-2xl md:text-3xl font-semibold">{titleText}</h1>
				<a href={withBase('/pages/contact.html')} className="text-sm text-[#9A7B4F] hover:underline">{moreText}</a>
			</div>
			{loading && (
				<div className="text-sm text-[#999] py-8">{lang === 'en' ? 'Loading works...' : '图片加载中...'}</div>
			)}
			{!loading && images.length === 0 && (
				<div className="text-sm text-[#999] py-8">{lang === 'en' ? 'No images found.' : '暂无图片。'}</div>
			)}
			{!loading && images.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 [--dur:36s] [--gap:1rem]">
					{[0, 1, 2].map((s) => (
						<MarqueeColumn key={s} images={col(s)} reverse={s !== 1} />
					))}
				</div>
			)}
		</section>
	);
}

function MarqueeColumn({ images, reverse }) {
	// 基于首份高度的精准循环：两份堆叠，父容器高度=首份高度，动画 translateY(-h)
	const firstRef = useRef(null);
	const moverRef = useRef(null);
	const [h, setH] = useState(null);
	const loaded = useRef(0);

	const onErr = (e) => { e.currentTarget.style.display = 'none'; };
	const onLoad = () => {
		loaded.current++;
		if (loaded.current >= images.length && firstRef.current) {
			const hh = firstRef.current.scrollHeight;
			if (hh && hh !== h) setH(hh);
		}
	};

	// 兜底：若有懒加载或某些图片未触发 onLoad，再测一次
	useEffect(() => {
		const t = setTimeout(() => {
			if (firstRef.current && !h) {
				const hh = firstRef.current.scrollHeight;
				if (hh) setH(hh);
			}
		}, 1200);
		return () => clearTimeout(t);
	}, [h]);

	return (
		<div className="relative overflow-hidden rounded-xl border border-[#eee] pt-0 px-2 pb-2 bg-white/70" style={{ height: h ? h + 'px' : 'auto' }}>
			<div
				ref={moverRef}
				className="absolute inset-0 flex flex-col gap-4 marquee-runner marquee-allow-motion"
				style={{
					['--gap']: '1rem',
					animationName: h ? 'marquee-dyn' : 'none',
					animationDuration: 'var(--dur, 80s)',
					animationTimingFunction: 'linear',
					animationIterationCount: 'infinite',
					animationDirection: reverse ? 'reverse' : 'normal',
					['--h']: h ? h + 'px' : undefined
				}}
			>
				<div ref={firstRef} className="flex flex-col gap-4">
					{images.map((src, i) => (
						<img
							key={'a' + src + i}
							src={src}
							alt=""
							loading="eager"
							decoding="async"
							onError={onErr}
							onLoad={onLoad}
							className="w-full max-w-full h-auto object-cover rounded-lg bg-[#f5f5f5] select-none"
							draggable={false}
						/>
					))}
				</div>
				<div className="flex flex-col gap-4" aria-hidden="true">
					{images.map((src, i) => (
						<img
							key={'b' + src + i}
							src={src}
							alt=""
							loading="lazy"
							decoding="async"
							onError={onErr}
							className="w-full max-w-full h-auto object-cover rounded-lg bg-[#f5f5f5] select-none"
							draggable={false}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

