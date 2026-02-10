/**
 * PostgreSQL tablolarını oluştur
 * Vercel Postgres bağlandıktan sonra çalıştırın
 */
import dotenv from 'dotenv';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const schemaPath = path.join(__dirname, 'schema.pg.sql');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL gerekli. .env dosyasına ekleyin.');
  process.exit(1);
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const schema = fs.readFileSync(schemaPath, 'utf-8');

await client.connect();
await client.query(schema);
console.log('✓ PostgreSQL tabloları oluşturuldu');
await client.end();
