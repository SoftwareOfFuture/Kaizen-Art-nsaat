/**
 * Blog yazısı detay sayfası
 * Schema.org BlogPosting, SEO meta
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, FolderOpen, ArrowLeft } from 'lucide-react';
import { getBlogBySlug } from '../../api/blogApi';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogBySlug(slug)
      .then(setPost)
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-64 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center">
        <p className="text-gray-500">Blog yazısı bulunamadı.</p>
        <Link to="/blog" className="text-primary mt-4 inline-block hover:underline">
          ← Bloğa dön
        </Link>
      </div>
    );
  }

  // SEO: title ve meta
  useEffect(() => {
    document.title = post.meta_title || post.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', post.meta_description || post.excerpt);
    return () => { document.title = 'KAIZEN ART | İnşaat & Mühendislik'; };
  }, [post]);

  // Schema.org BlogPosting (JSON-LD)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: { '@type': 'Organization', name: 'Kaizen Art İnşaat & Mühendislik' },
    publisher: {
      '@type': 'Organization',
      name: 'Kaizen Art İnşaat & Mühendislik',
      logo: { '@type': 'ImageObject', url: 'https://kaizenart.com.tr/logo.png' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article className="bg-white min-h-screen font-sans selection:bg-primary/20">
        <div className="container mx-auto px-6 max-w-3xl pt-32 pb-24">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-12 transition-colors"
          >
            <ArrowLeft size={18} /> Bloğa dön
          </Link>

          <header className="mb-12">
            <Link
              to={`/blog?category=${post.category_slug}`}
              className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-6"
            >
              {post.category_name}
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-500 text-sm">
              <span className="flex items-center gap-2">
                <Calendar size={16} /> {formatDate(post.published_at)}
              </span>
              <span className="flex items-center gap-2">
                <FolderOpen size={16} /> {post.category_name}
              </span>
            </div>
          </header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="blog-content text-secondary [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1 [&_a]:text-primary [&_a]:underline hover:[&_a]:no-underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </>
  );
};

export default BlogPost;
