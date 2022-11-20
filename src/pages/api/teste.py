import sqlite3
import pandas as pd


def getRequest(field):
    #Pega Url 
    currentKey = 'b87248ab'
    if field == 'bitcoin' or field == 'currencies':
        reqUrl = f"https://api.hgbrasil.com/finance?format=json-cors&array_limit=1&fields=only_results,{field}&key={currentKey}"
    elif field == 'taxes':
        reqUrl = f'https://api.hgbrasil.com/finance/{field}?key={currentKey}'
    elif field == 'historical':
        reqUrl = f'https://api.hgbrasil.com/finance/{field}?format=json-cors&array_limit=1&fields=only_results,currencies&key={currentKey}&days_ago=1&mode=currencies'    
    else:
        reqUrl = f'https://api.hgbrasil.com/finance/stock_price?key={currentKey}&symbol={field}'
    
    
    #Le Json e transforme em um dataframe
    data = pd.read_json(reqUrl)
    df = pd.json_normalize(data[field])

    if field == 'historical':
        checkCurrencie()
        
    return df

def insert_life_expectancy():
    table_name = 'EXPECTATIVA_VIDA'
    
    life_expec = pd.read_json('life_expectancy.json')
    life_expec = life_expec.dropna()
    query = getQuery()

    insert_data(life_expec, table_name, query)


#Abre conexao inseri o dataframe e fecha a conexao, recebendo o dataframe e a
#tabela onde sera inserido
def insert_data(df, table_name, query):
    if table_name == 'HISTORICAL_CURRENCIES':
        insert = 'append'
    else:
        insert = 'replace'
    
    conn = sqlite3.connect('teste.db')
    conn.execute(query) 
    df.to_sql(table_name,conn,if_exists=insert,index=False)
    conn.commit()
    conn.close()
    
    
def checkCurrencie(reqUrl):
    table_name = 'HISTORICAL_CURRENCIES'
    
    data = pd.read_json(reqUrl)
    for (columnName, columnData) in data.iteritems():
        df = pd.json_normalize(data[columnName])
        dia = columnName.strftime("%d-%m-%Y")
        df['data'] = dia
        
        query = getQuery(table_name)
        insert_data(df,table_name, query)
        

def getQuery(table_name):
    if table_name == 'HISTORICAL_CURRENCIES':
        return f'CREATE TABLE IF NOT EXISTS {table_name} (name TEXT, first REAL, last REAL, max REAL, min REAL, avg REAL, data TEXT)'
    elif table_name == 'EXPECTATIVA_VIDA':
        return f'CREATE TABLE IF NOT EXISTS {table_name} (country TEXT PRIMARY KEY, expectancy NUMERIC)'
    elif table_name == 'CURRENCIES':
        return f'CREATE TABLE IF NOT EXISTS {table_name} (name TEXT NOT NULL, last REAL, buy REAL, sell REAL, variation NUMERIC)'
        

def checkIfExists(table_name, field, parameter):
    
    conn = sqlite3.connect('teste.db')
    cur = conn.cursor()
    query = f'SELECT * FROM {table_name} WHERE {field} = ?'
    cur.execute(query, (parameter,)) 
    records = cur.fetchall()
    cur.close()
    
    if len(records) < 1:
        return False
    
    return True

