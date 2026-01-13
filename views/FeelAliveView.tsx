import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeBrain from '../components/ThreeBrain';

const FeelAliveView: React.FC = () => {
  const [mindParalysisActive, setMindParalysisActive] = useState(false);
  const [focusLevel, setFocusLevel] = useState(100);
  const [distractions, setDistractions] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  // Simulate mind paralysis when button is clicked
  const triggerMindParalysis = () => {
    setMindParalysisActive(true);
    
    // Simulate declining focus and increasing distractions
    let currentFocus = 100;
    let currentDistractions = 0;
    
    const interval = setInterval(() => {
      currentFocus = Math.max(0, currentFocus - 5);
      currentDistractions = Math.min(100, currentDistractions + 8);
      
      setFocusLevel(currentFocus);
      setDistractions(currentDistractions);
      
      if (currentFocus <= 0) {
        clearInterval(interval);
      }
    }, 200);
    
    setTimeout(() => {
      setMindParalysisActive(false);
      setFocusLevel(100);
      setDistractions(0);
    }, 5000);
  };

  return (
    <div className="min-h-screen py-12 xs:py-16 sm:py-32 px-3 xs:px-4 relative max-w-7xl mx-auto overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sky-500/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="text-center mb-20 xs:mb-24 sm:mb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] xs:text-[15vw] md:text-[18vw] font-display font-bold text-white/[0.02] select-none pointer-events-none"
        >
          ALIVE
        </motion.div>

        <div className="relative z-10 space-y-3 xs:space-y-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl xs:text-4xl sm:text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 italic"
          >
            Feel Alive
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sky-400 font-display uppercase tracking-[0.25em] xs:tracking-[0.3em] sm:tracking-[0.4em] text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-bold"
          >
            The Mind is Alive
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Main Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 md:p-12"
        >
          <div className="prose prose-invert max-w-none">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-6 sm:mb-8">
              The mind is alive.
            </h3>
            
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                Modern neuroscience supports this idea. The brain does not store memories like files in a cloud or on a hard drive. Memory is a dynamic, predictive process formed through active neural networks involving the hippocampus and cortex. What we remember depends on attention, emotion, and repeated internal engagement—not static storage.
              </motion.p>
              
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                Research also shows that heavy reliance on the internet and digital tools changes how the brain functions. Studies demonstrate that frequent online searching alters brain connectivity in regions responsible for memory and decision-making, making people more likely to look up information rather than retain it internally.
              </motion.p>
              
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                This effect is often called digital amnesia—the tendency to forget information because we trust that it exists externally. When knowledge is outsourced to devices, the brain reduces effort in encoding and recalling it.
              </motion.p>
              
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                Attention itself is being reshaped. Research on short-form digital content shows a correlation between constant scrolling and reduced ability to sustain focus, engage in deep thinking, or remain cognitively patient. The brain adapts to speed, novelty, and interruption.
              </motion.p>
              
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                Psychology explains this through dual-process theory: one system of thinking is fast, intuitive, emotional; the other is slow, deliberate, and analytical. Intuition is not imaginary—it is a real cognitive process shaped by experience and observation.
              </motion.p>
              
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                Artificial intelligence, despite appearances, does not think or remember the way humans do. Large language models generate responses based on statistical patterns learned from massive datasets. They have no internal experience, no intuition, no lived memory—only probability.
              </motion.p>
              
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                Interestingly, research has shown that even AI systems degrade when trained on low-quality, sensational, or repetitive content. Exposure to such data reduces reasoning quality and long-term coherence—mirroring what happens to the human mind under poor informational environments.
              </motion.p>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-4 rounded-lg bg-gradient-to-r from-sky-900/30 to-blue-900/30 border border-sky-500/20 mt-8"
              >
                <p className="text-xl sm:text-2xl font-bold text-sky-400 pt-4 border-t border-white/10 mb-2">
                  All of this reinforces one thing:
                </p>
                
                <p className="text-lg sm:text-xl">
                  real intelligence is not external. It is not stored. It is not downloaded.
                  It is cultivated through observation, perception, silence, attention, and lived experience.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Mind Paralysis Visualization */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-slate-900/[0.08] to-slate-800/[0.08] backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8"
        >
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-6 text-center">Mind Paralysis Simulation</h3>
          
          <div className="flex flex-col items-center justify-center space-y-6">
            <p className="text-slate-300 text-center max-w-2xl">
              Click the button below to visualize how our minds get paralyzed by technology, trends, and the trap of following only money, forgetting there's much more to explore beyond money.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56, 189, 248, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerMindParalysis}
              className="px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full text-white font-bold text-lg shadow-lg shadow-sky-500/20 border border-sky-500/30"
            >
              Visualize Mind Paralysis
            </motion.button>
            
            <div className="w-full max-w-md bg-gray-900/50 rounded-full h-4 border border-white/10 overflow-hidden mt-4">
              <motion.div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                initial={{ width: '100%' }}
                animate={{ width: `${focusLevel}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-slate-400 text-sm">Mental Focus: {Math.round(focusLevel)}%</p>
            
            <div className="w-full max-w-md bg-gray-900/50 rounded-full h-4 border border-white/10 overflow-hidden mt-2">
              <motion.div 
                className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                initial={{ width: '0%' }}
                animate={{ width: `${distractions}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-slate-400 text-sm">Digital Distractions: {Math.round(distractions)}%</p>
            
            {mindParalysisActive && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg max-w-md text-center"
              >
                <p className="text-red-400 font-bold">MIND PARALYSIS ACTIVATED</p>
                <p className="text-slate-300 text-sm mt-2">Notice how focus decreases and distractions increase rapidly when trapped in the cycle of technology and money-focused thinking.</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Interactive 3D Brain Animation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-slate-900/[0.05] to-slate-800/[0.05] backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8"
        >
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-6 text-center">The Living Brain</h3>
          
          <div className="relative w-full h-96 md:h-[500px] rounded-xl bg-gradient-to-br from-slate-900/20 to-slate-800/20 border border-white/10 overflow-hidden">
            <ThreeBrain className="w-full h-full" />
          </div>
          
          {/* Clear labels below the animation */}
          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sky-400"></div>
                <span className="text-slate-300">Neural Networks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-slate-300">Memory Pathways</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span className="text-slate-300">Cognitive Processes</span>
              </div>
            </div>
            <p className="text-slate-400 text-center text-sm">
              Dynamic, interconnected systems of the living brain
            </p>
          </div>
        </motion.div>
        
        {/* Mindful Awareness Section with True Full-Screen Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-purple-900/[0.05] to-indigo-900/[0.05] backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 relative overflow-visible"
        >
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-6">Beyond Money: Rediscovering Our Humanity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div 
              className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer relative overflow-visible"
              onMouseEnter={() => setHoveredCard('awareness')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h4 className="text-lg font-bold text-sky-400 mb-2 z-20 relative">Conscious Awareness</h4>
              <p className="text-slate-400 z-20 relative">Practice mindful observation of the present moment without judgment.</p>
            </div>
            
            <div 
              className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer relative overflow-visible"
              onMouseEnter={() => setHoveredCard('connections')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h4 className="text-lg font-bold text-sky-400 mb-2 z-20 relative">Deep Connections</h4>
              <p className="text-slate-400 z-20 relative">Build authentic relationships beyond transactional interactions.</p>
            </div>
            
            <div 
              className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer relative overflow-visible"
              onMouseEnter={() => setHoveredCard('expression')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h4 className="text-lg font-bold text-sky-400 mb-2 z-20 relative">Creative Expression</h4>
              <p className="text-slate-400 z-20 relative">Engage in activities that bring joy and personal fulfillment.</p>
            </div>
            
            <div 
              className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer relative overflow-visible"
              onMouseEnter={() => setHoveredCard('nature')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h4 className="text-lg font-bold text-sky-400 mb-2 z-20 relative">Nature Connection</h4>
              <p className="text-slate-400 z-20 relative">Spend time in natural environments to restore mental balance.</p>
            </div>
          </div>
          
          {/* True full-screen hover effect overlays - positioned outside the grid */}
          {hoveredCard === 'awareness' && (
            <motion.div 
              className="fixed inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          
          {hoveredCard === 'connections' && (
            <motion.div 
              className="fixed inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          
          {hoveredCard === 'expression' && (
            <motion.div 
              className="fixed inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          
          {hoveredCard === 'nature' && (
            <motion.div 
              className="fixed inset-0 bg-gradient-to-br from-green-500/5 to-lime-500/5 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-sky-500/20">
            <p className="text-slate-300 text-center italic">
              "True wealth lies not in what we accumulate, but in what we experience, create, and share with others."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeelAliveView;