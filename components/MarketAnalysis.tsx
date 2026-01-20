
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Zap, AlertTriangle, Eye, Target } from 'lucide-react';

const MarketAnalysis: React.FC = () => {
  const analysis = [
    { 
      target: "Byju's & Unacademy Fall", 
      prediction: "Pre-assumed collapse due to static models & rogue ground-staff behavior.", 
      status: "Verified Accuracy",
      icon: <TrendingDown className="text-red-400" />
    },
    { 
      target: "Quick Commerce (Zomato/Blinkit)", 
      prediction: "Shift from 'Speed' to 'Quick Treatment' model (Latest Forensics).", 
      status: "In Progress",
      icon: <Zap className="text-sky-300" />
    },
    { 
      target: "Global AHI Implementation", 
      prediction: "Countering AI replacement with AHI (Assistance to Human Intelligence).", 
      status: "Research Phase",
      icon: <Target className="text-yellow-100" />
    },
    { 
      target: "Current Political Systems", 
      prediction: "Contradiction on established practices via cognitive mapping.", 
      status: "Analytical Thesis",
      icon: <Eye className="text-white" />
    }
  ];

  return (
    <section id="analysis" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-yellow-100 font-display uppercase tracking-[0.3em] text-[10px] font-bold block mb-4">Strategic Forensics</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
              The Prediction <span className="text-sky-300">Archives</span>
            </h2>
          </div>
          <div className="glass px-6 py-4 rounded-2xl border-white/5 flex items-center space-x-4">
            <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Monitoring Market Volatility</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {analysis.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group glass p-8 rounded-[2.5rem] border-white/5 hover:border-sky-400/20 transition-all"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="p-5 bg-white/5 rounded-[1.5rem] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                  item.status.includes('Verified') ? 'bg-green-500/20 text-green-400' : 'bg-sky-500/20 text-sky-300'
                }`}>
                  {item.status}
                </span>
              </div>
              <h4 className="text-2xl font-display font-bold text-white mb-3">{item.target}</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.prediction}</p>
              <div className="flex items-center space-x-2 text-sky-400/40">
                <AlertTriangle size={14} />
                <span className="text-[10px] uppercase font-bold tracking-widest">Cognitive Outlier Detected</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 glass rounded-[3rem] border-yellow-200/10 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-yellow-200/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 relative z-10 leading-tight">
            "If I am facing a problem, it's not me who gets to think twice here about my next plan."
          </h3>
          <p className="text-sky-300 font-display font-bold uppercase tracking-[0.4em] text-sm relative z-10">
            Aman Kumar Singh  Problem Solver
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketAnalysis;
