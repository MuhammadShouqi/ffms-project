import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import User from './../assets/userImage.png';
const Testimonials = () => {
	useEffect(() => {
		Aos.init({ duration: 2000 });
	}, []);
	return (
		<section className="">
			<div className="text-center w-full">
				<h2 className="text-xl my-2 font-bold text-primary">Testimonials</h2>
				<h3 className="text-lg">What Our Guests Say</h3>
			</div>
			<div className="py-[50px] left-0 right-0 p-2 rounded bg-transparent  flex flex-row justify-center px-[20px] ">
				<div className="flex flex-col md:flex-row gap-[30px] justify-center">
					<div
						data-aos="zoom-in-up"
						className="max-w-[350px] bg-white shadow-2xl flex flex-col justify-center items-center gap-2 rounded-lg text-center p-5 "
					>
						<div>
							<img src={User} alt="Tanko" className="h-10 w-10" />
						</div>
						<h2 className="font-bold">James</h2>
						<p>
							We had an amazing stay at Ilouge. The staff was courteous, and the
							rooms were comfortable. We&apos;ll definitely be coming back!
						</p>
					</div>
					<div
						data-aos="zoom-in-up"
						className="max-w-[350px] bg-white shadow-2xl flex flex-col justify-center items-center gap-2 rounded-lg text-center p-5 "
					>
						<div>
							<img src={User} alt="Tanko" className="h-10 w-10" />
						</div>
						<h2 className="font-bold">Monady</h2>
						<p>
							The view from our room was breathtaking. The attention to detail
							and hospitality of the staff made our stay unforgettable.
						</p>
					</div>
					<div
						data-aos="zoom-in-up"
						className="max-w-[350px] bg-white shadow-2xl flex flex-col justify-center items-center gap-2 rounded-lg text-center p-5 "
					>
						<div>
							<img src={User} alt="Tanko" className="h-10 w-10" />
						</div>
						<h2 className="font-bold">Tanko</h2>
						<p>
							The view from our room was breathtaking. The attention to detail
							and hospitality of the staff made our stay unforgettable.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
