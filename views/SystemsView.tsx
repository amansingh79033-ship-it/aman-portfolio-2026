
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, BookOpen, Users } from 'lucide-react';

const SystemsView: React.FC = () => {
  const pillars = [
    { icon: <Zap />, title: "Inquisitive Velocity", desc: "The metric of speed from question to synthesis." },
    { icon: <Target />, title: "Frugal Scaling", desc: "Achieving 30Cr valuation with <3L investment." },
    { icon: <BookOpen />, title: "Curiosity-First", desc: "Discarding rote models for inquiry-based learning." },
    { icon: <Users />, title: "JNV Resilience", desc: "The Jawahar Navodaya Vidyalaya spirit of resourcefulness." }
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-sky-400 font-display uppercase tracking-widest text-[10px] font-bold block mb-6"
          >
            The Pedagogical Layer
          </motion.span>
          <motion.h2
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-10 leading-[0.9]"
          >
            The <span className="text-sky-300 italic">Bharat</span> <br />Valley Advantage.
          </motion.h2>
          <div className="space-y-8 text-slate-400 text-lg leading-relaxed font-light">
            <p>
              While global ecosystems burn capital, the "Bihar Advantage" focuses on intellectual sovereignty. Aman's model at CuriousMinds.online utilizes the inherent resilience of the semi-urban talent pool.
            </p>
            <div className="glass p-8 rounded-3xl border-sky-400/20">
              <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Unit Economics of Talent</h4>
              <p className="text-sm">We export high-intensity intellectual culture from Patna to London, proving that the roots of global innovation can start anywhere.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[2rem] border-white/5 hover:border-sky-400/30 transition-all group"
            >
              <div className="text-sky-400 mb-6 group-hover:scale-110 transition-transform">{p.icon}</div>
              <h3 className="text-white font-display font-bold mb-3">{p.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemsView;
