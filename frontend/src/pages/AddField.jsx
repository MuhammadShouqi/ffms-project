import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import imageIcon from '../assets/download.jfif';
import AuthContext from '../context/authContext';
import { QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

function AddField() {
	const [name, setName] = useState('');
	const { user } = useContext(AuthContext);
	const [capacity, setCapacity] = useState(0);
	const [price, setPrice] = useState(0);
	const [address, setAddress] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [imageName, setImageName] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const hiddenFileInput = useRef(null);
	const navigate = useNavigate();
	// const [schedule, setSchedule] = useState([]);
	// const [specialPricing, setSpecialPricing] = useState([]);
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token || user?.accessToken}`,
			'Content-Type': 'multipart/form-data',
		},
	};
	console.log('Field user:', user);
	const apiUrl = import.meta.env.VITE_API_URL;

	const handleBooking = async (e) => {
		e.preventDefault();
		const data = {
			name,
			capacity,
			address,
			description,
			pricePerHour: price,
		};
		if (!name) {
			return toast.error('Feild name is required');
		}
		if (!capacity) {
			return toast.error('Feild capacity is required');
		}
		if (!address) {
			return toast.error('Feild address is required');
		}
		if (!price) {
			return toast.error('Feild Price is required');
		}
		if (!description) {
			return toast.error('Feild description is required');
		}
		setLoading(true)
		try {
			const formData = new FormData();
			for (const key in data) {
				formData.append(key, data[key]);
			}
			if (imageFile) {
				formData.append('image', imageFile);
			}
			const response = await axios.post(`${apiUrl}/fields`, formData, config);
			setLoading(true);
			await QueryClient.invalidateQueries({
				queryKey: ['fields'],
			});
			console.log('Field added successful:', response.data);			
			navigate('/dashboard');
		} catch (error) {
			setLoading(false);
			console.error('Error adding field:', error);
		}
	};
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		const maxSize = 5 * 1024 * 1024; // 5MB in bytes
		const validTypes = ['image/svg+xml', 'image/jpeg', 'image/png'];
		const isValidType = validTypes.includes(file.type);
		if (!file) {
			return toast.error('add a valid image');
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		if (!isValidType) {
			toast.error('Invalid file type. Only SVG, JPEG, and PNG are allowed.');
			return;
		}
		if (file.size > maxSize) {
			return toast.error('Image size must be less than 5Mb');
		}
		const imgname = file.name;
		setImageName(imgname);
		reader.onloadend = () => {
			const imageDataURL = reader.result;
			setImage(imageDataURL);
			setImageFile(file);
		};
	};
	const handleClick = () => {
		hiddenFileInput.current.click();
	};
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7">
						<h3 className="mb-0 text-4xl">Add Field</h3>
					</div>
					<main className="bg-white shadow rounded-lg my-2 px-6 py-5">
						<div className="flex items-center justify-center md:p-12">
							<div className="mx-auto w-full md:max-w-[550px] bg-white">
								<form onSubmit={handleBooking}>
									<div className="mb-5">
										<label
											htmlFor="fieldName"
											className="mb-3 block text-base font-medium text-[#07074D]"
										>
											Field Name
										</label>
										<input
											type="text"
											name="fieldName"
											id="fieldName"
											value={name}
											onChange={(e) => setName(e.target.value)}
											placeholder="field Name"
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
										/>
									</div>
									<div className=" grid grid-cols-2 gap-2">
										<div className="mb-5">
											<label
												htmlFor="price"
												className="mb-3 block text-base font-medium text-[#07074D]"
											>
												Price per hour
											</label>
											<input
												type="number"
												name="price"
												id="price"
												value={price}
												onChange={(e) => setPrice(e.target.value)}
												placeholder="Enter price"
												className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="capacity"
												className="mb-3 block text-base font-medium text-[#07074D]"
											>
												Capacity
											</label>
											<input
												type="text"
												name="capacity"
												id="capacity"
												value={capacity}
												onChange={(e) => setCapacity(e.target.value)}
												placeholder="Enter field capacity"
												className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
											/>
										</div>
									</div>
									<div className="mb-5">
										<p className="mb-0 text-base text-black">
											Address <span className="text-red">*</span>
										</p>
										<input
											className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
											type="text"
											placeholder="Address"
											value={address}
											onChange={(e) => setAddress(e.target.value)}
										/>
									</div>
									<div className="mb-5">
										<label
											htmlFor="description"
											className="mb-3 block text-base font-medium text-[#07074D]"
										>
											Description
										</label>
										<textarea
											name="description"
											id="description"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											placeholder="Enter your description"
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
										/>
									</div>

									<div className="bg-white px-8 py-8 rounded-md mb-6">
										<p className="mb-2 text-base text-black">Upload Image</p>
										<div className="text-center" onClick={handleClick}>
											{!image ? (
												<img
													className="w-[100px] h-auto mx-auto"
													src={imageIcon}
													alt="product"
												/>
											) : (
												<img
													className="w-[100px] h-auto mx-auto"
													src={image}
													alt={imageName || name}
												/>
											)}
										</div>
										<span className="text-tiny text-center w-full inline-block mb-3">
											{imageName
												? imageName
												: 'Image size must be less than 5Mb'}
										</span>
										<div className="">
											<form>
												<input
													type="file"
													ref={hiddenFileInput}
													onChange={handleImageChange}
													className="hidden"
												/>
												<label
													htmlFor="productImage"
													className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
													onClick={handleClick}
												>
													Upload Image
												</label>
											</form>
										</div>
									</div>

									<div>
										<button
											type="submit"
											className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
										>
											Add Field
										</button>
									</div>
								</form>
							</div>
						</div>
					</main>
				</main>
			)}
		</>
	);
}

export default AddField;
