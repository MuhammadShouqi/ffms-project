/* eslint-disable react/prop-types */
import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import RecentTransactions from './../components/Recent';

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const { data, isLoading, error } = useQuery({
		queryKey: ['dashboard'],
		queryFn: async () => fetchDashboard(user),
	});
	useEffect(() => {
		if (data) {
			console.log(data);
			// console.log(data?.recentOrders);
			// navigate('/');
		}
		if (error) {
			console.log(error);
			toast.error(error?.message);
		}
	}, [data, error]);

	const handelAddModal = () => {
		navigate('/');
	};
	// const handleEdit = (product) => {
	// 	setSelectedProduct(product);
	// 	navigate(`/products/${product._id}/edit`);
	// };
	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between items-end flex-wrap">
					<div className="page-title mb-7">
						<h3 className="mb-0 text-4xl">Dashboard</h3>
						<p className="text-textBody m-0">
							Welcome to {user.role === 'ADMIN' ? 'Admin' : 'your'} dashboard
						</p>
					</div>
					{user.user.role === 'ADMIN' && (
						<div className=" mb-7">
							<Link to={'/add-field'} className="tp-btn px-5 py-2">
								Add Field
							</Link>
						</div>
					)}
				</div>

				{/* <!-- card --> */}
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
					<div className="widget-item bg-white p-6 flex justify-between rounded-md">
						<div>
							<h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
								{data?.totalFields}
								{/* 30 */}
							</h4>
							<p className="text-tiny leading-4">Fields</p>
							<div className="badge space-x-1">
								{' '}
								<span>
									10
									{/* {data?.totalOrders} */}%
								</span>
								<svg
									width="12"
									height="12"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 1V18C1 19.66 2.34 21 4 21H21"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeMiterlimit="10"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M4 16L8.59 10.64C9.35 9.76001 10.7 9.7 11.52 10.53L12.47 11.48C13.29 12.3 14.64 12.25 15.4 11.37L20 6"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeMiterlimit="10"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
						<div>
							<Link to="/fields">
								<span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-success">
									<svg
										width="20"
										height="20"
										viewBox="0 0 22 22"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M11.37 7.87988H16.62"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M5.38 7.87988L6.13 8.62988L8.38 6.37988"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M11.37 14.8799H16.62"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M5.38 14.8799L6.13 15.6299L8.38 13.3799"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M8 21H14C19 21 21 19 21 14V8C21 3 19 1 14 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21Z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
							</Link>
						</div>
					</div>
					<div className="widget-item bg-white p-6 flex justify-between rounded-md">
						<div>
							<h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
								{data?.totalbookings}
							</h4>
							<p className="text-tiny leading-4">Bookings</p>
							<div className="badge space-x-1 text-purple bg-purple/10">
								<span>{data?.totalbookings || '30'}</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									viewBox="0 0 512.001 512.001"
									width="12"
									height="12"
								>
									<path
										fill="currentColor"
										d="M506.35,80.699c-7.57-7.589-19.834-7.609-27.43-0.052L331.662,227.31l-42.557-42.557c-7.577-7.57-19.846-7.577-27.423,0 L89.076,357.36c-7.577,7.57-7.577,19.853,0,27.423c3.782,3.788,8.747,5.682,13.712,5.682c4.958,0,9.93-1.894,13.711-5.682 l158.895-158.888l42.531,42.524c7.57,7.57,19.808,7.577,27.397,0.032l160.97-160.323 C513.881,100.571,513.907,88.288,506.35,80.699z"
									/>
									<path
										fill="currentColor"
										d="M491.96,449.94H38.788V42.667c0-10.712-8.682-19.394-19.394-19.394S0,31.955,0,42.667v426.667 c0,10.712,8.682,19.394,19.394,19.394H491.96c10.712,0,19.394-8.682,19.394-19.394C511.354,458.622,502.672,449.94,491.96,449.94z"
									/>
									<path
										fill="currentColor"
										d="M492.606,74.344H347.152c-10.712,0-19.394,8.682-19.394,19.394s8.682,19.394,19.394,19.394h126.061v126.067 c0,10.705,8.682,19.394,19.394,19.394S512,249.904,512,239.192V93.738C512,83.026,503.318,74.344,492.606,74.344z"
									/>
								</svg>
							</div>
						</div>
						<div>
							<Link to="/bookings">
								<span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-purple">
									<svg
										width="20"
										height="22"
										viewBox="0 0 20 22"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M1 21H19"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M3.59998 7.37988H2C1.45 7.37988 1 7.82988 1 8.37988V16.9999C1 17.5499 1.45 17.9999 2 17.9999H3.59998C4.14998 17.9999 4.59998 17.5499 4.59998 16.9999V8.37988C4.59998 7.82988 4.14998 7.37988 3.59998 7.37988Z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M10.7999 4.18994H9.19995C8.64995 4.18994 8.19995 4.63994 8.19995 5.18994V16.9999C8.19995 17.5499 8.64995 17.9999 9.19995 17.9999H10.7999C11.3499 17.9999 11.7999 17.5499 11.7999 16.9999V5.18994C11.7999 4.63994 11.3499 4.18994 10.7999 4.18994Z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M17.9999 1H16.3999C15.8499 1 15.3999 1.45 15.3999 2V17C15.3999 17.55 15.8499 18 16.3999 18H17.9999C18.5499 18 18.9999 17.55 18.9999 17V2C18.9999 1.45 18.5499 1 17.9999 1Z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
							</Link>
						</div>
					</div>
					<div className="widget-item bg-white p-6 flex justify-between rounded-md">
						<div>
							<h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
								{data?.totalUsers}
							</h4>
							<p className="text-tiny leading-4">Users</p>
							<div className="badge space-x-1 text-info bg-info/10">
								<span>10%</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									viewBox="0 0 512.001 512.001"
									width="12"
									height="12"
								>
									<path
										fill="currentColor"
										d="M506.35,80.699c-7.57-7.589-19.834-7.609-27.43-0.052L331.662,227.31l-42.557-42.557c-7.577-7.57-19.846-7.577-27.423,0 L89.076,357.36c-7.577,7.57-7.577,19.853,0,27.423c3.782,3.788,8.747,5.682,13.712,5.682c4.958,0,9.93-1.894,13.711-5.682 l158.895-158.888l42.531,42.524c7.57,7.57,19.808,7.577,27.397,0.032l160.97-160.323 C513.881,100.571,513.907,88.288,506.35,80.699z"
									/>
									<path
										fill="currentColor"
										d="M491.96,449.94H38.788V42.667c0-10.712-8.682-19.394-19.394-19.394S0,31.955,0,42.667v426.667 c0,10.712,8.682,19.394,19.394,19.394H491.96c10.712,0,19.394-8.682,19.394-19.394C511.354,458.622,502.672,449.94,491.96,449.94z"
									/>
									<path
										fill="currentColor"
										d="M492.606,74.344H347.152c-10.712,0-19.394,8.682-19.394,19.394s8.682,19.394,19.394,19.394h126.061v126.067 c0,10.705,8.682,19.394,19.394,19.394S512,249.904,512,239.192V93.738C512,83.026,503.318,74.344,492.606,74.344z"
									/>
								</svg>
							</div>
						</div>
						<div>
							<Link to="/users">
								<span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-info">
									<svg
										width="22"
										height="22"
										viewBox="0 0 22 22"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M17 6.16C16.94 6.15 16.87 6.15 16.81 6.16C15.43 6.11 14.33 4.98 14.33 3.58C14.33 2.15 15.48 1 16.91 1C18.34 1 19.49 2.16 19.49 3.58C19.48 4.98 18.38 6.11 17 6.16Z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M15.9699 13.44C17.3399 13.67 18.8499 13.43 19.9099 12.72C21.3199 11.78 21.3199 10.24 19.9099 9.30004C18.8399 8.59004 17.3099 8.35003 15.9399 8.59003"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M4.96998 6.16C5.02998 6.15 5.09998 6.15 5.15998 6.16C6.53998 6.11 7.63998 4.98 7.63998 3.58C7.63998 2.15 6.48998 1 5.05998 1C3.62998 1 2.47998 2.16 2.47998 3.58C2.48998 4.98 3.58998 6.11 4.96998 6.16Z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M5.99994 13.44C4.62994 13.67 3.11994 13.43 2.05994 12.72C0.649941 11.78 0.649941 10.24 2.05994 9.30004C3.12994 8.59004 4.65994 8.35003 6.02994 8.59003"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M11 13.63C10.94 13.62 10.87 13.62 10.81 13.63C9.42996 13.58 8.32996 12.45 8.32996 11.05C8.32996 9.61997 9.47995 8.46997 10.91 8.46997C12.34 8.46997 13.49 9.62997 13.49 11.05C13.48 12.45 12.38 13.59 11 13.63Z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M8.08997 16.78C6.67997 17.72 6.67997 19.26 8.08997 20.2C9.68997 21.27 12.31 21.27 13.91 20.2C15.32 19.26 15.32 17.72 13.91 16.78C12.32 15.72 9.68997 15.72 8.08997 16.78Z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
							</Link>
						</div>
					</div>
				</div>
				<RecentTransactions tableData={data?.bookings ||[]} handelAddModal={handelAddModal} />
			</div>
			{isLoading && <Loader />}
		</>
	);
};

export default Dashboard;
