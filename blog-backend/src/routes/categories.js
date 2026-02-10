/**
 * Kategori routes
 */
import { Router } from 'express';
import * as cat from '../controllers/categoryController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const wrap = (fn) => (req, res, next) => fn(req, res).catch(next);

router.get('/', (req, res, next) => {
  if (req.query.admin === '1') {
    return requireAuth(req, res, () => cat.listAll(req, res).catch(next));
  }
  return cat.listPublic(req, res).catch(next);
});

router.get('/:slug', wrap(cat.getBySlug));
router.post('/', requireAuth, wrap(cat.create));
router.put('/:id', requireAuth, wrap(cat.update));
router.delete('/:id', requireAuth, wrap(cat.remove));

export default router;
