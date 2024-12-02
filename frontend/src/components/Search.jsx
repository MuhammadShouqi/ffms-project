// import React from 'react'
import { useState, useContext } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { fetchProduct } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
// import { useNavigate, Link } from 'react-router-dom';
// import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
const Search = () => {
	const { user } = useContext(AuthContext);
	const apiUrl = import.meta.env.VITE_API_URL;
	// const queryClient = useQueryClient();
	// const navigate = useNavigate();
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
			// 'Content-Type': 'multipart/form-data',
		},
	};
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);
	// console.log(parentCategories);
	const handleSearch = async () => {
		if (search === '') {
			// toast.error('category name is required');
			return;
		}
		setLoading(true);
		try {
			axios
				.get(`${apiUrl}/products/search?${search}`, config)
				.then((res) => {
					if (res.data) {
						toast.success(`${res.data.total} items found`);
					}
					console.log(res);
					// queryClient.invalidateQueries(['category']);
				})
				.catch((error) => {
					toast.error(error.message);
					console.log(error);
				})
				.finally(() => {
					setLoading(false);
				});
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	return (
		<>
			<div className="search-input relative">
				<input
					className="input h-[44px] w-full pl-14"
					type="text"
					placeholder="Search by product name"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button
					onClick={handleSearch}
					className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme"
				>
					<svg
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
			{loading ? <Loader /> : ''}
		</>
	);
};

export default Search;
