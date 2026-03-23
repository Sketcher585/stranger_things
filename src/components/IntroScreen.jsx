import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TITLE_1 = "STRANGER";
const TITLE_2 = "THINGS";

const makePositions = (count) =>
  Array.from({ length: count }, () => ({
    x: (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * 140),
    y: (Math.random() > 0.5 ? 1 : -1) * (40 + Math.random() * 100),
    rotate: (Math.random() - 0.5) * 80,
  }));

const POS_1 = makePositions(TITLE_1.length);
const POS_2 = makePositions(TITLE_2.length);

const Spore = ({ style }) => (
  <div
    style={{
      position: 'absolute',
      bottom: '-10px',
      left: style.left,
      width: style.size,
      height: style.size,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.6)',
      boxShadow: `0 0 ${style.glow}px rgba(188,19,254,0.5)`,
      animation: `spore-rise ${style.duration}s linear infinite`,
      animationDelay: `${style.delay}s`,
      pointerEvents: 'none',
    }}
  />
);

export default function IntroScreen({ onEnter }) {
  const [showButton, setShowButton] = useState(false);
  const [exiting, setExiting] = useState(false);

  const spores = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      glow: Math.floor(Math.random() * 6 + 2),
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 8,
    }))
  , []);

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = () => {
      if (showButton && !exiting) {
        setExiting(true);
        setTimeout(onEnter, 900);
      }
    };
    window.addEventListener('keypress', onKey);
    return () => window.removeEventListener('keypress', onKey);
  }, [showButton, exiting, onEnter]);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 900);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303] overflow-hidden"
          data-testid="intro-screen"
        >
          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {spores.map((s, i) => <Spore key={i} style={s} />)}
          </div>

          {/* VHS scanlines */}
          <div className="vhs-overlay absolute inset-0 pointer-events-none z-10" />

          {/* Ambient red flicker */}
          <motion.div
            className="absolute inset-0 bg-red-900/10 pointer-events-none"
            animate={{ opacity: [0, 0.06, 0, 0.1, 0, 0.04, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
          />

          {/* Title */}
          <div className="relative z-20 text-center px-6 select-none" data-testid="intro-title">
            {/* STRANGER */}
            <div className="flex items-center justify-center mb-1">
              {TITLE_1.split('').map((letter, i) => (
                <motion.span
                  key={`s${i}`}
                  initial={{ opacity: 0, x: POS_1[i].x, y: POS_1[i].y, rotate: POS_1[i].rotate, scale: 0.3, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{ delay: i * 0.08, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="st-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#f5f5f5] inline-block"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* THINGS */}
            <div className="flex items-center justify-center">
              {TITLE_2.split('').map((letter, i) => (
                <motion.span
                  key={`t${i}`}
                  initial={{ opacity: 0, x: POS_2[i].x, y: POS_2[i].y, rotate: POS_2[i].rotate, scale: 0.3, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{ delay: (i + TITLE_1.length + 0.3) * 0.08, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="st-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#E71D36] inline-block"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="st-mono mt-6 text-xs sm:text-sm tracking-[0.4em] text-white/50 uppercase"
            >
              Hawkins, Indiana — 1983
            </motion.p>
          </div>

          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mt-16 z-20 flex flex-col items-center gap-5"
              >
                <motion.p
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="st-mono text-xs tracking-[0.35em] text-white/40 uppercase"
                >
                  Press any key to continue
                </motion.p>
                <motion.button
                  onClick={handleEnter}
                  whileHover={{ scale: 1.04, backgroundColor: 'rgba(231,29,54,0.12)' }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-[#E71D36]/70 text-[#E71D36] st-mono text-xs tracking-[0.3em] uppercase py-3 px-10"
                  data-testid="enter-site-btn"
                >
                  Enter The Upside Down
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 st-mono text-[10px] tracking-[0.3em] text-white/30 uppercase"
          >
            A Netflix Original Series Fan Site
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
