import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
	{
		category: { type: String, required: true },
		status: { type: String, required: true, default: 'active' },
	},
	{ timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);
export default Category;
