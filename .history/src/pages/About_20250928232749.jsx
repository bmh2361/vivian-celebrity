import '../index.css';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLang } from '../layout/Layout.jsx';

export default function About() {
	const { lang } = useLang();
	const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
	const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;

	const [images, setImages] = useState([]);
	const [viewer, setViewer] = useState(null); // 预览索引

	useEffect(() => {
		let cancelled = false;
		const load = async () => {
			// 1) 优先尝试 index.json
			try {
				const r = await fetch(withBase('/team/index.json'));
				if (r.ok) {
					const arr = await r.json();
					if (Array.isArray(arr) && arr.length) {
						const prefixed = arr.map((p) => withBase(p));
						if (!cancelled) setImages(prefixed);
						return;
					}
				}
			} catch {}

			// 2) 回退：按 1..60 遍历常见扩展名，HEAD 探测存在
			const exts = ['jpg', 'jpeg', 'png', 'webp'];
			const found = [];
			for (let i = 1; i <= 60; i++) {
				let hit = null;
				for (const ext of exts) {
					const url = withBase(`/team/${i}.${ext}`);
					try {
						const r = await fetch(url, { method: 'HEAD' });
						if (r.ok) { hit = url; break; }
					} catch {}
				}
				if (hit) found.push(hit);
			}
			if (!cancelled) setImages(found);
		};
		load();
		return () => { cancelled = true; };
	}, []);

	const t = useMemo(() => ({
		zh: {
			title: '团队',
			subtitle: '将团队照片拖入 public/team 文件夹（或提供 team/index.json），页面将自动展示。支持 JPG/PNG/WEBP。',
		},
		en: {
			title: 'Team',
			subtitle: 'Drop team photos into public/team (or provide team/index.json) and they will show automatically. Supports JPG/PNG/WEBP.',
		}
	}[lang] || {}), [lang]);

	return (
		<div className="max-w-7xl mx-auto px-6 py-12">
			<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#111]">{t.title}</h1>
				<p className="text-[#666] mt-2">{t.subtitle}</p>
			</motion.div>

			<div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
				{images.map((src, i) => (
					<button key={src} onClick={() => setViewer(i)} className="group relative rounded-xl border border-[#eee] bg-white overflow-hidden">
						<img loading="lazy" src={src} alt={`member-${i+1}`} className="w-full h-40 md:h-44 object-cover group-hover:scale-[1.02] transition-transform duration-500" />
					</button>
				))}
			</div>

			{/* 简易图片查看器 */}
			{viewer !== null && images[viewer] && (
				<div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4" onClick={() => setViewer(null)}>
					<img src={images[viewer]} alt="viewer" className="max-w-[92vw] max-h-[88vh] object-contain rounded-xl shadow-2xl" />
				</div>
			)}
		</div>
	);
}

