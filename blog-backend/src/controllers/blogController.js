/**
 * Blog Controller - PostgreSQL
 */
import * as db from '../database/db.js';
import { sanitizeInput } from '../utils/sanitize.js';
import { generateBlogContent } from '../services/contentGenerator.js';

const PER_PAGE = 12;

export async function listPublic(req, res) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const categorySlug = req.query.category || '';
  const offset = (page - 1) * PER_PAGE;

  let countSql = `SELECT COUNT(*)::int as total FROM blogs b JOIN categories c ON b.category_id = c.id WHERE b.status = 'published'`;
  let listSql = `SELECT b.id, b.title, b.slug, b.excerpt, b.published_at, b.meta_title, b.meta_description,
    c.name as category_name, c.slug as category_slug
    FROM blogs b JOIN categories c ON b.category_id = c.id
    WHERE b.status = 'published'`;
  const params = [];

  if (categorySlug) {
    countSql += ' AND c.slug = $1';
    listSql += ' AND c.slug = $1';
    params.push(categorySlug);
  }

  const countResult = await db.queryOne(countSql, params);
  const total = countResult?.total || 0;

  listSql += ` ORDER BY b.published_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(PER_PAGE, offset);

  const rows = await db.queryAll(listSql, params);

  res.json({
    blogs: rows,
    pagination: { page, perPage: PER_PAGE, total, totalPages: Math.ceil(total / PER_PAGE) },
  });
}

export async function getBySlug(req, res) {
  const row = await db.queryOne(`
    SELECT b.*, c.name as category_name, c.slug as category_slug
    FROM blogs b JOIN categories c ON b.category_id = c.id
    WHERE b.slug = $1 AND b.status = 'published'
  `, [req.params.slug]);

  if (!row) return res.status(404).json({ error: 'Blog bulunamadı' });
  res.json(row);
}

export async function listAll(req, res) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const status = req.query.status || '';
  const offset = (page - 1) * PER_PAGE;

  let where = '1=1';
  const params = [];
  if (status) {
    where = 'b.status = $1';
    params.push(status);
  }

  const countResult = await db.queryOne(`SELECT COUNT(*)::int as total FROM blogs b WHERE ${where}`, params);
  const total = countResult?.total || 0;

  const listParams = [...params, PER_PAGE, offset];
  const rows = await db.queryAll(`
    SELECT b.*, c.name as category_name, c.slug as category_slug
    FROM blogs b JOIN categories c ON b.category_id = c.id
    WHERE ${where} ORDER BY b.created_at DESC
    LIMIT $${params.length + 1} OFFSET $${params.length + 2}
  `, listParams);

  res.json({
    blogs: rows,
    pagination: { page, perPage: PER_PAGE, total, totalPages: Math.ceil(total / PER_PAGE) },
  });
}

export async function create(req, res) {
  const title = sanitizeInput(req.body.title);
  const categoryId = parseInt(req.body.category_id, 10);
  const scheduleType = req.body.schedule_type || 'instant';
  const scheduledAt = req.body.scheduled_at || null;

  if (!title) return res.status(400).json({ error: 'Blog başlığı gerekli' });

  const category = await db.queryOne('SELECT * FROM categories WHERE id = $1', [categoryId]);
  if (!category) return res.status(400).json({ error: 'Geçersiz kategori' });

  const validScheduleTypes = ['instant', 'hourly', 'daily', 'manual'];
  if (!validScheduleTypes.includes(scheduleType)) {
    return res.status(400).json({ error: 'Geçersiz yayın tipi' });
  }

  if (scheduleType === 'manual' && !scheduledAt) {
    return res.status(400).json({ error: 'Manuel yayın için tarih/saat gerekli' });
  }

  if (scheduleType === 'instant') {
    try {
      const content = await generateBlogContent(title, category.name);
      let slug = content.slug;
      let counter = 1;
      while (await db.queryOne('SELECT id FROM blogs WHERE slug = $1', [slug])) {
        slug = `${content.slug}-${counter++}`;
      }

      const result = await db.execute(
        `INSERT INTO blogs (category_id, title, slug, content, excerpt, meta_title, meta_description, status, published_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'published', NOW()) RETURNING *`,
        [categoryId, title, slug, content.content, content.excerpt || '', content.meta_title || title, content.meta_description || '']
      );

      const row = await db.queryOne(`
        SELECT b.*, c.name as category_name, c.slug as category_slug
        FROM blogs b JOIN categories c ON b.category_id = c.id WHERE b.id = $1
      `, [result.rows[0].id]);

      return res.status(201).json(row);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'İçerik oluşturulurken hata: ' + err.message });
    }
  }

  const scheduleResult = await db.execute(
    `INSERT INTO schedules (title, category_id, schedule_type, scheduled_at, status) VALUES ($1, $2, $3, $4, 'pending') RETURNING *`,
    [title, categoryId, scheduleType, scheduleType === 'manual' ? scheduledAt : null]
  );

  res.status(201).json({ message: 'Blog planlandı', schedule: scheduleResult.rows[0] });
}

export async function remove(req, res) {
  const id = parseInt(req.params.id, 10);
  const result = await db.execute('DELETE FROM blogs WHERE id = $1', [id]);
  if (result.rowCount === 0) return res.status(404).json({ error: 'Blog bulunamadı' });
  res.json({ success: true });
}
