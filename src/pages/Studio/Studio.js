import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import API_BASE_URL from '../../config/api';
import '../Events/Events.css';

const Studio = () => {
  const [images, setImages] = useState([]);
  const [showCount, setShowCount] = useState(20);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/gallery?category=studio`);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Failed to fetch studio images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (files, category) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file.file));
      formData.append('category', 'studio');

      const response = await fetch(`${API_BASE_URL}/api/admin/gallery/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newImages = await response.json();
        setImages((prev) => [...newImages, ...prev]);
      }
    } catch (error) {
      console.error('Failed to upload images:', error);
    }
  };

  const handleDelete = async (ids) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/gallery/bulk-delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      });

      if (response.ok) {
        setImages((prev) => prev.filter((img) => !ids.includes(img.id)));
      }
    } catch (error) {
      console.error('Failed to delete images:', error);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header
          title="Studio Gallery"
          subtitle="Manage studio photos for the main website"
          onSearch={setSearchTerm}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
        />

        <div className="page-content">
          <div className="content-section">
            <h2 className="section-title">Upload New Images</h2>
            <ImageUploader onUpload={handleUpload} category="studio" />
          </div>

          <div className="content-section">
            <h2 className="section-title">Studio Images</h2>
            {loading ? (
              <div className="loading-state">
                <div className="loader-spinner"></div>
                <span>Loading images...</span>
              </div>
            ) : (
              <GalleryGrid
                images={images.filter((img) =>
                  img.name.toLowerCase().includes(searchTerm.toLowerCase())
                )}
                onDelete={handleDelete}
                showCount={showCount}
                onShowCountChange={setShowCount}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Studio;