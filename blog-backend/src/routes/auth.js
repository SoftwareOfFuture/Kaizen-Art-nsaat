/**
 * Auth routes
 */
import { Router } from 'express';
import { login, logout, me } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const wrap = (fn) => (req, res, next) => fn(req, res).catch(next);

router.post('/login', wrap(login));
router.post('/logout', logout);
router.get('/me', requireAuth, me);

export default router;
