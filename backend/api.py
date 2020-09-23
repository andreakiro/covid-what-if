from models.sum import sum
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def hello_world():
    body = request.json
    a = int(body['a'])
    b = int(body['b'])
    res = a + b
    return {"result": res}