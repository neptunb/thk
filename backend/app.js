const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.json({ message: 'Arka plandan saygılar' });
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

// Bu örnekde localhost tarafına çağrı yapılmıyor.