import express from 'express';
import { checkApiHealth } from '../controllers/health.js';

const router = express.Router();

router.get('/', checkApiHealth);
router.get('/health', checkApiHealth);
router.get('/api/v1/health', checkApiHealth);

export default router;
