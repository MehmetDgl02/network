const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// "public" klasörünü statik olarak sun
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfa isteği için public/index.html döndür
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});