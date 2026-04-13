export default async function handler(req, res) {
    const { id } = req.query;
    const BIN_URL = 'https://jsonblob.com/api/jsonBlob';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(204).end();

    try {
        const upstream = await fetch(`${BIN_URL}/${id}`, {
            method: req.method === 'PUT' ? 'PUT' : 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: req.method === 'PUT' ? JSON.stringify(req.body) : undefined
        });
        const data = await upstream.json();
        return res.status(upstream.status).json(data);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}