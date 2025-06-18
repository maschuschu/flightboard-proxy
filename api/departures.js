// Datei: api/departures.js
export default async function handler(req, res) {
  const { airport, begin, end } = req.query;

  if (!airport || !begin || !end) {
    return res.status(400).json({ error: 'Missing query params' });
  }

  const username = process.env.OPENSKY_USER;
  const password = process.env.OPENSKY_PASS;

  const auth = Buffer.from(`${username}:${password}`).toString('base64');

  const url = `https://opensky-network.org/api/flights/departure?airport=${airport}&begin=${begin}&end=${end}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'OpenSky error' });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed' });
  }
}
