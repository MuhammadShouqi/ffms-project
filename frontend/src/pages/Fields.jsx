import { useContext } from 'react';
import Loader from '../components/Loader';
import { fetchFields } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import imageIcon from '../assets/download.jfif';

function Fields() {
	const { user } = useContext(AuthContext);
	const { data, isLoading, error } = useQuery({
		queryKey: ['fields'],
		queryFn: async () => fetchFields(user.accessToken || user.token),
	});

	const navigate = useNavigate();
	if (error) {
		console.log(error);
	}
	if (data) {
		console.log(data);
	}
	const handleClick = (id) => {
		navigate(`/fields/${id}`);
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7">
						<h3 className="mb-0 text-4xl">Fields</h3>
					</div>
					<div className="grid md:grid-cols-4 gap-4 justify-between items-center">
						{data?.length > 0 &&
							data?.map((item) => {
								return (
									<div
										key={item._id}
										onClick={() => handleClick(item._id)}
										className="bg-white shadow rounded-lg my-2 px-6 py-5  cursor-pointer"
									>
										<Link to={`/fields/${item._id}`}>
											<img
												className="w-full object-cover"
												src={item?.image?.url || imageIcon}
												alt={item.name}
											/>
										</Link>
										<p className="">Name: {item?.name}</p>
										<div className="flex justify-between items-center">
											<p className="">Address: {item?.address}</p>
										</div>
										<div className="flex justify-between items-center">
											<p className="">
												Capacity: {item?.capacity}
												{/* {moment().format('DD-MM-YYYY HH:SS A')} */}
											</p>
											<p className="">Price: {item?.pricePerHour}</p>
										</div>
										<div>
											<p className="">Status: {item?.status}</p>
										</div>
									</div>
								);
							})}
					</div>
				</main>
			)}
		</>
	);
}

export default Fields;
