
const models = require('../models');
const Execution = models.Execution;
const Blotter = models.Blotter;



// ORDER TO BLOTTER

function orderToBlotter(order) {

    let blotterData = {

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
        tag : "...",
        broker : "...",
        account : order.account_id,
        portfolio : order.portfolio_id,
        exchange : order.exchange

    };

    try {
        let blotterObj = new Blotter(blotterData);
        return blotterObj;
    }
    catch (err) {
        console.error(err);
    }
}

// ORDER TO FIX

function orderToFix(order) {

    let fixObj = {

        type : "SingleOrder",
        account : order.account_id,
        clOrdID : order.order_id,
        symbol : order.symbol,
        orderQty : order.quantity,
//        text : "xxx|" + order.portfolio_id
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






module.exports = {

    'orderToBlotter' : orderToBlotter,
    'orderToFix' : orderToFix
}



















