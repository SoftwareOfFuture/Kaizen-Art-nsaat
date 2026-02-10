/**
 * Yayın planı routes
 */
import { Router } from 'express';
import * as sch from '../controllers/scheduleController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const wrap = (fn) => (req, res, next) => fn(req, res).catch(next);

router.use(requireAuth);

router.get('/', wrap(sch.list));
router.post('/:id/cancel', wrap(sch.cancel));
router.post('/:id/process-now', wrap(sch.processNow));

export default router;
