import React from "react";
import $ from 'jquery';


import ConversionForm from "./ConversionComponents"

const  Conversion = () => {

  window.onresize = (event) => {
    let heightToSub = $('#footer').outerHeight() + $('#header').outerHeight();
    $('.component').css('min-height', 'calc(100vh - ' + heightToSub + ')');
  };

  window.onload =  (event) => {
    let heightToSub = $('#footer').outerHeight() + $('#header').outerHeight();
    $('.component').css('min-height', 'calc(100vh - ' + heightToSub.toFixed(0) + 'px)');
  }
  
  return (
    <section className="conversion components">
        <ConversionForm />
    </section>
  );
}

export default Conversion;