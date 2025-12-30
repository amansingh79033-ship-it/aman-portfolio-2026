
import React from 'react';
import { motion } from 'framer-motion';
import { ViewState } from '../App';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems: { id: ViewState; name: string; desc: string }[] = [
    { id: 'systems', name: 'Systems', desc: 'The Pedagogy' },
    { id: 'intelligence', name: 'Intelligence', desc: 'AHI Protocol' },
    { id: 'ventures', name: 'Ventures', desc: '30Cr Portfolio' },
    { id: 'analysis', name: 'Analysis', desc: 'Forensics' },
    { id: 'mindspace', name: 'Mindspace', desc: 'Poetry' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[100] px-8 py-6 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5"
    >
      <div 
        className="flex items-center space-x-3 cursor-pointer group"
        onClick={() => setView('home')}
      >
        <div className="w-10 h-10 bg-sky-400 flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(56,189,248,0.3)] group-hover:rotate-12 transition-transform">
          <span className="text-black font-bold text-sm tracking-tighter">AS</span>
        </div>
        <span className="text-white font-display font-medium text-lg tracking-tight group-hover:text-sky-300 transition-colors">
          amankumar<span className="text-sky-300">S</span>ingh
        </span>
      </div>

      <div className="hidden lg:flex items-center space-x-12">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className="group relative flex flex-col items-center"
          >
            <span className={`text-[8px] uppercase tracking-[0.4em] transition-colors ${
              currentView === item.id ? 'text-sky-300' : 'text-slate-500 group-hover:text-sky-200'
            }`}>
              {item.desc}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 transition-all ${
              currentView === item.id ? 'text-white scale-110' : 'text-slate-400'
            }`}>
              {item.name}
            </span>
            {currentView === item.id && (
              <motion.div 
                layoutId="nav-pill"
                className="absolute -bottom-2 w-full h-[1px] bg-sky-400 shadow-[0_0_10px_#38bdf8]"
              />
            )}
          </button>
        ))}
      </div>

      <button className="hidden md:block border border-sky-400/20 hover:border-sky-400/80 hover:bg-sky-400/5 transition-all text-sky-300 px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.3em]">
        Collaborate
      </button>
    </motion.nav>
  );
};

export default Navigation;
