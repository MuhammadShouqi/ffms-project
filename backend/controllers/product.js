import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import fs from 'fs';
import { uploader } from '../utils/cloudinary.js';

export const getProducts = async (req, res) => {
	try {
		const userId = req.user._id;
		console.log('useerId', userId);
		let reportResult;
		if (req.user.role === 'ADMIN') {
			reportResult = await Product.find();
		} else {
			reportResult = await Product.find({ userId });
		}
		res.status(200).json({ products: reportResult });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const getProduct = async (req, res) => {
	try {
		let product = await Product.findById(req.params.id);

		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const searchProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const createProductCategories = async (req, res) => {
	try {
		const category = await Category.create({...req.body});
		res.status(200).json(category);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const getProductCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		res.status(200).json(categories);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const deleteCategory = async (req, res) => {
	try {
		const id = req.params.id
		const category = await Category.findByIdAndDelete({ _id: id });
		if (!category) {
			return res.status(404).json({message: 'Invalid category id'})
		}
		res.status(200).json({message: 'category deleted',});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const createProduct = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No product file uploaded!' });
		}
		const image = await uploader(req.file.path, 'product');
		if (!image) {
			await fs.promises.unlink(req.file.path);
			return res.status(400).json({ message: 'Product file uploaded error!' });
		}
		console.log('image', image);

		const product = await Product.create({
			...req.body,
			image: {
				public_id: image?.public_id,
				url: image?.url,
			},
		});
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const updateProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(
			{ _id: req.params.id },
			{ ...req.body }
		);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const deleteProducts = async (req, res) => {
	try {
		reportResult = await Product.find();
		res.status(200).json({ products: reportResult });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const deleteProduct = async (req, res) => {
	try {
		const reportResult = await Product.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'product deleted' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
