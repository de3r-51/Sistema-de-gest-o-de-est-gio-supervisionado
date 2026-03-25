const db = require('../models/db');

// GET /api/dashboard/stats
exports.getStats = async (req, res) => {
  try {
    const [[{ total_users }]] = await db.query('SELECT COUNT(*) as total_users FROM usuarios');
    const [[{ total_admins }]] = await db.query(
      "SELECT COUNT(*) as total_admins FROM usuarios WHERE tipo_id = '1'"
    );
    const [[{ new_today }]] = await db.query(
      "SELECT COUNT(*) as new_today FROM usuarios WHERE DATE(criado_em) = CURDATE()"
    );

    res.json({ total_users, total_admins, new_today });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
};
