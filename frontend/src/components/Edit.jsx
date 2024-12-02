import { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import axios from 'axios';
import { fetchProducts } from '../hooks/axiosApis';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { generateRandomCode } from '../hooks/RandomCode';
import MultiSelectDropdown from './../components/MultiSelectDropdown';
import imageIcon from './../../assets/img/icons/upload.png';
import getError from '../hooks/getError';
const EditCoupon = () => {
	const { user, selectedProduct, setSelectedProduct } = useContext(AuthContext);
	const [products, setProducts] = useState([]);
	const { data, isLoading, error } = useQuery(['products'], async () =>
		fetchProducts(user)
	);
	const apiUrl = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	useEffect(() => {
		if (!selectedProduct) {
			navigate('/products');
		}
		console.log(selectedProduct);
	}, [selectedProduct, navigate]);
	useEffect(() => {
		if (data && data?.length > 0) {
			setProducts(data);
			// console.log(data);
			// navigate('/');/
		}
		if (error) {
			console.log(error);
			toast.error(error?.message);
		}
	}, [data, error]);
	const [name, setName] = useState(selectedProduct.name || '');
	const [description, setDescription] = useState(
		selectedProduct.description || ''
	);
	const [code, setCode] = useState(
		selectedProduct.code || generateRandomCode()
	);
	const [endTime, setEndTime] = useState(selectedProduct.endTime || '');
	const [startTime, setStartTime] = useState(selectedProduct.startTime || '');
	const [amount, setAmount] = useState(selectedProduct.amount || 0);
	const [available, setAvailable] = useState(selectedProduct.available || 0);
	const [minAmount, setMinAmount] = useState(selectedProduct.slug || '');
	const [type, setType] = useState(selectedProduct.type || '');
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [image, setImage] = useState(null);
	const [imageName, setImageName] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const hiddenFileInput = useRef(null);
	const [loading, setIsLoading] = useState(null);
	const queryClient = useQueryClient();
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
			'Content-Type': 'multipart/form-data',
		},
	};
	const handleUpdateCoupon = async () => {
		const data = {
			name,
			type,
			description,
			available,
			code,
			amount,
			minAmount,
			productType: selectedOptions,
			startTime,
			endTime,
		};

		if (name === '') {
			return toast.error('coupon name is required');
		}
		setIsLoading(true);
		try {
			const formData = new FormData();
			for (const key in data) {
				formData.append(key, data[key]);
			}
			if (imageFile) {
				formData.append('image', imageFile);
			}
			axios
				.patch(`${apiUrl}/coupons/${selectedProduct._id}`, formData, config)
				.then((res) => {
					if (res.data) {
						toast.success('Coupon updated successfully');
					}
					console.log(res);
					queryClient.invalidateQueries(['coupons', 'coupon']);
					navigate('/coupons');
					setCode(() => generateRandomCode());
				})
				.catch((error) => {
					const message = getError(error);
					toast.error(message);
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};
	const handleCancel = () => {
		setSelectedProduct('');
		navigate('/coupons');
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
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title">
						<h3 className="mb-0 text-[28px]">Coupon</h3>
						<ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
							<li className="breadcrumb-item text-muted">
								<Link to={'/'} className="text-hover-primary">
									{' '}
									Home
								</Link>
							</li>
							<li className="breadcrumb-item flex items-center">
								<span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
							</li>
							<li className="breadcrumb-item text-muted">
								<Link to={'/coupons'}>Coupon List</Link>
							</li>
						</ul>
					</div>
					<div className="">
						<button onClick={handleCancel} className="tp-btn px-5 py-2">
							Cancel
						</button>
					</div>
				</div>
				<div className="col-span-12 lg:col-span-4">
					<div className="mb-6 bg-white px-8 py-8 rounded-md">
						<div className="mb-6">
							<p className="mb-2 text-base text-black">Upload Image</p>
							<div className="text-center" onClick={handleClick}>
								{!image ? (
									<img
										className="w-[100px] h-auto mx-auto"
										src={selectedProduct?.image?.url || imageIcon}
										alt="coupon"
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
								Image size must be less than 5Mb
							</span>
							<div className="">
								<form action="#">
									<input
										type="file"
										id="productImage"
										ref={hiddenFileInput}
										onChange={handleImageChange}
										className="hidden"
									/>
									<label
										htmlFor="productImage"
										className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
									>
										Upload Image
									</label>
								</form>
							</div>
						</div>
						{/* <!-- input --> */}
						<div className="mb-6">
							<p className="mb-0 text-base text-black">Name</p>
							<input
								className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
								type="text"
								placeholder="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						{/* <!-- input --> */}
						<div className="mb-6">
							<p className="mb-0 text-base text-black">Type</p>
							<div className="category-add-select select-bordered">
								<select
									value={type}
									onChange={(e) => setType(e.target.value)}
									className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
								>
									<option value="">Select type</option>
									<option value="fixed price">Fixed price</option>
									<option value="percent price">Percent price</option>
								</select>
							</div>
						</div>
						{/* <!-- input --> */}
						<div className="mb-6">
							<p className="mb-0 text-base text-black">Code</p>
							<input
								className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
								type="text"
								placeholder="code"
								value={code}
								onChange={(e) => setCode(e.target.value)}
							/>
						</div>
						<div className="mb-6">
							<p className="mb-0 text-base text-black">Amount</p>
							<input
								className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
								type="number"
								required
								placeholder="amount"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
						</div>
						<div className="mb-6">
							<p className="mb-0 text-base text-black">Available</p>
							<input
								className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
								type="number"
								required
								placeholder="available"
								value={available}
								onChange={(e) => setAvailable(e.target.value)}
							/>
						</div>
						{/* <!-- input --> */}
						<div className="mb-6">
							<p className="mb-0 text-base text-black">Products</p>
							<div className="flex">
								{selectedOptions?.map((option) => (
									<span key={option}>{option}</span>
								))}
							</div>
							<MultiSelectDropdown
								options={products}
								selectedOptions={selectedOptions}
								setSelectedOptions={setSelectedOptions}
							/>
						</div>
						{/* <!-- input --> */}
						<div className="mb-6">
							<p className="mb-0 text-base text-black">Description</p>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="input h-[150px] w-full py-3 resize-none"
								placeholder="Description Here"
							></textarea>
						</div>
						<div className="mb-6">
							<p className="mb-0 text-base text-black">Min Amount</p>
							<input
								className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
								type="text"
								placeholder="type"
								required
								value={minAmount}
								onChange={(e) => setMinAmount(e.target.value)}
							/>
						</div>
						<div className="mb-6">
							<p className="mb-0 text-base text-black">Start Time</p>
							<input
								className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
								type="datetime-local"
								placeholder="type"
								required
								value={startTime}
								onChange={(e) => setStartTime(e.target.value)}
							/>
						</div>
						<div className="mb-6">
							<p className="mb-0 text-base text-black">End Time</p>
							<input
								className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
								type="datetime-local"
								placeholder="type"
								value={endTime}
								required
								onChange={(e) => setEndTime(e.target.value)}
							/>
						</div>

						<button onClick={handleUpdateCoupon} className="tp-btn px-7 py-2">
							Add Coupon
						</button>
					</div>
				</div>
			</div>
			{isLoading || loading ? <Loader /> : ''}
		</>
	);
};

export default EditCoupon;
