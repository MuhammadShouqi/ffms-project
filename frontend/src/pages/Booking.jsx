import { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
    const [userType, setUserType] = useState('student');
		const [regId, setRegId] = useState('');

		const handleBooking = async (e) => {
			e.preventDefault();
			try {
				const response = await axios.post('/api/book', { userType, regId });
				console.log('Booking successful:', response.data);
			} catch (error) {
				console.error('Error booking:', error);
			}
		};
	return (
		<div className="flex items-center justify-center p-12">
			<div className="mx-auto w-full max-w-[550px] bg-white">
				<form onSubmit={handleBooking}>
					<div className="mb-5">
						<label
							htmlFor="name"
							className="mb-3 block text-base font-medium text-[#07074D]"
						>
							Select Rank
						</label>
						<select
							id="name"
							value={userType}
							onChange={(e) => setUserType(e.target.value)}
							className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
						>
							<option value="student">Student</option>
							<option value="staff">Staff</option>
						</select>
					</div>
					<div className="mb-5">
						<label
							htmlFor="phone"
							className="mb-3 block text-base font-medium text-[#07074D]"
						>
							Phone Number
						</label>
						<input
							type="text"
							name="phone"
							id="phone"
							placeholder="Enter your phone number"
							className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
						/>
					</div>
					<div className="mb-5">
						<label
							htmlFor="regId"
							className="mb-3 block text-base font-medium text-[#07074D]"
						>
							Reg Id
						</label>
						<input
							type="text"
							name="regId"
							id="regId"
							value={regId}
							onChange={(e) => setRegId(e.target.value)}
							placeholder={
								userType === 'student' ? 'Registration Number' : 'Staff ID'
							}
							required
							className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
						/>
					</div>
					<div>
						<button
							type="submit"
							className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
						>
							Book Bus
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BookingForm;
