import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', icon: '⊞', label: 'Dashboard' },
  { to: '/users', icon: '👥', label: 'Usuários', adminOnly: true },
  { to: '/profile', icon: '👤', label: 'Perfil' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">◈</span>
        <span className="logo-text">AdminPanel</span>
      </div>

      <div className="sidebar-user">
        <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
        <div>
          <p className="user-name">{user?.name}</p>
          <span className={`badge ${user?.role}`}>{user?.role}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems
          .filter((item) => !item.adminOnly || user?.role === 'admin')
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <span>⎋</span> Sair
      </button>
    </aside>
  );
}
