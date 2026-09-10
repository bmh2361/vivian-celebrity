import '../index.css';
import './portfolio.css';
import { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../layout/Layout.jsx';

const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
const url = (path) => `${base}${path}`;
const text = {
	zh: { title: '作品集', intro: '人物、妆造与时尚，延伸至舞台与品牌现场。', pause: '暂停动态', play: '继续动态', open: '查看作品', close: '关闭', prev: '上一张', next: '下一张', loading: '作品加载中', error: '作品暂时无法加载。', retry: '重试', still: '静态浏览' },
	en: { title: 'Selected imagery', intro: 'People, beauty and fashion. On stage and in the world of brands.', pause: 'Pause motion', play: 'Resume motion', open: 'View image', close: 'Close', prev: 'Previous', next: 'Next', loading: 'Loading imagery', error: 'The imagery could not be loaded.', retry: 'Try again', still: 'Still view' },
};

function WorkImage({ work, lang, eager = false, detail = false }) {
	const previews = work.previews || [];
	return <img src={url(detail ? work.detail || work.src : previews[0]?.src || work.src)} srcSet={detail ? undefined : previews.map(p => `${url(p.src)} ${p.width}w`).join(', ') || undefined} sizes="(max-width: 767px) 54vw, (max-width: 1023px) 34vw, 30vw" width={work.width} height={work.height} alt={work.alt[lang]} loading={eager || detail ? 'eager' : 'lazy'} decoding="async" draggable={false} onLoad={event => event.currentTarget.classList.add('portfolio-image-ready')} />;
}

function MarqueeColumn({ works, index, lang, paused, reduced, onOpen }) {
	const runner = useRef(null);
	const group = useRef(null);
	const animation = useRef(null);
	const rateFrame = useRef(null);
	const [hovered, setHovered] = useState(false);
	const [focused, setFocused] = useState(false);
	const stopped = paused || hovered || focused;
	const stoppedRef = useRef(stopped);
	stoppedRef.current = stopped;


	useEffect(() => {
		if (reduced) return;
		const element = runner.current;
		const list = group.current;
		let bounds = [];
		let columnTop = 0;
		let distance = 0;
		const preloadNearby = () => {
			const current = animation.current;
			if (!current || document.hidden) return;
			const duration = current.effect.getTiming().duration;
			const phase = ((current.currentTime || 0) % duration) / duration;
			const viewportTop = window.scrollY - columnTop;
			if (viewportTop + window.innerHeight < -400 || viewportTop > distance + 400) return;
			const top = distance * (index % 2 ? 1 - phase : phase) + Math.max(0, viewportTop);
			bounds.forEach(({ image, start, end }) => {
				if (end > top - 400 && start < top + window.innerHeight + 400) image.loading = 'eager';
			});
		};
		const measure = () => {
			distance = list.getBoundingClientRect().height;
			if (!distance) return;
			const old = animation.current;
			const progress = old ? ((old.currentTime || 0) / old.effect.getTiming().duration) % 1 : 0;
			old?.cancel();
			const speed = (window.matchMedia('(max-width: 767px)').matches ? 24 : 42) * [1, .9, 1.06, .96][index];
			const duration = distance / speed * 1000;
			const frames = [{ transform: 'translateY(0)' }, { transform: `translateY(-${distance}px)` }];
			const next = element.animate(index % 2 ? [...frames].reverse() : frames, { duration, iterations: Infinity, easing: 'linear' });
			next.currentTime = progress * duration;
			if (stoppedRef.current) { next.playbackRate = 0; next.pause(); }
			animation.current = next;
			columnTop = element.parentElement.getBoundingClientRect().top + window.scrollY;
			const origin = element.getBoundingClientRect().top;
			bounds = [...element.querySelectorAll('img')].map(image => {
				const rect = image.getBoundingClientRect();
				return { image, start: rect.top - origin, end: rect.bottom - origin };
			});
			preloadNearby();
		};
		const observer = new ResizeObserver(measure);
		observer.observe(list);
		observer.observe(element.parentElement);
		// Cached bounds and animation time also work when compositor motion skips lazy-load checks.
		const preloadTimer = setInterval(preloadNearby, 750);
		window.addEventListener('scroll', preloadNearby, { passive: true });
		return () => { window.removeEventListener('scroll', preloadNearby); clearInterval(preloadTimer); observer.disconnect(); cancelAnimationFrame(rateFrame.current); animation.current?.cancel(); animation.current = null; };
	}, [works, index, reduced]);

	useEffect(() => {
		cancelAnimationFrame(rateFrame.current);
		const current = animation.current;
		if (!current || reduced) return;
		if (document.hidden) { current.pause(); current.playbackRate = 0; return; }
		const from = current.playbackRate;
		const target = stopped ? 0 : 1;
		const start = performance.now();
		current.play();
		const easeRate = (now) => {
			const progress = Math.min((now - start) / 450, 1);
			current.updatePlaybackRate(from + (target - from) * (1 - (1 - progress) ** 3));
			if (progress < 1) rateFrame.current = requestAnimationFrame(easeRate);
			else if (!target) current.pause();
		};
		rateFrame.current = requestAnimationFrame(easeRate);
		return () => cancelAnimationFrame(rateFrame.current);
	}, [stopped, reduced]);

	return <motion.div className="portfolio-column" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: index * .08 }} onPointerEnter={e => { if (e.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}>
		<div ref={runner} className="portfolio-runner">
			{(reduced ? [0] : [0, 1]).map(copy => <div className="portfolio-group" key={copy} ref={copy === 0 ? group : undefined} aria-hidden={copy === 1 ? true : undefined}>
				{works.map((work, position) => <button type="button" className="portfolio-work" key={work.id} tabIndex={copy || (!reduced && position > 0) ? -1 : 0} aria-label={`${text[lang].open}: ${work.alt[lang]}`} onClick={event => onOpen(work, event.currentTarget, event.detail === 0)}>
					<WorkImage work={work} lang={lang} eager={copy === 0 && position < 2} />
				</button>)}
			</div>)}
		</div>
		{!reduced && <><span className="portfolio-edge portfolio-edge-top" aria-hidden="true" /><span className="portfolio-edge portfolio-edge-bottom" aria-hidden="true" /></>}
	</motion.div>;
}

function Lightbox({ works, selected, setSelected, lang, onClose }) {
	const dialog = useRef(null);
	const [closing, setClosing] = useState(false);
	const close = () => setClosing(true);
	useEffect(() => {
		if (!closing) return;
		const timer = setTimeout(onClose, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200);
		return () => clearTimeout(timer);
	}, [closing, onClose]);
	useEffect(() => {
		const element = dialog.current;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		element.showModal();
		return () => { element.close(); document.body.style.overflow = previous; };
	}, []);
	const move = (step) => setSelected(index => (index + step + works.length) % works.length);
	return <dialog ref={dialog} className={`portfolio-lightbox${closing ? ' portfolio-lightbox-closing' : ''}`} aria-label={text[lang].open} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); } }}>
		<div className="portfolio-lightbox-toolbar"><span aria-live="polite">{String(selected + 1).padStart(2, '0')} / {works.length}</span><button type="button" onClick={close} autoFocus>{text[lang].close} ×</button></div>
		<div className="portfolio-lightbox-image" onClick={event => { if (event.target === event.currentTarget) close(); }}><WorkImage key={works[selected].id} work={works[selected]} lang={lang} detail /></div>
		<div className="portfolio-lightbox-controls"><button type="button" onClick={() => move(-1)}>← {text[lang].prev}</button><button type="button" onClick={() => move(1)}>{text[lang].next} →</button></div>
	</dialog>;
}

export default function Portfolio() {
	const { lang } = useLang();
	const t = text[lang];
	const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
	const [works, setWorks] = useState([]);
	const [error, setError] = useState(false);
	const [attempt, setAttempt] = useState(0);
	const [paused, setPaused] = useState(false);
	const [hidden, setHidden] = useState(document.hidden);
	const [columns, setColumns] = useState(() => window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 4);
	const [selected, setSelected] = useState(null);
	const opener = useRef(null);
	useEffect(() => {
		const controller = new AbortController();
		setError(false);
		fetch(url('/portfolio/index.json'), { signal: controller.signal }).then(response => { if (!response.ok) throw new Error('Manifest unavailable'); return response.json(); }).then(data => { if (!Array.isArray(data) || !data.length) throw new Error('Empty manifest'); setWorks(data); }).catch(e => { if (e.name !== 'AbortError') setError(true); });
		return () => controller.abort();
	}, [attempt]);
	useEffect(() => {
		const mobile = window.matchMedia('(max-width: 767px)');
		const tablet = window.matchMedia('(max-width: 1023px)');
		const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateMotion = () => setReduced(motionPreference.matches);
		const resize = () => setColumns(mobile.matches ? 2 : tablet.matches ? 3 : 4);
		const visibility = () => setHidden(document.hidden);
		mobile.addEventListener('change', resize); tablet.addEventListener('change', resize); motionPreference.addEventListener('change', updateMotion); document.addEventListener('visibilitychange', visibility);
		return () => { mobile.removeEventListener('change', resize); tablet.removeEventListener('change', resize); motionPreference.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', visibility); };
	}, []);
	// Keep column arrays stable while opening a work or changing language.
	const columnWorks = useMemo(() => Array.from({ length: columns }, (_, column) => works.filter((_, index) => index % columns === column)), [works, columns]);
	const close = () => {
		setSelected(null);
		requestAnimationFrame(() => {
			if (opener.current?.keyboard) opener.current.element.focus({ preventScroll: true });
			else opener.current?.element.blur();
		});
	};
	return <section className={`portfolio-page layout-visual${reduced ? ' portfolio-still' : ''}`} lang={lang === 'zh' ? 'zh-CN' : 'en-GB'}>
		<motion.header className="portfolio-heading" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}><div><p className="portfolio-kicker">Vivian Adventure / Portfolio</p><h1>{t.title}</h1><p>{t.intro}</p></div>{works.length > 0 && (reduced ? <span className="portfolio-motion-label">{t.still}</span> : <button className="portfolio-motion-control" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? t.play : t.pause} <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button>)}</motion.header>
		{error ? <p role="alert">{t.error} <button type="button" onClick={() => setAttempt(value => value + 1)}>{t.retry}</button></p> : !works.length ? <p role="status">{t.loading}</p> : <div className="portfolio-wall">{columnWorks.map((group, index) => <MarqueeColumn key={`${columns}-${index}`} works={group} index={index} lang={lang} paused={paused || hidden || selected !== null} reduced={reduced} onOpen={(work, element, keyboard) => { opener.current = { element, keyboard }; setSelected(works.indexOf(work)); }} />)}</div>}
		{selected !== null && <Lightbox works={works} selected={selected} setSelected={setSelected} lang={lang} onClose={close} />}
	</section>;
}
