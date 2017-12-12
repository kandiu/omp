const eventBus = require('../pubsub');
const models = require('../models');
const Execution = models.Execution;
const Blotter = models.Blotter;
const Account = models.Account;
const Book = models.Book;
const User = models.User;
const Portfolio = models.Portfolio;


// BLOTTER

function writeBlotter(blotterObj, next) {

    blotterObj.save(function(err, saved) {
        if (! err) 
            next(saved);       
    });
}

function readBlotter(order_id, next) {

    Blotter.findOne({"order_id" : order_id}, function(err, found) {
        if (! err) {
            next(found);
        }
    });
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

function blotterUser(blotter, next) {

    User.find({}, function(err, users) {

        let user = users.find(function(u) {
                    return u.portfolios.includes(blotter.portfolio);                
                   });

        next(user.name);
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


module.exports = {

    'writeBlotter' : writeBlotter,
    'readBlotter' : readBlotter,
    'updateBlotter' : updateBlotter,
    'deleteBlotter' : deleteBlotter,
    'clearBlotters' : clearBlotters,
    'blotterUser' : blotterUser,
    'readAccount' : readAccount,
    'readBook' : readBook,
    'readUser' : readUser,
    'readPortfolio' : readPortfolio,
    'writeExecution' : writeExecution,
    'readExecutions' : readExecutions,
    'clearExecutions' : clearExecutions,
    'writeBook' : writeBook,
    'readBook' : readBook
}

















