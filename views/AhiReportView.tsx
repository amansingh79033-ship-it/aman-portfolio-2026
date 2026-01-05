
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Shield, Zap, Target, Cpu, MessageSquare, History, TrendingUp, HelpCircle } from 'lucide-react';

interface AhiReportViewProps {
    onBack: () => void;
}

const AhiReportView: React.FC<AhiReportViewProps> = ({ onBack }) => {
    const timelineData = [
        { date: 'March 2022', title: 'The Genesis', desc: 'Initial research into cognitive offloading and the limits of purely generative AI.' },
        { date: 'August 2022', title: 'Symbiotic Framework', desc: 'Developing the first prototypes of "Shadow Context" retrieval systems.' },
        { date: 'January 2023', title: 'Vector Integration', desc: 'Transitioning from static memory to dynamic vector-retrieval based assistance.' },
        { date: 'July 2023', title: 'The AHI Manifesto', desc: 'Formalizing the distinction between Assistance and Artificial Intelligence.' },
        { date: 'December 2023', title: 'Agentic Workflows', desc: 'Introduction of autonomous verifiers and research synthesis agents.' },
        { date: 'June 2024', title: 'Local Sovereignty', desc: 'Migrating core AHI protocols to private, edge-processed environments.' },
        { date: 'March 2025', title: 'The Singularity Scaffold', desc: 'Completion of high-fidelity cognitive scaffolding for enterprise deployment.' }
    ];

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen max-w-5xl mx-auto selection:bg-sky-500/30">
            {/* Navigation / Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onBack}
                className="flex items-center gap-2 text-sky-400 font-bold uppercase tracking-widest text-xs mb-12 hover:text-sky-300 transition-colors group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Intelligence
            </motion.button>

            {/* Header */}
            <header className="mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <BookOpen size={12} /> Research Report // R-105-EXPANDED
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                        Deep Dive: <br />
                        <span className="text-sky-400 text-glow">The AHI Nexus</span>
                    </h1>
                    <p className="text-slate-400 text-xl font-light italic border-l-2 border-sky-500/50 pl-6 py-2 max-w-2xl">
                        "We need some tech to think with us, not for us!" — Engineering the future of symbiotic intelligence.
                    </p>
                </motion.div>
            </header>

            {/* Visual Section: Scaffolding */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="mb-32 relative rounded-[3rem] overflow-hidden border border-white/10 group"
            >
                <img
                    src="/ahi_scaffolding_visualization_1767640747096.png"
                    alt="AHI Scaffolding Visualization"
                    className="w-full h-[500px] object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                    <h3 className="text-2xl font-display font-bold text-white mb-2">FIG 2.1: NEURAL SCAFFOLDING</h3>
                    <p className="text-slate-400 text-sm max-w-xl">A visual representation of the symbiotic relationship between biological intent and digital synthesis nodes.</p>
                </div>
            </motion.div>

            {/* THE "WHY?" SECTION */}
            <section className="mb-32">
                <div className="flex items-center gap-4 mb-12">
                    <HelpCircle className="text-sky-400" size={32} />
                    <h2 className="text-4xl font-display font-bold text-white">The "Why?" Phase</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* With Us */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-10 rounded-[3rem] bg-sky-400/5 border border-sky-400/20 relative overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-400/10 rounded-full blur-3xl" />
                        <Zap className="text-sky-400 mb-6" size={40} />
                        <h3 className="text-2xl font-bold text-white mb-6">With Us?</h3>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                            <p>
                                Engineering "With Us" means the AI is a <strong>transparent scaffold</strong>. It doesn't hide its reasoning; it exposes the raw data, the synthesis steps, and the creative options.
                            </p>
                            <p>
                                It functions as an <strong>Exocortical Extension</strong>. When you think of a problem, the AHI nodes immediately fetch context, verify facts, and present a curated 'thought-space' for you to navigate.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-sky-300/80">
                                <li>Real-time Context Handshakes</li>
                                <li>Transparent Reasoning Chains</li>
                                <li>Human-in-the-loop Synthesis</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Not For Us */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-10 rounded-[3rem] bg-purple-400/5 border border-purple-400/20 relative overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
                        <Shield className="text-purple-400 mb-6" size={40} />
                        <h3 className="text-2xl font-bold text-white mb-6">Not For Us?</h3>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                            <p>
                                "For Us" is the path to <strong>cognitive atrophy</strong>. When technology decides for you, it replaces your faculty for critical thinking and moral judgment.
                            </p>
                            <p>
                                We reject the <strong>Oracle Model</strong>. AHI avoids being a magic box that gives 'The Answer'. Instead, it provides 'The Evidence' and 'The Angles', ensuring the user retains the final executive decision.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-purple-300/80">
                                <li>Zero Agency Erosion</li>
                                <li>Elimination of Black-box Bias</li>
                                <li>Anti-Atrophy Protocols</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Research Timeline */}
            <section className="mb-32">
                <div className="flex items-center gap-4 mb-16 text-center justify-center">
                    <History className="text-yellow-400" size={32} />
                    <h2 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">Research Odyssey <br /><span className="text-sm text-slate-500 tracking-[0.4em] font-sans">2022 — 2025</span></h2>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

                    <div className="space-y-16">
                        {timelineData.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="text-sky-400 font-mono text-xs mb-2">{item.date}</div>
                                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed max-w-sm ml-auto mr-auto md:ml-0 md:mr-0">{item.desc}</p>
                                </div>
                                <div className="relative z-10 w-4 h-4 rounded-full bg-sky-400 shadow-[0_0_15px_#38bdf8] border-4 border-black" />
                                <div className="flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Section: Timeline */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mb-32 p-8 rounded-[3rem] bg-white/[0.02] border border-white/5"
            >
                <img
                    src="/ahi_timeline_viz_1767640765379.png"
                    alt="AHI Research Timeline Visualization"
                    className="w-full h-auto rounded-2xl opacity-80"
                />
                <div className="mt-8 flex justify-between items-center text-[10px] text-slate-600 font-mono uppercase tracking-[0.3em]">
                    <span>ARCHIVE REF: A-TIMELINE-04</span>
                    <span>DISTRIBUTION: RESTRICTED</span>
                </div>
            </motion.div>

            {/* Final Thesis */}
            <div className="space-y-24">
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="prose prose-invert max-w-none text-center"
                >
                    <div className="w-16 h-[1px] bg-sky-500/50 mx-auto mb-12" />
                    <h2 className="text-3xl font-display font-bold text-white mb-8">The Philosophy of Assistance</h2>
                    <p className="text-slate-400 leading-relaxed text-lg max-w-3xl mx-auto">
                        In the coming decade, the divide will not be between those who use AI and those who don't, but between those who are
                        <strong>augmented</strong> and those who are <strong>automated</strong>. AHI is the defensive and offensive posture
                        of the human mind in the digital age. We don't build machines to think <i>for</i> us; we build them to expand the very
                        threshold of what we can think.
                    </p>
                </motion.section>

                {/* Closing Call to Action */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center py-20 border-t border-white/5"
                >
                    <p className="text-slate-500 text-sm uppercase tracking-[0.4em] font-bold mb-8">End of Report</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBack}
                        className="px-12 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-sky-400 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        Return to Intelligence Module
                    </motion.button>
                </motion.footer>
            </div>
        </div>
    );
};

export default AhiReportView;
