import express from 'express';
import fetch from 'node-fetch';
const app = express();

const USER = process.env.OPENSKY_USER;
const PASS = process.env.OPENSKY_PASS;

app.get('/api/departures', async (req, res) => {
  const { airport, begin, end } = req.query;
  if (!airport || !begin || !end) return res.status(400).send('Missing query params');

  const url = `https://opensky-network.org/api/flights/departure?airport=${airport}&begin=${begin}&end=${end}`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${USER}:${PASS}`).toString('base64')
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy failed');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
