const { pool } = require('../db');

const User = {
  async findByApodo(apodo) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE apodo = $1',
      [apodo]
    );
    return rows[0] || null;
  },

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  async create({ apodo, password, avatarIndex = 0 }) {
    const { rows } = await pool.query(
      'INSERT INTO users (apodo, password, avatar_index) VALUES ($1, $2, $3) RETURNING *',
      [apodo, password, avatarIndex]
    );
    return rows[0];
  },

  async update(id, { apodo, avatarIndex } = {}) {
    const fields = [];
    const values = [];

    if (apodo !== undefined) {
      fields.push(`apodo = $${fields.length + 1}`);
      values.push(apodo);
    }
    if (avatarIndex !== undefined) {
      fields.push(`avatar_index = $${fields.length + 1}`);
      values.push(avatarIndex);
    }
    if (!fields.length) return User.findById(id);

    fields.push('updated_at = NOW()');
    values.push(id);

    const { rows } = await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values
    );
    return rows[0];
  },

  async apodoTaken(apodo, excludeId) {
    const { rows } = await pool.query(
      'SELECT id FROM users WHERE apodo = $1 AND id != $2',
      [apodo, excludeId]
    );
    return rows.length > 0;
  },
};

module.exports = User;
