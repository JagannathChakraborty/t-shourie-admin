import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import './Events.css';

const Events = () => {
  const [images, setImages] = useState([]);
  const [showCount, setShowCount] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch images from API - Replace with actual API call
    fetchImages();
  }, []);

  const fetchImages = () => {
    setLoading(true);
    // Simulated data - Replace with actual API call
    setTimeout(() => {
      const dummyImages = Array.from({ length: 30 }, (_, i) => ({
        id: `event-${i + 1}`,
        url: `https://picsum.photos/400/400?random=${i + 1}`,
        name: `Event Photo ${i + 1}`,
        category: 'events',
        uploadedAt: new Date().toISOString(),
      }));
      setImages(dummyImages);
      setLoading(false);
    }, 1000);
  };

  const handleUpload = (files, category) => {
    // Handle upload - Replace with actual API call
    console.log('Uploading files:', files, 'to category:', category);
    
    // Simulate adding new images
    const newImages = files.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      url: file.preview,
      name: file.file.name,
      category: 'events',
      uploadedAt: new Date().toISOString(),
    }));

    setImages((prev) => [...newImages, ...prev]);
  };

  const handleDelete = (ids) => {
    // Handle delete - Replace with actual API call
    console.log('Deleting images:', ids);
    setImages((prev) => prev.filter((img) => !ids.includes(img.id)));
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <Header
          title="Events Gallery"
          subtitle="Manage event photos for the main website"
        />

        <div className="page-content">
          {/* Upload Section */}
          <div className="content-section">
            <h2 className="section-title">Upload New Images</h2>
            <ImageUploader onUpload={handleUpload} category="events" />
          </div>

          {/* Gallery Section */}
          <div className="content-section">
            <h2 className="section-title">Event Images</h2>
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

export default Events;