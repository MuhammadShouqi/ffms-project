import { useContext, useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { fetchField } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import getError from './../hooks/getError';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
// import  from 'moment';
import { useNavigate } from 'react-router-dom';

const BusInfo = () => {
	const { user } = useContext(AuthContext);
	const [selectedSeat, setSelectedSeat] = useState(1);
	const [seat, setSeat] = useState(0);
	const [price, setPrice] = useState(0);
	const [to, setTo] = useState('');
	const [from, setFrom] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [isError, setIsError] = useState('');
	const [paymentModal, setPaymentModal] = useState(false);
	const [loading, setLoading] = useState(false);
	// const [busName, setBusName] = useState('');
	const [bus, setBus] = useState('');
	const [bookingData, setBookingData] = useState({});

	// Assuming props require user token and bus ID for fetching buses.
	const props = { token: user.accessToken || user.token };
	const { data, isLoading, error } = useQuery({
		queryKey: ['buses'],
		queryFn: async () => fetchField(props),
	});

	const tripData = {
		from: ['Kano', 'University'],
		to: ['Kano', 'University'],
	};
	const tripTime = [
		{ time: '07:30 am', name: '70:30 am' },
		{ time: '08:30 am', name: '08:30 am' },
		{ time: '09:30 am', name: '09:30 am' },
		{ time: '11:30 am', name: '11:30 am' },
		{ time: '12:30 pm', name: '12:30 pm' },
		{ time: '04:30 pm', name: '04:30 pm' },
		{ time: '05:30 pm', name: '05:30 pm' },
		{ time: '06:30 pm', name: '06:30 pm' },
	];

	const navigate = useNavigate();
	if (error) {
		console.log(error);
	}

	// Handle change of selected seat
	const handleChange = (text) => {
		setSelectedSeat(parseInt(text));
	};

	// Handling the booking button click
	const handleClick = () => {
		if (!date) {
			return setIsError('Invalid input. Please enter a date.');
		}
		if (!time) {
			return setIsError('Invalid input. Please enter a time.');
		}
		if (!from || !to || from == to) {
			return setIsError('Select from and to');
		}
		if (isNaN(parseInt(selectedSeat))) {
			return setIsError('Invalid input. Please enter a number.');
		} else if (seat && Number(selectedSeat) > Number(seat)) {
			return setIsError('Selected seat number exceeds available seats.');
		} else if (Number(selectedSeat) == 0) {
			return setIsError('Select more than one seat');
		} else if (Number(selectedSeat) > 5) {
			return setIsError('You cant book more than 5 seat');
		} else {
			setIsError('');
			setBookingData({
				from,
				to,
				tripTime: time,
				price,
				date,
				seat: selectedSeat,
				busId: bus?._id,
			});
			setPaymentModal(true);
		}
	};

	// Handle 'From' location change
	const handleFromChange = (value) => {
		setFrom(value);
		// Prevent selecting the same 'From' and 'To' locations
		if (to === value) {
			setTo('');
		}
	};
	const handleTimeChange = (timeString) => {
		// Get today's date in YYYY-MM-DD format
		const today = new Date();
		const selectedDate = today.toISOString().split('T')[0]; // Get only the date part (YYYY-MM-DD)

		// Parse the timeString and split it into hours and minutes
		const [time, modifier] = timeString.split(' '); // Example: '07:30 am' -> ['07:30', 'am']
		let [hours, minutes] = time.split(':');

		// Convert 12-hour time to 24-hour time
		if (modifier === 'pm' && hours !== '12') {
			hours = parseInt(hours, 10) + 12;
		} else if (modifier === 'am' && hours === '12') {
			hours = '00'; // Handle midnight case
		}

		// Construct the final date-time string
		const finalDateTime = `${selectedDate}T${hours}:${minutes}:00`; // ISO format (YYYY-MM-DDTHH:mm:ss)

		// Create a Date object from the final string
		const dateObject = new Date(finalDateTime);

		// Now set the time (or handle it however you need)
		console.log('Parsed date and time:', dateObject);
		setTime(dateObject); // Assuming setTime is your state setter for the date
	};

	const handleChangeBus = (id) => {
		const bus = data.filter((item) => item._id === id);
		if (bus) {
			setBus(bus[0]);
			// setBusName(() => bus[0].name);
			setPrice(() => bus[0].price);
			setSeat(() => bus[0].seatCapacity);
		} else {
			console.log('Bus not found');
		}
	};
	const apiUrl = import.meta.env.VITE_API_URL;
	const handleBookTrip = async () => {
		try {
			setLoading(true);
			setPaymentModal(false);
			const { data } = await axios.post(`${apiUrl}/bookings`, bookingData, {
				headers: {
					Authorization: `Bearer ${user?.token || user?.accessToken}`,
				},
			});
			if (data) {
				console.log(data);
				toast.success('Trip booked successfully');
				navigate(`/bookings`);
			}
			setLoading(false);
		} catch (error) {
			// const message = error?.data || 'Something went wrong!';
			setLoading(false);
			setPaymentModal(true);
			console.log('Error booking trip', error);
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
	return (
		<>
			{isLoading || loading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7">
						<h3 className="mb-0 text-4xl">Book Trip</h3>
					</div>

					<div className="bg-white shadow rounded-lg my-2 px-6 py-5">
						<div className="flex flex-col items-center justify-center p-12">
							<div className="mx-auto w-full max-w-[550px] bg-white ">
								<div className="-mx-3 flex flex-wrap">
									{/* From Location Selection */}
									<div className="w-full px-3 sm:w-1/2">
										<div className="mb-5">
											<label
												htmlFor="from"
												className="mb-3 block text-base font-medium text-[#07074D]"
											>
												From
											</label>
											<select
												name="from"
												id="from"
												value={from}
												onChange={(e) => handleFromChange(e.target.value)}
												className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
											>
												<option>Select from</option>
												{tripData.from.map((location, index) => (
													<option key={index}>{location}</option>
												))}
											</select>
										</div>
									</div>

									{/* To Location Selection */}
									<div className="w-full px-3 sm:w-1/2">
										<div className="mb-5">
											<label
												htmlFor="to"
												className="mb-3 block text-base font-medium text-[#07074D]"
											>
												To
											</label>
											<select
												name="to"
												id="to"
												value={to}
												onChange={(e) => setTo(e.target.value)}
												className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
											>
												<option>Select Destination</option>
												{tripData.to
													.filter((location) => location !== from)
													.map((location, index) => (
														<option key={index} value={location}>
															{location}
														</option>
													))}
											</select>
										</div>
									</div>
								</div>

								{/* Date and Time Inputs */}
								<div className="-mx-3 flex flex-wrap">
									<div className="w-full px-3 sm:w-1/2">
										<div className="mb-5">
											<label
												htmlFor="date"
												className="mb-3 block text-base font-medium text-[#07074D]"
											>
												Date
											</label>
											<input
												type="date"
												name="date"
												id="date"
												value={date}
												onChange={(e) => setDate(e.target.value)}
												className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
											/>
										</div>
									</div>
									<div className="w-full px-3 sm:w-1/2">
										<div className="mb-5">
											<label
												htmlFor="time"
												className="mb-3 block text-base font-medium text-[#07074D]"
											>
												Time
											</label>
											<select
												name="time"
												id="time"
												// value={time}
												onChange={(e) => handleTimeChange(e.target.value)}
												className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
											>
												<option>Select Time</option>
												{tripTime.map((timeObj, index) => (
													<option key={index} value={timeObj.time}>
														{timeObj.name}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>

								{/* Seat Selection */}
								<div className="-mx-3 flex flex-wrap">
									<div className="w-full px-3 sm:w-1/2">
										<div className="mb-5">
											<label
												htmlFor="bus"
												className="mb-3 block text-base font-medium text-[#07074D]"
											>
												Select Bus
											</label>
											<select
												name="bus"
												id="bus"
												// value={busName}
												onChange={(e) => handleChangeBus(e.target.value)}
												className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
											>
												<option>Select Bus</option>
												{data.map((item, index) => (
													<option key={index} value={item._id}>
														{item.name}
													</option>
												))}
											</select>
										</div>
									</div>
									<div className="w-full px-3 sm:w-1/2">
										<div className="mb-5">
											<label
												htmlFor="phone"
												className="mb-3 block text-base font-medium text-[#07074D]"
											>
												Availabel seats
											</label>
											<input
												type="number"
												name="phone"
												readOnly
												disabled
												value={seat}
												onChange={(e) => handleChange(e.target.value)}
												placeholder="Enter number of seat"
												className="w-full rounded-md border border-[#e0e0e0] bg-gray py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
											/>
										</div>
									</div>
								</div>
								{/* Seat Selection */}
								<div className="-mx-3 flex flex-wrap items-center justify-center">
									<div className="w-full px-3 sm:w-1/2">
										<div className="mb-5">
											<label
												htmlFor="phone"
												className="mb-3 block text-base font-medium text-[#07074D]"
											>
												No of seat(s) to book
											</label>
											<input
												type="number"
												name="phone"
												id="phone"
												value={selectedSeat}
												onChange={(e) => handleChange(e.target.value)}
												placeholder="Enter number of seat"
												className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
											/>
										</div>
									</div>
								</div>

								{isError && (
									<p className="text-red-500 font-bolf text-center">
										{isError}
									</p>
								)}
							</div>
							<div className="w-full my-10 max-w-[550px]">
								{data?.seat === '0' ? (
									<p>No seat available</p>
								) : (
									<button
										className="w-full  px-4 py-4 font-bold text-white bg-blue-500 rounded-2xl hover:bg-blue-700 focus:outline-none focus:shadow-outline"
										onClick={handleClick}
									>
										Book now
									</button>
								)}
							</div>
						</div>
					</div>
				</main>
			)}
			
		</>
	);
};

export default BusInfo;
