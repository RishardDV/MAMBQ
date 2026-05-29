const { Router } = require('express');

const obrasRoutes = require('./obras');

const router = Router();

router.use('/obras', obrasRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', museo: 'MAMB', db: 'PostgreSQL' });
});

module.exports = router;
