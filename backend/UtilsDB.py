import pandas as pd
import sqlite3
import os

#PEGA O CAMINHO DO DIRETORIO ATUAL
path = os.getcwd() + '/backend/database/ArquivosBanco/'


#VERIFICA SE A TABELA EXISTE, SENAO EXISTIR INSERE NO BANCO
#RECEBE O NOME DA TABELA E CHAVE DA API
def manageDB(table_name, currentKey):
    if checkIfTableExists(table_name):
        return
    
    if table_name == 'TITLES':
        insertTitles()
    elif table_name == 'EXPECTATIVA_VIDA':
        insertLifeExpectancy()
    else:
        checkCurrencie(currentKey)

#INSERE O JSON COM AS EXPECTATIVAS DE VIDA NO BANCO
def insertLifeExpectancy():
    table_name = 'EXPECTATIVA_VIDA'
    
    life_expec = pd.read_json(path + 'life_expectancy.json')
    life_expec = life_expec.dropna()
    query = getQuery(table_name)

    insertData(life_expec, table_name, query)
    
    
#INSERE O CSV COM OS TITULOS E OS SIMBOLOS NO BANCO
def insertTitles():
    table_name = 'TITLES'
    
    titles = pd.read_csv(path + 'titulos.csv')
    query = getQuery(table_name)

    insertData(titles, table_name, query)


#ABRE A CONEXAO INSERE O DATAFRAME E FECHA A CONEXAO, 
#RECEBE O DATAFRAME, O NOME DA TABELA, E UMA QUERY PARA CRIAR O BANCO CASO NAO EXISTA
def insertData(df, table_name, query):
    if table_name == 'HISTORICAL_CURRENCIES':
        insert = 'append'
    else:
        insert = 'replace'
    
    conn = sqlite3.connect('teste.db')
    conn.execute(query) 
    df.to_sql(table_name,conn,if_exists=insert,index=False)
    conn.commit()
    conn.close()


#STRING PARA CRIAR A TABELA NO BANCO
#RECEBE O NOME DA TABELA
def getQuery(table_name):
    if table_name == 'HISTORICAL_CURRENCIES':
        return f'CREATE TABLE IF NOT EXISTS {table_name} (name TEXT, first REAL, last REAL, max REAL, min REAL, avg REAL, data TEXT)'
    elif table_name == 'EXPECTATIVA_VIDA':
        return f'CREATE TABLE IF NOT EXISTS {table_name} (country TEXT PRIMARY KEY, expectancy NUMERIC)'
    elif table_name == 'TITLES':
        return f'CREATE TABLE IF NOT EXISTS {table_name} (nome TEXT, simbolo TEXT)'


#CONFERE SE A TABELA EXISTE NO BANCO E RETORNA UM BOOLEAN
#RECEBE O NOME DA TABELA
def checkIfTableExists(table_name):
    conn = sqlite3.connect('teste.db')
    cur = conn.cursor()
    
    #PROCURA A TABELA DENTRO DA TABELA MASTER
    listOfTables = cur.execute(f'''SELECT name FROM sqlite_master WHERE type="table" AND name=?''', (table_name,)).fetchall()
    
    if listOfTables == []:
        return False
    
    return True


#VERIFICA SE UM VALOR EXISTE NA TABELA E RETORNA UMA LISTA COM OS VALORES
#RECEBE O NOME DA TABELA, A COLUNA PROCURADA, O VALOR PROCURADO
def selectConditionTable(table_name, field, parameter, return_bool=False):
    
    conn = sqlite3.connect('teste.db')
    cur = conn.cursor()
    query = None
    
    
    if table_name.upper() == 'TITLES':
        parameter = '%' + parameter + '%'
        query = f'SELECT * FROM {table_name} WHERE {field} LIKE ?'
    else:
        query = f'SELECT * FROM {table_name} WHERE {field} = ?'
    
        
    cur.execute(query, (parameter,)) 
    records = cur.fetchall()
    cur.close()
    
    #SE FOR FEITA APENAS A VERIFICACAO Da EXISTENCIA DO VALOR NA TABELA RETORNA UM BOOLEAN
    if return_bool:
        if records == []:
            return False
        
        return True

    return records


#VERIFICA SE A TABELA DE HISTORICO DE MOEDAS EXISTE, CASO NAO CRIA A TABELA E INSERE OS DADOS
#CASO EXISTA VERIFICA SE POSSUI A DATA DE ONTEM, CASO NAO INSERE NA TABELA
#RECEBE A CHAVE DA API
def checkCurrencie(currentKey):
    from datetime import datetime, timedelta
    
    table_name = 'HISTORICAL_CURRENCIES'

    #VERIFICA SE A TABELA EXISTE
    if checkIfTableExists(table_name):
        df = buildData(currentKey, table_name, '1')
        dia = datetime.strftime(datetime.now() - timedelta(1), '%d-%m-%Y')

        #VERIFICA SE EXISTEM DADOS COM A DATA DE ONTEM
        if selectConditionTable(table_name, 'data', dia):
            return
        else:
            query = getQuery(table_name)
            insertData(df,table_name, query)
            return
    else: 
        buildData(currentKey, table_name, '20')


#LE O JSON RECEBIDO E ADICIONA UMA COLUNA COM A DATA, DEVOLVE O DATAFRAME DA REQUISICAO 
#RECEBE A KEY DA API, O NOME DA TABELA, QUANTOS DIAS ATRAS IRA PUXAR
def buildData(currentKey, table_name, days):
    reqUrl = f'https://api.hgbrasil.com/finance/historical?format=json-cors&array_limit=1&fields=only_results,currencies&key={currentKey}&days_ago={days}&mode=currencies'    
        
    data = pd.read_json(reqUrl)
    for (columnName, columnData) in data.iteritems():
        df = pd.json_normalize(data[columnName])
        dia = columnName.strftime("%d-%m-%Y")
        df['data'] = dia
        
        if days == '20':
            query = getQuery(table_name)
            insertData(df,table_name, query)
        else:
            return df


#DEVOLVE LISTA DE VALORES DA TABELA
#RECEBE NOME DA TABELA
def selectTable(table_name):
    conn = sqlite3.connect('teste.db')
    cur = conn.cursor()
    query = f'SELECT * FROM {table_name}'
    cur.execute(query) 
    records = cur.fetchall()
    cur.close()
    
    return records
