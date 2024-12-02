import {
	getReports,
	getReport,
	updateReport,
	createReport,
} from '../controllers/report.js';
import express from 'express';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.get('/', auth, getReports);
router.get('/:id', auth, getReport);
router.post('/', auth, createReport);
router.patch('/', auth, updateReport);

export default router;
