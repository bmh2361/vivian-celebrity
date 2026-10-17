import { motion, useReducedMotion } from 'framer-motion';

export default function CommercialCapabilities({ title, text, items, withBase, home = false }) {
  const reduced = useReducedMotion();
  return (
			<motion.section initial={home && reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.55 }} className={home ? 'home-commercial-capabilities layout-standard max-w-7xl mx-auto px-6' : undefined}>
				<p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B4F]">WHAT WE CAN DELIVER</p>
				<h2 className="mt-4 max-w-4xl text-2xl md:text-3xl font-semibold tracking-wide text-[#111]">{title}</h2>
				<p className="mt-4 max-w-3xl leading-7 text-[#666]">{text}</p>
				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
					{items.map((item, index) => (
						<motion.article key={item.no} initial={home && reduced ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, delay: index * 0.06 }} className={`${item.flow ? 'border-[#E6CF9A] bg-[#fbf8f1]' : 'border-[#e9e3d8] bg-[#fffdfa]'} rounded-2xl border p-7 md:p-8 transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-[#d5bd84] hover:bg-[#fffaf1]`}>
							<div className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.18em] text-[#B08B43]"><span>{item.no}</span><span aria-hidden="true" className="h-px w-5 bg-[#D8BE83]" /></div>
							<p className="mt-5 text-[10px] font-semibold leading-5 tracking-[0.14em] text-[#9A7B4F]">{item.en}</p>
							<h3 className="mt-3 text-xl font-semibold leading-snug text-[#111]">{item.title}</h3>
							<p className="mt-4 text-sm leading-7 text-[#666]">{item.text}</p>
							<p className="mt-7 border-t border-[#e9e3d8] pt-5 text-[10px] font-medium uppercase leading-6 tracking-[0.11em] text-[#746c60]">{item.keywords.join(' · ')}</p>
							{item.href && <a href={withBase(item.href)} className="group mt-5 inline-flex items-center gap-2 border-b border-[#E6CF9A] pb-1 text-xs font-medium text-[#8B7048] transition-colors hover:border-[#9A7B4F] hover:text-[#6F5737]">{item.cta}<span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>}
						</motion.article>
					))}
				</div>
			</motion.section>
  );
}
