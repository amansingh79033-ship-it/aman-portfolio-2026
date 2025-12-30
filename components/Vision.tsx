
import React from 'react';
import { motion } from 'framer-motion';

const Vision: React.FC = () => {
  return (
    <section id="the-vision" className="py-24 md:py-40 px-6 relative overflow-hidden bg-black/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sky-300 font-display text-4xl md:text-5xl font-bold leading-tight mb-8">
            Strategic Positioning:<br />
            The <span className="text-white">"Bihar"</span> Advantage
          </h2>
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
            <p>
              In a market saturated by Metro-centric EdTech giants, Aman leverages Bihar not as a limitation but as a strategic differentiator. 
            </p>
            <div className="border-l-2 border-sky-400 pl-6 my-8">
              <p className="text-white italic font-light">
                "The 'Made in Bihar' tag signals resilience, intellectual depth, and hunger—traits highly valued in the global talent market."
              </p>
            </div>
            <p>
              Operating as a <span className="text-sky-300 font-semibold">Cognitive Accelerator</span>, CuriousMinds.online exports high-intensity intellectual culture from Patna to Mumbai, London, and Vancouver.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square glass rounded-2xl flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-400 via-transparent to-transparent" />
            </div>
            
            <div className="text-center z-10">
              <div className="text-8xl font-bold text-white/5 font-display mb-[-2rem]">BHARAT</div>
              <div className="text-sky-300 font-display text-6xl font-bold tracking-tighter">VALLEY</div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 glass rounded-lg">
                  <div className="text-sky-400 text-sm font-bold uppercase mb-1">Pedagogy</div>
                  <div className="text-white text-xs">Curiosity-First</div>
                </div>
                <div className="p-4 glass rounded-lg">
                  <div className="text-sky-400 text-sm font-bold uppercase mb-1">Ethos</div>
                  <div className="text-white text-xs">JNV Frugal Innovation</div>
                </div>
                <div className="p-4 glass rounded-lg">
                  <div className="text-sky-400 text-sm font-bold uppercase mb-1">Model</div>
                  <div className="text-white text-xs">Lean Polymath</div>
                </div>
                <div className="p-4 glass rounded-lg">
                  <div className="text-sky-400 text-sm font-bold uppercase mb-1">Impact</div>
                  <div className="text-white text-xs">+176% Creativity</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative tag */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-4 -right-4 glass px-4 py-2 rounded-full border-yellow-200/20 text-yellow-100 font-bold text-[10px] uppercase tracking-widest shadow-xl"
          >
            Top 1% Potential
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
