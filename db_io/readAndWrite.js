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


module.exports = {

    'writeBlotter' : writeBlotter,
    'readBlotter' : readBlotter,
    'updateBlotter' : updateBlotter,
    'readAccount' : readAccount,
    'writeBook' : writeBook,
    'readBook' : readBook,
    'readUser' : readUser,
    'readPortfolio' : readPortfolio,
    'blotterUser' : blotterUser,
}

















