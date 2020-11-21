from flask import Flask, request
from flask_cors import CORS
from modeling/unified.py import *

app = Flask(__name__)
CORS(app)

def api_load(args):
    
    return 0

def api_update(args):
    return 0

@app.route('/', methods=['POST'])
def api():
    # Get request
    body = request.json
    
    if (body['request'] == 'load'):
        return api_load(body['args'])
    else if (body['request'] == 'update'):
        return api_update(body['args'])
    else:
        return { "reponse": "invalid request" }

@app.route('/', methods=['POST'])
def hey():
    # Get request
    body = request.json

    # Retrieve parameters
    country = body['country']
    tfFrom = body['time-frame']['from'] # Format 'DD.MM.YYYY'
    tfUntil = body['time-frame']['until'] # Format 'DD.MM.YYYY'
    policies = body['policies']

    # Call the model
    r0 = getR0(getCode(country), tfFrom, tfUntil, policies)
    
    return {
        "response": {
            "r0": r0
        }
    }

@app.route('/', methods=['POST'])
def hello_world():
    body = request.json
    a = int(body['a'])
    b = int(body['b'])
    res = a + b
    return {"result": res}