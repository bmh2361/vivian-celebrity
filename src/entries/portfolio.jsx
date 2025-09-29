import { createRoot } from 'react-dom/client';
import Layout from '../layout/Layout.jsx';
import Portfolio from '../pages/Portfolio.jsx';

createRoot(document.getElementById('root')).render(
	<Layout pageKey="portfolio">
		<Portfolio />
	</Layout>
);
