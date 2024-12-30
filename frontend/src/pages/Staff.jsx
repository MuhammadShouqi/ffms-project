import { useContext } from 'react';
import AuthContext from '../context/authContext';
import Loader from '../components/Loader';
import { fetchStaffs } from '../hooks/axiosApis';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { FiDelete } from 'react-icons/fi';
import axios from 'axios';

const Users = () => {
	const { user } = useContext(AuthContext);
	const { data, isLoading, error } = useQuery({
		queryKey: ['users', 'staffs'],
		queryFn: async () => fetchStaffs(user),
	});
	const navigate = useNavigate();
	if (error) {
		console.log(error);
	}
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token || user?.accessToken}`,
		},
	};
	const apiUrl = import.meta.env.VITE_API_URL;
	const handleClick = (id) => {
		console.log('fetchUser', id);
		// navigate(`/users`);
	};
	const handledDeleteStaff = async (id) => {
		try {
			const response = await axios.delete(
				`${apiUrl}/admins/staff/${id}`,
				config
			);
			console.log('Field deleted successful:', response.data);
			navigate(-1);
			await QueryClient.invalidateQueries({
				queryKey: ['users', 'staffs'],
			});
			return;
		} catch (error) {
			console.error('Error adding field:', error);
		}
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7 flex justify-between items-center ">
						<h3 className="mb-0 text-4xl">Staffs</h3>
						<button
							onClick={() => navigate('/add-staff')}
							className="btn text-black "
						>
							<FaPlus />
						</button>
					</div>
					{data?.length > 0 &&
						data?.map((item) => {
							console.log('Users', item);
							return (
								<div
									key={item._id}
									className="bg-white shadow rounded-lg my-2 px-6 py-5 text-green-500 flex justify-between items-center "
								>
									<div className="mr-4 w-full">
										<div
											className="flex justify-between items-center cursor-pointer w-full"
											onClick={() => handleClick(item._id)}
										>
											<p className=" font-semibold">{item?.name}</p>
											<p className=" font-semibold">{item?.email}</p>
										</div>
										<div className="flex justify-between items-center">
											<p className="">{item?.phone}</p>
											<p className=" font-semibold">{item?.role}</p>
										</div>
									</div>
									<div>
										<button
											onClick={() => handledDeleteStaff(item._id)}
											className="text-red-400 hover:text-red-500"
										>
											<FiDelete />
										</button>
									</div>
								</div>
							);
						})}
				</main>
			)}
		</>
	);
};

export default Users;
