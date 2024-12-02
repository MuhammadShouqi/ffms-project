import { useContext, useState, useEffect } from 'react';
import Loader from '../components/Loader';
import ConfirmBooking from '../components/ConfirmBooking';
import { fetchField } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import getError from './../hooks/getError';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const BookField = () => {
	const { user } = useContext(AuthContext);
	const [fromDate, setFromDate] = useState(new Date());
	const [toDate, setToDate] = useState(new Date());
	const [loading, setLoading] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const [customerFullName, setCustomerFullName] = useState('John Doe');
	const [customerEmail, setCustomerEmail] = useState('johndoe@example.com');
	const [customerMobileNumber, setCustomerMobileNumber] =
		useState('08012345678');
	const [amount, setAmount] = useState(5000);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			console.log(user.user);
			setCustomerEmail(user?.user?.email);
			setCustomerFullName(user?.user?.name);
			setCustomerMobileNumber(user?.user?.phone);
		}
	}, [user]);
	const { id } = useParams();
	const props = { token: user.accessToken || user.token, id };
	const { data, isLoading, error } = useQuery({
		queryKey: ['fields', id],
		queryFn: async () => fetchField(props),
	});

	if (error) {
		console.log(error);
	}

	// Handling the booking button click
	const apiUrl = import.meta.env.VITE_API_URL;
	const handleCheckBooking = async () => {
		try {
			if (!fromDate || !toDate) {
				return toast.error('Please select both start and end dates.');
			}

			const today = new Date();
			const fromDateObj = new Date(fromDate);
			const toDateObj = new Date(toDate);

			// Ensure fromDate is in the future
			if (fromDateObj < today) {
				return toast.error('Please select a start date in the future.');
			}
			// Ensure toDate is after fromDate
			if (toDateObj <= fromDateObj) {
				return toast.error('The end date must be after the start date.');
			}
			setLoading(true);
			const { data } = await axios.post(
				`${apiUrl}/fields/${id}/check-booking`,
				{ status: 'COMPLETED', startDate: fromDate, endDate: toDate },
				{
					headers: {
						Authorization: `Bearer ${user?.token || user?.accessToken}`,
					},
				}
			);
			if (data) {
				console.log('data', data?.totalPrice);
				setAmount(data?.totalPrice);
				setIsModal(true);
			}
			setLoading(false);
		} catch (error) {
			// const message = error?.data || 'Something went wrong!';
			setLoading(false);
			console.log('Error booking Field', error);
			const message = getError(error);
			return Swal.fire({
				title: 'Error!',
				icon: 'error',
				text: message,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
			});
		}
	};
	const handlePayment = async (response) => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${apiUrl}/fields/${id}/book`,
				{ status: 'COMPLETED', startDate: fromDate, endDate: toDate },
				{
					headers: {
						Authorization: `Bearer ${user?.token || user?.accessToken}`,
					},
				}
			);
			if (data) {
				console.log(data);
				toast.success('Field booked successfully');
				navigate(`/bookings`);
			}
			setLoading(false);
		} catch (error) {
			// const message = error?.data || 'Something went wrong!';
			setLoading(false);
			console.log('Error booking Field', error);
			const message = getError(error);
			return Swal.fire({
				title: 'Error!',
				icon: 'error',
				text: message,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
			});
		}
	};
	const payWithMonnify = async () => {
		setIsModal(false);
		window.MonnifySDK.initialize({
			amount,
			currency: 'NGN',
			customerFullName,
			customerEmail,
			customerMobileNumber,
			apiKey: import.meta.env.VITE_MONNIFY_API_KEY,
			contractCode: import.meta.env.VITE_MONNIFY_CONTRACT_CODE,
			reference: 'TRANS_' + new Date().getTime(),
			paymentDescription: 'Payment for services',
			metadata: {
				name: 'John',
				age: 30,
			},
			onLoadStart: () => {
				console.log('loading has started');
			},
			onLoadComplete: () => {
				console.log('SDK is UP');
			},
			onComplete: (response) => {
				console.log('response ....', response);
				handlePayment(response);
			},
			onClose: (data) => {
				console.log(data);
			},
		});
	};
	return (
		<>
			{isLoading || loading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7">
						<h3 className="mb-0 text-4xl">Book Field</h3>
					</div>
					<div className="bg-white border my-2 px-6 py-5 mt-10 rounded-md shadow-lg w-full md:max-w-2xl">
						<div>
							<span className="font-semibold text-lg">
								&#8358;{data.pricePerHour}
							</span>{' '}
							per Hour
						</div>
						<div className="md:border rounded-md mt-2 text-xs md:text-sm">
							<div className="md:flex">
								<div className="py-3 md:px-4">
									<label htmlFor="from">From</label>
									<input
										id="from"
										name="from"
										type="datetime-local"
										className="w-full"
										value={fromDate}
										onChange={(e) => setFromDate(e.target.value)}
									/>
								</div>
								<div className="py-3 md:px-4 md:border-l">
									<label htmlFor="to">To</label>
									<input
										type="datetime-local"
										id="to"
										name="to"
										className="w-full"
										value={toDate}
										onChange={(e) => setToDate(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="mt-4 w-full flex justify-center">
							<button
								className="w-full max-w-[300px] mx-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
								onClick={handleCheckBooking}
							>
								Reserve Field
							</button>
						</div>
					</div>
				</main>
			)}
			{isModal && (
				<ConfirmBooking
					amount={amount}
					setShow={setIsModal}
					show={isModal}
					handleBooking={payWithMonnify}
				/>
			)}
		</>
	);
};

export default BookField;
