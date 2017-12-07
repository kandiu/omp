
const models = require('../models');
const FillOrCancel = models.FillOrCancel;
const Blotter = models.Blotter;

function reportToFillOrCancel(report) {

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
        let focObj = new FillOrCancel(dataObj);
        return focObj;
    }
    catch (err) {
        console.error(err);
    }
}

function reportToBlotter(report) {

    return report;
}


module.exports = {

    'reportToFillOrCancel' : reportToFillOrCancel,
    'reportToBlotter' : reportToBlotter
}
