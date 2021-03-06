const eventBus = require('../pubsub');
const models = require('../models');
const Execution = models.Execution;
const Blotter = models.Blotter;
const Account = models.Account;
const Book = models.Book;
const User = models.User;
const Portfolio = models.Portfolio;
const AssetClass = models.AssetClass;
const Registry = models.Registry;


// BLOTTER

function writeBlotter(blotterObj, next) {

    console.log("WRITING");
    console.log(blotterObj);

    blotterObj.save(function(err, saved) {

        if (err) {
            console.log("ERROR:");
            console.log(err);
        }

        if (! err)
            next(saved);
    });
}

function readBlotters(next) {

    Blotter.find({}, function(err, found) {
        if (! err) {
            next(found);
        }
    });
}

function readBlotter(order_id, next) {

    Blotter.findOne({"order_id" : order_id}, function(err, found) {
        if (! err) {
            next(found);
        }
    });
}

function blottersByUser(uname, next) {

    Blotter.find({"user" : uname}, function(err, found) {
        if (! err) {
            next(found);
        }
        else {
            console.log("ERROR:");
            console.log(err);
        }
    })
}

function deleteBlotter(order_id) {

    Blotter.remove({ "order_id" : order_id }, function(err) {
        if (err)
            console.log("ERROR DELETING BLOTTER: " + err);
        console.log("DELETED blotter " + order_id);
    });
}

function clearBlotters() {

    Blotter.remove({}, function(err) {
        if (err)
            console.log(err);
            console.log("CLEARED BLOTTERS");
    });
}



// data: { fieldX : valueX, fieldY : valueY, ...}
function updateBlotter(order_id, data, next) {

    Blotter.update({ "order_id" : order_id }, { $set: data }, function(err, done) {
        if (! err) {
            next();
        }
    });
}

// ACCOUNT

function readAccount(account_id, next) {

    Account.findOne({"account_id" : account_id}, function(err, found) {
        if (! err) {
            next(found);
        }
    });
}

function accountList(acIdList, next) {

    Account.find({ "account_id" : { $in : acIdList } }, function(err, found) {

        if (! err) {
            next(found);
        }
    });
}

// BOOK

function writeBook(bookObj, next) {
    bookObj.save(function(err, saved) {
        if (! err)
            next(saved);
    });
}

function readBook(exec_id, next) {

    Book.findOne({"order_id" : exec_id}, function(err, found) {
        if (! err) {
            next(found);
        }
    });
}

// USER

function readUser(uname, next) {

    User.findOne({"name" : uname}, function(err, found) {
        if (! err) {
            next(found);
        }
    });
}

// PORTFOLIO

function readPortfolio(portfolio_id, next) {

    Portfolio.findOne({"symbol" : portfolio_id}, function(err, found) {
        if (! err) {
            next(found);
        }
    });
}

function portfolioList(pfIdList, next) {

    Portfolio.find({ "symbol" : { $in : pfIdList } }, function(err, found) {

        if (! err) {
            next(found);
        }
    });
}

// EXECUTION

function writeExecution(execObj, next) {

    execObj.save(function(err, saved) {
        if (! err) {
            console.log("SAVED EXECUTION");
            console.log(saved);
        }

        else
            console.log("ERROR SAVING EXECUTION: " + err);

    });
}

function readExecutions(next) {

    Execution.find({}, function(err, found) {
        if (! err) {
            next(found);
        }
    });
}

function clearExecutions() {

    Execution.remove({}, function(err) {
        if (err)
            console.log(err);
            console.log("CLEARED EXECUTIONS");
    });
}

// ASSETCLASS

function readAssetClass(classname, next) {

    AssetClass.findOne({"classname" : classname}, function(err, found) {
        if (! err) {
            next(found);
        }
    });
}

function assetClassList(acIdList, next) {

    AssetClass.find({ "classname" : { $in : acIdList } }, function(err, found) {

        if (! err) {
            next(found);
        }
    });
}

function executionsByUser(uname, next) {

    Execution.find({"user" : uname}, function(err, found) {
        if (! err) {
            next(found);
        }
        else {
            console.log("ERROR:");
            console.log(err);
        }
    })
}

// REGISTRY

function readRegistry(instrument_id, next) {

    Registry.findOne({"instrument_id" : instrument_id}, function(err, found) {
        if (! err) {
            next(found);
        }
    });
}

function readRegistries(next) {

    Registry.find({}, function(err, found) {
        if (! err) {
            next(found);
        }
    });
}


module.exports = {

    'writeBlotter' : writeBlotter,
    'readBlotter' : readBlotter,
    'readBlotters' : readBlotters,
    'updateBlotter' : updateBlotter,
    'deleteBlotter' : deleteBlotter,
    'clearBlotters' : clearBlotters,
    'readAccount' : readAccount,
    'accountList' : accountList,
    'readBook' : readBook,
    'readUser' : readUser,
    'readPortfolio' : readPortfolio,
    'portfolioList' : portfolioList,
    'writeExecution' : writeExecution,
    'readExecutions' : readExecutions,
    'clearExecutions' : clearExecutions,
    'readAssetClass' : readAssetClass,
    'assetClassList' : assetClassList,
    'writeBook' : writeBook,
    'readBook' : readBook,
    'blottersByUser' : blottersByUser,
    'executionsByUser' : executionsByUser,
    'readRegistry' : readRegistry,
    'readRegistries' : readRegistries
}
