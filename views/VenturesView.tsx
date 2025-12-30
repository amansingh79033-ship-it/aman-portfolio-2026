
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, Database, Activity, Zap, Shield, Repeat, Globe } from 'lucide-react';

const VenturesView: React.FC = () => {
  const projects = [
    { name: "CuriousMinds.online", tagline: "Flagship Pedagogy. Valuation: 30Cr.", sector: "AHI / EdTech", status: "Active Scaling", icon: <Zap /> },
    { name: "Propsynx.xyz", tagline: "Property Logic Engine.", sector: "PropTech", status: "MVP", icon: <Repeat /> },
    { name: "Propertyfie.com", tagline: "Asset Management Protocol.", sector: "Real Estate", status: "Beta", icon: <Shield /> },
    { name: "Floww.site", tagline: "Workflow Sovereignty.", sector: "SaaS", status: "Internal", icon: <Activity /> },
    { name: "Metric.wtf", tagline: "Market Forensics Lab.", sector: "Data Analytics", status: "Research", icon: <Database /> },
    { name: "Engine Ocean", tagline: "Maritime Logistics R&D.", sector: "Logistics", status: "Consultancy", icon: <Layers /> },
    { name: "ShareU", tagline: "Referral Optimization.", sector: "AdTech", status: "Profitably Lean", icon: <Globe /> },
    { name: "AGENTref", tagline: "Referral Bridge for Agents.", sector: "Agency Tech", status: "Early Access", icon: <Zap /> },
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-6xl font-display font-bold text-white mb-6">The <span className="text-sky-300">Portfolio</span></h2>
        <p className="text-slate-500 text-lg">8+ Ventures. 1 Vision. Sovereign Tech Stacks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group glass p-10 rounded-[2.5rem] border-white/5 hover:border-sky-400/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-sky-300 mb-8 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-sky-400 group-hover:text-black transition-all">
                {p.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">{p.name}</h3>
              <p className="text-slate-500 text-xs font-light leading-relaxed mb-8">{p.tagline}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-slate-400">
                <span>Sector</span>
                <span className="text-white">{p.sector}</span>
              </div>
              <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-slate-400">
                <span>Status</span>
                <span className="text-yellow-100">{p.status}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VenturesView;
