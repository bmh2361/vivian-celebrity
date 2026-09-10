import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../icons.jsx';
import '../index.css';
import './desktop-layout.css';

const brand = { glass: 'backdrop-blur-sm bg-white/70 border border-[#e8e8e8]' };
const dict = {
  zh: {
    nav: { home: '主页', private: '私人形象', commercial: '商业项目', businessOverview: '品牌与商业执行', imageDirection: '形象美学', bespoke: '高端定制', corporate: '企业策划案例', talent: 'Talent', portfolio: '作品集', about: '团队', contact: '联系我们' },
    navDesc: {
      imageDirection: '人物方向、妆发造型与个人影像',
      bespoke: '私人场合、花艺空间与特别拍摄',
      businessOverview: '品牌、内容、活动与英国本地项目落地',
      corporate: '品牌活动策划 · 执行统筹 · 传播物料',
      talent: '达人 · 网红 · 模特 · 企业人才服务',
    },
    cta: '预约咨询',
    footer: '© VIVIAN ADVENTURE. All rights reserved.'
  },
  en: {
    nav: { home: 'Home', private: 'Private Clients', commercial: 'Commercial', businessOverview: 'Brand & Commercial Execution', imageDirection: 'Image Direction', bespoke: 'Bespoke', corporate: 'Commercial Case Studies', talent: 'Talent', portfolio: 'Portfolio', about: 'Team', contact: 'Contact Us' },
    navDesc: {
      imageDirection: 'Personal direction, beauty, styling & imagery',
      bespoke: 'Private occasions, flowers, spaces & special productions',
      businessOverview: 'Brand, content, activations & UK delivery',
      corporate: 'Brand events · Execution · Content & communication',
      talent: 'Models · Creators · Influencers · Brand talent',
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

  const isActiveKey = (key) => pageKey === key;
  const isPrivateActive = ['image-direction', 'makeup', 'photography', 'bespoke'].includes(pageKey);
  const isCommercialActive = ['business', 'corporate'].includes(pageKey);

  const link = (href, label, key) => {
    const full = withBase(href);
    const isActive = isActiveKey(key);
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

  const [open, setOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(null);
  const [desktopPinned, setDesktopPinned] = useState(null);
  const [mobilePrivateOpen, setMobilePrivateOpen] = useState(false);
  const [mobileCommercialOpen, setMobileCommercialOpen] = useState(false);
  const privateMenuRef = useRef(null);
  const privateTriggerRef = useRef(null);
  const privateFirstItemRef = useRef(null);
  const commercialMenuRef = useRef(null);
  const commercialTriggerRef = useRef(null);
  const commercialFirstItemRef = useRef(null);
  const mobilePrivateMenuRef = useRef(null);
  const mobilePrivateTriggerRef = useRef(null);
  const mobileCommercialMenuRef = useRef(null);
  const mobileCommercialTriggerRef = useRef(null);
  const mobileTriggerRef = useRef(null);

  const privateItems = [
    { href: '/pages/image-direction.html', label: t.nav.imageDirection, desc: t.navDesc?.imageDirection, active: isActiveKey('image-direction') },
    { href: '/pages/bespoke.html', label: t.nav.bespoke, desc: t.navDesc?.bespoke, active: isActiveKey('bespoke') },
  ];
  const commercialItems = [
    { href: '/business/', label: t.nav.businessOverview, desc: t.navDesc?.businessOverview, active: isActiveKey('business') },
    { href: '/pages/corporate.html', label: t.nav.corporate, desc: t.navDesc?.corporate, active: isActiveKey('corporate') },
  ];

  const desktopDropdown = ({ id, label, active, items, menuRef, triggerRef, firstItemRef }) => {
    const isOpen = desktopOpen === id;
    return (
      <div
        ref={menuRef}
        className="relative"
        onMouseEnter={() => setDesktopOpen(id)}
        onMouseLeave={() => {
          if (desktopPinned !== id && !menuRef.current?.contains(document.activeElement)) setDesktopOpen(null);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setDesktopOpen(null);
            setDesktopPinned(null);
          }
        }}
      >
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={`${id}-navigation-menu`}
          onClick={() => {
            if (isOpen && desktopPinned === id) {
              setDesktopOpen(null);
              setDesktopPinned(null);
            } else {
              setDesktopOpen(id);
              setDesktopPinned(id);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setDesktopOpen(id);
              setDesktopPinned(id);
              requestAnimationFrame(() => firstItemRef.current?.focus());
            }
          }}
          className={`inline-flex items-center gap-1 ${active ? 'text-[#111] font-medium' : 'text-[#555]'} hover:text-[#CFAF6B] focus-visible:outline-none focus-visible:text-[#CFAF6B] transition-colors duration-200`}
        >
          {label}
          <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>{chevron}</span>
        </button>
        {isOpen && (
          <div id={`${id}-navigation-menu`} role="menu" className="absolute left-0 top-full pt-3">
            <div className="min-w-[220px] rounded-2xl border border-[#e8e8e8] bg-white/95 backdrop-blur shadow-[0_18px_42px_rgba(0,0,0,0.10)] p-2">
              {items.map((item, index) => (
                <a
                  key={item.href}
                  ref={index === 0 ? firstItemRef : undefined}
                  role="menuitem"
                  href={withBase(item.href)}
                  className={`block rounded-xl px-3 py-2 ${item.active ? 'bg-[#fbfaf7]' : ''} hover:bg-[#fbfaf7] focus-visible:bg-[#fbfaf7] focus-visible:outline-none transition-colors`}
                >
                  <div className={`text-sm ${item.active ? 'text-[#111] font-medium' : 'text-[#555]'}`}>{item.label}</div>
                  <div className="mt-0.5 text-[12px] leading-5 text-[#777]">{item.desc}</div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const handlePointerDown = (event) => {
      const activeDesktopMenu = desktopOpen === 'private' ? privateMenuRef : commercialMenuRef;
      if (desktopOpen && !activeDesktopMenu.current?.contains(event.target)) {
        setDesktopOpen(null);
        setDesktopPinned(null);
      }
      const mobileNavigationMenu = document.getElementById('mobile-navigation-menu');
      if (mobilePrivateOpen && !mobileNavigationMenu?.contains(event.target)) setMobilePrivateOpen(false);
      if (mobileCommercialOpen && !mobileNavigationMenu?.contains(event.target)) setMobileCommercialOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      const openPrivateDesktopMenu = document.getElementById('private-navigation-menu');
      const openCommercialDesktopMenu = document.getElementById('commercial-navigation-menu');
      if (openPrivateDesktopMenu || openCommercialDesktopMenu) {
        setDesktopOpen(null);
        setDesktopPinned(null);
        (openPrivateDesktopMenu ? privateTriggerRef : commercialTriggerRef).current?.focus();
      } else if (document.getElementById('mobile-private-navigation-menu')) {
        setMobilePrivateOpen(false);
        mobilePrivateTriggerRef.current?.focus();
      } else if (document.getElementById('mobile-commercial-navigation-menu')) {
        setMobileCommercialOpen(false);
        mobileCommercialTriggerRef.current?.focus();
      } else if (document.getElementById('mobile-navigation-menu')) {
        setOpen(false);
        mobileTriggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [desktopOpen, mobilePrivateOpen, mobileCommercialOpen, open]);

  useEffect(() => {
    if (!open) {
      setMobilePrivateOpen(false);
      setMobileCommercialOpen(false);
    }
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)');
    const closeMobileMenu = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeMobileMenu);
    return () => desktop.removeEventListener('change', closeMobileMenu);
  }, []);

  const ctx = useMemo(() => ({ lang, t, setLang }), [lang, t]);

  return (
    <LangContext.Provider value={ctx}>
    <div data-page={pageKey} className="min-h-screen flex flex-col bg-white text-[#111]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="layout-wide max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <a href={withBase('/pages/home.html')} className="flex items-center gap-1 sm:gap-2 font-semibold tracking-widest text-[#CFAF6B]">
            <img src={withBase('/logo.png')} alt="logo" className="h-10 w-auto object-contain" loading="eager" decoding="async" fetchpriority="high" />
            <span className="tracking-[0.15em]">VIVIAN ADVENTURE</span>
          </a>
          <nav className="hidden xl:flex items-center gap-8 text-sm">
            {link('/pages/home.html', t.nav.home, 'home')}
            {desktopDropdown({
              id: 'private',
              label: t.nav.private,
              active: isPrivateActive,
              items: privateItems,
              menuRef: privateMenuRef,
              triggerRef: privateTriggerRef,
              firstItemRef: privateFirstItemRef,
            })}
            {desktopDropdown({
              id: 'commercial',
              label: t.nav.commercial,
              active: isCommercialActive,
              items: commercialItems,
              menuRef: commercialMenuRef,
              triggerRef: commercialTriggerRef,
              firstItemRef: commercialFirstItemRef,
            })}
            {link('/talent/', t.nav.talent, 'talent')}
            {link('/pages/portfolio.html', t.nav.portfolio, 'portfolio')}
            {link('/pages/about.html', t.nav.about, 'about')}
            {link('/pages/contact.html', t.nav.contact, 'contact')}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className={`text-xs ${brand.glass} px-3 py-1 rounded-full text-[#444]`}>
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
            {pageKey !== 'contact' && (
              <a href={withBase('/pages/contact.html')} className="hidden xl:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-[#111] hover:bg-black transition-colors">
                <Icon name="CalendarDays" />
                {t.cta}
              </a>
            )}
            <button
              ref={mobileTriggerRef}
              className="xl:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#e8e8e8] text-[#111]"
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="mobile-navigation-menu"
              onClick={() => setOpen(v => !v)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <div
            id="mobile-navigation-menu"
            className="xl:hidden overflow-y-auto overscroll-contain border-t border-[#e8e8e8] bg-white/95 backdrop-blur-sm"
            style={{ maxHeight: 'calc(100dvh - 4rem - 2px - env(safe-area-inset-top))' }}
          >
            <div className="px-6 pt-4 grid grid-cols-1 gap-1 text-base" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
              <a href={withBase('/pages/home.html')} onClick={() => setOpen(false)} className={`py-3 ${isActiveKey('home') ? 'text-[#111] font-medium' : ''} hover:text-[#CFAF6B] transition-colors`}>{t.nav.home}</a>

              <div ref={mobilePrivateMenuRef} className="pt-1">
                <button
                  ref={mobilePrivateTriggerRef}
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={mobilePrivateOpen}
                  aria-controls="mobile-private-navigation-menu"
                  onClick={() => {
                    setMobilePrivateOpen((value) => !value);
                    setMobileCommercialOpen(false);
                  }}
                  className={`flex w-full items-center justify-between py-3 text-left text-xs tracking-[0.2em] ${isPrivateActive ? 'text-[#111] font-medium' : 'text-[#CFAF6B]'} focus-visible:outline-none focus-visible:text-[#9A7B4F]`}
                >
                  {t.nav.private}
                  <span className={`transition-transform duration-200 ${mobilePrivateOpen ? 'rotate-180' : ''}`}>{chevron}</span>
                </button>
                {mobilePrivateOpen && (
                  <div id="mobile-private-navigation-menu" role="menu" className="grid grid-cols-1 gap-1 pb-2">
                    {privateItems.map((item) => (
                      <a key={item.href} role="menuitem" href={withBase(item.href)} onClick={() => setOpen(false)} className={`py-3 pl-3 rounded-xl ${item.active ? 'bg-[#fbfaf7] text-[#111] font-medium' : ''} hover:bg-[#fbfaf7] focus-visible:bg-[#fbfaf7] focus-visible:outline-none hover:text-[#111] transition-colors`}>{item.label}</a>
                    ))}
                  </div>
                )}
              </div>

              <div ref={mobileCommercialMenuRef} className="pt-1">
                <button
                  ref={mobileCommercialTriggerRef}
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={mobileCommercialOpen}
                  aria-controls="mobile-commercial-navigation-menu"
                  onClick={() => {
                    setMobileCommercialOpen((value) => !value);
                    setMobilePrivateOpen(false);
                  }}
                  className={`flex w-full items-center justify-between py-3 text-left text-xs tracking-[0.2em] ${isCommercialActive ? 'text-[#111] font-medium' : 'text-[#CFAF6B]'} focus-visible:outline-none focus-visible:text-[#9A7B4F]`}
                >
                  {t.nav.commercial}
                  <span className={`transition-transform duration-200 ${mobileCommercialOpen ? 'rotate-180' : ''}`}>{chevron}</span>
                </button>
                {mobileCommercialOpen && (
                  <div id="mobile-commercial-navigation-menu" role="menu" className="grid grid-cols-1 gap-1 pb-2">
                    {commercialItems.map((item) => (
                      <a key={item.href} role="menuitem" href={withBase(item.href)} onClick={() => setOpen(false)} className={`py-3 pl-3 rounded-xl ${item.active ? 'bg-[#fbfaf7] text-[#111] font-medium' : ''} hover:bg-[#fbfaf7] focus-visible:bg-[#fbfaf7] focus-visible:outline-none hover:text-[#111] transition-colors`}>{item.label}</a>
                    ))}
                  </div>
                )}
              </div>

              <a href={withBase('/talent/')} onClick={() => setOpen(false)} className={`py-3 ${isActiveKey('talent') ? 'text-[#111] font-medium' : ''} hover:text-[#CFAF6B] transition-colors`}>{t.nav.talent}</a>
              <a href={withBase('/pages/portfolio.html')} onClick={() => setOpen(false)} className={`py-3 ${isActiveKey('portfolio') ? 'text-[#111] font-medium' : ''} hover:text-[#CFAF6B] transition-colors`}>{t.nav.portfolio}</a>
              <a href={withBase('/pages/about.html')} onClick={() => setOpen(false)} className={`py-3 ${isActiveKey('about') ? 'text-[#111] font-medium' : ''} hover:text-[#CFAF6B] transition-colors`}>{t.nav.about}</a>
              <a href={withBase('/pages/contact.html')} onClick={() => setOpen(false)} className={`py-3 ${isActiveKey('contact') ? 'text-[#111] font-medium' : ''} hover:text-[#CFAF6B] transition-colors`}>{t.nav.contact}</a>
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
        <div className="layout-wide max-w-7xl mx-auto px-6 flex items-center justify-between text-[#666] text-sm">
          <div>VIVIAN ADVENTURE</div>
          <div>{t.footer}</div>
        </div>
      </footer>
    </div>
    </LangContext.Provider>
  );
}
