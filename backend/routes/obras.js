const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Obra = require('../models/Obra');
const { asyncHandler } = require('../utils/asyncHandler');
const { AppError } = require('../utils/AppError');
const { validateArtworkPayload } = require('../utils/artworkValidation');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `obra_${Date.now()}${ext}`);
  },
});

const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (file.mimetype.startsWith('image/') || ALLOWED_EXT.includes(ext)) cb(null, true);
    else cb(new AppError('Solo se permiten imagenes', 400), false);
  },
});

// GET /api/obras
router.get('/', asyncHandler(async (req, res) => {
  const { search, autorApodo, page = 1, limit = 50 } = req.query;
  const obras = await Obra.findAll({ search, autorApodo, page, limit });
  res.json(obras);
}));

// GET /api/obras/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const obra = await Obra.findById(req.params.id);
  if (!obra) throw new AppError('Obra no encontrada', 404);
  res.json(obra);
}));

// POST /api/obras
router.post('/', upload.single('image'), asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('La imagen es requerida', 400);

  const validated = validateArtworkPayload(req.body);
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  const obra = await Obra.create({
    ...validated,
    imageUrl,
  });

  res.status(201).json(obra);
}));

// PATCH /api/obras/:id
router.patch('/:id', asyncHandler(async (req, res) => {
  const obra = await Obra.findById(req.params.id);
  if (!obra) throw new AppError('Obra no encontrada', 404);

  const updates = validateArtworkPayload(req.body, true);
  const updated = await Obra.update(req.params.id, updates);
  res.json(updated);
}));

// DELETE /api/obras/:id
router.delete('/:id', asyncHandler(async (req, res) => {
  const obra = await Obra.findById(req.params.id);
  if (!obra) throw new AppError('Obra no encontrada', 404);

  const filename = obra.imageUrl.split('/uploads/')[1];
  if (filename) {
    const filePath = path.join(__dirname, '../uploads', filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  await Obra.delete(req.params.id);
  res.json({ message: 'Obra eliminada' });
}));

// POST /api/obras/:id/like
router.post('/:id/like', asyncHandler(async (req, res) => {
  const obra = await Obra.findById(req.params.id);
  if (!obra) throw new AppError('Obra no encontrada', 404);

  const likes = await Obra.incrementLike(req.params.id);
  res.json({ likes });
}));

// POST /api/obras/:id/rate
router.post('/:id/rate', asyncHandler(async (req, res) => {
  const value = Number(req.body.value);
  if (!Number.isInteger(value) || value < 1 || value > 5) {
    throw new AppError('Rating debe ser un entero entre 1 y 5', 400);
  }

  const obra = await Obra.findById(req.params.id);
  if (!obra) throw new AppError('Obra no encontrada', 404);

  const rating = await Obra.addRating(req.params.id, value);
  res.json(rating);
}));

module.exports = router;
