/**
 * XSS ve Injection Koruması
 * Kullanıcı girdilerini temizle
 */
import slugify from 'slugify';

const XSS_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

export function sanitizeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'`=/]/g, (c) => XSS_MAP[c]);
}

export function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, 500);
}

export function sanitizeSlug(str) {
  if (typeof str !== 'string') return '';
  return slugify(str, { lower: true, strict: true, locale: 'tr' }).slice(0, 200);
}
