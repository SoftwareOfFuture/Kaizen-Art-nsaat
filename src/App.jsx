import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import MainLayout from './components/MainLayout'
import { AdminProvider } from './contexts/AdminContext'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import Blog from './pages/blog/Blog'
import BlogPost from './pages/blog/BlogPost'
import AdminLayout from './pages/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBlogCreate from './pages/admin/AdminBlogCreate'
import AdminCategories from './pages/admin/AdminCategories'
import AdminSchedules from './pages/admin/AdminSchedules'
import './index.css'

// App core
function App() {
  return (
    <Router>
      <AdminProvider>
        <ScrollToTop />
        <Routes>
          {/* Admin panel */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogCreate />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="schedules" element={<AdminSchedules />} />
          </Route>

          {/* Ana site */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<div className="pt-32 text-center"><p className="text-gray-500">Sayfa bulunamadı</p></div>} />
          </Route>
        </Routes>
      </AdminProvider>
    </Router>
  );
}

export default App;
