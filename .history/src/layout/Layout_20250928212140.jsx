import { useEffect, useMemo, useState } from 'react';
import { Icon } from '../icons.jsx';
import '../index.css';

const brand = { glass: 'backdrop-blur-sm bg-white/70 border border-[#e8e8e8]' };

const dict = {
  zh: { nav: { home:'主页', makeup:'妆造', photography:'摄影', bespoke:'高端定制', portfolio:'作品集', about:'关于我们', contact:'联系我们' }, cta:'预约咨询', footer:'© VIVIAN CELEBRITY. All rights reserved.' },
  en: { nav: { home:'Home', makeup:'Makeup', photography:'Photography', bespoke:'Bespoke', portfolio:'Portfolio', about:'About', contact:'Contact' }, cta:'Consult', footer:'© VIVIAN CELEBRITY. All rights reserved.' }
};

export default function Layout({ pageKey, children }) {
  const [lang, setLang] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('lang') === 'en' ? 'en' : 'zh'));
  useEffect(() => { try { localStorage.setItem('lang', lang); document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'; } catch {} }, [lang]);
  const t = useMemo(() => dict[lang], [lang]);

  const link = (href, label) => {
    const isActive = href.includes(`${pageKey}.html`) || (href === '/pages/home.html' && pageKey === 'home');
    return <a href={href} className={`hover:text-[#111] ${isActive ? 'text-[#111] font-medium' : 'text-[#555]'}`}>{label}</a>;
  };

  const [open, setOpen] = useState(false);
  useEffect(() => { if (typeof document !== 'undefined') { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; } }, [open]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-[#e8e8e8]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/pages/home.html" className="flex items-center gap-2 font-semibold tracking-widest text-[#111]">
            <img src="/logo.png" alt="logo" className="h-10 w-auto object-contain" />
            <span className="tracking-[0.15em]">VIVIAN CELEBRITY</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {link('/pages/home.html', t.nav.home)}
            {link('/pages/makeup.html', t.nav.makeup)}
            {link('/pages/photography.html', t.nav.photography)}
            {link('/pages/bespoke.html', t.nav.bespoke)}
            {link('/pages/portfolio.html', t.nav.portfolio)}
            {link('/pages/about.html', t.nav.about)}
            {link('/pages/contact.html', t.nav.contact)}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className={`text-xs ${brand.glass} px-3 py-1 rounded-full text-[#444]`}>
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
            {pageKey !== 'contact' && (
              <a href="/pages/contact.html" className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">
                <Icon name="CalendarDays" />{t.cta}
              </a>
            )}
            <button className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#e8e8e8] text-[#111]" aria-label="Menu" onClick={() => setOpen(v => !v)}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-[#e8e8e8] bg-white/95 backdrop-blur-sm">
            <div className="px-6 py-4 grid grid-cols-1 gap-3 text-sm">
              <a href="/pages/home.html" onClick={() => setOpen(false)} className="py-2">{t.nav.home}</a>
              <a href="/pages/makeup.html" onClick={() => setOpen(false)} className="py-2">{t.nav.makeup}</a>
              <a href="/pages/photography.html" onClick={() => setOpen(false)} className="py-2">{t.nav.photography}</a>
              <a href="/pages/bespoke.html" onClick={() => setOpen(false)} className="py-2">{t.nav.bespoke}</a>
              <a href="/pages/portfolio.html" onClick={() => setOpen(false)} className="py-2">{t.nav.portfolio}</a>
              <a href="/pages/about.html" onClick={() => setOpen(false)} className="py-2">{t.nav.about}</a>
              <a href="/pages/contact.html" onClick={() => setOpen(false)} className="py-2">{t.nav.contact}</a>
              <a href="/pages/contact.html" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors"><Icon name="CalendarDays" />{t.cta}</a>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-12 border-t border-[#e8e8e8] mt-12">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-[#666] text-sm">
          <div>VIVIAN CELEBRITY</div>
          <div>{t.footer}</div>
        </div>
      </footer>
    </div>
  );
}
import '../index.css';

export default function Layout({ pageKey, children }) {
  const link = (href, label) => {
import { useEffect, useMemo, useState } from 'react';
import { Icon } from '../icons.jsx';
import '../index.css';

const brand = { glass: 'backdrop-blur-sm bg-white/70 border border-[#e8e8e8]' };

const dict = {
  zh: { nav: { home:'主页', makeup:'妆造', photography:'摄影', bespoke:'高端定制', portfolio:'作品集', about:'关于我们', contact:'联系我们' }, cta:'预约咨询', footer:'© VIVIAN CELEBRITY. All rights reserved.' },
  en: { nav: { home:'Home', makeup:'Makeup', photography:'Photography', bespoke:'Bespoke', portfolio:'Portfolio', about:'About', contact:'Contact' }, cta:'Consult', footer:'© VIVIAN CELEBRITY. All rights reserved.' }
};

export default function Layout({ pageKey, children }) {
  const [lang, setLang] = useState(() => (localStorage.getItem('lang') === 'en' ? 'en' : 'zh'));
  useEffect(() => { try { localStorage.setItem('lang', lang); document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'; } catch {} }, [lang]);
  const t = useMemo(() => dict[lang], [lang]);

  const link = (href, label) => {
    const isActive = href.includes(`${pageKey}.html`) || (href === '/pages/home.html' && pageKey === 'home');
    return <a href={href} className={`hover:text-[#111] ${isActive ? 'text-[#111] font-medium' : 'text-[#555]'}`}>{label}</a>;
  };

  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-[#e8e8e8]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/pages/home.html" className="flex items-center gap-2 font-semibold tracking-widest text-[#111]">
            <img src="/logo.png" alt="logo" className="h-10 w-auto object-contain" />
            <span className="tracking-[0.15em]">VIVIAN CELEBRITY</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {link('/pages/home.html', t.nav.home)}
            {link('/pages/makeup.html', t.nav.makeup)}
            {link('/pages/photography.html', t.nav.photography)}
            {link('/pages/bespoke.html', t.nav.bespoke)}
            {link('/pages/portfolio.html', t.nav.portfolio)}
            {link('/pages/about.html', t.nav.about)}
            {link('/pages/contact.html', t.nav.contact)}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className={`text-xs ${brand.glass} px-3 py-1 rounded-full text-[#444]`}>
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
            {pageKey !== 'contact' && (
              <a href="/pages/contact.html" className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">
                <Icon name="CalendarDays" />{t.cta}
              </a>
            )}
            <button className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#e8e8e8] text-[#111]" aria-label="Menu" onClick={() => setOpen(v => !v)}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-[#e8e8e8] bg-white/95 backdrop-blur-sm">
            <div className="px-6 py-4 grid grid-cols-1 gap-3 text-sm">
              <a href="/pages/home.html" onClick={() => setOpen(false)} className="py-2">{t.nav.home}</a>
              <a href="/pages/makeup.html" onClick={() => setOpen(false)} className="py-2">{t.nav.makeup}</a>
              <a href="/pages/photography.html" onClick={() => setOpen(false)} className="py-2">{t.nav.photography}</a>
              <a href="/pages/bespoke.html" onClick={() => setOpen(false)} className="py-2">{t.nav.bespoke}</a>
              <a href="/pages/portfolio.html" onClick={() => setOpen(false)} className="py-2">{t.nav.portfolio}</a>
              <a href="/pages/about.html" onClick={() => setOpen(false)} className="py-2">{t.nav.about}</a>
              <a href="/pages/contact.html" onClick={() => setOpen(false)} className="py-2">{t.nav.contact}</a>
              <a href="/pages/contact.html" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors"><Icon name="CalendarDays" />{t.cta}</a>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-12 border-t border-[#e8e8e8] mt-12">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-[#666] text-sm">
          <div>VIVIAN CELEBRITY</div>
          <div>{t.footer}</div>
        </div>
      </footer>
    </div>
  );
}
}
