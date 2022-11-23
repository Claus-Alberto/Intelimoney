import { useState } from 'react';
import "../../style/conversion/conversion.css";
import { UserData } from './DataConversion';
import BarChart from '../../components/BarChart';


const ConversionForm = () => {

        const [initialValue, setinitialValue] = useState('1.00');
        const [convertedValue, setconvertedValue] = useState('1.00');
        const [baseCoin, setbaseCoin] = useState('BRL');
        const [destinyCoin, setdestinyCoin] = useState('BRL');
        const [userData, setUserData] = useState({
            
            labels: UserData.map((data) => data.mes),
            datasets: [
              {
                label: "Gráfico meramente ilustrativo",
                data: UserData.map((data) => data.capital),
                backgroundColor: "#FFF",
                borderRadius: 9,
                barPercentage: 0.5,
                borderWidth: 1,
                display: false,    
              },
            ],
          });
    
        async function getCoin(currencie){
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            }
        
            let response = await fetch("https://api.hgbrasil.com/finance/quotations?format=json-cors&key=615303ae&fields=" + currencie, {
                method: "GET",
                headers: headersList
            });
        
            let data = await response.text();
            var json = JSON.parse(data);
            var moeda = json.results.currencies;
            return moeda;
            
        };
        
        const conversionCalculate = (event) => {
            event.preventDefault();

            var tipoMoedaBase, tipoMoedaSecundaria, valorMoedaBase, valorInversoMoedaSecundaria, valorInicial,
             moedaBase, moedaSecundaria, resultado;

            tipoMoedaBase = baseCoin;
            tipoMoedaSecundaria = destinyCoin;
            valorInicial = Number.parseFloat(initialValue.replace(",","."));
    
            
            getCoin(tipoMoedaBase).then(data => {
                if (tipoMoedaBase === 'BRL'){
                    moedaBase = parseFloat(1);
                }
                else{
                    moedaBase = parseFloat(data.buy);
                }
                getCoin(tipoMoedaSecundaria).then(teste => {
                    if (tipoMoedaSecundaria === 'BRL'){
                        moedaSecundaria = parseFloat(1);
                    }
                    else{
                        moedaSecundaria = parseFloat(teste.buy); 
                    }
                    valorMoedaBase = Number.parseFloat(Number.parseFloat(moedaBase));
                    valorInversoMoedaSecundaria = 1 / (Number.parseFloat(moedaSecundaria));
                    let valorConvertidoBase = valorMoedaBase * valorInversoMoedaSecundaria;
                    resultado = valorConvertidoBase * valorInicial;
                    setconvertedValue(Number.parseFloat(resultado).toFixed(2));
                })
            })
    
        }
        const changeHandler = (event, func) => {
            func(event.target.value);
        }

        return (
            <div className="conversion_container">
                <h2>Conversão de Moedas</h2>
                <div className="conversion_content">
                    <form onSubmit={(event) => { conversionCalculate(event); }}>
                        <div className="conversion_questions">
                            <div className="conversion_questions_div">
                                <label htmlFor="baseCoin">Moeda de base</label>
                                <select className="conversion_custom_select" id="baseCoin" value={baseCoin} onChange={event => { changeHandler(event, setbaseCoin)}}>
                                    <option value='BRL'>BRL</option>
                                    <option value='USD'>USD</option>
                                    <option value='EUR'>EUR</option>
                                    <option value='GBP'>GBP</option>
                                    <option value='ARS'>ARS</option>
                                    <option value='CAD'>CAD</option>
                                    <option value='AUD'>AUD</option>
                                    <option value='JPY'>JPY</option>
                                    <option value='CNY'>CNY</option>
                                    <option value='BTC'>BTC</option>
                                </select>
                                
                                <input type="number" step='0.01' id="initialValue" value={initialValue} min="0.01" onChange={event => { changeHandler(event, setinitialValue)}} />
                            </div>
                            <div className="conversion_questions_div">
                                <label htmlFor="destinyCoin">Moeda de destino</label>
                                <select className="conversion_custom_select" id="destinyCoin" value={destinyCoin} onChange={event => { changeHandler(event, setdestinyCoin)}}>
                                    <option value='BRL'>BRL</option>
                                    <option value='USD'>USD</option>
                                    <option value='EUR'>EUR</option>
                                    <option value='GBP'>GBP</option>
                                    <option value='ARS'>ARS</option>
                                    <option value='CAD'>CAD</option>
                                    <option value='AUD'>AUD</option>
                                    <option value='JPY'>JPY</option>
                                    <option value='CNY'>CNY</option>
                                    <option value='BTC'>BTC</option>
                                </select>
                                <input type="number" id="convertedValue" step="0.01" value={convertedValue} min="0.00" readOnly="readOnly" onChange={event => { changeHandler(event, setconvertedValue)}} />
                            </div>
                        </div>
                        <input type="submit" value="Converter!" />
                    </form>
                    <div style={{ width: 600 }} className='conversion_result'>
                         <BarChart chartData={userData} />
                    </div>
                </div>
            </div>
    );
};

export default ConversionForm;