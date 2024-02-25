from flask import Flask, request, session, send_from_directory, redirect, jsonify
from pymongo import MongoClient
from os.path import join, dirname, realpath
from dotenv import load_dotenv
from bson.json_util import dumps
import os


# Load environment variables
load_dotenv(join(dirname(realpath(__file__)), 'components/key.env'))

# Initialize Flask app
app = Flask(__name__, static_folder='components')

# Configure session
app.secret_key = os.getenv('SECRET')
app.config['SESSION_COOKIE_SECURE'] = False

# Database configuration
uri = os.getenv('MONGO_URI')
dbName = 'VoyageurDB'

@app.route('/login', methods=['GET'])
def login():
    return send_from_directory(app.static_folder, 'login/login.html')

@app.route('/login', methods=['POST'])
def do_login():
    client = MongoClient(uri)
    try:
        database = client[dbName]
        collection = database['Login-Information']
        username = request.form.get('username')
        password = request.form.get('password')
        user = collection.find_one({'username': username, 'password': password})
        if user:
            session['user'] = dumps(user)
            return redirect('/profile')
        else:
            return 'Invalid credentials', 401
    except Exception as e:
        print(f'Error connecting to the database: {str(e)}')
        return 'Internal Server Error', 500
    finally:
        client.close()

@app.route('/profile', methods=['GET'])
def profile():
    if 'user' in session:
        return send_from_directory(app.static_folder, 'index.html')
    else:
        return redirect('/login')

@app.route('/get-user-data', methods=['GET'])
def get_user_data():
    if 'user' in session:
        return jsonify(session['user'])
    else:
        return 'Not logged in', 401

if __name__ == '__main__':
    port = int(os.getenv('PORT'))
    app.run(port=port)
