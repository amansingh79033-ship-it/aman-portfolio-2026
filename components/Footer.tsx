
import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-black/80 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <div className="text-white font-display font-bold uppercase tracking-[0.3em] mb-2">amankumarSingh</div>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Patna // Mumbai // London // Global</p>
        </div>

        <div className="flex items-center space-x-12">
          {[
            { icon: <Twitter size={18} />, label: 'X' },
            { icon: <Linkedin size={18} />, label: 'LinkedIn' },
            { icon: <ExternalLink size={18} />, label: 'CuriousMinds' }
          ].map((s, i) => (
            <button key={i} className="text-slate-500 hover:text-sky-300 transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div className="text-[9px] text-slate-700 uppercase tracking-[0.4em]">
          © 2025 ALL SOVEREIGN RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
};

export default Footer;
