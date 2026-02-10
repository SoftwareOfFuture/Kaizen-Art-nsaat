/**
 * PostgreSQL Veritabanı Bağlantısı
 * DATABASE_URL ile Vercel Postgres / Neon / Supabase
 */
import pg from 'pg';

const { Pool } = pg;

let pool = null;

function getPool() {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL ortam değişkeni gerekli. Vercel Postgres veya Neon kullanın.');
    }
    pool = new Pool({
      connectionString: url,
      ssl: url.includes('localhost') ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

export async function query(sql, params = []) {
  const result = await getPool().query(sql, params);
  return result;
}

export async function queryOne(sql, params = []) {
  const result = await getPool().query(sql, params);
  return result.rows[0] || null;
}

export async function queryAll(sql, params = []) {
  const result = await getPool().query(sql, params);
  return result.rows;
}

export async function execute(sql, params = []) {
  const result = await getPool().query(sql, params);
  return { rowCount: result.rowCount, rows: result.rows };
}

export default { query, queryOne, queryAll, execute, getPool };
