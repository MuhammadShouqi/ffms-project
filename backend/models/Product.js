import mongoose, { Schema } from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			default: '',
		},
		quantity: {
			type: Number,
			default: 0,
		},
		description: {
			type: String,
		},
		category: {
			type: String,
		},
		image: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
		date: {
			type: Date,
			default: Date.now, // Set to current date by default
		},
		status: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
