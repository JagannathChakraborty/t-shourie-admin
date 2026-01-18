import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaTrophy,
  FaCamera,
  FaArrowRight,
  FaImage,
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    events: 0,
    classes: 0,
    achievements: 0,
    studio: 0,
  });

  useEffect(() => {
    // Fetch stats from API - Replace with actual API call
    // Simulated data
    setStats({
      events: 24,
      classes: 18,
      achievements: 32,
      studio: 45,
    });
  }, []);

  const categories = [
    {
      title: 'Events',
      count: stats.events,
      icon: <FaCalendarAlt />,
      path: '/events',
      color: 'primary',
    },
    {
      title: 'Classes',
      count: stats.classes,
      icon: <FaChalkboardTeacher />,
      path: '/classes',
      color: 'gold',
    },
    {
      title: 'Achievements',
      count: stats.achievements,
      icon: <FaTrophy />,
      path: '/achievements',
      color: 'copper',
    },
    {
      title: 'Studio',
      count: stats.studio,
      icon: <FaCamera />,
      path: '/studio',
      color: 'maroon',
    },
  ];

  const recentUploads = [
    { id: 1, name: 'Event Photo 1', category: 'Events', date: '2024-01-15' },
    { id: 2, name: 'Class Photo 2', category: 'Classes', date: '2024-01-14' },
    { id: 3, name: 'Achievement 3', category: 'Achievements', date: '2024-01-13' },
    { id: 4, name: 'Studio Photo 4', category: 'Studio', date: '2024-01-12' },
    { id: 5, name: 'Event Photo 5', category: 'Events', date: '2024-01-11' },
  ];

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <Header
          title="Dashboard"
          subtitle="Welcome to T. Shourie Admin Panel"
        />

        <div className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            {categories.map((category, index) => (
              <Link
                to={category.path}
                key={index}
                className={`stat-card stat-${category.color}`}
              >
                <div className="stat-icon">{category.icon}</div>
                <div className="stat-info">
                  <span className="stat-count">{category.count}</span>
                  <span className="stat-label">{category.title} Images</span>
                </div>
                <div className="stat-arrow">
                  <FaArrowRight />
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section">
            <h2 className="section-title">Quick Actions</h2>
            <div className="quick-actions">
              {categories.map((category, index) => (
                <Link
                  to={category.path}
                  key={index}
                  className="quick-action-card"
                >
                  <div className="action-icon">{category.icon}</div>
                  <span>Upload to {category.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Recent Uploads</h2>
              <Link to="/events" className="view-all-link">
                View All <FaArrowRight />
              </Link>
            </div>

            <div className="recent-uploads-table">
              <table>
                <thead>
                  <tr>
                    <th>Image Name</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUploads.map((upload) => (
                    <tr key={upload.id}>
                      <td>
                        <div className="upload-name">
                          <FaImage />
                          <span>{upload.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="category-badge">{upload.category}</span>
                      </td>
                      <td>{upload.date}</td>
                      <td>
                        <button className="view-btn">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;