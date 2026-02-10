/**
 * Kategori Controller - PostgreSQL
 */
import * as db from '../database/db.js';
import slugify from 'slugify';
import { sanitizeInput, sanitizeSlug } from '../utils/sanitize.js';

export async function listAll(req, res) {
  const rows = await db.queryAll(`
    SELECT c.*, (SELECT COUNT(*)::int FROM blogs b WHERE b.category_id = c.id AND b.status = 'published') as blog_count
    FROM categories c ORDER BY c.name
  `);
  res.json(rows);
}

export async function listPublic(req, res) {
  const rows = await db.queryAll(`
    SELECT c.id, c.name, c.slug, c.description, c.meta_title, c.meta_description,
           (SELECT COUNT(*)::int FROM blogs b WHERE b.category_id = c.id AND b.status = 'published') as blog_count
    FROM categories c ORDER BY c.name
  `);
  res.json(rows);
}

export async function getBySlug(req, res) {
  const row = await db.queryOne('SELECT * FROM categories WHERE slug = $1', [req.params.slug]);
  if (!row) return res.status(404).json({ error: 'Kategori bulunamadı' });
  res.json(row);
}

export async function create(req, res) {
  const name = sanitizeInput(req.body.name);
  const description = sanitizeInput(req.body.description) || '';
  const metaTitle = sanitizeInput(req.body.meta_title) || name;
  const metaDescription = sanitizeInput(req.body.meta_description) || '';

  if (!name) return res.status(400).json({ error: 'Kategori adı gerekli' });

  const slug = sanitizeSlug(req.body.slug) || slugify(name, { lower: true, strict: true, locale: 'tr' });

  try {
    const result = await db.execute(
      `INSERT INTO categories (name, slug, description, meta_title, meta_description)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, slug, description, metaTitle, metaDescription]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    if (e.code === '23505') return res.status(400).json({ error: 'Bu slug veya isim zaten kullanılıyor' });
    throw e;
  }
}

export async function update(req, res) {
  const id = parseInt(req.params.id, 10);
  const name = sanitizeInput(req.body.name);
  const description = sanitizeInput(req.body.description) || '';
  const metaTitle = sanitizeInput(req.body.meta_title) || name;
  const metaDescription = sanitizeInput(req.body.meta_description) || '';

  if (!name) return res.status(400).json({ error: 'Kategori adı gerekli' });

  const slug = sanitizeSlug(req.body.slug) || slugify(name, { lower: true, strict: true, locale: 'tr' });

  try {
    const result = await db.execute(
      `UPDATE categories SET name = $1, slug = $2, description = $3, meta_title = $4, meta_description = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING *`,
      [name, slug, description, metaTitle, metaDescription, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Kategori bulunamadı' });
    res.json(result.rows[0]);
  } catch (e) {
    if (e.code === '23505') return res.status(400).json({ error: 'Bu slug veya isim zaten kullanılıyor' });
    throw e;
  }
}

export async function remove(req, res) {
  const id = parseInt(req.params.id, 10);
  const result = await db.execute('DELETE FROM categories WHERE id = $1', [id]);
  if (result.rowCount === 0) return res.status(404).json({ error: 'Kategori bulunamadı' });
  res.json({ success: true });
}
