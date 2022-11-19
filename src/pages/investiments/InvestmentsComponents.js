import React from "react";
import { useState } from 'react';
import "../../style/investment/investments_page.css";
import { Bitcoin, Stocks, Taxes } from "../api/api";
import Swal from 'sweetalert2';

const all_data = {}



const InvestmentsPage = (props) => {

    const [actives, set_actives] = useState([]);
    const [searchValue, setsearchValue] = useState('');

    window.onload =  () => {
        Taxes().then(data => {
            all_data['cdi'] = {
                'valor': ['Taxa: ', data[0].cdi, '%'],
                'variacao': 'N/A',
                'dividendos': 'N/A',
                'tipo' : 'taxa'
            };
            all_data['selic'] = {
                'valor': ['Taxa: ', data[0].selic, '%'],
                'variacao': 'N/A',
                'dividendos': 'N/A',
                'tipo' : 'taxa'
            }
        });

        Bitcoin().then(data => {
            all_data['btc'] = {
                'valor' : ['R$', data.mercadobitcoin.last, ''],
                'variacao' : data.mercadobitcoin.variation,
                'dividendos' : 'N/A',
                'tipo' : 'cripto'
            }
        });

        Stocks().then(data => {
            all_data['cac'] = {
                'valor' : ['Pontos: ', data.CAC.points, ''],
                'variacao' : data.CAC.variation,
                'dividendos' : 'N/A',
                'tipo' : 'bolsa'
            };
            all_data['dowjones'] = {
                'valor' : ['Pontos: ', data.DOWJONES.points, ''],
                'variacao' : data.DOWJONES.variation,
                'dividendos' : 'N/A',
                'tipo' : 'bolsa'
            };
            all_data['ibovespa'] = {
                'valor' : ['Pontos: ', data.IBOVESPA.points, ''],
                'variacao' : data.IBOVESPA.variation,
                'dividendos' : 'N/A',
                'tipo' : 'bolsa'
            };
            all_data['ifix'] = {
                'valor' : ['Pontos: ', data.IFIX.points, ''],
                'variacao' : data.IFIX.variation,
                'dividendos' : 'N/A',
                'tipo' : 'bolsa'
            };
            all_data['nasdaq'] = {
                'valor' : ['Pontos: ', data.NASDAQ.points, ''],
                'variacao' : data.NASDAQ.variation,
                'dividendos' : 'N/A',
                'tipo' : 'bolsa'
            };
            all_data['nikkei'] = {
                'valor' : ['Pontos: ', data.NIKKEI.points, ''],
                'variacao' : data.NIKKEI.variation,
                'dividendos' : 'N/A',
                'tipo' : 'bolsa'
            };
        });
    }

    const changeHandler = (event, func) => {
        func(event.target.value);
    }

    const RenderActive = (props) => {
        const name = props.name;
        const value = props.value;
        const variation = props.variation;
        const dividendos = props.dividendos;
        const type = props.type;

        return (
            <div className="active">
                <div className="active_main_info">
                    <h3>{name}</h3>
                    <div className="active_main_info_content">
                        <div>
                            <p>Dividendos</p>
                            <p>{dividendos}</p>
                        </div>
                        <div>
                            <p>Tipo</p>
                            <p>{type}</p>
                        </div>
                    </div>
                </div>
                <div className="active_values_info">
                    <h3>{value[0]}{Number.parseFloat(value[1]).toFixed(2)}{value[2]}</h3>
                    <p style={{color: (Number.parseFloat(variation) >= 0 ? '#00FF00' : variation==='N/A' ? '#696969' : '#FF0000')}}>{variation}{variation === 'N/A' ? '' : '%'}</p>
                </div>
            </div>
        );
    }

    const RenderActives = () => {
        return (
            <div className="actives" id="actives">
                {actives.map((item, index) => {
                    return (<RenderActive
                        key = {index}
                        name = {item} 
                        value = {all_data[item]['valor']} 
                        variation = {all_data[item]['variacao']}
                        dividendos = {all_data[item]['dividendos']}
                        type = {all_data[item]['tipo']}
                    />);
                })}
            </div>
        );
    }

    const getActives = (event) => {
        event.preventDefault();
        
        const resultList = [];

        Object.keys(all_data).map(item => {
            if (item.includes(searchValue.toLowerCase())) {
                resultList.push(item);
            }
        });

        if (resultList.length === 0) {
            Swal.fire({
                title: 'Pesquisa sem resultados!',
                icon: 'error'
            })
        }
        else {
            set_actives(resultList);
        }
    }

    return (
        <div className="investment_container">
            <h2>Investimentos</h2>
            <form onSubmit={(event) => { getActives(event); }} className="investment_form">
                <div className="search_div">
                    <input className="search_input" placeholder="Pesquisar" type="text" value={searchValue} onChange={event => {changeHandler(event, setsearchValue)}} />
                    <input className="search_submit" value="" type="submit"/>
                </div>
                <button className="search_filter"></button>
            </form>
                <RenderActives />
        </div>
    );
};

export default InvestmentsPage;
