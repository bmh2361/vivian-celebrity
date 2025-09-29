import '../index.css';
import { motion } from 'framer-motion';
import { useLang } from '../layout/Layout.jsx';

// 极简图标
function Icon({ name }) {
	const common = 'w-6 h-6';
	if (name === 'car') {
		return (
			<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<path d="M3 13l2-5a3 3 0 0 1 2.8-2h6.4a3 3 0 0 1 2.8 2l2 5" />
				<rect x="2" y="12" width="20" height="6" rx="2" />
				<circle cx="7" cy="16" r="1.8" />
				<circle cx="17" cy="16" r="1.8" />
			</svg>
		);
	}
	if (name === 'heli') {
		return (
			<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<path d="M3 7h18" />
				<rect x="5" y="11" width="10" height="4" rx="2" />
				<path d="M15 13h3l2 2" />
				<circle cx="7" cy="17" r="1.6" />
			</svg>
		);
	}
	return null;
}

export default function Bespoke() {
	const { lang } = useLang();
	const copy = {
		zh: {
			title: '高端定制服务',
			services: [
				{
					title: '豪车拍摄',
					desc: '专属路线与封控协调，匹配车款与造型，打造具传播属性的高端形象大片。',
					points: ['车型与配色方案', '道路协调与行驶许可', '驾控与安全保障', '车内/车外多机位拍摄']
				},
				{
					title: '直升机拍摄',
					desc: '空域审批与停机坪协作，航线与飞行计划定制，空地联动完成震撼空中视角。',
					points: ['空域/航线审批', '停机坪与地面联络', '飞行计划与安全评估', '空地多机位协同']
				},
			],
			flowTitle: '服务流程',
			steps: [
				{ k: '01 咨询与策划', v: '需求访谈、预算与时间线、风格方向与风险评估。' },
				{ k: '02 取景与许可', v: '路线/场地勘察；道路封控/空域审批/保险等合规准备。' },
				{ k: '03 形象与服装', v: '形象定位，造型与服装矩阵，试装/试妆（可选）。' },
				{ k: '04 方案与排期', v: '详细拍摄日程、机位/飞行计划、交通机动与应急预案。' },
				{ k: '05 拍摄执行', v: '导演沟通、灯光与设备、安保与现场安全，按计划高效执行。' },
				{ k: '06 后期与交付', v: '精选与剪辑、调色与声音、成片规格与备份，按需交付。' },
			],
			note: '注：试妆/试装为可选；空域审批周期因地区与航线不同而异。'
		},
		en: {
			title: 'Bespoke Production',
			services: [
				{
					title: 'Luxury Car Shoot',
					desc: 'Route control and model matching to craft a striking, share‑worthy premium image.',
					points: ['Car model & color scheme', 'Road coordination & permits', 'Driving & safety assurance', 'In‑car/on‑car multi‑camera']
				},
				{
					title: 'Helicopter Shoot',
					desc: 'Airspace clearance and helipad coordination, custom flight plan and air‑ground sync.',
					points: ['Airspace/route permits', 'Helipad & ground liaison', 'Flight plan & safety review', 'Air‑ground multi‑camera']
				},
			],
			flowTitle: 'Workflow',
			steps: [
				{ k: '01 Discovery & Planning', v: 'Goals, budget & timeline, style direction and risk assessment.' },
				{ k: '02 Locations & Permits', v: 'Scouting; road control/airspace clearance/insurance and compliance.' },
				{ k: '03 Styling & Wardrobe', v: 'Identity, styling plan and wardrobe matrix; test look/makeup (optional).' },
				{ k: '04 Schedule & Plan', v: 'Detailed schedule, camera/flight plan, logistics and contingency.' },
				{ k: '05 Production', v: 'Direction, lighting & gear, security and on‑site safety; efficient execution.' },
				{ k: '06 Post & Delivery', v: 'Selects, edit & grade, sound, deliverables spec and backups.' },
			],
			note: 'Note: Test look/makeup optional; airspace lead time varies by region and route.'
		}
	};

	const t = copy[lang] || copy.zh;

	const fade = (d = 0) => ({ initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.5, delay: d } });

	return (
		<div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
			<h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#111]">{t.title}</h1>

			{/* 两个服务模块（无图片） */}
			<div className="grid md:grid-cols-2 gap-6">
				{t.services.map((s, i) => (
					<motion.div key={s.title} {...fade(i * 0.05)} className="rounded-2xl border border-[#eee] bg-white p-6 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
						<div className="flex items-start gap-3">
							<div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#E6CF9A] text-[#9A7B4F] bg-[#fbf8ef]">
								<Icon name={i === 0 ? 'car' : 'heli'} />
							</div>
							<div>
								<div className="text-lg font-semibold text-[#111]">{s.title}</div>
								<p className="text-[#666] mt-1">{s.desc}</p>
								<ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-[#444]">
									{s.points.map((p) => (
										<li key={p} className="px-3 py-2 rounded-lg border border-[#f0f0f0] bg-[#fafafa]">{p}</li>
									))}
								</ul>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* 服务流程 */}
			<motion.div {...fade(0.2)}>
				<h2 className="text-xl md:text-2xl font-bold text-[#111]">{t.flowTitle}</h2>
				<ol className="mt-4 grid md:grid-cols-3 gap-3">
					{t.steps.map((s, i) => (
						<li key={i} className="rounded-xl border border-[#eee] bg-white px-4 py-3 text-[#444]">
							<div className="font-semibold text-[#111]">{s.k}</div>
							<div className="mt-1 text-sm leading-6">{s.v}</div>
						</li>
					))}
				</ol>
				<p className="text-xs text-[#888] mt-3">{t.note}</p>
			</motion.div>
		</div>
	);
}

