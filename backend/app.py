from flask import Flask, make_response, jsonify, request
from bdExample import Moeda

app = Flask(__name__)

@app.route("/coinsHistory", methods=['GET'])
def coinsHistory():
    return make_response(
        jsonify(Moeda)
        
    )
@app.route("/coinsHistory", methods=['POST'])
def createCoinsHistory():
    coin = request.json
    Moeda.append(coin)
    return make_response(
        jsonify(coin)
    )

if __name__ == "__main__":
    app.run(debug = True)

