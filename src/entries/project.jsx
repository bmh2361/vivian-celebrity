import { createRoot } from 'react-dom/client';
import Layout from '../layout/Layout.jsx';
import ProjectDetail from '../pages/ProjectDetail.jsx';

createRoot(document.getElementById('root')).render(
	<Layout pageKey="corporate">
		<ProjectDetail />
	</Layout>
);
