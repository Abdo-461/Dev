#importing flask framework from the virtual environemnt created , jsonify to convert data into json format to display
from flask import Flask , jsonify
#import request library to create requests from different apis
import requests 

app = Flask(__name__)

from app import routes