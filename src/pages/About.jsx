import '../index.css';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLang } from '../layout/Layout.jsx';

export default function About() {
	const { lang } = useLang();
	const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
	const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;

	const [members, setMembers] = useState([]);
	const [expanded, setExpanded] = useState(() => ({}));

	useEffect(() => {
		let cancelled = false;
		const load = async () => {
			// 1) 优先尝试 index.json（对象数组或字符串数组）
			try {
				// 加一个极轻的缓存绕过，避免 GitHub Pages 上 JSON 被旧缓存阻塞
				const r = await fetch(withBase('/team/index.json') + '?v=1', { cache: 'no-store' });
				if (r.ok) {
					const arr = await r.json();
					if (Array.isArray(arr) && arr.length) {
						const normalized = arr.map((item, idx) => normalizeItem(item, idx, withBase));
						if (!cancelled) setMembers(normalized);
						return;
					}
				}
			} catch {}

			// 2) 回退：按序号自动探测图片，生成占位信息
			const exts = ['jpg', 'jpeg', 'png', 'webp'];
			const fallback = [];
			for (let i = 1; i <= 30; i++) {
				let hit = null;
				for (const ext of exts) {
					const url = withBase(`/team/${i}.${ext}`);
					try {
						const r = await fetch(url, { method: 'HEAD' });
						if (r.ok) { hit = url; break; }
					} catch {}
				}
				if (hit) fallback.push({
					photo: hit,
					name: lang === 'en' ? `Member ${i}` : `成员 ${i}`,
					role: lang === 'en' ? 'Team Member' : '团队成员',
					bio: lang === 'en' ? 'Profile coming soon.' : '简介待补充。'
				});
			}
			if (!cancelled) setMembers(fallback);
		};
		load();
		return () => { cancelled = true; };
	}, [lang]);

	const t = useMemo(() => ({
		zh: {
			title: '团队',
			subtitle: '我们是一支连接中英、覆盖创意、影视制作、技术研究与企业合作的复合团队：从高端造型与商业影像，到品牌内容、跨境项目协调与英国本地执行，我们以国际化标准和清晰的协作流程，为客户组织兼具审美表达与商业价值的项目交付。',
		},
		en: {
			title: 'Team',
			subtitle: 'We are a UK–China team spanning creative direction, film production, technology, research and corporate collaboration. From premium styling and commercial visuals to brand content, cross-border coordination and UK-based execution, we organise clear delivery around both aesthetic quality and commercial purpose.',
		}
	}[lang] || {}), [lang]);

	const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.5, delay: d } });

	return (
		<div className="max-w-7xl mx-auto px-6 py-12">
			<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#111]">{t.title}</h1>
					<p className={`text-[#666] mt-2 ${lang === 'en' ? 'leading-7 max-w-3xl break-words' : ''}`}>{t.subtitle}</p>
				</div>
				<a href={withBase('/pages/contact.html')} className="shrink-0 inline-flex items-center text-[#9A7B4F] hover:opacity-80 font-medium border-b border-transparent hover:border-[#9A7B4F]" title={lang === 'en' ? 'Contact us' : '联系我们'}>
					{lang === 'en' ? 'Contact us' : '联系我们'}
				</a>
			</motion.div>

			<div className="mt-8 space-y-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{members.map((m, i) => {
						const bioText = display(m.bio, m.bioEn, lang);
						const isExpanded = !!expanded[i];
						const canExpand = !!bioText && bioText.length > 220;
						return (
						<motion.div key={i} {...fade(i * 0.03)} className="rounded-2xl border border-[#eee] bg-white p-4 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
							<div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#f7f7f7]">
								<img
									src={m.photo}
									alt={m.nameEn || m.name || ''}
									className="w-full h-full object-contain"
									loading="lazy"
									decoding="async"
								/>
							</div>
							<div className="mt-4">
								<div className="text-lg font-semibold text-[#111] leading-snug">{m.nameEn || m.name || ''}</div>
								<div className="text-[#9A7B4F] mt-1 text-sm leading-6 break-words">{display(m.role, m.roleEn, lang)}</div>
								<p
									className="text-[#555] mt-3 text-sm leading-6 whitespace-pre-line break-words"
									style={
										isExpanded
											? undefined
											: { display: '-webkit-box', WebkitLineClamp: 10, WebkitBoxOrient: 'vertical', overflow: 'hidden' }
									}
								>
									{bioText}
								</p>
								{canExpand && (
									<button
										type="button"
										onClick={() => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))}
										className="mt-2 text-sm font-medium text-[#9A7B4F] hover:underline"
									>
										{lang === 'en' ? (isExpanded ? 'Collapse' : 'Read more') : (isExpanded ? '收起' : '展开全文')}
									</button>
								)}
							</div>
						</motion.div>
					);
					})}
				</div>
			</div>
		</div>
	);
}

function normalizeItem(item, idx, withBase) {
	if (typeof item === 'string') {
		return { photo: withBase(item), name: `成员 ${idx + 1}`, nameEn: `Member ${idx + 1}`, role: '团队成员', roleEn: 'Team Member', bio: '简介待补充。', bioEn: 'Profile coming soon.' };
	}
	// 兼容 { photo, name, role, bio } 或 { src } 或 { zh: {..}, en: {..} }
	if (item.zh || item.en) {
		const zh = item.zh || {}; const en = item.en || {};
		return {
			photo: withBase(item.photo || item.src || zh.photo || en.photo || '/team/1.jpg'),
			name: zh.name, nameEn: en.name,
			role: zh.role, roleEn: en.role,
			bio: zh.bio, bioEn: en.bio,
		};
	}
	return {
		photo: withBase(item.photo || item.src || `/team/${idx + 1}.jpg`),
		name: item.name, nameEn: item.nameEn,
		role: item.role, roleEn: item.roleEn,
		bio: item.bio, bioEn: item.bioEn,
	};
}

function display(zh, en, lang) {
	return lang === 'en' ? (en || zh || '') : (zh || en || '');
}

