import '../index.css';
import { motion } from 'framer-motion';

export default function About() {
	return (
		<motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
			<img src="/founder.jpg" alt="founder" className="w-full h-72 object-cover rounded-2xl border border-[#eee]" />
			<div>
				<h1 className="text-2xl md:text-3xl font-semibold">关于我们</h1>
				<p className="text-[#666] mt-3 leading-7">VIVIAN CELEBRITY 是一家专注个人形象打造与高端影像创作的团队，为客户提供妆造、摄影与定制化服务。</p>
			</div>
		</motion.section>
	);
}

