/**
 * Blog liste sayfası
 * SEO uyumlu, lazy load destekli
 */
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, FolderOpen, ChevronRight, ArrowRight } from 'lucide-react';
import { getBlogs, getCategories } from '../../api/blogApi';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const [blogsRes, catsRes] = await Promise.all([
          getBlogs({ page, category: category || undefined }),
          getCategories(),
        ]);
        setBlogs(blogsRes.blogs || []);
        setPagination(blogsRes.pagination || null);
        setCategories(catsRes || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [page, category]);

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-primary/20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-white/30 font-bold text-[9px] uppercase tracking-[0.6em] mb-12 block">
              Kaizen Art Blog
            </span>
            <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight">
              <span className="text-white block mb-2">Blog &</span>
              <span className="text-primary-light/80 italic font-light">İçerikler</span>
            </h1>
            <p className="text-white/50 mt-8 max-w-2xl mx-auto text-lg font-light">
              Mimarlık, inşaat ve tasarım dünyasından güncel yazılar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Kategori filtresi */}
      <section className="sticky top-20 z-30 bg-white/90 backdrop-blur border-b border-gray-100 py-4">
        <div className="container mx-auto px-6 flex flex-wrap gap-4 justify-center">
          <Link
            to="/blog"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !category ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tümü
          </Link>
          {categories.filter((c) => c.blog_count > 0).map((c) => (
            <Link
              key={c.id}
              to={category === c.slug ? '/blog' : `/blog?category=${c.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === c.slug ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c.name} ({c.blog_count})
            </Link>
          ))}
        </div>
      </section>

      {/* Blog grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-gray-100 rounded-2xl mb-6" />
                  <div className="h-6 bg-gray-100 rounded w-3/4 mb-4" />
                  <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Henüz blog yazısı yok.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
                hidden: {},
              }}
            >
              {blogs.map((post, idx) => (
                <motion.article
                  key={post.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-6">
                        <span className="text-white text-sm font-medium flex items-center gap-2">
                          Oku <ChevronRight size={18} />
                        </span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 text-secondary text-[10px] font-bold uppercase tracking-wider rounded-full">
                          {post.category_name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(post.published_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FolderOpen size={12} /> {post.category_name}
                      </span>
                    </div>
                    <h2 className="text-xl font-serif font-bold text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2 font-light">{post.excerpt}</p>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-16">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Önceki
              </button>
              <span className="px-4 py-2 text-gray-600">
                {page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page >= pagination.totalPages}
                className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Sonraki
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
