import express from 'express';
import Staff from '../models/Staff.js'; // Assuming Staff model exists
import Booking from '../models/Booking.js'; // Assuming Booking model exists
import Field from '../models/Field.js';
import auth, { verifyPermission } from '../middlewares/auth.js';

const router = express.Router();

// Admin dashboard - Monitor bookings and revenue
router.get('/admin/dashboard', auth, async (req, res) => {
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
router.get('/staffs', auth, async (req, res) => {
	try {
		const staffs = await Staff.find({ adminId: req.user._id });
		return res.status(201).json(staffs);
	} catch (error) {
		res.status(500).json({ message: 'Error getting staffs member', error });
	}
});
router.post('/staff', auth, async (req, res) => {
	const { name, role, email } = req.body;
	try {
		const staffExists = await Staff.findOne({ email });
		if (staffExists) {
			return res.status(400).json({ message: 'Staff member already exists' });
		}
		const staff = await Staff.create({
			adminId: req.user._id,
			name,
			role,
			email,
		});
		return res.status(200).json(staff);
	} catch (error) {
		res.status(500).json({ message: 'Error adding staff member', error });
	}
});

// Edit staff member
router.put('/staff/:staffId', auth, async (req, res) => {
	const { staffId } = req.params;
	const { name, role, email } = req.body;
	try {
		const staff = await Staff.findByIdAndUpdate(
			{ _id: staffId },
			{ name, role, email },
			{ new: true }
		);
		if (!staff) {
			return res.status(404).json({ message: 'Staff member not found' });
		}
		return res.status(200).json(staff);
	} catch (error) {
		res.status(500).json({ message: 'Error updating staff member', error });
	}
});

// Delete staff member
router.delete('/staff/:staffId', auth, async (req, res) => {
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
