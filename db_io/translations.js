
const models = require('../models');
const dbRw = require('./readAndWrite');
const Execution = models.Execution;
const Blotter = models.Blotter;
const Book = models.Book;



// ORDER TO BLOTTER

function orderToBlotter(order, next) {

    if (order.exchange == undefined || order.exchange == "")
        order.exchange = "_";

    if (order.price == undefined || order.price == "")
        order.price = 0;



    dbRw.portfolioUser(order.portfolio_id, function(user) {

        let blotterData = {

            user : order.user,
            order_id : order.order_id,
            external_order_id : "...",
            symbol : order.symbol,
            creation_time : order.creation_time,
            timestamp : new Date(0,0,0),
            type : order.type,
            action : order.action,
            quantity : order.quantity,
            price : order.price,
            duration : order.duration,
            status : order.status,
            tag : user + "|" + order.portfolio_id,
            broker : "...",
            account : order.account_id,
            portfolio : order.portfolio_id,
            exchange : order.exchange

        };

        try {
            let blotterObj = new Blotter(blotterData);
            console.log("BLOTTER");
            console.log(blotterObj);
            next(blotterObj);
        }
        catch (err) {
            console.error(err);
        }
    });
}

// ORDER TO FIX

function orderToFix(order) {

    let fixObj = {

        type : "SingleOrder",
        account : order.account_id,
        clOrdID : order.order_id,
        symbol : order.symbol,
        orderQty : order.quantity,
        text : "xxx|" + order.portfolio_id
    };

    if (order.action.toLowerCase() == 'buy')
        fixObj.side = 1;
    else if (order.action.toLowerCase() == 'sell')
        fixObj.side = 2;

    if (order.type.toLowerCase() == 'mkt')
        fixObj.ordType = 1;
    else if (order.type.toLowerCase() == 'lmt')
        fixObj.ordType = 2;

    return fixObj;
}

// BLOTTER + EXEC_ID TO BOOK

function blExecCurrToBook(blotter, exec_id, curr) {

    let bookData = {

        user : blotter.user,
        order_id : exec_id,
        timestamp : blotter.timestamp,
        quantity : blotter.quantity,
        price : blotter.price,
        security_symbol : blotter.symbol,
        execution_broker_symbol : blotter.broker,
        clearing_broker_symbol : blotter.broker,
        currency : curr,
        exchange_symbol : blotter.exchange,
        account_id : blotter.account,
        portfolio_id : blotter.portfolio
    };

    try {
        let bookObj = new Book(bookData);
        return bookObj;
    }
    catch (err) {
        console.error(err);
    }
}


// BLOTTER TO EXECUTION

function blotterToExecution(blotter) {

    let executionData = {

        user : blotter.user,
        order_id : blotter.order_id,
        symbol : blotter.symbol,
        timestamp : blotter.timestamp,
        action : blotter.action,
        quantity : blotter.quantity,
        price : blotter.price,
        status : blotter.status,
        tag : blotter.tag,
        broker : blotter.broker,
        account : blotter.account
    }

    try {
        let executionObj = new Execution(executionData);
        return executionObj;
    }
    catch (err) {
        console.error(err);
    }
}


// DATE STRING TO DATE

function parseDateString(dateString) {

    let Y = dateString.substring(0,4);
    let M = dateString.substring(4,6);
    let D = dateString.substring(6,8);
    let h = dateString.substring(9,11);
    let m = dateString.substring(12,14);
    let s = dateString.substring(15,17);
    let ms = dateString.substring(18,21);

    let date = new Date(Y,M,D,h,m,s,ms);

    console.log("DATE STRING: " + dateString);
    console.log("DATE: " + date);

    return date;
}



module.exports = {

    'orderToBlotter' : orderToBlotter,
    'orderToFix' : orderToFix,
    'blExecCurrToBook' : blExecCurrToBook,
    'blotterToExecution' : blotterToExecution,
    'parseDateString' : parseDateString
}
