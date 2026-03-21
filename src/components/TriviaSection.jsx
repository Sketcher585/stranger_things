import React, {useState, useCallback} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triviaQuestions } from '../data/trivia';
import { button } from 'framer-motion/client';

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
        if (idx === question.answer) setScore(s => s+1);
    }, [selected, question.answer]);

    const handleNext = useCallback(() => {
        if (current >= TOTAL - 1) {
            setDone(true);
        }
        else {
            setCurrent(s => s+1);
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

    const percentage = Math.round((score/TOTAL) * 100);

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
                        Prove You Belong To The <span className= "text-[#E71D36]"> Party</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                    <div className=" lg:col-span-3">
                        <motion.div
                          key={current}
                          initial={{ opacity: 0, x:30 }}
                          animate={{ opacity:1,x:0}}
                          exit={{opacity: 0, x:-30}}
                          transition={{duration: 0.4}}
                        >
                        
                            <div className=" border border-white/8 p-6 mb-5 bg-white/2 ">
                                <div className="flex items-start gap-3 mb-5">
                                    <div className="w-8 h-8 flex items-center justify-center bg-[#E71D36]/20 border border-[#E71D36]/40 flex-shrink-0 mt-0.5 ">
                                        <span>{current+1}</span>
                                    </div>
                                    <h3 className="st-heading text-lg text-white leading-snug">
                                        {question.question}
                                    </h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {question.options.map((opt,idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => handleAnswer(idx)}
                                      disabled={selected !==null}
                                      className={`w-full text-left px-4 py-3 border st-mono text-xs tracking-wide flex items-center gap-3 ${getOptionStyle(idx)}`}
                                      style={{ transition:"border-color 0.2s, color 0.2s, background-color 0.2s"}}
                                      >
                                        <span>
                                            {String.fromCharCode(65+idx)}
                                        </span>
                                        {opt}
                                        {selected !== null && (
                                            <motion.button></motion.button>
                                        )}

                                    </button>

                                ))}
                            </div>
                        
                        </motion.div>
                    </div>
                </div>
            
            </div>

        </section>
    )
    }

