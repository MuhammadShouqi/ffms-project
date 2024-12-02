import Booking from '../models/Booking.js';
import Field from '../models/Field.js';
import asyncHandler from 'express-async-handler';

export const createBooking = async (req, res) => {
	const { fromDate, toDate, status } = req.body;

	try {
		const userId = req.user._id;
		const trip = await Trip.findById(tripId).populate('bus');
		if (!trip) {
			return res.status(404).json({ message: 'Trip not found' });
		}

		const bus = trip.bus;
		if (bus.seatsFilled >= bus.seatCapacity) {
			return res
				.status(400)
				.json({ message: 'Bus is fully booked, no more available seat.' });
		}
		const availableSeats = bus.seatCapacity - bus.seatsFilled;

		if (availableSeats < seat) {
			return res.status(400).json({
				message: `Only ${availableSeats} seat(s) available, but ${seat} seat(s) requested.`,
			});
		}
		const totalPrice = Number(trip.price) * Number(seat);
		const booking = new Booking({
			userId,
			tripId: trip._id,
			seat,
			price: totalPrice,
		});
		await booking.save();

		bus.seatsFilled += 1;
		await bus.save();

		res.status(201).json({ message: 'Booking successful', booking });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const getBookings = async (req, res) => {
	try {
		const userId = req.user._id;
		let result;
		if (req.user.role === 'ADMIN') {
			result = await Booking.find().populate('fieldId userId');
		} else {
			result = await Booking.find({ userId }).populate('fieldId');
		}
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const getBooking = async (req, res) => {
	try {
		const { id } = req.params;
		const booking = await Booking.findById(id).populate('fieldId userId');
		if (!booking) {
			return res.status(404).json({ message: 'Booking not found' });
		}
		res.status(201).json(booking);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const updateBookingStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const result = await Booking.findByIdAndUpdte(
			id,
			{ status },
			{ new: true }
		).populate('userId');
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
