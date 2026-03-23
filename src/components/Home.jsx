import React, { useMemo } from "react";
import { motion } from "framer-motion";

const HERO_BG = "https://images.unsplash.com/photo-1723739003389-cbcdbd54281a?w=1920&q=80";

export default function Home() {

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        < section
            id="home"
            className="relative min-h-screen flex justify-center"
            data-testid="hero-section"
        >
            < div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${HERO_BG})` }
                }
            />
            <div className="absolute inset-0 bg-black/60" />
            < div className="hero-gradient absolute inset-0" />
            < div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

            <div className="vhs-overlay absolute inset-0 pointer-events-none" />


            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-24">
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="flex items-center gap-3 mb-0"
                >
                    <div className="h-px w-8 bg-[#E71D36]" />
                    <span className="st-mono text-xs tracking-[0.4em] text-[#E71D36] uppercase">
                        Hawkins, Indiana — 1983
                    </span>
                </motion.div >
                <motion.h1 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{delay:0.5, duration:0.9}}
                    className="st-heading text-white text-5xl sm:text-6xl lg:text-8xl leading=[0.9] mt-8 mb-5 max-w-3xl ">
                    <span >
                        WHERE
                    </span>
                    <br />
                    <span className="darkness-flicker text-[#E71D36]">
                        DARKNESS
                    </span>
                    <br />
                    <span>
                        MEETS LIGHT
                    </span>
                </motion.h1>

                <motion.p
                    initial={{opacity:0,y:20}}
                    animate={{opacity:1,y:0}}
                    transition={{delay:0.8, duration:0.8}}
                    className="text-white/60 text-base sm:text-lg max-w-lg leading-relaxed mb-10 "
                >
                    Eleven. The Party. The Upside Down. Explore the lore, characters, and dark mysteries of Hawkins through an immersive fan experience.
                </motion.p>

                <motion.div
                   initial={{opacity: 0, y:20}}
                   animate={{ opacity:1 , y:0}}
                   transition={{delay: 1.0, duration: 0.7}}
                   className="flex flex-wrap gap-4"
                >
                    <motion.button
                      onClick={()=> scrollTo('characters')}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-[#E71D36] text-white st-mono text-xs tracking-[0.25em] uppercase py-3 px-8 hover:bg-[#ff0033] border border-[#E71D36] shadow-[0_0_20px_rgba(231,29,54,0.4]"
                    >
                        Explore Characters
                    </motion.button>

                    <motion.button
                        onClick={() => scrollTo('seasons')}
                        whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.5)'}}
                        whileTap={{ scale: 0.97 }}
                        className= " bg-transparent border border-white/20 text-white st-mono text-xs tracking-[0.25em] uppercase py-3 px-8 hover:bg-white/5"
                    >
                        Season Guide
                    </motion.button>
                </motion.div>
                
            </div>
        </section >
    );
};