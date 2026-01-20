import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Brain, Eye, Sparkles, Zap, Wind, Droplets, Compass, BookOpen, Clock, Users, Lightbulb, AlertCircle } from 'lucide-react';

const FeelAliveView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">

      {/* Ambient Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-slate-950 to-black pointer-events-none" />
      <FloatingParticles />

      <div className="relative z-10">

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center px-6 relative">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="text-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <span className="text-sky-400 font-bold uppercase text-xs tracking-[0.5em]">
                A Manifesto on Consciousness
              </span>
            </motion.div>

            <motion.h1
              className="text-[15vw] md:text-[12vw] font-display font-bold text-white leading-none mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <motion.span
                animate={{
                  opacity: [1, 0.7, 1],
                  textShadow: [
                    "0 0 20px rgba(56, 189, 248, 0.3)",
                    "0 0 40px rgba(56, 189, 248, 0.5)",
                    "0 0 20px rgba(56, 189, 248, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                ALIVE
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-2xl md:text-4xl text-slate-300 italic font-light leading-relaxed">
                "The mind is <span className="text-white font-medium">alive</span>. <br className="hidden md:block" />
                Watch it like a display. <br className="hidden md:block" />
                Let thoughts pass."
              </p>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto" />
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 text-slate-600 text-xs uppercase tracking-[0.4em] font-bold"
          >
            Scroll to Explore
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-6 pb-32 space-y-48">

          {/* Dimensional Thinking */}
          <Section
            icon={<Brain />}
            title="Dimensional Thinking"
            subtitle="Beyond Linear Perception"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <ThoughtDimension
                dimension="2D"
                description="The world communicates in two dimensions: text and emotion. Most adults think linearly, constrained by language."
                color="from-slate-500 to-slate-700"
              />
              <ThoughtDimension
                dimension="3D"
                description="Children think beyond three dimensions time, emotion, and abstract connection. This is why they struggle to express themselves in our limited framework."
                color="from-sky-500 to-violet-500"
                highlighted
              />
            </div>
            <ManifestoQuote>
              "A thought has emotion. It has text. It has time. The dimension of thought is not linear."
            </ManifestoQuote>
          </Section>

          {/* Observation & Perception */}
          <Section
            icon={<Eye />}
            title="The Lost Art of Observation"
            subtitle="We have stopped watching"
          >
            <div className="space-y-8">
              <ObservationCard
                title="Intuition is Real"
                description="Sometimes you look at someone and instantly know they are lying. Where does that come from? Intuition. Just like our ancestors traveling without vehicles how did they know where to go? Intuition."
                icon={<Compass />}
              />
              <ObservationCard
                title="The Environment Shapes Us"
                description="If you place a child in an environment filled with violence, weapons, and war, and meet them five years later, you'll find that reflected in their behavior. Intelligence is absorption."
                icon={<Users />}
              />
              <ObservationCard
                title="Perception vs Reality"
                description="A person kills someone, yet the same killer cries and portrays sorrow, claiming innocence. That becomes the reality they want you to see. But is that the truth?"
                icon={<AlertCircle />}
              />
            </div>
          </Section>

          {/* Digital Amnesia */}
          <Section
            icon={<Zap />}
            title="Digital Amnesia"
            subtitle="The Cloud is Not Your Mind"
            warning
          >
            <DigitalAmnesiaWarning />
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <InfoCard
                title="External Memory Trap"
                content="When you depend on search engines and digital assistants to store knowledge, this weakens the brain's own ability to recall information independently."
              />
              <InfoCard
                title="The Coming Data Collapse"
                content="One day, there will be no internet. It will happen suddenly. All information, data, everything will be lost. Then something will appear that can restore it but in limited quantity, at an immense cost."
              />
            </div>
            <ManifestoQuote>
              "What you see on your laptop, phone, social media that becomes your intelligence. Without observation and perception, you merely record information and become mechanical like AI."
            </ManifestoQuote>
          </Section>

          {/* Dual Process Thinking */}
          <Section
            icon={<Lightbulb />}
            title="Two Systems of Thought"
            subtitle="Intuition and Deliberation"
          >
            <DualSystemViz />
            <div className="mt-12 space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                Psychology distinguishes between two systems of thought: <strong className="text-white">System 1</strong>, fast, instinctive, and emotional, and <strong className="text-white">System 2</strong>, slow, analytical, and deliberate.
              </p>
              <p>
                This dual process theory reflects our natural cognitive architecture: we generate spontaneous insights (intuition) and deliberate reasoning in parallel. This is what makes human cognition rich and autonomous.
              </p>
            </div>
          </Section>

          {/* The Learning Paradox */}
          <Section
            icon={<BookOpen />}
            title="The Learning Paradox"
            subtitle="Teachers vs Mentors"
          >
            <div className="space-y-8">
              <div className="glass rounded-3xl p-12 border border-white/5">
                <h4 className="text-2xl font-bold text-white mb-6">The Problem with Teaching</h4>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    Teaching has been converted into teachers, and teachers bias learning. When something is written this is success, this is failure, this is the goal it limits your possibilities. A written goal becomes a cage.
                  </p>
                  <p>
                    There should be mentors gurus whom you approach to clarify doubts or connect missing dots. But there should be no teachers in the conventional sense.
                  </p>
                  <p className="text-white italic">
                    "Learning should be your own. Once you learn something, there should be no third party involvement in learning."
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <ConceptCard
                  title="Self Generated Thoughts"
                  description="Random thoughts that come to you naturally are never forgotten. They have emotion, context, and personal meaning."
                  color="emerald"
                />
                <ConceptCard
                  title="External Information"
                  description="Information built by others and presented like a well-served dish. You often forget it, especially when explaining to others."
                  color="slate"
                />
                <ConceptCard
                  title="True Learning"
                  description="When you discuss something, it should remain in the mind. No paper. No external storage. Just pure understanding."
                  color="violet"
                />
              </div>
            </div>
          </Section>

          {/* Speed vs Depth */}
          <Section
            icon={<Clock />}
            title="The Hurry Epidemic"
            subtitle="Why don't we stop?"
          >
            <div className="glass rounded-3xl p-12 border border-white/5 space-y-8">
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  I've spoken to hundreds of people. Ninety-eight out of a hundred <strong className="text-white">hate thinking</strong>. They don't pause for even a second. They speak instantly. While speaking, they frame answers not thoughtful answers, but reactive ones.
                </p>
                <p>
                  Why do people have shorter lives today? Because they're always in a hurry. I've seen people not stop for someone trying to cross the road without a zebra crossing.
                </p>
                <p className="text-white italic text-xl">
                  "Let an answer be silent if needed. Let it be incomplete. Let it be real."
                </p>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h4 className="text-xl font-bold text-white mb-4">The Observation Gap</h4>
                <p className="text-slate-400 leading-relaxed">
                  Why don't we explore why this happens? Because observation takes time. Without observation and perception, you merely record information and become mechanical.
                </p>
              </div>
            </div>
          </Section>

          {/* Final Manifesto */}
          <Section
            icon={<Sparkles />}
            title="The Awakening"
            subtitle="Reclaim Your Mind"
          >
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <p className="text-3xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 leading-tight">
                  Explore your body. <br />
                  Explore your mind. <br />
                  Enhance your own thoughts.
                </p>
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <FinalCard
                  title="Don't Replace with Technology"
                  content="Right now, I'm recording this using a microphone. I had a thought and I captured it. I didn't ask AI to give me a thought. That's the difference."
                />
                <FinalCard
                  title="Beyond Money"
                  content="Money is not the goal. It's a trap given to you. Beyond money, there is so much you are not exploring."
                />
              </div>

              <ManifestoQuote large>
                "People will keep forcing their motives onto you. It's time to watch your mind like a display. Let thoughts pass. The mind is alive."
              </ManifestoQuote>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
};

// Component Definitions

const FloatingParticles: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-sky-400/20 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -100, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  warning?: boolean;
}> = ({ icon, title, subtitle, children, warning }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      <div className="text-center space-y-6">
        <div className={`w-16 h-16 rounded-2xl ${warning ? 'bg-red-500/10 text-red-400' : 'bg-sky-400/10 text-sky-400'} flex items-center justify-center mx-auto`}>
          {React.cloneElement(icon as any, { size: 32 })}
        </div>
        <div>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-3">
            {title}
          </h2>
          <p className="text-slate-500 text-lg italic">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
};

const ThoughtDimension: React.FC<{
  dimension: string;
  description: string;
  color: string;
  highlighted?: boolean;
}> = ({ dimension, description, color, highlighted }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`glass rounded-3xl p-10 border ${highlighted ? 'border-sky-400/30' : 'border-white/5'} relative overflow-hidden group`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />
    <div className="relative z-10">
      <div className="text-6xl font-display font-bold text-white mb-6">{dimension}</div>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const ManifestoQuote: React.FC<{ children: React.ReactNode; large?: boolean }> = ({ children, large }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className={`text-center ${large ? 'py-16' : 'py-12'}`}
  >
    <p className={`${large ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'} font-light italic text-slate-300 max-w-4xl mx-auto leading-relaxed`}>
      {children}
    </p>
  </motion.div>
);

const ObservationCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <motion.div
    whileHover={{ x: 10 }}
    className="glass rounded-2xl p-8 border border-white/5 flex gap-6 group"
  >
    <div className="w-12 h-12 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400 flex-shrink-0 group-hover:bg-sky-400/20 transition-colors">
      {React.cloneElement(icon as any, { size: 24 })}
    </div>
    <div>
      <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const DigitalAmnesiaWarning: React.FC = () => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`glass rounded-3xl p-12 border border-red-500/20 relative overflow-hidden ${glitch ? 'animate-pulse' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
      <div className="relative z-10 text-center space-y-6">
        <div className="text-red-400 text-sm font-bold uppercase tracking-[0.3em]">Warning</div>
        <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
          The information you consume <br className="hidden md:block" />
          <span className="text-red-400">becomes</span> your intelligence
        </h3>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Artificial intelligence is not evolving naturally; it is fed artificially. Call it AI, call it anything it's shaped by artificial sources.
        </p>
      </div>
    </motion.div>
  );
};

const InfoCard: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="glass rounded-2xl p-8 border border-white/5">
    <h4 className="text-xl font-bold text-white mb-4">{title}</h4>
    <p className="text-slate-400 leading-relaxed">{content}</p>
  </div>
);

const DualSystemViz: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-8">
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass rounded-3xl p-10 border border-white/5 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="text-5xl font-display font-bold text-yellow-400 mb-4">System 1</div>
        <div className="space-y-3 text-slate-400">
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-yellow-400" />
            <span>Fast & Instinctive</span>
          </div>
          <div className="flex items-center gap-3">
            <Wind size={20} className="text-yellow-400" />
            <span>Emotional & Automatic</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-yellow-400" />
            <span>Intuitive Insights</span>
          </div>
        </div>
      </div>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass rounded-3xl p-10 border border-white/5 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="text-5xl font-display font-bold text-blue-400 mb-4">System 2</div>
        <div className="space-y-3 text-slate-400">
          <div className="flex items-center gap-3">
            <Brain size={20} className="text-blue-400" />
            <span>Slow & Analytical</span>
          </div>
          <div className="flex items-center gap-3">
            <Droplets size={20} className="text-blue-400" />
            <span>Deliberate & Effortful</span>
          </div>
          <div className="flex items-center gap-3">
            <Compass size={20} className="text-blue-400" />
            <span>Logical Reasoning</span>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

const ConceptCard: React.FC<{
  title: string;
  description: string;
  color: string;
}> = ({ title, description, color }) => {
  const colors = {
    emerald: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20',
    slate: 'from-slate-500/10 to-slate-500/5 border-slate-500/20',
    violet: 'from-violet-500/10 to-violet-500/5 border-violet-500/20',
  };

  return (
    <div className={`glass rounded-2xl p-8 border bg-gradient-to-br ${colors[color as keyof typeof colors]}`}>
      <h4 className="text-lg font-bold text-white mb-3">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const FinalCard: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass rounded-2xl p-8 border border-white/5"
  >
    <h4 className="text-xl font-bold text-white mb-4">{title}</h4>
    <p className="text-slate-400 leading-relaxed">{content}</p>
  </motion.div>
);

export default FeelAliveView;

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeBrain from '../components/ThreeBrain';
import PhysicsCanvas from '../components/PhysicsCanvas';

const FeelAliveView: React.FC = () => {
  const [mindParalysisActive, setMindParalysisActive] = useState(false);
  const [focusLevel, setFocusLevel] = useState(100);
  const [distractions, setDistractions] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredBrain, setHoveredBrain] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  // Simulate mind paralysis when button is clicked
  const triggerMindParalysis = () => {
    setMindParalysisActive(true);
    
    // Simulate declining focus and increasing distractions
    let currentFocus = 100;
    let currentDistractions = 0;
    
    const interval = setInterval(() => {
      currentFocus = Math.max(0, currentFocus - 5);
      currentDistractions = Math.min(100, currentDistractions + 8);
      
      setFocusLevel(currentFocus);
      setDistractions(currentDistractions);
      
      if (currentFocus <= 0) {
        clearInterval(interval);
      }
    }, 200);
    
    setTimeout(() => {
      setMindParalysisActive(false);
      setFocusLevel(100);
      setDistractions(0);
    }, 5000);
  };

  return (
    <div className="min-h-screen py-12 xs:py-16 sm:py-32 px-3 xs:px-4 relative max-w-7xl mx-auto overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sky-500/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="text-center mb-20 xs:mb-24 sm:mb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] xs:text-[15vw] md:text-[18vw] font-display font-bold text-white/[0.02] select-none pointer-events-none"
        >
          ALIVE
        </motion.div>

        <div className="relative z-10 space-y-3 xs:space-y-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl xs:text-4xl sm:text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 italic"
          >
            Feel Alive
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sky-400 font-display uppercase tracking-[0.25em] xs:tracking-[0.3em] sm:tracking-[0.4em] text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-bold"
          >
            The Mind is Alive
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Main Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 md:p-12 relative overflow-hidden"
        >
          {/* Subtle 3D Background Effects */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          
          <div className="prose prose-invert max-w-none relative z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-6 sm:mb-8">
              The mind is alive.
            </h3>
            
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                Modern research supports the idea that the human brain is not a passive storage device but an active, dynamic system shaped by experience, attention, and environment. Neuroscience shows that memory formation involves complex interactions between the hippocampus and the cortex, where memories are encoded, stabilized, and retrieved through networked brain activity, not stored like files in the cloud.
              </motion.p>
              
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                Recent studies also highlight that our reliance on digital devices and the internet reshapes how we remember and think. When people depend on search engines and digital assistants to store knowledge, this can weaken the brain's own ability to recall information independently. Experiments reveal that a short period of intensive internet searching can alter functional brain connectivity in regions associated with long-term memory, making people more inclined to look things up again rather than remember them.
              </motion.p>
              
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                This phenomenon aligns with what psychologists call "digital amnesia," where people more readily forget information they know is easily accessible online. External memory tools change the way the brain encodes and retrieves knowledge.
              </motion.p>
              
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                Attention and cognitive engagement are also affected by digital habits. Research into short form content, like the reels and feeds dominating social media, suggests that frequent exposure correlates with diminished capacity for sustained attention and may impair the ability to concentrate on tasks requiring longer cognitive effort.
              </motion.p>
              
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                At the same time, intuition and internal cognition remain core strengths of the human brain. Psychology distinguishes between two systems of thought:
                <br /><br />
                • System 1, fast, instinctive, and emotional<br />
                • System 2, slow, analytical, and deliberate<br />
                <br />
                This dual process theory reflects our natural cognitive architecture: we generate spontaneous insights (intuition) and deliberate reasoning in parallel.
              </motion.p>
              
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                Artificial intelligence mirrors some aspects of human cognition, but with clear limits. Modern large language models do not have biological memory or consciousness. Their ability to recall or generate text is rooted in statistical patterns learned from enormous datasets, not lived experience.
              </motion.p>
              
              <motion.p 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/10"
              >
                Interestingly, recent research even suggests that AI can suffer from analogs of "cognitive decline" when trained on sensational, low quality content, an effect researchers have metaphorically labeled "brain rot." Models exposed to such data show reduced reasoning ability and weaker long term contextual understanding, mirroring how poor quality information can shape and degrade human reasoning.
              </motion.p>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition-all duration-300 p-4 rounded-lg bg-gradient-to-r from-sky-900/30 to-blue-900/30 border border-sky-500/20 mt-8"
              >
                <p className="text-xl sm:text-2xl font-bold text-sky-400 pt-4 border-t border-white/10 mb-2">
                  All of this reinforces a central theme of your message:
                </p>
                
                <p className="text-lg sm:text-xl">
                  real thinking, deep observation, internal reflection, intuition, self generated insight, cannot be replaced by external storage, external validation, or external habits of thought. Tools can augment human ability, but when used without awareness, they can weaken the very capacities that make human cognition rich and autonomous.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Manifesto Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-slate-900/[0.08] to-slate-800/[0.08] backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden"
        >
          {/* Subtle 3D Background Effects */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/5 w-56 h-56 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/5 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1500"></div>
            <div className="absolute top-2/3 right-1/3 w-36 h-36 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-2500"></div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-6 text-center relative z-10">Manifesto</h3>
          
          <div className="space-y-4 text-slate-300 relative z-10">
            <p>Observaxyzab…</p>
            
            <p>I think the dual nature of physics should evolve from a kilogram level concept. The concept itself is dependent on papers, theses, on information that already exists. But what if you keep all of that in mind, without placing it anywhere physically, or in the smoke like generation called the cloud?</p>
            
            <p>For example, have you ever noticed that information built, innovated, or researched by the West or America is documented and presented to the world like a well served dish, ready to be conceptualized? Anything you read or build, you often forget, especially when explaining it to others. You face situations where you think, "I know this, but right now I can't recall it properly."</p>
            
            <p>But thoughts that are self generated in the mind, random thoughts, are different. You're sitting somewhere, and suddenly a thought comes: this person is supposed to be talking about literature, so this website shouldn't be like this. There should be animation, flowers, illustrations. You will never forget that thought. Every time you see that website, that exact idea will return, this is what I suggested. You won't forget the words, nor the emotions with which you expressed them.</p>
            
            <p>So you see, the dimension of thought is not linear. A thought has emotion. It has text, what you say or write. It has time. Sometimes what happens is that we forget parts of it, because I think the human mind is designed to think in two dimensions. A child, however, can think beyond three dimensions. That is why they struggle to speak, not because they don't know how to speak, but because their thoughts are three dimensional, while the world around them communicates only in two dimensions.</p>
            
            <p>Nobody around us expresses thoughts in three dimensions. That's why children struggle to express themselves. I believe there should be a new kind of paper, actually, no paper at all. When you discuss something, it should remain in the mind. Once you learn something, there should be no third party involvement in learning. Learning should be your own.</p>
            
            <p>There should be mentors, gurus, whom you approach to clarify doubts or connect missing dots. But there should be no teachers in the conventional sense. Teaching has been converted into teachers, and teachers bias learning. I believe that when something is written, this is success, this is failure, this is the goal, it limits your possibilities. A written goal becomes a cage.</p>
            
            <p>We have stopped observing things, phenomena, impacts, actions around us. This allows the motives and agendas of a few people to drive us. Imagine this: a person kills someone, yet the same killer cries and portrays sorrow, claiming innocence. That becomes the reality they want you to see. But is that the truth? What if nobody knows who killed them? What then is reality?</p>
            
            <p>Perception and observation are deep topics, meant to be discussed within a circle of presence. My observation is that when you start discussing these things, most people find it boring, and it's not their fault. The environment around us is designed to suppress such thoughts. Everyone believes they are intelligent, awakened, activated by their "third eye." People claim deep perception, deep awareness.</p>
            
            <p>Sometimes you look at someone and instantly know they are lying. Where does that come from? Intuition. Just like our ancestors traveling without vehicles, how did they know where to go? Intuition. Sometimes you feel something isn't good for you. That feeling isn't random. Explore it. Go deep into it.</p>
            
            <p>I've spoken to hundreds of people. Ninety eight out of a hundred hate thinking. This is my observation. They don't pause for even a second. They speak instantly. While speaking, they frame answers, not thoughtful answers, but reactive ones. Let an answer be silent if needed. Let it be incomplete. Let it be real.</p>
            
            <p>Why do people have shorter lives today? Because they're always in a hurry. I've seen people not stop for someone trying to cross the road without a zebra crossing. I've seen elderly people waiting for 10 to 15 minutes. I once saw an old woman, about my grandmother's age, standing on a divider for 15 minutes while vehicles passed nonstop. I assume 95 percent of those vehicles were not rushing for something life critical. Yet nobody stopped.</p>
            
            <p>If one person stopped, everyone behind would stop, and she could cross. But nobody did.</p>
            
            <p>Why don't we explore why this happens? Because observation takes time. Without observation and perception, you merely record information and become mechanical, like AI. What you see on your laptop, phone, social media, that becomes your intelligence. Artificial intelligence is not evolving naturally, it is fed artificially. Call it AI, call it anything, it's shaped by artificial sources.</p>
            
            <p>If you place a child in an environment filled with violence, weapons, and war, and meet them five years later, you'll find that reflected in their behavior. Language learning proves this. Intelligence is absorption.</p>
            
            <p>Today, people chase iPhones. People destroy relationships to follow trends. One day, there will be no internet. It will happen suddenly. All information, data, everything will be lost. Then something will appear that can restore it, but in limited quantity, at an immense cost. Drops will cost millions, billions.</p>
            
            <p>What will you do then? You won't be able to let go. You'll become a slave to those who control data. They'll ask, and you'll obey. There will be chaos. There will be massacre. And it will be turned into content, sold, enjoyed.</p>
            
            <p>Money is not the goal. It's a trap given to you. Beyond money, there is so much you are not exploring. Explore your body. Explore your mind. Enhance your own thoughts, don't replace them with technology.</p>
            
            <p>Right now, I'm recording this using a microphone. I had a thought and I captured it. I didn't ask AI to give me a thought. That's the difference. People will keep forcing their motives onto you. It's time to watch your mind like a display. Let thoughts pass. The mind is alive.</p>
          </div>
        </motion.div>

        {/* Social Media Addiction and Trends Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-slate-900/[0.08] to-slate-800/[0.08] backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden"
        >
          {/* Subtle 3D Background Effects */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
            <div className="absolute top-1/5 left-1/4 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/5 right-1/3 w-44 h-44 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-2/3 w-32 h-32 bg-fuchsia-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-6 text-center relative z-10">Addicted to Social Media and Trends</h3>
          
          <div className="space-y-4 text-slate-300 relative z-10">
            <p className="text-center">Our minds become trapped in endless cycles of comparison, validation-seeking, and trend-following.</p>
            <p className="text-center">The constant stream of information fragments our attention and rewires our neural pathways.</p>
          </div>
        </motion.div>
        
        {/* Interactive 3D Brain Animation Section - After Social Media Addiction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-slate-900/[0.05] to-slate-800/[0.05] backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden"
          onMouseEnter={() => setHoveredBrain(true)}
          onMouseLeave={() => setHoveredBrain(false)}
          onTouchStart={() => setHoveredBrain(true)}
          onTouchEnd={() => setHoveredBrain(false)}
        >
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-6 text-center">The Living Brain: Recovery & Restoration</h3>
          
          <div className="relative w-full h-96 md:h-[600px] rounded-xl bg-gradient-to-br from-slate-900/20 to-slate-800/20 border border-white/10 overflow-hidden">
            <ThreeBrain className="w-full h-full" />
            
            {/* Enhanced 3D Visual Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-sky-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-3/4 right-1/3 w-20 h-20 bg-emerald-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              <div className="absolute bottom-1/4 left-1/2 w-12 h-12 bg-orange-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
            </div>
          </div>
          
          {/* Clear labels below the animation */}
          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sky-400"></div>
                <span className="text-slate-300">Neural Networks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-slate-300">Memory Pathways</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span className="text-slate-300">Cognitive Processes</span>
              </div>
            </div>
            <p className="text-slate-400 text-center text-sm">
              Dynamic, interconnected systems of the living brain - restored from social media addiction
            </p>
          </div>
          
          {/* Brain hover effect indicator */}
          {hoveredBrain && (
            <motion.div 
              className="absolute inset-0 rounded-[2rem] border-2 border-sky-400/50 pointer-events-none"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>


        
        {/* Immersive 3D Brain Blueprint Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-purple-900/[0.05] to-indigo-900/[0.05] backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden"
        >
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-6 text-center">3D Brain Blueprint: Interactive Neural Architecture</h3>
          
          <div className="relative w-full h-96 md:h-[600px] rounded-xl bg-gradient-to-br from-slate-900/20 to-slate-800/20 border border-white/10 overflow-hidden">
            <ThreeBrain className="w-full h-full" />
            
            {/* Enhanced 3D Visual Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-indigo-400/20 rounded-full blur-2xl animate-pulse delay-1500"></div>
              <div className="absolute top-1/2 right-1/2 w-20 h-20 bg-violet-400/20 rounded-full blur-2xl animate-pulse delay-3000"></div>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <p className="text-slate-400 text-center text-sm">
              Real-time interactive brain blueprint with parallax effects and neural pathways
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sky-400"></div>
                <span className="text-slate-300">Neural Networks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-slate-300">Memory Pathways</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span className="text-slate-300">Cognitive Functions</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Mindful Awareness Section with True Full-Screen Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-purple-900/[0.05] to-indigo-900/[0.05] backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden"
        >
          {/* Subtle 3D Background Effects */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/5 w-52 h-52 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/5 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-6 relative z-10">Beyond Money: Rediscovering Our Humanity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
            <div 
              className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer relative overflow-visible"
              onMouseEnter={() => setHoveredCard('awareness')}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard('awareness')}
              onTouchEnd={() => setHoveredCard(null)}
            >
              <h4 className="text-lg font-bold text-sky-400 mb-2 z-20 relative">Conscious Awareness</h4>
              <p className="text-slate-400 z-20 relative">Practice mindful observation of the present moment without judgment.</p>
            </div>
            
            <div 
              className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer relative overflow-visible"
              onMouseEnter={() => setHoveredCard('connections')}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard('connections')}
              onTouchEnd={() => setHoveredCard(null)}
            >
              <h4 className="text-lg font-bold text-sky-400 mb-2 z-20 relative">Deep Connections</h4>
              <p className="text-slate-400 z-20 relative">Build authentic relationships beyond transactional interactions.</p>
            </div>
            
            <div 
              className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer relative overflow-visible"
              onMouseEnter={() => setHoveredCard('expression')}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard('expression')}
              onTouchEnd={() => setHoveredCard(null)}
            >
              <h4 className="text-lg font-bold text-sky-400 mb-2 z-20 relative">Creative Expression</h4>
              <p className="text-slate-400 z-20 relative">Engage in activities that bring joy and personal fulfillment.</p>
            </div>
            
            <div 
              className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer relative overflow-visible"
              onMouseEnter={() => setHoveredCard('nature')}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard('nature')}
              onTouchEnd={() => setHoveredCard(null)}
            >
              <h4 className="text-lg font-bold text-sky-400 mb-2 z-20 relative">Nature Connection</h4>
              <p className="text-slate-400 z-20 relative">Spend time in natural environments to restore mental balance.</p>
            </div>
          </div>
          
          {/* True full-screen hover effect overlays - positioned outside the grid */}
          {hoveredCard === 'awareness' && (
            <motion.div 
              className="fixed inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          
          {hoveredCard === 'connections' && (
            <motion.div 
              className="fixed inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          
          {hoveredCard === 'expression' && (
            <motion.div 
              className="fixed inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          
          {hoveredCard === 'nature' && (
            <motion.div 
              className="fixed inset-0 bg-gradient-to-br from-green-500/5 to-lime-500/5 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-sky-500/20">
            <p className="text-slate-300 text-center italic">
              "True wealth lies not in what we accumulate, but in what we experience, create, and share with others."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeelAliveView;