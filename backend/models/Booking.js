import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		fieldId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Field',
			required: true,
		},
		startDate: { type: Date, required: true },
		endTime: { type: String, required: true },
		startTime: { type: String, required: true },
		amount: { type: Number, required: true },
		status: {
			type: String,
			enum: ['pending', 'confirmed', 'completed', 'cancelled'],
			default: 'pending',
		},
	},
	{ timestamps: true }
);

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;
