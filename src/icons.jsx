export function Icon({ name, className }) {
	switch (name) {
		case 'CalendarDays':
			return (
				<svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M8 2v4" />
					<path d="M16 2v4" />
					<rect x="3" y="4" width="18" height="18" rx="2" />
					<path d="M3 10h18" />
					<path d="M8 14h.01" />
					<path d="M12 14h.01" />
					<path d="M16 14h.01" />
					<path d="M8 18h.01" />
					<path d="M12 18h.01" />
					<path d="M16 18h.01" />
				</svg>
			);
		default:
			return null;
	}
}

