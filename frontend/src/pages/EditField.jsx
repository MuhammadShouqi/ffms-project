import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import imageIcon from '../assets/download.jfif';
import AuthContext from '../context/authContext';
import { QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddStaff() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');
	const { user } = useContext(AuthContext);
	// const [schedule, setSchedule] = useState([]);
	// const [specialPricing, setSpecialPricing] = useState([]);
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
		try {
			const response = await axios.post(
				`${apiUrl}/admins/staff`,
				{
					name,
					email,
					role,
				},
				config
			);
			setName('');
			setEmail('');
			setRole('');
			console.log('Field added successful:', response.data);
			navigate('/staffs');
			await QueryClient.invalidateQueries({
				queryKey: ['users', 'staffs'],
			});
			return;
		} catch (error) {
			console.error('Error adding field:', error);
			// toast.error('Error adding field');
		}
	};
	return (
		<main className="body-content px-8 py-8 bg-slate-100">
			<div className="page-title mb-7">
				<h3 className="mb-0 text-4xl">Add Staff</h3>
			</div>
			<main className="bg-white shadow rounded-lg my-2 px-6 py-5">
				<div className="flex items-center justify-center md:p-12">
					<div className="mx-auto w-full md:max-w-[550px] bg-white">
						<form onSubmit={handleAddStaff}>
							<div className="mb-5">
								<label
									htmlFor="satffName"
									className="mb-3 block text-base font-medium text-[#07074D]"
								>
									Staff Name
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
										htmlFor="phone"
										className="mb-3 block text-base font-medium text-[#07074D]"
									>
										Role
									</label>
									<input
										type="text"
										name="role"
										id="role"
										value={role}
										onChange={(e) => setRole(e.target.value)}
										placeholder="Enter staff role"
										className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
									/>
								</div>
							</div>
							{/* <div className="mb-5">
								<label
									htmlFor="schedule"
									className="mb-3 block text-base font-medium text-[#07074D]"
								>
									Schedule
								</label>
								<input
									type="date"
									name="schedule"
									id="schedule"
									value={schedule}
									onChange={(e) => setSchedule(e.target.value)}
									placeholder="Enter your schedule"
									className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
								/>
							</div>
							<div className="-mx-3 flex flex-wrap">
								<div className="w-full px-3 sm:w-1/2">
									<div className="mb-5">
										<label
											htmlFor="sprice"
											className="mb-3 block text-base font-medium text-[#07074D]"
										>
											Special Pricing
										</label>
										<input
											type="number"
											name="sprice"
											id="sprice"
											value={name}
											onChange={(e) => setSpecialPricing(e.target.value)}
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
										/>
									</div>
								</div>
							</div> */}
							<div>
								<button
									type="submit"
									className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
								>
									Add Staff
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</main>
	);
}

export default AddStaff;
