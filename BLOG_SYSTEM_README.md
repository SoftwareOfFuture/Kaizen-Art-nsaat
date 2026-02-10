# Otomatik Blog Oluşturma Sistemi

Bu doküman, Kaizen Art web sitesine entegre edilen **otomatik blog oluşturma sisteminin** kurulumu ve kullanımını açıklar.

## Özellikler

- **Otomatik içerik üretimi:** Kullanıcı sadece başlık girer; sistem 800-1200 kelimelik SEO uyumlu blog yazısı üretir
- **Yayın planlama:** Anında, saatlik, günlük veya manuel tarih/saat seçenekleri
- **Kategori sistemi:** Birden fazla kategori, SEO uyumlu kategori sayfaları
- **Admin paneli:** Giriş, blog oluşturma, kategori ve plan yönetimi
- **SEO:** URL slug, meta title/description, Schema.org BlogPosting
- **Güvenlik:** JWT auth, XSS/SQL injection koruması, rate limiting

## Proje Yapısı

```
yap1/
├── blog-backend/           # Node.js Express API
│   ├── src/
│   │   ├── config/         # Ortam değişkenleri
│   │   ├── controllers/    # auth, blog, category, schedule
│   │   ├── database/       # SQLite schema, init, seed
│   │   ├── middleware/     # auth, security
│   │   ├── routes/
│   │   ├── services/       # contentGenerator, scheduler
│   │   └── utils/          # sanitize
│   ├── data/               # blog.db (oluşturulur)
│   └── package.json
├── src/
│   ├── api/blogApi.js      # API istemcisi
│   ├── contexts/AdminContext.jsx
│   ├── pages/blog/         # Blog, BlogPost
│   └── pages/admin/        # Login, Dashboard, BlogCreate, Categories, Schedules
└── BLOG_SYSTEM_README.md   # Bu dosya
```

## Kurulum

### 1. Backend

```bash
cd blog-backend
npm install
```

### 2. Veritabanı

```bash
# Tabloları oluştur
npm run db:init

# Örnek kategoriler ve admin kullanıcı (opsiyonel)
npm run db:seed
```

### 3. Ortam Değişkenleri

`blog-backend/.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp .env.example .env
```

Önemli değişkenler:
- `PORT=4000` – API portu
- `CORS_ORIGIN=http://localhost:5173` – Frontend URL (Vite)
- `JWT_SECRET` – Güçlü bir secret belirleyin
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` – Admin giriş bilgileri
- `OPENAI_API_KEY` – Opsiyonel; OpenAI ile daha kaliteli içerik üretimi

### 4. Backend Başlatma

```bash
cd blog-backend
npm run dev
```

API `http://localhost:4000` adresinde çalışır.

### 5. Frontend

Ana proje zaten Vite ile yapılandırılmıştır. `vite.config.js` içinde `/api` istekleri `localhost:4000`'e proxy edilir.

```bash
# Ana dizinde
npm run dev
```

Frontend `http://localhost:5173` adresinde çalışır.

## Kullanım

### Admin Panel

1. `http://localhost:5173/admin/login` adresine gidin
2. Varsayılan: `admin` / `admin123` (seed sonrası)
3. **Blog Oluştur:** Başlık, kategori ve yayın zamanını seçin
4. **Kategoriler:** Yeni kategori ekleyin/düzenleyin
5. **Yayın Planları:** Bekleyen planları görüntüleyin, iptal veya hemen yayınlayın

### Yayın Seçenekleri

| Tip     | Açıklama                        |
|---------|---------------------------------|
| Anında  | İçerik hemen üretilir ve yayınlanır |
| Saatlik | Her saat başı sıradaki plan işlenir |
| Günlük  | Her gün 09:00'da sıradaki plan işlenir |
| Manuel  | Belirlenen tarih/saatte yayınlanır |

### API Endpoints

**Public:**
- `GET /api/categories` – Kategori listesi
- `GET /api/categories/:slug` – Kategori detay
- `GET /api/blogs?page=1&category=slug` – Blog listesi
- `GET /api/blogs/post/:slug` – Blog detay

**Admin (auth gerekli):**
- `POST /api/auth/login` – Giriş
- `POST /api/auth/logout` – Çıkış
- `GET /api/categories?admin=1` – Tüm kategoriler
- `POST /api/categories` – Kategori ekle
- `PUT /api/categories/:id` – Kategori güncelle
- `DELETE /api/categories/:id` – Kategori sil
- `GET /api/blogs/admin` – Tüm bloglar
- `POST /api/blogs` – Blog oluştur/planla
- `DELETE /api/blogs/:id` – Blog sil
- `GET /api/admin/schedules` – Plan listesi
- `POST /api/admin/schedules/:id/cancel` – Plan iptal
- `POST /api/admin/schedules/:id/process-now` – Hemen yayınla

## İçerik Üretimi

- **OpenAI API Key varsa:** GPT-4o-mini ile daha özgün, araştırma benzeri içerik üretilir
- **Yoksa:** Şablon tabanlı, SEO uyumlu 800+ kelimelik içerik üretilir

## Veritabanı Tabloları

- **categories** – Kategori adı, slug, meta bilgileri
- **blogs** – Başlık, slug, içerik, meta, yayın tarihi
- **schedules** – Planlanan blog görevleri
- **admin_users** – Admin kullanıcılar

## Güvenlik

- JWT cookie tabanlı oturum
- Helmet, rate limiting
- XSS ve SQL injection koruması (sanitize, parametreli sorgular)
- CORS kısıtlı

## Production

1. `.env` içinde `NODE_ENV=production`, güçlü `JWT_SECRET`
2. CORS'u production domain ile güncelleyin
3. Backend ayrı sunucuda veya serverless çalıştırın
4. Frontend build: `npm run build` – `/api` proxy yerine gerçek API URL kullanın (env variable ile)
