const express = require('express');
const router = express.Router();

const dbRw = require('../../db_io/readAndWrite');

router.get('/', function(req, res){
	res.end("usage: method GET, url /instrument_id");
})

// GET /

router.get('/', function(req, res) {

    let inst = req.params._instrument;

    dbRw.readRegistries(function(reg) {
        res.status(200).json(reg);
    }); 
});


// GET /:_instrument

router.get('/:_instrument', function(req, res) {

    let inst = req.params._instrument;

    dbRw.readRegistry(inst, function(reg) {
        res.status(200).json(reg);
    }); 
});













module.exports = router;
