/**
 * Kaizen Blog API
 * Vercel serverless veya standalone
 */
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { config } from './config/index.js';
import { helmetMiddleware, apiLimiter } from './middleware/security.js';
import routes from './routes/index.js';
import { processManualSchedules, processHourlySchedules, processDailySchedules } from './services/scheduler.js';

const app = express();

app.use(helmetMiddleware);
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.use('/api', apiLimiter);

// /api prefix (standalone + Vercel full path)
app.use('/api', routes);
// Vercel catch-all bazen /api olmadan path gönderebilir
app.use(routes);

// Vercel Cron için - zamanlanmış görevleri tetikle
app.get('/api/cron/schedules', async (req, res) => {
  const auth = req.headers['authorization'];
  if (auth !== `Bearer ${process.env.CRON_SECRET}` && process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    await processManualSchedules();
    await processHourlySchedules();
    await processDailySchedules();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use((req, res) => res.status(404).json({ error: 'Bulunamadı' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Sunucu hatası' });
});

// Standalone modda dinle (local)
if (!process.env.VERCEL) {
  const { startScheduler } = await import('./services/scheduler.js');
  app.listen(config.port, () => {
    console.log(`✓ Kaizen Blog API: http://localhost:${config.port}`);
    startScheduler();
  });
}

export default app;
