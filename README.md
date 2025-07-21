📝 Textract — Image to Editable Text & Table
Textract is a full-stack web application that allows users to upload image or PDF files and get editable .docx output containing extracted text and tables. It uses Google Gemini API for OCR text and ExtractTable API for table extraction.

🚀 Features
✍️ Extract editable text from images or PDFs.

📊 Extract tables accurately and preserve structure.

📥 Download results as a .docx file.

🧠 Uses Gemini API for non-tabular text OCR.

🧮 Uses ExtractTable API for tabular data.

🧑‍💼 User login system with upload history.

🔒 Google OAuth & session-based authentication.

📁 File upload via drag & drop or browse.

📂 Project Structure
pgsql
Copy
Edit
Textract/
├── backend/
│   ├── app.py
│   ├── templates/
│   ├── static/
│   ├── output/
│   ├── uploads/
│   ├── database.db
│   ├── extract_table.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── Login.js
│   │   ├── UserContext.js
│   │   └── AppRouter.js
│   └── package.json
├── .gitignore
└── README.md
⚙️ Tech Stack
Frontend:

React

React Router

Axios

Backend:

Python + Flask

SQLite

python-docx

Google Gemini API

ExtractTable API

🧠 APIs Used
Gemini (Google AI) – OCR text extraction (non-tabular)

ExtractTable – Table detection and conversion

🔐 Authentication
Google OAuth login

Session-based login for upload access and user-specific history

🧪 How to Run
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/textract.git
cd textract
2. Set Up the Backend (Flask)
bash
Copy
Edit
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Create a .env file or directly configure:

EXTRACT_TABLE_API_KEY

GOOGLE_API_KEY or Gemini setup

Flask secret key

Then run:

bash
Copy
Edit
python app.py
3. Set Up the Frontend (React)
In a new terminal:

bash
Copy
Edit
cd frontend
npm install
npm start
🔁 Backend API Endpoints
POST /upload: Uploads and processes file.

GET /download/<filename>: Download processed docx.

GET /history/<username>: Get upload history for user.

🧪 Sample Test Flow
Open http://localhost:3000

Sign in with your Google account

Drag & drop or select a file

Click Upload

Wait for processing and download result

See your past uploads in Upload History

🛡️ Security
Cookies stored with withCredentials

No files shared across users

User-specific upload tracking with SQLite

🧾 License
MIT License. Free for personal and academic use.

💡 Future Improvements
Add export to .xlsx for extracted tables

Add support for handwriting recognition

Add progress bar & better error handling

Cloud storage for files (e.g., AWS S3)
