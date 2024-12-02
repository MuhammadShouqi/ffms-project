import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import getError from './../hooks/getError';
// import { bgImage } from './../data';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import Nav from '../components/Nav';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [userType, setUserType] = useState('USER');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const apiUrl = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		if (!confirmPassword || confirmPassword !== password) {
			return toast.error('Passwords do not match');
		}
		try {
			setLoading(true);
			const response = await axios.post(`${apiUrl}/users/register`, {
				name,
				email,
				role: userType,
				phone,
				password,
			});
			setLoading(false);
			if (response.data) {
				Swal.fire({
					title: 'Registration successful',
					icon: 'success',
					text: 'Log in to continue',
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
				});

				navigate('/login');
			}
		} catch (error) {
			setLoading(false);

			console.error('Error registering:', error);
			const message = getError(error);

			return Swal.fire({
				title: 'Error!',
				icon: 'error',
				text: message,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
			});
		}
	};
	return (
		<>
			<Nav />
			<div className="bg-gray-100 flex h-screen items-center justify-center p-4">
				<div className="w-full max-w-lg mx-auto  bg-white rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
					<h1 className="text-xl font-bold text-center text-gray-700  mb-8">
						Welcome to FMFC
					</h1>
					<form
						onSubmit={handleRegister}
						className="w-full flex flex-col gap-4"
					>
						<div className="flex items-start flex-col justify-start">
							<label
								htmlFor="firstName"
								className="text-sm text-gray-700  mr-2"
							>
								First Name:
							</label>
							<input
								placeholder="Full Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								type="text"
								id="firstName"
								name="firstName"
								className="w-full px-3   py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-green-500"
							/>
						</div>

						<div className="flex items-start flex-col justify-start">
							<label htmlFor="phone" className="text-sm text-gray-700  mr-2">
								Phone:
							</label>
							<input
								type="number"
								id="phone"
								name="phone"
								placeholder="09123456789"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								className="w-full px-3  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-green-500"
							/>
						</div>

						<div className="flex items-start flex-col justify-start">
							<label htmlFor="email" className="text-sm text-gray-700  mr-2">
								Email:
							</label>
							<input
								id="email"
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-3   py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-green-500"
							/>
						</div>

						<div className="flex items-start flex-col justify-start">
							<label htmlFor="password" className="text-sm text-gray-700  mr-2">
								Password:
							</label>
							<input
								id="password"
								type="password"
								placeholder="******************"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-3   py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-green-500"
							/>
						</div>

						<div className="flex items-start flex-col justify-start">
							<label
								htmlFor="confirmPassword"
								className="text-sm text-gray-700  mr-2"
							>
								Confirm Password:
							</label>
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="w-full px-3   py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-green-500"
							/>
						</div>

						<button
							type="submit"
							className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
						>
							Register
						</button>

						<div className="mt-4 text-center">
							<span className="text-sm text-gray-500 ">
								Already have an account?{' '}
							</span>
							<Link to="/login" className="text-green-500 hover:text-green-600">
								Login
							</Link>
						</div>
					</form>
				</div>
			</div>
			{loading && <Loader />}
		</>
	);
};

export default Register;
