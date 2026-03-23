import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triviaQuestions } from '../data/trivia';
import { button } from 'framer-motion/client';
import { CheckCircle, XCircle, RotateCcw, Trophy, Zap } from 'lucide-react';


const TOTAL = triviaQuestions.length;

export default function TriviaSection() {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);
    const [showFact, setShowFact] = useState(false);

    const question = triviaQuestions[current];

    const handleAnswer = useCallback((idx) => {
        if (selected !== null) return;
        setSelected(idx);
        setShowFact(true);
        if (idx === question.answer) setScore(s => s + 1);
    }, [selected, question.answer]);

    const handleNext = useCallback(() => {
        if (current >= TOTAL - 1) {
            setDone(true);
        }
        else {
            setCurrent(s => s + 1);
            setSelected(null);
            setShowFact(false);
        }
    }, [current]);

    const handleReset = useCallback(() => {
        setCurrent(0);
        setSelected(null);
        setScore(0);
        setDone(false);
        setShowFact(false);
    }, []);

    const getOptionStyle = (idx) => {
        if (selected === null) return 'border-white/10 text-white/70 hover:border-[#E71D36]/50 hover:text-white hover:bg-[#E71D36]/5 ';
        if (idx === question.answer) return 'border-green-500 bg-green-900/20 text-green-400';
        if (idx === selected && idx != question.answer) return 'border-red-500 bg-red-900/20 text-red-400';
        return 'border-white/5 text-white/30';
    };

    const percentage = Math.round((score / TOTAL) * 100);

    return (
        <section id="trivia" className="py-28 bg-[#030303]">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
                <div className="mb-16">
                    <motion.p
                        className="st-mono text-xs tracking-[0.4em] text-[#E71D36] uppercase mb-4 flex items-center gap-3"
                    >
                        The Test
                    </motion.p>

                    <motion.h2
                        className=" st-heading text-4xl sm:text-5xl lg:text-6xl text-white"
                    >
                        Prove You Belong To The <span className="text-[#E71D36]"> Party</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                    <div className=" lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {!done ? (

                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.4 }}
                                >

                                    <div className=" border border-white/8 p-6 mb-5 bg-white/2 ">
                                        <div className="flex items-start gap-3 mb-5">
                                            <div className="w-8 h-8 flex items-center justify-center bg-[#E71D36]/20 border border-[#E71D36]/40 flex-shrink-0 mt-0.5 ">
                                                <span>{current + 1}</span>
                                            </div>
                                            <h3 className="st-heading text-lg text-white leading-snug">
                                                {question.question}
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            {question.options.map((opt, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleAnswer(idx)}
                                                    disabled={selected !== null}
                                                    className={`w-full text-left px-4 py-3 border st-mono text-xs tracking-wide flex items-center gap-3 ${getOptionStyle(idx)}`}
                                                    style={{ transition: "border-color 0.2s, color 0.2s, background-color 0.2s" }}
                                                >
                                                    <span>
                                                        {String.fromCharCode(65 + idx)}
                                                    </span>
                                                    {opt}
                                                    {selected !== null && idx === question.answer && (
                                                        <CheckCircle size={14} className="ml-auto text-green-400 flex-shrink-0" />
                                                    )}
                                                    {selected === idx && idx != question.answer && (
                                                        <XCircle size={14} className="ml-auto text-red-400 flex-shrink-0" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {showFact && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="border border-[#E71D36]/30 bg-[#E71D36]/5 p-4 mb-5 overflow-hidden"
                                        >
                                            <p className="st-mono text-[10px] tracking-[0.25em] text-[#E71D36] uppercase mb-1 flex items-center gap-1.5">
                                                <Zap size={10} /> Fun Fact
                                            </p>
                                            <p className="text-white/70 text-xs leading-relaxed">{question.fact}</p>
                                        </motion.div>
                                    )}

                                    {(selected !== null) && (
                                        <motion.button
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            onClick={handleNext}
                                            className="w-full py-3 bg-[#E71D36] text-white st-mono text-xs tracking-[0.3rem] uppercase hover:bg-[#ff0033] shadow-[0_0_20px_rgba(231,29,54,0.3)]"
                                            style={{ transition: 'background-color 0.2s' }}
                                        >
                                            {current >= TOTAL - 1 ? 'See Results' : 'Next Question'}
                                        </motion.button>
                                    )}
                                </motion.div>
                            ) : (

                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="border border-white/10 p-8 text-center bg-white/20"
                                >
                                    <Trophy size={40} className="mx-auto mb-4 text-[#E71D36]" />
                                    <p className="st-mono text-xs tracking-[0.4em] text-white/40 uppercase mb-2" >Final Score</p>
                                    <div className="st-title text-6xl text-[#E71D36] mb-1">{score}</div>
                                    <p className="st-mono text-sm text-white/50 mb-2">out of {TOTAL} questions</p>
                                    <div className="w-full h-1 bg-white/10 my-6">
                                        <div
                                            className="h-full bg-[#E71D36]"
                                            style={{ width: `${percentage}%, transition:"width 0.8s ease"` }}
                                        />
                                    </div>
                                    <p className="text-white/60 text-sm mb-6">
                                        {
                                            percentage >= 80 ? "You belong in Hawkins! Expert-level Stranger Things fan." :
                                                percentage >= 60 ? "Good work! You've watched closely" :
                                                    percentage >= 40 ? "Not bad. Time for a rewatch?" :
                                                        "The Upside Down calls you. Start from Season 1"
                                        }
                                    </p>
                                    <button
                                        onClick={handleReset}
                                        className="flex items-center gap-2 mx-auto st-mono text-xs tracking-[0.3rem] uppercase text-[#E71D36] border border-[#E71D36]/50 px-6 py-3 hover:bg-[#E71D36]"
                                        style={{ transition: "background-color 0.2s" }}
                                    >
                                        <RotateCcw size={13} /> Play Again
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className=" lg:col-span-2">
                        <div className="sticky top-24 space-y-4">

                            <div className="border border-white/8 p-5 bg-white/2\">
                                <p className="st-mono text-[9px] tracking-[0.35em] text-white/40 uppercase mb-3">Live Score</p>
                                <div className="st-title text-4xl text-[#E71D36] mb-1">{score}</div>
                                <p className="st-mono text-[10px] text-white/30">correct answers</p>
                                <div className="w-full h-0.5 bg-white/8 mt-3">
                                    <div
                                        className="h-full bg-[#E71D36]"
                                        style={{ width: `${(score / TOTAL) * 100}%`, transition: 'width 0.4s ease' }}
                                    />
                                </div>
                            </div>

                            <div className="border border-white/8 p-5 bg-white/2">
                                <p className="st-mono text-[9px] tracking-[0.35em] text-white/40 uppercase mb-3">Progress</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {triviaQuestions.map((opt, i) => (
                                        <div
                                            key={i}
                                            className="w-5 h-5 flex items-center justify-center border"
                                            style={{
                                                borderColor: i < current ? 'rgba(231,29,54,0.6)' : i === current ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
                                                backgroundColor: i < current ? 'rgba(231,29,54,0.15)' : 'transparent',
                                            }}
                                        >
                                            <span className="st-mono text-[8px]" style={{ color: i < current ? '#E71D36' : i === current ? 'white' : 'rgba(255,255,255,0.2)' }}>
                                                {i + 1}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tip */}
                            <div className="border border-[#bc13fe]/20 p-4 bg-[#bc13fe]/5">
                                <p className="st-mono text-[9px] tracking-[0.3em] text-[#bc13fe] uppercase mb-1">Hawkins Lab Files</p>
                                <p className="text-white/50 text-xs leading-relaxed">
                                    All questions are based on the official Netflix series. No spoiler warnings needed — this covers all 4 seasons.
                                </p>
                            </div>

                        </div>



                    </div>
                </div>
            </div>

        </section >
    );
}

