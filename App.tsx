import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navigation from './components/Navigation.tsx';
import ThreeBackground from './components/ThreeBackground.tsx';
import Hero from './components/Hero.tsx';
import SystemsView from './views/SystemsView.tsx';
import IntelligenceView from './views/IntelligenceView.tsx';
import VenturesView from './views/VenturesView.tsx';
import AnalysisView from './views/AnalysisView.tsx';
import MindspaceView from './views/MindspaceView.tsx';
import Footer from './components/Footer.tsx';

export type ViewState = 'home' | 'systems' | 'intelligence' | 'ventures' | 'analysis' | 'mindspace';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initializing Lenis for smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Guaranteed load release
    const timer = setTimeout(() => setIsLoaded(true), 1000);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Hero onExplore={() => setCurrentView('systems')} />;
      case 'systems': return <SystemsView />;
      case 'intelligence': return <IntelligenceView />;
      case 'ventures': return <VenturesView />;
      case 'analysis': return <AnalysisView />;
      case 'mindspace': return <MindspaceView />;
      default: return <Hero onExplore={() => setCurrentView('systems')} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-black selection:bg-sky-400/30 overflow-x-hidden text-white">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ repeat: Infinity, duration: 0.8, repeatType: 'reverse' }}
              className="text-sky-300 font-display text-xl font-bold tracking-[0.6em] uppercase"
            >
              Loading Archive
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ThreeBackground currentView={currentView} />
      
      <Navigation currentView={currentView} setView={setCurrentView} />

      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.02),transparent_80%)]" />
      </div>
    </div>
  );
};

export default App;