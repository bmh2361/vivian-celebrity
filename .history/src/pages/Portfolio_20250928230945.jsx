import '../index.css';

const imgs = Array.from({ length: 34 }, (_, i) => `/portfolio/${i + 1}.jpg`);

export default function Portfolio() {
	const col = (start, step) => imgs.filter((_, i) => i % 3 === start);
	return (
		<section className="max-w-6xl mx-auto px-6 py-12">
			<h1 className="text-2xl md:text-3xl font-semibold">作品集</h1>
			<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 [--dur:36s] [--gap:1rem]">
				{[0, 1, 2].map((s) => (
					<MarqueeColumn key={s} images={col(s)} reverse={s !== 1} />
				))}
			</div>
		</section>
	);
}

function MarqueeColumn({ images, reverse }) {
	const cls = `flex flex-col gap-4 marquee-runner marquee-allow-motion`;
	return (
		<div className="overflow-hidden rounded-xl border border-[#eee] p-2">
			<div
				className={cls}
				style={{
					['--gap']: '1rem',
					animationName: 'marquee-y',
					animationDuration: 'var(--dur, 36s)',
					animationTimingFunction: 'linear',
					animationIterationCount: 'infinite',
					animationDirection: reverse ? 'reverse' : 'normal'
				}}
			>
				{[...images, ...images].map((src, i) => (
					<img key={src + i} src={src} alt="work" className="w-full h-auto object-contain rounded-lg" />
				))}
			</div>
		</div>
	);
}

