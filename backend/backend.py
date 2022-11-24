from flask import Flask, request, jsonify
from flask_cors import CORS
import Data as dataAccess

app = Flask(__name__)
CORS(app)

@app.route("/", methods = ['GET'])
def checkConnection():
    return {
        "success" : True
    }
    

@app.route("/get_active", methods = ['POST'])
def getActive():
    data = request.get_json()
    result = dataAccess.getActiveName(data['active'])
    return jsonify({
        'active' : result
    })
    
@app.route("/get_actives", methods = ['POST'])
def getActives():
    data = request.get_json()
    result = dataAccess.searchActives(data['active'])
    return jsonify(result)

@app.route("/calculate_simulations", methods = ['POST'])
def calculateSimulations():
    data = request.get_json()
    result = {
        'total_value' : 0.0,
        'total_invested' : 0.0,
        'total_gains' : 0.0
    }
    for a in data:
        i = float(a['interest_rate'])
        i /= 100
        
        if a['per_year']: i = (1.0 + i) ** (1.0/12.0) - 1.0
        elif a['CDI']: i = dataAccess.getCDI()
        if a['dividends']: i += float(a['dividends_value'])/100.00
        
        n = int(a['applied_time'])
        if a['applied_time_in_years']: n *= 12
        
        pmt = float(a['monthly_contribution'])
        c = float(a['initial_contribution'])
        
        total_value = c*((1+i)**n) + pmt*((1+i)**n-1)/i
        
        total_invested = c + pmt*n
        
        total_gains = total_value - total_invested
        
        result['total_value'] += total_value
        result['total_invested'] += total_invested
        result['total_gains'] += total_gains
        
    result['total_value'] = round(result['total_value'], 2)
    result['total_invested'] = round(result['total_invested'], 2)
    result['total_gains'] = round(result['total_gains'], 2)
    return jsonify(result)


@app.route("/coinsHistory/<moeda>")
def createHistoricalCurrencie(moeda):
    moedaE = None
    match moeda:
        case 'USD':
            moedaE = 'Dollar'
        case 'EUR':
            moedaE ='Euro'
        case 'GBP':
            moedaE ='Pound Sterling'
        case 'ARS':
            moedaE ='Argentine Peso'
        case 'CAD':
            moedaE ='Canadian Dollar'
        case 'AUD':
            moedaE ='Australian Dollar'
        case 'JPY':
            moedaE ='Japanese Yen'
        case 'CNY':
            moedaE ='Renminbi'
        case 'BTC':
            moedaE ='Bitcoin'
        case _:
            print('default')
        
    df = dataAccess.getTable('HISTORICAL_CURRENCIES', "name", moedaE)
    df = df.groupby('data').agg({'avg':'mean'})
    df= df.reset_index()
    return df.to_json(orient='records')
    
    
if __name__ == '__main__':
    app.run(debug=True)