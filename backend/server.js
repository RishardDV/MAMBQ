require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { initDb } = require('./db');

const app = express();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

app.use('/api/obras', require('./routes/obras'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', museo: 'MAMB', db: 'PostgreSQL' });
});

const PORT = process.env.PORT || 3000;

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🎨 MAMB API corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error inicializando base de datos:', err.message);
    process.exit(1);
  });
