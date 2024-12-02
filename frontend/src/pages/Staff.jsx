import { useContext } from 'react';
import AuthContext from '../context/authContext';
import Loader from '../components/Loader';
import { fetchUsers } from '../hooks/axiosApis';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Users = () => {
	const { user } = useContext(AuthContext);
	const { data, isLoading, error } = useQuery({
		queryKey: ['users'],
		queryFn: async () => fetchUsers(user),
	});
	const navigate = useNavigate();
	if (error) {
		console.log(error);
	}
	const handleClick = (id) => {
		console.log('fetchUser', id);
		navigate(`/users`);
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7">
						<h3 className="mb-0 text-4xl">Staffs</h3>
					</div>
					{data?.length > 0 &&
						data?.map((item) => {
							console.log('Users', item);
							return (
								<div
									key={item._id}
									onClick={() => handleClick(item._id)}
									className="bg-white shadow rounded-lg my-2 px-6 py-5 text-green-500"
								>
									<div className="flex justify-between items-center">
										<p className=" font-semibold">{item?.name}</p>
										<p className=" font-semibold">{item?.email}</p>
									</div>
									<div className="flex justify-between items-center">
										<p className="">{item?.phone}</p>
										<p className=" font-semibold">{item?.rank}</p>
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
