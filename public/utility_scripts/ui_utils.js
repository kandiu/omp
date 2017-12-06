
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

    let classNames = [];

    if ( userData && userData.assetclasses ) {

	let classesObj = userData.assetclasses.find(function(ac) {
            return ac.portfolio_id === portfolio_id;
        });

	classesObj.classes.forEach(function(cl) {
            classNames.push(cl.classname);
	});
    }
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

// Account
// userData, portfolio_id, brokerSymbol -> Object

function udAccount(userData, portfolio_id, brokerSymbol) {

    if (userData != undefined) {
        let accountsObj = userData.accounts.find(function(ac){
                            return  ac.portfolio_id === portfolio_id;
                          });

        return accountsObj.accounts.find(function(ac) { return ac.broker_symbol === brokerSymbol; });
    }
}


// Symbols
// userData, portfolio_id, assetClass -> [String]

function udSymbols(userData, portfolioId, assetClass) {

    let portfolio = udPortfolio(userData, portfolioId);
    if (portfolio != undefined && portfolio.settings != undefined) {
        let assets = portfolio.settings.selected_assets.filter(
                        (as) => as.asset_class === assetClass);

        let inst = [];

        assets.forEach(function(as) {

            if (as.instruments.length > 0)
                inst = inst.concat(as.instruments);
            if (as.underlyings.length > 0)
                inst = inst.concat(as.underlyings);
        });

        return inst;
    }
}


function udPortfolio(userData, portfolioId) {

    if ( userData ){

	    return userData.portfolios.find(function(pf) {
                return pf.symbol === portfolioId;
	    });
    }
    return [];
}



// Tickers
function getTickers(regObj, provider) {

   if (provider === undefined) {
       provider = 'own';
   }

   let ticker = "";

   if (regObj.tickers != null) {
       regObj.tickers.forEach(function (t) {

           if (t.provider == provider)
                ticker = t.symbol;
       });
   }

   return ticker;
}

function instToTicker(inst) {

    queryRegistry(inst, function(reg) {
        return getTickers(JSON.parse(reg));
    });
}

//////////////////////////////////
// AJAX

function login(uname, callback) {
    ajaxRequest("GET", "/login/" + uname, {}, {}, callback);
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
