import { Link } from 'react-router-dom';
// import LogoIcon from '../assets/icons/LogoIcon';
const Footer = () => {
	return (
		<footer id="contact" className="text-white bg-green-700 p-5">
			<div className="flex flex-col items-start md:flex-row gap-2 justify-between">
				<div className="flex flex-col md:items-end md:flex-row gap-2">
					<Link to="/" className="flex items-center gap-2">
						{/* <LogoIcon></LogoIcon> */}
						<span className="font-bold text-xl text-primary">FFMS</span>
					</Link>
				</div>
			</div>

			<hr />

			<div className="flex md:flex-row flex-col gap-3 items-center justify-around mt-[20px]">
				<p className="flex flex-row items-center gap-1 text-slate-50 text-[12] md:text-[18px]">
					Website built by{' '}
					<a
						className="uppercase font-bold "
						href="https://devabdulsalam.vercel.com"
					>
						MUHAMMAD SHOUQI
					</a>{' '}
				</p>
				<p className="md:text-[20px] text-[15px] text-slate-50">
					&copy; FFMS 2024
				</p>
			</div>
		</footer>
	);
};

export default Footer;
