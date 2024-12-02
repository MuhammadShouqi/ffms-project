import About from '../components/About';
// import Header from '../components/Header';
import Nav from '../components/Nav';
import Listing from '../components/Listings';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import { useQuery } from '@tanstack/react-query';
import { fetchFields } from '../hooks/axiosApis';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import AuthContext from '../context/authContext';
import Main from '../components/Main';

export default function IndexPage() {
	const { user } = useContext(AuthContext);
	const [fields, setFields] = useState([])
	const navigate = useNavigate();
	const { data, isLoading, error } = useQuery({
		queryKey: ['dashboard'],
		queryFn: async () => fetchFields(),
	});
	useEffect(() => {
		if (user) {
			navigate('/dashboard');
		}
	}, [user, navigate]);
	useEffect(() => {
		if (data) {
			
			setFields(data);
		}
	}, [data]);
	return (
		<>
			<Nav /> 
			<Main /> 
			<About />
			{/* <Rooms /> */}
			<Testimonials />
			<Listing listings={fields} />
			<Footer />
		</>
	);
}
