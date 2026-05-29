const router = require('express').Router();
const User = require('../models/User');
const Obra = require('../models/Obra');
const auth = require('../middleware/auth');

// GET /api/perfil
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const obrasCount = await Obra.countByAutor(req.userId);

    res.json({
      _id: String(user.id),
      apodo: user.apodo,
      avatarIndex: user.avatar_index,
      obrasCount,
    });
  } catch (err) {
    console.error('Error obteniendo perfil:', err);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

// PUT /api/perfil
router.put('/', auth, async (req, res) => {
  try {
    const { apodo, avatarIndex } = req.body;
    const updates = {};

    if (apodo !== undefined) {
      const trimmed = apodo.trim();
      if (trimmed.length < 2 || trimmed.length > 20)
        return res.status(400).json({ error: 'El apodo debe tener entre 2 y 20 caracteres' });

      const taken = await User.apodoTaken(trimmed, req.userId);
      if (taken) return res.status(409).json({ error: 'Ese apodo ya está en uso, elige otro' });

      updates.apodo = trimmed;
    }

    if (avatarIndex !== undefined) {
      const idx = parseInt(avatarIndex);
      if (idx < 0 || idx > 7) return res.status(400).json({ error: 'Avatar no válido' });
      updates.avatarIndex = idx;
    }

    if (!Object.keys(updates).length)
      return res.status(400).json({ error: 'No hay datos para actualizar' });

    const user = await User.update(req.userId, updates);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Cascade apodo change to all user's obras
    if (updates.apodo) {
      await Obra.updateAutorApodo(req.userId, updates.apodo);
    }

    const obrasCount = await Obra.countByAutor(req.userId);

    res.json({
      _id: String(user.id),
      apodo: user.apodo,
      avatarIndex: user.avatar_index,
      obrasCount,
    });
  } catch (err) {
    console.error('Error actualizando perfil:', err);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

module.exports = router;
