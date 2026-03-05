import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import API_BASE_URL from '../../config/api';
import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaTrophy,
  FaCamera,
  FaArrowRight,
  FaImage,
  FaTrash,
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    events: 0,
    classes: 0,
    achievements: 0,
    studio: 0,
  });
  const [recentUploads, setRecentUploads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch dashboard stats from API
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/dashboard/stats`);
        if (response.ok) {
          const data = await response.json(); // [{ category, count }]
          const statsMap = { events: 0, classes: 0, achievements: 0, studio: 0 };
          data.forEach((item) => {
            statsMap[item.category] = item.count;
          });
          setStats(statsMap);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    // Fetch recent uploads from API
    const fetchRecentUploads = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/dashboard/recent-uploads`);
        if (response.ok) {
          const data = await response.json(); // [{ id, name, category, date }]
          setRecentUploads(data);
        }
      } catch (error) {
        console.error('Failed to fetch recent uploads:', error);
      }
    };

    fetchStats();
    fetchRecentUploads();
  }, []);

  const handleDelete = async (upload) => {
    if (!window.confirm(`Are you sure you want to delete "${upload.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/gallery/${upload.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRecentUploads((prev) => prev.filter((u) => u.id !== upload.id));
        // Also update the stats count for the deleted category
        setStats((prev) => ({
          ...prev,
          [upload.category]: Math.max(0, (prev[upload.category] || 0) - 1),
        }));
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  const filteredUploads = recentUploads.filter((upload) =>
    upload.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header
          title="Dashboard"
          subtitle="Welcome to T. Shourie Admin Panel"
          onSearch={setSearchTerm}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
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
                  {filteredUploads.map((upload) => (
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
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(upload)}
                          title="Delete image"
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUploads.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: '#888' }}>
                        {searchTerm ? 'No images match your search.' : 'No recent uploads.'}
                      </td>
                    </tr>
                  )}
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
