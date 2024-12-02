/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
const Listing = ({ listings }) => {
	console.log('listings', listings?.length);
	return (
		<section id="fields" className="px-4 py-4">
			<div className="flex justify-center mb-4">
				<h1 className="uppercase p-1 text-primary text-center font-bold text-2xl ">
					List Your Field with Us
				</h1>
			</div>
			<div className="flex justify-center w-full md:max-w-xl mx-auto text-center">
				<p>
					List you property and get benefits such as reaching a wider audience,
					easy booking management, and potential for higher income.
				</p>
			</div>
			<div className="mx-auto grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 px-[20]">
				{listings.length > 0 &&
					listings
						?.filter((_, index) => index < 8)
						?.map((listing, index) => (
							<Link
								to={'/fields/' + listing._id}
								key={index}
								className="bg-white border rounded-xl"
							>
								<div className="flex">
									<img
										className="rounded-l object-cover aspect-square"
										src={listing?.image?.url}
										alt=""
									/>
								</div>
								<div className="p-3">
									<h3 className="font-bold text-sm capitalize">
										{listing.type} in {listing.city}
									</h3>
									<h2 className="text-sm truncate text-gray-500">
										{listing.name}
									</h2>
									<h2 className="text-sm truncate text-gray-500">
										{index + 1}
									</h2>
									<div className="mt-1">
										<span className="font-bold">
											&#8358;{listing.pricePerHour}
										</span>{' '}
										per hour
									</div>
								</div>
							</Link>
						))}
			</div>
			<div className="flex justify-center">
				<Link
					to="register"
					className="mt-5 tracking-wide max-w-[300px] font-semibold bg-green-900 text-white w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
				>
					Get Started
				</Link>
			</div>
		</section>
	);
};

export default Listing;
