import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total_users: 0, total_admins: 0, new_today: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats')
      .then(({ data }) => setStats(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Total de Usuários', value: stats.total_users, icon: '👥', color: 'blue' },
    { label: 'Administradores', value: stats.total_admins, icon: '🛡️', color: 'purple' },
    { label: 'Novos Hoje', value: stats.new_today, icon: '🌟', color: 'green' },
  ];

  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Dashboard</h1>
            <p>Olá, <strong>{user?.name}</strong>! Aqui está o resumo do sistema.</p>
          </div>
          <div className="date-badge">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        </div>

        {loading ? (
          <div className="loading-grid">
            {[1,2,3].map(i => <div key={i} className="card skeleton" />)}
          </div>
        ) : (
          <div className="stats-grid">
            {cards.map((card) => (
              <div key={card.label} className={`stat-card ${card.color}`}>
                <div className="stat-icon">{card.icon}</div>
                <div className="stat-info">
                  <span className="stat-value">{card.value}</span>
                  <span className="stat-label">{card.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="info-box">
          <h3>🚀 Stack do Projeto</h3>
          <div className="tech-list">
            {['React + Vite', 'Node.js + Express', 'MySQL', 'JWT Auth', 'Axios'].map(t => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
