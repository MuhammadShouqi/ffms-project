import Order from '../models/Order.js';
import User from '../models/User.js';

export const getOrders = async (req, res) => {
	try {
		let orders = await Order.find();
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const getOrder = async (req, res) => {
	try {
		let orders = await Order.findById(req.params.id).populate('product_id');
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const createOrder = async (req, res) => {
	try {
		let orders = await Order.create(req.body);
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const updateOrder = async (req, res) => {
	try {
		let order = await Order.findByIdAndUpdate(
			{ _id: req.params.id },
			{ ...req.body }
		);
		res.status(200).json(order);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const deleteOrder = async (req, res) => {
	try {
		let order = await Order.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Order deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
