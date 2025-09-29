import '../index.css';
import { motion } from 'framer-motion';

export default function Bespoke() {
	const services = [
		{ title: '豪车拍摄', desc: '尊享豪华座驾主题拍摄，彰显不凡品味。', img: '/portfolio/12.jpg' },
		{ title: '直升机航拍', desc: '高空视角记录你的高光时刻。', img: '/portfolio/21.jpg' },
	];
	const steps = [
		'01 咨询与策划',
		'02 形象定位',
		'03 试妆（可选）',
		'04 服装搭配（可选）',
		'05 拍摄执行',
		'06 后期制作与交付',
	];
		return (
			<div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
				<h1 className="text-2xl md:text-3xl font-semibold">高端定制服务</h1>
				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.2 }}
					variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
					className="grid md:grid-cols-2 gap-6"
				>
					{services.map((s) => (
						<motion.div key={s.title} variants={{ hidden: { y: 16, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="border border-[#eee] rounded-2xl overflow-hidden">
							<img src={s.img} alt={s.title} className="w-full h-60 object-cover" />
							<div className="p-6">
								<div className="text-xl font-medium text-[#111]">{s.title}</div>
								<p className="text-[#666] mt-1">{s.desc}</p>
							</div>
						</motion.div>
					))}
				</motion.div>
				<motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
					<h2 className="text-xl font-medium">服务流程</h2>
					<ol className="mt-4 grid md:grid-cols-3 gap-3 text-[#444]">
						{steps.map((t, i) => (
							<li key={i} className="border border-[#eee] rounded-xl px-4 py-3">{t}</li>
						))}
					</ol>
				</motion.div>
			</div>
		);
}

