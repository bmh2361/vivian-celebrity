import '../index.css';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useLang } from '../layout/Layout.jsx';

export default function Contact() {
	const { lang } = useLang ? useLang() : { lang: 'zh' };
	const t = useMemo(() => ({
		zh: {
			title: '联系我们',
			intro: '请通过以下方式预约咨询：',
			wechat: '微信',
			phone: '电话',
			whatsapp: 'WhatsApp',
			email: '邮箱',
			formTitle: '快速预约表单',
			people: '人数',
			contact: '联系方式（手机号/邮箱/微信）',
			date: '预约日期',
			services: '服务项目',
			send: '一键邮件联系',
			requiredHint: '请填写联系方式与预约日期',
			sentSubject: '预约咨询',
			options: ['妆造造型', '人像/时尚摄影', '短片/MV', '活动/婚礼', '高端定制', '其他']
		},
		en: {
			title: 'Contact us',
			intro: 'Book a consultation via:',
			wechat: 'WeChat',
			phone: 'Phone',
			whatsapp: 'WhatsApp',
			email: 'Email',
			formTitle: 'Quick Booking Form',
			people: 'No. of people',
			contact: 'Contact (phone/email/wechat)',
			date: 'Appointment Date',
			services: 'Services',
			send: 'Email us in one click',
			requiredHint: 'Please provide contact and appointment date',
			sentSubject: 'Booking Inquiry',
			options: ['Makeup & Styling', 'Portrait/Fashion Photography', 'Short Film/MV', 'Event/Wedding', 'Bespoke', 'Other']
		}
	})[lang], [lang]);

	// 固定联系方式
	const wechatId = 'Makeupp711711';
	const phoneDisplay = '+44 7443735746';
	const phoneE164 = '447443735746'; // for tel:/wa.me
	const email = 'vivianadventureofficial@gmail.com';

	// RED/Xiaohongshu: 如有固定 profileId（UID）可填入，否则按名称构造搜索链接
	// 提示：请将 xhsName 改为你的小红书号/名称；如果知道 UID，将 xhsProfileId 填为字符串，例如 '5ff2b3e4...'。
	const xhsName = 'VIVIAN CELEBRITY';
	const xhsProfileId = '';
	const xhsLink = xhsProfileId
		? `https://www.xiaohongshu.com/user/profile/${xhsProfileId}`
		: `https://www.bing.com/search?q=${encodeURIComponent('site:xiaohongshu.com ' + xhsName)}`;

	// 表单状态
	const [people, setPeople] = useState(1);
	const [contact, setContact] = useState('');
	const [date, setDate] = useState('');
	const [selected, setSelected] = useState([]);

	// 预约日期下限（本地时区的今天）
	const todayStr = useMemo(() => {
		const d = new Date();
		const y = d.getFullYear();
		const m = String(d.getMonth() + 1).padStart(2, '0');
		const day = String(d.getDate()).padStart(2, '0');
		return `${y}-${m}-${day}`;
	}, []);

	const toggle = (opt) => {
		setSelected((prev) => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]);
	};

	const mailtoHref = useMemo(() => {
		const subject = encodeURIComponent(`${t.sentSubject} - ${date || ''}`.trim());
		const bodyLines = [
			`${t.people}: ${people || ''}`,
			`${t.contact}: ${contact || ''}`,
			`${t.date}: ${date || ''}`,
			`${t.services}: ${selected.join(', ')}`,
			'',
			'——',
			(lang === 'en' ? 'Submitted from website contact form' : '来自网站联系表单')
		];
		const body = encodeURIComponent(bodyLines.join('\n'));
		return `mailto:${email}?subject=${subject}&body=${body}`;
	}, [people, contact, date, selected, email, t, lang]);

	const isDateValid = date && date >= todayStr; // 字符串比较在 YYYY-MM-DD 形式下有效
	const canSend = contact.trim() && isDateValid;

	const tip = lang === 'en' ? 'We will get back to you as soon as possible.' : '我们会尽快回复您的消息';
	return (
		<motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto px-6 py-12">
			<div className="flex items-start justify-between gap-4">
				<h1 className="text-2xl md:text-3xl font-semibold">{t.title}</h1>
				<span className="inline-flex items-center gap-2 rounded-full bg-[#F4EDE2] text-[#7F6742] px-3 py-1.5 text-sm md:text-base font-medium md:mt-0.5 shadow-sm border border-[#eadfce]">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5"><path fillRule="evenodd" d="M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0zm14.03-2.53a.75.75 0 10-1.06-1.06l-4.72 4.72-1.72-1.72a.75.75 0 10-1.06 1.06l2.25 2.25c.3.3.77.3 1.06 0l5.25-5.25z" clipRule="evenodd"/></svg>
					{tip}
				</span>
			</div>
			<p className="text-[#666] mt-3">{t.intro}</p>

			<ul className="mt-4 space-y-2 text-[#444]">
				<li>{t.red}：<a className="text-[#9A7B4F] hover:underline" href={xhsLink} target="_blank" rel="noreferrer noopener">{xhsName}</a></li>
				<li>{t.wechat}：<span className="font-medium">{wechatId}</span></li>
				<li>{t.phone}：<a className="text-[#9A7B4F] hover:underline" href={`tel:+${phoneE164}`}>{phoneDisplay}</a></li>
				<li>{t.whatsapp}：<a className="text-[#9A7B4F] hover:underline" href={`https://wa.me/${phoneE164}`} target="_blank" rel="noreferrer noopener">wa.me/{phoneE164}</a></li>
				<li>{t.email}：<a className="text-[#9A7B4F] hover:underline" href={`mailto:${email}`}>{email}</a></li>
			</ul>

			<div className="mt-10 rounded-2xl border border-[#eee] bg-white p-5">
				<h2 className="text-xl font-semibold text-[#111]">{t.formTitle}</h2>
				<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
					<label className="block">
						<span className="text-sm text-[#666]">{t.people}</span>
						<input type="number" min={1} value={people} onChange={(e) => setPeople(parseInt(e.target.value || '1', 10))} className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2 outline-none focus:border-[#9A7B4F]" />
					</label>
					<label className="block md:col-span-1">
						<span className="text-sm text-[#666]">{t.contact}</span>
						<input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder={lang === 'en' ? 'Phone/Email/WeChat' : '手机号/邮箱/微信'} className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2 outline-none focus:border-[#9A7B4F]" />
					</label>
					<label className="block">
						<span className="text-sm text-[#666]">{t.date}</span>
						<input
							type="date"
							min={todayStr}
							value={date}
							onChange={(e) => {
								const v = e.target.value;
								if (v && v < todayStr) {
									setDate(todayStr);
								} else {
									setDate(v);
								}
							}}
							className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2 outline-none focus:border-[#9A7B4F]"
						/>
					</label>
					<div className="block md:col-span-2">
						<span className="text-sm text-[#666]">{t.services}</span>
						<div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
							{t.options.map((opt) => (
								<label key={opt} className="inline-flex items-center gap-2 rounded-lg border border-[#eee] px-3 py-2 cursor-pointer hover:bg-[#faf9f6]">
									<input type="checkbox" className="accent-[#9A7B4F]" checked={selected.includes(opt)} onChange={() => toggle(opt)} />
									<span className="text-sm">{opt}</span>
								</label>
							))}
						</div>
					</div>
				</div>
				<div className="mt-5 flex items-center gap-3">
					<a href={canSend ? mailtoHref : undefined} onClick={(e) => { if (!canSend) e.preventDefault(); }} className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-white ${canSend ? 'bg-[#9A7B4F] hover:opacity-90' : 'bg-gray-300 cursor-not-allowed'}`}>{t.send}</a>
					{!canSend && (
						<span className="text-sm text-[#999]">{t.requiredHint}</span>
					)}
				</div>
			</div>
		</motion.section>
	);
}

