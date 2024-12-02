import Notification from '../models/Notification.js';
// import User from '../models/User.js'

export const getAllNotifications = async (req, res) => {
	try {
		let notifications = await Notification.find();
		res.status(200).json(notifications);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const getNotifications = async (req, res) => {
	try {
        const userId = req.user._id;
		let notifications = await Notification.find({ userId, status: 'unread' });
        console.log('notifications.length', notifications);
		res.status(200).json(notifications);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const getNotification = async (req, res) => {
	try {
		let notification = await Notification.findById(req.params.id);
		res.status(200).json(notification);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const createNotification = async (req, res) => {
	try {
		let notification = await Notification.create(req.body);
		res.status(200).json(notification);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const updateNotification = async (req, res) => {
	try {
		let notification = await Notification.findByIdAndUpdate(
			{ _id: req.params.id },
			{ ...req.body },
			{ new: true }
		);
		res.status(200).json(notification);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
