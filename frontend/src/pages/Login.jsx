import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/authContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import getError from './../hooks/getError';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { LocalStorage } from '../hooks/LocalStorage';
import Swal from 'sweetalert2';
import Nav from '../components/Nav';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const apiUrl = import.meta.env.VITE_API_URL;
	const { user, setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	console.log(user);
	useEffect(() => {
		if (user) {
			navigate('/dashboard');
		}
	}, [user, navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post(`${apiUrl}/users/login`, {
				email,
				password,
			});

			setLoading(false);
			console.log('Login successful:', response.data);
			setUser({ ...response.data });
			LocalStorage.set('user', { ...response.data });
			Swal.fire({
				title: 'Login successfull',
				icon: 'success',
				text: 'Log in account successfully',
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
			});
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
			<Nav/>
			<div className="bg-gray-100 flex h-screen items-center justify-center p-4">
				<div className="w-full max-w-md">
					<div className="bg-white shadow-md rounded-md p-8">
						<div className="text-center">
							<h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
							<p className="mt-2 text-gray-500">
								Sign in below to access your account
							</p>
						</div>

						<form className="space-y-6 mt-4" onSubmit={handleLogin}>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email
								</label>
								<div className="mt-1">
									<input
										type="email"
										id="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Email"
										autoComplete="email-address"
										required
										className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
									/>
								</div>
							</div>

							<div className="mt-1 relative">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Password
								</label>
								<div className="mt-1 relative">
									<input
										type={showPassword ? 'text' : 'password'}
										value={password}
										id="password"
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Password"
										required
										autoComplete="password"
										className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
									/>
								</div>
								{/* Eye icon to toggle password visibility */}
								<div className="absolute inset-y-0 right-0  mt-6 flex items-center pr-4 z-10">
									{showPassword ? (
										<FiEyeOff
											onClick={() => setShowPassword(false)}
											classNameName="text-gray-600 cursor-pointer"
										/>
									) : (
										<FiEye
											onClick={() => setShowPassword(true)}
											classNameName="text-gray-600 cursor-pointer"
										/>
									)}
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
								>
									Sign In
								</button>
							</div>
							<p className="text-center text-sm text-gray-500">
								Don&#x27;t have an account yet?{' '}
								<Link
									to="/register"
									className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
								>
									Sign up
								</Link>
								.
							</p>
						</form>
					</div>
				</div>
			</div>
			{loading && <Loader />}
		</>
	);
};

export default Login;
