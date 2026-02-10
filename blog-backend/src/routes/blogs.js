/**
 * Blog routes
 */
import { Router } from 'express';
import * as blog from '../controllers/blogController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const wrap = (fn) => (req, res, next) => fn(req, res).catch(next);

router.get('/admin', requireAuth, wrap(blog.listAll));
router.get('/', wrap(blog.listPublic));
router.get('/post/:slug', wrap(blog.getBySlug));
router.post('/', requireAuth, wrap(blog.create));
router.delete('/:id', requireAuth, wrap(blog.remove));

export default router;
