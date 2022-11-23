import React from "react";
import $ from 'jquery';

import RetirementForm from "./RetirementComponents";

const Retirement = () => {

  window.onresize = () => {
    let heightToSub = $('#footer').outerHeight() + $('#header').outerHeight();
    $('.component').css('min-height', 'calc(100vh - ' + heightToSub + ')');
  };

  window.onload =  () => {
    let heightToSub = $('#footer').outerHeight() + $('#header').outerHeight();
    $('.component').css('min-height', 'calc(100vh - ' + heightToSub.toFixed(0) + 'px)');
  }

  return (
    <section className="retirement component">
      <RetirementForm />
    </section>
  );
}

export default Retirement;
