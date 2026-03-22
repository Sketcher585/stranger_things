import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Radio, Tv, Github } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Characters', href: '#characters' },
  { label: 'Seasons', href: '#seasons' },
  { label: 'Episodes', href: '#episodes' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Trivia', href: '#trivia' },
];

const scrollTo = (href) => {
  document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="bg-[#050508] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[#E71D36] flex items-center justify-center">
                <Zap size={14} fill="white" color="white" />
              </div>
              <span className="st-title text-base text-white tracking-wider">STRANGER THINGS</span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed max-w-xs">
              An immersive fan site dedicated to the world of Hawkins, Indiana, and the terrifying Upside Down.
            </p>
            <div className="flex items-center gap-4 mt-5">
              <Radio size={14} className="text-[#E71D36] animate-pulse" />
              <span className="st-mono text-[9px] tracking-wider text-white/30 uppercase">Hawkins Radio — Live</span>
            </div>
          </div>

          <div>
            <p className="st-mono text-[9px] tracking-[0.3em] uppercase text-white/40 mb-4">Navigate</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {navLinks.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="st-mono text-xs text-white/50 hover:text-[#E71D36] text-left"
                  style={{ transition: 'color 0.2s' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="st-mono text-[9px] tracking-[0.3em] uppercase text-white/40 mb-4">The Show</p>
            <div className="space-y-2">
              {[
                ['Created By', 'The Duffer Brothers'],
                ['Network', 'Netflix'],
                ['Genre', 'Sci-Fi / Horror / Drama'],
                ['Premiered', 'July 15, 2016'],
                ['Seasons', '4 (Season 5 Coming)'],
              ].map(([key, val]) => (
                <div key={key} className="flex items-baseline gap-2">
                  <span className="st-mono text-[9px] text-white/30 tracking-wider uppercase w-16 flex-shrink-0">{key}</span>
                  <span className="text-white/60 text-xs">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="section-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="st-mono text-[9px] tracking-wider text-white/25 uppercase">
            &copy; {new Date().getFullYear()} Stranger Things Fan Site — Not affiliated with Netflix
          </p>
          <div className="flex items-center gap-2">
            <Tv size={10} className="text-white/25" />
            <span className="st-mono text-[9px] text-white/25 tracking-wider">
              All characters &amp; stories belong to Netflix &amp; The Duffer Brothers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
