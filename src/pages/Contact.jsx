import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLang } from '../layout/Layout.jsx';
import '../index.css';

const copy = {
	zh: {
		title: '告诉我们您的项目',
		intro: '先提供关键需求即可；使用范围、授权周期等细节可在后续沟通中确认。',
		formTitle: '项目需求',
		name: '姓名',
		company: '公司',
		email: '邮箱',
		projectType: '项目类型',
		date: '项目日期',
		location: '项目地点',
		talent: '人才 / 人数需求',
		brief: '项目简介',
		send: '发送项目需求',
		required: '请填写姓名、邮箱、项目类型和项目简介。',
		subject: '项目咨询',
		options: ['商业广告', '达人 / 网红广告', '展会 / 活动', '摄影 / 视频制作', '品牌合作', '其他'],
		placeholders: { name: '您的姓名', company: '公司 / 品牌', email: 'name@company.com', location: '城市 / 场地（如已知）', talent: '人数、类型或外形方向（如适用）', brief: '目标、时间安排和希望我们提供的支持' },
	},
	en: {
		title: 'Tell Us About Your Project',
		intro: 'Start with the essentials. Usage, licensing period and detailed requirements can follow in conversation.',
		formTitle: 'Project Brief',
		name: 'Name',
		company: 'Company',
		email: 'Email',
		projectType: 'Project Type',
		date: 'Project Date',
		location: 'Location',
		talent: 'Talent Requirement',
		brief: 'Brief / Additional Details',
		send: 'Send Us Your Brief',
		required: 'Please provide your name, email, project type and brief.',
		subject: 'Project Enquiry',
		options: ['Commercial Campaign', 'Creator / Influencer Campaign', 'Exhibition / Event', 'Photo / Video Production', 'Brand Partnership', 'Other'],
		placeholders: { name: 'Your name', company: 'Company / brand', email: 'name@company.com', location: 'City / venue, if known', talent: 'Number, type or appearance direction, if relevant', brief: 'Objective, timing and support required' },
	},
};

export default function Contact() {
	const { lang } = useLang();
	const t = copy[lang] || copy.en;
	const initialProject = useMemo(() => {
		const value = new URLSearchParams(window.location.search).get('project');
		if (value === 'talent') return lang === 'zh' ? '商业广告' : 'Commercial Campaign';
		if (value === 'business') return lang === 'zh' ? '展会 / 活动' : 'Exhibition / Event';
		return '';
	}, [lang]);
	const initialTalent = useMemo(() => new URLSearchParams(window.location.search).get('talent') || '', []);
	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [senderEmail, setSenderEmail] = useState('');
	const [projectType, setProjectType] = useState(initialProject);
	const [date, setDate] = useState('');
	const [location, setLocation] = useState('');
	const [talentRequirement, setTalentRequirement] = useState(initialTalent);
	const [brief, setBrief] = useState('');
	useEffect(() => {
		const value = new URLSearchParams(window.location.search).get('project');
		if (value === 'talent') setProjectType(lang === 'zh' ? '商业广告' : 'Commercial Campaign');
		if (value === 'business') setProjectType(lang === 'zh' ? '展会 / 活动' : 'Exhibition / Event');
	}, [lang]);

	const recipientEmail = 'vivianadventureofficial@gmail.com';
	const phoneDisplay = '+44 7443735746';
	const phoneE164 = '447443735746';
	const wechatId = 'VIVIANADVENTUREUK';
	const xhsLink = 'https://xhslink.com/m/1bLDIX03RdL';

	const today = useMemo(() => {
		const current = new Date();
		return `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
	}, []);
	const canSend = name.trim() && senderEmail.trim() && projectType && brief.trim() && (!date || date >= today);
	const mailto = useMemo(() => {
		const body = [
			`${t.name}: ${name}`,
			`${t.company}: ${company}`,
			`${t.email}: ${senderEmail}`,
			`${t.projectType}: ${projectType}`,
			`${t.date}: ${date}`,
			`${t.location}: ${location}`,
			`${t.talent}: ${talentRequirement}`,
			'',
			`${t.brief}:`,
			brief,
		].join('\n');
		return `mailto:${recipientEmail}?subject=${encodeURIComponent(`${t.subject} - ${projectType}`)}&body=${encodeURIComponent(body)}`;
	}, [brief, company, date, location, name, projectType, senderEmail, t, talentRequirement]);

	const fieldClass = 'mt-2 min-h-11 w-full rounded-none border border-[#d8d3ca] bg-white px-3 py-2.5 outline-none transition-colors focus:border-[#9A7B4F]';

	return (
		<motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-6xl px-6 py-12 md:py-20">
			<div className="grid gap-12 md:grid-cols-[.65fr_1.35fr]">
				<aside>
					<p className="text-xs font-semibold tracking-[0.25em] text-[#9A7B4F]">START A PROJECT</p>
					<h1 className="mt-5 text-4xl font-medium tracking-[-0.03em] md:text-5xl">{t.title}</h1>
					<p className="mt-5 leading-7 text-[#666]">{t.intro}</p>
					<div className="mt-9 space-y-3 border-t border-[#ded9cf] pt-6 text-sm text-[#555]">
						<p><span className="text-[#888]">Email</span><br /><a href={`mailto:${recipientEmail}`} className="text-[#725d38] hover:underline">{recipientEmail}</a></p>
						<p><span className="text-[#888]">Phone / WhatsApp</span><br /><a href={`https://wa.me/${phoneE164}`} className="text-[#725d38] hover:underline">{phoneDisplay}</a></p>
						<p><span className="text-[#888]">WeChat</span><br />{wechatId}</p>
						<p><a href={xhsLink} target="_blank" rel="noreferrer noopener" className="text-[#725d38] hover:underline">Xiaohongshu / RED</a></p>
					</div>
				</aside>

				<div className="border border-[#ded9cf] bg-white p-6 md:p-9">
					<h2 className="text-2xl font-medium">{t.formTitle}</h2>
					<div className="mt-7 grid gap-5 sm:grid-cols-2">
						<label className="block text-sm text-[#666]"><span>{t.name} *</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder={t.placeholders.name} className={fieldClass} /></label>
						<label className="block text-sm text-[#666]"><span>{t.company}</span><input value={company} onChange={(event) => setCompany(event.target.value)} placeholder={t.placeholders.company} className={fieldClass} /></label>
						<label className="block text-sm text-[#666] sm:col-span-2"><span>{t.email} *</span><input type="email" value={senderEmail} onChange={(event) => setSenderEmail(event.target.value)} placeholder={t.placeholders.email} className={fieldClass} /></label>
						<label className="block text-sm text-[#666]"><span>{t.projectType} *</span><select value={projectType} onChange={(event) => setProjectType(event.target.value)} className={fieldClass}><option value="">—</option>{t.options.map((option) => <option key={option}>{option}</option>)}</select></label>
						<label className="block text-sm text-[#666]"><span>{t.date}</span><input type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} className={fieldClass} /></label>
						<label className="block text-sm text-[#666]"><span>{t.location}</span><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder={t.placeholders.location} className={fieldClass} /></label>
						<label className="block text-sm text-[#666]"><span>{t.talent}</span><input value={talentRequirement} onChange={(event) => setTalentRequirement(event.target.value)} placeholder={t.placeholders.talent} className={fieldClass} /></label>
						<label className="block text-sm text-[#666] sm:col-span-2"><span>{t.brief} *</span><textarea rows="5" value={brief} onChange={(event) => setBrief(event.target.value)} placeholder={t.placeholders.brief} className={fieldClass} /></label>
					</div>
					<div className="mt-7 flex flex-wrap items-center gap-4">
						<a href={canSend ? mailto : undefined} aria-disabled={!canSend} className={`inline-flex min-h-12 items-center rounded-full px-7 py-3 text-sm font-medium ${canSend ? 'bg-[#111] text-white hover:bg-black' : 'cursor-not-allowed bg-[#ddd] text-[#888]'}`}>{t.send}</a>
						{!canSend ? <span className="text-xs text-[#888]">{t.required}</span> : null}
					</div>
				</div>
			</div>
		</motion.section>
	);
}
