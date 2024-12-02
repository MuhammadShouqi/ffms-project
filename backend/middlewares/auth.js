import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {
	// verify user is authenticated
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ message: 'Authorization token required' });
	}
	const token = authorization.split(' ')[1] || authorization;

	if (!token) return res.status(401).json({ message: 'Access Denied' });

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		if (!verified.user) {
			return res.status(401).json({ message: 'Verification Error' });
		}
		req.user = verified.user;
		next();
	} catch (err) {
		res.status(400).json({ message: 'Invalid Token' });
	}
};

export const verifyPermission = (roles = []) => {
	return async (req, res, next) => {
		if (!req.user?._id) {
			throw new Error(401, 'Unauthorized request');
		}
		if (roles.includes(req.user?.role)) {
			next();
		} else {
			throw new Error(403, 'You are not allowed to perform this action');
		}
	};
};

export default auth;
