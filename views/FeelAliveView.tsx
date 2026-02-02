import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import { motion } from 'framer-motion';
// @ts-ignore
import { useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Brain, Eye, Sparkles, Zap, Wind, Droplets, Compass, BookOpen, Clock, Users, Lightbulb, AlertCircle, Shield, Wallet, Hourglass, Bike, Ghost, Rocket, Layers } from 'lucide-react';
// @ts-ignore
import { FloatingSphere, Interactive3DCanvas, ParticleField } from '../components/Interactive3DVisuals';
import UniversalAudioPlayer from '../components/UniversalAudioPlayer';

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

          {/* Belief & Risk */}
          <Section
            icon={<Shield />}
            title="Belief & Risk"
            subtitle="The Architecture of Subconscious Priming"
          >
            <BeliefRiskContent />
          </Section>

          {/* Simple Explanation */}
          <Section
            icon={<Lightbulb />}
            title="Let's make it simple"
            subtitle="How to explain this to a 4th grader"
          >
            <SimpleExplanationContent />
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

          {/* 3D Floating Elements for Final Manifesto */}
          <div className="absolute top-3/4 right-1/4 w-32 h-32 pointer-events-none">
            <Interactive3DCanvas>
              <FloatingSphere
                position={[0, 0, 0]}
                color="#ec4899"
                distort={0.5}
                speed={2}
                roughness={0.15}
                size={0.7}
                floatSpeed={1.5}
                rotationIntensity={0.5}
              />
            </Interactive3DCanvas>
          </div>

        </div>
      </div>
      <UniversalAudioPlayer />
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
      className="space-y-12 relative"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="text-center space-y-6 cursor-pointer"
      >
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          className={`w-16 h-16 rounded-2xl ${warning ? 'bg-red-500/10 text-red-400' : 'bg-sky-400/10 text-sky-400'} flex items-center justify-center mx-auto transition-all duration-300`}
        >
          {React.cloneElement(icon as any, { size: 32 })}
        </motion.div>
        <div>
          <motion.h2
            whileHover={{ scale: 1.05 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-3 transition-all duration-300"
          >
            {title}
          </motion.h2>
          <motion.p
            whileHover={{ scale: 1.02 }}
            className="text-slate-500 text-lg italic transition-all duration-300"
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>
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
    whileHover={{ scale: 1.02, rotateY: 5 }}
    className={`glass rounded-3xl p-10 border ${highlighted ? 'border-sky-400/30' : 'border-white/5'} relative overflow-hidden group cursor-pointer`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-all duration-500`} />
    <div className="relative z-10">
      <div className="text-6xl font-display font-bold text-white mb-6 transition-transform duration-300 group-hover:scale-105">{dimension}</div>
      <p className="text-slate-400 leading-relaxed transition-opacity duration-300 group-hover:text-slate-300">{description}</p>
    </div>
  </motion.div>
);

const ManifestoQuote: React.FC<{ children: React.ReactNode; large?: boolean }> = ({ children, large }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    className={`text-center ${large ? 'py-16' : 'py-12'} cursor-pointer transition-all duration-300 transform`}
  >
    <p className={`${large ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'} font-light italic text-slate-300 max-w-4xl mx-auto leading-relaxed transition-all duration-300 hover:text-slate-100 hover:scale-105`}>
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
    whileHover={{ x: 10, scale: 1.02 }}
    className="glass rounded-2xl p-8 border border-white/5 flex gap-6 group cursor-pointer transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400 flex-shrink-0 group-hover:bg-sky-400/20 transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110">
      {React.cloneElement(icon as any, { size: 24 })}
    </div>
    <div>
      <h4 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-sky-400">{title}</h4>
      <p className="text-slate-400 leading-relaxed transition-all duration-300 group-hover:text-slate-300 group-hover:pl-2">{description}</p>
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
      whileHover={{ scale: 1.02, rotateY: 2 }}
      className={`glass rounded-3xl p-12 border border-red-500/20 relative overflow-hidden ${glitch ? 'animate-pulse' : ''} cursor-pointer transition-all duration-300`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
      <div className="relative z-10 text-center space-y-6">
        <div className="text-red-400 text-sm font-bold uppercase tracking-[0.3em] transition-transform duration-300 hover:scale-105">Warning</div>
        <h3 className="text-3xl md:text-4xl font-display font-bold text-white transition-all duration-300 hover:text-red-400">
          The information you consume <br className="hidden md:block" />
          <span className="text-red-400 transition-colors duration-300 hover:text-white">becomes</span> your intelligence
        </h3>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-300 hover:text-slate-300">
          Artificial intelligence is not evolving naturally; it is fed artificially. Call it AI, call it anything it's shaped by artificial sources.
        </p>
      </div>
    </motion.div>
  );
};

const InfoCard: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -5 }}
    className="glass rounded-2xl p-8 border border-white/5 cursor-pointer transition-all duration-300"
  >
    <h4 className="text-xl font-bold text-white mb-4 transition-colors duration-300 hover:text-sky-400">{title}</h4>
    <p className="text-slate-400 leading-relaxed transition-all duration-300 hover:text-slate-300 hover:pl-2">{content}</p>
  </motion.div>
);

const DualSystemViz: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-8">
    <motion.div
      whileHover={{ scale: 1.02, rotateX: 5 }}
      className="glass rounded-3xl p-10 border border-white/5 relative overflow-hidden group cursor-pointer transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="relative z-10">
        <div className="text-5xl font-display font-bold text-yellow-400 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-yellow-300">System 1</div>
        <div className="space-y-3 text-slate-400 transition-all duration-300 group-hover:text-slate-300">
          <div className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-2">
            <Zap size={20} className="text-yellow-400 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
            <span>Fast & Instinctive</span>
          </div>
          <div className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-2">
            <Wind size={20} className="text-yellow-400 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
            <span>Emotional & Automatic</span>
          </div>
          <div className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-2">
            <Sparkles size={20} className="text-yellow-400 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
            <span>Intuitive Insights</span>
          </div>
        </div>
      </div>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.02, rotateX: 5 }}
      className="glass rounded-3xl p-10 border border-white/5 relative overflow-hidden group cursor-pointer transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="relative z-10">
        <div className="text-5xl font-display font-bold text-blue-400 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-300">System 2</div>
        <div className="space-y-3 text-slate-400 transition-all duration-300 group-hover:text-slate-300">
          <div className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-2">
            <Brain size={20} className="text-blue-400 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
            <span>Slow & Analytical</span>
          </div>
          <div className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-2">
            <Droplets size={20} className="text-blue-400 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
            <span>Deliberate & Effortful</span>
          </div>
          <div className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-2">
            <Compass size={20} className="text-blue-400 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
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
    <motion.div
      whileHover={{ scale: 1.05, y: -3 }}
      className={`glass rounded-2xl p-8 border bg-gradient-to-br ${colors[color as keyof typeof colors]} cursor-pointer transition-all duration-300`}
    >
      <h4 className="text-lg font-bold text-white mb-3 transition-colors duration-300 hover:text-sky-400">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed transition-all duration-300 hover:text-slate-300 hover:scale-105">{description}</p>
    </motion.div>
  );
};

const FinalCard: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.03, rotateY: 2 }}
    className="glass rounded-2xl p-8 border border-white/5 cursor-pointer transition-all duration-300 transform"
  >
    <h4 className="text-xl font-bold text-white mb-4 transition-colors duration-300 hover:text-sky-400">{title}</h4>
    <p className="text-slate-400 leading-relaxed transition-all duration-300 hover:text-slate-300">{content}</p>
  </motion.div>
);

const BeliefRiskContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="glass rounded-3xl p-8 md:p-12 border border-white/10 bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-32 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles size={20} className="text-violet-400" />
              <h3 className="text-xl font-bold text-white">Systemic Assessment: Belief Priming</h3>
            </div>

            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                <strong className="text-white">The Core Thesis:</strong> When the mind externalizes risk into objects or systems (like crash guards or insurance), it subconsciously permits the event it claims to protect against. This is <span className="text-violet-300">expectation rehearsal</span>.
              </p>
              <p>
                The separation of <em className="text-white">self, object, and guard</em> creates a false modularity. In reality, these are a single coupled system. Treating them as separable introduces <strong className="text-white">lag in reaction loops</strong>—exactly where accidents happen.
              </p>
            </div>

            <div className="pt-4">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Bottom Line</span>
              <p className="text-white italic mt-2 border-l-2 border-sky-500/30 pl-4">
                "Evolution favors systems that integrate risk internally, not those that outsource it psychologically. The intuition is directionally correct."
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-4 border-t md:border-t-0 md:border-l border-white/10 md:pl-12 pt-8 md:pt-0">
            <h4 className="text-white font-bold mb-4">Key Frameworks:</h4>
            <ul className="space-y-6">
              <li className="group">
                <span className="block text-white font-medium mb-1 group-hover:text-sky-400 transition-colors">Money as a Vector</span>
                <span className="text-slate-500 text-sm">A multidimensional coordination problem, often restricted by fear-based hoarding.</span>
              </li>
              <li className="group">
                <span className="block text-white font-medium mb-1 group-hover:text-sky-400 transition-colors">DeltaTH Intuition</span>
                <span className="text-slate-500 text-sm">Misplaced thoughts that miss their recall window mutate and interfere with downstream cognitive calculations.</span>
              </li>
              <li className="group">
                <span className="block text-white font-medium mb-1 group-hover:text-sky-400 transition-colors">Biological Integration</span>
                <span className="text-slate-500 text-sm">Evolution favors systems that integrate risk internally, not those that outsource it psychologically.</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <VisualCard
          title="The Crash Guard Paradox"
          description="Splitting the system creates 'chunks' of failure."
          color="sky"
        >
          <CrashGuardVisual />
        </VisualCard>
        <VisualCard
          title="Money Vector"
          description="Fear collapses your future options."
          color="violet"
        >
          <MoneyVectorVisual />
        </VisualCard>
        <VisualCard
          title="DeltaTH Decay"
          description="Misplaced thoughts create cognitive noise."
          color="rose"
        >
          <DeltaTHVisual />
        </VisualCard>
      </div>
    </div>
  );
};

const SimpleExplanationContent: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <SimpleCard
        title="The Bike Trick"
        description="If you wear knee pads and think 'I can't get hurt,' you might stop paying attention. Focus on being a great rider instead!"
        icon={<Bike size={32} />}
        color="rose"
      />
      <SimpleCard
        title="The Magic Jar"
        description="Saving money because you're scared of 'monsters' creates fear. Saving for 'adventures' builds a rocket ship!"
        icon={<Wallet size={32} />}
        color="amber"
      />
      <SimpleCard
        title="The Missed Joke"
        description="Thinking of a joke on Monday but telling it on Tuesday isn't funny. It's 'cluttered' because it's in the wrong spot."
        icon={<Brain size={32} />}
        color="pink"
      />
    </div>
  );
};

const VisualCard: React.FC<{ title: string; description: string; color: string; children: React.ReactNode }> = ({ title, description, color, children }) => {
  const colors = {
    sky: 'from-sky-500/10 to-sky-500/5 border-sky-500/20 shadow-sky-500/10',
    violet: 'from-violet-500/10 to-violet-500/5 border-violet-500/20 shadow-violet-500/10',
    rose: 'from-rose-500/10 to-rose-500/5 border-rose-500/20 shadow-rose-500/10',
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02, rotateX: 2, rotateY: 2 }}
      className={`glass rounded-2xl p-6 border bg-gradient-to-br ${colors[color as keyof typeof colors]} cursor-pointer group relative overflow-hidden h-full flex flex-col`}
    >
      <div className="h-40 mb-6 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-white/10 transition-colors">
        {children}
      </div>
      <div className="mt-auto">
        <h4 className="text-white font-bold mb-2 group-hover:text-white transition-colors">{title}</h4>
        <div className="w-8 h-[2px] bg-white/20 mb-3 group-hover:w-full transition-all duration-500" />
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const SimpleCard: React.FC<{ title: string; description: string; icon: React.ReactNode; color: string }> = ({ title, description, icon, color }) => {
  const styles = {
    rose: 'bg-rose-500/10 text-rose-400 ring-rose-500/20 group-hover:bg-rose-500/20',
    amber: 'bg-amber-500/10 text-amber-400 ring-amber-500/20 group-hover:bg-amber-500/20',
    pink: 'bg-pink-500/10 text-pink-400 ring-pink-500/20 group-hover:bg-pink-500/20',
    sky: 'bg-sky-500/10 text-sky-400 ring-sky-500/20 group-hover:bg-sky-500/20',
  };
  const styleClass = styles[color as keyof typeof styles] || styles.sky;

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="flex gap-6 items-start group cursor-pointer">
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ring-1 transition-all ${styleClass}`}
      >
        {icon}
      </motion.div>
      <div className="space-y-2">
        <h4 className="text-xl font-bold text-white transition-colors">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const CrashGuardVisual: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="relative">
      <motion.div
        className="absolute -top-12 -left-8 w-32 h-32 border-2 border-sky-500/30 rounded-full"
        animate={{ borderColor: ['rgba(14, 165, 233, 0.3)', 'rgba(14, 165, 233, 0.6)', 'rgba(14, 165, 233, 0.3)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="flex gap-2">
        <motion.div whileHover={{ scale: 1.2 }} className="w-8 h-8 rounded-full bg-sky-400 blur-[2px]" />
        <motion.div whileHover={{ scale: 1.2 }} className="w-8 h-8 rounded-full bg-white blur-[2px]" />
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-sky-400 uppercase tracking-widest whitespace-nowrap">False Barrier</div>
    </motion.div>
  </div>
);

const MoneyVectorVisual: React.FC = () => (
  <svg viewBox="0 0 100 60" className="w-full h-full p-4">
    <path d="M10,50 L90,50 M10,10 L10,50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
    <motion.path
      d="M10,50 Q50,45 80,20" stroke="rgba(167, 139, 250, 0.5)" strokeWidth="2" strokeDasharray="4 2" fill="none"
    />
    <motion.path
      d="M10,50 Q50,55 90,50" stroke="#a78bfa" strokeWidth="3" fill="none"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
    />
    <circle cx="90" cy="50" r="3" fill="#a78bfa" />
    <text x="50" y="58" fontSize="4" fill="#a78bfa" textAnchor="middle">Fear Collapses Potential</text>
  </svg>
);

const DeltaTHVisual: React.FC = () => (
  <div className="flex items-center gap-2 w-full justify-center">
    {[1, 2, 3, 4, 5].map((i) => (
      <motion.div
        key={i}
        className={`w-8 h-8 rounded-lg border ${i === 3 ? 'border-rose-500 bg-rose-500/20' : 'border-white/10 bg-white/5'} flex items-center justify-center`}
        animate={{ y: i === 3 ? [0, -10, 0] : 0, opacity: i > 3 ? 0.3 : 1 }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
      >
        {i === 3 && <Zap size={12} className="text-rose-400" />}
      </motion.div>
    ))}
    <div className="absolute bottom-4 text-[8px] text-rose-400 uppercase tracking-widest">Missed Timing Error</div>
  </div>
);

export default FeelAliveView;