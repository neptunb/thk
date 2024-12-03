const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Endpoint to fetch currency rates for a given date
app.get('/api/currency', async (req, res) => {
  
  const url = `https://www.tcmb.gov.tr/kurlar/today.xml`;

  try {
    const response = await axios.get(url, { responseType: 'text' });
    const xml = response.data;

    const parsedData = await xml2js.parseStringPromise(xml, { mergeAttrs: true });
    const currencies = parsedData?.Tarih_Date?.Currency || [];

    const result = currencies.map((currency) => ({
      code: currency?.Kod?.[0],
      name: currency?.Isim?.[0],
      forexBuying: currency?.ForexBuying?.[0],
      forexSelling: currency?.ForexSelling?.[0],
    }));

    res.json({ rates: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch currency data. Please check the date format or the T.C.M.B. service availability.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
