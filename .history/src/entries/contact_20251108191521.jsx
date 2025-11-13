import { createRoot } from 'react-dom/client';
import Layout from '../layout/Layout.jsx';
import Contact from '../pages/Contact.jsx';

createRoot(document.getElementById('root')).render(
	<Layout pageKey="contact">
		<Contact />
	</Layout>
);
