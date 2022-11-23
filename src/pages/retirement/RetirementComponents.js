import React from "react";
import { useState } from 'react';
import "../../style/retirement/retirement.css";

const RetirementForm = () => {

    const [retireSalary, setretireSalary] = useState();
    const [currentAge, setcurrentAge] = useState();
    const [interestRate, setinterestRate] = useState();
    const [currentMoney, setcurrentMoney] = useState();
    const [retireAge, setretireAge] = useState();
    const [perMonth, setperMonth] = useState(1.0);
    const [perYear, setperYear] = useState(0.0);
    const [aport, setaport] = useState('N/A');
    const [amount, setamount] = useState('N/A');

    const CalculateRetirement = (event) => {
        event.preventDefault();

        var tipo_taxa, anos_acumulando, anos_aposentados, idade_atual, idade_inicio, idade_morte, meses_acumulando, meses_aposentados, pmt, qtd_dinheiros, salario, taxa, total_atual;
        salario = Number.parseFloat(retireSalary.replace(",", "."));
        total_atual = Number.parseFloat(currentMoney.replace(",", "."));
        idade_atual = Number.parseInt(currentAge);
        idade_inicio = Number.parseInt(retireAge.replace(",", "."));
        idade_morte = Number.parseInt('80'.replace(",", "."));
        taxa = Number.parseFloat(interestRate.replace(",", ".")) / 100.0;
        tipo_taxa = Boolean(perYear);
        total_atual = parseFloat(currentMoney.replace(",", "."));

        if (tipo_taxa) {
            taxa = Math.pow(1+taxa, 1.0/12.0) - 1;
        }
        
        anos_aposentados = idade_morte - idade_inicio;
        meses_aposentados = anos_aposentados * 12;
        anos_acumulando = idade_inicio - idade_atual;
        meses_acumulando = anos_acumulando * 12;
        qtd_dinheiros = 0.0;

        let valor_atual_futuramente = total_atual * Math.pow(1+taxa, meses_acumulando);

        for (var a = 0, limite = meses_aposentados; a < limite; a++) {
            qtd_dinheiros += salario;
            qtd_dinheiros /= 1 + taxa;
        }
        
        setamount(qtd_dinheiros.toFixed(2));
        pmt = (qtd_dinheiros - valor_atual_futuramente) * taxa;
        pmt /= Math.pow(1 + taxa, meses_acumulando) - 1;
        setaport(pmt.toFixed(2));
    }

    const changeHandler = (event, func) => {
        func(event.target.value);
    }

    const changeCheckBox = (event, func, func2) => {
        func(event.target.value);
        func2(!event.target.value);
    }

    return (
        <div className="retirement_container">
            <h2>aposentadoria</h2>
            <div className="retirement_content">
                <form
                    onSubmit={(event) => { CalculateRetirement(event); }}
                >
                    <div className="retirement_questions">
                        <div className="retirement_questions_div">
                            <label htmlFor="retireSalary">Salário de Aposentado</label>
                            <input tabindex="3" type="number" id="retireSalary" value={retireSalary} min="0.00" placeholder='R$0.000,00' step='.01' onChange={event => { changeHandler(event, setretireSalary)}} />
                            <label htmlFor="currentAge">Idade Atual</label>
                            <input tabindex="5" type="number" id="currentAge" value={currentAge} min="0" step='1' placeholder='0' onChange={event => { changeHandler(event, setcurrentAge)}} />
                            <label htmlFor="interestRate">Taxa de Juros %</label>
                            <input tabindex="7" type="number" id="interestRate" placeholder='0.0000%' value={interestRate} step='.0001' onChange={event => { changeHandler(event, setinterestRate)}} />
                        </div>
                        <div className="retirement_questions_div">
                            <label htmlFor="currentMoney">Total Atual para Aposentadoria</label>
                            <input tabindex="4" type="number" id="currentMoney" value={currentMoney} placeholder='R$0.000,00' min="0.00" onChange={event => { changeHandler(event, setcurrentMoney)}} />
                            <label htmlFor="retireAge">Idade para se Aposentar</label>
                            <input tabindex="6" type="number" id="retireAge" value={retireAge} min="0" placeholder='0' onChange={event => { changeHandler(event, setretireAge)}} />
                            <div className="retirement_checkboxes">
                                <div className="retirement_checkboxes_item">
                                    <label htmlFor="perMonth">Por Mês</label>
                                    <input tabindex="8" type="checkbox" id="perMonth" checked={perMonth} onChange={event => { changeCheckBox(event, setperMonth, setperYear)}} />
                                </div>
                                <div className="retirement_checkboxes_item">
                                    <label htmlFor="perYear">Por Ano</label>
                                    <input tabindex="9" type="checkbox" id="perYear" checked={perYear} onChange={event => { changeCheckBox(event, setperYear, setperMonth)}} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <input tabindex="10" type="submit" value="Calcular!" />
                </form>
                <div className="retirement_result">
                    <p>Você precisa juntar</p>
                    <p>R${aport}</p>
                    <p>todos os meses, para chegar aos</p>
                    <p>R${amount}</p>
                    <p>
                        com {retireAge} anos e poder se aposentar vivendo somente do seu
                        rendimento
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RetirementForm;
