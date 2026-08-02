import { createRoot } from 'react-dom/client';
import Layout from '../layout/Layout.jsx';
import Talent from '../pages/Talent.jsx';

createRoot(document.getElementById('root')).render(
	<Layout pageKey="talent">
		<Talent />
	</Layout>
);
