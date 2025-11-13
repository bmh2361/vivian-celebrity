import { createRoot } from 'react-dom/client';
import Layout from '../layout/Layout.jsx';
import Photography from '../pages/Photography.jsx';

createRoot(document.getElementById('root')).render(
	<Layout pageKey="photography">
		<Photography />
	</Layout>
);
