/**
 * Blog API - Konfigürasyon
 * Vercel ortam değişkenleri otomatik yüklenir
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Vercel'de process.env zaten dolu, local'de .env yükle
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '../../.env') });
}

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  env: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173'),
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  databaseUrl: process.env.DATABASE_URL,
};
