import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Visit {
    id: string;
    ip: string;
    path: string;
    timestamp: number;
    status: 'active' | 'frozen';
    userAgent: string;
}

export interface ShowcaseItem {
    id: string;
    image: string;
    title: string;
}

export interface Resource {
    id: string;
    name: string;
    url: string;
    type: 'video' | 'image' | 'pdf' | 'archive' | 'other';
    size: number;
    downloads: number;
    uploadedAt: number;
}

interface AppState {
    visits: Visit[];
    messages: VoiceMessage[];
    frozenIps: string[];
    showcaseItems: ShowcaseItem[];
    resources: Resource[];
    addVisit: (visit: Omit<Visit, 'id' | 'timestamp' | 'status'>) => void;
    addMessage: (message: Omit<VoiceMessage, 'id' | 'timestamp'>) => void;
    freezeIp: (ip: string) => void;
    unfreezeIp: (ip: string) => void;
    isIpFrozen: (ip: string) => boolean;
    setShowcaseImage: (type: 'profile' | 'project1' | 'project2', base64: string) => void;
    addShowcaseFrame: (image: string, title: string) => void;
    removeShowcaseFrame: (id: string) => void;
    reorderShowcase: (startIndex: number, endIndex: number) => void;
    toggleVisitStatus: (visitId: string) => void;
    addResource: (resource: Omit<Resource, 'id' | 'downloads' | 'uploadedAt'>) => void;
    removeResource: (id: string) => void;
    incrementDownloadCount: (id: string) => void;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            visits: [],
            messages: [],
            frozenIps: [],
            showcaseItems: [
                { id: 'profile', title: 'Profile Identity', image: '' },
                { id: 'project1', title: 'Project Alpha', image: '' },
                { id: 'project2', title: 'Project Beta', image: '' }
            ],
            resources: [],
            addVisit: (data) => {
                const visit: Visit = {
                    ...data,
                    id: Math.random().toString(36).substr(2, 9),
                    timestamp: Date.now(),
                    status: get().frozenIps.includes(data.ip) ? 'frozen' : 'active',
                };
                set((state) => ({ visits: [visit, ...state.visits].slice(0, 1000) }));
            },
            addMessage: (data) => {
                const message: VoiceMessage = {
                    ...data,
                    id: Math.random().toString(36).substr(2, 9),
                    timestamp: Date.now(),
                };
                set((state) => ({ messages: [message, ...state.messages] }));
            },
            freezeIp: (ip) => set((state) => ({
                frozenIps: [...state.frozenIps, ip],
                visits: state.visits.map(v => v.ip === ip ? { ...v, status: 'frozen' } : v)
            })),
            unfreezeIp: (ip) => set((state) => ({
                frozenIps: state.frozenIps.filter(i => i !== ip),
                visits: state.visits.map(v => v.ip === ip ? { ...v, status: 'active' } : v)
            })),
            isIpFrozen: (ip) => get().frozenIps.includes(ip),
            setShowcaseImage: (type, base64) => set((state) => ({
                showcaseItems: state.showcaseItems.map(item =>
                    item.id === type ? { ...item, image: base64 } : item
                )
            })),
            addShowcaseFrame: (image, title) => set((state) => ({
                showcaseItems: [...state.showcaseItems, { id: Math.random().toString(36).substr(2, 9), image, title }]
            })),
            removeShowcaseFrame: (id) => set((state) => ({
                showcaseItems: state.showcaseItems.filter(item => item.id !== id)
            })),
            reorderShowcase: (startIndex, endIndex) => set((state) => {
                const items = [...state.showcaseItems];
                const [reorderedItem] = items.splice(startIndex, 1);
                items.splice(endIndex, 0, reorderedItem);
                return { showcaseItems: items };
            }),
            addResource: (data) => set((state) => ({
                resources: [{ ...data, id: Math.random().toString(36).substr(2, 9), downloads: 0, uploadedAt: Date.now() }, ...state.resources]
            })),
            removeResource: (id) => set((state) => ({
                resources: state.resources.filter(r => r.id !== id)
            })),
            incrementDownloadCount: (id) => set((state) => ({
                resources: state.resources.map(r => r.id === id ? { ...r, downloads: r.downloads + 1 } : r)
            })),
            toggleVisitStatus: (visitId) => set((state) => {
                const visit = state.visits.find(v => v.id === visitId);
                if (!visit) return state;
                const newStatus = visit.status === 'active' ? 'frozen' : 'active';
                const ip = visit.ip;

                let newFrozenIps = [...state.frozenIps];
                if (newStatus === 'frozen') {
                    if (!newFrozenIps.includes(ip)) newFrozenIps.push(ip);
                } else {
                    newFrozenIps = newFrozenIps.filter(i => i !== ip);
                }

                return {
                    visits: state.visits.map(v => v.ip === ip ? { ...v, status: newStatus } : v),
                    frozenIps: newFrozenIps
                };
            })
        }),
        {
            name: 'archive-storage',
        }
    )
);
