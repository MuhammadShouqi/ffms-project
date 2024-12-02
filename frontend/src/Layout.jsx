import { Outlet } from 'react-router-dom';
const Layout = () => {
	return (
		<div className="pages relative h-screen">
			<Outlet />
		</div>
	);
};

export default Layout;
