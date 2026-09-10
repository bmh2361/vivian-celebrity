import { createRoot } from 'react-dom/client';
import Layout from '../layout/Layout.jsx';
import ImageDirection from '../pages/ImageDirection.jsx';

createRoot(document.getElementById('root')).render(
	<Layout pageKey="image-direction"><ImageDirection /></Layout>
);
