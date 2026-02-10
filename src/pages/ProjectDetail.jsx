import React, { useState, useRef } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Maximize2, X, MapPin } from 'lucide-react';
import { getProjectBySlug, projectsData } from '../data/projectsData';

const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = getProjectBySlug(slug);
    const [selectedImage, setSelectedImage] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    if (!project) {
        return <Navigate to="/projects" replace />;
    }

    const nextImage = () => setSelectedImage((prev) => (prev + 1) % project.gallery.length);
    const prevImage = () => setSelectedImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);

    return (
        <div ref={containerRef} className="bg-white min-h-screen font-sans selection:bg-primary/20">
            {/* 1. SOPHISTICATED HERO */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-secondary">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={project.mainImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="inline-block px-4 py-1 border border-white/30 text-white text-[10px] uppercase tracking-[0.6em] mb-8 rounded-full bg-white/5 backdrop-blur-sm">
                            {project.category}
                        </span>
                        <h1 className="text-5xl md:text-[8rem] font-serif font-medium text-white leading-tight md:leading-none tracking-tighter mb-8 shadow-sm">
                            {project.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-white/70 text-sm font-light tracking-widest uppercase">
                            <span className="flex items-center gap-2"><MapPin size={14} /> {project.location}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                            <span>{project.year}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Subtle Directional Hint */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-4"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
                </motion.div>
            </section>

            {/* 2. MODERN NARRATIVE */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-20 items-start">
                        <div className="lg:col-span-5">
                            <h2 className="text-3xl md:text-5xl font-serif text-secondary mb-8 md:mb-10 leading-tight">
                                Proje <br /><span className="text-primary italic font-light">Vizyonu</span>
                            </h2>
                            <p className="text-gray-500 text-xl font-light leading-relaxed mb-12 italic">
                                "{project.description}"
                            </p>
                            <div className="grid grid-cols-2 gap-8 py-10 border-t border-gray-100">
                                <div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Alan</div>
                                    <div className="text-2xl font-serif text-secondary">{project.area}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Durum</div>
                                    <div className="text-2xl font-serif text-secondary">{project.status}</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 hidden lg:block"></div>

                        <div className="lg:col-span-6 space-y-10">
                            <div className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-4">Öne Çıkan Özellikler</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {project.features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl group hover:bg-primary hover:text-white transition-all duration-500"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-white/40"></div>
                                        <span className="text-sm font-medium tracking-wide">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. LUXURY GALLERY GRID */}
            <section className="py-32 bg-gray-50 overflow-hidden">
                <div className="container mx-auto px-6 mb-20 text-center">
                    <span className="text-primary font-bold text-[10px] uppercase tracking-[0.6em] mb-4 block">Visual Story</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-secondary leading-tight">Proje <span className="italic font-light">Galerisi</span></h2>
                </div>

                <div className="container mx-auto px-6">
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {project.gallery.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 0.98 }}
                                transition={{ duration: 0.5 }}
                                className="relative group cursor-zoom-in rounded-[2rem] overflow-hidden shadow-xl"
                                onClick={() => {
                                    setSelectedImage(idx);
                                    setLightboxOpen(true);
                                }}
                            >
                                <img src={img} className="w-full h-auto object-cover" alt="" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} strokeWidth={1} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. STEAMLINED SPECS */}
            <section className="py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.6em] mb-6 block">Technical Data</span>
                                <h3 className="text-3xl md:text-4xl font-serif text-secondary mb-8 md:mb-12">Teknik <br /><span className="text-primary italic font-light">Spesifikasyonlar</span></h3>

                                <div className="space-y-4">
                                    {Object.entries(project.details).map(([key, value], idx) => (
                                        <div key={idx} className="flex items-center justify-between py-6 border-b border-gray-100 group">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                                                {key === 'rooms' ? 'Oda Sayısı' :
                                                    key === 'bathrooms' ? 'Banyo' :
                                                        key === 'parking' ? 'Otopark' :
                                                            key === 'garden' ? 'Bahçe' :
                                                                key === 'floor' ? 'Kat' :
                                                                    key === 'ceiling' ? 'Yükseklik' : key}
                                            </span>
                                            <span className="text-xl font-serif text-secondary">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-3xl bg-gray-100"
                            >
                                <img
                                    src={project.gallery[1] || project.mainImage}
                                    className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                                    alt=""
                                />
                            </motion.div>
                        </div>

                        <div className="mt-20 text-center">
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-12 py-6 bg-secondary text-white rounded-full font-bold text-xs uppercase tracking-[0.4em] hover:bg-primary transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-4 mx-auto group"
                            >
                                Teklif Dosyası İste
                                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors">
                            <X size={32} strokeWidth={1} />
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center gap-4">
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="hidden md:block p-4 text-white/30 hover:text-white transition-colors"
                            >
                                <ChevronLeft size={64} strokeWidth={1} />
                            </button>

                            <motion.img
                                key={selectedImage}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                src={project.gallery[selectedImage]}
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg"
                            />

                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="hidden md:block p-4 text-white/30 hover:text-white transition-colors"
                            >
                                <ChevronRight size={64} strokeWidth={1} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* BACK BUTTON */}
            <Link
                to="/projects"
                className="fixed bottom-10 left-10 z-[60] w-14 h-14 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all duration-500 hover:scale-110"
            >
                <ArrowLeft size={20} />
            </Link>
        </div>
    );
};

export default ProjectDetail;
