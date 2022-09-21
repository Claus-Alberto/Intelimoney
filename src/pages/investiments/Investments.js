import React from "react";
import $ from 'jquery';

import InvestmentsPage from "./InvestmentsComponents";

const Investments = () => {

  window.onresize = () => {
    let heightToSub = $('#footer').outerHeight() + $('#header').outerHeight();
    $('.component').css('min-height', 'calc(100vh - ' + heightToSub + ')');
  };

  window.onload =  () => {
    let heightToSub = $('#footer').outerHeight() + $('#header').outerHeight();
    $('.component').css('min-height', 'calc(100vh - ' + heightToSub.toFixed(0) + 'px)');
    console.log('BATATA')
  }

  return (
    <section className="investment component">
        <InvestmentsPage />
    </section>
  );
}

export default Investments;