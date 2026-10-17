import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './partner-marquee.css';

function PartnerRow({ logos, withBase, lang, index }) {
  const sequenceRef = useRef(null);
  const trackRef = useRef(null);
  const [ready, setReady] = useState(false);
  const speed = index % 2 === 0 ? 30 : 27;

  useEffect(() => {
    let active = true;
    const images = [...sequenceRef.current.querySelectorAll('img')];
    Promise.allSettled(images.map((image) => image.decode())).then(() => {
      if (active) setReady(true);
    });
    return () => { active = false; };
  }, []);

  useLayoutEffect(() => {
    const sequence = sequenceRef.current;
    const track = trackRef.current;
    const updateDuration = () => {
      const width = sequence.getBoundingClientRect().width;
      if (width > 0) track.style.setProperty('--home-partners-duration', `${width / speed}s`);
    };
    updateDuration();
    const observer = new ResizeObserver(updateDuration);
    observer.observe(sequence);
    return () => observer.disconnect();
  }, [speed]);

  return (
    <div className="home-partners-row" data-ready={ready} data-direction={index % 2 === 0 ? 'left' : 'right'} role="region" tabIndex={0} aria-label={lang === 'zh' ? `合作伙伴，第 ${index + 1} 排，${logos.length} 个品牌` : `Partner logos, row ${index + 1}, ${logos.length} brands`}>
      <div className="home-partners-track" ref={trackRef}>
        {[false, true].map((duplicate) => (
          <ul className="home-partners-sequence" key={String(duplicate)} ref={duplicate ? undefined : sequenceRef} aria-hidden={duplicate ? true : undefined}>
            {logos.map((logo) => (
              <li key={logo.file} className="home-partner-tile">
                <img src={withBase(`/partners-logos/${logo.file}`)} alt={duplicate ? '' : logo.name} loading="eager" fetchpriority="low" decoding="async" style={{ width: `${logo.width}%`, height: `${logo.height}%` }} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function PartnerMarquee({ logos, withBase, lang }) {
  const marqueeRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const rowSize = Math.ceil(logos.length / 4);
  const rows = Array.from({ length: 4 }, (_, index) => logos.slice(index * rowSize, (index + 1) * rowSize));

  useEffect(() => {
    let inView = false;
    const updateVisibility = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateVisibility();
    }, { rootMargin: '200px' });
    observer.observe(marqueeRef.current);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  return (
    <div className="home-partners-marquee" ref={marqueeRef} data-paused={paused} data-visible={visible}>
      {rows.map((row, index) => <PartnerRow key={index} logos={row} withBase={withBase} lang={lang} index={index} />)}
      <div className="home-partners-controls">
        <button type="button" className="home-partners-pause" onClick={() => setPaused((value) => !value)}>
          <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true">{paused ? <path d="M3 1v10l8-5z" /> : <path d="M2 1h3v10H2zm5 0h3v10H7z" />}</svg>
          {lang === 'zh' ? (paused ? '继续滚动' : '暂停滚动') : (paused ? 'Resume animation' : 'Pause animation')}
        </button>
        <p className="home-partners-note">More to come.</p>
      </div>
    </div>
  );
}
