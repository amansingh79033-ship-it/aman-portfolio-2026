// Vercel API route for authentication
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { password } = req.body;

    if (password === 'aman2025@#') {
        return res.status(200).json({ success: true, token: 'authenticated_session_token' });
    } else {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
}