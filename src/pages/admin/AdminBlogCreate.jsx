/**
 * Blog oluşturma - Başlık, kategori, yayın zamanı
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle } from 'lucide-react';
import { createBlog, getCategoriesAdmin, getBlogsAdmin } from '../../api/blogApi';

const SCHEDULE_TYPES = [
  { id: 'instant', label: 'Anında Yayınla', desc: 'Hemen içerik üretilir ve yayınlanır' },
  { id: 'hourly', label: 'Saatlik', desc: 'Her saat başı bir blog yayınlanır' },
  { id: 'daily', label: 'Günlük', desc: 'Her gün 09:00\'da bir blog yayınlanır' },
  { id: 'manual', label: 'Manuel Tarih', desc: 'Belirlediğiniz tarih/saatte yayınlanır' },
];

const AdminBlogCreate = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [scheduleType, setScheduleType] = useState('instant');
  const [scheduledAt, setScheduledAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getCategoriesAdmin().then(setCategories).catch(() => {});
    getBlogsAdmin({ page: 1 }).then((r) => setBlogs(r.blogs || [])).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!title.trim()) return setMessage({ type: 'error', text: 'Başlık gerekli' });
    if (!categoryId) return setMessage({ type: 'error', text: 'Kategori seçin' });
    if (scheduleType === 'manual' && !scheduledAt) {
      return setMessage({ type: 'error', text: 'Manuel yayın için tarih/saat girin' });
    }

    setLoading(true);
    try {
      const res = await createBlog({
        title: title.trim(),
        category_id: parseInt(categoryId, 10),
        schedule_type: scheduleType,
        scheduled_at: scheduleType === 'manual' ? scheduledAt : undefined,
      });

      if (res.schedule) {
        setMessage({ type: 'success', text: 'Blog planlandı. Belirlenen zamanda otomatik yayınlanacak.' });
      } else {
        setMessage({ type: 'success', text: 'Blog başarıyla oluşturuldu ve yayınlandı!' });
        setTitle('');
        getBlogsAdmin({ page: 1 }).then((r) => setBlogs(r.blogs || [])).catch(() => {});
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-secondary mb-8">Blog Oluştur</h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-lg font-bold text-secondary mb-2">Otomatik Blog Yazısı</h2>
          <p className="text-gray-500 text-sm">
            Sadece başlık girin. Sistem SEO uyumlu, 800-1200 kelimelik içerik üretecektir.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {message && (
            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${
                message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'
              }`}
            >
              <CheckCircle size={20} />
              <span>{message.text}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blog Başlığı *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Modern Villada Enerji Verimliliği"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              required
            >
              <option value="">Seçin</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Yayın Zamanı</label>
            <div className="grid sm:grid-cols-2 gap-4">
              {SCHEDULE_TYPES.map((t) => (
                <label
                  key={t.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    scheduleType === t.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="schedule"
                    value={t.id}
                    checked={scheduleType === t.id}
                    onChange={() => setScheduleType(t.id)}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-medium text-secondary">{t.label}</span>
                    <p className="text-gray-500 text-xs mt-0.5">{t.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            {scheduleType === 'manual' && (
              <div className="mt-4">
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <FileText size={20} />
            {loading ? 'İşleniyor...' : scheduleType === 'instant' ? 'Oluştur ve Yayınla' : 'Planla'}
          </button>
        </form>
      </motion.div>

      {/* Son bloglar */}
      {blogs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold text-secondary mb-4">Son Yayınlanan Bloglar</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {blogs.slice(0, 5).map((b) => (
              <a
                key={b.id}
                href={`/blog/${b.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-secondary">{b.title}</span>
                <span className="text-gray-400 text-sm">{b.category_name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogCreate;
