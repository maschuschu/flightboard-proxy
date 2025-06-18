
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { airport, begin, end } = req.query;
  const USER = process.env.OPENSKY_USER;
  const PASS = process.env.OPENSKY_PASS;

  if (!airport || !begin || !end) {
    return res.status(400).json({ error: 'Missing query parameters' });
  }

  const url = `https://opensky-network.org/api/flights/departure?airport=${airport}&begin=${begin}&end=${end}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${USER}:${PASS}`).toString('base64')
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenSky error: ${errText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Proxy failed', details: error.message });
  }
}
