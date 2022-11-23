import React from "react";
import $ from 'jquery';
import "../../style/simulation/simulation.css";

import SimulationForm from "./SimulationComponents";

const Simulation = () => {

  window.onresize = () => {
    let heightToSub = $('#footer').outerHeight() + $('#header').outerHeight();
    $('.component').css('min-height', 'calc(100vh - ' + heightToSub + ')');
  };

  window.onload =  () => {
    let heightToSub = $('#footer').outerHeight() + $('#header').outerHeight();
    $('.component').css('min-height', 'calc(100vh - ' + heightToSub.toFixed(0) + 'px)');
  }

  return (
    <section className="simulation component">
      <SimulationForm />
    </section>
  );
}

export default Simulation;
