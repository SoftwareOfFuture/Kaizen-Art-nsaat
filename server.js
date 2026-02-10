/**
 * Vercel Native Express - Tüm istekleri işler (API + SPA)
 * Vercel bu dosyayı otomatik algılar ve tüm route'ları buna yönlendirir
 */
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

import apiApp from './blog-backend/src/server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, 'dist');

const app = express();

// API - blog-backend mount edildiğinde /api/auth/login -> req.path = /auth/login
app.use('/api', apiApp);

// SPA static
app.use(express.static(distPath));

// SPA fallback - client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

export default app;
