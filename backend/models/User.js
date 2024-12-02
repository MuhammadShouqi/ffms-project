import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	phone: { type: String, required: true },
	password: { type: String, required: true },
	role: {
		type: String,
		enum: ['USER', 'ADMIN', 'SUPER_ADMIN'],
		default: 'USER',
	},
});

const User = mongoose.model('User', userSchema);
export default User;
