import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, Square, Globe, Volume2, Mic2, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Constants ---

interface TranslationData {
    [key: string]: {
        nativeName: string;
        langCode: string; // BCP 47
        sections: {
            title: string;
            content: string;
        }[];
    };
}

// Full page narration data
const FULL_NARRATION: TranslationData = {
    english: {
        nativeName: 'English',
        langCode: 'en-US',
        sections: [
            { title: "Introduction", content: "The mind is alive. Watch it like a display. Let thoughts pass. Most people treat their mind like a storage device, but it is actually a living system." },
            { title: "Dimensional Thinking", content: "We often think in two dimensions: text and emotion. But true intelligence is multidimensional. Children understand this intuitively until they are taught to think linearly." },
            { title: "The Crash Guard Paradox", content: "Consider a bike's crash guard. When you add protection, your mind subconsciously permits more risk. You stop being a great rider because you believe the guard will save you. This externalization of risk creates the very failure it tries to prevent." },
            { title: "The Money Vector", content: "Money is not just a number; it is a vector of potential. When you save out of fear, you collapse your future options. When you save for adventure, you build a rocket ship." },
            { title: "Learning & Mentors", content: "True learning happens when there is no third party. Teachers often bias your learning with their own limits. Approach a mentor to connect dots, but let the understanding be yours alone." }
        ]
    },
    hindi: {
        nativeName: 'हिन्दी (Hindi)',
        langCode: 'hi-IN',
        sections: [
            { title: "प्रस्तावना", content: "मन जीवित है। इसे एक प्रदर्शन की तरह देखें। विचारों को गुजरने दें। बहुत से लोग अपने मन को स्टोरेज डिवाइस की तरह मानते हैं, लेकिन यह वास्तव में एक जीवित प्रणाली है।" },
            { title: "आयामी सोच", content: "हम अक्सर दो आयामों में सोचते हैं: शब्द और भावना। लेकिन वास्तविक बुद्धिमत्ता बहुआयामी होती है। बच्चे इसे तब तक सहज रूप से समझते हैं जब तक उन्हें रैखिक रूप से सोचना नहीं सिखाया जाता।" },
            { title: "क्रैश गार्ड विरोधाभास", content: "बाइक के क्रैश गार्ड के बारे में सोचें। जब आप सुरक्षा जोड़ते हैं, तो आपका मन अनजाने में अधिक जोखिम लेने की अनुमति देता है। आप एक बेहतरीन राइडर बनना बंद कर देते हैं क्योंकि आपको लगता है कि गार्ड आपको बचा लेगा। जोखिम का यह बाहरीकरण उसी विफलता को जन्म देता है जिसे वह रोकने की कोशिश करता है।" },
            { title: "धन का वेक्टर", content: "पैसा केवल एक संख्या नहीं है; यह क्षमता का एक वेक्टर है। जब आप डर के कारण बचत करते हैं, तो आप अपने भविष्य के विकल्पों को खत्म कर देते हैं। जब आप रोमांच के लिए बचत करते हैं, तो आप एक रॉकेट शिप बनाते हैं।" },
            { title: "सीखना और गुरु", content: "सच्ची सीख तब होती है जब कोई तीसरा पक्ष न हो। शिक्षक अक्सर अपनी सीमाओं के साथ आपकी सीख को प्रभावित करते हैं। डॉट्स को जोड़ने के लिए किसी गुरु के पास जाएं, लेकिन समझ केवल आपकी होनी चाहिए।" }
        ]
    },
    maithili: {
        nativeName: 'मैथिली (Maithili)',
        langCode: 'hi-IN',
        sections: [
            { title: "प्रारंभ", content: "मन जीवित अछि। एकरा प्रदर्शन जकां देखू। विचार सब के बितय दियौ।" },
            { title: "क्रैश गार्ड", content: "बाइक में क्रैश गार्ड लगावे स अहाँक मन अधिक जोखिम लेवाक अनुमति दैत अछि। अहाँ एकटा नीक राइडर बनब बन्द कऽ दय छी किअक त अहाँक मन में रहैत अछि जे गार्ड रक्षा कऽ लेत।" },
            { title: "पैसा", content: "पैसा केवल अंक नहि थिक, ई अहाँक भविष्यक क्षमता थिक। डर स पैसा जमा करब त अहाँक विकल्प कम भऽ जाएत।" }
        ]
    },
    bhojpuri: {
        nativeName: 'भोजपुरी (Bhojpuri)',
        langCode: 'hi-IN',
        sections: [
            { title: "सुरआत", content: "मन जिंदा बा। एकरा के डिस्प्ले लेखा देखीं। विचारन के आवे-जाए दीं।" },
            { title: "साइकिल वाला बात", content: "जब रउआ मोटरसाइकिल में गार्ड लगवा लेब त रउआ मन में बेसी रिस्क लेवे के बात आ जाई। रउआ सोचीं कि ई गार्ड बचा ली, लेकिन असल में ई रिस्क बढ़ा देला।" }
        ]
    },
    sanskrit: {
        nativeName: 'संस्कृतम् (Sanskrit)',
        langCode: 'hi-IN',
        sections: [
            { title: "मंगलाचरणम्", content: "मनः जीवन्तम् अस्ति। तत् प्रदर्शकम् इव पश्य। विचारान् गच्छन्तु।" },
            { title: "बोधः", content: "शिक्षकः न केवलं पाठयति, सः अज्ञानं अपि ददाति। वास्तविकं ज्ञानं अन्तः अस्ति।" }
        ]
    }
};

const UniversalAudioPlayer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('english');
    const [rate, setRate] = useState(1);
    const [gender, setGender] = useState<'male' | 'female'>('female');
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

    const synth = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synth.current = window.speechSynthesis;
            const loadVoices = () => setVoices(synth.current?.getVoices() || []);
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const handlePlayPause = () => {
        if (!synth.current) return;

        if (isPlaying) {
            synth.current.pause();
            setIsPlaying(false);
        } else {
            if (synth.current.paused) {
                synth.current.resume();
                setIsPlaying(true);
            } else {
                speakSection(currentSectionIndex);
            }
        }
    };

    const speakSection = (index: number) => {
        if (!synth.current) return;
        synth.current.cancel();

        const langData = FULL_NARRATION[selectedLanguage] || FULL_NARRATION['english'];
        const section = langData.sections[index];
        if (!section) return;

        const utterance = new SpeechSynthesisUtterance(section.content);
        utterance.rate = rate;

        // Voice Selection Logic
        const targetVoice = voices.find(v =>
            v.lang.startsWith(langData.langCode.split('-')[0]) &&
            (gender === 'female' ? /female|zira|samantha|google/i.test(v.name) : /male|david|mark/i.test(v.name))
        ) || voices.find(v => v.lang.startsWith(langData.langCode.split('-')[0]));

        if (targetVoice) utterance.voice = targetVoice;

        utterance.onend = () => {
            if (index < langData.sections.length - 1) {
                setCurrentSectionIndex(index + 1);
                speakSection(index + 1);
            } else {
                setIsPlaying(false);
                setCurrentSectionIndex(0);
            }
        };

        synth.current.speak(utterance);
        setIsPlaying(true);
        setCurrentSectionIndex(index);
    };

    const handleStop = () => {
        synth.current?.cancel();
        setIsPlaying(false);
        setCurrentSectionIndex(0);
    };

    const langData = FULL_NARRATION[selectedLanguage] || FULL_NARRATION['english'];

    return (
        <div className="fixed bottom-8 left-8 z-50 flex flex-col items-start gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="glass border border-white/20 p-6 rounded-2xl w-85 shadow-2xl backdrop-blur-xl bg-black/90"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-sky-400">
                                <Globe size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Page Narration</span>
                            </div>
                            <button onClick={handleStop} className="text-slate-500 hover:text-white transition-colors">
                                <Square size={14} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="space-y-1">
                                <label className="text-[10px] text-slate-500 font-mono uppercase">Language</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-slate-200 focus:outline-none"
                                    value={selectedLanguage}
                                    onChange={(e) => {
                                        setSelectedLanguage(e.target.value);
                                        handleStop();
                                    }}
                                >
                                    {Object.entries(FULL_NARRATION).map(([key, val]) => (
                                        <option key={key} value={key} className="bg-slate-900">{val.nativeName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] text-slate-500 font-mono uppercase">Voice</label>
                                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                                    <button onClick={() => { setGender('male'); handleStop(); }} className={`flex-1 py-1 text-[10px] rounded-md ${gender === 'male' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-500'}`}>MALE</button>
                                    <button onClick={() => { setGender('female'); handleStop(); }} className={`flex-1 py-1 text-[10px] rounded-md ${gender === 'female' ? 'bg-pink-500/20 text-pink-400' : 'text-slate-500'}`}>FEMALE</button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/50 rounded-xl p-4 border border-white/5 mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-tighter">
                                    {langData.sections[currentSectionIndex]?.title}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                    {currentSectionIndex + 1} / {langData.sections.length}
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed italic h-24 overflow-y-auto custom-scrollbar pr-2">
                                "{langData.sections[currentSectionIndex]?.content}"
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => speakSection(Math.max(0, currentSectionIndex - 1))}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={handlePlayPause}
                                className={`flex-1 h-12 rounded-full flex items-center justify-center gap-3 font-bold transition-all ${isPlaying
                                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                        : 'bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg'
                                    }`}
                            >
                                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                <span>{isPlaying ? 'PAUSE' : 'START JOURNEY'}</span>
                            </button>
                            <button
                                onClick={() => speakSection(Math.min(langData.sections.length - 1, currentSectionIndex + 1))}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                            <Volume2 size={12} className="text-slate-500" />
                            <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            <span className="text-[10px] text-slate-500 font-mono">{rate}x</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full glass border border-white/20 flex items-center justify-center shadow-2xl transition-all ${isOpen ? 'bg-white/10 text-white' : 'bg-black/40 text-sky-400'}`}
            >
                {isOpen ? <Volume2 size={24} /> : <Mic2 size={24} />}
            </motion.button>
        </div>
    );
};

export default UniversalAudioPlayer;
