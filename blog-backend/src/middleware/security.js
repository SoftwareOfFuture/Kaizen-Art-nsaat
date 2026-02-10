/**
 * Güvenlik Middleware
 * XSS, rate limit, Helmet vb.
 */
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Rate limiting - admin API
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100,
  message: { error: 'Çok fazla istek. Lütfen biraz bekleyin.' },
});

// Rate limiting - public API (blog listesi, detay vb.)
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 dakika
  max: 60,
  message: { error: 'Çok fazla istek.' },
});

// Helmet - güvenlik başlıkları
export const helmetMiddleware = helmet({
  contentSecurityPolicy: false, // SPA için CSP özelleştirilebilir
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});
