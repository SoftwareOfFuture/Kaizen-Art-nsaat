/**
 * Admin oturum context
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe, logout as apiLogout } from '../api/blogApi';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      setUser(null);
    }
  };

  return (
    <AdminContext.Provider value={{ user, loading, logout, setUser }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
