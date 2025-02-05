import Field from '../models/Field.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import fs from 'fs';
import { uploader } from '../utils/cloudinary.js';

export const getFields = async (req, res) => {
	try {
		const fields = await Field.find();
		res.status(201).json(fields);
	} catch (error) {
		res.status(500).json({ message: 'Error creating field', error });
	}
};
export const getField = async (req, res) => {
	const { id } = req.params;
	try {
		const field = await Field.findById({ _id: id }).populate('userId', 'email name phone role');
		if (!field) {
			return res.status(404).json({ message: 'Field not found' });
		}
		const bookings = await Booking.find({fieldId: id}).limit(5);
		res.status(201).json({field, bookings});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error finding field', error });
	}
};
export const createField = async (req, res) => {
	const userId = req.user._id;
	const { name, capacity, pricePerHour, address, description } = req.body;
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'Field image is required' });
		}
		const image = await uploader(req.file.path, 'fields');
		const field = new Field({
			userId,
			name,
			capacity,
			pricePerHour,
			address,
			image,
			description,
		});

		await field.save();
		res.status(201).json(field);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error creating field', error });
	} finally {
		if (req.file) {
			await fs.promises.unlink(req.file.path);
		}
	}
};
export const addSchedule = async (req, res) => {
	const { fieldId } = req.params;
	const { date, timeSlots } = req.body; // timeSlots: [{ startTime, endTime }]
	try {
		const field = await Field.findById(fieldId);
		if (!field) return res.status(404).json({ message: 'Field not found' });

		field.schedule.push({ date, timeSlots });
		await field.save();
		res.status(200).json(field);
	} catch (error) {
		res.status(500).json({ message: 'Error adding schedule', error });
	}
};
export const updatePrice = async (req, res) => {
	const { fieldId } = req.params;
	const { pricePerHour, specialPricing } = req.body;
	// specialPricing can include specific days, time slots, or seasons

	try {
		const field = await Field.findById(fieldId);
		if (!field) return res.status(404).json({ message: 'Field not found' });

		field.pricePerHour = pricePerHour;
		field.specialPricing = specialPricing; // Example: [{ day: 'Saturday', price: 100 }, { timeSlot: '18:00-20:00', price: 120 }]
		await field.save();

		res.status(200).json({ message: 'Prices updated successfully', field });
	} catch (error) {
		res.status(500).json({ message: 'Error updating prices', error });
	}
};

export const bookField = async (req, res) => {
	const { fieldId } = req.params;
	const userId = req.user._id;
	const { endTime, startTime, amount, startDate } = req.body;

	try {
		// Check if the field exists
		const field = await Field.findById(fieldId);
		if (!field) return res.status(404).json({ message: 'Field not found' });

		
		const convertTimeToMinutes = (time) => {
			const [hours, minutes] = time.split(':').map(Number);
			return hours * 60 + (minutes || 0);
		};

		const startMinutes = convertTimeToMinutes(startTime); // "05:00" -> 300 minutes
		const endMinutes = convertTimeToMinutes(endTime); // "07:00" -> 420 minutes

		if (endMinutes <= startMinutes) {
			return res
				.status(400)
				.json({ message: 'End time must be after start time' });
		}

		// Check for overlapping bookings
		const overlappingBooking = await Booking.findOne({
			fieldId,
			startDate,
			$or: [
				{
					startTime: { $lt: endTime },
					endTime: { $gt: startTime },
				},
			],
		});

		if (overlappingBooking) {
			return res
				.status(400)
				.json({ message: 'Field is already booked for the selected time' });
		}

		const totalMinutes = endMinutes - startMinutes;
		const totalHours = Math.ceil(totalMinutes / 60); // Round up if there are extra minutes

		const totalPrice = totalHours * amount; // amount is 5000 per hour

		// Create notifications
		const admin = await User.findOne({ role: 'ADMIN' });

		await Notification.create([
			{
				userid: userId,
				title: 'New Booking',
				message: `You have a new booking for ${totalHours} hour(s).`,
				status: 'unread',
			},
			{
				userid: admin._id,
				title: 'New Booking',
				message: `A field has been booked for ${totalHours} hour(s).`,
				status: 'unread',
			},
		]);

		// Create new booking
		const newBooking = await Booking.create({
			fieldId,
			userId,
			startDate,
			startTime,
			endTime,
			amount: totalPrice,
		});

		res
			.status(200)
			.json({ message: 'Field successfully booked', booking: newBooking });
	} catch (error) {
		console.error('Error booking field:', error);
		res
			.status(500)
			.json({ message: 'Error booking field', error: error.message });
	}
};

export const deleteField = async (req, res) => {
	const { id } = req.params;
	try {
		const field = await Field.findByIdAndDelete({ _id: id });
		res.status(201).json(field);
	} catch (error) {
		res.status(500).json({ message: 'Error finding field', error });
	}
};
