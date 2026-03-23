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
          scrolled ? 'bg-[#050508cc] backdrop-blur-xl border-b border-white/10 shadow-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo('#home')}
            className="flex items-center group"
          >
            <div className="st-title text-lg font-bold text-white tracking-wider group-hover:text-[#E71D36] transition-colors duration-200 flex flex-col leading-tight">
              <span>STRANGER</span>
              <span>THINGS</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={`st-mono text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
                  activeSection === href.slice(1)
                    ? 'text-[#E71D36] decoration-[#E71D36] decoration-2'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 bg-black/30 text-white/90 hover:bg-black/50 transition"
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Open mobile menu</span>
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-[#050508dd] backdrop-blur-xl border-t border-white/10"
            >
              <div className="flex flex-col gap-2 px-5 py-3">
                {navLinks.map(({ label, href }) => (
                  <button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className={`w-full text-left st-mono text-sm tracking-widest uppercase px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === href.slice(1)
                        ? 'bg-white/10 text-[#E71D36] font-semibold'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
