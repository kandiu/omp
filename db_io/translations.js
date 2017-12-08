
const models = require('../models');
const Execution = models.Execution;
const Blotter = models.Blotter;


/// Temporary: to be replaced

function reportToExecution(report) {

    let dataObj = {

        order_id : report.clOrdID.value,
        symbol : report.symbol.value,
        timestamp : new Date(),         // TODO properly parse timestamp and convert to Date
        action : report.side.value,
        quantity : report.orderQty.value,
        price : report.avgPx.value,
        status : report.ordStatus.value,
        tag : "?",
        broker : report.senderCompID.value,
        account : "?"
    }

    try {
        let focObj = new Execution(dataObj);
        return focObj;
    }
    catch (err) {
        console.error(err);
    }
}

function reportToBlotter(report) {

    return report;
}

/// end Temporary: to be replaced


function orderToBlotter(order) {

    let blotterData = {

        order_id : order.order_id,
        external_order_id : "...",
        symbol : order.symbol,
        creation_time : order.creation_time,
        timestamp : new Date(),
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









module.exports = {

    'reportToExecution' : reportToExecution,
    'reportToBlotter' : reportToBlotter,
    'orderToBlotter' : orderToBlotter
}



















