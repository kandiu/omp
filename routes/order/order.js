const express = require('express');
const router = express.Router();
const fixclient = require("../../fix/orderProcessing.js")
const translate = require("../../db_io/translations");
const dbRw = require("../../db_io/readAndWrite");

router.post('/', function(req, res) {

    let order = req.body;

    translate.orderToBlotter(order, function(blotterObj) {

    let fixObj = translate.orderToFix(order);
        dbRw.writeBlotter(blotterObj, function() {
            fixclient.send(fixObj);
        });

    res.status(204).end( );
    });
});





module.exports = router;
