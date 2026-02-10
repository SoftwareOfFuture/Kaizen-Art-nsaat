import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Facebook, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const ZenPattern = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="footer-zen-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="40" cy="40" r="1.5" fill="currentColor" />
          <path d="M0 40 L80 40 M40 0 L40 80" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-zen-pattern)" />
    </svg>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
    { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
    { icon: <Twitter size={18} />, href: "#", label: "Twitter" }
  ];

  const quickLinks = [
    { name: "Anasayfa", path: "/" },
    { name: "Hakkımızda", path: "/about" },
    { name: "Projeler", path: "/projects" },
    { name: "İletişim", path: "/contact" }
  ];

  const expertiseLinks = [
    { name: "Mimari Tasarım", path: "/projects" },
    { name: "Mühendislik Çözümleri", path: "/projects" },
    { name: "Villa Projeleri", path: "/projects" },
    { name: "Endüstriyel Yapılar", path: "/projects" }
  ];

  return (
    <footer className="bg-secondary text-white relative overflow-hidden pt-20 pb-10">
      <ZenPattern />

      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-light/5 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Brand Column */}
          <div className="space-y-6">
            <Logo theme="light" className="h-10" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Mükemmelliği inşa ediyoruz. Kaizen felsefesiyle tasarlanan, doğayla uyumlu ve sürdürülebilir yaşam alanları. Her detayda sanat, her yapıda mühendislik.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <span className="group-hover:scale-110 transition-transform">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Discover Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-primary"></span> Keşfet
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-primary"></span> Uzmanlık
            </h4>
            <ul className="space-y-4">
              {expertiseLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-primary"></span> İletişim
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/10 transition-colors">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Merkez Ofis</span>
                  <p className="text-gray-300 text-sm leading-snug">Antalya, Türkiye</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">E-Posta</span>
                  <p className="text-gray-300 text-sm">info@kaizenart.com.tr</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Telefon</span>
                  <p className="text-gray-300 text-sm">+90 212 000 00 00</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-xs text-center md:text-left">
            <p>&copy; {currentYear} <span className="text-gray-400 font-bold">Kaizen Art İnşaat & Mühendislik</span>. Tüm hakları saklıdır.</p>
          </div>

          <div className="flex gap-8">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-xs uppercase tracking-widest font-bold">Gizlilik</a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-xs uppercase tracking-widest font-bold">Çerezler</a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-xs uppercase tracking-widest font-bold">KVKK</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
