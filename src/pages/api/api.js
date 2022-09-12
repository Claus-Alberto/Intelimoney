import React from "react";

async function getCurrencie(currencie) {

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    let response = await fetch("https://api.hgbrasil.com/finance/quotations?format=json-cors&key=f107716c&fields=" + currencie, {
        method: "GET",
        headers: headersList
    });

    let data = await response.text();
    var json = JSON.parse(data);
    var moeda = json.results.currencies;
    
    return moeda;
}
