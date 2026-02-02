import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'mock_db.json');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Load initial database
let db = {
    visits: [],
    messages: [],
    resources: [],
    showcaseItems: [],
    frozenIps: [],
    songs: [] // Added for new songs feature
};

if (fs.existsSync(DB_FILE)) {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        db = { ...db, ...JSON.parse(data) };
        console.log('Loaded persistent mock database from', DB_FILE);
    } catch (e) {
        console.error('Failed to parse mock database, starting fresh');
    }
}

const saveDb = () => {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    } catch (e) {
        console.error('Failed to save mock database');
    }
};

app.get('/api/data', (req, res) => {
    console.log('GET /api/data');
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const filteredDb = {
        ...db,
        visits: db.visits.filter(v => v.timestamp > sevenDaysAgo),
        messages: db.messages.filter(m => m.timestamp > sevenDaysAgo)
    };
    res.json(filteredDb);
});

app.post('/api/auth', (req, res) => {
    const { password } = req.body;
    console.log('POST /api/auth - Login attempt');

    if (password === 'aman2025@#') {
        res.json({ success: true, token: 'authenticated_session_token' });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

app.post('/api/data', (req, res) => {
    const { action, payload } = req.body;
    console.log(`POST /api/data - Action: ${action}`, payload);

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
            saveDb();
            break;

        case 'addMessage':
            db.messages.unshift({
                ...payload,
                id: Date.now().toString(),
                timestamp: Date.now()
            });
            saveDb();
            break;

        case 'addSong':
            db.songs.unshift({
                ...payload,
                id: Date.now().toString(),
                createdAt: Date.now()
            });
            saveDb();
            break;

        case 'removeSong':
            db.songs = db.songs.filter(s => s.id !== payload.id);
            saveDb();
            break;

        case 'freezeIp':
            if (!db.frozenIps.includes(payload.ip)) {
                db.frozenIps.push(payload.ip);
            }
            db.visits = db.visits.map(v => v.ip === payload.ip ? { ...v, status: 'frozen' } : v);
            saveDb();
            break;

        case 'unfreezeIp':
            db.frozenIps = db.frozenIps.filter(ip => ip !== payload.ip);
            db.visits = db.visits.map(v => v.ip === payload.ip ? { ...v, status: 'active' } : v);
            saveDb();
            break;

        case 'addResource':
            db.resources.unshift({
                ...payload,
                id: Date.now().toString(),
                downloads: 0,
                uploadedAt: Date.now()
            });
            saveDb();
            break;

        case 'removeResource':
            db.resources = db.resources.filter(r => r.id !== payload.id);
            saveDb();
            break;

        case 'incrementDownloadCount':
            db.resources = db.resources.map(r => r.id === payload.id ? { ...r, downloads: r.downloads + 1 } : r);
            saveDb();
            break;

        case 'addShowcaseFrame':
            db.showcaseItems.push({
                ...payload,
                id: Date.now().toString()
            });
            saveDb();
            break;

        case 'removeShowcaseFrame':
            db.showcaseItems = db.showcaseItems.filter(item => item.id !== payload.id);
            saveDb();
            break;

        case 'setShowcaseImage':
            db.showcaseItems = db.showcaseItems.map(item => item.id === payload.id ? { ...item, image: payload.image } : item);
            saveDb();
            break;

        default:
            return res.status(400).json({ error: 'Unknown action' });
    }

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Dev API server listening at http://localhost:${port}`);
});
