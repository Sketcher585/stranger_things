import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { characters } from '../data/characters';
import { Shield, Sparkles, ROtateCcw, RotateCcwIcon } from 'lucide-react';
import { span } from 'framer-motion/client';

const StatusBridge = ({ status }) => {
    const colors = {
        Alive: 'bg-green-900/60 text-green-400 border-green-800',
        Deceased: 'bg-red-900/60 text-red-400 border-red-800',
        Coma: 'bg-yellow-900/60 text-yellow-400 border-yellow-800',
    };
    return (
        <span className={`st-mono text-[9px] tracking-widest uppercase border px-2 py-0.5 ${colors[status] || colors.Alive} `}>
            {status}
        </span>
    );
};

const CharacterCard = ({ character, index }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
            className="card-flip-container h-96 cursor-pointer"
            onClick={() => setFlipped(f => !f)}
        >
            <div className={`card-flip-inner h-full ${flipped ? 'is-flipped' : ''}`}>

                <div className="card-face rounded-none overflow-hidden group">
                    <div className="relative w-full h-full">
                        <img src={character.image} alt={character.name}
                            className="w-full h-full object-cover object-top"
                            style={{ filter: character.filterStyle }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-30"
                            style={{ backgroundColor: character.accentColor, transition: 'opacity 0.3s' }}
                        />
                        {/* Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <div
                                className="w-8 h-0.5 mb-3"
                                style={{ backgroundColor: character.accentColor }}
                            />
                            <h3 className="st-heading text-xl text-white mb-1">{character.name}</h3>
                            <p className="st-mono text-[10px] tracking-[0.25em] uppercase"
                                style={{ color: character.accentColor }}>
                                {character.role}
                            </p>
                        </div>


                    </div>

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100"
                        style={{ transition: 'opacity 0.3s' }}>
                        <RotateCcwIcon size={14} color="rgba(255,255,255,0.5)" />
                    </div>

                </div>

            </div>


        </motion.div>
    )
}

export default function CharactersSection() {
    return (
        <section id="characters" className="py-28 bg-[#030303]">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

                <div className="mb-16">
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="st-mono text-xs tracking-[0.4em] text-[#E71D36] uppercase mb-4 flex items-center gap-3">
                        <span className="h-px w-8 bg-[#E71D36] inline-block" />
                        The Party
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="st-heading text-4xl sm:text-5xl lg:text-6xl text-white">
                        Meet the <span className="text-[#E71D36]">Characters</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/50 text-sm mt-4 max-w-xl"
                    >
                        Click any card to reveal their Upside Down profile and full character details.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {characters.map((char, i) => (
                        <CharacterCard key={char.id} character={char} index={i} />
                    )
                    )}
                </div>

            </div >
        </section >
    );
}
