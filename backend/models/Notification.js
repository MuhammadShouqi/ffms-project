import mongoose, { Schema } from 'mongoose';

const NotificationSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			default: '',
		},
		title: {
			type: String,
			default: '',
		},
		message: {
			type: String,
			default: '',
		},
		status: {
			type: String,
			default: 'unread',
			enum: ['unread', 'read'],
		},
	},
	{ timestamps: true }
);

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
