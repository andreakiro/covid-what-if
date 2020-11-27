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

@app.route('/init', methods=['POST'])
def init():
    return {
        "countries": getAvailableCountries(),
        "uid": secrets.token_urlsafe(8)
    }

@app.route('/load', methods=['POST'])
def load2():
    body = request.json
    uid = body['uid']
    country_iso = getIso(body['country'])
    tfrom = body['tframe']['from']
    tuntil = body['tframe']['until']
    _, sub_data, update = load(country_iso, tfrom, tuntil)
    policies, target, dates, pred = sub_data
    update_func[uid] = update
    return {
        "pred": list(np.nan_to_num(pred)),
        "target": list(np.nan_to_num(target)),
        "dates": [str(x) for x in dates],
        "policies": {k: list(v) for k, v in policies.items()}
    }

@app.route('/update', methods=['GET', 'POST'])
def update():
    body = request.json
    uid = body['uid']
    country_iso = getIso(body['country'])
    tfrom = body['tframe']['from']
    tuntil = body['tframe']['until']
    policies = body['policies']
    print(country_iso, tfrom, tuntil)
    pred, target, dates = update_func[uid](country_iso, tfrom, tuntil, policies)
    return {
        "pred": list(np.nan_to_num(pred)),
        "target": list(np.nan_to_num(target)),
        "dates": [str(x) for x in dates],
    }

@app.route('/', methods=['POST'])
def api():
    return {}