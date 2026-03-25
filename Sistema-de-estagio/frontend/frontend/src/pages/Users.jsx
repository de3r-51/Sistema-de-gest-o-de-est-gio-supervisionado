import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = () => {
    api.get('/users')
      .then(({ data }) => setUsers(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/users', form);
      setSuccess('Usuário criado com sucesso!');
      setModal(false);
      setForm({ name: '', email: '', password: '', role: 'user' });
      fetchUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar usuário');
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Remover o usuário "${name}"?`)) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch {
      alert('Erro ao remover usuário');
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Usuários</h1>
            <p>Gerencie os usuários do sistema</p>
          </div>
          <button className="btn-primary" onClick={() => setModal(true)}>+ Novo Usuário</button>
        </div>

        {success && <div className="alert success">{success}</div>}

        {loading ? (
          <div className="skeleton table-skeleton" />
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Função</th>
                  <th>Criado em</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td className="muted">{u.id}</td>
                    <td>
                      <div className="user-cell">
                        <div className="avatar small">{u.name.charAt(0).toUpperCase()}</div>
                        {u.name}
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td><span className={`badge ${u.role}`}>{u.role}</span></td>
                    <td className="muted">{new Date(u.created_at).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <button className="btn-danger small" onClick={() => handleDelete(u.id, u.name)}>
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {modal && (
          <div className="modal-overlay" onClick={() => setModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Novo Usuário</h3>
                <button className="close-btn" onClick={() => setModal(false)}>✕</button>
              </div>
              <form onSubmit={handleCreate}>
                {error && <div className="alert error">{error}</div>}
                <div className="field">
                  <label>Nome</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                </div>
                <div className="field">
                  <label>Senha</label>
                  <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
                </div>
                <div className="field">
                  <label>Função</label>
                  <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                    <option value="user">Usuário</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setModal(false)}>Cancelar</button>
                  <button type="submit" className="btn-primary">Criar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
