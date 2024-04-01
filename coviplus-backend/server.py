import os
import google.generativeai as genai
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt 
from models import db, User
import tensorflow as tf
import cv2
from PIL import Image, ImageOps
import numpy as np
import tensorflow.keras as keras
from tensorflow.keras.preprocessing import image
from skimage.segmentation import mark_boundaries
from lime import lime_image


genai.configure(api_key=os.environ.get('API_KEY'))

gemini_model = genai.GenerativeModel('gemini-pro-vision')


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
 
model = tf.keras.models.load_model('CrossValidatedModel.h5')

def import_and_predict(image_data, model):
    size = (200, 200)    
    image = ImageOps.fit(image_data, size, Image.LANCZOS)
    image = np.asarray(image)
    img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    img_resize = (cv2.resize(img, dsize=(200, 200), interpolation=cv2.INTER_CUBIC))/255.

    img_reshape = img_resize[np.newaxis,...]

    prediction = model.predict(img_reshape)
    y_classes = prediction.argmax(axis=-1)

    return prediction, y_classes

def transform_img_fn(img, path_list):
    out = []
    for img_path in path_list:
        img_ = image.load_img(img_path, target_size=(200, 200))
        x = image.img_to_array(img_)
        x = np.expand_dims(x, axis=0)
        x = x / 255
        x = x.reshape(1,200, 200,3)
    return x

def displayExplainations(model, img):
    explainer = lime_image.LimeImageExplainer()
    exp = explainer.explain_instance(img[0].astype('double'), model.predict, hide_color=0, num_samples=100)
    
    temp, mask = exp.get_image_and_mask(exp.top_labels[0], positive_only=False, hide_rest=False)
    # Saving explanation image
    plt.imsave('static/' + 'Exp1.png', mark_boundaries(temp / 2 + 0.5, mask), dpi=2000)
    
    # Explanation 2 
    temp, mask = exp.get_image_and_mask(exp.top_labels[0], positive_only=True, hide_rest=True)
    plt.imsave('static/' + 'Exp2.png', mark_boundaries(temp / 2 + 0.5, mask), dpi=2000)
    
    # Explanation 3
    temp, mask = exp.get_image_and_mask(exp.top_labels[0], positive_only=True, hide_rest=False)
    plt.imsave('static/' + 'Exp3.png', mark_boundaries(temp / 2 + 0.5, mask), dpi=2000)



@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
        file_path = 'static/uploaded_image.png'
        file.save(file_path)
        uploadedImage = Image.open(file_path)
        prediction, category = import_and_predict(uploadedImage, model)
        
        if np.argmax(prediction) == 0:
            result = "COVID-19"
        elif np.argmax(prediction) == 1:
            result = "Normal"
        else:
            result = "Viral Pneumonia"

        susdiseases = gemini_model.generate_content(f"list susceptible diseases names seperated by coma for {result} no nee of titles")
        precaution = gemini_model.generate_content(f"seperated by coma and no need of titles, precatoinary measures to prevent {result} ")

        sus_diseases = susdiseases.text.split(',')
        precautions = precaution.text.split(',')

        return jsonify({
            'result': result,
            'probability': prediction.tolist(),
            "susdisease": sus_diseases,
            "precaution": precautions
        })

 
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
    message = request.json["message"]
    print(message)
    if message == "hi" or message == "hello":
        # print('hereeeeeeee')
        response = gemini_model.generate_content(f"{message}")
    else:
        topic = gemini_model.generate_content(f"{message} -- is this a health related or non-health related topic?  answer in strictly one word ")
        print(topic.text)
        if topic.text == "Health":
            response = gemini_model.generate_content(f"prompt = \'{message}\' . small description about prompt wihtout title")
        else:
            response = gemini_model.generate_content("Say something like this is beyond my capabilities and i cant reply to non health related data")

    
    bot_message = response.text
    
    return jsonify({"bot_message": bot_message}),200

@app.route("/quote", methods=["POST"])
def quote():
    req = request.json["message"]
    print(req)
    todaysquote = gemini_model.generate_content("Give me 1 health related quote")
    print(todaysquote.text)
    tquote = todaysquote.text
    return jsonify({"quote": tquote})

@app.route("/review",methods=['POST'])
def review():
    file = request.files['file']
    file_path = 'static/health_image.png'
    file.save(file_path)
    img = Image.open(file_path)
    response = gemini_model.generate_content(["tell me the details in it in a single para",img])
    # response.resolve()
    print(response.text)
    reviews = response.text
    return jsonify({"review":reviews})


if __name__ == "__main__":
    app.run(debug=True)
