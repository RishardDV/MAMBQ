const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS obras (
      id           SERIAL PRIMARY KEY,
      titulo       VARCHAR(100) NOT NULL,
      descripcion  TEXT         DEFAULT '',
      image_url    VARCHAR(500) NOT NULL,
      autor_apodo  VARCHAR(20)  NOT NULL DEFAULT 'Artista',
      avatar_index INTEGER      DEFAULT 0,
      likes_count  INTEGER      DEFAULT 0,
      created_at   TIMESTAMP    DEFAULT NOW()
    );
  `);
  console.log('✅ Tabla obras lista (PostgreSQL)');
};

module.exports = { pool, initDb };
