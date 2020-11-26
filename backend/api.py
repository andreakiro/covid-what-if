from flask import Flask, request
from flask_cors import CORS
import secrets
from modeling.unified import *
from utils.countries import *
import json
import numpy as np

app = Flask(__name__)
CORS(app)

update_func = dict()

def api_load(args):
    uid = args['uid']
    country_iso = getIso(args['country'])
    tfrom = args['tframe']['from']
    tuntil = args['tframe']['until']
    _, sub_data, update = load(country_iso, tfrom, tuntil)
    policies, target, dates, pred = sub_data
    update_func[uid] = update
    return {
        "response": {
            "pred": list(np.nan_to_num(pred)),
            "target": list(np.nan_to_num(target)),
            "dates": [str(x) for x in dates],
            "policies": {k: list(v) for k, v in policies.items()}
        }
    }

def api_update(args):
    uid = args['uid']
    country_iso = getIso(args['country'])
    tfrom = args['tframe']['from']
    tuntil = args['tframe']['until']
    policies = args['policies']
    pred, target, _ = update_func[uid](country_iso, tfrom, tuntil, policies)
    return {
        "response": {
            "pred": list(np.nan_to_num(pred)),
            "target": list(np.nan_to_num(target))
        }
    }

def api_init():
    return {
        "countries": getAvailableCountries(),
        "uid": secrets.token_urlsafe(8)
    }

@app.route('/init', methods=['POST'])
def init():
    return {"hey": "hey"}

@app.route('/', methods=['POST'])
def api():
    body = request.json
    if (body['request'] == 'load'):
        return api_load(body['args'])
    elif (body['request'] == 'update'):
        return api_update(body['args'])
    elif (body['request'] == 'init'):
        return api_init()
    else:
        return { "reponse": "invalid request" }