import os
from flask import Flask, render_template, request, send_file
from PIL import Image
import pytesseract
from docx import Document
from werkzeug.utils import secure_filename

app = Flask(__name__, template_folder="templates")
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"  # Change if needed

def image_to_docx(image_path, output_docx):
    text = pytesseract.image_to_string(Image.open(image_path))
    doc = Document()
    doc.add_paragraph(text)
    doc.save(output_docx)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    if "image" not in request.files:
        return "No file uploaded", 400

    file = request.files["image"]
    
    if file.filename == "":
        return "No selected file", 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    docx_filename = filename.rsplit(".", 1)[0] + ".docx"
    docx_path = os.path.join(app.config["UPLOAD_FOLDER"], docx_filename)
    image_to_docx(filepath, docx_path)

    return send_file(docx_path, as_attachment=True)

if __name__ == "__main__":
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
