import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/authContext';
// import {
// 	useMonnifyPayment,
// 	MonnifyButton,
// 	MonnifyConsumer,
// } from 'react-monnify';
import Loader from '../components/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const App = () => {
	// Define the necessary states
	const { user } = useContext(AuthContext);
	const [customerFullName, setCustomerFullName] = useState('John Doe');
	const [customerEmail, setCustomerEmail] = useState('johndoe@example.com');
	const [customerMobileNumber, setCustomerMobileNumber] =
		useState('08012345678');
	const [amount, setAmount] = useState(5000); // Example amount
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			console.log(user.user);
			setCustomerEmail(user?.user?.email);
			setCustomerFullName(user?.user?.name);
			setCustomerMobileNumber(user?.user?.phone);
		}
	}, [user]);

	const apiUrl = import.meta.env.VITE_API_URL;
	const handlePayment = async (response) => {
		setLoading(true);
		await axios
			.post(
				`${apiUrl}/payments/update-payment`,
				{
					userId: user?.user?._id,
					amount,
					...response,
				},
				{
					headers: {
						Authorization: `Bearer ${
							user?.user?.accessToken || user?.user?.token
						}`,
					},
				}
			)
			.then((data) => {
				console.log('Payment status updated:', data);
				alert('Payment Successful!');
				navigate('/');
			})
			.catch((error) => {
				console.error('Error updating payment status:', error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const payWithMonnify = async () => {
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
			<main className="body-content px-8 py-8 bg-slate-100">
				<div className="page-title mb-7">
					<h3 className="mb-0 text-4xl">Fund wallet</h3>
				</div>
				<main className="bg-white shadow rounded-lg my-2 px-6 py-5">
					<div className="mx-auto w-full max-w-[550px] bg-white">
						<div className="mb-4">
							<label
								htmlFor="amount"
								className="mb-3 block text-base font-medium text-[#07074D]"
							>
								Amount
							</label>
							<input
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
								id="amount"
								type="number"
								placeholder="Enter Amount"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
						</div>
						<button
							onClick={payWithMonnify}
							className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
						>
							Pay Now
						</button>
					</div>
				</main>
			</main>
			{loading && <Loader />}
		</>
	);
};

export default App;
