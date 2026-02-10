# Vercel Kurulum Rehberi

## 1. GitHub'a Yükleme

```bash
git add .
git commit -m "Vercel ve PostgreSQL için hazırlandı"
git push origin main
```

## 2. Vercel'de Proje Oluşturma

1. [vercel.com](https://vercel.com) → New Project
2. GitHub repo'yu seçin
3. Import edin

## 3. Vercel Postgres Kurulumu

1. Vercel Dashboard → Storage → Create Database → **Postgres**
2. Projeye bağlayın
3. Otomatik olarak `DATABASE_URL` eklenir

## 4. Ortam Değişkenleri

Project → Settings → Environment Variables bölümüne ekleyin:

| Değişken | Değer | Açıklama |
|----------|-------|----------|
| DATABASE_URL | (otomatik) | Vercel Postgres bağlayınca gelir |
| JWT_SECRET | güvenli-anahtar | Rastgele 64 karakter |
| ADMIN_USERNAME | admin | Admin giriş |
| ADMIN_PASSWORD | güvenli-sifre | Admin şifre |
| OPENAI_API_KEY | sk-... | OpenAI (opsiyonel) |
| CORS_ORIGIN | https://siteniz.com | Domain |

## 5. İlk Kurulum - Veritabanı Tabloları

Deploy sonrası tabloları oluşturmak için:

1. Vercel Postgres → Query → SQL çalıştır
2. `blog-backend/src/database/schema.pg.sql` içeriğini yapıştırıp çalıştırın

Veya Vercel CLI ile:
```bash
cd blog-backend
vercel env pull .env.local
npm run db:init
npm run db:seed
```

## 6. Cron (Zamanlanmış Yayın)

Vercel Cron her dakika `/api/cron/schedules` endpoint'ini çağırır. `CRON_SECRET` ekleyerek koruyabilirsiniz.

## 7. Domain

Project → Settings → Domains → kaizenartinsaat.com ekleyin.
DNS kayıtlarını domain sağlayıcınıza ekleyin.
