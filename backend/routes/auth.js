const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) =>
  jwt.sign({ userId: user.id, apodo: user.apodo }, process.env.JWT_SECRET, { expiresIn: '30d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { apodo, password, avatarIndex = 0 } = req.body;

    if (!apodo || !password)
      return res.status(400).json({ error: 'Apodo y contraseña son requeridos' });

    const trimmed = apodo.trim();
    if (trimmed.length < 2 || trimmed.length > 20)
      return res.status(400).json({ error: 'El apodo debe tener entre 2 y 20 caracteres' });

    if (password.length < 4)
      return res.status(400).json({ error: 'La contraseña debe tener al menos 4 caracteres' });

    const existing = await User.findByApodo(trimmed);
    if (existing)
      return res.status(409).json({ error: 'Ese apodo ya está en uso, elige otro' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ apodo: trimmed, password: hashed, avatarIndex });

    res.status(201).json({
      token: generateToken(user),
      apodo: user.apodo,
      avatarIndex: user.avatar_index,
    });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ error: 'Error al crear la cuenta' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { apodo, password } = req.body;

    if (!apodo || !password)
      return res.status(400).json({ error: 'Apodo y contraseña son requeridos' });

    const user = await User.findByApodo(apodo.trim());
    if (!user)
      return res.status(401).json({ error: 'Apodo o contraseña incorrectos' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ error: 'Apodo o contraseña incorrectos' });

    res.json({
      token: generateToken(user),
      apodo: user.apodo,
      avatarIndex: user.avatar_index,
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
