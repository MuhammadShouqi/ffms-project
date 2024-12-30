import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema(
	{
		adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		role: { type: String, required: true },
	},
	{ timestamps: true }
);

const Staff = mongoose.model('Staff', StaffSchema);
export default Staff;
