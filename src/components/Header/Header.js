import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = ({ title, subtitle, onSearch }) => {
  const { user } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearchChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </button>

        <div className="header-title">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search images..."
            onChange={handleSearchChange}
          />
        </div>

        <div className="header-user">
          <span className="user-greeting">Hello, {user?.name || 'Admin'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
