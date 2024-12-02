import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		role: { type: String, required: true },
		contact: { type: String, required: true },
	},
	{ timestamps: true }
);

const Staff = mongoose.model('Staff', StaffSchema);
export default Staff;
