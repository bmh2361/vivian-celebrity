import '../index.css';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLang } from '../layout/Layout.jsx';

export default function About() {
	const { lang } = useLang();
	const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
	const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;

	const [members, setMembers] = useState([]);

	useEffect(() => {
		let cancelled = false;
		const load = async () => {
			// 1) 优先尝试 index.json（对象数组或字符串数组）
			try {
				const r = await fetch(withBase('/team/index.json'));
				if (r.ok) {
					const arr = await r.json();
					if (Array.isArray(arr) && arr.length) {
						const normalized = arr.map((item, idx) => normalizeItem(item, idx, withBase));
						if (!cancelled) setMembers(normalized.slice(0, 7));
						return;
					}
				}
			} catch {}

			// 2) 回退：1..7 自动探测图片，生成占位信息
			const exts = ['jpg', 'jpeg', 'png', 'webp'];
			const fallback = [];
			for (let i = 1; i <= 7; i++) {
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
			subtitle: '我们是一支跨中英文化、覆盖时尚与影视的精英团队：从高端造型与人像摄影，到商业广告、品牌短片与红毯活动，我们以国际化标准与定制化流程，打造具有审美张力与商业影响力的影像作品。核心服务涵盖妆造造型、时尚与人像摄影、短片与MV、活动与婚礼定制，以及高端私人定制旅拍。',
		},
		en: {
			title: 'Team',
			subtitle: 'We are a bilingual creative team across fashion and film. From premium styling and portrait photography to commercials, brand films and red-carpet events, we deliver high-aesthetic, business-effective visuals with international standards and bespoke workflows. Core services include makeup & styling, fashion/portrait photography, short films & MV, events and wedding couture, and bespoke destination shoots.',
		}
	}[lang] || {}), [lang]);

	const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.5, delay: d } });

	return (
		<div className="max-w-7xl mx-auto px-6 py-12">
			<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#111]">{t.title}</h1>
					<p className="text-[#666] mt-2">{t.subtitle}</p>
				</div>
				<a href={withBase('/pages/contact.html')} className="shrink-0 inline-flex items-center text-[#9A7B4F] hover:opacity-80 font-medium border-b border-transparent hover:border-[#9A7B4F]" title={lang === 'en' ? 'Contact us' : '联系我们'}>
					{lang === 'en' ? 'Contact us' : '联系我们'}
				</a>
			</motion.div>

			<div className="mt-8 space-y-6">
				{members.map((m, i) => (
					<motion.div key={i} {...fade(i * 0.03)} className="md:flex md:items-start md:gap-5 rounded-2xl border border-[#eee] bg-white p-4 md:p-5">
						<div className="md:w-[360px] lg:w-[420px] w-full">
							<img src={m.photo} alt={m.name} className="w-full h-auto rounded-xl object-contain bg-[#f7f7f7]" />
						</div>
						<div className="flex-1 mt-4 md:mt-0 flex flex-col">
							<div className="text-xl font-semibold text-[#111]">{display(m.name, m.nameEn, lang)}</div>
							<div className="text-[#9A7B4F] mt-1">{display(m.role, m.roleEn, lang)}</div>
							<p className="text-[#555] mt-3 leading-7 whitespace-pre-line">{display(m.bio, m.bioEn, lang)}</p>
						</div>
					</motion.div>
				))}
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

