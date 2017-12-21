'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// var User = mongoose.model('User');
// var Portfolio = mongoose.model('Portfolio');
// var Account = mongoose.model('Account');
// var Broker = mongoose.model('Broker');
// var Registry = mongoose.model('Registry');
// var AssetClass = mongoose.model('AssetClass');
// var Future = mongoose.model('Future');
var ObjectId = mongoose.Types.ObjectId;

var users = {
  name : 'User',
  data : [
    {
      "name" : 'igor',
      "description" : 'Igor Rebesco',
      "portfolios" : ['stks-1','futs-1']
    },

    {
      "name" : 'uma',
      "description" : '',
      "portfolios" : ['multy-1']
    },

    {
      "name" : 'marcel',
      "description" : '',
      "portfolios" : ['futs-2']
    },

    {
      "name" : 'robert',
      "description" : '',
      "portfolios" : ['opts-1']
    },
    {
      "name" : 'eljon',
      "description" : '',
      "portfolios" : ['stks-2', 'stks-3']
    },
  ]
};

var assetclasses = { 
  name : 'AssetClass',
  data : [
    {
      "classname" : "Equity",
      "symbol" : "STK",
      "tradable" : "true",
    },
    {
      "classname" : "Future",
      "symbol" : "FUT",
      "derivative" : "true",
      "tradable" : "true",
    },
    {
      "classname" : "Option",
      "symbol" : "OPT",
      "derivative" : "true",
      "tradable" : "true",
    },
    {
      "classname" : "Index",
      "symbol" : "IDX",
      "tradable" : "false",
    },
  ]
};

var portfolios = {
  name : 'Portfolio',
  data : [
    {
      "symbol" : 'stks-1',
      "accounts" : ['fix','gs1','ms1','ms10'],
      "currency" : "EUR",
      "settings" :
      {
        "selected_assets" : [{
          "asset_class" : "Equity",
          "instruments" : ['stkc1','stkc2','stkc3','stkc4']
        }]
      }
    },

    {
      "symbol" : 'futs-1',
      "accounts" : ['ib1','gs2', 'jpm1', 'ms2'],
      "currency" : "EUR",
      "settings" :
      {
        "selected_assets" : [{
          "asset_class" : "Future",
          "underlyings" : ['idx1','idx2','idx3','idx4']
        }]
      }
    },

    {
      "symbol" : 'multy-1',
      "accounts" : ['ib2'],
      "currency" : "EUR",
      "settings" :
      {
        "selected_assets" : [
          {
            "asset_class" : "Equity",
            "instruments" : ['stkc1','stkc2','stkc3']
          },
          {
            "asset_class" : "Future",
            "instruments" : ['fut1','fut2','fut3','fut4']
          }
        ]
      }
    },

    {
      "symbol" : 'stks-2',
      "accounts" : ['ms3','jpm2'],
      "currency" : "USD",
      "settings" :
      {
        "selected_assets" : [{
          "asset_class" : "Equity",
          "instruments" : ['stkc1','stkc2','stkc3']
        }]
      }
    },

    {
      "symbol" : 'stks-3',
      "accounts" : ['ms3','jpm2'],
      "currency" : "USD",
      "settings" :
      {
        "selected_assets" : [{
          "asset_class" : "Equity",
          "instruments" : ['stkc1','stkc4']
        }]
      }
    },

    {
      "symbol" : 'futs-2',
      "accounts" : ['gs3', 'ib3'],
      "currency" : "EUR",
      "settings" :
      {
        "selected_assets" : [
          {
            "asset_class" : "Future",
            "instruments" : ['idx3','idx4']
          }
        ]
      }
    },

    {
      "symbol" : 'opts-1',
      "accounts" : ['gs3', 'ib3'],
      "currency" : "EUR",
      "settings" :
      {
        "selected_assets" : [
          {
            "asset_class" : "Option",
            "underlyings" : ['idx3','idx4']
          }
        ]
      }
    },
  ]
};

var brokers = {
  name : 'Broker',
  data : [
    {
      "symbol" : "FIXIMULATOR"
    },
    {
      "symbol" : "GS"
    },
    {
      "symbol" : "IB"
    },
    {
      "symbol" : "MS"
    },
    {
      "symbol" : "JPM"
    },
    {
      "symbol" : "CS"
    },
    {
      "symbol" : "UBS"
    }
  ]
};

var exchanges = {
  name : 'Exchange',
  data : [
    {
      "symbol" : "IBIS",
      "name" : "xxxxxxxxxx"
    },
    {
      "symbol" : "SBF",
      "name" : "xxxxxxxxxx"
    },
    {
      "symbol" : "NYSE",
      "name" : "New York Stock Exchange"
    },
    {
      "symbol" : "NASDAQ",
      "name" : "Nasdaq"
    },
    {
      "symbol" : "BVME",
      "name" : "Borsa Valore Mercato Elettronico"
    },
    {
      "symbol" : "CME",
      "name" : "Chicago Mercatile Exchange"
    },
    {
      "symbol" : "DTE",
      "name" : "Deutsche Boerse"
    },
    {
      "symbol" : "ECBOT",
      "name" : "Electronic Chicago Board of Trade"
    },
  ]
};

var accounts = {
  name : 'Account',
  data : [
    {
      "account_id" : "fix",
      "broker_symbol" : "FIXIMULATOR",
      "bank" : "GS",
      "currency" : "EUR",
    },
    {
      "account_id" : "gs1",
      "broker_symbol" : "GS",
      "bank" : "GS",
      "currency" : "EUR",
    },
    {
      "account_id" : "gs2",
      "broker_symbol" : "GS",
      "bank" : "GS",
      "currency" : "EUR",
    },
    {
      "account_id" : "gs3",
      "broker_symbol" : "GS",
      "bank" : "GS",
      "currency" : "EUR",
    },
    {
      "account_id" : "ms1",
      "broker_symbol" : "MS",
      "bank" : "MS",
      "currency" : "EUR",
    },
    {
      "account_id" : "ms2",
      "broker_symbol" : "MS",
      "bank" : "MS",
      "currency" : "EUR",
    },
    {
      "account_id" : "ms3",
      "broker_symbol" : "MS",
      "bank" : "MS",
      "currency" : "EUR",
    },
    {
      "account_id" : "ms10",
      "broker_symbol" : "MS",
      "bank" : "MS",
      "currency" : "EUR",
    },
    {
      "account_id" : "jpm1",
      "broker_symbol" : "JPM",
      "bank" : "JPM",
      "currency" : "EUR",
    },
    {
      "account_id" : "jpm2",
      "broker_symbol" : "JPM",
      "bank" : "JPM",
      "currency" : "EUR",
    },
    {
      "account_id" : "ib1",
      "broker_symbol" : "IB",
      "bank" : "HSBC",
      "currency" : "EUR",
    },
    {
      "account_id" : "ib2",
      "broker_symbol" : "IB",
      "bank" : "HSBC",
      "currency" : "EUR",
    },
    {
      "account_id" : "ib3",
      "broker_symbol" : "IB",
      "bank" : "HSBC",
      "currency" : "EUR",
    },
  ]
};

var equities = {
  name : 'Equity',
  data : [
    {
      "instrument_id" : "stkc1",
      "exchange_id" : "IBIS",
      "tickers" : [
              {"provider" : "own", "symbol" : "BMW"}, 
              {"provider" : "Bloomberg", "symbol" : "DMW Index"},
            ],
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
          "isin" : "DE0005190003",
          "right" : "common",
          "description" : "Bayerische Motoren Werke AG",
          "country" : "DE",
          "industry" : "Auto Manufactures",
          "supersector" : "Auto Cars/Light Trucks",
          "sector" : "Consumer, Cyclical"
      }
    },

    {
      "instrument_id" : "stkc2",
      "exchange_id" : "SBF",
      "tickers" : [
                    {"provider" : "own", "symbol" : "SAN"}, 
                    {"provider" : "Bloomberg", "symbol" : "SNW Equity"},
                  ],
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
          "isin" : "FR0000120578",
          "right" : "common",
          "description" : "Sanofi",
          "country" : "FR",
          "industry" : "Pharmaceuticals",
          "supersector" : "Medical-Drugs",
          "sector" : "Consumer, Non-cyclical"
      }
    },

    {
      "instrument_id" : "stkc3",
      "exchange_id" : "BVME",
      "tickers" : [
                    {"provider" : "own", "symbol" : "G"}, 
                    {"provider" : "Bloomberg", "symbol" : "G Equity"},
                  ],
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
          "isin" : "IT0000062072",
          "right" : "common",
          "description" : "Assicurazioni Generali S.p.A.",
          "country" : "IT",
          "industry" : "Insurance",
          "supersector" : "Multi-line Insurance",
          "sector" : "Financial"
      }
    },

    {
      "instrument_id" : "stkc4",
      "exchange_id" : "BM",
      "tickers" : [
                    {"provider" : "own", "symbol" : "TEF"}, 
                    {"provider" : "Bloomberg", "symbol" : "TEF Equity"},
                  ],
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
          "isin" : "ES0178430E18",
          "right" : "common",
          "description" : "Telefonica SA",
          "country" : "ES",
          "industry" : "Telecommunications",
          "supersector" : "Telephone-Integrated",
          "sector" : "Communications"
      }
    },

    {
      "instrument_id" : "stkc5",
      "exchange_id" : "NASDAQ",
      "tickers" : [
                    {"provider" : "own", "symbol" : "APPL"}, 
                    {"provider" : "Bloomberg", "symbol" : "APPL Equity"},
                  ],
      "tick_size" : 0.01,
      "currency" : "USD",
      "class" : {
          "isin" : "US0378331005",
          "right" : "common",
          "description" : "Apple Inc",
          "country" : "US",
          "industry" : "Computers",
          "supersector" : "Computers",
          "sector" : "Technology"
      }
    },

    {
      "instrument_id" : "stkc6",
      "exchange_id" : "NYSE",
      "tickers" : [
                    {"provider" : "own", "symbol" : "GE"}, 
                    {"provider" : "Bloomberg", "symbol" : "GE Equity"},
                  ],
      "tick_size" : 0.01,
      "currency" : "USD",
      "class" : {
          "isin" : "US3696041033",
          "right" : "common",
          "description" : "General Electric Co",
          "country" : "US",
          "industry" : "Miscellaneous Manufacturers",
          "supersector" : "Diversified Manufactories",
          "sector" : "Industrial"
      }
    },
  ]
};

var indeces = {
  name : 'Index',
  data : [
    {
      "instrument_id" : "idx1",
      "exchange_id" : "",
      "tickers" : [
                    {"provider" : "own", "symbol" : "SPX"}, 
                    {"provider" : "Bloomberg", "symbol" : "SPX Index"},
                  ],
      "tick_size" : 0.01,
      "currency" : "USD",
      "class" : {
        "asset_class" : "US Equity Index",
        "country" : "US"
      }
    },

    {
      "instrument_id" : "idx2",
      "exchange_id" : "",
      "tickers" : [
                    {"provider" : "own", "symbol" : "DJ"}, 
                    {"provider" : "Bloomberg", "symbol" : "DM Index"},
                  ],
      "tick_size" : 0.01,
      "currency" : "USD",
      "class" : {
        "type" : "IDX",
        "asset_class" : "US Equity Index",
        "country" : "US"
      }
    },

    {
      "instrument_id" : "idx3",
      "exchange_id" : "",
      "tickers" : [{"provider" : "own", "symbol" : "DAX"}],
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
        "asset_class" : "EU Equity Index",
        "country" : "DE"
      }
    },

    {
      "instrument_id" : "idx4",
      "exchange_id" : "",
      "tickers" : [{"provider" : "own", "symbol" : "ESX"}],
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
        "asset_class" : "EU Equity Index",
        "country" : "EU"
      }
    },
  ]
};

var futures = {
  name : 'Future',
  data : [
    {
      "instrument_id" : "fut1",
      "exchange_id" : "CME",
      "tickers" : [
                    {"provider" : "own", "symbol" : "SP"}, 
                    {"provider" : "Bloomberg", "symbol" : "SP Future"},
                  ],
      "tick_size" : 0.25,
      "currency" : "USD",
      "class" : {
          "tick_value" : 50,
          "underlying" : "idx1",
          "expiring_date" : "Fri Dec 15 2017 23:00:00 GMT+0100 (CET)",
          "settlement" : "cash"
      }
    },

    {
      "instrument_id" : "fut2",
      "exchange_id" : "ECBOT",
      "tickers" : [
                    {"provider" : "own", "symbol" : "DJ"}, 
                    {"provider" : "Bloomberg", "symbol" : "DM Future"},
                  ],
      "tick_size" : 1.0,
      "currency" : "USD",
      "class" : {
          "tick_value" : 5,
          "underlying" : "idx2",
          "expiring_date" : "Fri Dec 15 2017 23:00:00 GMT+0100 (CET)",
          "settlement" : "cash"
      }
    },

    {
      "instrument_id" : "fut3",
      "exchange_id" : "DTB",
      "tickers" : [
                    {"provider" : "own", "symbol" : "FDAX"}, 
                    {"provider" : "Bloomberg", "symbol" : "DX Future"},
                  ],
      "tick_size" : 0.5,
      "currency" : "EUR",
      "class" : {
          "tick_value" : 25,
          "underlying" : "idx3",
          "expiring_date" : "Fri Dec 15 2017 23:00:00 GMT+0100 (CET)",
          "settlement" : "cash"
      }
    },

    {
      "instrument_id" : "fut4",
      "exchange_id" : "DTB",
      "tickers" : [
                    {"provider" : "own", "symbol" : "FESX"}, 
                    {"provider" : "Bloomberg", "symbol" : "FESX Index"},
                  ],
      "tick_size" : 1.0,
      "currency" : "EUR",
      "class" : {
          "tick_value" : 10,
          "underlying" : "idx4",
          "expiring_date" : "Fri Dec 15 2017 23:00:00 GMT+0100 (CET)",
          "settlement" : "cash"
      }
    },
  ]
};

var options = {
  name : 'Option',
  data : [
    {
      "instrument_id" : "opt1",
      "exchange_id" : "GLOBEX",
      "tickers" : [{"provider" : "own", "symbol" : "SPX"}],
      "tick_size" : 0.01,
      "currency" : "USD",
      "class" : {
        "multiplier" : 50,
        "underlying" : "fut1",
        "expiring_date" : "Fri Dec 15 2017 23:00:00 GMT+0100 (CET)",
        "strike" : 2620,
        "right" : "call",
        "settlement" : "physical",
        "exercise_type" : "American"
      }
    },

    {
      "instrument_id" : "opt2",
      "exchange_id" : "DTB",
      "tickers" : [{"provider" : "own", "symbol" : "ESX"}],
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
        "multiplier" : 10,
        "underlying" : "idx4",
        "expiring_date" : "Fri Dec 15 2017 23:00:00 GMT+0100 (CET)",
        "strike" : 3725,
        "right" : "call",
        "settlement" : "cash",
        "exercise_type" : "European"
      }
    },
  ]
};



var seedData = [];
seedData.push(users);
seedData.push(portfolios);
seedData.push(brokers);
seedData.push(accounts);
seedData.push(futures);
seedData.push(options);
seedData.push(assetclasses);
seedData.push(equities);
seedData.push(indeces);
seedData.push(exchanges);
//seedData.push(book);

module.exports = seedData;
