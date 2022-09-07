import React from "react";

import logomarca from "../static/logomarca.svg";
import "../style/main/header.css";

const Header = () => {
  return (
    <header>
      <div className="header_container">
        <a href="">Aposentadoria</a>
        <a href="">Conversões</a>
        <a className="header_container_logo" href="/">
          <img src={logomarca} alt="Intelimoney" />
        </a>
        <a href="">Simulações</a>
        <a href="">Investimentos</a>
      </div>
    </header>
  );
}

export default Header;
