import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileVideo, FileImage, FileText, Archive, Download, ExternalLink, Search, Filter, Info, ChevronRight, Clock, HardDrive } from 'lucide-react';
import { useStore, Resource } from '../lib/store';

const ResourcesView: React.FC = () => {
    const resources = useStore(state => state.resources) || [];
    const incrementDownload = useStore(state => state.incrementDownloadCount);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'video' | 'image' | 'pdf' | 'archive'>('all');

    const filteredResources = resources.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || r.type === filter;
        return matchesSearch && matchesFilter;
    });

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'video': return <FileVideo className="text-purple-400" />;
            case 'image': return <FileImage className="text-sky-400" />;
            case 'pdf': return <FileText className="text-red-400" />;
            case 'archive': return <Archive className="text-yellow-400" />;
            default: return <FileText className="text-slate-400" />;
        }
    };

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                <div className="max-w-xl">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                        <HardDrive size={14} /> Repository Node v1.0
                    </motion.div>
                    <h2 className="text-6xl font-display font-bold text-white mb-6">Resource <span className="text-sky-300">Vault.</span></h2>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        Definitive technical assets, high-resolution media, and sovereign documentation.
                        Curated for Pro users and ecosystem developers.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-sky-400/50 transition-all w-full md:w-64"
                        />
                    </div>
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                        {(['all', 'video', 'pdf', 'archive'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-sky-400 text-black shadow-lg shadow-sky-400/20' : 'text-slate-500 hover:text-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResources.map((resource, i) => (
                        <motion.div
                            key={resource.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-sky-400/20 transition-all group relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-sky-400/10 transition-colors">
                                    {getFileIcon(resource.type)}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        <Download size={10} /> {resource.downloads} Downloads
                                    </div>
                                    <div className="text-[10px] text-sky-400/60 font-mono mt-1">{formatSize(resource.size)}</div>
                                </div>
                            </div>

                            <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">{resource.name}</h3>
                            <div className="flex items-center gap-3 text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-10">
                                <Clock size={12} /> {new Date(resource.uploadedAt).toLocaleDateString()}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        window.open(resource.url, '_blank');
                                        incrementDownload(resource.id);
                                    }}
                                    className="flex-1 bg-white/5 hover:bg-sky-400 text-slate-300 hover:text-black font-bold uppercase tracking-widest text-[10px] py-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-white/5 hover:border-sky-400/20"
                                >
                                    <Download size={14} /> Download Asset
                                </button>
                                <div className="relative group/tip">
                                    <button className="w-12 h-12 glass rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                                        <Info size={18} />
                                    </button>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-4 glass rounded-xl border-white/10 opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-50">
                                        <p className="text-[10px] text-slate-300 leading-relaxed text-center">
                                            This resource is verified for <strong>Pro Node</strong> access.
                                            Checksum validated.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Hover glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-40 glass rounded-[3rem] border-dashed border-white/5">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-700 mb-6">
                        <HardDrive size={32} />
                    </div>
                    <p className="text-slate-600 font-display font-bold uppercase tracking-widest text-sm">No assets indexed in this sector</p>
                </div>
            )}
        </div>
    );
};

export default ResourcesView;
