
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Zap, Eye, Target, Calendar } from 'lucide-react';

const AnalysisView: React.FC = () => {
  const predictions = [
    { date: "Q1 2022", target: "Byju's / Unacademy", insight: "Static units & rogue staff behavior will cause a 90% drop in trust.", status: "Verified" },
    { date: "Q4 2023", target: "Quick Commerce", insight: "Shift from delivery-speed to 'treatment-speed' essential for survival.", status: "In Action" },
    { date: "Q2 2024", target: "AGI Narrative", insight: "Market will tire of LLMs; focus will shift to AHI (Human Augmentation).", status: "Emerging" }
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-20 items-start">
        <div className="lg:w-1/3 sticky top-32">
          <h2 className="text-6xl font-display font-bold text-white mb-8 leading-none">Market <br /><span className="text-sky-300">Forensics.</span></h2>
          <p className="text-slate-500 leading-relaxed mb-12">
            Utilizing high-level pattern recognition to predict market shifts before they manifest in data.
          </p>
          <div className="p-8 glass rounded-3xl border-yellow-200/10">
            <h4 className="text-yellow-100 font-bold text-xs uppercase tracking-widest mb-4">Core Thesis</h4>
            <p className="text-sm italic">"If you wait for the data, you're already behind. Forensics is about reading the vibrations."</p>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          {predictions.map((p, i) => (
            <motion.div
              key={i}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-12 rounded-[3rem] border-white/5 hover:border-sky-400/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  <Calendar size={14} /> {p.date}
                </div>
                <span className="px-4 py-1 bg-sky-400/10 text-sky-400 text-[9px] font-bold uppercase tracking-widest rounded-full">
                  {p.status}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-sky-300 transition-colors">{p.target}</h3>
              <p className="text-slate-400 text-lg font-light leading-relaxed">{p.insight}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
