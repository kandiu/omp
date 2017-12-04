
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

    let classesObj = userData.assetclasses.find(function(ac) {
                        return ac.portfolio_id === portfolio_id;
                    });

    let classNames = [];

    classesObj.classes.forEach(function(cl) {
        classNames.push(cl.classname);
    });

    return classNames;
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

    if (portfolio != undefined && portfolio.settings != undefined) {

        let assets = portfolio.settings.selected_assets.filter(
                        (as) => as.asset_class === assetClass);

        let inst = [];
        
        assets.forEach(function(as) {
            inst = inst.concat(as.instruments);
        });

        return inst;
    }
}


function getAsset(userData, symbol) {

    userData.assets.forEach(function(as) {
        as.assets.forEach(function(ast) {
            if (ast.instrument_id === symbol)
                return ast;
        }
    });
}


// Tickers
function getTickers(userData, instrument_id) {

    let asset = getAsset(userData, instrument_id);
    return asset.tickers;
}

// Currency
function getCurrency(userData, instrument_id) {

    let asset = getAsset(userData, instrument_id);
    return asset.currency;
}



//////////////////////////////////
// GENERAL

function udPortfolio(userData, portfolioId) {

    if ( userData ){

	    return userData.portfolios.find(function(pf) { 
                return pf.symbol === portfolioId; 
	    });
    }
    return [];
}


/*
function findEquity(symbol, callback) {
    ajaxRequest("GET", "/equities/" + symbol, {}, {}, callback);
}

function findIndex(symbol, callback) {
    ajaxRequest("GET", "/indeces/" + symbol, {}, {}, callback);
}

function findFuture(symbol, callback) {
    ajaxRequest("GET", "/futures/" + symbol, {}, {}, callback);
}

function findOption(symbol, callback) {
    ajaxRequest("GET", "/options/" + symbol, {}, {}, callback);
}
*/

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






