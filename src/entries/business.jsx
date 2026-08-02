import { createRoot } from 'react-dom/client';
import Layout from '../layout/Layout.jsx';
import Business from '../pages/Business.jsx';

createRoot(document.getElementById('root')).render(
	<Layout pageKey="business">
		<Business />
	</Layout>
);
