/**
 * Kimlik Doğrulama Controller
 */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as db from '../database/db.js';
import { config } from '../config/index.js';
import { sanitizeInput } from '../utils/sanitize.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.env === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

export async function login(req, res) {
  const username = sanitizeInput(req.body?.username);
  const password = req.body?.password;

  if (!username || !password) {
    return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli' });
  }

  const user = await db.queryOne('SELECT * FROM admin_users WHERE username = $1', [username]);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

  res.cookie('admin_token', token, COOKIE_OPTIONS);
  res.json({ success: true, user: { id: user.id, username: user.username } });
}

export function logout(req, res) {
  res.clearCookie('admin_token', { path: '/' });
  res.json({ success: true });
}

export function me(req, res) {
  res.json({ user: { id: req.adminId, username: req.adminUsername } });
}
