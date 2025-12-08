const express = require('express');
const app = express();
const PORT = 3000;

// CORS middleware - multiple origins allowed
const allowedOrigins = [
  'http://localhost:8080',
  'http://192.168.1.40:3000',
  'http://192.168.1.40:8080',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:8080'
];

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.json({ message: 'Arka plandan saygılar' });
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

// Bu örnekde localhost tarafına çağrı yapılmıyor.