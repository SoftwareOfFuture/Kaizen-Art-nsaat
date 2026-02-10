/**
 * Kategori yönetimi
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Plus, Edit2, Trash2 } from 'lucide-react';
import {
  getCategoriesAdmin,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../api/blogApi';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = () => getCategoriesAdmin().then(setCategories).catch(() => {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!form.name.trim()) return;

    setLoading(true);
    try {
      if (editing) {
        await updateCategory(editing.id, form);
        setMessage({ type: 'success', text: 'Kategori güncellendi' });
      } else {
        await createCategory(form);
        setMessage({ type: 'success', text: 'Kategori eklendi' });
      }
      setForm({ name: '', slug: '', description: '' });
      setEditing(null);
      load();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return;
    try {
      await deleteCategory(id);
      setMessage({ type: 'success', text: 'Kategori silindi' });
      load();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const startEdit = (c) => {
    setEditing(c);
    setForm({ name: c.name, slug: c.slug, description: c.description || '' });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: '', slug: '', description: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-secondary mb-8">Kategoriler</h1>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
            <Plus size={20} /> {editing ? 'Kategori Düzenle' : 'Yeni Kategori'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="otomatik oluşturulur"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? 'Kaydediliyor...' : editing ? 'Güncelle' : 'Ekle'}
              </button>
              {editing && (
                <button type="button" onClick={cancelEdit} className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  İptal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Liste */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-secondary flex items-center gap-2">
              <FolderOpen size={20} /> Mevcut Kategoriler
            </h2>
          </div>
          <ul className="divide-y divide-gray-100">
            <AnimatePresence>
              {categories.map((c) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div>
                    <span className="font-medium text-secondary">{c.name}</span>
                    <span className="text-gray-400 text-sm ml-2">/{c.slug}</span>
                    {c.blog_count > 0 && (
                      <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">{c.blog_count} blog</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(c)}
                      className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
