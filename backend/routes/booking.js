import express from 'express';
import { getBooking, getBookings } from '../controllers/booking.js';
import auth, { verifyPermission } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, getBookings);
router.get('/:id', auth, getBooking);

export default router;
