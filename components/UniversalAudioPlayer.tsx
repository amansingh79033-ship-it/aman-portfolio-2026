import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, Square, Settings, Volume2, Globe, Sparkles, Mic2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Constants ---

interface TranslationData {
    [key: string]: {
        text: string;
        langCode: string; // BCP 47 tag
        nativeName: string;
    };
}

// Pre-translated manifesto text for "zero latency" playback
const MANIFESTO_TRANSLATIONS: TranslationData = {
    english: {
        text: "The mind is alive. Watch it like a display. Let thoughts pass.",
        langCode: 'en-US',
        nativeName: 'English'
    },
    hindi: {
        text: "मन जीवित है। इसे एक प्रदर्शन की तरह देखें। विचारों को गुजरने दें।",
        langCode: 'hi-IN',
        nativeName: 'हिन्दी (Hindi)'
    },
    maithili: {
        text: "मन जीवित अछि। एकरा प्रदर्शन जकां देखू। विचार सब के बितय दियौ।",
        langCode: 'hi-IN', // Maithili often uses Hindi TTS voice if specific not avail
        nativeName: 'मैथिली (Maithili)'
    },
    bhojpuri: {
        text: "मन जिंदा बा। एकरा के डिस्प्ले लेखा देखीं। विचारन के आवे-जाए दीं।",
        langCode: 'hi-IN', // Fallback to Hindi voice
        nativeName: 'भोजपुरी (Bhojpuri)'
    },
    sanskrit: {
        text: "मनः जीवन्तम् अस्ति। तत् प्रदर्शकम् इव पश्य। विचारान् गच्छन्तु।",
        langCode: 'hi-IN', // Sanskrit reads well with Hindi voice
        nativeName: 'संस्कृतम् (Sanskrit)'
    },
    spanish: {
        text: "La mente está viva. Obsérvala como una pantalla. Deja pasar los pensamientos.",
        langCode: 'es-ES',
        nativeName: 'Español'
    },
    german: {
        text: "Der Geist ist lebendig. Betrachte ihn wie einen Bildschirm. Lass Gedanken vorbeiziehen.",
        langCode: 'de-DE',
        nativeName: 'Deutsch'
    },
    malayalam: {
        text: "മനസ്സ് ജീവനുള്ളതാണ്. ഒരു ഡിസ്പ്ലേ പോലെ അതിനെ കാണുക. ചിന്തകളെ കടന്നുപോകാൻ അനുവദിക്കുക.",
        langCode: 'ml-IN',
        nativeName: 'മലയാളം (Malayalam)'
    },
    tamil: {
        text: "மனம் உயிருள்ளது. அதை ஒரு திரை போல பாருங்கள். எண்ணங்களை கடந்து செல்ல விடுங்கள்.",
        langCode: 'ta-IN',
        nativeName: 'தமிழ் (Tamil)'
    },
    telugu: {
        text: "మనస్సు సజీవంగా ఉంది. దానిని ఒక ప్రదర్శనలా చూడండి. ఆలోచనలను వెళ్లనివ్వండి.",
        langCode: 'te-IN',
        nativeName: 'తెలుగు (Telugu)'
    },
    kannada: {
        text: "ಮನಸ್ಸು ಜೀವಂತವಾಗಿದೆ. ಅದನ್ನು ಪ್ರದರ್ಶನದಂತೆ ನೋಡಿ. ಆಲೋಚನೆಗಳು ಹಾದುಹೋಗಲಿ.",
        langCode: 'kn-IN',
        nativeName: 'ಕನ್ನಡ (Kannada)'
    },
    arabic: {
        text: "العقل حي. شاهده كشاشة عرض. دعه الأفكار تمر.",
        langCode: 'ar-SA',
        nativeName: 'العربية (Arabic)'
    },
    urdu: {
        text: "ذہن زندہ ہے۔ اسے ایک ڈسپلے کی طرح دیکھیں۔ خیالات کو گزرنے دیں۔",
        langCode: 'ur-PK',
        nativeName: 'اردو (Urdu)'
    },
    farsi: {
        text: "ذهن زنده است. آن را مانند یک نمایشگر تماشا کنید. بگذارید افکار عبور کنند.",
        langCode: 'fa-IR',
        nativeName: 'فارسی (Persian)'
    },
    chinese: {
        text: "思想是鲜活的。像看显示屏一样观察它。让思绪飘过。",
        langCode: 'zh-CN',
        nativeName: '中文 (Chinese)'
    },
    korean: {
        text: "마음은 살아있습니다. 디스플레이처럼 지켜보세요. 생각들이 지나가게 두세요.",
        langCode: 'ko-KR',
        nativeName: '한국어 (Korean)'
    },
    scottish: {
        text: "The mind is alive. Watch it like a show. Let thoughts gang by.",
        langCode: 'en-GB', // Will prefer UK/Scottish voices
        nativeName: 'Scottish'
    }
};

// --- Component ---

const UniversalAudioPlayer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('english');
    const [rate, setRate] = useState(1);
    const [gender, setGender] = useState<'male' | 'female' | 'any'>('any');

    // Synthesis Ref
    const synth = useRef<SpeechSynthesis | null>(null);
    const utterance = useRef<SpeechSynthesisUtterance | null>(null);

    // Initialize Voices
    useEffect(() => {
        if (typeof window !== 'undefined') {
            synth.current = window.speechSynthesis;

            const loadVoices = () => {
                let available = synth.current?.getVoices() || [];
                // Sort for better UX: Google/Microsoft voices first (higher quality)
                available = available.sort((a, b) => {
                    const aScore = a.name.includes('Google') || a.name.includes('Microsoft') ? 1 : 0;
                    const bScore = b.name.includes('Google') || b.name.includes('Microsoft') ? 1 : 0;
                    return bScore - aScore;
                });
                setVoices(available);
            };

            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;

            return () => {
                window.speechSynthesis.cancel();
            };
        }
    }, []);

    // Filtered Voices based on Language & Gender
    const availableVoices = useMemo(() => {
        const langCode = MANIFESTO_TRANSLATIONS[selectedLanguage].langCode;
        return voices.filter(v => {
            // Match Language code broadly (e.g. en-US matches en)
            const langMatch = v.lang.startsWith(langCode.split('-')[0]);

            // Gender Heuristics (Basic)
            // Most reliable voices have gender in name, or we rely on user preference finding a voice
            // Note: Web Speech API often doesn't expose gender property directly standardly.
            // We'll trust the user to select from the filtered list if we can't detect.
            // But we can filter play request.
            return langMatch;
        });
    }, [voices, selectedLanguage]);

    // Handle Play
    const handlePlay = () => {
        if (!synth.current) return;

        // Cancel existing
        synth.current.cancel();

        const data = MANIFESTO_TRANSLATIONS[selectedLanguage];
        const newUtterance = new SpeechSynthesisUtterance(data.text);

        // Find Best Voice
        // 1. Match Language Exact
        // 2. Match Gender Preference if implicit in name (e.g. "Google Hindi" is usually female, "Microsoft" often has names)
        let targetVoice = voices.find(v => v.lang === data.langCode && (gender === 'any' || checkVoiceGender(v.name, gender)));

        // Fallback: Just language match
        if (!targetVoice) {
            targetVoice = voices.find(v => v.lang.startsWith(data.langCode.split('-')[0]));
        }

        // Special handling for Scottish
        if (selectedLanguage === 'scottish') {
            const scotVoice = voices.find(v => v.lang === 'en-GB' && (v.name.includes('Scotland') || v.name.includes('UK')));
            if (scotVoice) targetVoice = scotVoice;
        }

        if (targetVoice) {
            newUtterance.voice = targetVoice;
        }

        newUtterance.rate = rate;
        newUtterance.pitch = 1;
        newUtterance.volume = 1;

        newUtterance.onend = () => setIsPlaying(false);
        newUtterance.onerror = (e) => {
            console.error("TTS Error", e);
            setIsPlaying(false);
        }

        utterance.current = newUtterance;
        synth.current.speak(newUtterance);
        setIsPlaying(true);
    };

    const handleStop = () => {
        if (synth.current) {
            synth.current.cancel();
            setIsPlaying(false);
        }
    };

    // Helper: Guess gender from voice name
    const checkVoiceGender = (name: string, target: 'male' | 'female'): boolean => {
        const n = name.toLowerCase();
        if (target === 'female') return n.includes('female') || n.includes('google') || n.includes('zira') || n.includes('samantha');
        if (target === 'male') return n.includes('male') || n.includes('david') || n.includes('mark');
        return true;
    };

    return (
        <div className="fixed bottom-8 left-8 z-50 flex flex-col items-start gap-4">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="glass border border-white/20 p-6 rounded-2xl w-80 shadow-2xl backdrop-blur-xl bg-black/80"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-sky-400">
                                <Globe size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Global Neural Voice</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] text-slate-400">Online</span>
                            </div>
                        </div>

                        {/* Language Selector */}
                        <div className="space-y-4 mb-6">
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500 font-mono">LANGUAGE / REGION</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500/50"
                                    value={selectedLanguage}
                                    onChange={(e) => {
                                        setSelectedLanguage(e.target.value);
                                        handleStop();
                                    }}
                                >
                                    {Object.entries(MANIFESTO_TRANSLATIONS).map(([key, val]) => (
                                        <option key={key} value={key} className="bg-slate-900">
                                            {val.nativeName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 space-y-1">
                                    <label className="text-xs text-slate-500 font-mono">GENDER</label>
                                    <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                                        <button
                                            onClick={() => setGender('male')}
                                            className={`flex-1 py-1 text-xs rounded-md transition-all ${gender === 'male' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            M
                                        </button>
                                        <button
                                            onClick={() => setGender('female')}
                                            className={`flex-1 py-1 text-xs rounded-md transition-all ${gender === 'female' ? 'bg-pink-500/20 text-pink-400' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            F
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <label className="text-xs text-slate-500 font-mono">SPEED: {rate}x</label>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="2"
                                        step="0.1"
                                        value={rate}
                                        onChange={(e) => setRate(parseFloat(e.target.value))}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={isPlaying ? handleStop : handlePlay}
                                className={`flex-1 py-3 type="button" rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${isPlaying
                                        ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                                        : 'bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg hover:shadow-sky-500/25'
                                    }`}
                            >
                                {isPlaying ? (
                                    <>
                                        <Square size={16} fill="currentColor" />
                                        <span>STOP</span>
                                    </>
                                ) : (
                                    <>
                                        <Play size={16} fill="currentColor" />
                                        <span>LISTEN</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Text Preview */}
                        <div className="mt-4 p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-slate-400 italic leading-relaxed min-h-[60px]">
                            "{MANIFESTO_TRANSLATIONS[selectedLanguage].text}"
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full glass border border-white/20 flex items-center justify-center shadow-2xl transition-all ${isOpen ? 'bg-white/10 text-white' : 'bg-black/40 text-sky-400 hover:text-white'}`}
            >
                {isOpen ? <Volume2 size={24} /> : <Mic2 size={24} />}
            </motion.button>
        </div>
    );
};

export default UniversalAudioPlayer;
