import express from 'express';
import { getBooking, getBookings, deleteBooking, editBooking } from '../controllers/booking.js';
import auth, { verifyPermission } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, getBookings);
router.get('/:id', auth, getBooking);
router.patch('/:id', auth, editBooking);
router.delete('/:id', auth, deleteBooking);

export default router;
