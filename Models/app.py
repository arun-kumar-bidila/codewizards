from flask import Flask, request, jsonify, send_from_directory
import joblib
import os
from flask_cors import CORS
import pandas as pd
from pymongo import MongoClient
from bson import ObjectId
from bson.errors import InvalidId
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load Dataset
df = pd.read_csv("AI_Skill_Profiling_Dataset_100k_with_Future_Learning_Resources.csv")

# Initialize TF-IDF Vectorizer
tfidf = TfidfVectorizer(max_features=1000)
X = tfidf.fit_transform(df["Skills"]).toarray()

# Initialize LabelEncoder
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(df["Suggested Job"])

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Initialize Flask App
app = Flask(__name__, static_folder='static')
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["your_database"]
users_collection = db["users"]

# Update user skills and predict job
@app.route('/api/users/<user_id>', methods=['PUT'])
def update_user_skills(user_id):
    try:
        data = request.json
        skills = data.get("skills", [])

        if not skills or not isinstance(skills, list):
            return jsonify({"error": "Invalid skills data"}), 400

        # Handle different user ID formats
        try:
            user_id = ObjectId(user_id)  # Convert if it's a valid ObjectId
        except InvalidId:
            pass  # If not, treat it as a string

        users_collection.update_one(
            {"_id": user_id},
            {"$set": {"skills": skills}},
            upsert=True
        )

        # Predict job based on skills
        skills_tfidf = tfidf.transform([" ".join(skills)])  # Transform input
        if skills_tfidf.nnz == 0:
            return jsonify({"error": "No matching skills found"}), 400

        prediction = model.predict(skills_tfidf)
        predicted_job = label_encoder.inverse_transform(prediction)[0]

        return jsonify({"message": "Skills updated successfully", "prediction": predicted_job}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=2000)
