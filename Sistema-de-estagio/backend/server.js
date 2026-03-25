const express = require('express');
const cors    = require('cors');
const mysql   = require('mysql2/promise');
const path    = require('path');       
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));


const db = mysql.createPool({
  host:     'localhost',
  port:     3307,
  user:     'root',
  password: '',
  database: 'gestao_estagios',
  waitForConnections: true,
  connectionLimit: 10
});


app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API a funcionar ✓' });
});


app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    console.table(rows);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/usuarios/pesquisa', async (req, res) => {
  try {
    const { nome } = req.query;
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE nome LIKE ?',
      [`%${nome || ''}%`]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//app.use('/api/auth', require('./routes/auth'));
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api/users', require('./routes/users'));
app.use('/api/dashboard', require('./routes/dashboard'));

app.listen(3000, async () => {
  try {
    await db.query('SELECT 1');
    console.log('MySQL conectado!');
    console.log('Servidor em http://localhost:3000');
  } catch (err) {
    console.error('Erro BD:', err.message);
  }
});