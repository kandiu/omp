const express = require('express');
const router = express.Router();

//const models = require('../../models');
const op = require('../../fix/orderProcessing');


// GET /

router.get('/', function(req, res) {

    res.end("usage: method POST, payload JSON order object");
});


router.post('/', function(req, res) {

    let order = req.body;

    if (! (req.is("application/json") && validateOrder(order)))
        res.status(400).end();

    else {
        op.processOrder(order);
        res.status(201).end();
    }
});


function validateOrder(order) {

    if( order.side != null &&
        order.symbol != null &&
        order.quantity != null &&
        order.type != null &&
        order.duration != null &&
        order.account != null &&
        order.broker != null &&
        order.portfolio_id != null ) {

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
