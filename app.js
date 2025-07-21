import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [history, setHistory] = useState([]);
  const [username, setUsername] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !username) {
      setMessage("Please select a file and enter your name.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      setMessage("Upload successful!");
      setDownloadLink(response.data.download_link);
      fetchHistory(); // refresh history after upload
    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    }
  };

  const fetchHistory = async () => {
    if (!username) return;

    try {
      const response = await axios.get(`http://localhost:5000/history?username=${username}`);
      setHistory(response.data.history || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Automatically fetch history when username changes
  useEffect(() => {
    if (username) {
      fetchHistory();
    }
  }, [username]);

  return (
    <div className="container">
      <h2>Text and Table Extractor</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>

      {downloadLink && (
        <a href={downloadLink} target="_blank" rel="noopener noreferrer">
          Download Extracted Document
        </a>
      )}

      {history.length > 0 && (
        <div className="history">
          <h3>Your Upload History</h3>
          <ul>
            {history.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
