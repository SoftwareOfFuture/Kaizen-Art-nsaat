/**
 * Örnek veri - PostgreSQL
 */
import bcrypt from 'bcryptjs';
import * as db from './db.js';
import { config } from '../config/index.js';

const passwordHash = bcrypt.hashSync(config.adminPassword, 10);

await db.execute('DELETE FROM admin_users WHERE username = $1', [config.adminUsername]);
await db.execute(
  'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)',
  [config.adminUsername, passwordHash]
);

const categories = [
  { name: 'Mimari', slug: 'mimari', description: 'Mimari tasarım ve projeler', meta_title: 'Mimari | Kaizen Blog', meta_description: 'Mimari tasarım ve inşaat projeleri' },
  { name: 'İnşaat', slug: 'insaat', description: 'İnşaat sektörü ve uygulamalar', meta_title: 'İnşaat | Kaizen Blog', meta_description: 'İnşaat teknikleri ve sektör haberleri' },
  { name: 'Tasarım', slug: 'tasarim', description: 'İç mimari ve tasarım trendleri', meta_title: 'Tasarım | Kaizen Blog', meta_description: 'İç mimari ve tasarım trendleri' },
];

for (const c of categories) {
  try {
    await db.execute(
      'INSERT INTO categories (name, slug, description, meta_title, meta_description) VALUES ($1, $2, $3, $4, $5)',
      [c.name, c.slug, c.description, c.meta_title, c.meta_description]
    );
  } catch (e) {
    if (!e.message.includes('unique')) console.error(e.message);
  }
}

console.log('✓ Örnek veriler eklendi. Admin:', config.adminUsername, '/', config.adminPassword);
