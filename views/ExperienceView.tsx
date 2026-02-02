import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building2, Globe, Heart, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';

const experiences = [
    {
        id: 1,
        role: "Co-Founder",
        company: "CuriousMinds",
        type: "Self-employed",
        period: "Aug 2025 - Present",
        location: "Remote",
        description: "Building world's best platform to learn for students (1st-12th grade). We practice Modern approaches to learning and assessment.",
        details: [
            "Architecting a scalable EdTech platform serving students from grades 1-12.",
            "Implementing 'Real World Solutions' curriculum requiring monthly practical project delivery.",
            "Leading a cross-functional team of educators and developers to blend pedagogy with technology.",
            "Developing AI-driven assessment tools to provide personalized learning paths."
        ],
        color: "text-sky-400",
        rgbValue: "56, 189, 248",
        border: "border-sky-500/30",
        bg: "bg-sky-500/10",
        glow: "shadow-sky-500/20",
        icon: <Globe size={20} />
    },
    {
        id: 2,
        role: "DevOps Practitioner (SRE)",
        company: "AppExert",
        type: "Full-time",
        period: "Jul 2023 - Present",
        location: "Bengaluru, Karnataka - Remote",
        description: "I tackle whatever it needs to keep our platform's infra on a green note. Managing comprehensive cloud infrastructure and automated deployments strategies.",
        details: [
            "Maintained 99.9% uptime for core platform services through proactive monitoring.",
            "Automated infrastructure provisioning using Terraform, reducing setup time by 70%.",
            "Implemented CI/CD pipelines ensuring seamless and reliable daily deployments.",
            "Optimized cloud costs by analyzing usage patterns and implemented auto-scaling strategies."
        ],
        skills: ["Terraform", "SRE", "Cloud Infra"],
        color: "text-red-400",
        rgbValue: "248, 113, 113",
        border: "border-red-500/30",
        bg: "bg-red-500/10",
        glow: "shadow-red-500/20",
        icon: <Building2 size={20} />
    },
    {
        id: 3,
        role: "Founder",
        company: "Propertyfie",
        type: "Self-employed",
        period: "Oct 2024 - Present",
        location: "Bengaluru, Karnataka - Remote",
        description: "We help organisations to guide their people with estate investments with guaranteed returns (of-course more than expected returns).",
        details: [
            "Developed a proprietary algorithm to identify high-yield real estate investment zones.",
            "Consulted for 20+ organizations to structure employee real estate investment portfolios.",
            "Built a digital platform for transparent property tracking and valuation.",
            "Negotiated strategic partnerships with top-tier real estate developers in Karnataka."
        ],
        skills: ["Terraform", "Real Estate Investment", "Consulting"],
        color: "text-amber-400",
        rgbValue: "251, 191, 36",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        glow: "shadow-amber-500/20",
        icon: <Building2 size={20} />
    },
    {
        id: 4,
        role: "Product Engineer",
        company: "FCM Travel",
        type: "Full-time",
        period: "Sep 2022 - Jun 2023",
        location: "Bengaluru, Karnataka - On-site",
        description: "Worked as a POC for L3 level of escalations between the client and major aviation giants like Oman air, Finnair, Gulf air, Egypt air.",
        details: [
            "Resolved critical L3 escalations involving complex GDS (Global Distribution System) issues.",
            "Acted as the technical bridge between major airlines (Oman Air, Finnair) and the internal product team.",
            "Reduced ticket resolution time by 40% through better documentation and process optimization.",
            "Contributed to the innovation roadmap for the next-gen travel booking engine."
        ],
        color: "text-emerald-400",
        rgbValue: "52, 211, 153",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        glow: "shadow-emerald-500/20",
        icon: <Globe size={20} />
    },
    {
        id: 5,
        role: "Risk Analyst-Buyers",
        company: "Amazon",
        type: "Full-time",
        period: "Sep 2021 - Aug 2022",
        location: "Bengaluru, Karnataka - Remote",
        description: "Investigation and elimination of online risk. Investigating Amazon's Website for any phishing attacks and implementing preventive measures.",
        details: [
            "Monitored and researched emerging phishing threats targeting Amazon's marketplace.",
            "Analyzed thousands of transaction patterns to identify and block fraudulent behavior.",
            "Collaborated with global security teams to update risk detection algorithms.",
            "Protected buyer accounts by proactively identifying compromised credentials."
        ],
        color: "text-orange-400",
        rgbValue: "251, 146, 60",
        border: "border-orange-500/30",
        bg: "bg-orange-500/10",
        glow: "shadow-orange-500/20",
        icon: <Building2 size={20} />
    }
];

const ExperienceView: React.FC = () => {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <section className="relative w-full py-32 px-4 md:px-10 overflow-hidden" id="experience">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/5 blur-[120px] rounded-full animate-pulse" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 mb-6">
                        <Heart size={12} className="text-red-400 animate-pulse" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-300">Journey So Far</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                        Grateful for these <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Opportunities</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Every role has been a lesson in scale, resilience, and human psychology.
                        Click on any role to see the deeper story.
                    </p>
                </motion.div>

                {/* Timeline Grid */}
                <div className="grid grid-cols-1 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute left-8 top-8 bottom-8 w-[1px] bg-gradient-to-b from-sky-500/50 via-white/10 to-transparent hidden md:block" />

                    {experiences.map((exp, index) => {
                        const isExpanded = expandedId === exp.id;
                        return (
                            <motion.div
                                key={exp.id}
                                layout
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative md:pl-24"
                                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                                onMouseMove={handleMouseMove}
                            >
                                {/* Timeline Dot (Desktop) */}
                                <div className={`hidden md:flex absolute left-[27px] top-8 w-3 h-3 rounded-full border border-black ${exp.bg.replace('/10', '/50')} shadow-[0_0_20px_currentColor] z-10`} />

                                <motion.div
                                    layout
                                    whileHover={{ scale: 1.01 }}
                                    className={`group relative p-8 md:p-10 rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl cursor-pointer overflow-hidden transition-all duration-500 hover:border-white/20`}
                                >
                                    {/* Spotlight implementation */}
                                    <div
                                        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${(exp as any).rgbValue}, 0.15), transparent 60%)`
                                        }}
                                    />

                                    {/* Hover Glow Effect (Backlight) */}
                                    <div
                                        className="absolute -inset-20 opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-[100px] -z-20 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${(exp as any).rgbValue}, 0.4), transparent 70%)`
                                        }}
                                    />

                                    {/* Active Glow Effect */}
                                    {isExpanded && (
                                        <div className={`absolute -inset-32 opacity-20 bg-gradient-to-br ${exp.bg} blur-[150px] -z-20`} />
                                    )}

                                    <div className="flex flex-col lg:flex-row gap-8 lg:items-start justify-between relative z-10">
                                        {/* Left Content */}
                                        <div className="flex-1 space-y-4">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <h3 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:text-white transition-colors`}>
                                                    {exp.role}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${exp.border} ${exp.color} ${exp.bg}`}>
                                                    {exp.company}
                                                </span>
                                            </div>

                                            <p className="text-slate-400 leading-relaxed font-light group-hover:text-slate-200 transition-colors">
                                                {exp.description}
                                            </p>

                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                        animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className={`p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3 ${exp.border}`}>
                                                            <div className="flex items-center gap-2 mb-4">
                                                                <Sparkles size={16} className={exp.color} />
                                                                <span className="text-xs font-bold uppercase tracking-widest text-white">Key Responsibilities</span>
                                                            </div>
                                                            <ul className="space-y-3">
                                                                {exp.details.map((detail, i) => (
                                                                    <motion.li
                                                                        key={i}
                                                                        initial={{ opacity: 0, x: -10 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: i * 0.1 }}
                                                                        className="flex items-start gap-3 text-sm text-slate-300"
                                                                    >
                                                                        <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${exp.color} opacity-70`} />
                                                                        <span className="leading-relaxed">{detail}</span>
                                                                    </motion.li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {exp.skills && (
                                                <div className="flex flex-wrap gap-2 pt-4">
                                                    {exp.skills.map((skill, i) => (
                                                        <span key={i} className={`text-[10px] px-2 py-1 rounded-md bg-white/5 text-slate-500 font-mono border border-white/5 group-hover:border-white/10 group-hover:text-slate-300 transition-all`}>
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Meta Data */}
                                        <div className="flex flex-row lg:flex-col gap-4 lg:gap-2 min-w-[200px] text-sm text-slate-500 font-mono border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-8">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className={exp.color} />
                                                <span>{exp.period}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={14} className={exp.color} />
                                                <span>{exp.type}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} className={exp.color} />
                                                <span>{exp.location}</span>
                                            </div>

                                            <div className="hidden lg:flex mt-auto justify-end relative z-10">
                                                <motion.div
                                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                                    className={`p-2 rounded-full bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors`}
                                                >
                                                    <ChevronDown size={20} />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile expand icon */}
                                    <div className="lg:hidden absolute top-8 right-8">
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            className="text-slate-500"
                                        >
                                            <ChevronDown size={20} />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ExperienceView;
