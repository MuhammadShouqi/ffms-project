import express from 'express';
import { upload } from '../middlewares/multer.js';
import { uploader } from '../utils/cloudinary.js';
import fs from 'fs';
import auth, { verifyPermission } from '../middlewares/auth.js';
import { getFields, getField, createField, addSchedule, updatePrice, checkBooking, bookField, deleteField } from '../controllers/field.js';

const router = express.Router();

router.get('/', getFields);

router.get('/:id', getField);
// Create a new field
router.post(
	'/',
	auth,
	// verifyPermission(['ADMIN', 'SUPER_ADMIN']),
	upload.single('image'),
	createField
);
// Add schedule to a field
router.post('/:fieldId/schedule', addSchedule);

// Update field prices
router.put('/:fieldId/price', updatePrice);

router.post('/:fieldId/check-booking', auth, checkBooking);
router.post('/:fieldId/book', auth, bookField);

router.delete('/:id', deleteField);

export default router;
