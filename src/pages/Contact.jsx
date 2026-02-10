import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Facebook, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Komple Ev Tadilatı',
    message: ''
  });

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary/20 overflow-x-hidden">
      {/* 1. SOPHISTICATED HERO */}
      <section className="relative pt-44 pb-32 bg-secondary overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-primary-contrast font-bold text-[10px] uppercase tracking-[0.8em] mb-8 block">İletişim & Vizyon</span>
            <h1 className="text-5xl md:text-[8rem] font-serif font-medium text-white mb-12 leading-none tracking-tighter">
              Bize <br />
              <span className="italic font-light text-primary-contrast">Ulaşın</span>
            </h1>
            <p className="text-white/30 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto italic border-t border-white/5 pt-12">
              "Fikirlerinizi teknik birer başyapıta dönüştürmek için Antalya stüdyomuzda sizi bekliyoruz."
            </p>
          </motion.div>
        </div>

        {/* Subtle Ambient Background */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.03] to-transparent"></div>
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </section>

      {/* 2. REFINED INTERACTION GRID */}
      <section className="py-24 bg-gray-50/50 relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1.5" fill="#405045" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-pattern)" />
          </svg>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-1/3 h-1/2 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Intel Sidebar */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="py-10"
              >
                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.6em] mb-12 block">İletişim Kanalları</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-secondary mb-16 leading-tight">
                  Vizyonunuzu <br />
                  <span className="text-primary italic font-light">Gerçekliğe Dönüştürelim</span>
                </h2>

                <div className="space-y-12">
                  <div className="group flex flex-col gap-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Telefon</span>
                    <a href="tel:+902120000000" className="text-2xl md:text-3xl font-serif text-secondary group-hover:text-primary transition-all duration-300">+90 212 000 00 00</a>
                  </div>

                  <div className="group flex flex-col gap-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Kurumsal E-Posta</span>
                    <a href="mailto:info@kaizenart.com.tr" className="text-2xl md:text-3xl font-serif text-secondary group-hover:text-primary transition-all duration-300">info@kaizenart.com.tr</a>
                  </div>

                  <div className="group flex flex-col gap-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Merkez Stüdyo</span>
                    <p className="text-2xl md:text-3xl font-serif text-secondary leading-snug italic font-light">
                      Liman Mahallesi, Atatürk Bulvarı<br />
                      Konyaaltı, Antalya
                    </p>
                  </div>
                </div>

                {/* Social Framing */}
                <div className="pt-20 flex items-center gap-8">
                  {[Instagram, Linkedin, Facebook].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:shadow-lg transition-all duration-300">
                      <Icon size={20} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-gray-200/50 relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100%] pointer-events-none"></div>

                <form className="space-y-10 relative z-10">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Tam İsim</label>
                      <input type="text" className="bg-transparent border-b border-gray-100 py-3 text-secondary focus:border-primary outline-none transition-all placeholder:text-gray-300 font-serif text-xl" placeholder="Adınız Soyadınız" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Telefon</label>
                      <input type="tel" className="bg-transparent border-b border-gray-100 py-3 text-secondary focus:border-primary outline-none transition-all placeholder:text-gray-300 font-serif text-xl" placeholder="+90" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">E-Posta Adresi</label>
                    <input type="email" className="bg-transparent border-b border-gray-100 py-3 text-secondary focus:border-primary outline-none transition-all placeholder:text-gray-300 font-serif text-xl" placeholder="adres@mail.com" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">İlgilendiğiniz Hizmet</label>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b border-gray-100 py-3 text-secondary focus:border-primary outline-none transition-all appearance-none cursor-pointer font-serif text-xl">
                        <option>Mimari Tasarım & Uygulama</option>
                        <option>Mühendislik Çözümleri</option>
                        <option>Villa Projeleri</option>
                        <option>Restorasyon & Tadilat</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                        <ArrowRight size={16} className="rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Proje Detaylarınız</label>
                    <textarea rows="4" className="bg-transparent border-b border-gray-100 py-3 text-secondary focus:border-primary outline-none transition-all resize-none placeholder:text-gray-300 font-serif text-xl italic" placeholder="Hayallerinizden bahsedin..."></textarea>
                  </div>

                  <button type="submit" className="group w-full py-8 bg-secondary text-white rounded-2xl font-bold uppercase tracking-[0.4em] text-xs transition-all hover:bg-primary hover:shadow-2xl hover:shadow-primary/20 flex items-center justify-center gap-6 overflow-hidden relative">
                    <span className="relative z-10 flex items-center gap-4">
                      Talebi Gönder
                      <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

