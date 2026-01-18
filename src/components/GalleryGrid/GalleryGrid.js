import React, { useState } from 'react';
import { FaTrash, FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './GalleryGrid.css';

const GalleryGrid = ({ images, onDelete, showCount, onShowCountChange }) => {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [selectedImages, setSelectedImages] = useState([]);

  const displayedImages = images.slice(0, showCount);

  const openLightbox = (index) => {
    setLightbox({ open: true, index });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, index: 0 });
  };

  const nextImage = () => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % displayedImages.length,
    }));
  };

  const prevImage = () => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + displayedImages.length) % displayedImages.length,
    }));
  };

  const toggleSelectImage = (id) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    if (onDelete && selectedImages.length > 0) {
      onDelete(selectedImages);
      setSelectedImages([]);
    }
  };

  const showCountOptions = [10, 20, 30, 50, 100];

  return (
    <div className="gallery-grid-container">
      {/* Controls */}
      <div className="gallery-controls">
        <div className="gallery-info">
          <span className="total-count">
            Showing {displayedImages.length} of {images.length} images
          </span>
        </div>

        <div className="gallery-actions">
          {selectedImages.length > 0 && (
            <button className="delete-selected-btn" onClick={deleteSelected}>
              <FaTrash />
              <span>Delete Selected ({selectedImages.length})</span>
            </button>
          )}

          <div className="show-count-selector">
            <label>Show:</label>
            <select
              value={showCount}
              onChange={(e) => onShowCountChange(Number(e.target.value))}
            >
              {showCountOptions.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {displayedImages.length > 0 ? (
        <div className="gallery-grid">
          {displayedImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item ${
                selectedImages.includes(image.id) ? 'selected' : ''
              }`}
            >
              <img src={image.url} alt={image.name || `Image ${index + 1}`} />

              <div className="gallery-item-overlay">
                <div className="overlay-actions">
                  <button
                    className="action-btn select-btn"
                    onClick={() => toggleSelectImage(image.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      readOnly
                    />
                  </button>
                  <button
                    className="action-btn expand-btn"
                    onClick={() => openLightbox(index)}
                  >
                    <FaExpand />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete([image.id])}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {selectedImages.includes(image.id) && (
                <div className="selected-indicator">✓</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-images">
          <FaExpand className="no-images-icon" />
          <h3>No Images Found</h3>
          <p>Upload some images to get started</p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox.open && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <FaTimes />
          </button>

          <button
            className="lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <FaChevronLeft />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={displayedImages[lightbox.index]?.url}
              alt={displayedImages[lightbox.index]?.name || 'Image'}
            />
          </div>

          <button
            className="lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <FaChevronRight />
          </button>

          <div className="lightbox-counter">
            {lightbox.index + 1} / {displayedImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;