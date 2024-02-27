import os
import google.generativeai as genai
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt #pip install Flask-Bcrypt = https://pypi.org/project/Flask-Bcrypt/
from models import db, User


genai.configure(api_key=os.environ.get('API_KEY'))

gemini_model = genai.GenerativeModel('gemini-pro')


app = Flask(__name__)
app.config['SECRET_KEY'] = 'nadeer'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
  
bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True)
db.init_app(app)
  
with app.app_context():
    db.create_all()
 
 
@app.route("/signup", methods=["POST"])
def signup():
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]

    print(request.json)
 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.id
 
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })
 
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
  
    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
      
    session["user_id"] = user.id
  
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/message", methods=["POST"])
def chatbot():
    message = request.get_data()
    print(message)
    
    response = gemini_model.generate_content(f"Give a small simple description for {message} without a title only a small description reply, only if this prompt is health related only othervise respond that it is beyond your capabilities")
    bot_message = response.text
    
    return jsonify({"bot_message": bot_message}),200

if __name__ == "__main__":
    app.run(debug=True)