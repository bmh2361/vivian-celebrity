import '../index.css';
import { motion } from 'framer-motion';

export default function Contact() {
	return (
		<motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto px-6 py-12">
			<h1 className="text-2xl md:text-3xl font-semibold">联系我们</h1>
			<p className="text-[#666] mt-3">请通过以下方式预约咨询：</p>
			<ul className="mt-4 space-y-2 text-[#444]">
				<li>微信：vivian-celebrity</li>
				<li>电话：+86 123-4567-8901</li>
				<li>邮箱：hello@vivian.com</li>
			</ul>
		</motion.section>
	);
}

