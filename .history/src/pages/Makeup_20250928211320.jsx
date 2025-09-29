import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../index.css';

export default function Makeup() {
	const [items, setItems] = useState([]);
	useEffect(() => {
		fetch('/makeup/index.json').then(r => r.json()).then(setItems).catch(()=>setItems([]));
	}, []);

	return (
		<div>
			<section className="max-w-6xl mx-auto px-6 py-12">
				<h1 className="text-2xl md:text-3xl font-semibold">妆造服务</h1>
				<p className="text-[#666] mt-2">专业妆造，定格每一个高光时刻。</p>
						<motion.div
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, amount: 0.2 }}
							variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
							className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8"
						>
							{items.map((src, i) => (
								<motion.img
									key={i}
									variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }}
									src={src}
									alt="makeup"
									className="w-full h-52 object-cover rounded-xl border border-[#eee]"
								/>
							))}
						</motion.div>
			</section>
		</div>
	);
}

