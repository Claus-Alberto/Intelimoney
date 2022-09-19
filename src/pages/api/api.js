const Currencies = async (currencie) => {
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
};

const Bitcoin = async () => {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    let response = await fetch("https://api.hgbrasil.com/finance/quotations?format=json-cors&key=f107716c&fields=bitcoin", {
        method: "GET",
        headers: headersList
    });

    let data = await response.text();
    var json = JSON.parse(data);
    var bitcoin = json.results.bitcoin;

    return bitcoin;
};

const Stocks = async () => {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    let response = await fetch("https://api.hgbrasil.com/finance/quotations?format=json-cors&key=f107716c&fields=stocks", {
        method: "GET",
        headers: headersList
    });

    let data = await response.text();
    var json = JSON.parse(data);
    var stocks = json.results.stocks;

    return stocks;
};

const Taxes = async () => {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    let response = await fetch("https://api.hgbrasil.com/finance/taxes?format=json-cors&key=f107716c", {
        method: "GET",
        headers: headersList
    });

    let data = await response.text();
    var json = JSON.parse(data);
    var taxes = json.results;

    return taxes;
};

export { Currencies, Bitcoin, Stocks, Taxes };