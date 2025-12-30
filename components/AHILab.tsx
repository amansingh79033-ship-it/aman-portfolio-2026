
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Atom, Zap, ChevronRight } from 'lucide-react';

const AHILab: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const concepts = [
    {
      title: "AHI vs AI",
      label: "Assistance to Human Intelligence",
      icon: <Brain className="text-sky-300" />,
      content: "Aman contradicts the global trend of replacing human cognition with AI. His research focuses on AHI—using technology as a cognitive exoskeleton to amplify inherent human genius.",
      color: "text-sky-300"
    },
    {
      title: "String Theory",
      label: "Interconnected Systems",
      icon: <Atom className="text-yellow-200" />,
      content: "Applying high-level physics concepts to business structures. Understanding the 'vibrations' of market trends before they manifest into macro-realities.",
      color: "text-yellow-200"
    },
    {
      title: "Neural Syncs",
      label: "Zero-Integration Connectivity",
      icon: <Zap className="text-sky-300" />,
      content: "A vision for cognitive enhancement where human intent and digital execution sync without the friction of traditional UI/UX integrations.",
      color: "text-sky-300"
    },
    {
      title: "Mindset Mapping",
      label: "The Bihar Advantage",
      icon: <Cpu className="text-yellow-200" />,
      content: "Deconstructing the cognitive resilience of 'Bharat Valley'. Mapping how high-fidelity pedagogy can scale locally-grown talent to global heights.",
      color: "text-yellow-200"
    }
  ];

  return (
    <section id="tech" className="py-32 px-6 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-sky-400 font-display uppercase tracking-widest text-xs font-bold block mb-4">Research & Theory</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-8">
              The <span className="text-sky-300">Cognitive</span> <br />Laboratory
            </h2>
            
            <div className="space-y-4">
              {concepts.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border ${
                    activeTab === i 
                    ? "bg-white/5 border-sky-400/30 translate-x-4" 
                    : "bg-transparent border-transparent hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg bg-white/5 ${activeTab === i ? 'text-sky-300' : 'text-slate-600'}`}>
                        {c.icon}
                      </div>
                      <div>
                        <div className={`font-display font-bold ${activeTab === i ? 'text-white' : 'text-slate-500'}`}>{c.title}</div>
                        <div className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">{c.label}</div>
                      </div>
                    </div>
                    {activeTab === i && <ChevronRight className="text-sky-400" size={16} />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotateY: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full glass rounded-[3rem] p-12 flex flex-col justify-center border-sky-400/20"
              >
                <div className={`text-4xl mb-8 ${concepts[activeTab].color}`}>
                  {concepts[activeTab].icon}
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-6">
                  {concepts[activeTab].title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  {concepts[activeTab].content}
                </p>
                <div className="mt-12 flex items-center space-x-2">
                  <span className="w-12 h-[1px] bg-sky-400/50" />
                  <span className="text-[10px] uppercase tracking-widest text-sky-400/60 font-bold italic">Problem Solver Mindset</span>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Background 3D ring decoration */}
            <div className="absolute -inset-10 border border-white/5 rounded-full -z-10 animate-pulse" />
            <div className="absolute -inset-20 border border-white/5 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AHILab;
