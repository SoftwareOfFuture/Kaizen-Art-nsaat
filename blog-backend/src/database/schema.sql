-- Kaizen Blog - Veritabanı Şeması
-- SQLite uyumlu

-- Kategoriler
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  meta_title TEXT,
  meta_description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bloglar
CREATE TABLE IF NOT EXISTS blogs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category_id);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published_at);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

-- Yayın Planları
CREATE TABLE IF NOT EXISTS schedules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  blog_id INTEGER,
  title TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  schedule_type TEXT NOT NULL CHECK(schedule_type IN ('instant', 'hourly', 'daily', 'manual')),
  scheduled_at DATETIME,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  created_blog_id INTEGER,
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE SET NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (created_blog_id) REFERENCES blogs(id)
);

CREATE INDEX IF NOT EXISTS idx_schedules_status ON schedules(status);
CREATE INDEX IF NOT EXISTS idx_schedules_scheduled ON schedules(scheduled_at);

-- Admin kullanıcıları (basit auth)
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
