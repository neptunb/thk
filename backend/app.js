const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api', (req, res) => {
  setImmediate(() => {
    res.json({ message: 'Hi, I am Node Immediate1' });
  })  
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

// Bu örnekde localhost tarafına çağrı YAPILIYOR.