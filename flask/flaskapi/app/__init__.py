from flask import Flask , jsonify
import requests 

app = Flask(__name__)

from app import routes