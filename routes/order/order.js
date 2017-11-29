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

    op.processOrder(order);

    res.status(201).end();
});













module.exports = router;
