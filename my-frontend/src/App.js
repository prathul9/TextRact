import React, { useState, useRef, useContext, useEffect } from "react";
import "./App.css";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const dropRef = useRef(null);
  const fileInputRef = useRef(null);
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadSuccess(false);
      setDownloadUrl(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.includes('image') || file.type.includes('pdf')) {
        setSelectedFile(file);
        setUploadSuccess(false);
        setDownloadUrl(null);
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);

      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setIsUploading(false);
          setUploadSuccess(true);
          setDownloadUrl(data.doc_url);
        })
        .catch((err) => {
          setIsUploading(false);
          alert("❌ Upload failed. Please try again.");
          console.error(err);
        });
    }
  };

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setUsername("");
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout error:", err);
        alert("❌ Failed to log out. Try again.");
      });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (file) => {
    if (!file) return "📄";
    if (file.type.includes('pdf')) return "📄";
    if (file.type.includes('image')) return "🖼️";
    return "📄";
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="app-container">
      <div className="background-pattern"></div>
      
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">📝</div>
            <h1 className="app-title">TextRact</h1>
            <span className="app-subtitle">Extract text from images & PDFs</span>
          </div>
          <div className="user-section">
            <div className="user-info">
              <div className="user-avatar">👤</div>
              <div className="user-details">
                <span className="welcome-text">Welcome back</span>
                <span className="username">{username}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <span>Logout</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="upload-container">
          <div className="upload-header">
            <h2>Upload Your File</h2>
            <p>Drag and drop your image or PDF file, or click to browse</p>
          </div>

          <div 
            className={`upload-zone ${isDragOver ? 'drag-over' : ''} ${selectedFile ? 'has-file' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            ref={dropRef}
          >
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="file-input"
            />
            
            {!selectedFile ? (
              <div className="upload-placeholder">
                <div className="upload-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17,8 12,3 7,8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                <div className="upload-text">
                  <span className="primary-text">Click to upload</span>
                  <span className="secondary-text">or drag and drop your file here</span>
                </div>
                <div className="supported-formats">
                  <span>Supports: PNG, JPG, JPEG, PDF</span>
                </div>
              </div>
            ) : (
              <div className="file-preview">
                <div className="file-info">
                  <div className="file-icon">{getFileIcon(selectedFile)}</div>
                  <div className="file-details">
                    <span className="file-name">{selectedFile.name}</span>
                    <span className="file-size">{formatFileSize(selectedFile.size)}</span>
                  </div>
                </div>
                <button 
                  className="remove-file"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setUploadSuccess(false);
                    setDownloadUrl(null);
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {selectedFile && (
            <div className="upload-actions">
              <button 
                onClick={handleUpload} 
                disabled={isUploading}
                className={`upload-btn ${isUploading ? 'uploading' : ''}`}
              >
                {isUploading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>Extract Text</span>
                  </>
                )}
              </button>
            </div>
          )}

          {uploadSuccess && downloadUrl && (
            <div className="result-section">
              <div className="success-message">
                <div className="success-icon">✅</div>
                <div className="success-content">
                  <h3>Text Extraction Complete!</h3>
                  <p>Your file has been processed successfully</p>
                </div>
              </div>
              <a href={downloadUrl} download className="download-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Download Result</span>
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;