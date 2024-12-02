export const checkApiHealth = (req, res) => {
	res.status(200).json({ status: 'OK', message: 'API is healthy' });
};
