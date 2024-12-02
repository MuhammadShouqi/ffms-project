import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	message: { type: String, required: true },
	address: { type: String, required: true },
	status: {
		type: String,
		enum: ['PENDING', 'CANCELLED', 'COMPLETED'],
		default: 'PENDING',
	},
	timestamp: { type: Date, default: Date.now },
});

const Report = mongoose.model('Report', reportSchema);
export default Report;
