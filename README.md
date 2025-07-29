# 📌 Textract: AI-Powered Document Text & Table Extraction

Textract is a full-stack web application that allows users to upload **images or PDFs** and extract both **text** (via Google Gemini AI) and **tables** (via ExtractTable API).  
The extracted results are neatly formatted into a downloadable **Word document** for easy use.

---

## 🌟 Features
- 🔐 **User Authentication** (Login & Signup page)
- 📤 **Upload Images & PDFs** (Drag & Drop or File Picker)
- 🤖 **AI-powered Text Extraction** (Google Gemini AI)
- 📊 **Accurate Table Extraction** (ExtractTable API)
- 📥 **Download Results** as `.docx`
- 🌐 **Modern UI** built with React
- ⚡ **Fast Flask Backend** for processing
- 🎨 Simple & Clean Interface

---

## 🛠️ Tech Stack

### **Frontend**
- [React.js](https://reactjs.org/) – Component-based UI library
- [React Router](https://reactrouter.com/) – Routing
- HTML5 & CSS3 – Structure & styling
- Fetch API – Communication with Flask backend

### **Backend**
- [Flask](https://flask.palletsprojects.com/) – Lightweight Python web framework
- Flask-CORS – Enables cross-origin communication
- [ExtractTable API](https://extracttable.com/) – Extracts tabular data from images/PDFs
- [Google Gemini AI](https://ai.google/) – Extracts text content from images
- [python-docx](https://python-docx.readthedocs.io/) – Creates Word documents
- [pdf2image](https://github.com/Belval/pdf2image) & [Pillow](https://pillow.readthedocs.io/) – Converts PDFs and handles images

---

## 📂 Project Structure
Textract/
│── backend/ # Flask backend
│ ├── app.py # Main Flask app
│ ├── uploads/ # Uploaded files
│ └── output/ # Generated Word docs
│
│── frontend/ # React frontend
│ ├── public/
│ │ └── index.html
│ └── src/
│ ├── App.js
│ ├── Login.js
│ ├── UserContext.js
│ ├── index.js
│ ├── App.css
│ ├── Login.css
│ └── index.css
│
└── README.md # Documentation


---

## ⚙️ Installation & Setup

### 🔹 Backend Setup (Flask)

bash
# Go to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python app.py

Backend will start at 👉 http://127.0.0.1:5000

# Open a new terminal
cd frontend

# Install dependencies
npm install

# Start React dev server
npm start
Frontend will start at 👉 http://localhost:3000

▶️ Usage

1.Start the Flask backend server.

2.Run the React frontend.

3.Open http://localhost:3000 in your browser.

4.Login or Sign up.

5.Drag & drop (or select) an image/PDF file.

6.Wait for the AI to extract text & tables.

7.Download the generated Word document.


