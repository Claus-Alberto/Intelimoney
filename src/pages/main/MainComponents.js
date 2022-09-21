import React from "react";

import logomarca from "../../static/logomarca.svg";

import retirementImage from "../../static/retirement.svg";
import conversionImage from "../../static/conversion.svg";
import simulationImage from "../../static/simulation.svg";
import investsImage from "../../static/invests.svg";

import left from "../../static/left_arrow.svg";
import right from "../../static/right_arrow.svg";
import profile from "../../static/profile1.svg";

import everywhere from "../../static/everywhere.svg";

import "../../style/main/main.css";
import "../../style/main/servicos.css";
import "../../style/main/equipe.css";
import "../../style/main/slogan.css";

const Initial = () => {
  return (
    <section className="main">
      <div className="main_container">
        <img src={logomarca} alt="Intellimoney" />
        <p>
          Uma plataforma para gerenciar seu dinheiro de forma rápida, fácil e
          inteligente!
        </p>
        <a href="#servicos">Conheça nossos serviços</a>
      </div>
    </section>
  );
}

const Services = () => {
  return (
    <section className="servicos" id="servicos">
      <div className="servicos_container">
        <h2>Nossos Serviços</h2>
        <div className="servicos_container_item">
          <img src={retirementImage} alt="Aposentadoria" />
          <div className="servicos_container_item_text">
            <h3>Simulação de Aposentadoria</h3>
            <p>
              Com o nosso servço de simulação de aposentadoria, você pode se
              surpreender com o valor mensal que você precisa para conseguir uma
              boa aposentadoria no futuro, colocando seu dinheiro em algum
              investimento de sua confiança.
            </p>
          </div>
        </div>
        <div className="servicos_container_item">
          <div className="servicos_container_item_text">
            <h3>Conversão de moedas</h3>
            <p>
              Se você planeja utilizar uma moeda diferente da sua para planejar
              uma viagem, investir, ou apenas consultar, nossa plataforma te
              disponibiliza em tempo real a cotação das principais moedas do
              mercado, inclusive cripto!
            </p>
          </div>
          <img src={conversionImage} alt="Conversão de Moedas" />
        </div>
        <div className="servicos_container_item">
          <img src={simulationImage} alt="Simulação de Investimentos" />
          <div className="servicos_container_item_text">
            <h3>Simulação de Investimentos</h3>
            <p>
              Com nossos serviços de simulação de investimentos, você pode
              simular aplicações em fundos diversos, reais ou imaginários, além
              de ter a possibilidade de diversificar suas simulações, tendo a
              possibilidade de salvar suas simulações em sua conta.
            </p>
          </div>
        </div>
        <div className="servicos_container_item">
          <div className="servicos_container_item_text">
            <h3>Consulta de investimentos</h3>
            <p>
              Se você gostaria de consultar inúmeros investimentos disponíveis
              no mecado, agora você pode, utilizando nossos serviços de
              consultas de investimentos, é possível consultar ações, fundos de
              investimentos e fundos imobiliários!
            </p>
          </div>
          <img src={investsImage} alt="Consulta de Investimentos" />
        </div>
      </div>
    </section>
  );
}

const Team = () => {
  const currentMember = React.useState(1);
  const currentMemberValue = currentMember[0];
  const currentMemberFunction = currentMember[1];

  return (
    <section className="equipe">
      <div className="equipe_container">
        <h2>Nossa equipe</h2>
        <div className="equipe_container_carrossel">
          <button onClick={() => currentMemberFunction(currentMemberValue > 1 ? currentMemberValue - 1 : 4)}>
            <img src={left} alt="Anterior" />
          </button>
          <div className="equipe_container_carrossel_content" style={{ display: (currentMemberValue === 1 ? 'flex' : 'none') }}>
            <img src={profile} alt="Profile" />
            <div className="equipe_container_carrossel_content_text">
              <p className="equipe_container_carrossel_content_text_member">
                Claus Alberto Bienemann
              </p>
              <p className="equipe_container_carrossel_content_text_skill">
                Full-Stack Developer
              </p>
              <p className="equipe_container_carrossel_content_text_description">
                Desenvolvedor Full-Stack na empresa Intelithings, apaixonado
                por tecnologia e entusiasta no mundo da computação.
              </p>
            </div>
          </div>
          <div className="equipe_container_carrossel_content" style={{ display: (currentMemberValue === 2 ? 'flex' : 'none') }}>
            <img src={profile} alt="Profile" />
            <div className="equipe_container_carrossel_content_text">
              <p className="equipe_container_carrossel_content_text_member">
                Letícia Ramos
              </p>
              <p className="equipe_container_carrossel_content_text_skill">
                Data Base Analyst
              </p>
              <p className="equipe_container_carrossel_content_text_description">
                Responsável pela estruturação e manutenção do banco de dados, 
                garantia da usabilidade de todos os dados, visualização e eficiência
                das querys.
              </p>
            </div>
          </div>
          <div className="equipe_container_carrossel_content" style={{ display: (currentMemberValue === 3 ? 'flex' : 'none') }}>
            <img src={profile} alt="Profile" />
            <div className="equipe_container_carrossel_content_text">
              <p className="equipe_container_carrossel_content_text_member">
                Maria Luiza Machado
              </p>
              <p className="equipe_container_carrossel_content_text_skill">
                Full-Stack Developer
              </p>
              <p className="equipe_container_carrossel_content_text_description">
                Experiência em Java ,HTML e C#. Ênfase na parte de desenvlvimento Back-end com uso de arquitetura MVC.
              </p>
            </div>
          </div>
          <div className="equipe_container_carrossel_content" style={{ display: (currentMemberValue === 4 ? 'flex' : 'none') }}>
            <img src={profile} alt="Profile" />
            <div className="equipe_container_carrossel_content_text">
              <p className="equipe_container_carrossel_content_text_member">
                Guilherme Costa Santiago
              </p>
              <p className="equipe_container_carrossel_content_text_skill">
                SCRUM Master
              </p>
              <p className="equipe_container_carrossel_content_text_description">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
          <button onClick={() => currentMemberFunction(currentMemberValue < 4 ? currentMemberValue + 1 : 1)}>
            <img src={right} alt="Próximo" />
          </button>
        </div>
        <div className="equipe_container_carrossel_controller">
          <div className="equipe_container_carrossel_controller_item" style={{ backgroundColor: (currentMemberValue === 1 ? 'var(--white)' : '') }} onClick={() => currentMemberFunction(1)}></div>
          <div className="equipe_container_carrossel_controller_item" style={{ backgroundColor: (currentMemberValue === 2 ? 'var(--white)' : '') }} onClick={() => currentMemberFunction(2)}></div>
          <div className="equipe_container_carrossel_controller_item" style={{ backgroundColor: (currentMemberValue === 3 ? 'var(--white)' : '') }} onClick={() => currentMemberFunction(3)}></div>
          <div className="equipe_container_carrossel_controller_item" style={{ backgroundColor: (currentMemberValue === 4 ? 'var(--white)' : '') }} onClick={() => currentMemberFunction(4)}></div>
        </div>
      </div>
    </section>
  );
}

const Slogan = () => {
  return (
    <section className="slogan">
      <div className="slogan_container">
        <h2>Tudo em um só lugar</h2>
        <div className="slogan_container_content">
          <img src={everywhere} alt="Em qualquer lugar" />
          <p>
            Tudo para um controle financeiro eficiente e simples dentro de uma
            mesma plataforma com o objetivo de ajudar você a cuidar do seu
            dinheiro e gerencia-lo da melhor maneira possível!
          </p>
        </div>
      </div>
    </section>
  );
}

export { Initial, Services, Team, Slogan };
