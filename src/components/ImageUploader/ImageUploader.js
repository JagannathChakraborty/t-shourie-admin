import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import './ImageUploader.css';

const ImageUploader = ({ onUpload, category }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    }));
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setSelectedFiles((prev) => {
      const updated = prev.filter((file) => file.id !== id);
      return updated;
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);

    // Simulate upload - Replace with actual API call
    setTimeout(() => {
      if (onUpload) {
        onUpload(selectedFiles, category);
      }
      setSelectedFiles([]);
      setUploading(false);
    }, 2000);
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="image-uploader">
      <div
        className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="upload-input"
        />

        <div className="upload-content">
          <div className="upload-icon">
            <FaCloudUploadAlt />
          </div>
          <h3>Drag & Drop Images Here</h3>
          <p>or</p>
          <button type="button" className="browse-btn" onClick={onButtonClick}>
            Browse Files
          </button>
          <span className="upload-hint">Supports: JPG, PNG, WEBP (Max 5MB each)</span>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="preview-section">
          <div className="preview-header">
            <h4>Selected Images ({selectedFiles.length})</h4>
            <button
              className="clear-all-btn"
              onClick={() => setSelectedFiles([])}
            >
              Clear All
            </button>
          </div>

          <div className="preview-grid">
            {selectedFiles.map((file) => (
              <div key={file.id} className="preview-item">
                <img src={file.preview} alt="Preview" />
                <button
                  className="remove-btn"
                  onClick={() => removeFile(file.id)}
                >
                  <FaTimes />
                </button>
                <span className="file-name">{file.file.name}</span>
              </div>
            ))}
          </div>

          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <span className="loader"></span>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <FaCloudUploadAlt />
                <span>Upload {selectedFiles.length} Image(s)</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
