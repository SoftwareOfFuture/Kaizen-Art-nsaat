import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock, ChevronRight, ChevronLeft, Waves, Compass, RefreshCw, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutMainImg from '../assets/about-main.jpg';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2000&auto=format&fit=crop",
    title: "Sanat ve Yaşamın",
    subtitle: "Buluşması",
    desc: "Estetik ve fonksiyonun mükemmel uyumu ile yaşam alanlarınızı yeniden tasarlıyoruz.",
    tag: "Estetik • Denge • Süreklilik"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    title: "Akışkan Hatlar",
    subtitle: "Kalıcı Denge",
    desc: "Doğayla bütünleşen, sınırları kaldıran ve huzur veren mekanlar yaratıyoruz.",
    tag: "Doğa • Işık • Ferahlık"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
    title: "Doğal Ritimle",
    subtitle: "Şekillenen Yaşam",
    desc: "Mimari, doğanın akışını taklit ederek insan yaşamına uyum sağlar. Organik formlar ve sade çizgilerle şekillenen deneyimler.",
    tag: "Organik • Modern • Zamansız"
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="pt-0 overflow-x-hidden">
      {/* Hero Slider Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-secondary">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/40 to-secondary/90"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 border border-white/20 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium tracking-widest mb-6 uppercase">
                {slides[currentSlide].tag}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold mb-6 leading-tight tracking-tight">
                {slides[currentSlide].title} <br />
                <span className="text-primary-light font-light">{slides[currentSlide].subtitle}</span>
              </h1>
              <p className="max-w-2xl mx-auto text-gray-200 text-lg md:text-xl mb-10 font-light leading-relaxed">
                {slides[currentSlide].desc}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/projects"
                  className="px-8 py-4 bg-primary text-white rounded-sm hover:bg-primary-light transition-all flex items-center gap-2 group shadow-lg shadow-primary/20"
                >
                  Projelerimizi Keşfedin
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-sm hover:bg-white hover:text-secondary transition-all"
                >
                  Ücretsiz Keşif
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-2 rounded-full border border-white/20 text-white/50 hover:bg-white hover:text-secondary transition-all z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-2 rounded-full border border-white/20 text-white/50 hover:bg-white hover:text-secondary transition-all z-20"
        >
          <ChevronRight size={24} />
        </button>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Design Philosophy Section - Redesigned */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Subtle Brand Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="philosophy-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#philosophy-pattern)" />
          </svg>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Felsefemiz</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-6 leading-tight">
              Akışkan Hatlar, <span className="text-primary font-light italic">Kalıcı Denge</span>
            </h2>
            <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Waves className="w-8 h-8" />,
                title: "Akışkan Hatlar",
                subtitle: "Zen Estetiği",
                desc: "Mekanların doğal akışını bozmadan, insan ergonomisiyle uyumlu organik formlar tasarlıyoruz. Sert köşeler yerine, yaşam enerjisinin serbestçe dolaştığı hatlar.",
                delay: 0
              },
              {
                icon: <Compass className="w-8 h-8" />,
                title: "Kalıcı Denge",
                subtitle: "Mühendislik Vizyonu",
                desc: "Sanatsal dokunuşlarımızı milimetrik mühendislik hesaplarıyla dengeliyoruz. Estetik olanın aynı zamanda en sağlam ve güvenli olduğu bir denge arayışı.",
                delay: 0.2
              },
              {
                icon: <RefreshCw className="w-8 h-8" />,
                title: "Sürekli İyileştirme",
                subtitle: "Kaizen Ruhu",
                desc: "Her yeni projeyi bir öncekinden daha iyiye götürme tutkusu. Gelişimin asla durmadığı, her detayda mükemmelliğin arandığı bir tasarım yolculuğu.",
                delay: 0.4
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.7, ease: "easeOut" }}
                className="group relative p-10 rounded-3xl bg-white border border-gray-100 hover:border-primary/20 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
              >
                {/* Background Accent */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 mb-8 text-primary bg-secondary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                    {item.icon}
                  </div>
                  <div className="mb-4">
                    <span className="text-primary-light text-[10px] font-bold uppercase tracking-widest">{item.subtitle}</span>
                    <h3 className="text-2xl font-bold text-secondary mt-1">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-700 transition-colors">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Border Decoration */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium About Section (Compacted) */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>

        <div className="max-w-[1750px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* Left Column: Image Container */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-3xl lg:ml-auto"
            >
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-xl group">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img
                  src={aboutMainImg}
                  alt="Kaizen Art Team"
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-xl">
                  <div className="text-primary text-2xl font-serif font-bold mb-0.5">2019</div>
                  <div className="text-white/80 text-[10px] font-medium uppercase tracking-widest">Kuruluş Yılı</div>
                </div>
              </div>
              <div className="absolute -top-8 -left-8 w-32 h-32 border-t-4 border-l-4 border-primary/20 rounded-tl-[3rem] -z-10"></div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[110%] opacity-10 -z-20 pointer-events-none">
                <img src="https://www.transparenttextures.com/patterns/white-marble.png" alt="" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Right Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <span className="inline-block py-1.5 px-3 bg-secondary/5 text-secondary font-bold text-[10px] uppercase tracking-[0.2em] mb-4 border-l-4 border-primary">
                  Hakkımızda
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4 leading-tight">
                  Mimarlık ve Sanatı <br />
                  <span className="text-primary font-light italic">Mühendislikle Buluşturuyoruz</span>
                </h2>
                <div className="space-y-3 text-gray-600 text-base font-light leading-relaxed">
                  <p>
                    <span className="text-secondary font-bold">Kaizen Art</span>, Antalya merkezli, dinamik ve vizyoner kadrosuyla 2019 yılından günümüze estetik ve mühendisliği harmanlamaktadır.
                  </p>
                  <p>
                    "Gökyüzü mavi kalsın" mottosuyla doğaya saygılı, sürdürülebilir ve sanatsal değeri olan modern yapılar inşa ediyoruz.
                  </p>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                {[
                  { label: "Mühendislik Uzmanlığı", percent: 99 },
                  { label: "Kalite Odaklı Yaklaşım", percent: 99 },
                  { label: "Zamanında Teslimat", percent: 99 },
                  { label: "Müşteri Memnuniyeti", percent: 98 }
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-secondary font-bold text-[11px] tracking-wide uppercase">{item.label}</span>
                      <span className="text-gray-400 text-[10px] font-mono">{item.percent}%</span>
                    </div>
                    <div className="h-[3px] w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (idx * 0.1) }}
                        className="h-full bg-secondary relative"
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary"></div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-4 text-secondary font-bold group hover:text-primary transition-colors"
              >
                Hikayemizin Tamamını Gör
                <div className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-secondary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Görüşler</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">Müşteri Deneyimleri</h2>
            <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full"></div>
          </motion.div>

          {/* Testimonials 3D Slider */}
          <div className="relative max-w-5xl mx-auto h-[480px] md:h-[450px] flex items-center justify-center">
            <div className="relative w-full flex items-center justify-center">
              {[
                {
                  id: 1,
                  name: "Selin Aydın",
                  location: "Keçiören, Ankara",
                  text: "Kiralalık istediğimiz daire için çok hızlı ve etkili çözümler sundular. Danışmanlarının bilgisi ve yaklaşımı gerçekten çok başarılıydı.",
                  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                },
                {
                  id: 2,
                  name: "Ali Yıldız",
                  location: "Çankaya, Ankara",
                  text: "Evi satış sürecinde çok profesyonel ve ilgiliydiler. Süreç boyunca her adımda bilgilendirildik. Çok memnun kaldık, teşekkür ederiz.",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
                },
                {
                  id: 3,
                  name: "Mehmet Kaya",
                  location: "Yenimahalle, Ankara",
                  text: "Tam kapsamlı bir hizmet aldık. Piyasa analizi ve lokasyon önerileri sayesinde çok karlı bir yatırım yaptık. Teşekkürler!",
                  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                },
                {
                  id: 4,
                  name: "Ayşe Demir",
                  location: "Etimesgut, Ankara",
                  text: "Ev bakarken titiz davrandılar. Bütçemize uygun, ihtiyaçlarımızı karşılayan mükemmel bir ev buldular. Herkese tavsiye ederim.",
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
                }
              ].map((item, idx) => {
                const isActive = activeTestimonial === idx;
                const isLeft = (activeTestimonial - 1 + 4) % 4 === idx;
                const isRight = (activeTestimonial + 1) % 4 === idx;

                let positionClass = "opacity-0 scale-75 blur-sm translate-x-0 z-0 pointer-events-none";
                if (isActive) positionClass = "opacity-100 scale-100 md:scale-110 z-30 translate-x-0 shadow-2xl";
                else if (isLeft) positionClass = "opacity-40 scale-75 md:scale-90 -translate-x-[40%] md:-translate-x-[60%] lg:-translate-x-[75%] z-10 blur-[2px] cursor-pointer pointer-events-auto";
                else if (isRight) positionClass = "opacity-40 scale-75 md:scale-90 translate-x-[40%] md:translate-x-[60%] lg:translate-x-[75%] z-10 blur-[2px] cursor-pointer pointer-events-auto";

                return (
                  <motion.div
                    key={item.id}
                    className={`absolute w-full max-w-[280px] sm:max-w-sm md:max-w-md bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl transition-all duration-700 ease-in-out ${positionClass}`}
                    onClick={() => setActiveTestimonial(idx)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="flex gap-1 mb-6 text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                      <Quote className="text-secondary/5 absolute top-10 left-10" size={60} />
                      <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed italic mb-8 relative z-10">
                        "{item.text}"
                      </p>
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 mb-3 shadow-md">
                          <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-secondary font-bold text-base">{item.name}</h4>
                        <span className="text-gray-400 text-xs font-medium">{item.location}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-40 px-2 lg:-px-10">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + 4) % 4)}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow shadow-black/5 border border-gray-100 flex items-center justify-center text-secondary hover:bg-white hover:text-primary transition-all pointer-events-auto"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % 4)}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow shadow-black/5 border border-gray-100 flex items-center justify-center text-secondary hover:bg-white hover:text-primary transition-all pointer-events-auto"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2.5 mt-10">
            {[0, 1, 2, 3].map((dot) => (
              <button
                key={dot}
                onClick={() => setActiveTestimonial(dot)}
                className={`transition-all duration-500 rounded-full h-1.5 ${activeTestimonial === dot ? 'w-8 bg-primary shadow-sm shadow-primary/30' : 'w-1.5 bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned (Compacted) */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
            alt="Architecture Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/80 to-secondary/95"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-[1750px] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 lg:p-14 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary-light rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                    Kaizen Art Engineering
                  </motion.div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight md:leading-[1.2]">
                    Hayalinizdeki <span className="text-primary-light italic font-light">Yaşam Alanını</span> <br className="hidden md:block" />
                    Birlikte İnşa Edelim
                  </h2>

                  <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                    Siz hayal edin, biz <span className="text-white font-medium italic">mühendislik</span> ve <span className="text-primary-light font-medium italic">sanatla</span> gerçeğe dönüştürelim.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                    <Link
                      to="/contact"
                      className="group relative px-8 py-5 bg-primary text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Bizimle İletişime Geçin
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                    <Link
                      to="/projects"
                      className="px-8 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/20 transition-all duration-300 hover:border-white/40"
                    >
                      Projelerimizi İnceleyin
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:block lg:w-1/3 border-l border-white/10 pl-10">
                  <div className="space-y-8">
                    {[
                      { label: "Tamamlanan Proje", value: "150+" },
                      { label: "Mutlu Müşteri", value: "100%" },
                      { label: "Tasarım Ödülü", value: "12" }
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                      >
                        <div className="text-3xl font-serif font-bold text-primary-light mb-1">{stat.value}</div>
                        <div className="text-gray-400 text-[10px] font-medium tracking-[0.2em] uppercase">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
