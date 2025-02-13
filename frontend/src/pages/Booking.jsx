import { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../context/authContext';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBooking } from '../hooks/axiosApis';
import Loader from '../components/Loader';

const EditStaff = () => {
	const [loading, setIsLoading] = useState(false);
	const queryClient = useQueryClient();
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const { data, isLoading, error } = useQuery({
		queryKey: ['users', 'staffs', 'bookings', id],
		queryFn: () => fetchBooking({ user, id }),
	});
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [orderStatus, setOrderStatus] = useState('');

	useEffect(() => {
		if (data) {
			setName(data?.name);
			setEmail(data?.email);
			setOrderStatus(data?.status);
		}
		if (error) {
			toast.error(error?.message);
		}
	}, [data, error]);

	const navigate = useNavigate();
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token || user?.accessToken}`,
		},
	};
	const apiUrl = import.meta.env.VITE_API_URL;

	const handleAddStaff = async (e) => {
		if (!name.trim() || !email.trim() || !role.trim()) {
			return toast.error('Please fill in all fields');
		}
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.patch(
				`${apiUrl}/admins/staffs/${id}`,
				{
					name,
					email,
					role,
				},
				config
			);
			setName('');
			setEmail('');
			setOrderStatus('');
			setIsLoading(false);
			console.log('Booking updated successful:', response.data);
			toast.success('Booking updated successfully');
			navigate('/bookings');
			await queryClient.invalidateQueries({
				queryKey: ['bookings', 'booking', id],
			});
			return;
		} catch (error) {
			console.error('Error updating booking:', error);
			setIsLoading(false);
			// toast.error('Error adding field');
		}
	};
	return (
		<>
			<main className="body-content px-8 py-8 bg-slate-100">
				<div className="page-title mb-7">
					<h3 className="mb-0 text-4xl">Update booking</h3>
				</div>
				<main className="bg-white shadow rounded-lg my-2 px-6 py-5">
					<div className="flex items-center justify-center md:p-12">
						<div className="mx-auto w-full md:max-w-[550px] bg-white">
							<form onSubmit={handleUpdate}>
								<div className="mb-5">
									<label
										htmlFor="satffName"
										className="mb-3 block text-base font-medium text-[#07074D]"
									>
										FName
									</label>
									<input
										type="text"
										name="satffName"
										id="satffName"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="satff Name"
										className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
									/>
								</div>
								<div className=" grid grid-cols-2 gap-2">
									<div className="mb-5">
										<label
											htmlFor="price"
											className="mb-3 block text-base font-medium text-[#07074D]"
										>
											Email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="Enter email"
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
										/>
									</div>
									<div className="mb-5">
										<label
											htmlFor="status"
											className="mb-3 block text-base font-medium text-[#07074D]"
										>
											Status
										</label>
										<select
											className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
											name="status"
											id="status"
											value={orderStatus}
											onChange={(e) => setOrderStatus(e.target.value)}
										>
											<option value="pending" selected="selected">
												Pending
											</option>
											<option value="confirmed">Confirmed</option>
											<option value="completed">Completed</option>
											<option value="cancelled">Cancelled</option>
										</select>
									</div>
								</div>
								<div>
									{user?.user?.role === 'ADMIN' ? (
										<button
											type="submit"
											disabled={isLoading || loading}
											className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
										>
											Update Booking
										</button>
									) : (
										''
									)}
								</div>
							</form>
						</div>
					</div>
				</main>
			</main>
			{isLoading && <Loader />}
		</>
	);
};

export default EditStaff;
