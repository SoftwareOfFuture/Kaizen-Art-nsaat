/**
 * Otomatik Yayın Zamanlayıcı - PostgreSQL
 */
import cron from 'node-cron';
import * as db from '../database/db.js';
import { generateBlogContent } from './contentGenerator.js';

export async function processSchedule(schedule) {
  await db.execute(`UPDATE schedules SET status = 'processing', error_message = NULL WHERE id = $1`, [schedule.id]);

  try {
    const category = await db.queryOne('SELECT * FROM categories WHERE id = $1', [schedule.category_id]);
    if (!category) throw new Error('Kategori bulunamadı');

    const content = await generateBlogContent(schedule.title, category.name);

    let slug = content.slug;
    let counter = 1;
    while (await db.queryOne('SELECT id FROM blogs WHERE slug = $1', [slug])) {
      slug = `${content.slug}-${counter++}`;
    }

    const result = await db.execute(
      `INSERT INTO blogs (category_id, title, slug, content, excerpt, meta_title, meta_description, status, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'published', NOW()) RETURNING id`,
      [schedule.category_id, schedule.title, slug, content.content, content.excerpt || '', content.meta_title || schedule.title, content.meta_description || '']
    );

    const blogId = result.rows[0].id;
    await db.execute(`UPDATE schedules SET status = 'completed', created_blog_id = $1 WHERE id = $2`, [blogId, schedule.id]);

    return blogId;
  } catch (err) {
    console.error('Schedule process error:', err);
    await db.execute(`UPDATE schedules SET status = 'failed', error_message = $1 WHERE id = $2`, [err.message, schedule.id]);
    throw err;
  }
}

export async function processManualSchedules() {
  const now = new Date().toISOString();
  const pending = await db.queryAll(
    `SELECT * FROM schedules WHERE status = 'pending' AND schedule_type = 'manual' AND scheduled_at <= $1`,
    [now]
  );
  for (const s of pending) {
    processSchedule(s).catch(() => {});
  }
}

export async function processHourlySchedules() {
  const next = await db.queryOne(
    `SELECT * FROM schedules WHERE status = 'pending' AND schedule_type = 'hourly' ORDER BY created_at ASC LIMIT 1`
  );
  if (next) processSchedule(next).catch(() => {});
}

export async function processDailySchedules() {
  const next = await db.queryOne(
    `SELECT * FROM schedules WHERE status = 'pending' AND schedule_type = 'daily' ORDER BY created_at ASC LIMIT 1`
  );
  if (next) processSchedule(next).catch(() => {});
}

export function startScheduler() {
  cron.schedule('* * * * *', processManualSchedules);
  cron.schedule('0 * * * *', processHourlySchedules);
  cron.schedule('0 9 * * *', processDailySchedules);
  console.log('✓ Scheduler başlatıldı');
}
