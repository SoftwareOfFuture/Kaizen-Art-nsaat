/**
 * Ana route tanımları
 */
import { Router } from 'express';
import auth from './auth.js';
import categories from './categories.js';
import blogs from './blogs.js';
import schedules from './schedules.js';
import { adminLimiter, apiLimiter } from '../middleware/security.js';

const router = Router();

// Auth
router.use('/auth', adminLimiter, auth);

// Public API (rate limited)
router.use('/categories', apiLimiter, categories);
router.use('/blogs', apiLimiter, blogs);

// Admin schedules
router.use('/admin/schedules', adminLimiter, schedules);

export default router;
