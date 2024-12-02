import { useState } from 'react';
import axios from 'axios';

const EmergencyReport = () => {
	const [message, setMessage] = useState('');
	const [address, setAddress] = useState('');

	const handleReport = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('/api/report', { message, address });
			console.log('Report sent:', response.data);
		} catch (error) {
			console.error('Error sending report:', error);
		}
	};

	return (
		<form onSubmit={handleReport}>
			<div className="mb-4">
				<label
					className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
					htmlFor="address"
				>
					Address
				</label>
				<input
					className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
					id="address"
					type="text"
					placeholder="no. eieier"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label
					className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
					htmlFor="message"
				>
					Message
				</label>
				<textarea
					id="message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Emergency Message"
					required
				/>
			</div>
			<button
				className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700  dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
				type="submit"
			>
				Send Report
			</button>
		</form>
	);
};

export default EmergencyReport;
