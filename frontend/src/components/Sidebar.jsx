/* eslint-disable react/prop-types */
import { Fragment, useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { LocalStorage } from '../hooks/LocalStorage';
import AuthContext from '../context/authContext';
// import logo from './../assets/img/icons/icon.png';

import logo from '../assets/logo.jpeg';
const Sidebar = ({ sideMenu, setSideMenu }) => {
	const navigate = useNavigate();
	const [nav, setNav] = useState(null);
	const { user, setUser, setToken } = useContext(AuthContext);
	const [isLogoutModal, setIsLogoutModal] = useState(false);
	const handleNav = (number) => {
		nav !== number ? setNav(number) : setNav(null);
	};
	const [isMobile, setIsMobile] = useState(false);

	const handleResize = () => {
		const screenWidth = window.innerWidth;
		setIsMobile(screenWidth <= 1024); // Set a threshold for tablet screen size (e.g., 1024 pixels)
		// setIsMobile(screenWidth <= 768); // Set a threshold for mobile screen size (e.g., 768 pixels)
	};
	const handleLogOut = () => {
		LocalStorage.remove('user');
		LocalStorage.remove('token');
		setUser('');
		setToken('');
		navigate('/login');
		setIsLogoutModal(false);
	};
	console.log('user', user)
	useEffect(() => {
		// Initial check on component mount
		handleResize();

		// Add event listener to check on window resize
		window.addEventListener('resize', handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const openLogoutModal = () => {
		setIsLogoutModal(true);
		handleSideBar();
	};
	const handleSideBar = () => {
		// check screen size and close sidebar on mobile screen
		if (!isMobile) {
			return;
		}
		setSideMenu(!sideMenu);
	};
	return (
		<>
			<aside
				className={`w-[300px] lg:w-[250px] xl:w-[300px] border-r border-gray overflow-y-none sidebar-scrollbar fixed left-0 top-0 h-full bg-white z-50 transition-transform duration-300 ${
					sideMenu
						? 'translate-x-[0px]'
						: ' -translate-x-[300px] lg:translate-x-[0]'
				}`}
			>
				<div className="h-full flex flex-col">
					<div className="py-4 pb-8 px-8 border-b border-gray h-[78px] w-full flex justify-between items-center">
						<NavLink to={'/'} className="w-[140px] flex items-center mx-auto">
							<img className="mx-auto w-16 h-16" src={logo} alt="FMFC" />
							{/* <h2 className="text-green-500">FMFC</h2> */}
						</NavLink>
						<button
							type="button"
							className="block lg:hidden text-2xl text-black"
							onClick={handleSideBar}
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
					</div>
					<div className="px-4 py-5 flex flex-col h-full flex-1">
						<ul className="flex-1">
							<li onClick={handleSideBar}>
								<NavLink
									to={'/'}
									onClick={() => handleNav(0)}
									className={`${
										nav == 0
											? 'bg-themeLight hover:bg-themeLight text-theme'
											: ''
									} group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-2 hover:bg-gray sidebar-NavLink-active`}
								>
									<span className="inline-block  mr-[10px] text-xl">
										<svg
											className="-translate-y-[4px]"
											xmlnsXlink="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z"
											/>
											<path
												fill="currentColor"
												d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"
											/>
											<path
												fill="currentColor"
												d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z"
											/>
											<path
												fill="currentColor"
												d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"
											/>
										</svg>
									</span>
									Dashboard
								</NavLink>
							</li>
							<li>
								<a
									onClick={() => handleNav(1)}
									className={`${
										nav == 1
											? 'bg-themeLight hover:bg-themeLight text-theme'
											: ''
									} group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active`}
								>
									<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
										<svg
											className="-translate-y-[4px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="M16,0h-.13a2.02,2.02,0,0,0-1.941,1.532,2,2,0,0,1-3.858,0A2.02,2.02,0,0,0,8.13,0H8A5.006,5.006,0,0,0,3,5V21a3,3,0,0,0,3,3H8.13a2.02,2.02,0,0,0,1.941-1.532,2,2,0,0,1,3.858,0A2.02,2.02,0,0,0,15.87,24H18a3,3,0,0,0,3-3V5A5.006,5.006,0,0,0,16,0Zm2,22-2.143-.063A4,4,0,0,0,8.13,22H6a1,1,0,0,1-1-1V17H7a1,1,0,0,0,0-2H5V5A3,3,0,0,1,8,2l.143.063A4.01,4.01,0,0,0,12,5a4.071,4.071,0,0,0,3.893-3H16a3,3,0,0,1,3,3V15H17a1,1,0,0,0,0,2h2v4A1,1,0,0,1,18,22Z"
											/>
											<path
												fill="currentColor"
												d="M13,15H11a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"
											/>
										</svg>
									</span>
									Fields
									<span
										className={`absolute right-4 top-[52%] transition-transform duration-300 origin-center w-4 h-4" ${
											nav == 1
												? 'translate-y-[-10px] rotate-90'
												: 'translate-y-[-10px]'
										}`}
									>
										<svg
											className="-translate-y-[5px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"
											/>
										</svg>
									</span>
								</a>
								{nav === 1 && (
									<ul className={`pl-[42px] pr-[20px] pb-3`}>
										<li>
											<NavLink
												to={'/fields'}
												onClick={handleSideBar}
												className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
											>
												Fields
											</NavLink>
										</li>
										<li>
											<NavLink
												to={'/add-field'}
												onClick={handleSideBar}
												className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
											>
												Add Field
											</NavLink>
										</li>
									</ul>
								)}
							</li>
							{user?.user?.role === 'ADMIN' &&
								<li className="">
									<a
										onClick={() => handleNav(5)}
										className={`${nav == 5
												? 'bg-themeLight hover:bg-themeLight text-theme'
												: ''
											}
									 group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active`}
									>
										<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
											<svg
												className="-translate-y-[4px]"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="16"
												height="16"
											>
												<path
													fill="currentColor"
													d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z"
												/>
											</svg>
										</span>
										Users
										<span
											className={`absolute right-4 top-[52%] transition-transform duration-300 origin-center w-4 h-4  ${nav == 5
													? 'translate-y-[-10px] rotate-90'
													: 'translate-y-[-10px]'
												}`}
										>
											<svg
												className="-translate-y-[5px]"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="16"
												height="16"
											>
												<path
													fill="currentColor"
													d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"
												/>
											</svg>
										</span>
									</a>
									{nav === 5 && (
										<ul className="pl-[42px] pr-[20px] pb-3">
											<li>
												<NavLink
													to={'/users'}
													onClick={handleSideBar}
													className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
												>
													Users List
												</NavLink>
											</li>
											<li>
												<NavLink
													to={'/staffs'}
													onClick={handleSideBar}
													className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
												>
													Staffs
												</NavLink>
											</li>
										</ul>
									)}
								</li>
							}
							<li>
								<a
									onClick={() => handleNav(6)}
									className={`
										${
											nav == 6
												? 'bg-themeLight hover:bg-themeLight text-theme'
												: ''
										} group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active`}
								>
									<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
										<svg
											className="-translate-y-[4px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="m11.349,24H0V3C0,1.346,1.346,0,3,0h12c1.654,0,3,1.346,3,3v5.059c-.329-.036-.662-.059-1-.059s-.671.022-1,.059V3c0-.552-.448-1-1-1H3c-.552,0-1,.448-1,1v19h7.518c.506.756,1.125,1.429,1.831,2Zm0-14h-7.349v2h5.518c.506-.756,1.125-1.429,1.831-2Zm-7.349,7h4c0-.688.084-1.356.231-2h-4.231v2Zm20,0c0,3.859-3.141,7-7,7s-7-3.141-7-7,3.141-7,7-7,7,3.141,7,7Zm-2,0c0-2.757-2.243-5-5-5s-5,2.243-5,5,2.243,5,5,5,5-2.243,5-5ZM14,5H4v2h10v-2Zm5.589,9.692l-3.228,3.175-1.63-1.58-1.393,1.436,1.845,1.788c.314.315.733.489,1.179.489s.865-.174,1.173-.482l3.456-3.399-1.402-1.426Z"
											/>
										</svg>
									</span>
									Bookings
									<span
										className={`absolute right-4 top-[52%] transition-transform duration-300 origin-center w-4 h-4" ${
											nav == 6
												? 'translate-y-[-10px] rotate-90'
												: 'translate-y-[-10px]'
										}`}
									>
										<svg
											className="-translate-y-[5px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"
											/>
										</svg>
									</span>
								</a>
								{nav === 6 && (
									<ul className="pl-[42px] pr-[20px] pb-3">
										<li>
											<NavLink
												to={'/bookings'}
												onClick={handleSideBar}
												className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
											>
												Bookings
											</NavLink>
										</li>

										<li>
											<NavLink
												to={'/transactions'}
												onClick={handleSideBar}
												className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
											>
												Transactions
											</NavLink>
										</li>
									</ul>
								)}
							</li>

							<li>
								<NavLink
									to={'/profile'}
									onClick={handleSideBar}
									className="group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active"
								>
									<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
										<svg
											className="-translate-y-[4px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm-4,21.164v-.164c0-2.206,1.794-4,4-4s4,1.794,4,4v.164c-1.226.537-2.578.836-4,.836s-2.774-.299-4-.836Zm9.925-1.113c-.456-2.859-2.939-5.051-5.925-5.051s-5.468,2.192-5.925,5.051c-2.47-1.823-4.075-4.753-4.075-8.051C2,6.486,6.486,2,12,2s10,4.486,10,10c0,3.298-1.605,6.228-4.075,8.051Zm-5.925-15.051c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4Zm0,6c-1.103,0-2-.897-2-2s.897-2,2-2,2,.897,2,2-.897,2-2,2Z"
											/>
										</svg>
									</span>
									Profile
								</NavLink>
							</li>
						</ul>
						<div className="border-t border-gray pt-3 mt-3">
							<button
								onClick={openLogoutModal}
								className="group rounded-md bg-red-200 hover:bg-red-300 relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 sidebar-NavLink-active"
							>
								<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
									<svg
										className="-translate-y-[3px]"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="16"
										height="16"
									>
										<path
											fill="currentColor"
											d="M24,10a.988.988,0,0,0-.024-.217l-1.3-5.868A4.968,4.968,0,0,0,17.792,0H6.208a4.968,4.968,0,0,0-4.88,3.915L.024,9.783A.988.988,0,0,0,0,10v1a3.984,3.984,0,0,0,1,2.643V19a5.006,5.006,0,0,0,5,5H18a5.006,5.006,0,0,0,5-5V13.643A3.984,3.984,0,0,0,24,11ZM2,10.109l1.28-5.76A2.982,2.982,0,0,1,6.208,2H7V5A1,1,0,0,0,9,5V2h6V5a1,1,0,0,0,2,0V2h.792A2.982,2.982,0,0,1,20.72,4.349L22,10.109V11a2,2,0,0,1-2,2H19a2,2,0,0,1-2-2,1,1,0,0,0-2,0,2,2,0,0,1-2,2H11a2,2,0,0,1-2-2,1,1,0,0,0-2,0,2,2,0,0,1-2,2H4a2,2,0,0,1-2-2ZM18,22H6a3,3,0,0,1-3-3V14.873A3.978,3.978,0,0,0,4,15H5a3.99,3.99,0,0,0,3-1.357A3.99,3.99,0,0,0,11,15h2a3.99,3.99,0,0,0,3-1.357A3.99,3.99,0,0,0,19,15h1a3.978,3.978,0,0,0,1-.127V19A3,3,0,0,1,18,22Z"
										/>
									</svg>
								</span>
								Logout
							</button>
						</div>
					</div>
				</div>
			</aside>
			{/*  Logout alert modal */}
			<Transition appear show={isLogoutModal} as={Fragment}>
				<Dialog as="div" className="relative" onClose={() => {}}>
					<Transition.div
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/70 bg-opacity-25 z-50" />
					</Transition.div>

					<div className="fixed inset-0 overflow-y-auto flex place-content-center z-50">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.div
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.div className="w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all font-josefin">
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
								</Dialog.div>
							</Transition.div>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Sidebar;
