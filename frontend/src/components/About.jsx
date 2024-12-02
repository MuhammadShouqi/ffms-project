import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const Section = () => {
	useEffect(() => {
		Aos.init({ duration: 2000 });
	}, []);
	return (
		<section id="about" className="py-4">
			<div className="text-center">
				<h2 className="uppercase p-1 text-primary text-center font-bold text-xl">
					About Us
				</h2>
				<div className="flex justify-center w-full md:max-w-xl mx-auto text-center leading-6">
					<p>
						At Ilouge, we take immense pride in curating a stay that redefines
						luxury. We&apos;re dedicated to ensuring that when you leave our
						premises, your perception of opulence will have been forever
						elevated.
					</p>
				</div>
			</div>
			<div className=" py-[50px] left-0 right-0 p-2 rounded bg-transparent  flex flex-row justify-center px-[20px] ">
				<div className="flex flex-col md:flex-row gap-[30px] justify-center">
					<div
						data-aos="zoom-in-up"
						className="max-w-[350px] bg-white shadow-2xl flex flex-col justify-center items-center gap-2 rounded-lg text-center  p-5 "
					>
						<div className="max-w-[150px]">
							{/* <img src={sellImg} alt="" /> */}
							<p>Reserve</p>
						</div>
						<h2 className="capitalize text-xl md:text-2xl ">Book a Field</h2>
						<p className="font-fonty text-[15px] md:text-[17px] ">
							We have created seamless online experience. You can find all kinds
							of fields that is available for renting at the affordable price.
						</p>
					</div>
					<div
						data-aos="zoom-in-up"
						className="max-w-[350px] bg-white  shadow-2xl flex flex-col justify-center items-center gap-2 rounded-lg text-center  p-5 "
					>
						<div className="max-w-[150px]">
							{/* <img src={rentImg} alt="" /> */}
							<p>Rent</p>
						</div>
						<h2 className="capitalize text-xl md:text-2xl ">
							Rent a field
						</h2>
						<p className="font-fonty text-[15px] md:text-[17px] ">
							Find your dream home with an amazing photo experience and the most
							listings and this include things that you won&apos;t find
							anywhere.
						</p>
					</div>
					<div
						data-aos="zoom-in-up"
						className="max-w-[350px]  bg-white shadow-2xl flex flex-col justify-center items-center gap-2 rounded-lg text-center  p-5 "
					>
						<div className="max-w-[150px]">
							{/* <img src={buyImg} alt="" /> */}
							<p>Listing</p>
						</div>
						<h2 className="capitalize text-xl md:text-2xl ">List your feild</h2>
						<p className="font-fonty text-[15px] md:text-[17px] ">
							We have made listing your house easy for those that wish to. With
							one click, our agent verify your house and you start making money
							from it.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Section;
