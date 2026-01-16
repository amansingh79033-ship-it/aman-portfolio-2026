import { sql } from '@vercel/postgres';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    try {
        if (request.method === 'GET') {
            const { rows: visits } = await sql`SELECT * FROM visits ORDER BY timestamp DESC LIMIT 1000`;
            const { rows: messages } = await sql`SELECT * FROM messages ORDER BY timestamp DESC`;
            const { rows: resources } = await sql`SELECT * FROM resources ORDER BY uploaded_at DESC`;
            const { rows: showcaseItems } = await sql`SELECT * FROM showcase_items ORDER BY sort_order ASC`;
            const { rows: frozenIps } = await sql`SELECT ip FROM frozen_ips`;

            return new Response(JSON.stringify({
                visits: visits || [],
                messages: messages || [],
                resources: resources || [],
                showcaseItems: showcaseItems || [],
                frozenIps: frozenIps.map(row => row.ip) || []
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                },
            });
        } else if (request.method === 'POST') {
            const body = await request.json();
            const { action, payload } = body;

            if (action === 'addVisit') {
                const { ip, path, userAgent } = payload;
                await sql`INSERT INTO visits (ip, path, timestamp, status, user_agent) VALUES (${ip}, ${path}, ${Date.now()}, 'active', ${userAgent || ''})`;
            } else if (action === 'freezeIp') {
                const { ip } = payload;
                await sql`INSERT INTO frozen_ips (ip) VALUES (${ip}) ON CONFLICT DO NOTHING`;
                await sql`UPDATE visits SET status = 'frozen' WHERE ip = ${ip}`;
            } else if (action === 'unfreezeIp') {
                const { ip } = payload;
                await sql`DELETE FROM frozen_ips WHERE ip = ${ip}`;
                await sql`UPDATE visits SET status = 'active' WHERE ip = ${ip}`;
            }

            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
