import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.js';
import fieldRoutes from './routes/field.js';
import bookingRoutes from './routes/booking.js';
import adminRoutes from './routes/admin.js';
import orderRoutes from './routes/order.js';
import reportRoutes from './routes/report.js';
import productRoutes from './routes/product.js';
import paymentRoutes from './routes/payment.js';
import notificationRoutes from './routes/notification.js';
import healthRoutes from './routes/health.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public')); // configure static file to save images locally
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', healthRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/fields', fieldRoutes);
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGO_URI)
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	)
	.catch((error) => console.error(error));
