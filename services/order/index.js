const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:example@db:5432/catalog'
});

// orders table
async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
  } finally {
    client.release();
  }
}

app.post('/orders', async (req, res) => {
  const { product_id, quantity } = req.body;
  const result = await pool.query(
    'INSERT INTO orders (product_id, quantity) VALUES ($1, $2) RETURNING *',
    [product_id, quantity]
  );
  res.json(result.rows[0]);
});

app.get('/orders', async (req, res) => {
  const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  res.json(result.rows);
});

app.listen(port, async () => {
  await initDb();
  console.log(`Order service listening on port ${port}`);
});
