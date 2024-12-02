import bgImage from '../assets/img1.jpg';

const Main = () => {
	return (
		<main>
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				{/* <!-- Replace with your content --> */}
				<div className="px-4 py-6 sm:px-0 h-96">
					<img
						src={bgImage}
						alt=""
						className="w-full h-full border-4 border-dashed border-gray-200 rounded-lg"
					/>
				</div>
			</div>
		</main>
	);
};

export default Main;
