const { pool } = require('../db');

const fmt = (row) => ({
  _id: String(row.id),
  titulo: row.titulo,
  descripcion: row.descripcion || '',
  imageUrl: row.image_url,
  autorApodo: row.autor_apodo,
  avatarIndex: row.avatar_index || 0,
  likes: row.likes_count || 0,
  createdAt: row.created_at,
});

const Obra = {
  async findAll({ search, autorApodo, page = 1, limit = 50 } = {}) {
    const conds = [];
    const vals = [];

    if (search) {
      conds.push(`titulo ILIKE $${vals.length + 1}`);
      vals.push(`%${search}%`);
    }
    if (autorApodo) {
      conds.push(`autor_apodo ILIKE $${vals.length + 1}`);
      vals.push(autorApodo);
    }

    const where = conds.length ? 'WHERE ' + conds.join(' AND ') : '';
    const offset = (page - 1) * limit;
    vals.push(Number(limit), offset);

    const { rows } = await pool.query(
      `SELECT * FROM obras ${where} ORDER BY created_at DESC LIMIT $${vals.length - 1} OFFSET $${vals.length}`,
      vals
    );
    return rows.map(fmt);
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM obras WHERE id = $1', [id]);
    return rows[0] ? fmt(rows[0]) : null;
  },

  async create({ titulo, descripcion, imageUrl, autorApodo, avatarIndex }) {
    const { rows } = await pool.query(
      `INSERT INTO obras (titulo, descripcion, image_url, autor_apodo, avatar_index)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [titulo, descripcion || '', imageUrl, autorApodo || 'Artista', avatarIndex || 0]
    );
    return fmt(rows[0]);
  },

  async delete(id) {
    const { rows } = await pool.query('DELETE FROM obras WHERE id = $1 RETURNING *', [id]);
    return rows[0] || null;
  },

  async incrementLike(id) {
    const { rows } = await pool.query(
      'UPDATE obras SET likes_count = likes_count + 1 WHERE id = $1 RETURNING likes_count',
      [id]
    );
    return rows[0]?.likes_count ?? 0;
  },
};

module.exports = Obra;
