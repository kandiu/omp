const express = require('express');
const router = express.Router();

const models = require('../../models');


// GET /

router.get('/', function(req, res) {

    res.end("usage: method POST, payload JSON order object");
});

/*
router.get('/', function(req, res) {

    let inst = req.params._instrument;

    Registry.findOne({"instrument_id" : inst}, function(err, found) {

        if (err || found == null) 
            res.status(404).end();           
        else {
            res.status(200).json(found);
        }
    }); 
});
*/












module.exports = router;
