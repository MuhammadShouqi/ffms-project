import cron from 'node-cron';
import Booking from './models/Booking';
import User from './models/User';
import moment from 'moment'; // For date and time manipulation
import sendEmail from './utils/sendEmail'; // Placeholder function for sending email reminders

// Cron job to run every minute
cron.schedule('* * * * *', async () => {
	try {
		const now = new Date();
		const oneHourLater = moment(now).add(1, 'hour').toDate();

		// Find bookings starting in exactly 1 hour and where reminder hasn't been sent
		const bookings = await Booking.find({
			date: {
				$gte: now,
				$lte: oneHourLater,
			},
			reminderSent: false,
		});

		bookings.forEach(async (booking) => {
			const user = await User.findById({ _id: booking.userId });
			// Send email or SMS reminder here
			await sendEmail(
				user.email,
				`Reminder: Your booking for Field ${booking.fieldId} starts in 1 hour`
			);

			// Update reminderSent to true after sending reminder
			booking.reminderSent = true;
			await booking.save();
		});
	} catch (error) {
		console.error('Error sending reminders:', error);
	}
});
