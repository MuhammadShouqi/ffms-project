/* eslint-disable react/prop-types */
import { Fragment, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { LocalStorage } from '../hooks/LocalStorage';
import AuthContext from '../context/authContext';
import Search from '../components/Search';
import userImage from '../assets/userImage.png';
const Header = ({ sideMenu, setSideMenu, notifications }) => {
	const [searchOverlay, setSearchOverlay] = useState(false);
	const [userOption, setUserOption] = useState(false);
	const [notificationTable, setNotificationTable] = useState(false);
	const [isLogoutModal, setIsLogoutModal] = useState(false);
	const navigate = useNavigate();
	const { user, setUser, setToken } = useContext(AuthContext);
	const handleLogOut = () => {
		LocalStorage.remove('user');
		LocalStorage.remove('token');
		setUser('');
		setToken('');
		navigate('login');
		setIsLogoutModal(false);
	};
	const openLogoutModal = () => {
		setIsLogoutModal(true);
		setUserOption(false);
	};

	return (
		<>
			<header className="relative z-10 bg-white border-b border-gray border-solid py-5 px-8 pr-8 w-full">
				<div className="flex justify-between">
					<div className="flex items-center space-x-6 lg:space-x-0">
						<button
							type="button"
							className="block lg:hidden text-2xl text-black"
							onClick={() => setSideMenu(!sideMenu)}
						>
							<svg
								width="20"
								height="12"
								viewBox="0 0 20 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 1H19"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<path
									d="M1 6H19"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<path
									d="M1 11H19"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
						</button>
						<div className="w-[30%] hidden md:block">
							<div className="w-[250px] relative">
								<Search />
							</div>
						</div>
					</div>

					<div className="flex items-center justify-end space-x-6">
						<div className="md:hidden">
							<button
								className="relative w-[40px] h-[40px] leading-[40px] rounded-md text-textBody border border-gray hover:bg-themeLight hover:text-theme hover:border-themeLight"
								onClick={() => setSearchOverlay(!searchOverlay)}
							>
								<svg
									className="-translate-y-[2px]"
									width="16"
									height="16"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M18.9999 19L14.6499 14.65"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
								</svg>
							</button>
						</div>
						<div className="relative">
							<button
								onClick={() => setNotificationTable(!notificationTable)}
								className="relative w-[40px] h-[40px] leading-[40px] rounded-md text-gray border border-gray hover:bg-themeLight hover:text-theme hover:border-themeLight"
							>
								<svg
									className="-translate-y-[1px]"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="16"
									height="16"
								>
									<g>
										<path
											stroke="currentColor"
											d="M23.259,16.2l-2.6-9.371A9.321,9.321,0,0,0,2.576,7.3L.565,16.35A3,3,0,0,0,3.493,20H7.1a5,5,0,0,0,9.8,0h3.47a3,3,0,0,0,2.89-3.8ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm9.165-4.395a.993.993,0,0,1-.8.395H3.493a1,1,0,0,1-.976-1.217l2.011-9.05a7.321,7.321,0,0,1,14.2-.372l2.6,9.371A.993.993,0,0,1,21.165,17.605Z"
										/>
									</g>
								</svg>
								{notifications.length > 0 && (
									<span className="w-[20px] h-[20px] inline-block bg-danger rounded-full absolute -top-[4px] -right-[4px] border-[2px] border-white text-xs leading-[18px] font-medium text-white">
										{notifications.length}
									</span>
								)}
							</button>
							{notificationTable && (
								<div
									// x-show="notificationTable"
									// x-on:click.outside="notificationTable = false"
									// x-transition:enter="transition ease-out duration-200 origin-top"
									// x-transition:enter-start="opacity-0 scale-y-90"
									// x-transition:enter-end="opacity-100 scale-y-100"
									// x-transition:leave="transition ease-in duration-200 origin-top"
									// x-transition:leave-start="opacity-100 scale-y-200"
									// x-transition:leave-end="opacity-0 scale-y-90"
									className="absolute w-[280px] sm:w-[350px] max-h-[285px] overflow-y-auto overflow-item top-full -right-[60px] sm:right-0 shadow-lg rounded-md bg-white py-5 px-5"
								>
									{notifications.length > 0 &&
										notifications.map((item, index) => {
											return (
												<div
													key={item._id || index}
													className="flex items-center justify-between last:border-0 border-b border-gray pb-4 mb-4 last:pb-0 last:mb-0"
												>
													<div className="flex items-center space-x-3">
														<div className="">
															<img
																className="w-[40px] h-[40px] rounded-md"
																src="assets/img/product/prodcut-1.jpg"
																alt="img"
															/>
														</div>
														<div className="">
															<h5 className="text-base mb-0 leading-none">
																{item.titel}
															</h5>
															<span className="text-tiny leading-none">
																{item.message}
															</span>
														</div>
													</div>
													<div className="">
														<button className="hover:text-danger">
															<svg
																className="-translate-y-[3px]"
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 24 24"
																width="16"
																height="16"
															>
																<path
																	fill="currentColor"
																	d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"
																/>
															</svg>
														</button>
													</div>
												</div>
											);
										})}
								</div>
							)}
						</div>
						<div className="relative w-[70%] flex justify-end items-center">
							<button
								className="relative"
								type="button"
								onClick={() => setUserOption(!userOption)}
							>
								<img
									className="w-[40px] h-[40px] rounded-md"
									src={user?.image?.url || userImage}
									alt={user?.user?.name}
								/>
								<span className="w-[12px] h-[12px] inline-block bg-green-500 rounded-full absolute -top-[4px] -right-[4px] border-[2px] border-white"></span>
							</button>
							{userOption && (
								<div
									// x-show="userOption"
									// x-on:click.outside="userOption = false"
									// x-transition:enter="transition ease-out duration-200 origin-top"
									// x-transition:enter-start="opacity-0 scale-y-90"
									// x-transition:enter-end="opacity-100 scale-y-100"
									// x-transition:leave="transition ease-in duration-200 origin-top"
									// x-transition:leave-start="opacity-100 scale-y-200"
									// x-transition:leave-end="opacity-0 scale-y-90"
									className="absolute w-[280px] top-full right-0 shadow-lg rounded-md bg-white py-5 px-5 z-10"
								>
									<div className="flex items-center space-x-3 border-b border-gray pb-3 mb-2">
										<Link
											to={'./profile'}
											className=""
											onClick={() => setUserOption(!userOption)}
										>
											<img
												className="w-[50px] h-[50px] rounded-md"
												src={user?.image?.url || userImage}
												alt={user?.user?.name}
											/>
										</Link>
										<div className="">
											<h5 className="text-base mb-1 leading-none">
												{user?.user?.name}
											</h5>
											<p className="mb-0 text-tiny leading-none">
												{user?.user?.email}
											</p>
										</div>
									</div>
									<ul>
										<li onClick={() => setUserOption(!userOption)}>
											<Link
												to={'./'}
												className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
											>
												Dashboard
											</Link>
										</li>
										<li onClick={() => setUserOption(!userOption)}>
											<Link
												to={'./profile'}
												className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
											>
												Account Settings
											</Link>
										</li>
										<li>
											<button
												onClick={openLogoutModal}
												className="text-left px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
											>
												Logout
											</button>
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* <!-- search --> */}
				<div
					className={`fixed top-0 left-0 w-full bg-white p-10 z-50 transition-transform duration-300 md:hidden flex" ${
						searchOverlay
							? 'translate-y-[0px]'
							: ' -translate-y-[230px] lg:translate-y-[0]'
					}`}
				>
					<div className="relative mb-3">
						<Search />
					</div>
					<div className="">
						<span className="text-tiny mr-2">Keywords :</span>
						<Link
							to={'#'}
							className="inline-block px-3 py-1 border border-gray6 text-tiny leading-none rounded-[4px] hover:text-white hover:bg-theme hover:border-theme"
						>
							Customer
						</Link>
						<Link
							to={'#'}
							className="inline-block px-3 py-1 border border-gray6 text-tiny leading-none rounded-[4px] hover:text-white hover:bg-theme hover:border-theme"
						>
							Product
						</Link>
						<Link
							to={'#'}
							className="inline-block px-3 py-1 border border-gray6 text-tiny leading-none rounded-[4px] hover:text-white hover:bg-theme hover:border-theme"
						>
							Orders
						</Link>
					</div>
				</div>
				<div
					className={`fixed top-0 left-0 w-full h-full z-40 bg-black/70 transition-all duration-300" 
                    ${
											searchOverlay
												? 'visible opacity-1'
												: '  invisible opacity-0 '
										}`}
					onClick={() => setSearchOverlay(!searchOverlay)}
				></div>
			</header>
			{/*  Logout alert modal */}
			<Transition appear show={isLogoutModal} as={Fragment}>
				<Dialog as="div" className="relative" onClose={() => {}}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/70 bg-opacity-25 z-50" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto flex place-content-center z-50">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all font-josefin">
									<div className="flex justify-between px-5 pt-4">
										<div>
											<p className="font-light text-primary"></p>
										</div>
										<button
											onClick={() => setIsLogoutModal(false)}
											className="p-2 py-1 my-1 shadow rounded-full hover:bg-red-300 duration-150 ease-in-out"
										>
											<i className="fa-solid fa-xmark text-xl text-red-300 hover:text-red-500" />
										</button>
									</div>
									<div className="container mx-auto my-auto flex items-center justify-center">
										<div className="w-[500px] mx-auto my-auto  pt-[20px] pb-[20px] px-[20px]">
											<div className="text-center">
												<h4 className="text-[24px] mb-1">Log out</h4>
												<p className="mt-3 text-lg md:text-xl">
													Are you sure you want to log out?
												</p>
											</div>
											<div className="pt-[10px]">
												<button
													className="bg-red-400 hover:bg-red-600 text-white h-10 w-full flex items-center justify-center rounded-md"
													onClick={handleLogOut}
												>
													<span className="text-lg">Log out</span>
												</button>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
export default Header;
