import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import '../Events/Events.css';

const Studio = () => {
  const [images, setImages] = useState([]);
  const [showCount, setShowCount] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    setLoading(true);
    setTimeout(() => {
      const dummyImages = Array.from({ length: 40 }, (_, i) => ({
        id: `studio-${i + 1}`,
        url: `https://picsum.photos/400/400?random=${i + 300}`,
        name: `Studio Photo ${i + 1}`,
        category: 'studio',
        uploadedAt: new Date().toISOString(),
      }));
      setImages(dummyImages);
      setLoading(false);
    }, 1000);
  };

  const handleUpload = (files, category) => {
    const newImages = files.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      url: file.preview,
      name: file.file.name,
      category: 'studio',
      uploadedAt: new Date().toISOString(),
    }));
    setImages((prev) => [...newImages, ...prev]);
  };

  const handleDelete = (ids) => {
    setImages((prev) => prev.filter((img) => !ids.includes(img.id)));
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <Header
          title="Studio Gallery"
          subtitle="Manage studio photos for the main website"
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
                images={images}
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