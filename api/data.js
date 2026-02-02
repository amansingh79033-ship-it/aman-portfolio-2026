// Vercel API route for data management
import fs from 'fs/promises';
import path from 'path';

// Use a persistent storage solution for Vercel
const DB_FILE = path.join(process.cwd(), 'db.json');

let db = {
    visits: [],
    messages: [],
    resources: [],
    showcaseItems: [],
    frozenIps: [],
    songs: []
};

// Initialize database
async function initDb() {
    try {
        const data = await fs.readFile(DB_FILE, 'utf8');
        db = { ...db, ...JSON.parse(data) };
    } catch (e) {
        // File doesn't exist, use default
        await saveDb();
    }
}

async function saveDb() {
    try {
        await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
    } catch (e) {
        console.error('Failed to save database:', e);
    }
}

// Initialize on cold start
initDb();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        const filteredDb = {
            ...db,
            visits: db.visits.filter(v => v.timestamp > sevenDaysAgo),
            messages: db.messages.filter(m => m.timestamp > sevenDaysAgo)
        };
        return res.status(200).json(filteredDb);
    }

    if (req.method === 'POST') {
        const { action, payload } = req.body;
        
        switch (action) {
            case 'addVisit':
                const newVisit = {
                    ...payload,
                    id: Date.now().toString(),
                    timestamp: Date.now(),
                    status: db.frozenIps.includes(payload.ip) ? 'frozen' : 'active'
                };
                db.visits.unshift(newVisit);
                if (db.visits.length > 1000) db.visits.pop();
                break;

            case 'addMessage':
                db.messages.unshift({
                    ...payload,
                    id: Date.now().toString(),
                    timestamp: Date.now()
                });
                break;

            case 'addSong':
                db.songs.unshift({
                    ...payload,
                    id: Date.now().toString(),
                    createdAt: Date.now()
                });
                break;

            case 'removeSong':
                db.songs = db.songs.filter(s => s.id !== payload.id);
                break;

            case 'freezeIp':
                if (!db.frozenIps.includes(payload.ip)) {
                    db.frozenIps.push(payload.ip);
                }
                db.visits = db.visits.map(v => v.ip === payload.ip ? { ...v, status: 'frozen' } : v);
                break;

            case 'unfreezeIp':
                db.frozenIps = db.frozenIps.filter(ip => ip !== payload.ip);
                db.visits = db.visits.map(v => v.ip === payload.ip ? { ...v, status: 'active' } : v);
                break;

            case 'addResource':
                db.resources.unshift({
                    ...payload,
                    id: Date.now().toString(),
                    downloads: 0,
                    uploadedAt: Date.now()
                });
                break;

            case 'removeResource':
                db.resources = db.resources.filter(r => r.id !== payload.id);
                break;

            case 'incrementDownloadCount':
                db.resources = db.resources.map(r => r.id === payload.id ? { ...r, downloads: r.downloads + 1 } : r);
                break;

            case 'addShowcaseFrame':
                db.showcaseItems.push({
                    ...payload,
                    id: Date.now().toString()
                });
                break;

            case 'removeShowcaseFrame':
                db.showcaseItems = db.showcaseItems.filter(item => item.id !== payload.id);
                break;

            case 'setShowcaseImage':
                db.showcaseItems = db.showcaseItems.map(item => item.id === payload.id ? { ...item, image: payload.image } : item);
                break;

            default:
                return res.status(400).json({ error: 'Unknown action' });
        }

        await saveDb();
        return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}