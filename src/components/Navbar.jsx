import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Anasayfa', path: '/' },
    { name: 'Hakkımızda', path: '/about' },
    { name: 'Hizmetler', path: '/services' },
    { name: 'Projeler', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'İletişim', path: '/contact' },
  ];

  const isHome = location.pathname === '/';
  const isTransparent = !scrolled && isHome;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || !isHome ? 'glass-dark shadow-glass-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo className="h-10" theme={scrolled || !isHome ? 'light' : (isTransparent ? 'light' : 'dark')} />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium hover:text-primary transition-colors ${scrolled || !isHome ? 'text-white/90' : 'text-white/90'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors"
          >
            Teklif Al
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={28} className={scrolled || !isHome ? 'text-white' : 'text-secondary'} />
          ) : (
            <Menu size={28} className={scrolled || !isHome ? 'text-white' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-secondary border-t border-white/5 md:hidden overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col py-8 px-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-2xl font-serif text-white/70 hover:text-primary transition-all py-2 border-b border-white/5 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6">
                <Link
                  to="/contact"
                  className="w-full py-4 bg-primary text-white text-center font-bold uppercase tracking-widest rounded-lg block shadow-lg shadow-primary/20"
                  onClick={() => setIsOpen(false)}
                >
                  Teklif Al
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;