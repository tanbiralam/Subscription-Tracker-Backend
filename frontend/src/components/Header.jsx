import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span>SubTracker</span>
          <span className="logo-dot"></span>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">{getInitials(user?.name)}</div>
            <span className="user-name">{user?.name}</span>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary btn-sm">
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
