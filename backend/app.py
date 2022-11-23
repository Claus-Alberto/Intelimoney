from flask import Flask, make_response, jsonify, request
import Data as data
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/", methods = ['GET'])
def checkConnection():
    return {
        "success" : True
    }
    
@app.route("/coinsHistory/<moeda>")
def create_historicalcurrencie(moeda):
    if moeda =='USD':
        moedaE = 'Dollar'
    elif moeda =='EUR':
        moedaE ='Euro'
    elif moeda=='GBP':
        moedaE ='Pound Sterling'
    elif moeda=='ARS':
        moedaE ='Argentine Peso'
    elif moeda=='CAD':
        moedaE ='Canadian Dollar'
    elif moeda=='AUD':
        moedaE ='Australian Dollar'
    elif moeda=='JPY':
        moedaE ='Japanese Yen'
    elif moeda=='CNY':
        moedaE ='Renminbi'
    elif moeda=='BTC':
        moedaE ='Bitcoin'
    df = data.get_table('HISTORICAL_CURRENCIES', "name", moedaE)
    df = df.groupby('data').agg({'avg':'mean'})
    df= df.reset_index()
    return df.to_json(orient='records')


if __name__ == "__main__":
    app.run(debug = True)

