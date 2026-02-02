
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Music, Disc } from 'lucide-react';
import { useStore } from '../lib/store';

const UniversalAudioPlayer: React.FC = () => {
    const { currentAudio, pauseAudio, resumeAudio, stopAudio } = useStore();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.onended = () => {
                stopAudio();
            };
        }

        const audio = audioRef.current;

        if (currentAudio.url) {
            if (audio.src !== currentAudio.url) {
                audio.src = currentAudio.url;
            }

            if (currentAudio.isPlaying) {
                audio.play().catch(err => console.error("Audio play failed:", err));
            } else {
                audio.pause();
            }
        } else {
            audio.pause();
            audio.src = "";
        }

        return () => {
            // No cleanup here as we want the audio to persist across "page" changes
        };
    }, [currentAudio.url, currentAudio.isPlaying, stopAudio]);

    if (!currentAudio.url) return null;

    // Show FAB if paused manually, otherwise show a mini-player if playing
    const showFab = currentAudio.isPausedManually;

    return (
        <AnimatePresence>
            {showFab ? (
                <motion.button
                    key="fab"
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: 20 }}
                    onClick={resumeAudio}
                    className="fixed bottom-24 right-8 z-[150] w-16 h-16 bg-sky-500 text-white rounded-full shadow-2xl shadow-sky-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-white/20 border-t-white"
                    />
                    <Play size={24} fill="currentColor" className="relative z-10 ml-1" />

                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 px-3 py-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="text-[10px] font-bold text-white uppercase tracking-widest">{currentAudio.title}</div>
                        <div className="text-[8px] text-sky-400 uppercase tracking-widest mt-0.5">Resume Reflection</div>
                    </div>
                </motion.button>
            ) : (
                <motion.div
                    key="player"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-24 right-8 z-[150] glass p-4 rounded-[2rem] border-white/10 shadow-2xl flex items-center gap-4 min-w-[280px]"
                >
                    <div className="relative w-12 h-12 flex-shrink-0">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="w-full h-full bg-gradient-to-br from-sky-400 to-indigo-600 rounded-full flex items-center justify-center"
                        >
                            <Disc size={20} className="text-white" />
                        </motion.div>
                        <div className="absolute inset-0 rounded-full border-2 border-white/20" />
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <div className="text-xs font-bold text-white truncate uppercase tracking-widest">{currentAudio.title}</div>
                        <div className="text-[9px] text-slate-400 truncate uppercase tracking-widest mt-0.5">{currentAudio.artist}</div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={pauseAudio}
                            className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
                        >
                            <Pause size={18} fill="currentColor" />
                        </button>
                        <button
                            onClick={stopAudio}
                            className="w-10 h-10 text-slate-500 hover:text-white transition-all flex items-center justify-center"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UniversalAudioPlayer;
