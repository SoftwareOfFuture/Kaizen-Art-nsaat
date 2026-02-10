/**
 * Blog API istemcisi
 * Production: VITE_API_URL veya /api (aynı domain)
 */
const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'İstek başarısız');
  return data;
}

// Public
export const getCategories = () => request('/categories');
export const getCategoryBySlug = (slug) => request(`/categories/${slug}`);
export const getBlogs = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return request(`/blogs${q ? '?' + q : ''}`);
};
export const getBlogBySlug = (slug) => request(`/blogs/post/${slug}`);

// Auth
export const login = (username, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });
export const logout = () => request('/auth/logout', { method: 'POST' });
export const getMe = () => request('/auth/me');

// Admin - kategori (credentials ile)
export const getCategoriesAdmin = () => request('/categories?admin=1');
export const createCategory = (data) =>
  request('/categories', { method: 'POST', body: JSON.stringify(data) });
export const updateCategory = (id, data) =>
  request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteCategory = (id) =>
  request(`/categories/${id}`, { method: 'DELETE' });

// Admin - blog
export const getBlogsAdmin = (params) => {
  const q = new URLSearchParams(params).toString();
  return request(`/blogs/admin${q ? '?' + q : ''}`);
};
export const createBlog = (data) =>
  request('/blogs', { method: 'POST', body: JSON.stringify(data) });
export const deleteBlog = (id) =>
  request(`/blogs/${id}`, { method: 'DELETE' });

// Admin - schedule
export const getSchedules = (params) => {
  const q = new URLSearchParams(params).toString();
  return request(`/admin/schedules${q ? '?' + q : ''}`);
};
export const cancelSchedule = (id) =>
  request(`/admin/schedules/${id}/cancel`, { method: 'POST' });
export const processScheduleNow = (id) =>
  request(`/admin/schedules/${id}/process-now`, { method: 'POST' });
