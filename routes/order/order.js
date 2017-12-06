const express = require('express');
const router = express.Router();
//const fixclient = require("../../fix/orderProcessing.js")

const eventBus = require('../../pubsub')






router.post('/', function(req, res) {

    let order = req.body;

    eventBus.emit('order_sent', order);


//    fixclient.send(order);

    res.status(204).end();
});


function validateOrder(order) {

    if( order.user_id != null &&
        order.account != null &&
        order.broker != null &&
        order.portfolio_id != null &&
        order.ticker != null &&
        order.quantity != null &&
        order.side != null &&
        order.type != null &&
        order.duration != null ) {

        if (order.side.toLowerCase() !== "buy" && order.side.toLowerCase() !== "sell")
            return false;

        if (order.type !== "LMT" && order.type !== "MKT")
            return false;

        if (order.type == 'LMT' && order.price == null)
            return false;

        if (! checkDb(order.portfolio_id, order.account, order.broker))
            return false;

        return true;
    }

    return false;
}


// check whether the provided information is consistent with existing db entries

function checkDb(portfolio, account, broker) {

    return true;
}



module.exports = router;
