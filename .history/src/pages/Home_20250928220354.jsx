import '../index.css';
import { motion } from 'framer-motion';
import { Icon } from '../icons.jsx';

export default function Home() {
	// 动画配置
	const fadeUp = (delay = 0) => ({ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6, ease: 'easeOut', delay } });
	const fade = (delay = 0) => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.7, ease: 'easeOut', delay } });

	return (
		<div className="">
			{/* Hero */}
			<section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14 pb-10 md:pb-16">
				<div className="grid md:grid-cols-2 gap-10 items-center">
					{/* 左侧文案 */}
					<div>
						<motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 text-xs text-[#9A7B4F] rounded-full border border-[#E6CF9A] px-3 py-1 bg-white/80">
							<span className="tracking-widest">VIVIAN CELEBRITY</span>
						</motion.div>
						<motion.h1 {...fadeUp(0.1)} className="mt-4 text-3xl md:text-[40px] leading-tight font-extrabold text-[#111]">
							英伦美学巅峰叙事
						</motion.h1>
						<motion.div {...fadeUp(0.2)} className="mt-3 text-[#666]">
							<div className="inline-flex flex-wrap items-center gap-2 text-sm">
								<span className="rounded-full bg-[#f9f7f1] text-[#9A7B4F] border border-[#E6CF9A] px-3 py-1">英国高端美业</span>
								<span className="rounded-full bg-[#f9f7f1] text-[#9A7B4F] border border-[#E6CF9A] px-3 py-1">影视 · 时尚 · 婚礼 · 旅拍 · 品牌合作</span>
							</div>
						</motion.div>
						<motion.div {...fadeUp(0.3)} className="mt-6 flex items-center gap-3">
							<a href="/pages/contact.html" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">
								<Icon name="CalendarDays" /> 预约咨询
							</a>
							<a href="/pages/portfolio.html" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#9A7B4F] border border-[#E6CF9A] bg-white hover:bg-[#f8f3e7] transition-colors">
								查看作品集
							</a>
						</motion.div>
					</div>

					{/* 右侧倾斜卡片图 */}
					<motion.div {...fade(0.15)} className="relative">
						<div className="relative mx-auto w-[86%] md:w-[88%] aspect-[4/3] bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden transform rotate-2">
							<img src="/hero-company.jpg" alt="cover" className="absolute inset-0 w-full h-full object-cover" />
						</div>
						<div className="absolute -bottom-4 -left-4 w-[30%] h-8 bg-black/5 blur-2xl rounded-full" aria-hidden />
					</motion.div>
				</div>
			</section>

			{/* 创始人模块 */}
			<section className="max-w-7xl mx-auto px-6 pb-16">
				<motion.div {...fade(0.05)} className="grid md:grid-cols-[1.1fr_1.4fr] gap-8 items-stretch border border-[#eee] rounded-3xl p-4 md:p-6 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
					{/* 左图 */}
					<div className="overflow-hidden rounded-2xl">
						<motion.img
							src="/founder.jpg"
							alt="founder"
							className="w-full h-[360px] md:h-full object-cover"
							initial={{ scale: 1.05, opacity: 0 }}
							whileInView={{ scale: 1, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, ease: 'easeOut' }}
						/>
					</div>

					{/* 右文案 */}
					<div className="flex flex-col">
																<motion.h2 {...fadeUp(0.05)} className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#111]">VIVIAN WANG</motion.h2>
																<motion.div {...fadeUp(0.12)} className="mt-1 text-xs md:text-sm tracking-widest text-[#CFAF6B]">造型总监 · VIVIAN CELEBRITY 创始人</motion.div>
																<motion.p {...fadeUp(0.16)} className="mt-3 text-sm leading-7 text-[#444]">
																	资深影视与时尚造型指导，深耕中英与国际项目，专注高端定制与叙事视觉美学，
																	将影片与品牌气质转化为优雅而具有辨识度的形象表现。
																</motion.p>

						<motion.div {...fadeUp(0.18)} className="mt-5 grid sm:grid-cols-2 gap-4">
							{/* 核心服务 */}
							<div className="rounded-2xl border border-[#eee] bg-white p-4">
								<div className="text-[#CFAF6B] font-semibold mb-2">核心服务</div>
								<ul className="text-sm text-[#555] space-y-1 list-disc list-inside">
									<li>英式定制妆造/礼服造型</li>
									<li>伦敦/大英地区高端拍摄</li>
									<li>Chaumet/珠宝/秀场/顶级合作</li>
								</ul>
							</div>
							{/* 服务领域 */}
							<div className="rounded-2xl border border-[#eee] bg-white p-4">
								<div className="text-[#CFAF6B] font-semibold mb-2">服务领域</div>
								<ul className="text-sm text-[#555] space-y-1 list-disc list-inside">
									<li>电影/短片/综艺/广告</li>
									<li>时尚大片/妆造/海外旅拍</li>
									<li>明星品牌/婚礼跟妆</li>
								</ul>
							</div>
						</motion.div>

						<motion.div {...fadeUp(0.24)} className="mt-6">
							<a href="/pages/contact.html" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">
								<Icon name="CalendarDays" /> 预约咨询通道
							</a>
						</motion.div>
					</div>
				</motion.div>
			</section>
		</div>
	);
}

