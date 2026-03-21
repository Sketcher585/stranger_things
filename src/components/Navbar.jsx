import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Characters', href: '#characters' },
  { label: 'Seasons', href: '#seasons' },
  { label: 'Episodes', href: '#episodes' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Trivia', href: '#trivia' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = navLinks.map(({ href }) => {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = (href) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
        }`}

      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo('#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 bg-[#E71D36] flex items-center justify-center">
            </div>
            <span className="st-title text-base text-white tracking-wider group-hover:text-[#E71D36] transition-colors duration-200">
              ST
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8\">
            {navLinks.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={`st-mono text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                  activeSection === href.slice(1)
                    ? 'text-[#E71D36]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
