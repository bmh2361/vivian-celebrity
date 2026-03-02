import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Icon } from '../icons.jsx';
import '../index.css';

const brand = { glass: 'backdrop-blur-sm bg-white/70 border border-[#e8e8e8]' };
const dict = {
  zh: {
    nav: { home: '主页', beauty: '高端美业', media: '影视传媒', makeup: '妆造美学', bespoke: '高端定制', photography: '影像美学', corporate: '企业策划', portfolio: '作品集', about: '团队', contact: '联系我们' },
    navDesc: {
      makeup: '影视/时尚/婚礼造型 · 妆发与风格统筹',
      bespoke: '高定级私人定制 · 形象顾问与试妆',
      photography: '短剧/短视频制作 · 拍摄策划 · 后期与传播',
      corporate: '品牌活动策划 · 执行统筹 · 传播物料',
    },
    cta: '预约咨询',
    footer: '© VIVIAN ADVENTURE. All rights reserved.'
  },
  en: {
    nav: { home: 'Home', beauty: 'Luxury Beauty', media: 'Film & Media', makeup: 'Makeup & Styling', bespoke: 'Bespoke', photography: 'Visual Aesthetics', corporate: 'Corporate Planning', portfolio: 'Portfolio', about: 'Team', contact: 'Contact Us' },
    navDesc: {
      makeup: 'Film/Fashion/Bridal styling · Beauty & wardrobe direction',
      bespoke: 'Private bespoke looks · Image consulting',
      photography: 'Short-form / short drama · Production · Post & delivery',
      corporate: 'Brand events · Execution · Content & communication',
    },
    cta: 'Book a consult',
    footer: '© VIVIAN ADVENTURE. All rights reserved.'
  }
};

// 语言上下文，供子页面读取（默认英文）
const LangContext = createContext({ lang: 'en', t: dict.en, setLang: () => {} });
export const useLang = () => useContext(LangContext);

export default function Layout({ pageKey, children }) {
  // 适配 GitHub Pages 子路径部署
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  const withBase = (p) => `${base}${p.startsWith('/') ? p : `/${p}`}`;
  const [lang, setLang] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('lang');
        return saved === 'en' || saved === 'zh' ? saved : 'en';
      }
    } catch {}
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
      }
    } catch {}
  }, [lang]);

  const t = useMemo(() => dict[lang], [lang]);

  const isActiveKey = (key) => pageKey === key || (key === 'home' && pageKey === 'home');
  const isBeautyActive = pageKey === 'makeup' || pageKey === 'bespoke';
  const isMediaActive = pageKey === 'photography' || pageKey === 'corporate';

  const link = (href, label) => {
    const full = withBase(href);
    const isActive = href.includes(`${pageKey}.html`) || (href === '/pages/home.html' && pageKey === 'home');
    return (
      <a
        href={full}
        className={`${isActive ? 'text-[#111] font-medium' : 'text-[#555]'} hover:text-[#CFAF6B] transition-colors duration-200`}
      >
        {label}
      </a>
    );
  };

  const chevron = (
    <svg viewBox="0 0 24 24" width="14" height="14" className="opacity-70" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  const navGroup = ({ label, href, active, items }) => {
    const full = withBase(href);
    return (
      <div className="relative group">
        <a
          href={full}
          className={`inline-flex items-center gap-1 ${active ? 'text-[#111] font-medium' : 'text-[#555]'} hover:text-[#CFAF6B] transition-colors duration-200`}
        >
          {label}
          {chevron}
        </a>
        <div className="absolute left-0 top-full pt-3 hidden group-hover:block">
          <div className="min-w-[220px] rounded-2xl border border-[#e8e8e8] bg-white/95 backdrop-blur shadow-[0_18px_42px_rgba(0,0,0,0.10)] p-2">
            {items.map((it) => (
              <a
                key={it.href}
                href={withBase(it.href)}
                className={`block rounded-xl px-3 py-2 ${it.active ? 'bg-[#fbfaf7]' : ''} hover:bg-[#fbfaf7] transition-colors`}
              >
                <div className={`text-sm ${it.active ? 'text-[#111] font-medium' : 'text-[#555]'} group-hover:text-[#111]`}>{it.label}</div>
                {it.desc ? <div className="mt-0.5 text-[12px] leading-5 text-[#777]">{it.desc}</div> : null}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = open ? 'hidden' : '';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const ctx = useMemo(() => ({ lang, t, setLang }), [lang, t]);

  return (
    <LangContext.Provider value={ctx}>
    <div className="min-h-screen flex flex-col bg-white text-[#111]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <a href={withBase('/pages/home.html')} className="flex items-center gap-2 font-semibold tracking-widest text-[#CFAF6B]">
            <img src={withBase('/logo.png')} alt="logo" className="h-10 w-auto object-contain" loading="eager" decoding="async" fetchpriority="high" />
            <span className="tracking-[0.15em]">VIVIAN ADVENTURE</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {link('/pages/home.html', t.nav.home)}
            {navGroup({
              label: t.nav.beauty,
              href: '/pages/makeup.html',
              active: isBeautyActive,
              items: [
                { href: '/pages/makeup.html', label: t.nav.makeup, desc: t.navDesc?.makeup, active: isActiveKey('makeup') },
                { href: '/pages/bespoke.html', label: t.nav.bespoke, desc: t.navDesc?.bespoke, active: isActiveKey('bespoke') },
              ],
            })}
            {navGroup({
              label: t.nav.media,
              href: '/pages/photography.html',
              active: isMediaActive,
              items: [
                { href: '/pages/photography.html', label: t.nav.photography, desc: t.navDesc?.photography, active: isActiveKey('photography') },
                { href: '/pages/corporate.html', label: t.nav.corporate, desc: t.navDesc?.corporate, active: isActiveKey('corporate') },
              ],
            })}
            {link('/pages/portfolio.html', t.nav.portfolio)}
            {link('/pages/about.html', t.nav.about)}
            {link('/pages/contact.html', t.nav.contact)}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className={`text-xs ${brand.glass} px-3 py-1 rounded-full text-[#444]`}>
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
            {pageKey !== 'contact' && (
              <a href={withBase('/pages/contact.html')} className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">
                <Icon name="CalendarDays" />
                {t.cta}
              </a>
            )}
            <button
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#e8e8e8] text-[#111]"
              aria-label="Menu"
              onClick={() => setOpen(v => !v)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-[#e8e8e8] bg-white/95 backdrop-blur-sm">
            <div className="px-6 py-4 grid grid-cols-1 gap-1 text-base">
              <a href={withBase('/pages/home.html')} onClick={() => setOpen(false)} className="py-3 hover:text-[#CFAF6B] transition-colors">{t.nav.home}</a>

              <div className="pt-2 pb-1 text-xs tracking-[0.2em] text-[#CFAF6B]">{t.nav.beauty}</div>
              <a href={withBase('/pages/makeup.html')} onClick={() => setOpen(false)} className="py-3 pl-3 rounded-xl hover:bg-[#fbfaf7] hover:text-[#111] transition-colors">{t.nav.makeup}</a>
              <a href={withBase('/pages/bespoke.html')} onClick={() => setOpen(false)} className="py-3 pl-3 rounded-xl hover:bg-[#fbfaf7] hover:text-[#111] transition-colors">{t.nav.bespoke}</a>

              <div className="pt-3 pb-1 text-xs tracking-[0.2em] text-[#CFAF6B]">{t.nav.media}</div>
              <a href={withBase('/pages/photography.html')} onClick={() => setOpen(false)} className="py-3 pl-3 rounded-xl hover:bg-[#fbfaf7] hover:text-[#111] transition-colors">{t.nav.photography}</a>
              <a href={withBase('/pages/corporate.html')} onClick={() => setOpen(false)} className="py-3 pl-3 rounded-xl hover:bg-[#fbfaf7] hover:text-[#111] transition-colors">{t.nav.corporate}</a>

              <a href={withBase('/pages/portfolio.html')} onClick={() => setOpen(false)} className="py-3 hover:text-[#CFAF6B] transition-colors">{t.nav.portfolio}</a>
              <a href={withBase('/pages/about.html')} onClick={() => setOpen(false)} className="py-3 hover:text-[#CFAF6B] transition-colors">{t.nav.about}</a>
              <a href={withBase('/pages/contact.html')} onClick={() => setOpen(false)} className="py-3 hover:text-[#CFAF6B] transition-colors">{t.nav.contact}</a>
              <a
                href={withBase('/pages/contact.html')}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors mt-2"
              >
                <Icon name="CalendarDays" />
                {t.cta}
              </a>
            </div>
          </div>
        )}
        {/* 底部金色分隔线（变细） */}
        <div className="h-[2px] w-full bg-[#E6CF9A]" />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-12 border-t border-[#e8e8e8] mt-12">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-[#666] text-sm">
          <div>VIVIAN ADVENTURE</div>
          <div>{t.footer}</div>
        </div>
      </footer>
    </div>
    </LangContext.Provider>
  );
}
