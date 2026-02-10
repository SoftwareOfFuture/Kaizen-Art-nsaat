/**
 * Yayın planları yönetimi
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, XCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { getSchedules, cancelSchedule, processScheduleNow } from '../../api/blogApi';

const STATUS_LABELS = {
  pending: { label: 'Bekliyor', color: 'bg-amber-100 text-amber-800', icon: Clock },
  processing: { label: 'İşleniyor', color: 'bg-blue-100 text-blue-800', icon: Play },
  completed: { label: 'Tamamlandı', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  failed: { label: 'Başarısız', color: 'bg-red-100 text-red-800', icon: AlertCircle },
  cancelled: { label: 'İptal', color: 'bg-gray-100 text-gray-600', icon: XCircle },
};

const AdminSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState(null);

  useEffect(() => {
    load();
    const t = setInterval(load, 10000); // Her 10 saniyede güncelle
    return () => clearInterval(t);
  }, []);

  const load = () => getSchedules().then(setSchedules).finally(() => setLoading(false));

  const handleCancel = async (id) => {
    if (!window.confirm('Bu planı iptal etmek istediğinize emin misiniz?')) return;
    setActioning(id);
    try {
      await cancelSchedule(id);
      load();
    } finally {
      setActioning(null);
    }
  };

  const handleProcessNow = async (id) => {
    setActioning(id);
    try {
      await processScheduleNow(id);
      load();
    } catch (err) {
      alert(err.message);
    } finally {
      setActioning(null);
    }
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleString('tr-TR') : '-');

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-secondary mb-8">Yayın Planları</h1>

      {loading ? (
        <div className="animate-pulse h-64 bg-gray-100 rounded-2xl" />
      ) : schedules.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
          <Clock size={48} className="mx-auto mb-4 opacity-50" />
          <p>Henüz planlanmış blog yok.</p>
          <a href="/admin/blogs" className="text-primary mt-2 inline-block hover:underline">
            Blog Oluştur →
          </a>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Başlık</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Kategori</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Tip</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Durum</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Planlanan</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((s) => {
                  const status = STATUS_LABELS[s.status] || STATUS_LABELS.pending;
                  const Icon = status.icon;
                  return (
                    <motion.tr
                      key={s.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-gray-50 hover:bg-gray-50/50"
                    >
                      <td className="px-6 py-4 font-medium text-secondary">{s.title}</td>
                      <td className="px-6 py-4 text-gray-600">{s.category_name}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {s.schedule_type === 'instant' ? 'Anında' : s.schedule_type === 'hourly' ? 'Saatlik' : s.schedule_type === 'daily' ? 'Günlük' : 'Manuel'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${status.color}`}>
                          <Icon size={12} /> {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{formatDate(s.scheduled_at)}</td>
                      <td className="px-6 py-4">
                        {s.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleProcessNow(s.id)}
                              disabled={actioning === s.id}
                              className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
                            >
                              {actioning === s.id ? '...' : 'Şimdi Yayınla'}
                            </button>
                            <button
                              onClick={() => handleCancel(s.id)}
                              disabled={actioning === s.id}
                              className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                            >
                              İptal
                            </button>
                          </div>
                        )}
                        {s.status === 'failed' && s.error_message && (
                          <span className="text-red-600 text-xs" title={s.error_message}>
                            {s.error_message.slice(0, 40)}...
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSchedules;
