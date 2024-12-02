import express from 'express';
import Staff from '../models/Staff.js'; // Assuming Staff model exists
import Booking from '../models/Booking.js'; // Assuming Booking model exists
import Field from '../models/Field.js';

const router = express.Router();

// Admin dashboard - Monitor bookings and revenue
router.get('/admin/dashboard', async (req, res) => {
	try {
		const totalBookings = await Booking.countDocuments();
		const totalRevenue = await Booking.aggregate([
			{ $group: { _id: null, total: { $sum: '$amount' } } },
		]);

		res.status(200).json({
			totalBookings,
			totalRevenue: totalRevenue[0]?.total || 0,
		});
	} catch (error) {
		res.status(500).json({ message: 'Error fetching dashboard data', error });
	}
});


// Add staff member
router.post('/staff', async (req, res) => {
	const { name, role, contact } = req.body;
	try {
		const staff = new Staff({ name, role, contact });
		await staff.save();
		res.status(201).json(staff);
	} catch (error) {
		res.status(500).json({ message: 'Error adding staff member', error });
	}
});

// Edit staff member
router.put('/staff/:staffId', async (req, res) => {
	const { staffId } = req.params;
	const { name, role, contact } = req.body;
	try {
		const staff = await Staff.findByIdAndUpdate(
			staffId,
			{ name, role, contact },
			{ new: true }
		);
		if (!staff)
			return res.status(404).json({ message: 'Staff member not found' });
		res.status(200).json(staff);
	} catch (error) {
		res.status(500).json({ message: 'Error updating staff member', error });
	}
});

// Delete staff member
router.delete('/staff/:staffId', async (req, res) => {
	const { staffId } = req.params;
	try {
		const staff = await Staff.findByIdAndDelete(staffId);
		if (!staff)
			return res.status(404).json({ message: 'Staff member not found' });
		res.status(200).json({ message: 'Staff member deleted' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting staff member', error });
	}
});


export default router;
