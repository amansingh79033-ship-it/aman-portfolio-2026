
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Globe, Cpu } from 'lucide-react';

const TechSovereignty: React.FC = () => {
  return (
    <section id="tech" className="py-24 px-6 bg-gradient-to-b from-transparent to-black/80">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-2xl"
              >
                <Code2 className="text-sky-300 w-8 h-8 mb-4" />
                <h4 className="text-white font-bold mb-2">Custom AI Integrations</h4>
                <p className="text-slate-500 text-xs">TensorFlow for agrarian disease detection & personalized paths.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass p-6 rounded-2xl"
              >
                <Server className="text-sky-300 w-8 h-8 mb-4" />
                <h4 className="text-white font-bold mb-2">Sovereign Stacks</h4>
                <p className="text-slate-500 text-xs">Custom-built LMS & referral engines. Zero third-party reliance.</p>
              </motion.div>
            </div>
            <div className="space-y-4 pt-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass p-6 rounded-2xl"
              >
                <Globe className="text-sky-300 w-8 h-8 mb-4" />
                <h4 className="text-white font-bold mb-2">Made in Bihar</h4>
                <p className="text-slate-500 text-xs">Scaling intellectual capital from the roots of Bharat.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass p-6 rounded-2xl"
              >
                <Cpu className="text-sky-300 w-8 h-8 mb-4" />
                <h4 className="text-white font-bold mb-2">Full-Stack Founder</h4>
                <p className="text-slate-500 text-xs">Understands code as intimately as the curriculum.</p>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex-1 order-1 lg:order-2"
        >
          <span className="text-sky-400 font-display uppercase tracking-widest text-xs font-bold block mb-4">
            Technical Infrastructure
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
            Technological <br /><span className="text-sky-300">Sovereignty</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            A commitment to independent tech stacks. By avoiding third-party LMS constraints, Aman creates a frictionless, low-bandwidth ecosystem that serves elite education to any corner of the globe.
          </p>
          <div className="flex flex-wrap gap-4">
            {['React', 'TypeScript', 'TensorFlow', 'Python', 'Node.js', 'PostgreSQL', 'Cloud Native'].map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 text-xs text-slate-300 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSovereignty;
