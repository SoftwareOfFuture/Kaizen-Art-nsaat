/**
 * Admin panel layout
 * Auth korumalı
 */
import React from 'react';
import { Outlet, Link, Navigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { FileText, FolderOpen, Clock, LogOut, Home } from 'lucide-react';

const AdminLayout = () => {
  const { user, loading, logout } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Yükleniyor...</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: Home },
    { path: '/admin/blogs', label: 'Blog Oluştur', icon: FileText },
    { path: '/admin/categories', label: 'Kategoriler', icon: FolderOpen },
    { path: '/admin/schedules', label: 'Yayın Planları', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-secondary text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="font-serif font-bold text-lg">Blog Admin</h1>
          <p className="text-white/60 text-xs mt-1">{user.username}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors text-sm"
          >
            <Home size={18} /> Siteye Dön
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-colors w-full text-left text-sm"
          >
            <LogOut size={18} /> Çıkış
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
