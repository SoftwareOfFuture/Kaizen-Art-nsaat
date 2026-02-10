import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Building2, Eye, Heart, Target, Zap, ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';


const SectionTitle = ({ subtitle, title, light = false }) => (
    <div className="mb-16">
        <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-xs font-bold uppercase tracking-[0.5em] mb-4 block ${light ? 'text-primary-contrast' : 'text-primary'}`}
        >
            {subtitle}
        </motion.span>
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-6xl font-serif font-medium ${light ? 'text-white' : 'text-secondary'} tracking-tight leading-tight`}
        >
            <span dangerouslySetInnerHTML={{ __html: title }} />
        </motion.h2>
    </div>
);

const BlueprintBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#c5d1c908_1px,transparent_1px),linear-gradient(to_bottom,#c5d1c908_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="absolute inset-0 bg-radial-gradient from-primary-contrast/5 via-transparent to-transparent"></div>
    </div>
);

const DimensionalHero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 40;
        const y = (clientY / innerHeight - 0.5) * 40;
        setMousePos({ x, y });
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative h-screen bg-secondary flex items-center overflow-hidden"
        >
            {/* 1. DEPTH LAYER 0: Technical Blueprint Grid */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#c5d1c908_1px,transparent_1px),linear-gradient(to_bottom,#c5d1c908_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            </div>

            {/* 2. DEPTH LAYER 1: Floating Geometric Glass Panes with Images - Hidden on Mobile */}
            <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
                {[
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1000&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop"
                ].map((url, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            x: mousePos.x * (i + 1) * 0.5,
                            y: mousePos.y * (i + 1) * 0.5,
                            rotate: mousePos.x * 0.05
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 30 }}
                        className="absolute border border-white/10 bg-secondary/20 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden"
                        style={{
                            width: `${380 - i * 40}px`,
                            height: `${500 - i * 40}px`,
                            top: `${15 + i * 6}%`,
                            left: `${50 + i * 8}%`,
                        }}
                    >
                        <div className="absolute inset-0 z-0">
                            <img
                                src={url}
                                alt=""
                                className="w-full h-full object-cover opacity-60 grayscale-[40%] hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-secondary/10 hover:bg-transparent transition-colors"></div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 3. DEPTH LAYER 2: Main Subject Cutout / Central Focus */}
            <div className="container mx-auto px-6 relative z-20 pointer-events-none">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                        className="lg:col-span-8"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-[1px] bg-primary-contrast"></div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-primary-contrast">Multi-Layered Architecture</span>
                        </div>

                        <h1 className="text-5xl md:text-[8rem] font-serif font-medium text-white leading-tight md:leading-[0.8] tracking-tighter mb-8 md:mb-12">
                            Derinlik & <br />
                            <span className="text-primary-contrast italic font-light pl-0 md:pl-12">Boyut</span>
                        </h1>

                        <div className="max-w-md border-l border-white/10 pl-10 ml-2">
                            <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed mb-12 italic">
                                Sadece binaları değil, onların arkasındaki teknik ve estetik katmanları tasarlıyoruz.
                            </p>

                            <div className="flex gap-8 md:gap-16">
                                <div>
                                    <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 underline decoration-primary-contrast/30 underline-offset-8 transition-all hover:decoration-primary-contrast">05</div>
                                    <div className="text-[8px] md:text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold">Yıl Tecrübe</div>
                                </div>
                                <div>
                                    <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 underline decoration-primary-contrast/30 underline-offset-8 transition-all hover:decoration-primary-contrast">2019</div>
                                    <div className="text-[8px] md:text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold">Kuruluş</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
};

const About = () => {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="bg-white min-h-screen font-sans selection:bg-primary/30">

            <DimensionalHero />

            {/* 2. NARRATIVE PHILOSOPHY SECTION */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full border-l border-gray-50 -z-0"></div>
                <div className="absolute top-40 left-10 w-4 h-4 text-gray-50 group hover:text-primary transition-colors">
                    <div className="text-[8px] font-mono rotate-90 origin-left">TECH_SPEC_004</div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-5 lg:sticky lg:top-32 mb-20 lg:mb-0">
                            <SectionTitle subtitle="Logos & Ethos" title="Bir Felsefenin <br/><span class='text-primary italic font-light'>Teknik İnşası</span>" />
                            <p className="text-gray-600 text-lg leading-relaxed mb-10 font-light max-w-md">
                                Kaizen, Japonca'da "sürekli iyileştirme" anlamına gelir. Bizim için bu sadece bir kelime değil, her teknik hesaplamada ve estetik kararda yaşadığımız bir disiplindir.
                            </p>

                            <div className="space-y-12">
                                {[
                                    { icon: <Zap />, label: "Hücresel Dinamizm", id: "DY-01", text: "Değişime ve yeniliğe hızla adapte olan, modüler mühendislik yapıları." },
                                    { icon: <Heart />, label: "Estetik Algoritma", id: "EA-02", text: "Her detayı bir sanatçı titizliği ve matematiksel oranla işleme." },
                                    { icon: <Target />, label: "Keskin Projeksiyon", id: "KP-03", text: "Şehrin siluetinde kalıcı, ikonik ve sürdürülebilir değerler." }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className="flex gap-8 group"
                                    >
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-sm">
                                                {item.icon}
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 text-[10px] font-mono text-primary group-hover:text-secondary bg-white px-2 rounded-md shadow-sm border border-gray-100">
                                                {item.id}
                                            </div>
                                        </div>
                                        <div className="border-b border-gray-50 pb-8 flex-grow">
                                            <h4 className="text-xl font-bold text-secondary mb-1">{item.label}</h4>
                                            <p className="text-sm text-gray-400 font-light leading-relaxed">{item.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8 relative">
                                <div className="absolute -top-10 right-0 text-[10px] font-mono text-gray-200 uppercase tracking-widest hidden md:block">Reference_Frame_V2.01</div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="aspect-[4/5] overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative group"
                                >
                                    <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000" alt="" />
                                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity"></div>
                                </motion.div>

                                <div className="space-y-8 pt-0 md:pt-16">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        className="aspect-square overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative group"
                                    >
                                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                                    </motion.div>

                                    <div className="p-8 md:p-10 bg-secondary rounded-[2.5rem] md:rounded-[3rem] text-white relative overflow-hidden group">
                                        <div className="absolute -right-4 -top-4 text-[80px] md:text-[100px] font-serif font-bold text-white/[0.03] group-hover:text-primary-contrast/[0.05] transition-colors">"</div>
                                        <Quote className="mb-6 md:mb-8 text-primary-contrast" size={28} md:size={32} />
                                        <p className="text-lg md:text-xl font-serif italic font-light mb-6 md:mb-8 leading-relaxed">"Biz bina yapmıyoruz; insanların hikayelerine ev sahipliği yapacak dijital hassasiyette mekanlar tasarlıyoruz."</p>
                                        <div className="flex items-center gap-4">
                                            <div className="h-[1px] w-8 md:w-12 bg-primary-contrast"></div>
                                            <div className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-primary-contrast">Studio Consensus</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CORE PILLARS SECTION - MODERN ARCHITECTURAL MODULES */}
            <section className="py-40 bg-secondary relative overflow-hidden">
                <BlueprintBackground />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mb-24">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-[10px] font-bold uppercase tracking-[0.8em] text-primary-contrast mb-6 block"
                        >
                            Engineering Philosophy
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] tracking-tight">
                            Mühendisliğin Zarif <br />
                            <span className="text-primary-contrast italic font-light">Disiplini</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <Building2 />,
                                title: "Statik Rijitlik",
                                desc: "Sismik verilerle senkronize mühendislik çözümleriyle Antalya'nın geleceğini inşa ediyoruz.",
                                num: "01"
                            },
                            {
                                icon: <Eye />,
                                title: "Parametrik Tasarım",
                                desc: "Modern tasarım dilini algoritmik estetikle buluşturarak benzersiz habitatlar yaratıyoruz.",
                                num: "02"
                            },
                            {
                                icon: <Target />,
                                title: "Eko-Mühendislik",
                                desc: "Sürdürülebilir malzeme seçimi ve enerji verimliliği ile ekolojik ayak izimizi minimize ediyoruz.",
                                num: "03"
                            }
                        ].map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.2 }}
                                className="group relative p-12 bg-white/[0.01] border border-white/5 rounded-[2rem] hover:bg-white/[0.03] transition-all duration-700"
                            >
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white mb-12 border border-white/20 group-hover:scale-110 group-hover:bg-primary-contrast group-hover:text-secondary group-hover:border-primary-contrast transition-all duration-700 shadow-xl">
                                        {React.cloneElement(pillar.icon, { size: 28 })}
                                    </div>

                                    <h3 className="text-2xl font-serif text-white mb-6 tracking-wide group-hover:translate-x-2 transition-transform duration-500">{pillar.title}</h3>
                                    <p className="text-white/40 font-light leading-relaxed text-lg group-hover:text-white/60 transition-colors duration-500">{pillar.desc}</p>
                                </div>

                                <div className="mt-12 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-primary-contrast to-transparent transition-all duration-1000" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CALL TO ACTION */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="absolute inset-x-0 h-[100px] top-1/4 bg-primary/5 -skew-y-3 pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-block px-4 py-1 border border-primary/20 text-primary text-[10px] uppercase tracking-[0.8em] mb-12 rounded-full"
                            >
                                Final_Protocol_Init
                            </motion.span>

                            <h2 className="text-4xl md:text-9xl font-serif font-medium text-secondary mb-12 md:mb-16 leading-tight tracking-tighter">
                                Geleceğe Bir <br />
                                <span className="text-primary italic font-light relative px-2 md:px-4">
                                    İmza Bırakın
                                    <span className="absolute -z-10 bottom-0 left-0 w-full h-[0.3em] bg-primary/5"></span>
                                </span>
                            </h2>

                            <p className="text-xl md:text-2xl text-gray-400 font-light mb-20 max-w-2xl mx-auto leading-relaxed italic">
                                Hayallerinizdeki habitatı inşa etmek için dijital hassasiyetteki ekibimizle tanışmaya hazır mısınız?
                            </p>

                            <Link
                                to="/contact"
                                className="group relative inline-flex items-center gap-6 md:gap-10 px-8 md:px-20 py-6 md:py-10 bg-secondary text-white rounded-full overflow-hidden transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(20,20,20,0.4)] active:scale-95"
                            >
                                <span className="relative z-10 text-[9px] md:text-[11px] font-mono font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] group-hover:tracking-[0.8em] transition-all">İletişime Geçin</span>
                                <div className="relative z-10 p-2 md:p-3 bg-white/10 rounded-full group-hover:bg-primary group-hover:rotate-45 transition-all duration-500">
                                    <ArrowRight size={20} md:size={24} />
                                </div>
                                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out -z-0"></div>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute top-20 left-20 text-[8px] font-mono text-gray-200 hidden lg:block uppercase tracking-widest">Protocol: KAIZEN_ART.X01</div>
            </section>

        </div>
    );
};

export default About;
