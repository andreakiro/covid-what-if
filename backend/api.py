from flask import Flask, request
from flask_cors import CORS
import secrets
from modeling.unified import *
import json
import numpy as np

app = Flask(__name__)
CORS(app)

update_func = dict()

def api_load(args):
    print('Hey it seems you want to load some data, with this request :')
    print(args)
    uid = args['uid']
    country = args['country']
    tfrom = args['tframe']['from']
    tuntil = args['tframe']['until']
    _, sub_data, update = load(country, tfrom, tuntil)
    policies, target, dates, pred = sub_data
    update_func[uid] = update
    print('Here is the length of the dict : ' + str(len(update_func)))
    body = {
        "response": {
            "r0": list(np.nan_to_num(pred)),
            "target": list(np.nan_to_num(target)),
            "dates": [str(x) for x in dates],
            "policies": {k: list(v) for k, v in policies.items()}
        }
    }
    #print(json.dumps(body))
    return body

def api_update(args):
    print('Hey it seems you want to update your params')
    uid = args['uid']
    country = args['country']
    tfrom = args['tframe']['from']
    tuntil = args['tframe']['until']
    policies = args['policies']
    pred, target, _ = update_func[uid](country, tfrom, tuntil, policies)
    return {
        "response": {
            "r0": list(np.nan_to_num(pred)),
            "target": list(np.nan_to_num(target))
        }
    }

def api_init():
    print('Hey lets init your app')
    print('Current dict length : ' + str(len(update_func)))
    return {
        "countries": ['United States', 'Italy', 'Switzerland', 'Bangladesh'],
        "uid": secrets.token_urlsafe(8)
    }

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