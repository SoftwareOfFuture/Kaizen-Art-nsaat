-- Kaizen Blog - PostgreSQL Şeması
-- Vercel Postgres / Neon / Supabase uyumlu

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category_id);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published_at);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  blog_id INTEGER REFERENCES blogs(id) ON DELETE SET NULL,
  title VARCHAR(500) NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  schedule_type VARCHAR(20) NOT NULL CHECK(schedule_type IN ('instant', 'hourly', 'daily', 'manual')),
  scheduled_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  created_blog_id INTEGER REFERENCES blogs(id),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_schedules_status ON schedules(status);
CREATE INDEX IF NOT EXISTS idx_schedules_scheduled ON schedules(scheduled_at);

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
