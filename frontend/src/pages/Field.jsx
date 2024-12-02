import { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { fetchField } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import getError from './../hooks/getError';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { CiLocationOn } from 'react-icons/ci';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IoMdOptions } from 'react-icons/io';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

const Field = () => {
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [isDeletedModal, setIsDeletedModal] = useState(false);

	const props = { token: user.accessToken || user.token, id };
	const { data, isLoading, error } = useQuery({
		queryKey: ['fields', id],
		queryFn: async () => fetchField(props),
	});

	const navigate = useNavigate();
	useEffect(() => {
		if (error) {
			console.log(error);
		}
		if (data) {
			console.log(data);
		}
	}, [data]);
	console.log(user);

	const apiUrl = import.meta.env.VITE_API_URL;
	const handleClick = async () => {
		try {
			setLoading(true);
			const { data } = await axios.patch(
				`${apiUrl}/reports/${id}`,
				{ status: 'COMPLETED' },
				{
					headers: {
						Authorization: `Bearer ${user?.token || user?.accessToken}`,
					},
				}
			);
			if (data) {
				console.log(data);
				toast.success('Trip confirmed successfully');
				navigate(`/bookings`);
			}
			setLoading(false);
		} catch (error) {
			// const message = error?.data || 'Something went wrong!';
			setLoading(false);
			console.log('Error booking trip', error);
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
	const handleDeleteField = async (id) => {
		try {
			if (!id) {
				return toast.error('Invalid field id');
			}
			setLoading(true);
			const { data } = await axios.delete(`${apiUrl}/fields/${id}`, {
				headers: {
					Authorization: `Bearer ${user?.token || user?.accessToken}`,
				},
			});
			if (data) {
				console.log(data);
				toast.success('Field deleted successfully');
				navigate(`/fields`);
			}
			setLoading(false);
		} catch (error) {
			// const message = error?.data || 'Something went wrong!';
			setLoading(false);
			console.log('Error booking Field', error);
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
	const handleConfirm = async (id) => {
		try {
			if (!id) {
				return toast.error('Invalid field id');
			}
			if (id) {
				return console.log('confirm field', id);
			}
			setLoading(true);
			const { data } = await axios.patch(`${apiUrl}/fields/${id}`, {
				headers: {
					Authorization: `Bearer ${user?.token || user?.accessToken}`,
				},
			});
			if (data) {
				console.log(data);
				toast.success('Field deleted successfully');
				navigate(`/fields`);
			}
			setLoading(false);
		} catch (error) {
			// const message = error?.data || 'Something went wrong!';
			setLoading(false);
			console.log('Error booking Field', error);
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
			{isLoading || loading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7 flex justify-between">
						<h3 className="mb-0  text-xl md:text-3xl font-semibold">
							{data?.name}
						</h3>

						<Menu as="div" className="relative ml-1">
							<div>
								<MenuButton className="pl-3 py-2 px-2  flex w-full justify-start items-center gap-1 rounded text-sm  text-gray-700 bg-blue-100 hover:bg-blue-200 font-normal">
									<IoMdOptions />
								</MenuButton>
							</div>
							<MenuItems
								transition
								className="absolute right-0 z-10 mt-0 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
							>
								<MenuItem
									as="button"
									className="pl-3 py-2 px-2  flex w-full justify-start items-center gap-1 rounded text-sm  text-gray-700 hover:bg-blue-100 font-normal"
									onClick={() => handleDeleteField(id)}
								>
									<FaPlus />
									Delete
								</MenuItem>
								<MenuItem
									as="button"
									className="pl-3 py-2 px-2 flex w-full justify-start items-center gap-1 rounded text-sm  text-gray-700 hover:bg-red-100 font-normal"
									onClick={() => navigate(`/fields/${id}/edit`)}
								>
									<FaMinus />
									Edit
								</MenuItem>
							</MenuItems>
						</Menu>
					</div>
					<div className="bg-white shadow rounded-lg my-2 px-6 py-5 text-lg">
						<div>
							<div className="max-h-[300px] max-w-[300px] border mb-2">
								<img
									className="w-full object-cover"
									src={data?.image?.url}
									alt={data.name}
								/>
							</div>
							<div className="flex items-center my-2">
								<CiLocationOn className="font-bold text-3xl" />
								<p className="text-black">Address: {data?.address}</p>
							</div>
							<div>
								<h2>About this place</h2>
								<p> {data?.description}</p>
							</div>
							<p>
								Report Status:{' '}
								<span
									className={`${
										data?.status === 'available'
											? 'text-green-500'
											: 'text-yellow-700'
									} capitalize`}
								>
									{data?.status}
								</span>
							</p>
							<p>Field Capacity: {data?.capacity}</p>
						</div>
						{user?.user?.role === 'ADMIN' && data?.userId ? (
							<div>
								<div>
									<h4 className=" text-2xl">User Info</h4>
									<div>
										<p>Name: {data?.userId?.name}</p>
										<p>Rank: {data?.userId?.rank}</p>
										<p>Phone: {data?.userId?.phone}</p>
										<p>Email: {data?.userId?.email}</p>
									</div>
								</div>
								{data?.status !== 'available' ? (
									<div>
										<h4 className=" text-2xl">Booked for</h4>
										{data?.schedule > 0 &&
											data?.schedule.map((item) => (
												<div key={item._id}>
													<p>Name: {data?.userId?.name}</p>
													<p>Rank {data?.userId?.rank}</p>
												</div>
											))}
									</div>
								) : (
									''
								)}
							</div>
						) : (
							''
						)}
					</div>

					<div className="flex justify-center my-10">
						{user?.user?.role === 'ADMIN' && data?.status !== 'available' ? (
							<button
								className="w-full max-w-[300px] mx-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
								onClick={handleClick}
							>
								Confirm Field
							</button>
						) : user?.user?.role === 'ADMIN' && data?.status !== 'available' ? (
							<button
								className="w-full max-w-[300px] mx-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
								onClick={handleConfirm}
							>
								Confirm Reserve
							</button>
						) : (
							<div className="mt-4 w-full flex justify-center">
								<button
									className="w-full max-w-[300px] mx-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									onClick={() => navigate(`/book-field/${id}`)}
								>
									Reserve Field
								</button>
							</div>
						)}
					</div>
				</main>
			)}
		</>
	);
};

export default Field;
