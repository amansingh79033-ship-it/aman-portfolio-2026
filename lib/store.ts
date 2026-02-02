import { create } from 'zustand';


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

export interface VoiceMessage {
    id: string;
    audioUrl: string;
    duration: number;
    timestamp: number;
}

export interface Song {
    id: string;
    title: string;
    url: string;
    duration: number;
    description: string;
    createdAt: number;
}

interface AppState {
    visits: Visit[];
    messages: VoiceMessage[];
    frozenIps: string[];
    showcaseItems: ShowcaseItem[];
    resources: Resource[];
    songs: Song[];

    // Actions
    fetchData: () => Promise<void>;
    addVisit: (visit: Omit<Visit, 'id' | 'timestamp' | 'status'>) => Promise<void>;
    addMessage: (message: Omit<VoiceMessage, 'id' | 'timestamp'>) => Promise<void>;
    freezeIp: (ip: string) => Promise<void>;
    unfreezeIp: (ip: string) => Promise<void>;
    isIpFrozen: (ip: string) => boolean;

    // UI Helpers (optimistic or local for now, could be server later)
    setShowcaseImage: (id: string, base64: string) => void;
    addShowcaseFrame: (image: string, title: string) => void;
    removeShowcaseFrame: (id: string) => void;
    reorderShowcase: (startIndex: number, endIndex: number) => void;

    toggleVisitStatus: (visitId: string) => Promise<void>;
    addResource: (resource: Omit<Resource, 'id' | 'downloads' | 'uploadedAt'>) => void;
    removeResource: (id: string) => void;
    incrementDownloadCount: (id: string) => void;

    // Song Actions
    addSong: (song: Omit<Song, 'id' | 'createdAt'>) => Promise<void>;
    removeSong: (id: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => {
    // Load initial state from localStorage if available
    const savedState = typeof window !== 'undefined' ? localStorage.getItem('app-storage') : null;
    const initialState = savedState ? JSON.parse(savedState) : {
        visits: [],
        messages: [],
        frozenIps: [],
        showcaseItems: [],
        resources: [],
        songs: [],
    };

    return {
        ...initialState,

        fetchData: async () => {
            try {
                const res = await fetch('/api/data');
                if (res.ok) {
                    const data = await res.json();
                    set({
                        visits: data.visits || [],
                        messages: data.messages || [],
                        resources: data.resources || [],
                        showcaseItems: data.showcaseItems || [],
                        frozenIps: data.frozenIps || [],
                        songs: data.songs || []
                    });
                } else {
                    // Fallback to current state if API fails
                    console.warn('API fetch failed, keeping current state');
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                // Keep current state if API fails
            }
        },

    addVisit: async (data) => {
        // Optimistic update
        const visit: Visit = {
            ...data,
            id: 'temp-' + Date.now(),
            timestamp: Date.now(),
            status: get().frozenIps.includes(data.ip) ? 'frozen' : 'active',
        };
        set((state) => ({ visits: [visit, ...state.visits].slice(0, 1000) }));

        // Server sync - only if API exists
        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'addVisit', payload: data })
            });
            // Only fetch data if the API call was successful
            if (res.ok) {
                await get().fetchData();
            }
        } catch (e) {
            console.error("Failed to sync visit", e);
        }
    },

    addMessage: async (data) => {
        // Optimistic
        const message: VoiceMessage = {
            ...data,
            id: 'temp-' + Date.now(),
            timestamp: Date.now(),
        };
        set((state) => ({ messages: [message, ...state.messages] }));
    },

    freezeIp: async (ip) => {
        set((state) => ({
            frozenIps: [...state.frozenIps, ip],
            visits: state.visits.map(v => v.ip === ip ? { ...v, status: 'frozen' } : v)
        }));

        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'freezeIp', payload: { ip } })
            });
            if (res.ok) {
                await get().fetchData();
            }
        } catch (e) {
            console.error("Failed to sync freezeIp", e);
        }
    },

    unfreezeIp: async (ip) => {
        set((state) => ({
            frozenIps: state.frozenIps.filter(i => i !== ip),
            visits: state.visits.map(v => v.ip === ip ? { ...v, status: 'active' } : v)
        }));

        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'unfreezeIp', payload: { ip } })
            });
            if (res.ok) {
                await get().fetchData();
            }
        } catch (e) {
            console.error("Failed to sync unfreezeIp", e);
        }
    },

    isIpFrozen: (ip) => get().frozenIps.includes(ip),

    // These remain local/demo for now as per minimal implementation requests or extend pattern above
    // Showcase Actions
    setShowcaseImage: async (id, base64) => {
        set((state) => ({
            showcaseItems: state.showcaseItems.map(item =>
                item.id === id ? { ...item, image: base64 } : item
            )
        }));
        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'setShowcaseImage', payload: { id, image: base64 } })
            });
            if (res.ok) {
                await get().fetchData();
            }
        } catch (e) {
            console.error("Failed to sync setShowcaseImage", e);
        }
    },

    addShowcaseFrame: async (image, title) => {
        // Optimistic update
        const tempId = Math.random().toString(36).substr(2, 9);
        set((state) => ({
            showcaseItems: [...state.showcaseItems, { id: tempId, image, title }]
        }));

        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'addShowcaseFrame', payload: { image, title } })
            });
            if (res.ok) {
                await get().fetchData();
            }
        } catch (e) {
            console.error("Failed to sync addShowcaseFrame", e);
        }
    },

    removeShowcaseFrame: async (id) => {
        set((state) => ({
            showcaseItems: state.showcaseItems.filter(item => item.id !== id)
        }));
        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'removeShowcaseFrame', payload: { id } })
            });
            if (res.ok) {
                await get().fetchData();
            }
        } catch (e) {
            console.error("Failed to sync removeShowcaseFrame", e);
        }
    },

    reorderShowcase: (startIndex, endIndex) => set((state) => {
        const items = [...state.showcaseItems];
        const [reorderedItem] = items.splice(startIndex, 1);
        items.splice(endIndex, 0, reorderedItem);
        // Note: Reorder persistence is not yet implemented on backend for this MVP
        return { showcaseItems: items };
    }),

    toggleVisitStatus: async (visitId) => {
        const visit = get().visits.find(v => v.id === visitId);
        if (!visit) return;
        const ip = visit.ip;
        if (visit.status === 'active') {
            await get().freezeIp(ip);
        } else {
            await get().unfreezeIp(ip);
        }
    },

    // Resource Actions
    addResource: async (data) => {
        // Optimistic
        set((state) => ({
            resources: [{ ...data, id: 'temp-' + Date.now(), downloads: 0, uploadedAt: Date.now() }, ...state.resources]
        }));

        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'addResource', payload: data })
            });
            if (res.ok) {
                await get().fetchData();
            }
        } catch (e) {
            console.error("Failed to sync addResource", e);
        }
    },

    removeResource: async (id) => {
        set((state) => ({
            resources: state.resources.filter(r => r.id !== id)
        }));
        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'removeResource', payload: { id } })
            });
            if (res.ok) {
                await get().fetchData();
            }
        } catch (e) {
            console.error("Failed to sync removeResource", e);
        }
    },

    incrementDownloadCount: async (id) => {
        set((state) => ({
            resources: state.resources.map(r => r.id === id ? { ...r, downloads: r.downloads + 1 } : r)
        }));
        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'incrementDownloadCount', payload: { id } })
            });
            if (res.ok) {
                await get().fetchData();
            }
        } catch (e) {
            console.error("Failed to sync incrementDownloadCount", e);
        }
    },

    // Song Actions
    addSong: async (data) => {
        set((state) => ({
            songs: [{ ...data, id: 'temp-' + Date.now(), createdAt: Date.now() }, ...state.songs]
        }));

        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'addSong', payload: data })
            });
            if (res.ok) {
                await get().fetchData();
            }
        } catch (e) {
            console.error("Failed to sync addSong", e);
        }
    },

    removeSong: async (id) => {
        set((state) => ({
            songs: state.songs.filter(s => s.id !== id)
        }));

        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'removeSong', payload: { id } })
            });
            if (res.ok) {
                await get().fetchData();
            }
        } catch (e) {
            console.error("Failed to sync removeSong", e);
        }
    }
};});

// Subscribe to state changes to persist to localStorage
useStore.subscribe((state) => {
    // Save only the data properties to storage
    const stateToSave = {
        visits: state.visits,
        messages: state.messages,
        frozenIps: state.frozenIps,
        showcaseItems: state.showcaseItems,
        resources: state.resources,
        songs: state.songs,
    };
    if (typeof window !== 'undefined') {
        localStorage.setItem('app-storage', JSON.stringify(stateToSave));
    }
});