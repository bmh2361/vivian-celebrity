import { createRoot } from 'react-dom/client';
import Layout from '../layout/Layout.jsx';
import Makeup from '../pages/Makeup.jsx';

createRoot(document.getElementById('root')).render(
	<Layout pageKey="makeup">
		<Makeup />
	</Layout>
);
