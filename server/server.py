from flask import Flask, jsonify, request, render_template
import util

app = Flask(__name__)

# Load model & columns once at startup
print("Loading saved artifacts...")
util.load_saved_artifacts()
print("Artifacts loaded successfully")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_location_names')
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, total_sqft, bath, bhk)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask for Home Price Prediction...")
    app.run(debug=True)