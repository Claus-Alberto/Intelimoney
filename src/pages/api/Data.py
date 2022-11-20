import sqlite3
import pandas as pd
import UtilsDB as utils

#FAZ A REQUEST DA API E DEVOLVE UM DATAFRAME
def get_request(field):
    currentKey = 'b87248ab'

    #Pega Url     
    if field == 'bitcoin' or field == 'currencies':
        reqUrl = f"https://api.hgbrasil.com/finance?format=json-cors&array_limit=1&fields=only_results,{field}&key={currentKey}"
    elif field == 'taxes':
        reqUrl = f'https://api.hgbrasil.com/finance/{field}?key={currentKey}'
    else: #TITULOS (ACOES E FUNDOS)
        reqUrl = f'https://api.hgbrasil.com/finance/stock_price?key={currentKey}&symbol={field}'
    
    
    #Le Json e transforme em um dataframe
    data = pd.read_json(reqUrl)
    df = pd.json_normalize(data[field])

    if field == 'currencies':
        #VERIFICA A TABELA DE MOEDAS
        utils.check_currencie(currentKey)
        
    return df


#BUSCA UM DADO OU TABELA DO BANCO
#RECEBE O NOME DA TABELA, CAMPO/COLUNA DA TABELA E PARAMETROS (NAO OBRIGATORIOS)
def get_table(table_name, field=None, parameter=None):
        
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
    else:
        col = ['name', 'first', 'last', 'max', 'min', 'avg', 'data']
    
    df = pd.DataFrame(list, columns=col)
    return df
