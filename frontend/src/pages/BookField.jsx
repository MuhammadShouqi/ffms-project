import { useContext, useEffect, useState } from 'react';
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
	const [fromDate, setFromDate] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [fromTime, setFromTime] = useState('');
	const [toTime, setToTime] = useState('');
	const [loading, setLoading] = useState(false);
	const [existingBookings, setExistingBookings] = useState([]);
	const [isModal, setIsModal] = useState(false);
	const [amount, setAmount] = useState(0);
	const [cost, setCost] = useState(0);
	const navigate = useNavigate();
	const { id } = useParams();
	const props = { token: user.accessToken || user.token, id };
	const { data, isLoading, error } = useQuery({
		queryKey: ['fields', id],
		queryFn: async () => fetchField(props),
	});

	if (error) {
		console.error(error);
	}
	useEffect(() => {
		if (data) {
			console.log('datyuiopoiuy', data.bookings);
			setAmount(data?.field?.pricePerHour);
			setExistingBookings(data.bookings);
		}
	}, [data]);
	// Generate time slots between 5 AM and 12 PM
	const generateTimeSlots = (start, end) => {
		const slots = [];
		let currentTime = new Date();
		currentTime.setHours(start, 0, 0, 0);
		const endTime = new Date();
		endTime.setHours(end, 0, 0, 0);

		while (currentTime < endTime) {
			const timeString = currentTime.toTimeString().slice(0, 5); // Format: HH:MM
			slots.push(timeString);
			currentTime.setMinutes(currentTime.getMinutes() + 30); // 30-minute intervals
		}
		return slots;
	};

	const timeSlots = generateTimeSlots(5, 24); // 5 AM to 12 PM

	// Handle booking button click
	const apiUrl = import.meta.env.VITE_API_URL;
	const handleCheckBooking = async () => {
		if (!fromDate) {
			return toast.error('Please select a date.');
		}
		if (!fromTime || !toTime) {
			return toast.error('Please select booking start and end times.');
		}
		if (fromTime >= toTime) {
			return toast.error('The end time must be after the start time.');
		}
		const checkExistingBooking = existingBookings.filter((booking) => {
			if (booking.fromDate == fromDate) {
				console.log('booking from date', booking.fromDate )
				console.log('from date', fromDate )
				if (booking.endTime === fromTime || booking.fromTime == toTime) {
					return booking;
				}
			}else{
				return 
			}
		});
		console.log('checkExistingBooking', checkExistingBooking)

		if (checkExistingBooking.length > 0) {
			return toast.error('Time range has already been book.');
		}
		// Calculate the total time in hours and round up above 30 minutes
		const [fromHours, fromMinutes] = fromTime.split(':').map(Number);
		const [toHours, toMinutes] = toTime.split(':').map(Number);
		const totalMinutes =
			toHours * 60 + toMinutes - (fromHours * 60 + fromMinutes);

		if (totalMinutes <= 0) {
			return toast.error('Invalid time range.');
		}

		// Calculate total hours, rounding up if needed
		const totalHours = Math.ceil(totalMinutes / 60);
		const cost = totalHours * data?.field?.pricePerHour;

		setCost(cost);
		setIsModal(true);
	};

	// is it possible to show time in 30 minutes
	// e.g 01:30, 02:00, 02.00
	const handleBooking = async () => {
		try {
			setLoading(true);
			setIsModal(false);
			const { data } = await axios.post(
				`${apiUrl}/fields/${id}/book`,
				{ startDate: fromDate, startTime: fromTime, endTime: toTime, amount },
				{
					headers: {
						Authorization: `Bearer ${user?.token || user?.accessToken}`,
					},
				}
			);
			if (data) {
				setAmount(data?.totalPrice);
				toast.success('Field booked successfully');
			}
			setLoading(false);
			setIsModal(false);
		} catch (error) {
			setLoading(false);
			console.error('Error booking field:', error);
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
			window.MonnifySDK.initialize({
				amount,
				currency: 'NGN',
				customerFullName: user.user.name,
				customerEmail: user.user.email,
				customerMobileNumber: user.user.phone,
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
					handleBooking(response);
				},
				onClose: (data) => {
					console.log(data);
				},
			});
		};

	const generateTimeOptions = () => {
		const times = [];
		for (let hour = 0; hour < 24; hour++) {
			for (let minutes = 0; minutes < 60; minutes += 30) {
				const formattedTime = `${String(hour).padStart(2, '0')}:${String(
					minutes
				).padStart(2, '0')}`;
				times.push(formattedTime);
			}
		}
		return times;
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
								&#8358;{data?.field?.pricePerHour}
							</span>{' '}
							per Hour
						</div>
						<div className="md:border rounded-md mt-2 text-sm md:text-lg">
							<div className="md:flex">
								<div className="py-3 md:px-4">
									<label htmlFor="fromDate">Date</label>
									<input
										id="fromDate"
										name="fromDate"
										type="date"
										className="w-full py-3 md:px-4 mt-2 border border-[#e0e0e0]"
										min={new Date().toISOString().slice(0, 10)}
										value={fromDate}
										onChange={(e) => setFromDate(e.target.value)}
									/>
								</div>
							</div>
							<div className="md:flex ">
								<div className="py-3 md:px-4 ">
									<label htmlFor="fromTime">From Time</label>
									<select
										id="fromTime"
										name="fromTime"
										className="w-full py-3 md:px-4 mt-2 border border-[#e0e0e0]"
										value={fromTime}
										onChange={(e) => setFromTime(e.target.value)}
									>
										<option value="">Select Time</option>
										{timeSlots.map((slot) => (
											<option key={slot} value={slot}>
												{slot}
											</option>
										))}
									</select>
								</div>
								<div className="py-3 md:px-4 ">
									<label htmlFor="toTime">To Time</label>
									<select
										id="toTime"
										name="toTime"
										className="w-full py-3 md:px-4 mt-2 border border-[#e0e0e0]"
										value={toTime}
										onChange={(e) => setToTime(e.target.value)}
									>
										<option value="">Select Time</option>
										{timeSlots.map((slot) => (
											<option key={slot} value={slot}>
												{slot}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<div className="mt-4 w-full flex justify-center">
							<button
								className="w-full max-w-[300px] mx-auto px-4 py-4 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
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
					amount={cost}
					setShow={setIsModal}
					show={isModal}
					handleBooking={payWithMonnify}
				/>
			)}
		</>
	);
};

export default BookField;
