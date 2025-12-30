
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Zap, Network } from 'lucide-react';

const IntelligenceView: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block p-4 bg-sky-400/10 rounded-full text-sky-400 mb-6">
          <Brain size={32} />
        </motion.div>
        <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-6">AHI <span className="text-yellow-100">Protocol</span></h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg uppercase tracking-widest font-bold text-[10px]">Assistance to Human Intelligence // Research & Development</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 glass rounded-[3rem] p-12 border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/5 blur-[100px] group-hover:bg-sky-400/10 transition-colors" />
          <h3 className="text-3xl font-display font-bold text-white mb-8">The Thesis</h3>
          <p className="text-slate-400 text-xl leading-relaxed font-light mb-12">
            Instead of replacing human genius, Aman advocates for "Cognitive Exoskeletons." AHI is the bridge where neural intent meets high-speed computation without the friction of traditional interfaces.
          </p>
          <div className="flex flex-wrap gap-4">
            {['Neural Sync', 'Real-time Forensics', 'Cognitive Load Optimization', 'Decision Stacks'].map(t => (
              <span key={t} className="px-5 py-2 bg-white/5 rounded-full text-[10px] text-sky-300 font-bold uppercase tracking-widest border border-sky-400/20">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-[3rem] p-12 border-white/5 flex flex-col justify-between">
          <Network className="text-yellow-200 mb-8" size={40} />
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-[0.2em] text-xs italic">Market Implementation</h4>
            <p className="text-slate-500 text-sm">Applying String Theory vibrations to predict market collapses like the EdTech bubble of 2023.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceView;
