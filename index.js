import express from 'express';
import pkg from 'pg';

import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON bodies for this app
app.use(express.json());

// Create a new pool using your Neon database connection string
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get('/', async (req, res) => {
  try {
    // Fetch the list of music albums from your database using the postgres connection
    const { rows } = await pool.query('SELECT * FROM music_albums;');
    res.json(rows);
  } catch (error) {
    console.error('Failed to fetch albums', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/coffee', async (req, res) => {
  try {
    // Regresa la lista de blends de café favoritos
    // from your database using the postgres connection
    const { rows } = await pool.query('select * from favorite_coffee_blends;');
    res.json(rows);
  } catch (error) {
    console.error('Failed to fetch coffee', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
