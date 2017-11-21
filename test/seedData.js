'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var models = require('../models');

var User = models.User;
var Portfolio = models.Portfolio;
var Account = models.Account;
var Broker = models.Broker;
var Registry = models.Registry;

var users = {
  name : 'Users',
  data : [
    {
      "name" : 'igor',
      "description" : 'Igor Rebesco',
      "portfolios" : ['fut-1', 'fut-2']
    },

    {
      "name" : 'uma',
      "description" : '',
      "portfolios" : ['opts-1']
    },

    {
      "name" : 'marcel',
      "description" : '',
      "portfolios" : ['stks-1']
    },

    {
      "name" : 'robert',
      "description" : '',
      "portfolios" : ['opts-1']
    },
    {
      "name" : 'eljon',
      "description" : '',
      "portfolios" : ['stks-1', 'stks-2']
    },
  ]
};

var portfolios = {
  name : 'Portfolios',
  data : [
    {
      "portfolio_id" : 'stks-1',
      "brokers" : ['GS','MS'],
    },

    {
      "portfolio_id" : 'futs-1',
      "brokers" : ['IB','GS', 'JPM', 'MS'],
    },

    {
      "portfolio_id" : 'opts-1',
      "brokers" : ['IB'],
    },

    {
      "portfolio_id" : 'stks-2',
      "brokers" : ['MS','JPM'],
    },

    {
      "portfolio_id" : 'futs-2',
      "brokers" : ['GS', 'IB'],
    },
  ]
};

var brokers = {
  name : 'Brokers',
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

module.exports = seedData;
