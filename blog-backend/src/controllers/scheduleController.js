/**
 * Yayın Planı Controller - PostgreSQL
 */
import * as db from '../database/db.js';
import { processSchedule } from '../services/scheduler.js';

export async function list(req, res) {
  const status = req.query.status || '';
  let sql = `SELECT s.*, c.name as category_name, c.slug as category_slug
    FROM schedules s JOIN categories c ON s.category_id = c.id`;
  const params = [];
  if (status) {
    sql += ' WHERE s.status = $1';
    params.push(status);
  }
  sql += ' ORDER BY s.created_at DESC';

  const rows = await db.queryAll(sql, params);
  res.json(rows);
}

export async function cancel(req, res) {
  const id = parseInt(req.params.id, 10);
  const result = await db.execute(
    `UPDATE schedules SET status = 'cancelled' WHERE id = $1 AND status = 'pending'`,
    [id]
  );
  if (result.rowCount === 0) {
    return res.status(400).json({ error: 'Plan bulunamadı veya zaten işlenmiş' });
  }
  res.json({ success: true });
}

export async function processNow(req, res) {
  const id = parseInt(req.params.id, 10);
  const schedule = await db.queryOne('SELECT * FROM schedules WHERE id = $1', [id]);

  if (!schedule) return res.status(404).json({ error: 'Plan bulunamadı' });
  if (schedule.status !== 'pending') {
    return res.status(400).json({ error: 'Sadece bekleyen planlar işlenebilir' });
  }

  try {
    const blogId = await processSchedule(schedule);
    const blog = await db.queryOne('SELECT * FROM blogs WHERE id = $1', [blogId]);
    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
