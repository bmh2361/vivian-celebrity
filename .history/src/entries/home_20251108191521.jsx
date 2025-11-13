import { createRoot } from 'react-dom/client';
import Home from '../pages/Home.jsx';
import Layout from '../layout/Layout.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
	<Layout pageKey="home" langDefault="zh">
		<Home />
	</Layout>
);

