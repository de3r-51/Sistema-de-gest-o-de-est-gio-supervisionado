const db = require('../models/db');
const bcrypt = require('bcryptjs');

// GET /api/users
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nome, email, tipo_id, criado_em FROM usuarios');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

// GET /api/users/:id
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, nome, email, tipo_id, criado_em FROM users WHERE id = ?',
      [req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

// POST /api/users
exports.create = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO usuarios (nome, email, senha_hash, tipo_id) VALUES (?, ?, ?, ?)',
      [name, email, hashed, role || 'user']
    );
    res.status(201).json({ id: result.insertId, name, email, role });
  } catch {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// PUT /api/users/:id
exports.update = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    await db.query('UPDATE usuarios SET nome=?, email=?, tipo_id=? WHERE id=?', [
      name, email, role, req.params.id,
    ]);
    res.json({ message: 'Usuário atualizado' });
  } catch {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

// DELETE /api/users/:id
exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    res.json({ message: 'Usuário removido' });
  } catch {
    res.status(500).json({ error: 'Erro ao remover usuário' });
  }
};
