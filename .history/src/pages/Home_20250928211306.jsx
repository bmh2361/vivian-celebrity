import '../index.css';
import { motion } from 'framer-motion';

export default function Home() {
	const cards = [
		{ t: '妆造', p: '/pages/makeup.html' },
		{ t: '摄影', p: '/pages/photography.html' },
		{ t: '作品集', p: '/pages/portfolio.html' },
	];
	return (
		<div>
			<section className="relative overflow-hidden">
				<motion.img
					initial={{ scale: 1.08, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					src="/hero-company.jpg"
					alt="hero"
					className="w-full h-[52vh] md:h-[68vh] object-cover"
				/>
				<div className="absolute inset-0 bg-black/35" />
				<div className="absolute inset-0 flex items-center justify-center">
					<motion.h1
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-white text-3xl md:text-5xl tracking-wide"
					>
						VIVIAN CELEBRITY
					</motion.h1>
				</div>
			</section>
			<motion.section
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.2 }}
				variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
				className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6"
			>
				{cards.map((it) => (
					<motion.a
						key={it.t}
						variants={{ hidden: { y: 16, opacity: 0 }, show: { y: 0, opacity: 1 } }}
						href={it.p}
						className="group block border border-[#eaeaea] rounded-2xl overflow-hidden hover:shadow-sm transition"
					>
						<div className="p-6">
							<div className="text-xl font-medium text-[#111] group-hover:underline">{it.t}</div>
							<div className="text-[#666] mt-1">了解更多 →</div>
						</div>
					</motion.a>
				))}
			</motion.section>
		</div>
	);
}

