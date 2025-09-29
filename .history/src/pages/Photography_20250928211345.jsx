import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import '../index.css';

export default function Photography() {
	const [media, setMedia] = useState([]);
	useEffect(() => { fetch('/photography/index.json').then(r=>r.json()).then(setMedia).catch(()=>setMedia([])); }, []);

		return (
			<motion.section
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.15 }}
				variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
				className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-6"
			>
				{media.map((m, i) => (
					<motion.div key={i} variants={{ hidden: { y: 14, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="relative group border border-[#eee] rounded-xl overflow-hidden">
						{m.type === 'video' ? <VideoCard m={m} /> : <img src={m.src} alt="photo" className="w-full h-64 object-cover" />}
					</motion.div>
				))}
			</motion.section>
		);
}

	function VideoCard({ m }) {
		const ref = useRef(null);
		const [playing, setPlaying] = useState(false);
		return (
			<div className="relative">
				<video ref={ref} controls={false} preload="metadata" poster={m.poster} className="w-full h-64 object-cover">
					<source src={m.src} type={m.mime || 'video/mp4'} />
				</video>
				<button
					onClick={() => {
						const v = ref.current; if (!v) return;
						if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
					}}
					className="absolute inset-0 grid place-items-center text-white/95"
					aria-label="play"
				>
					<span className={`inline-grid place-items-center w-12 h-12 rounded-full bg-black/45 backdrop-blur ${playing ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
					</span>
				</button>
			</div>
		);
	}

