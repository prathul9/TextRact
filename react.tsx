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

  // Redirect if no username found (user not logged in)
  useEffect(() => {
    if (!username) {
      navigate("/");
    } else {
      fetchHistory();
    }
  }, [username, navigate]);

  // Fetch upload history from backend
  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/history/${username}`,
        { withCredentials: true }
      );
      setUploadHistory(response.data.history || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadSuccess(false);
      setDownloadUrl(null);
    }
  };

  // Upload file to backend
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
      fetchHistory(); // Refresh history after successful upload
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Failed to upload. Please try again.");
    }
  };

  // Handle drag & drop upload
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadSuccess(false);
      setDownloadUrl(null);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleClickDropZone = () => fileInputRef.current?.click();

  return (
    <div className="container">
      <h1 className="site-title">TextRact</h1>
      {username && <p className="welcome-msg">👋 Welcome, {username}!</p>}

      {/* Upload Card */}
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

      {/* History Card */}
      <div className="card">
        <h2>📜 Upload History</h2>
        {uploadHistory.length === 0 ? (
          <p className="filename">No uploads yet.</p>
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
                — <span>{entry.timestamp}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
