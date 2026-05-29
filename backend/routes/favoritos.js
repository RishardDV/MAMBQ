const router = require('express').Router();
const Obra = require('../models/Obra');
const auth = require('../middleware/auth');

// GET /api/favoritos
router.get('/', auth, async (req, res) => {
  try {
    const obras = await Obra.findFavoritos(req.userId);
    res.json(obras);
  } catch (err) {
    console.error('Error obteniendo favoritos:', err);
    res.status(500).json({ error: 'Error al obtener favoritos' });
  }
});

// POST /api/favoritos/:obraId — toggle
router.post('/:obraId', auth, async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.obraId);
    if (!obra) return res.status(404).json({ error: 'Obra no encontrada' });

    const favorito = await Obra.toggleFavorito(req.params.obraId, req.userId);
    res.json({ favorito });
  } catch (err) {
    console.error('Error toggling favorito:', err);
    res.status(500).json({ error: 'Error al procesar el favorito' });
  }
});

module.exports = router;
