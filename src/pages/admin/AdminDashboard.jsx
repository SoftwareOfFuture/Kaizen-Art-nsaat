/**
 * Admin Dashboard - Özet
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, FolderOpen, Clock, Plus, ArrowRight } from 'lucide-react';
import { getCategoriesAdmin, getBlogsAdmin, getSchedules } from '../../api/blogApi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ categories: 0, blogs: 0, pendingSchedules: 0 });

  useEffect(() => {
    Promise.all([
      getCategoriesAdmin(),
      getBlogsAdmin({ page: 1 }),
      getSchedules(),
    ]).then(([cats, blogsRes, scheds]) => {
      const pending = scheds.filter((s) => s.status === 'pending').length;
      setStats({
        categories: cats?.length || 0,
        blogs: blogsRes?.pagination?.total || 0,
        pendingSchedules: pending,
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Kategoriler', value: stats.categories, icon: FolderOpen, path: '/admin/categories', color: 'bg-primary' },
    { label: 'Yayınlanan Blog', value: stats.blogs, icon: FileText, path: '/admin/blogs', color: 'bg-secondary' },
    { label: 'Bekleyen Plan', value: stats.pendingSchedules, icon: Clock, path: '/admin/schedules', color: 'bg-amber-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-secondary mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {cards.map(({ label, value, icon: Icon, path }) => (
          <Link
            key={path}
            to={path}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm font-medium">{label}</p>
              <p className="text-3xl font-bold text-secondary mt-1">{value}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Icon size={24} />
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-secondary mb-4">Hızlı İşlemler</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus size={20} /> Yeni Blog Oluştur
          </Link>
          <Link
            to="/admin/categories"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <FolderOpen size={20} /> Kategori Ekle
          </Link>
          <Link
            to="/blog"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowRight size={20} /> Blogu Görüntüle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
