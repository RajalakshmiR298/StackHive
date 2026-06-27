import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const activeStyle = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          CampusConnect
        </Link>
        <div className="nav-menu">
          <NavLink to="/" className={activeStyle}>Home</NavLink>
          <NavLink to="/events" className={activeStyle}>Events</NavLink>

          {user ? (
            <>
              <NavLink to="/favorites" className={activeStyle}>Favorites</NavLink>
              <NavLink to="/connections" className={activeStyle}>Connections</NavLink>
              <NavLink to="/profile" className={activeStyle}>Profile</NavLink>
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={activeStyle}>Login</NavLink>
              <NavLink to="/register" className={activeStyle}>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
