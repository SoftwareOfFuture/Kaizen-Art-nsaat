/**
 * Admin Panel Kimlik Doğrulama Middleware
 * JWT tabanlı
 */
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export function requireAuth(req, res, next) {
  const token = req.cookies?.admin_token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Oturum gerekli' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.adminId = decoded.id;
    req.adminUsername = decoded.username;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token' });
  }
}
