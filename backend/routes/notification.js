import express from 'express';
import {
	getNotification,getAllNotifications,
	getNotifications,
	createNotification,
	updateNotification,
} from '../controllers/notification.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.get('/', auth, getNotifications);
router.get('/all', auth, getAllNotifications);
router.get('/:id', auth, getNotification);
router.post('/', auth, createNotification);
router.patch('/:id', auth, updateNotification);

export default router;
