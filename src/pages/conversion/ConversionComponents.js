
import { useState } from 'react';
import "../../style/conversion/conversion.css";
import { UserData } from './DataConversion';
import BarChart from '../../components/BarChart';


const ConversionForm = () => {

        const [initialValue, setinitialValue] = useState(0.0);
        const [convertedValue, setconvertedValue] = useState(0.0);
        const [baseCoin, setbaseCoin] = useState('-');
        const [destinyCoin, setdestinyCoin] = useState(0.0);
        const [moeda , setMoeda] = useState([]);
        const [userData, setUserData] = useState({
            labels: UserData.map((data) => data.meses),
            datasets: [
              {
                label: "Gráfico meramente ilustrativo",
                data: UserData.map((data) => data.capital),
                backgroundColor: "#FFF",
                borderColor: "black",
                borderWidth: 1,
                display: false,
                tickWidth: 3
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

            /*var tipoMoedaBase, tipoMoedaSecundaria, valorMoedaBase, valorInversoMoedaSecundaria, valorInicial,
             moedaBase, moedaSecundaria, resultado;

            tipoMoedaBase = baseCoin;
            tipoMoedaSecundaria = destinyCoin;
            valorInicial = Number.parseFloat(initialValue.replace(",","."));
    
            
            getCoin(tipoMoedaBase).then(data => {
                moedaBase = parseFloat(data.buy) // está iniciando vazio , só preenche qnd faço 2 chamadas
                console.log(moedaBase)
            })
                console.log(moedaBase)
    
            getCoin(tipoMoedaSecundaria).then(data => {
                moedaSecundaria = parseFloat(data.buy) // está iniciando vazio , só preenche qnd faço 2 chamadas
                console.log(moedaSecundaria)
            })
                console.log(moedaSecundaria)
            
            valorMoedaBase = Number.parseFloat(Number.parseFloat(moedaBase));
            valorInversoMoedaSecundaria = 1 / (Number.parseFloat(moedaSecundaria));
            
            let valorConvertidoBase = valorMoedaBase * valorInversoMoedaSecundaria;
            resultado = valorConvertidoBase * valorInicial;

            setconvertedValue(resultado.toFixed(4));*/
    
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
                                
                                <input type="number" id="initialValue" value={initialValue} min="0.00" onChange={event => { changeHandler(event, setinitialValue)}} />
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
                                <input type="number" id="convertedValue" value={convertedValue} min="0.00" readonly="readonly" onChange={event => { changeHandler(event, setconvertedValue)}} />
                            </div>
                        </div>
                        <input type="submit" value="Converter!" />
                    </form>
                    <div style={{ width: 600 }}>
                         <BarChart chartData={userData} />
                    </div>
                </div>
            </div>
    );

            
        
};

export default ConversionForm;
    