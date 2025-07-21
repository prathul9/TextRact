import React, { useState, useRef, useContext, useEffect } from "react";
import "./App.css";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [uploadHistory, setUploadHistory] = useState([]);
  const fileInputRef = useRef(null);
  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/");
    } else {
      fetchHistory();
    }
  }, [username, navigate]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/history/${username}`);
      setUploadHistory(response.data.history || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadSuccess(false);
      setDownloadUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("username", username);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      const data = response.data;
      setUploadSuccess(true);
      setDownloadUrl(data.doc_url);
      fetchHistory(); // refresh history after successful upload
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload. Please try again.");
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

  const handleClickDropZone = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <h1 className="site-title">TextRact</h1>
      {username && <p className="welcome-msg">👋 Welcome, {username}!</p>}

      <div className="card">
        <h2>📝 Image to Editable Text & Table</h2>

        <div
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClickDropZone}
        >
          Drag & drop your image here or click to browse
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>

        {selectedFile && (
          <p className="filename">Selected: {selectedFile.name}</p>
        )}

        <button onClick={handleUpload} disabled={!selectedFile}>
          Upload
        </button>

        {uploadSuccess && downloadUrl && (
          <>
            <p className="success-msg">✅ File uploaded successfully!</p>
            <a className="download-btn" href={downloadUrl} download>
              ⬇ Download Result
            </a>
          </>
        )}
      </div>

      {/* Upload History */}
      <div className="card">
        <h2>📜 Upload History</h2>
        {uploadHistory.length === 0 ? (
          <p>No history yet.</p>
        ) : (
          <ul>
            {uploadHistory.map((entry, idx) => (
              <li key={idx}>
                <a
                  href={`http://localhost:5000/download/${entry.filename}`}
                  download
                >
                  {entry.filename}
                </a>{" "}
                — {entry.timestamp}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
