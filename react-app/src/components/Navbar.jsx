import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <h2>Movie Recommendation</h2>
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/profile" 
              className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
            >
              Watchlist
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/login" 
              className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
