from flask import Flask, request
from flask_cors import CORS
from modeling/unified.py import *

app = Flask(__name__)
CORS(app)

update_func = None

def api_load(args):
    country = args['country']
    tfrom = args['time-frame']['from']
    tuntil = args['time-frame']['until']
    _, sub_data, update = load(country, tfrom, tuntil)
    policies, target, dates, pred = sub_data
    update_func = update
    return {
        "response": {
            "r0": pred,
            "target": target,
            "dates": dates,
            "policies": policies
        }
    }

def api_update(args):
    country = args['country']
    tfrom = args['time-frame']['from']
    tuntil = args['time-frame']['until']
    policies = args['policies']
    pred, target = update_func(country, tfrom, tuntil, policies)
    return {
        "response": {
            "r0": pred,
            "target": target
        }
    }

@app.route('/', methods=['POST'])
def api():
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