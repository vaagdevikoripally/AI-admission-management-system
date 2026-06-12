import os
import sqlite3
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
# Enable CORS for all dynamic front-end pipeline entry points
CORS(app, resources={r"/api/*": {"origins": "*"}})

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

DB_PATH = 'admissions.db'

# 🔥 ABSOLUTE PATH FIX: Dynamically track the machine learning binary relative to this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.normpath(os.path.join(BASE_DIR, '..', 'ML', 'logistic_model.pkl'))

print(f"🔄 SYSTEM STATUS: Targeting machine learning payload path at: {MODEL_PATH}")

try:
    with open(MODEL_PATH, 'rb') as f:
        ml_model = pickle.load(f)
    print("✅ SYSTEM STATUS: Machine Learning Logistic Regression model mounted successfully!")
except Exception as e:
    print(f"🚨 SYSTEM STATUS CRITICAL FAILURE: Could not mount model file. Reason: {str(e)}")
    ml_model = None

def db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullname TEXT, email TEXT UNIQUE, phone TEXT, password TEXT, role TEXT DEFAULT 'student'
        )''')
        cursor.execute('''CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_name TEXT, email TEXT, phone TEXT, dob TEXT, gender TEXT, course TEXT,
            gpa REAL, ssc REAL, intermediate REAL, entrance_score REAL, attendance REAL,
            category TEXT, extracurricular INTEGER, ml_prediction TEXT, ml_probability REAL, 
            genai_summary TEXT, risk_level TEXT, status TEXT DEFAULT 'Pending'
        )''')
        cursor.execute("SELECT * FROM users WHERE email='admin@university.edu'")
        if not cursor.fetchone():
            cursor.execute("INSERT INTO users (fullname, email, password, role) VALUES ('Admin Officer', 'admin@university.edu', 'admin123', 'admin')")
        conn.commit()

init_db()

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    try:
        with db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO users (fullname, email, phone, password, role) VALUES (?, ?, ?, ?, 'student')",
                           (data['fullname'], data['email'], data['phone'], data['password']))
            conn.commit()
        return jsonify({"message": "Registration successful"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Email pipeline address already registered"}), 400

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    with db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT fullname, email, role FROM users WHERE email=? AND password=?", (data['email'], data['password']))
        user = cursor.fetchone()
    if user:
        return jsonify(dict(user)), 200
    return jsonify({"error": "Invalid enterprise identity matching metrics"}), 401

@app.route('/api/applications/submit', methods=['POST'])
def submit_application():
    data = request.json
    gpa = float(data.get('gpa', 0))
    entrance = float(data.get('entrance_score', 0))
    attendance = float(data.get('attendance', 85))
    
    # Calculate ML input variables
    cat_val = 1 if str(data.get('category')).lower() == 'reserved' else 0
    extra_val = int(data.get('extracurricular', 0))
    prev_perf = float(data.get('intermediate', 0))

    # Base operational fallbacks
    ml_status = "Ineligible"
    prob_score = 45.0
    risk_level = "High"
    
    print(f"📋 PROCESSING APPLICATION: Running ML processing for {data.get('student_name')}")
    print(f"📊 INPUT VECTOR: {[gpa, entrance, attendance, prev_perf, cat_val, extra_val]}")

    if ml_model:
        try:
            features = np.array([[gpa, entrance, attendance, prev_perf, cat_val, extra_val]])
            pred = ml_model.predict(features)[0]
            prob = ml_model.predict_proba(features)[0][1]
            
            ml_status = "Eligible" if pred == 1 else "Ineligible"
            prob_score = round(float(prob) * 100, 2)
            risk_level = "Low" if prob_score > 75 else "Medium" if prob_score > 50 else "High"
            print(f"🚀 ML INFERENCE RESULT: {ml_status} with tracking probability: {prob_score}%")
        except Exception as model_err:
            print(f"🚨 CRITICAL PIPELINE INFERENCE ERROR: Execution broken. Details: {str(model_err)}")
            ml_status = "Inference Pipeline Error"
            prob_score = 0.0
            risk_level = "Unknown"
    else:
        print("⚠️ ML WARNING: Evaluation skipped. Model matrix was never mounted correctly.")

    # GenAI Structured Report Generation
    genai_summary = "AI evaluation engine offline. Baseline score patterns meet automated entry minimum layouts."
    if GEMINI_