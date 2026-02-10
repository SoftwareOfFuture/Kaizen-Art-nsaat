import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Home, Ruler, HardHat, PenTool, ArrowRight, Layout, Brush, Building,
  CheckCircle2, Waves, Compass, RefreshCw, Layers, Monitor, Paintbrush,
  ChevronRight, Box, Hexagon, Activity
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const SectionTitle = ({ subtitle, title, light = false, center = false }) => (
  <div className={`mb-24 ${center ? 'text-center' : ''}`}>
    <motion.span
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block ${light ? 'text-primary-contrast' : 'text-primary'}`}
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-7xl font-serif font-medium ${light ? 'text-white' : 'text-secondary'} tracking-tighter leading-none`}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  </div>
);

const Services = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const services = [
    {
      icon: <Home size={32} strokeWidth={1.5} />,
      title: "Lüks Rezidans Tasarımı",
      subtitle: "Sanatsal Yaşam Alanları",
      desc: "Mekanlarınızın ruhunu ortaya çıkaran, ergonomi ve estetiği milimetrik hesaplarla birleştiren tasarımlar.",
      features: ["3D Görselleştirme", "Malzeme Danışmanlığı", "Işık Analizi"],
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
      tag: "RESIDENTIAL"
    },
    {
      icon: <Building size={32} strokeWidth={1.5} />,
      title: "Kurumsal Alan Çözümleri",
      subtitle: "Prestijli Çalışma Alanları",
      desc: "İş yeriniz için verimliliği artıran ve markanızın prestijini yansıtan elit çalışma alanları.",
      features: ["Akustik Çözümler", "Ofis Ergonomisi", "Modern Aydınlatma"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      tag: "COMMERCIAL"
    },
    {
      icon: <RefreshCw size={32} strokeWidth={1.5} />,
      title: "Küratörlü Renovasyon",
      subtitle: "Mekansal Dönüşüm",
      desc: "Evinizi sadece yenilemiyoruz, ona yeni bir hayat veriyoruz. Kaizen felsefesiyle her köşede mükemmellik.",
      features: ["Maliyet Analizi", "Alt Yapı Modernizasyonu", "Bütünsel Tasarım"],
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      tag: "RENOVATION"
    },
    {
      icon: <Layers size={32} strokeWidth={1.5} />,
      title: "Mutfak & Banyo Stüdyosu",
      subtitle: "Fonksiyonel Zarafet",
      desc: "Evin en özel alanları için en son teknoloji ve en şık materyallerle hayata geçirilen projeler.",
      features: ["Özel Üretim", "Islak Zemin Çözümleri", "Akıllı Depolama"],
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
      tag: "STUDIO"
    }
  ];

  return (
    <div ref={containerRef} className="bg-white min-h-screen font-sans selection:bg-primary/20 overflow-x-hidden">

      {/* 1. MINIMALIST HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-secondary">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-30"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary"></div>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-primary-contrast font-bold text-[10px] uppercase tracking-[0.8em] mb-8 block">Hizmetlerimiz & Uzmanlık</span>
            <h1 className="text-5xl md:text-[9rem] font-serif font-medium text-white mb-8 md:mb-12 leading-none tracking-tighter">
              Vizyonu <br />
              <span className="text-primary-contrast italic font-light">İnşa Ediyoruz</span>
            </h1>
            <p className="text-white/40 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed italic">
              "Sadece binaları değil, onların arkasındaki teknik ve estetik katmanları tasarlıyoruz."
            </p>
          </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. REFINED SERVICE STACK */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Portfolio of Expertise" title="Yaşam Alanlarınıza <br/> <span class='text-primary italic font-light'>İmzalı Bir Dokunuş</span>" />

          <div className="space-y-48">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className={`flex flex-col lg:flex-row gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] aspect-[16/10] shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-1000" />
                  </div>

                  {/* Floating Icon */}
                  <div className={`absolute -bottom-10 h-28 w-28 bg-white rounded-[2rem] flex items-center justify-center text-primary shadow-3xl z-20 hidden lg:flex transition-transform duration-700 group-hover:-translate-y-4 ${idx % 2 === 0 ? '-right-10' : '-left-10'}`}>
                    {service.icon}
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.6em] mb-4 block">
                    {service.subtitle}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif text-secondary mb-8 leading-tight">{service.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed mb-10 text-xl italic">
                    "{service.desc}"
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {service.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-4 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest group-hover/item:text-secondary transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate('/projects')}
                    className="group flex items-center gap-6"
                  >
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-white transition-all duration-500 group-hover:bg-primary group-hover:scale-110">
                      <ArrowRight size={20} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-secondary group-hover:translate-x-2 transition-transform">Projelerimiz</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SIMPLIFIED PROCESS */}
      <section className="py-40 bg-secondary relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center mb-32">
          <span className="text-primary-contrast font-bold text-[10px] uppercase tracking-[0.8em] mb-8 block">Workflow</span>
          <h2 className="text-5xl md:text-8xl font-serif text-white tracking-tighter">İşleyiş <span className="italic font-light text-primary-contrast">Disiplini</span></h2>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: <Hexagon size={28} />, title: "Keşif", desc: "Mekanı ve ihtiyaçları derinlemesine analiz ediyoruz." },
              { icon: <Box size={28} />, title: "Tasarım", desc: "Hayallerinizi 3D hassasiyette çizgiye döküyoruz." },
              { icon: <Activity size={28} />, title: "Uygulama", desc: "Mühendisliği yüksek disiplinle şantiyeye taşıyoruz." },
              { icon: <CheckCircle2 size={28} />, title: "Teslim", desc: "Mükemmel şekilde teslim edilmiş yeni habitatınız." }
            ].map((step, sidx) => (
              <motion.div
                key={sidx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sidx * 0.15 }}
                className="group p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:bg-white/[0.05] transition-all duration-700"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-primary-contrast mb-10 group-hover:bg-primary-contrast group-hover:text-secondary transition-all">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">{step.title}</h3>
                <p className="text-white/40 font-light leading-relaxed text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINAL CALL TO ACTION */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-9xl font-serif text-secondary mb-12 md:mb-16 tracking-tighter">
              Birlikte <br />
              <span className="text-primary italic font-light">Tasarlayalım</span>
            </h2>
            <button
              onClick={() => navigate('/contact')}
              className="px-10 md:px-20 py-6 md:py-10 bg-secondary text-white rounded-full font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] hover:bg-primary transition-all shadow-3xl hover:-translate-y-2 flex items-center justify-center gap-6 md:gap-10 mx-auto group"
            >
              İletişime Geçin
              <ArrowRight size={20} md:size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Services;
