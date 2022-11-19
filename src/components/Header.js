import React from "react";

import logomarca from "../static/logomarca.svg";
import "../style/main/header.css";

const Header = () => {
  return (
    <header id="header">
      <div className="header_container">
        <a href="retirement">Aposentadoria</a>
        <a href="conversion">Conversões</a>
        <a className="header_container_logo" href="/">
          <img src={logomarca} alt="Intellimoney" />
        </a>
        <a href="simulation">Simulações</a>
        <a href="investment">Investimentos</a>
      </div>
    </header>
  );
}

export default Header;
