import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Perfil</h1>
            <p>Suas informações de conta</p>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <span className={`badge ${user?.role}`}>{user?.role}</span>
          </div>
        </div>

        <div className="info-box">
          <h3>Detalhes da Conta</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">ID</span>
              <span className="detail-value">#{user?.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Nome</span>
              <span className="detail-value">{user?.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{user?.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Função</span>
              <span className="detail-value">{user?.role}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
