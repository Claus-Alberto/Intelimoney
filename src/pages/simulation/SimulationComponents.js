import React from "react";
import { useState } from 'react';

const SimulationForm = () => {

    const [refresh_condition, set_refresh_condition] = useState(1);

    const [final_total_value, set_final_total_value] = useState('--,--');

    const [final_aplied_value, set_final_aplied_value] = useState('--,--');

    const [final_wins_value, set_final_wins_value] = useState('--,--');

    const [simulations, set_simulations] = useState([
        {
            'chave' : 0,
            'initial_contribution' : 0.0,
            'interest_rate' : 0.0001,
            'dividends' : 'off', 
            'applied_time' : 0,
            'existing_active' : '',
            'monthly_contribution' : 0.0,
            'per_month' : true,
            'per_year' : false,
            'CDI' : false,
            'dividends_value' : 0.0,
            'applied_time_in_months' : true,
            'applied_time_in_years' : false
        }
    ]);

    // const changeCheckBox = (event, func, func2) => {
    //     func(event.target.value);
    //     func2(!event.target.value);
    // }

    const RenderSimulation = (props) => {
        
        const [refresh_condition2, set_refresh_condition2] = useState(1);

        const changeHandler = (event, index, field, mayBeZeroOrNull = true) => {
            let temp_simulation = simulations;
            if (!mayBeZeroOrNull && (event.target.value == 0 || event.target.value === '')) {}
            else{
                temp_simulation[index][field] = event.target.value;
            }
            set_simulations(temp_simulation);
            set_refresh_condition2(refresh_condition2 + 1)
        }
        const changeHandlerCBSingle = (event, index, field, fields=[]) => {
            let temp_simulation = simulations;
            temp_simulation[index][field] = event.target.checked;
            fields.forEach(element => {
                temp_simulation[index][element] = !event.target.checked;
            });
            set_simulations(temp_simulation);
            set_refresh_condition2(refresh_condition2 + 1)
        }

        const changeHandlerCB = (event, index, field, fields=[]) => {
            let temp_simulation = simulations;
            if (fields !== []) {
                if (event.target.checked) {
                    temp_simulation[index][field] = event.target.checked;
                    fields.forEach(element => {
                        temp_simulation[index][element] = !event.target.checked;
                    });
                }
            } else {
                temp_simulation[index][field] = event.target.checked;
                fields.forEach(element => {
                    temp_simulation[index][element] = !event.target.checked;
                });
            }

            set_simulations(temp_simulation);
            set_refresh_condition2(refresh_condition2 + 1)
        }

        return (
            <div className="little_simulation">
                <div className="little_simulation_fields1">
                    <label htmlFor="initial_contribution">Aporte Inicial</label>
                    <input 
                        onChange={
                            event => {
                                changeHandler(event, props.chave, 'initial_contribution');
                            }
                        }
                        tabIndex="3" 
                        type="number" 
                        id="initial_contribution" 
                        value={simulations[props.chave].initial_contribution} 
                        min="0.00" 
                        placeholder='R$0.000,00' 
                        step='.01'
                    />
                    <label htmlFor="interest_rate">Taxa de juros %</label>
                    <input 
                        onChange={
                            event => {
                                changeHandler(event, props.chave, 'interest_rate', false);
                            }
                        } 
                        tabIndex="3" 
                        type="number" 
                        id="interest_rate" 
                        value={simulations[props.chave].interest_rate} 
                        min="0.0001" 
                        placeholder='0,0000%' 
                        step='.001'
                    />
                    <div className="dividends simulation_checkboxes">
                        <label htmlFor="dividends">Paga dividendos?</label>
                        <input 
                            tabIndex="8" 
                            type="checkbox" 
                            id="dividends" 
                            checked={simulations[props.chave].dividends} 
                            onChange={
                                event => {
                                    changeHandlerCBSingle(event, props.chave, 'dividends');
                                }
                            } 
                        />
                    </div>
                    <label htmlFor="applied_time">Tempo aplicado</label>
                    <input 
                        onChange={
                            event => {
                                changeHandler(event, props.chave, 'applied_time');
                            }
                        } 
                        tabIndex="3" 
                        type="number" 
                        id="applied_time" 
                        value={simulations[props.chave].applied_time} 
                        min="0" 
                        placeholder='0' 
                        step='1'
                    />
                    <label htmlFor="existing_active">Pesquisar ativo existente</label>
                    <input 
                        onChange={
                            event => {
                                changeHandler(event, props.chave, 'existing_active');
                            }
                        } 
                        tabIndex="3" 
                        type="text" 
                        id="existing_active" 
                        value={simulations[props.chave].existing_active} 
                        placeholder='Nome do ativo'
                    />
                </div>
                <div className="little_simulation_fields2">
                    <label htmlFor="monthly_contribution">Aporte mensal</label>
                    <input 
                        onChange={
                            event => {
                                changeHandler(event, props.chave, 'monthly_contribution');
                            }
                        } 
                        tabIndex="3" 
                        type="number" 
                        id="monthly_contribution" 
                        value={simulations[props.chave].monthly_contribution} 
                        min="0.00" 
                        placeholder='R$0.000,00' 
                        step='.01'
                    />
                    <div className="timeUnitTax simulation_checkboxes">
                        <div className="simulation_checkboxes_item">
                            <label htmlFor="per_month">Ao Mês</label>
                            <input 
                                tabIndex="8" 
                                type="checkbox" 
                                id="per_month" 
                                checked={simulations[props.chave].per_month} 
                                onChange={
                                    event => {
                                        changeHandlerCB(event, props.chave, 'per_month', ['per_year', 'CDI']);
                                    }
                                } 
                            />
                        </div>
                        <div className="simulation_checkboxes_item">
                            <label htmlFor="per_year">Ao Ano</label>
                            <input 
                                tabIndex="8" 
                                type="checkbox" 
                                id="per_year" 
                                checked={simulations[props.chave].per_year} 
                                onChange={
                                    event => {
                                        changeHandlerCB(event, props.chave, 'per_year', ['per_month', 'CDI']);
                                    }
                                } 
                            />
                        </div>
                        <div className="simulation_checkboxes_item">
                            <label htmlFor="CDI">CDI</label>
                            <input 
                                tabIndex="8" 
                                type="checkbox" 
                                id="CDI" 
                                checked={simulations[props.chave].CDI} 
                                onChange={
                                    event => {
                                        changeHandlerCB(event, props.chave, 'CDI', ['per_year', 'per_month']);
                                    }
                                } 
                            />
                        </div>
                    </div>
                    <label htmlFor="dividends_value">Dividendos %</label>
                    <input 
                        disabled={simulations[props.chave].dividends_value}
                        onChange={
                            event => {
                                changeHandler(event, props.chave, 'dividends_value');
                            }
                        } 
                        tabIndex="3" 
                        type="number" 
                        id="dividends_value" 
                        value={simulations[props.chave].dividends_value} 
                        min="0.00" 
                        placeholder='0,00%' 
                        step='.01'
                    />
                    <div className="aplied_time simulation_checkboxes">
                        <div className="simulation_checkboxes_item">
                            <label htmlFor="applied_time_in_months">Meses</label>
                            <input 
                                tabIndex="8" 
                                type="checkbox" 
                                id="applied_time_in_months" 
                                checked={simulations[props.chave].applied_time_in_months} 
                                onChange={
                                    event => {
                                        changeHandlerCB(event, props.chave, 'applied_time_in_months', ['applied_time_in_years']);
                                    }
                                } 
                            />
                        </div>
                        <div className="simulation_checkboxes_item">
                            <label htmlFor="applied_time_in_years">Anos</label>
                            <input 
                                tabIndex="8" 
                                type="checkbox" 
                                id="applied_time_in_years" 
                                checked={simulations[props.chave].applied_time_in_years} 
                                onChange={
                                    event => {
                                        changeHandlerCB(event, props.chave, 'applied_time_in_years', ['applied_time_in_months']);
                                    }
                                } 
                            />
                        </div>
                    </div>
                    <button
                        id="search_active"
                        className="search"
                    >Pesquisar</button>
                </div>
            </div>
        );
    }

    const RenderSimulations = () => {
        return (
            <div className="all_simulations" id="simulations">
                {simulations.map((item, index) => {
                    return (<RenderSimulation
                        key = {index}
                        chave = {parseInt(item.chave)}
                        initial_contribution = {parseFloat(item.initial_contribution)}
                    />);
                })}
            </div>
        );
    }

    const addNewSimulation = () => {

        let temp_simulation = simulations;

        temp_simulation.push(
            {
                'chave' : simulations.length,
                'initial_contribution' : 0.0,
                'interest_rate' : 0.0001,
                'dividends' : false, 
                'applied_time' : 0,
                'existing_active' : '',
                'monthly_contribution' : 0.0,
                'per_month' : true,
                'per_year' : false,
                'CDI' : false,
                'applied_time_in_months' : true,
                'applied_time_in_years' : false
            }
        );

        set_refresh_condition(refresh_condition + 1)
        set_simulations(temp_simulation);
    }

    const simulateAction = async () => {
        let response = await fetch('http://localhost:5000/calculate_simulations', {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(simulations)
        })
        let data = await response.text();
        var json = JSON.parse(data);

        set_final_wins_value(json.total_gains)
        set_final_total_value(json.total_value)
        set_final_aplied_value(json.total_invested)
    }

    return (
        <div className="simulation_container">
            <h2>simulação</h2>
            <form onSubmit={(event) => {event.preventDefault()}} className = "simulation_form">
                <RenderSimulations/>
                <button className="addButton" onClick={addNewSimulation}>+</button>
                <input onClick={simulateAction} className="simulateButton" value="simular" type="submit"/>
            </form>
            <h2>resultados</h2>
            <div className="simulation_results">
                <div>
                    <h3>O valor em rendimentos será de</h3>
                    <p>R${final_wins_value}</p>
                </div>
                <div>
                    <h3>Seu saldo final após a aplicação será de</h3>
                    <p>R${final_total_value}</p> 
                </div>
                <div>
                    <h3>O valor aplicado será de</h3>
                    <p>R${final_aplied_value}</p>
                </div>
            </div>
        </div>
    );
};

export default SimulationForm;
