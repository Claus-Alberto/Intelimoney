import React from "react";
import { useState } from 'react';
import "../../style/investment/investments_page.css";
import Swal from 'sweetalert2';

let all_data = {}

const InvestmentsPage = (props) => {

    const [actives, set_actives] = useState([]);
    const [searchValue, setsearchValue] = useState('');

    const changeHandler = (event, func) => {
        func(event.target.value);
    }

    const RenderActive = (props) => {
        const name = props.name;
        const value = props.value;
        const variation = props.variation;
        const capital = props.capital;
        const type = props.type;

        return (
            <div className="active">
                <div className="active_main_info">
                    <h3>{name}</h3>
                    <div className="active_main_info_content">
                        <div>
                            <p>Capital (milhões)</p>
                            <p>R${capital}</p>
                        </div>
                        <div>
                            <p>Tipo</p>
                            <p>{type}</p>
                        </div>
                    </div>
                </div>
                <div className="active_values_info">
                    <h3>R${Number.parseFloat(value).toFixed(2)}</h3>
                    <p style={{color: (Number.parseFloat(variation) >= 0 ? '#00FF00' : variation==='N/A' ? '#696969' : '#FF0000')}}>{variation}{variation === 'N/A' ? '' : '%'}</p>
                </div>
            </div>
        );
    }

    const RenderActives = () => {
        return (
            <div className="actives" id="actives">
                {actives.map((item, index) => {
                    console.log(item)
                    console.log(index)
                    console.log(all_data[item])
                    return (<RenderActive
                        key = {index}
                        name = {item} 
                        value = {all_data[item]['price']} 
                        variation = {all_data[item]['change_percent']}
                        capital = {all_data[item]['market_cap']}
                        type = {all_data[item]['kind']}
                    />);
                })}
            </div>
        );
    }

    const getActivesAsync = async (index) => {
        let response = await fetch('http://localhost:5000/get_actives', {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify({
                'active' : searchValue
            })
        })
        let data = await response.text();
        var json = JSON.parse(data);

        const resultList = [];

        try {
            Object.keys(JSON.parse(json)).map(item => {
                resultList.push(item);
            });
    
    
            if (resultList.length === 0) {
                Swal.fire({
                    title: 'Pesquisa sem resultados!',
                    icon: 'error'
                })
            }
            else {
                all_data = JSON.parse(json);
                set_actives(resultList);
            }
        } catch (error) {
            Swal.fire({
                title: 'Pesquisa sem resultados!',
                icon: 'error'
            })
        }

    }

    const getActives = (event) => {
        event.preventDefault();
    }

    return (
        <div className="investment_container">
            <h2>Investimentos</h2>
            <form onSubmit={(event) => { getActives(event); }} className="investment_form">
                <div className="search_div">
                    <input className="search_input" placeholder="Pesquisar" type="text" value={searchValue} onChange={event => {changeHandler(event, setsearchValue)}} />
                    <input onClick={() => getActivesAsync()} className="search_submit" value="" type="submit"/>
                </div>
                <button className="search_filter"></button>
            </form>
                <RenderActives />
        </div>
    );
};

export default InvestmentsPage;
