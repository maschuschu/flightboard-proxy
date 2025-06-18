export default async function handler(req, res) {
  const { airport, begin, end } = req.query;

  if (!airport || !begin || !end) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  const url = `https://opensky-network.org/api/flights/departure?airport=${airport}&begin=${begin}&end=${end}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Basic ' + Buffer.from('muckbuck:zegqyc-rywpep-0qekGy').toString('base64')
      }
    });

    if (!response.ok) {
      throw new Error(`OpenSky API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
