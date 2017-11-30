
//////////////////////////////////
// TOP BAR

// Portfolio ids
// userData -> [String] 

function udPortfolioIds(userData) {

    return userData.user.portfolios;
}


// Asset classes
// userData, portfolio_id -> [String]

function udAssetClasses(userData, portfolio_id) {

    let classesObj = userData.assetClasses.find(function(ac){ 
                        return  ac.portfolio_id === portfolio_id; 
                     });

    return classesObj.assetclasses;
}


// Brokers
// userData, portfolio_id -> [String]

function udBrokers(userData, portfolio_id) {

    let brokersObj = userData.brokers.find(function(br){ 
                        return  br.portfolio_id === portfolio_id; 
                      });

    return brokersObj.brokers;
}


//////////////////////////////////
// BUILDER FRAME

// Symbols
// userData, portfolio_id, assetClass -> [String]

function udSymbols(userData, portfolioId, assetClass) {

    let portfolio = udPortfolio(userData, portfolioId);

    if (typeof portfolio.settings !== "undefined") {

        let assets = portfolio.settings.selected_assets.filter(
                        (as) => as.asset_class === assetClass);


        let inst = [];
        
        assets.forEach(function(as) {
            inst = inst.concat(as.instruments);
        });

        return inst;
    }
}


// Exchange
// registry object -> String  //// get the registry object using queryRegistry(symbol, callback)
function getExchange(regObj) {
    return regObj.exchange_id;
}

// Currency
function getCurrency(regObj) {
    return regObj.currency;
}



//////////////////////////////////
// GENERAL

function udPortfolio(userData, portfolioId) {

    return userData.portfolios.find(function(pf) { 
            return pf.portfolio_id === portfolioId; 
    });
}

function queryRegistry(symbol, callback) {
    ajaxRequest("GET", "/registry/" + symbol, {}, {}, callback);
}

function ajaxRequest(method, url, headers, data, callback) {

    const r = new XMLHttpRequest();
    r.open(method, url, true);

    for (let h in headers)
        r.setRequestHeader(h, headers[h]);


    r.onreadystatechange = function() {

        if (r.readyState == 4) {

            if (r.status == 404)  {
                callback("404");
            }

            else
                callback(r.responseText);
        }
    } 

    if (method === "POST" || method === "PUT")
        r.send(data);
    else
        r.send(null);   
}





