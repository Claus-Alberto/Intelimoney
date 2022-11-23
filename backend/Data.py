import sqlite3
import pandas as pd
import UtilsDB as utils

currentKey = 'b87248ab'

#FAZ A REQUEST DA API E DEVOLVE UM DATAFRAME
def get_request(field):
    
    #Pega Url     
    if field == 'bitcoin' or field == 'currencies':
        reqUrl = f"https://api.hgbrasil.com/finance?format=json-cors&array_limit=1&fields=only_results,{field}&key={currentKey}"
    elif field == 'taxes':
        reqUrl = f'https://api.hgbrasil.com/finance/{field}?format=json-cors&array_limit=1&fields=only_results&key={currentKey}'
    else: #TITULOS (ACOES E FUNDOS)
        reqUrl = f'https://api.hgbrasil.com/finance/stock_price?format=json-cors&array_limit=1&fields=only_results&key={currentKey}&symbol={field}'
    
    
    #Le Json e transforme em um dataframe
    data = pd.read_json(reqUrl)
    
    try:
        df = pd.json_normalize(data[field])
    except:
        return data
    
    
    if field == 'currencies':
        #VERIFICA A TABELA DE MOEDAS
        utils.check_currencie(currentKey)
        
    return df


#BUSCA UM DADO OU TABELA DO BANCO
#RECEBE O NOME DA TABELA, CAMPO/COLUNA DA TABELA E PARAMETROS (NAO OBRIGATORIOS)
def get_table(table_name, field=None, parameter=None):
    
    utils.manage_db(table_name, currentKey)
    
    if field == None:
        data = utils.select_table(table_name)
    else:
        data =  utils.select_condition_table(table_name, field, parameter)
        
    return list_to_df(data, table_name)
    

#TRANSFORMA LISTA EM DATAFRAME
#RECEBE UMA LISTA E O NOME DA TABELA 
def list_to_df(list, table_name):
    col = []
    
    if table_name == 'TITLES':
        col = ['nome', 'simbolo']
    elif table_name == 'EXPECTATIVA_VIDA':
        col = ['country', 'expectancy']
    else: #HISTORICAL_CURRENCIES
        col = ['name', 'first', 'last', 'max', 'min', 'avg', 'data']
    
    df = pd.DataFrame(list, columns=col)
    return df


# DEV CLAUS

def getCDI():
    cdi = float(get_request('taxes').cdi[0])/100.00
    i = (1.0 + cdi) ** (1.0/12.0) - 1.0
    return i

def getActiveName(active):
    lActive = active.lower()
    result = get_request(lActive)
    return result[active.upper()].company_name

def searchActives(search):
    result = None
    try:
        result = get_table('TITLES', 'simbolo', search)
        symbolList = []
        for a in result.simbolo[0:5]:
            symbolList.append(a.lower())
            
        resultParameter = ','.join(symbolList)
        
        result = get_request(resultParameter)
        
        result = result.to_json(orient = 'columns') 
    except:
        result = {}
    finally:
        return result

if __name__ == '__main__':
    print(searchActives('FESA'))