require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const { initDb } = require('./db');
const { getRequiredEnv } = require('./utils/env');
const apiRoutes = require('./routes/index');
const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/error');

const app = express();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Security — helmet with CSP disabled in dev for inline handlers
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
} else {
  app.use(helmet({ contentSecurityPolicy: false }));
}

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? (process.env.CLIENT_ORIGIN || '*')
    : '*'
}));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

// Serve frontend static files with Service-Worker-Allowed header
const frontendDir = path.join(__dirname, '..', 'frontend');
app.use('/frontend', express.static(frontendDir, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('sw.js')) {
      res.setHeader('Service-Worker-Allowed', '/');
    }
  }
}));

// Serve backend/app.js (frontend JS that lives in backend folder)
app.use('/Backend', express.static(__dirname));

// API routes
app.use('/api', apiRoutes);

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// 404 and error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MAMB API corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error inicializando base de datos:', err.message);
    process.exit(1);
  });
