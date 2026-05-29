const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Obra = require('../models/Obra');

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
    else cb(new Error('Solo se permiten imágenes'), false);
  },
});

// GET /api/obras
router.get('/', async (req, res) => {
  try {
    const { search, autorApodo, page = 1, limit = 50 } = req.query;
    const obras = await Obra.findAll({ search, autorApodo, page, limit });
    res.json(obras);
  } catch (err) {
    console.error('Error listando obras:', err);
    res.status(500).json({ error: 'Error al obtener obras' });
  }
});

// GET /api/obras/:id
router.get('/:id', async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id);
    if (!obra) return res.status(404).json({ error: 'Obra no encontrada' });
    res.json(obra);
  } catch (err) {
    console.error('Error obteniendo obra:', err);
    res.status(500).json({ error: 'Error al obtener la obra' });
  }
});

// POST /api/obras — multipart: image + titulo + descripcion + autorApodo + avatarIndex
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'La imagen es requerida' });

    const { titulo, descripcion, autorApodo, avatarIndex } = req.body;
    if (!titulo || !titulo.trim()) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'El título es requerido' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const obra = await Obra.create({
      titulo: titulo.trim(),
      descripcion: descripcion ? descripcion.trim() : '',
      imageUrl,
      autorApodo: autorApodo ? autorApodo.trim() : 'Artista',
      avatarIndex: avatarIndex ? parseInt(avatarIndex) : 0,
    });

    res.status(201).json(obra);
  } catch (err) {
    console.error('Error subiendo obra:', err);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: 'Error al publicar la obra' });
  }
});

// DELETE /api/obras/:id
router.delete('/:id', async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id);
    if (!obra) return res.status(404).json({ error: 'Obra no encontrada' });

    const filename = obra.imageUrl.split('/uploads/')[1];
    if (filename) {
      const filePath = path.join(__dirname, '../uploads', filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Obra.delete(req.params.id);
    res.json({ message: 'Obra eliminada' });
  } catch (err) {
    console.error('Error eliminando obra:', err);
    res.status(500).json({ error: 'Error al eliminar la obra' });
  }
});

// POST /api/obras/:id/like — increment like count (no auth, client tracks state locally)
router.post('/:id/like', async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id);
    if (!obra) return res.status(404).json({ error: 'Obra no encontrada' });

    const likes = await Obra.incrementLike(req.params.id);
    res.json({ likes });
  } catch (err) {
    console.error('Error en like:', err);
    res.status(500).json({ error: 'Error al procesar el like' });
  }
});

module.exports = router;
