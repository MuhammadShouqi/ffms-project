import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: 'Gmail', // or any other email service
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

const sendEmail = async (email, message) => {
	const mailOptions = {
		from: 'your-email@gmail.com',
		to: email, // Send to user's email
		subject: 'Booking Reminder',
		text: message,
	};

	await transporter.sendMail(mailOptions);
};

export default sendEmail;
