const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// configure Postgres connection via environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:example@db:5432/catalog'
});

// initialize database: create table if not exists and seed
async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price NUMERIC NOT NULL,
        description TEXT
      );
    `);
    const res = await client.query('SELECT COUNT(*) FROM products');
    if (parseInt(res.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO products (name, price, description) VALUES
        ('Camisa', 20, 'Camisa de algodón'),
        ('Pantalones', 35, 'Pantalones vaqueros'),
        ('Zapatos', 50, 'Zapatos de cuero');
      `);
    }
  } finally {
    client.release();
  }
}

app.get('/products', async (req, res) => {
  const result = await pool.query('SELECT * FROM products');
  res.json(result.rows);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM products WHERE id=$1', [id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(result.rows[0]);
});

app.listen(port, async () => {
  await initDb();
  console.log(`Catalog service listening on port ${port}`);
});
