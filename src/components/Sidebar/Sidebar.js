import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaHome,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaTrophy,
  FaCamera,
  FaSignOutAlt,
  FaMusic,
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/dashboard',
      icon: <FaHome />,
      label: 'Dashboard',
    },
    {
      path: '/events',
      icon: <FaCalendarAlt />,
      label: 'Events',
    },
    {
      path: '/classes',
      icon: <FaChalkboardTeacher />,
      label: 'Classes',
    },
    {
      path: '/achievements',
      icon: <FaTrophy />,
      label: 'Achievements',
    },
    {
      path: '/studio',
      icon: <FaCamera />,
      label: 'Studio',
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src="/logo.png" alt="T. Shourie" className="logo-img" />
          <div className="logo-text">
            <span className="logo-main">T. Shourie</span>
            <span className="logo-sub">Admin Panel</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            <FaMusic />
          </div>
          <div className="user-details">
            <span className="user-name">{user?.name || 'Admin'}</span>
            <span className="user-role">{user?.role || 'Administrator'}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;