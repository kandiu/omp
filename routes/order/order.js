const express = require('express');
const router = express.Router();
const fixclient = require("../../fix/orderProcessing.js")
const translate = require("../../db_io/translations");
const dbIo = require("../../db_io/readAndWrite");

router.post('/', function(req, res) {

    let order = req.body;

    let blotterObj = translate.orderToBlotter(order);
    let fixObj = translate.orderToFix(order);

    dbIo.writeBlotter(blotterObj, function() {
        fixclient.send(fixObj);            
    });

    res.status(204).end( ); 
});





module.exports = router;
