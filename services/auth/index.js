const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:example@db:5432/catalog'
});

// create users table if not exists
async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
  } finally {
    client.release();
  }
}

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashed]
    );
    res.json(result.rows[0]);
  } catch (e) {
    res.status(400).json({ error: 'Usuario ya existe' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  if (result.rows.length === 0) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  res.json({ token });
});

app.listen(port, async () => {
  await initDb();
  console.log(`Auth service listening on port ${port}`);
});
