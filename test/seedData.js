'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var User = mongoose.model('User');
var Portfolio = mongoose.model('Portfolio');
var Account = mongoose.model('Account');
var Broker = mongoose.model('Broker');
var Registry = mongoose.model('Registry');

var users = {
  name : 'User',
  data : [
    {
      "name" : 'igor',
      "description" : 'Igor Rebesco',
      "portfolios" : ['futs-1', 'stks-1']
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

var portfolios = {
  name : 'Portfolio',
  data : [
    {
      "portfolio_id" : 'stks-1',
      "accounts" : ['gs1','ms1','ms10'],
      "settings" :
      {
        "selected_assets" : [{
          "asset_class" : "Equity",
          "instruments" : ['stkc1','stkc2','stkc3','stkc4']
        }]
      }
    },

    {
      "portfolio_id" : 'futs-1',
      "accounts" : ['ib1','gs2', 'jpm1', 'ms2'],
      "settings" :
      {
        "selected_assets" : [{
          "asset_class" : "Future",
          "instruments" : ['fut1','fut2']
        }]
      }
    },

    {
      "portfolio_id" : 'multy-1',
      "accounts" : ['ib2'],
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
      "portfolio_id" : 'stks-2',
      "accounts" : ['ms3','jpm2'],
    },

    {
      "portfolio_id" : 'stks-3',
      "accounts" : ['ms3','jpm2'],
    },

    {
      "portfolio_id" : 'futs-2',
      "accounts" : ['gs3', 'ib3'],
    },

    {
      "portfolio_id" : 'opts-1',
      "accounts" : ['ib1','gs2', 'jpm1', 'ms2'],
      "settings" :
      {
        "selected_assets" : [{
          "asset_class" : "Option",
          "instruments" : ['opt1','opt2']
        }]
      }
    },
  ]
};

var brokers = {
  name : 'Broker',
  data : [
    {
      "broker_id" : "GS"
    },
    {
      "broker_id" : "IB"
    },
    {
      "broker_id" : "MS"
    },
    {
      "broker_id" : "JPM"
    },
    {
      "broker_id" : "CS"
    },
    {
      "broker_id" : "UBS"
    }
  ]
};

var accounts = {
  name : 'Account',
  data : [
    {
      "account_id" : "gs1",
      "broker_id" : "GS",
      "bank" : "GS",
      "currency" : "EUR",
      "transactions" : [
           {"date" : new Date(), 
            "type" : "xy", 
            "amount" : 23}, 
           {"date" : new Date(), 
            "type" : "xy", amount : 23}]
    },
    {
      "account_id" : "gs2",
      "broker_id" : "GS",
      "bank" : "GS",
      "currency" : "EUR",
      "transactions" : [
           {"date" : new Date(), 
            "type" : "xy", 
            "amount" : 23}, 
           {"date" : new Date(), 
            "type" : "xy", amount : 23}]
    },
    {
      "account_id" : "gs3",
      "broker_id" : "GS",
      "bank" : "GS",
      "currency" : "EUR",
      "transactions" : [
           {"date" : new Date(), 
            "type" : "xy", 
            "amount" : 23}, 
           {"date" : new Date(), 
            "type" : "xy", amount : 23}]
    },
    {
      "account_id" : "ms1",
      "broker_id" : "MS",
      "bank" : "MS",
      "currency" : "EUR",
      "transactions" : [
           {"date" : new Date(), 
            "type" : "xy", 
            "amount" : 23}, 
           {"date" : new Date(), 
            "type" : "xy", amount : 23}]
    },
    {
      "account_id" : "ms2",
      "broker_id" : "MS",
      "bank" : "MS",
      "currency" : "EUR",
      "transactions" : [
           {"date" : new Date(), 
            "type" : "xy", 
            "amount" : 23}, 
           {"date" : new Date(), 
            "type" : "xy", amount : 23}]
    },
    {
      "account_id" : "ms3",
      "broker_id" : "MS",
      "bank" : "MS",
      "currency" : "EUR",
      "transactions" : [
           {"date" : new Date(), 
            "type" : "xy", 
            "amount" : 23}, 
           {"date" : new Date(), 
            "type" : "xy", amount : 23}]
    },
    {
      "account_id" : "ms10",
      "broker_id" : "MS",
      "bank" : "MS",
      "currency" : "EUR",
      "transactions" : [
           {"date" : new Date(), 
            "type" : "xy", 
            "amount" : 23}, 
           {"date" : new Date(), 
            "type" : "xy", amount : 23}]
    },
    {
      "account_id" : "jpm1",
      "broker_id" : "JPM",
      "bank" : "JPM",
      "currency" : "EUR",
      "transactions" : [
           {"date" : new Date(), 
            "type" : "xy", 
            "amount" : 23}, 
           {"date" : new Date(), 
            "type" : "xy", amount : 23}]
    },
    {
      "account_id" : "jpm2",
      "broker_id" : "JPM",
      "bank" : "JPM",
      "currency" : "EUR",
      "transactions" : [
           {"date" : new Date(), 
            "type" : "xy", 
            "amount" : 23}, 
           {"date" : new Date(), 
            "type" : "xy", amount : 23}]
    },
    {
      "account_id" : "ib1",
      "broker_id" : "IB",
      "bank" : "HSBC",
      "currency" : "EUR",
      "transactions" : [
           {"date" : new Date(), 
            "type" : "xy", 
            "amount" : 23}, 
           {"date" : new Date(), 
            "type" : "xy", amount : 23}]
    },
    {
      "account_id" : "ib2",
      "broker_id" : "IB",
      "bank" : "HSBC",
      "currency" : "EUR",
      "transactions" : [
           {"date" : new Date(), 
            "type" : "xy", 
            "amount" : 23}, 
           {"date" : new Date(), 
            "type" : "xy", amount : 23}]
    },
    {
      "account_id" : "ib3",
      "broker_id" : "IB",
      "bank" : "HSBC",
      "currency" : "EUR",
      "transactions" : [
           {"date" : new Date(), 
            "type" : "xy", 
            "amount" : 23}, 
           {"date" : new Date(), 
            "type" : "xy", amount : 23}]
    },
  ]
};

var registry = {
  name : 'Registry',
  data : [
    {
      "instrument_id" : "stkc1",
      "tradable" : "true",
      "exchange_id" : "IBIS",
      "tickers" : {"own" : "BMW", "Blomberg" : "BMW Equity"},
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
          "type" : "STK",
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
      "tradable" : "true",
      "exchange_id" : "SBF",
      "tickers" : {"own" : "SAN", "Blomberg" : "SNW Equity"},
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
          "type" : "STK",
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
      "tradable" : "true",
      "exchange_id" : "BVME",
      "tickers" : {"own" : "G", "Blomberg" : "G Equity"},
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
          "type" : "STK",
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
      "tradable" : "true",
      "exchange_id" : "BM",
      "tickers" : {"own" : "TEF", "Blomberg" : "TEF Equity"},
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
          "type" : "STK",
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
      "tradable" : "true",
      "exchange_id" : "NASDAQ",
      "tickers" : {"own" : "APPL", "Blomberg" : "APPL Equity"},
      "tick_size" : 0.01,
      "currency" : "USD",
      "class" : {
          "type" : "STK",
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
      "tradable" : "true",
      "exchange_id" : "NYSE",
      "tickers" : {"own" : "GE", "Blomberg" : "GE Equity"},
      "tick_size" : 0.01,
      "currency" : "USD",
      "class" : {
          "type" : "STK",
          "isin" : "US3696041033",
          "right" : "common",
          "description" : "General Electric Co",
          "country" : "US",
          "industry" : "Miscellaneous Manufacturers",
          "supersector" : "Diversified Manufactories",
          "sector" : "Industrial"
      }
    },

    {
      "instrument_id" : "idx1",
      "tradable" : "false",
      "exchange_id" : "",
      "tickers" : {"own" : "SPX", "Blomberg" : "SPX Index"},
      "tick_size" : 0.01,
      "currency" : "USD",
      "class" : {
        "type" : "IDX",
        "asset_class" : "US Equity Index",
        "country" : "US"
      }
    },

    {
      "instrument_id" : "idx2",
      "tradable" : "false",
      "exchange_id" : "",
      "tickers" : {"own" : "DJ"},
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
      "tradable" : "false",
      "exchange_id" : "",
      "tickers" : {"own" : "DAX"},
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
        "type" : "IDX",
        "asset_class" : "EU Equity Index",
        "country" : "DE"
      }
    },

    {
      "instrument_id" : "idx4",
      "tradable" : "false",
      "exchange_id" : "",
      "tickers" : {"own" : "ESX"},
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
        "type" : "IDX",
        "asset_class" : "EU Equity Index",
        "country" : "EU"
      }
    },

    {
      "instrument_id" : "fut1",
      "tradable" : "true",
      "exchange_id" : "CME",
      "tickers" : {"own" : "ES", "Blomberg" : "ES Future"},
      "tick_size" : 0.25,
      "currency" : "USD",
      "class" : {
          "type" : "FUT",
          "tick_value" : 50,
          "underlying" : "idx1",
          "expiring_date" : "15/12/2017",
          "settlement" : "cash"
      }
    },

    {
      "instrument_id" : "fut2",
      "tradable" : "true",
      "exchange_id" : "ECBOT",
      "tickers" : {"own" : "YM", "Blomberg" : "YM Future"},
      "tick_size" : 1.0,
      "currency" : "USD",
      "class" : {
          "type" : "FUT",
          "tick_value" : 5,
          "underlying" : "idx2",
          "expiring_date" : "15/12/2017",
          "settlement" : "cash"
      }
    },

    {
      "instrument_id" : "fut3",
      "tradable" : "true",
      "exchange_id" : "DTB",
      "tickers" : {"own" : "FDAX", "Blomberg" : "DX Future"},
      "tick_size" : 0.5,
      "currency" : "EUR",
      "class" : {
          "type" : "FUT",
          "tick_value" : 25,
          "underlying" : "idx3",
          "expiring_date" : "15/12/2017",
          "settlement" : "cash"
      }
    },

    {
      "instrument_id" : "fut4",
      "tradable" : "true",
      "exchange_id" : "DTB",
      "tickers" : {"own" : "FESX", "Blomberg" : "FESX Future"},
      "tick_size" : 1.0,
      "currency" : "EUR",
      "class" : {
          "type" : "FUT",
          "tick_value" : 10,
          "underlying" : "idx4",
          "expiring_date" : "15/12/2017",
          "settlement" : "cash"
      }
    },

    {
      "instrument_id" : "opt1",
      "tradable" : "true",
      "exchange_id" : "GLOBEX",
      "tickers" : {"own" : "ES"},
      "tick_size" : 0.01,
      "currency" : "USD",
      "class" : {
        "type" : "OPT",
        "multiplier" : 50,
        "underlying" : "fut1",
        "expiring_date" : "15/12/2017",
        "strike" : 2620,
        "right" : "call",
        "settlement" : "physical",
        "exercise_type" : "American"
      }
    },

    {
      "instrument_id" : "opt2",
      "tradable" : "true",
      "exchange_id" : "DTB",
      "tickers" : {"own" : "OESX"},
      "tick_size" : 0.01,
      "currency" : "EUR",
      "class" : {
        "type" : "OPT",
        "multiplier" : 10,
        "underlying" : "idx4",
        "expiring_date" : "15/12/2017",
        "strike" : 3725,
        "right" : "call",
        "settlement" : "cash",
        "exercise_type" : "European"
      }
    },
  ]
}





var seedData = [];
seedData.push(users);
seedData.push(portfolios);
seedData.push(brokers);
seedData.push(registry);
seedData.push(accounts);

module.exports = seedData;
