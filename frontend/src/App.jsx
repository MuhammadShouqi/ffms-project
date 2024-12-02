import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './hooks/ProtectedRoutes';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './NotFound';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import AddField from './pages/AddField';
import Fields from './pages/Fields';
import Field from './pages/Field';
import AddStaff from './pages/AddStaff.jsx';
import Booking from './pages/Booking';
import BookField from './pages/BookField';
import Bookings from './pages/Bookings';
import IndexPage from './pages/IndexPage';
import Users from './pages/Users';
import Transactions from './pages/Transactions';
import AddFieldSchedule from './pages/AddFieldSchedule';
import DashboardLayout from './pages/DashboardLayout';
import Profile from './pages/Profile';
import Staff from './pages/Staff';
function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<IndexPage />} />
				<Route path="/register" element={<Register />} />
				<Route element={<ProtectedRoutes />}>
					<Route exact path="/" element={<DashboardLayout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/fields" element={<Fields />} />
						<Route path="/add-field" element={<AddField />} />
						<Route path="/fields/:id" element={<Field />} />
						<Route path="/book-field/:id" element={<BookField />} />
						<Route
							path="/fields/:id/add-schedule"
							element={<AddFieldSchedule />}
						/>
						<Route path="/bookings" element={<Bookings />} />
						<Route path="/booking" element={<Booking />} />
						<Route path="/add-staff" element={<AddStaff />} />
						<Route path="/users" element={<Users />} />
						<Route path="/staffs" element={<Staff />} />
						<Route path="/booking" element={<Booking />} />
						<Route path="/transactions" element={<Transactions />} />
						<Route path="/profile" element={<Profile />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;