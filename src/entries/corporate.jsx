import { createRoot } from 'react-dom/client';
import Layout from '../layout/Layout.jsx';
import Corporate from '../pages/Corporate.jsx';

createRoot(document.getElementById('root')).render(
	<Layout pageKey="corporate">
		<Corporate />
	</Layout>
);
