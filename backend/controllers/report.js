import Report from '../models/Report.js';
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
// 	service: 'Gmail',
// 	auth: {
// 		user: process.env.EMAIL_USER,
// 		pass: process.env.EMAIL_PASS,
// 	},
// });

export const getReports = async (req, res) => {
	try {
		const userId = req.user._id;
		let reportResult;
		if (req.user.role === 'ADMIN') {
			reportResult = await Report.find();
		} else {
			reportResult = await Report.find({ userId });
		}
		res.status(200).json(reportResult);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const getReport = async (req, res) => {
	try {
		const { id } = req.params;
		const reportResult = await Report.findById(id).populate({
			path: 'userId',
			select: 'email name phone rank',
		});

		if (!reportResult) {
			return res.status(404).json({ message: 'Report not found' });
		}
		res.status(201).json(reportResult);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const createReport = async (req, res) => {
	const { message, address } = req.body;
	const userId = req.user._id;
	try {
		const report = new Report({ message, userId, address });
		await report.save();

		// const mailOptions = {
		// 	from: process.env.EMAIL_USER,
		// 	to: process.env.SCHOOL_MANAGEMENT_EMAIL,
		// 	subject: 'Emergency Report',
		// 	text: `User ID: ${userId}\nMessage: ${message}`,
		// };

		// transporter.sendMail(mailOptions, (error, info) => {
		// 	if (error) return res.status(400).json({ error: error.message });
		res.status(201).json({ message: 'Report sent successfully', report });
		// });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const updateReport = async (req, res) => {
	const { status, id } = req.body;

	try {
		const result = await Report.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		).populate('userId');
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
