import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, LayoutGrid, List, ChevronRight, Maximize2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'Villa', name: 'Villa' },
    { id: 'Rezidans', name: 'Rezidans' },
    { id: 'Ticari', name: 'Ticari' }
  ];

  const filteredProjects = projectsData.filter(project => {
    const query = searchQuery.toLocaleLowerCase('tr-TR');
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLocaleLowerCase('tr-TR').includes(query) ||
      project.location.toLocaleLowerCase('tr-TR').includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-primary/20 overflow-x-hidden">
      {/* 1. SOPHISTICATED HERO */}
      <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-white/30 font-bold text-[9px] uppercase tracking-[0.6em] mb-12 block text-center">
              PREMİUM PORTFOLİO — KAİZEN ART STUDİO
            </span>

            <div className="mb-16 px-4 overflow-hidden text-center">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.2] md:leading-tight tracking-tight">
                <span className="text-white block mb-2">
                  Küratörlük <span className="text-primary-light/40 italic font-light">&</span>
                </span>
                <span className="text-white">
                  Mimari <span className="text-primary-light/60 italic font-light">Vizyon</span>
                </span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 max-w-4xl mx-auto border-t border-white/5 pt-10 md:pt-12">
              <div className="md:border-r border-white/5 px-4 flex flex-col items-center">
                <span className="text-xl md:text-4xl font-serif text-white/90 mb-1 md:mb-2 block">40+</span>
                <span className="text-[8px] md:text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Project Delivery</span>
              </div>
              <div className="md:border-r border-white/5 px-4 flex flex-col items-center">
                <span className="text-xl md:text-4xl font-serif text-white/90 mb-1 md:mb-2 block">12+</span>
                <span className="text-[8px] md:text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Active Works</span>
              </div>
              <div className="px-4 flex flex-col items-center">
                <span className="text-xl md:text-4xl font-serif text-white/90 mb-1 md:mb-2 block">Antalya</span>
                <span className="text-[8px] md:text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Central Studio</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ambient Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.03] to-transparent"></div>
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </section>

      {/* 2. MINIMALIST FILTER CONTROL */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Categories */}
            <div className="flex items-center gap-2 md:gap-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`relative px-6 py-2 transition-all duration-500 overflow-hidden ${filter === cat.id ? 'text-secondary' : 'text-gray-400 hover:text-secondary'}`}
                >
                  <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">
                    {cat.name}
                  </span>
                  {filter === cat.id && (
                    <motion.div
                      layoutId="projectFilter"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search & Layout */}
            <div className="flex items-center gap-10">
              <div className="relative group flex items-center">
                <Search size={14} className="text-gray-300 group-focus-within:text-primary transition-colors mr-4" />
                <input
                  type="text"
                  placeholder="Proje Ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-b border-gray-100 py-1 text-[11px] font-bold uppercase tracking-[0.2em] focus:border-primary outline-none transition-all w-32 focus:w-48 placeholder:text-gray-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-0 text-gray-400 hover:text-primary transition-colors"
                  >
                    <Maximize2 size={12} className="rotate-45" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-6 border-l border-gray-100 pl-10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`transition-all ${viewMode === 'grid' ? 'text-primary' : 'text-gray-300 hover:text-secondary'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`transition-all ${viewMode === 'list' ? 'text-primary' : 'text-gray-300 hover:text-secondary'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REFINED GRID */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className={`grid gap-16 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link to={`/projects/${project.slug}`} className={`block h-full ${viewMode === 'list' ? 'flex flex-col md:flex-row gap-12 items-center' : ''}`}>

                      {/* Image Card */}
                      <div className={`relative overflow-hidden rounded-[2rem] bg-gray-50 aspect-[4/5] shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-black/10 ${viewMode === 'list' ? 'md:w-[40%] flex-shrink-0' : 'w-full mb-10'}`}>
                        <img
                          src={project.mainImage}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[1.5s] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700"></div>

                        {/* Minimal Tags */}
                        <div className="absolute top-8 left-8">
                          <div className="bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[9px] font-bold text-secondary uppercase tracking-[0.2em] shadow-sm">
                            {project.year}
                          </div>
                        </div>

                        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-75 group-hover:scale-100">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white">
                            <Maximize2 size={24} strokeWidth={1} />
                          </div>
                        </div>
                      </div>

                      {/* Info Stack */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                          <MapPin size={12} />
                          {project.location}
                        </div>

                        <h2 className="text-3xl font-serif text-secondary mb-6 leading-tight group-hover:text-primary transition-colors flex items-center justify-between">
                          {project.title}
                          <ChevronRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" size={20} />
                        </h2>

                        <p className="text-gray-400 font-light text-sm leading-relaxed mb-8 line-clamp-2 italic">
                          "{project.description}"
                        </p>

                        <div className="flex items-center gap-6">
                          <span className="h-[1px] w-8 bg-gray-100 group-hover:w-16 group-hover:bg-primary transition-all duration-700"></span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300 group-hover:text-secondary transition-colors">
                            Detayları Gör
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Aramanızla eşleşen proje bulunamadı.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setFilter('all'); }}
                    className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold hover:underline"
                  >
                    Filtreleri Temizle
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4. CALL TO ACTION ELITE */}
      <section className="py-40 bg-gray-50 relative overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="h-full w-full bg-[radial-gradient(#232831_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-primary font-bold text-[10px] uppercase tracking-[0.6em] mb-12 block">Harekete Geçin</span>
            <h2 className="text-5xl md:text-8xl font-serif text-secondary mb-16 leading-none tracking-tighter">
              Geleceği <br /><span className="text-primary italic font-light">Birlikte İnşa Edelim</span>
            </h2>

            <Link
              to="/contact"
              className="inline-flex items-center gap-12 px-16 py-8 bg-secondary text-white rounded-full group hover:shadow-2xl hover:shadow-black/20 transition-all hover:-translate-y-1"
            >
              <span className="text-xs font-bold uppercase tracking-[0.4em]">İletişime Geçin</span>
              <div className="p-3 bg-white/10 rounded-full group-hover:bg-primary transition-colors">
                <ArrowRight size={24} />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
