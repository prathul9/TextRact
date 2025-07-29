import React, { useState, useRef, useContext, useEffect } from "react";
import "./App.css";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const dropRef = useRef(null);
  const { username } = useContext(UserContext); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username, navigate]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadSuccess(false);
    setDownloadUrl(null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);

      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
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

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadSuccess(false);
      setDownloadUrl(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h1 className="site-title">Textract</h1>
      {username && <p className="welcome-msg">👋 Welcome, {username}!</p>}

      <div className="card">
        <h2>📝 Image to Editable Text & Table</h2>

        <div
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          ref={dropRef}
        >
          Drag & drop your image or PDF here or click to browse
          <input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange} />
        </div>

        {selectedFile && (
          <p className="filename">Selected: {selectedFile.name}</p>
        )}

        <button onClick={handleUpload} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </button>

        {isUploading && (
          <p className="uploading-msg">⏳ Uploading your file...</p>
        )}

        {uploadSuccess && downloadUrl && !isUploading && (
          <>
            <p className="success-msg">✅ File uploaded successfully!</p>
            <a className="download-btn" href={downloadUrl} download>
              ⬇️ Download Result
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default App;  