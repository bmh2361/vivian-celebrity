import { createRoot } from 'react-dom/client';
import Layout from '../layout/Layout.jsx';
import About from '../pages/About.jsx';

createRoot(document.getElementById('root')).render(
	<Layout pageKey="about">
		<About />
	</Layout>
);
