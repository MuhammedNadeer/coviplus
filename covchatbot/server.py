from flask import Flask, request, jsonify
import google.generativeai as genai

genai.configure(api_key='')

gemini_model = genai.GenerativeModel('gemini-pro')

app = Flask(__name__)

@app.route("/respond", methods=["POST"])
def respond():
    message = request.form["message"]
    
    response = gemini_model.generate_content(f"Give a small simple description for {message} without a title only a small description reply, only if this prompt is health related only othervise respond that it is beyond your capabilities")
    bot_message = response.text
    
    return jsonify({"bot_message": bot_message}),200

if __name__ == "__main__":
    app.run(debug=True)
